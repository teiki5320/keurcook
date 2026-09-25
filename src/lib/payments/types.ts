import type { Order } from "../types";

/** Informations de paiement à afficher au client (page de confirmation + email). */
export interface PaymentInstructions {
  title: string;
  intro?: string;
  lines: Array<{ label: string; value: string }>;
  note?: string;
}

export interface PaymentInitResult {
  /**
   * - `pending`  : paiement différé (virement…) — la commande reste « en attente de paiement » ;
   * - `redirect` : le client doit être redirigé vers la page du prestataire ;
   * - `paid`     : paiement confirmé immédiatement.
   */
  status: "pending" | "redirect" | "paid";
  redirectUrl?: string;
  /** Référence de la transaction chez le prestataire, si disponible. */
  reference?: string;
}

export interface PaymentContext {
  /** URL de la page de confirmation de la commande (retour après paiement). */
  returnUrl: string;
  /** URL de retour en cas d'abandon du paiement. */
  cancelUrl: string;
}

export interface WebhookResult {
  orderNumber: string;
  status: "paid" | "failed";
  reference?: string;
}

/**
 * Couche d'abstraction de paiement.
 *
 * Pour brancher un prestataire , il suffit de créer
 * une classe qui implémente cette interface dans `providers/`, puis de
 * l'ajouter au registre (`registry.ts`). Voir `providers/_template.ts`.
 */
export interface PaymentProvider {
  /** Identifiant technique, stocké dans `orders.payment_provider`. */
  readonly id: string;
  /** Libellé affiché au client lors du choix du moyen de paiement. */
  readonly label: string;
  /** Courte description affichée sous le libellé. */
  readonly description: string;

  /** Le prestataire est-il configuré (clés présentes, etc.) ? */
  isEnabled(): boolean;

  /** Appelé juste après la création de la commande. */
  initiatePayment(order: Order, ctx: PaymentContext): Promise<PaymentInitResult>;

  /** Instructions à afficher au client (virement : IBAN, référence…). */
  getInstructions?(order: Order): PaymentInstructions | null;

  /**
   * Traitement des notifications serveur-à-serveur du prestataire
   * (route `/api/payments/[provider]/webhook`). Doit vérifier la signature.
   */
  handleWebhook?(request: Request): Promise<WebhookResult | null>;

  /**
   * Retour du client sur la page de confirmation (paramètres de l'URL) :
   * permet de confirmer le paiement sans attendre le webhook.
   */
  confirmReturn?(order: Order, params: Record<string, string | undefined>): Promise<WebhookResult | null>;
}
