import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { adminListCategories, adminListProducts } from "@/lib/data/admin";
import { formatPrice } from "@/lib/format";

export const metadata = { title: "Produits" };

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([adminListProducts(), adminListCategories()]);
  const catName = new Map(categories.map((c) => [c.id, c.name]));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest-900">Produits</h1>
        <Link href="/admin/produits/nouveau" className="btn-primary">
          <Plus className="h-4 w-4" aria-hidden /> Nouveau produit
        </Link>
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sage-200 text-xs text-muted uppercase">
            <tr>
              <th className="p-3">Produit</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Origine</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-200">
            {products.map((p) => {
              const stock = p.variants.reduce((s, v) => s + v.stock, 0);
              const prices = p.variants.map((v) => v.priceCents);
              return (
                <tr key={p.id} className="hover:bg-sage-50">
                  <td className="p-3">
                    <Link href={`/admin/produits/${p.id}`} className="flex items-center gap-3 font-medium text-forest-900 hover:underline">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sage-100">
                        <ProductImage src={p.images[0]} alt="" sizes="40px" />
                      </span>
                      {p.name}
                    </Link>
                  </td>
                  <td className="p-3 text-muted">{catName.get(p.categoryId)}</td>
                  <td className="p-3">
                    {p.originCountry ?? "—"}
                  </td>
                  <td className="p-3">{prices.length ? formatPrice(Math.min(...prices)) : "—"}</td>
                  <td className={`p-3 ${stock <= 5 ? "font-semibold text-terracotta-dark" : ""}`}>{stock}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.isActive ? "bg-sage-200 text-forest-800" : "bg-zinc-200 text-zinc-600"}`}>
                      {p.isActive ? "En ligne" : "Masqué"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
