import Link from "next/link";
import { ChefHat, Mail, MessageSquareText, Package, PauseCircle } from "lucide-react";
import { anton } from "@/components/nuage/typography";
import { adminDashboardStats, adminListReviews } from "@/lib/data/admin";
import { getMaintenance } from "@/lib/data/settings";

export const metadata = { title: "Tableau de bord" };

export default async function AdminDashboard() {
  const [s, maintenance, reviews] = await Promise.all([adminDashboardStats(), getMaintenance(), adminListReviews("pending")]);
  const tiles = [
    { label: "Recettes publiées", value: s.publishedRecipes, href: "/admin/recettes", icon: ChefHat },
    { label: "Avis à valider", value: s.pendingReviews, href: "/admin/avis", icon: MessageSquareText, hot: s.pendingReviews > 0 },
    { label: "Inscrits newsletter", value: s.subscribers, href: "/admin/newsletter", icon: Mail },
    { label: "Produits en ligne", value: s.activeProducts, href: "/admin/produits", icon: Package },
  ];
  return (
    <div>
      <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,5vw,64px)" }}>
        Tableau de bord<span className="text-[#ff7a3d]">.</span>
      </h1>
      {maintenance.enabled && (
        <Link href="/admin/maintenance" className="mt-5 flex items-center gap-3 rounded-2xl border border-[#ffc46b]/50 bg-[#ffc46b]/10 p-4 text-sm hover:bg-[#ffc46b]/15">
          <PauseCircle className="h-5 w-5 shrink-0 text-[#ffc46b]" aria-hidden />
          <span>
            Le site est <strong>en maintenance</strong> : les visiteurs voient l&apos;écran de pause. <u>Gérer</u>
          </span>
        </Link>
      )}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className={`card flex items-center gap-4 p-5 transition hover:border-[#ff7a3d] ${t.hot ? "border-[#ff7a3d]/60" : ""}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${t.hot ? "bg-[#ff7a3d] text-[#140a07]" : "bg-[#fbeee2]/8 text-[#ffc46b]"}`}>
              <t.icon className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-3xl leading-none" style={anton}>{t.value}</span>
              <span className="mt-1 block text-xs text-muted">{t.label}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-sage-200 p-4">
            <h2 className="font-display text-xl">Avis à valider</h2>
            <Link href="/admin/avis" className="text-sm text-[#ff7a3d] hover:underline">Tout voir</Link>
          </div>
          {reviews.length === 0 ? (
            <p className="p-6 text-sm text-muted">Aucun avis en attente.</p>
          ) : (
            <ul className="divide-y divide-sage-200">
              {reviews.slice(0, 5).map((r) => (
                <li key={r.id} className="p-4 text-sm">
                  <p>
                    <strong>{r.authorName}</strong> · {"★".repeat(r.rating)}
                    <span className="text-[#fbeee2]/30">{"★".repeat(5 - r.rating)}</span> · <span className="text-muted">{r.recipeName}</span>
                  </p>
                  {r.comment && <p className="mt-1 line-clamp-2 text-muted">{r.comment}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
}
