"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { siteConfig } from "@/lib/config";
import { OrderError, orderUrl, placeOrder } from "@/lib/data/orders";
import { getMaintenance } from "@/lib/data/settings";
import { sendEmailSafe } from "@/lib/email/sender";
import { adminNewOrderEmail, orderConfirmationEmail } from "@/lib/email/templates";
import { getPaymentProvider, getPaymentProviders } from "@/lib/payments/registry";

export interface CheckoutState {
  error?: string;
  fieldErrors?: Record<string, string>;
  redirectUrl?: string;
  /** Valeurs saisies, renvoyées pour ré-afficher le formulaire après une erreur. */
  values?: Record<string, string>;
}

const TEXT_FIELDS = ["email", "firstName", "lastName", "phone", "addressLine1", "addressLine2", "postalCode", "city", "notes", "paymentProvider", "isAdult", "acceptTerms"];

const schema = z.object({
  email: z.email("Adresse email invalide."),
  firstName: z.string().trim().min(1, "Prénom requis.").max(80),
  lastName: z.string().trim().min(1, "Nom requis.").max(80),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+().\s-]*$/, "Numéro de téléphone invalide.")
    .optional(),
  addressLine1: z.string().trim().min(3, "Adresse requise.").max(200),
  addressLine2: z.string().trim().max(200).optional(),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres."),
  city: z.string().trim().min(1, "Ville requise.").max(100),
  country: z.literal("FR"),
  notes: z.string().trim().max(500).optional(),
  paymentProvider: z.string().min(1, "Choisissez un moyen de paiement."),
  isAdult: z.literal("on", { error: "Vous devez certifier être majeur." }),
  acceptTerms: z.literal("on", { error: "Vous devez accepter les conditions générales de vente." }),
  lines: z
    .array(z.object({ variantId: z.uuid(), quantity: z.number().int().min(1).max(99) }))
    .min(1, "Votre panier est vide.")
    .max(50),
});

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return siteConfig.url;
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function placeOrderAction(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const values = Object.fromEntries(TEXT_FIELDS.map((k) => [k, String(formData.get(k) ?? "")]));

  // Pot de miel anti-robots : ce champ est invisible pour les humains.
  if (formData.get("website")) return { error: "Requête invalide." };
  if ((await getMaintenance()).enabled) return { error: "La boutique est en maintenance : les commandes sont suspendues.", values };

  let lines: unknown = [];
  try {
    lines = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { error: "Panier invalide.", values };
  }

  const opt = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" && v.trim() ? v : undefined;
  };

  const parsed = schema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: opt("phone"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: opt("addressLine2"),
    postalCode: formData.get("postalCode"),
    city: formData.get("city"),
    country: formData.get("country") ?? "FR",
    notes: opt("notes"),
    paymentProvider: formData.get("paymentProvider"),
    isAdult: formData.get("isAdult"),
    acceptTerms: formData.get("acceptTerms"),
    lines,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { error: "Merci de corriger les champs indiqués.", fieldErrors, values };
  }

  const data = parsed.data;
  const provider = getPaymentProvider(data.paymentProvider);
  if (!provider || !getPaymentProviders().some((p) => p.id === provider.id)) {
    return { error: "Moyen de paiement indisponible.", values };
  }

  let order;
  try {
    order = await placeOrder(data, data.lines, provider.id);
  } catch (e) {
    if (e instanceof OrderError) return { error: e.message, values };
    console.error("[commande]", e);
    return { error: "Une erreur est survenue lors de l'enregistrement de la commande.", values };
  }

  const baseUrl = await getBaseUrl();
  const confirmationUrl = orderUrl(order, baseUrl);
  const payment = await provider.initiatePayment(order, {
    returnUrl: confirmationUrl,
    cancelUrl: `${baseUrl}/panier`,
  });

  // Les emails partent après l'envoi de la réponse : le client n'attend pas le SMTP.
  after(async () => {
    const confirmation = orderConfirmationEmail(order, provider.getInstructions?.(order) ?? null, confirmationUrl);
    await sendEmailSafe({ to: order.email, ...confirmation });
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail) {
      await sendEmailSafe({ to: adminEmail, replyTo: order.email, ...adminNewOrderEmail(order, `${baseUrl}/admin/commandes/${order.id}`) });
    }
  });

  // Le stock a changé : on rafraîchit les pages du catalogue.
  revalidatePath("/", "layout");

  if (payment.status === "redirect" && payment.redirectUrl) {
    return { redirectUrl: payment.redirectUrl };
  }
  redirect(`/commande/confirmation/${encodeURIComponent(order.orderNumber)}?t=${order.accessToken}`);
}
