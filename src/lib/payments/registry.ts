import "server-only";
import { BankTransferProvider } from "./providers/bank-transfer";
import { StripeProvider } from "./providers/stripe";
import type { PaymentProvider } from "./types";

/**
 * Registre des moyens de paiement disponibles.
 * `PAYMENT_PROVIDERS` (liste séparée par des virgules) permet de choisir
 * lesquels sont proposés, dans l'ordre (ex. « stripe,bank_transfer »). Par défaut : virement uniquement.
 * Un prestataire non configuré (clés absentes) n'est jamais proposé.
 */
const allProviders: PaymentProvider[] = [
  new BankTransferProvider(),
  new StripeProvider(),
];

export function getPaymentProviders(): PaymentProvider[] {
  const wanted = (process.env.PAYMENT_PROVIDERS || "bank_transfer")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return wanted
    .map((id) => allProviders.find((p) => p.id === id))
    .filter((p): p is PaymentProvider => Boolean(p && p.isEnabled()));
}

export function getPaymentProvider(id: string): PaymentProvider | null {
  return allProviders.find((p) => p.id === id) ?? null;
}

/** Libellé lisible d'un moyen de paiement (admin, emails). */
export function paymentLabel(id: string) {
  return getPaymentProvider(id)?.label ?? id;
}

/** Données sérialisables pour les composants client. */
export function getPaymentOptions() {
  return getPaymentProviders().map((p) => ({ id: p.id, label: p.label, description: p.description }));
}
