import type { Metadata } from "next";
import { flattenParams, ProductListing } from "@/components/shop/ProductListing";
import { parseFilters } from "@/lib/data/catalog";

export async function generateMetadata({ searchParams }: PageProps<"/boutique">): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  const title = filters.q
    ? `Recherche « ${filters.q} »`
    : filters.kind === "accessoire"
      ? "Accessoires CBD"
      : filters.kind === "cbd"
        ? "Produits CBD français"
        : "Boutique CBD";
  return {
    title,
    description: "Fleurs, résines, huiles, infusions, cosmétiques CBD français et accessoires. THC ≤ 0,3 %, certificat d'analyse pour chaque produit.",
    alternates: { canonical: "/boutique" },
    // Les pages de recherche/filtres ne sont pas indexées.
    robots: Object.keys(await searchParams).length ? { index: false, follow: true } : undefined,
  };
}

export default async function ShopPage({ searchParams }: PageProps<"/boutique">) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const heading = filters.q
    ? "Résultats de recherche"
    : filters.kind === "accessoire"
      ? "Accessoires"
      : filters.kind === "cbd"
        ? "Produits CBD"
        : "Toute la boutique";

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-4xl text-forest-900">{heading}</h1>
      <ProductListing action="/boutique" filters={filters} rawParams={flattenParams(sp)} />
    </div>
  );
}
