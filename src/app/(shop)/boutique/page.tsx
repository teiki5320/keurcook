import type { Metadata } from "next";
import { toMini } from "@/components/nuage/mini";
import { ShopRing } from "@/components/nuage/ShopRing";
import { ProductListing } from "@/components/shop/ProductListing";
import { getCatalog } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Boutique CBD",
  description:
    "Fleurs, résines, huiles, infusions, cosmétiques CBD français et accessoires. THC ≤ 0,3 %, certificat d'analyse pour chaque produit.",
  alternates: { canonical: "/boutique" },
};

export default async function ShopPage() {
  const { products } = await getCatalog();
  // Produits rangés gamme par gamme : en glissant, on passe d'une gamme à la suivante.
  const ring = [...products]
    .sort((a, b) => a.category.position - b.category.position || Number(b.featured) - Number(a.featured))
    .map(toMini);

  return (
    <>
      <ShopRing products={ring} />
      <div id="produits" className="container-page relative scroll-mt-24 pt-2 pb-16">
        <ProductListing action="/boutique" hideCategoryFilters defaultQuery={ring[0] ? { categorie: ring[0].categorySlug } : undefined} />
      </div>
    </>
  );
}
