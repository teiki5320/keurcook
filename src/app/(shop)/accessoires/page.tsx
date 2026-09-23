import type { Metadata } from "next";
import Link from "next/link";
import { Coverflow } from "@/components/nuage/Coverflow";
import { ProductListing } from "@/components/shop/ProductListing";
import { getGammes, productCards } from "@/lib/data/gammes";

export const metadata: Metadata = {
  title: "Accessoires",
  description: "Grinders, vaporisateurs, feuilles et boîtes de conservation.",
  alternates: { canonical: "/accessoires" },
};

export default async function AccessoriesPage() {
  const gamme = (await getGammes()).find((g) => g.key === "accessoires");
  const items = gamme?.products ?? [];

  return (
    <div className="container-page pb-10">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <span className="text-ink">Accessoires</span>
      </nav>
      <h1 className="font-display text-4xl text-forest-900">Accessoires</h1>
      <p className="mt-2 max-w-2xl text-muted">{gamme?.description}</p>
      <div className="-mx-4 mt-2 mb-8 sm:-mx-6 lg:-mx-8">
        <Coverflow items={productCards(items)} />
      </div>
      <h2 className="mb-6 font-display text-3xl text-forest-900">Tous les articles</h2>
      <ProductListing action="/accessoires" hideCategoryFilters defaultQuery={{ type: "accessoire" }} />
    </div>
  );
}
