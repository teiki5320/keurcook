import "server-only";
import Stripe from "stripe";
import type { Order } from "../../types";
import type { PaymentContext, PaymentInitResult, PaymentProvider, WebhookResult } from "../types";

/**
 * Carte bancaire, Apple Pay et Google Pay via Stripe Checkout (page de
 * paiement hébergée par Stripe). Les moyens proposés se règlent dans le
 * tableau de bord Stripe (Paramètres → Moyens de paiement).
 *
 * Variables : STRIPE_SECRET_KEY (clé secrète, sk_test_… puis sk_live_…),
 * STRIPE_WEBHOOK_SECRET (secret de signature du webhook, whsec_…).
 * Webhook à déclarer dans Stripe : https://<domaine>/api/payments/stripe/webhook
 * avec les événements checkout.session.completed,
 * checkout.session.async_payment_succeeded, checkout.session.async_payment_failed
 * et checkout.session.expired.
 */
export class StripeProvider implements PaymentProvider {
  readonly id = "stripe";
  readonly label = "Carte bancaire, Apple Pay, Google Pay";
  readonly description = "Paiement sécurisé sur la page Stripe, puis retour automatique sur le site.";

  private client: Stripe | null = null;

  private get stripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY manquante.");
    this.client ??= new Stripe(key);
    return this.client;
  }

  isEnabled() {
    return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
  }

  async initiatePayment(order: Order, ctx: PaymentContext): Promise<PaymentInitResult> {
    // Les montants viennent de la commande enregistrée (prix relus en base), jamais du navigateur.
    const session = await this.stripe.checkout.sessions.create(
      {
        mode: "payment",
        locale: "fr",
        currency: "eur",
        customer_email: order.email,
        client_reference_id: order.orderNumber,
        metadata: { order_number: order.orderNumber },
        payment_intent_data: { metadata: { order_number: order.orderNumber }, description: `Commande ${order.orderNumber}` },
        line_items: order.items.map((i) => ({
          quantity: i.quantity,
          price_data: {
            currency: "eur",
            unit_amount: i.unitPriceCents,
            product_data: { name: `${i.productName} — ${i.variantLabel}` },
          },
        })),
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: order.shippingCents ? "Livraison" : "Livraison offerte",
              fixed_amount: { amount: order.shippingCents, currency: "eur" },
            },
          },
        ],
        // Au-delà, la session expire : la commande est annulée et le stock remis en vente (webhook).
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
        success_url: `${ctx.returnUrl}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: ctx.cancelUrl,
      },
      // Une seule session par commande, même si l'appel est rejoué.
      { idempotencyKey: `checkout-${order.id}` },
    );
    if (!session.url) throw new Error("Stripe n'a pas renvoyé d'URL de paiement.");
    return { status: "redirect", redirectUrl: session.url, reference: session.id };
  }

  async handleWebhook(request: Request): Promise<WebhookResult | null> {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = request.headers.get("stripe-signature");
    if (!secret || !signature) throw new Error("Signature Stripe absente.");
    // Le corps brut est indispensable à la vérification de signature.
    const event = await this.stripe.webhooks.constructEventAsync(await request.text(), signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        return this.fromSession(event.data.object);
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const orderNumber = event.data.object.client_reference_id;
        return orderNumber ? { orderNumber, status: "failed" } : null;
      }
      default:
        return null;
    }
  }

  /** Retour du client sur la page de confirmation : on vérifie la session auprès de Stripe. */
  async confirmReturn(order: Order, params: Record<string, string | undefined>): Promise<WebhookResult | null> {
    const sessionId = params.session_id;
    if (!sessionId?.startsWith("cs_")) return null;
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    if (session.client_reference_id !== order.orderNumber) return null;
    return this.fromSession(session);
  }

  private fromSession(session: Stripe.Checkout.Session): WebhookResult | null {
    const orderNumber = session.client_reference_id;
    if (!orderNumber || session.payment_status !== "paid") return null;
    const reference = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
    return { orderNumber, status: "paid", reference: reference ?? session.id };
  }
}

