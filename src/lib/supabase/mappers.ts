/* Conversion des lignes SQL (snake_case) vers les types applicatifs. */
import type { Category, Order, OrderItem, Product, Variant } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

export function mapCategory(r: Row): Category {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    kind: r.kind,
    description: r.description ?? "",
    position: r.position ?? 0,
  };
}

export function mapVariant(r: Row): Variant {
  return {
    id: r.id,
    productId: r.product_id,
    label: r.label,
    priceCents: r.price_cents,
    stock: r.stock,
    sku: r.sku ?? null,
    position: r.position ?? 0,
  };
}

export function mapProduct(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    categoryId: r.category_id,
    shortDescription: r.short_description ?? "",
    description: r.description ?? "",
    cbdRate: num(r.cbd_rate),
    thcRate: num(r.thc_rate),
    originRegion: r.origin_region ?? null,
    producer: r.producer ?? null,
    images: r.images ?? [],
    coaUrl: r.coa_url ?? null,
    tags: r.tags ?? [],
    isActive: r.is_active,
    featured: r.featured,
    createdAt: r.created_at,
    variants: ((r.product_variants ?? []) as Row[])
      .map(mapVariant)
      .sort((a, b) => a.position - b.position),
  };
}

export function mapOrderItem(r: Row): OrderItem {
  return {
    id: r.id,
    productId: r.product_id,
    variantId: r.variant_id,
    productName: r.product_name,
    variantLabel: r.variant_label,
    unitPriceCents: r.unit_price_cents,
    quantity: r.quantity,
  };
}

export function mapOrder(r: Row): Order {
  return {
    id: r.id,
    orderNumber: r.order_number,
    accessToken: r.access_token,
    status: r.status,
    email: r.email,
    firstName: r.first_name,
    lastName: r.last_name,
    phone: r.phone,
    addressLine1: r.address_line1,
    addressLine2: r.address_line2,
    postalCode: r.postal_code,
    city: r.city,
    country: r.country,
    notes: r.notes,
    paymentProvider: r.payment_provider,
    paymentReference: r.payment_reference,
    subtotalCents: r.subtotal_cents,
    shippingCents: r.shipping_cents,
    totalCents: r.total_cents,
    trackingNumber: r.tracking_number ?? null,
    createdAt: r.created_at,
    items: ((r.order_items ?? []) as Row[]).map(mapOrderItem),
  };
}
