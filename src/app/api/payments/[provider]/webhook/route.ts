import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { markOrderPaid } from "@/lib/data/orders";
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
      await markOrderPaid(result.orderNumber, result.reference);
      revalidatePath("/admin", "layout");
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[webhook:${providerId}]`, error);
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }
}
