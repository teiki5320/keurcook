import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ClearCart } from "@/components/shop/ClearCart";
import { getOrderForCustomer } from "@/lib/data/orders";
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from "@/lib/format";
import { getPaymentProvider } from "@/lib/payments/registry";

export const metadata: Metadata = { title: "Confirmation de commande", robots: { index: false } };

export default async function ConfirmationPage({ params, searchParams }: PageProps<"/commande/confirmation/[number]">) {
  const { number } = await params;
  const { t } = await searchParams;
  const order = await getOrderForCustomer(decodeURIComponent(number), typeof t === "string" ? t : "");
  if (!order) notFound();

  const instructions =
    order.status === "pending_payment" ? getPaymentProvider(order.paymentProvider)?.getInstructions?.(order) ?? null : null;

  return (
    <div className="container-page max-w-3xl py-10">
      <ClearCart orderNumber={order.orderNumber} />
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-forest-600" aria-hidden />
        <h1 className="mt-4 font-display text-3xl text-forest-900 sm:text-4xl">Merci {order.firstName} !</h1>
        <p className="mt-2 text-muted">
          Votre commande <strong className="text-ink">{order.orderNumber}</strong> du {formatDate(order.createdAt)} est
          enregistrée. Un email de confirmation a été envoyé à <strong className="text-ink">{order.email}</strong>.
        </p>
        <p className="mt-3 inline-flex rounded-full bg-sage-100 px-3 py-1 text-sm font-semibold text-forest-800">
          Statut : {ORDER_STATUS_LABELS[order.status]}
        </p>
      </div>

      {instructions && (
        <section className="card mt-8 border-forest-700/30 p-6">
          <h2 className="font-display text-xl text-forest-900">{instructions.title}</h2>
          {instructions.intro && <p className="mt-2 text-sm text-muted">{instructions.intro}</p>}
          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
            {instructions.lines.map((l) => (
              <div key={l.label} className="contents">
                <dt className="text-muted">{l.label}</dt>
                <dd className="font-mono font-semibold break-all">{l.value}</dd>
              </div>
            ))}
          </dl>
          {instructions.note && <p className="mt-4 text-xs text-muted">{instructions.note}</p>}
        </section>
      )}

      <section className="card mt-6 p-6 text-sm">
        <h2 className="mb-3 font-display text-xl text-forest-900">Détail</h2>
        <ul className="divide-y divide-sage-200">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between gap-3 py-2">
              <span>
                {i.productName} <span className="text-muted">({i.variantLabel}) × {i.quantity}</span>
              </span>
              <span>{formatPrice(i.unitPriceCents * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 border-t border-sage-200 pt-3">
          <p className="flex justify-between"><span>Sous-total</span><span>{formatPrice(order.subtotalCents)}</span></p>
          <p className="flex justify-between"><span>Livraison</span><span>{order.shippingCents ? formatPrice(order.shippingCents) : "Offerte"}</span></p>
          <p className="flex justify-between text-base font-semibold"><span>Total TTC</span><span>{formatPrice(order.totalCents)}</span></p>
        </div>
        <div className="mt-5 border-t border-sage-200 pt-4">
          <p className="font-semibold">Livraison</p>
          <p className="mt-1 text-muted">
            {order.firstName} {order.lastName}<br />
            {order.addressLine1}<br />
            {order.addressLine2 && <>{order.addressLine2}<br /></>}
            {order.postalCode} {order.city}
          </p>
          {order.trackingNumber && <p className="mt-2">Numéro de suivi : <strong>{order.trackingNumber}</strong></p>}
        </div>
      </section>

      <p className="mt-8 text-center">
        <Link href="/boutique" className="btn-secondary">Continuer mes achats</Link>
      </p>
    </div>
  );
}
