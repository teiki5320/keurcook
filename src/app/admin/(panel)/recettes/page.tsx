import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { anton } from "@/components/nuage/typography";
import { countryByCode } from "@/lib/countries";
import { adminListRecipes } from "@/lib/data/admin";
import { courseName, formatDuration } from "@/lib/recipe-utils";

export const metadata = { title: "Recettes" };

export default async function AdminRecipesPage() {
  const recipes = await adminListRecipes();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,5vw,64px)" }}>
          Recettes<span className="text-[#ff7a3d]">.</span>
        </h1>
        <Link href="/admin/recettes/nouveau" className="btn-primary">
          <Plus className="h-4 w-4" aria-hidden /> Nouvelle recette
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted">{recipes.length} recettes · {recipes.filter((r) => r.isPublished).length} publiées</p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-sage-200 text-xs text-muted uppercase">
            <tr>
              <th className="p-3">Recette</th>
              <th className="p-3">Pays</th>
              <th className="p-3">Type</th>
              <th className="p-3">Temps</th>
              <th className="p-3">Avis</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-200">
            {recipes.map((r) => (
              <tr key={r.id} className="hover:bg-sage-50">
                <td className="p-3">
                  <Link href={`/admin/recettes/${r.id}`} className="flex items-center gap-3 font-semibold hover:text-[#ff7a3d]">
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-sage-100">
                      <ProductImage src={r.image} alt="" sizes="56px" />
                    </span>
                    {r.name}
                    {r.featured && <Star className="h-3.5 w-3.5 fill-[#ffc46b] text-[#ffc46b]" aria-label="Mise en avant" />}
                  </Link>
                </td>
                <td className="p-3 text-muted">{countryByCode(r.countryCode)?.name ?? r.countryCode}</td>
                <td className="p-3 text-muted">{courseName(r.course)}</td>
                <td className="p-3 text-muted">{formatDuration(r.prepMinutes + r.cookMinutes)}</td>
                <td className="p-3">{r.reviewCount ? `${r.reviewAvg?.toLocaleString("fr-FR")} ★ (${r.reviewCount})` : "—"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.isPublished ? "bg-[#ff7a3d]/20 text-[#ff7a3d]" : "bg-[#fbeee2]/10 text-[#fbeee2]/60"}`}>
                    {r.isPublished ? "Publiée" : "Brouillon"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {recipes.length === 0 && <p className="p-6 text-sm text-muted">Aucune recette pour le moment.</p>}
      </div>
    </div>
  );
}
