import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminDashboardStats } from "@/lib/data/admin";
import { formatDateTime, formatPrice } from "@/lib/format";

export const metadata = { title: "Tableau de bord" };

export default async function AdminDashboard() {
  const s = await adminDashboardStats();
  const tiles = [
    { label: "En attente de paiement", value: s.pendingPayment, href: "/admin/commandes?statut=pending_payment" },
    { label: "À préparer / expédier", value: s.toShip, href: "/admin/commandes?statut=paid" },
    { label: "Produits en ligne", value: s.activeProducts, href: "/admin/produits" },
    { label: "Variantes en stock bas (≤ 5)", value: s.lowStock, href: "/admin/stocks?bas=1" },
  ];
  return (
    <div>
      <h1 className="font-display text-3xl text-forest-900">Tableau de bord</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="card p-5 transition hover:shadow-md">
            <p className="text-sm text-muted">{t.label}</p>
            <p className="mt-1 text-3xl font-semibold text-forest-900">{t.value}</p>
          </Link>
        ))}
      </div>
      <section className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-sage-200 p-4">
          <h2 className="font-semibold">Dernières commandes</h2>
          <Link href="/admin/commandes" className="text-sm text-forest-700 hover:underline">Tout voir</Link>
        </div>
        {s.recentOrders.length === 0 ? (
          <p className="p-6 text-sm text-muted">Aucune commande pour le moment.</p>
        ) : (
          <ul className="divide-y divide-sage-200">
            {s.recentOrders.map((o) => (
              <li key={o.id}>
                <Link href={`/admin/commandes/${o.id}`} className="flex flex-wrap items-center gap-3 p-4 text-sm hover:bg-sage-50">
                  <span className="font-mono font-semibold">{o.orderNumber}</span>
                  <span className="text-muted">{o.firstName} {o.lastName}</span>
                  <span className="text-muted">{formatDateTime(o.createdAt)}</span>
                  <span className="ml-auto font-semibold">{formatPrice(o.totalCents)}</span>
                  <StatusBadge status={o.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
