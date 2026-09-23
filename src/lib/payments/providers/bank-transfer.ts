import { formatPrice } from "../../format";
import type { Order } from "../../types";
import type { PaymentInitResult, PaymentInstructions, PaymentProvider } from "../types";

/**
 * Virement bancaire / paiement à la commande.
 * La commande est enregistrée « en attente de paiement » ; l'administrateur
 * la passe en « payée » depuis l'espace admin à réception du virement.
 */
export class BankTransferProvider implements PaymentProvider {
  readonly id = "bank_transfer";
  readonly label = "Virement bancaire";
  readonly description =
    "Vous recevez nos coordonnées bancaires après validation. La commande est expédiée dès réception du virement.";

  private get config() {
    return {
      holder: process.env.PAYMENT_BANK_ACCOUNT_HOLDER || "[Titulaire du compte]",
      iban: process.env.PAYMENT_BANK_IBAN || "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
      bic: process.env.PAYMENT_BANK_BIC || "XXXXXXXXXXX",
      bank: process.env.PAYMENT_BANK_NAME || "",
      delayDays: Number(process.env.PAYMENT_BANK_DELAY_DAYS ?? 7),
    };
  }

  isEnabled() {
    return true;
  }

  async initiatePayment(order: Order): Promise<PaymentInitResult> {
    return { status: "pending", reference: order.orderNumber };
  }

  getInstructions(order: Order): PaymentInstructions {
    const c = this.config;
    return {
      title: "Paiement par virement bancaire",
      intro: `Merci d'effectuer un virement de ${formatPrice(order.totalCents)} en indiquant impérativement la référence ci-dessous.`,
      lines: [
        { label: "Titulaire", value: c.holder },
        { label: "IBAN", value: c.iban },
        { label: "BIC", value: c.bic },
        ...(c.bank ? [{ label: "Banque", value: c.bank }] : []),
        { label: "Montant", value: formatPrice(order.totalCents) },
        { label: "Référence à indiquer", value: order.orderNumber },
      ],
      note: `Sans réception du virement sous ${c.delayDays} jours, la commande sera annulée et les produits remis en stock.`,
    };
  }
}
