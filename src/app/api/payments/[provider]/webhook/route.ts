import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { siteConfig } from "@/lib/config";
import { cancelUnpaidOrder, markOrderPaid } from "@/lib/data/orders";
import { sendNewOrderEmails } from "@/lib/email/order-emails";
import { getPaymentProvider } from "@/lib/payments/registry";

/**
 * Point d'entrée générique des notifications de paiement.
 * URL à déclarer chez le prestataire : /api/payments/<id-du-prestataire>/webhook
 * La vérification de signature est de la responsabilité du provider.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/payments/[provider]/webhook">) {
  const { provider: providerId } = await ctx.params;
  const provider = getPaymentProvider(providerId);
  if (!provider?.handleWebhook) {
    return NextResponse.json({ error: "Prestataire inconnu" }, { status: 404 });
  }
  try {
    const result = await provider.handleWebhook(request);
    if (result?.status === "paid") {
      // markOrderPaid ne renvoie la commande que si elle vient de passer en « payée » : un seul envoi d'emails.
      const order = await markOrderPaid(result.orderNumber, result.reference);
      if (order) await sendNewOrderEmails(order, siteConfig.url);
      revalidatePath("/admin", "layout");
    } else if (result?.status === "failed") {
      await cancelUnpaidOrder(result.orderNumber);
      revalidatePath("/", "layout");
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[webhook:${providerId}]`, error);
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }
}
