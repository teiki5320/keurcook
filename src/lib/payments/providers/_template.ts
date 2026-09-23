/**
 * MODÈLE — prestataire de paiement par redirection (non enregistré).
 *
 * Étapes pour brancher un prestataire acceptant le CBD :
 *  1. Copier ce fichier (ex. `providers/mon-psp.ts`) et implémenter les appels API.
 *  2. Ajouter les clés dans les variables d'environnement.
 *  3. Enregistrer l'instance dans `payments/registry.ts`.
 *  4. Déclarer l'URL de webhook chez le prestataire :
 *       https://votre-domaine.fr/api/payments/mon_psp/webhook
 */
import type { Order } from "../../types";
import type { PaymentContext, PaymentInitResult, PaymentProvider, WebhookResult } from "../types";

export class ExampleRedirectProvider implements PaymentProvider {
  readonly id = "mon_psp";
  readonly label = "Carte bancaire";
  readonly description = "Paiement sécurisé par carte bancaire.";

  isEnabled() {
    return Boolean(process.env.MON_PSP_API_KEY);
  }

  async initiatePayment(order: Order, ctx: PaymentContext): Promise<PaymentInitResult> {
    // Exemple : créer une session de paiement chez le prestataire.
    // const res = await fetch("https://api.mon-psp.example/checkout", {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${process.env.MON_PSP_API_KEY}` },
    //   body: JSON.stringify({
    //     amount: order.totalCents, currency: "EUR", reference: order.orderNumber,
    //     success_url: ctx.returnUrl, cancel_url: ctx.cancelUrl,
    //   }),
    // });
    // const session = await res.json();
    // return { status: "redirect", redirectUrl: session.url, reference: session.id };
    void order;
    void ctx;
    throw new Error("ExampleRedirectProvider n'est pas implémenté.");
  }

  async handleWebhook(request: Request): Promise<WebhookResult | null> {
    // 1. Vérifier la signature (en-tête fourni par le prestataire) avec un secret partagé.
    // 2. Lire l'événement et renvoyer la référence de commande + statut.
    void request;
    return null;
  }
}
