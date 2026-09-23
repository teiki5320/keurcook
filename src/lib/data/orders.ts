import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { computeShipping, shippingConfig } from "../config";
import { demoOrders, findDemoVariant, nextDemoOrderNumber } from "../demo/store";
import { isSupabaseConfigured } from "../supabase/env";
import { createServiceClient } from "../supabase/admin";
import { mapOrder } from "../supabase/mappers";
import type { CartLineInput, CustomerInput, Order } from "../types";

export class OrderError extends Error {}

/** Traduit les erreurs levées par la fonction SQL `place_order`. */
function translateDbError(message: string): string {
  if (message.includes("OUT_OF_STOCK:")) {
    const item = message.split("OUT_OF_STOCK:")[1]?.split("\n")[0]?.trim();
    return `Stock insuffisant pour « ${item} ». Merci d'ajuster votre panier.`;
  }
  if (message.includes("PRODUCT_UNAVAILABLE")) return "Un produit de votre panier n'est plus disponible.";
  if (message.includes("EMPTY_CART")) return "Votre panier est vide.";
  if (message.includes("INVALID_QUANTITY")) return "Quantité invalide dans le panier.";
  return "Impossible d'enregistrer la commande pour le moment. Merci de réessayer.";
}

/** Fusionne les lignes portant sur la même variante. */
function mergeLines(lines: CartLineInput[]): CartLineInput[] {
  const map = new Map<string, number>();
  for (const l of lines) map.set(l.variantId, (map.get(l.variantId) ?? 0) + l.quantity);
  return [...map].map(([variantId, quantity]) => ({ variantId, quantity }));
}

/**
 * Crée une commande. Les prix et les stocks sont TOUJOURS relus côté serveur :
 * ceux envoyés par le navigateur ne sont jamais utilisés.
 */
export async function placeOrder(
  customer: CustomerInput,
  rawLines: CartLineInput[],
  paymentProvider: string,
): Promise<Order> {
  const lines = mergeLines(rawLines);
  if (lines.length === 0) throw new OrderError("Votre panier est vide.");

  if (isSupabaseConfigured) {
    const supabase = createServiceClient();
    const { data, error } = await supabase.rpc("place_order", {
      p_customer: {
        email: customer.email,
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone: customer.phone ?? "",
        address_line1: customer.addressLine1,
        address_line2: customer.addressLine2 ?? "",
        postal_code: customer.postalCode,
        city: customer.city,
        country: customer.country,
        notes: customer.notes ?? "",
      },
      p_items: lines.map((l) => ({ variant_id: l.variantId, quantity: l.quantity })),
      p_payment_provider: paymentProvider,
      p_shipping_rules: {
        flat_rate_cents: shippingConfig.flatRateCents,
        free_threshold_cents: shippingConfig.freeThresholdCents,
      },
    });
    if (error) throw new OrderError(translateDbError(error.message));
    const order = await getOrderById((data as { id: string }).id);
    if (!order) throw new OrderError("Commande introuvable après création.");
    return order;
  }

  // ------------------------------------------------------------ Mode démo
  const resolved = lines.map((l) => {
    const found = findDemoVariant(l.variantId);
    if (!found || !found.product.isActive) throw new OrderError("Un produit de votre panier n'est plus disponible.");
    if (l.quantity <= 0 || l.quantity > 99) throw new OrderError("Quantité invalide dans le panier.");
    if (found.variant.stock < l.quantity)
      throw new OrderError(`Stock insuffisant pour « ${found.product.name} — ${found.variant.label} ». Merci d'ajuster votre panier.`);
    return { ...found, quantity: l.quantity };
  });
  const subtotal = resolved.reduce((s, r) => s + r.variant.priceCents * r.quantity, 0);
  const shipping = computeShipping(subtotal);
  resolved.forEach((r) => (r.variant.stock -= r.quantity));
  const orderNumber = nextDemoOrderNumber();
  const order: Order = {
    id: randomUUID(),
    orderNumber,
    accessToken: randomBytes(16).toString("hex"),
    status: "pending_payment",
    email: customer.email.trim().toLowerCase(),
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone || null,
    addressLine1: customer.addressLine1,
    addressLine2: customer.addressLine2 || null,
    postalCode: customer.postalCode,
    city: customer.city,
    country: customer.country,
    notes: customer.notes || null,
    paymentProvider,
    paymentReference: orderNumber,
    subtotalCents: subtotal,
    shippingCents: shipping,
    totalCents: subtotal + shipping,
    trackingNumber: null,
    createdAt: new Date().toISOString(),
    items: resolved.map((r) => ({
      id: randomUUID(),
      productId: r.product.id,
      variantId: r.variant.id,
      productName: r.product.name,
      variantLabel: r.variant.label,
      unitPriceCents: r.variant.priceCents,
      quantity: r.quantity,
    })),
  };
  demoOrders.set(order.id, order);
  return order;
}

async function getOrderById(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured) return demoOrders.get(id) ?? null;
  const supabase = createServiceClient();
  const { data } = await supabase.from("orders").select("*, order_items(*)").eq("id", id).maybeSingle();
  return data ? mapOrder(data) : null;
}

/** Lecture publique d'une commande : nécessite le numéro ET le jeton d'accès. */
export async function getOrderForCustomer(orderNumber: string, token: string): Promise<Order | null> {
  if (!orderNumber || !token) return null;
  if (!isSupabaseConfigured) {
    const order = [...demoOrders.values()].find((o) => o.orderNumber === orderNumber);
    return order && order.accessToken === token ? order : null;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", orderNumber)
    .eq("access_token", token)
    .maybeSingle();
  return data ? mapOrder(data) : null;
}

/** Marque une commande comme payée (webhook d'un prestataire). */
export async function markOrderPaid(orderNumber: string, reference?: string): Promise<Order | null> {
  if (!isSupabaseConfigured) {
    const order = [...demoOrders.values()].find((o) => o.orderNumber === orderNumber);
    if (!order) return null;
    if (order.status === "pending_payment") order.status = "paid";
    if (reference) order.paymentReference = reference;
    return order;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("orders")
    .update({ status: "paid", ...(reference ? { payment_reference: reference } : {}) })
    .eq("order_number", orderNumber)
    .eq("status", "pending_payment")
    .select("*, order_items(*)")
    .maybeSingle();
  return data ? mapOrder(data) : null;
}

export function orderUrl(order: Pick<Order, "orderNumber" | "accessToken">, baseUrl: string) {
  return `${baseUrl}/commande/confirmation/${encodeURIComponent(order.orderNumber)}?t=${order.accessToken}`;
}
