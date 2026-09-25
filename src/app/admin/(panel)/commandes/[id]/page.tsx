import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminGetOrder } from "@/lib/data/admin";
import { formatDateTime, formatPrice } from "@/lib/format";
import { paymentLabel } from "@/lib/payments/registry";

export const metadata = { title: "Commande" };

export default async function OrderDetailPage({ params }: PageProps<"/admin/commandes/[id]">) {
  const { id } = await params;
  const order = await adminGetOrder(id);
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/commandes" className="text-sm text-muted hover:underline">← Commandes</Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-2xl font-semibold text-forest-900">{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
        <span className="text-sm text-muted">{formatDateTime(order.createdAt)}</span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="card p-5 text-sm">
            <h2 className="mb-3 font-semibold">Articles</h2>
            <ul className="divide-y divide-sage-200">
              {order.items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3 py-2">
                  <span>
                    {i.productName} <span className="text-muted">({i.variantLabel})</span> × {i.quantity}
                  </span>
                  <span>{formatPrice(i.unitPriceCents * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-1 border-t border-sage-200 pt-3">
              <p className="flex justify-between"><span>Sous-total</span><span>{formatPrice(order.subtotalCents)}</span></p>
              <p className="flex justify-between"><span>Livraison</span><span>{formatPrice(order.shippingCents)}</span></p>
              <p className="flex justify-between font-semibold"><span>Total TTC</span><span>{formatPrice(order.totalCents)}</span></p>
            </div>
          </section>

          <section className="card grid gap-6 p-5 text-sm sm:grid-cols-2">
            <div>
              <h2 className="mb-2 font-semibold">Client</h2>
              <p>{order.firstName} {order.lastName}</p>
              <p><a href={`mailto:${order.email}`} className="text-forest-700 underline">{order.email}</a></p>
              {order.phone && <p>{order.phone}</p>}
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Livraison</h2>
              <p>{order.addressLine1}</p>
              {order.addressLine2 && <p>{order.addressLine2}</p>}
              <p>{order.postalCode} {order.city} ({order.country})</p>
              {order.notes && <p className="mt-2 rounded-lg bg-sage-50 p-2 text-muted">Note : {order.notes}</p>}
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Paiement</h2>
              <p>Moyen : {paymentLabel(order.paymentProvider)}</p>
              <p>Référence : <span className="font-mono">{order.paymentReference ?? "—"}</span></p>
            </div>
          </section>
        </div>

        <OrderStatusForm order={{ id: order.id, status: order.status, trackingNumber: order.trackingNumber, paymentProvider: order.paymentProvider }} />
      </div>
    </div>
  );
}
