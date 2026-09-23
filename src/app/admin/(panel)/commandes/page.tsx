import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminListOrders } from "@/lib/data/admin";
import { formatDateTime, formatPrice, ORDER_STATUS_LABELS } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

export const metadata = { title: "Commandes" };

export default async function OrdersPage({ searchParams }: PageProps<"/admin/commandes">) {
  const { statut } = await searchParams;
  const status = typeof statut === "string" && statut in ORDER_STATUS_LABELS ? (statut as OrderStatus) : undefined;
  const orders = await adminListOrders(status);

  return (
    <div>
      <h1 className="font-display text-3xl text-forest-900">Commandes</h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link href="/admin/commandes" className={`rounded-full px-3 py-1 ${!status ? "bg-forest-700 text-cream" : "bg-white"}`}>Toutes</Link>
        {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
          <Link key={value} href={`/admin/commandes?statut=${value}`} className={`rounded-full px-3 py-1 ${status === value ? "bg-forest-700 text-cream" : "bg-white"}`}>
            {label}
          </Link>
        ))}
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sage-200 text-xs text-muted uppercase">
            <tr>
              <th className="p-3">N°</th>
              <th className="p-3">Date</th>
              <th className="p-3">Client</th>
              <th className="p-3">Articles</th>
              <th className="p-3">Total</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-200">
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-muted">Aucune commande.</td></tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-sage-50">
                <td className="p-3">
                  <Link href={`/admin/commandes/${o.id}`} className="font-mono font-semibold text-forest-800 hover:underline">{o.orderNumber}</Link>
                </td>
                <td className="p-3 text-muted">{formatDateTime(o.createdAt)}</td>
                <td className="p-3">{o.firstName} {o.lastName}<br /><span className="text-xs text-muted">{o.email}</span></td>
                <td className="p-3">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                <td className="p-3 font-semibold">{formatPrice(o.totalCents)}</td>
                <td className="p-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
