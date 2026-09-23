import "server-only";
import { BankTransferProvider } from "./providers/bank-transfer";
import type { PaymentProvider } from "./types";

/**
 * Registre des moyens de paiement disponibles.
 * `PAYMENT_PROVIDERS` (liste séparée par des virgules) permet de choisir
 * lesquels sont proposés, dans l'ordre. Par défaut : virement uniquement.
 */
const allProviders: PaymentProvider[] = [
  new BankTransferProvider(),
  // new MonPspProvider(),
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

/** Données sérialisables pour les composants client. */
export function getPaymentOptions() {
  return getPaymentProviders().map((p) => ({ id: p.id, label: p.label, description: p.description }));
}
