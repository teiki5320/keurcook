import type { Metadata } from "next";
import { ShopRing, type RingGroup } from "@/components/nuage/ShopRing";
import { ProductListing } from "@/components/shop/ProductListing";
import { getCatalog } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Boutique CBD",
  description:
    "Fleurs, résines, huiles, infusions, cosmétiques CBD français et accessoires. THC ≤ 0,3 %, certificat d'analyse pour chaque produit.",
  alternates: { canonical: "/boutique" },
};

export default async function ShopPage() {
  const { products, categories } = await getCatalog();
  const inCats = (slugs: string[]) => products.filter((p) => slugs.includes(p.category.slug));

  // Une carte par gamme CBD, plus une carte « Accessoires » qui regroupe tous les accessoires.
  const accessorySlugs = categories.filter((c) => c.kind === "accessoire").map((c) => c.slug);
  const groups: RingGroup[] = [
    ...categories
      .filter((c) => c.kind === "cbd")
      .map((c) => ({ key: c.slug, name: c.name, slugs: [c.slug], query: { categorie: c.slug } })),
    { key: "accessoires", name: "Accessoires", slugs: accessorySlugs, query: { type: "accessoire" } },
  ]
    .map((g) => {
      const items = inCats(g.slugs);
      return { ...g, count: items.length, image: items.find((p) => p.featured)?.images[0] ?? items[0]?.images[0] ?? null };
    })
    .filter((g) => g.count > 0);

  return (
    <>
      <ShopRing groups={groups} />
      <div id="produits" className="container-page relative scroll-mt-24 pt-2 pb-16">
        <ProductListing action="/boutique" hideCategoryFilters defaultQuery={groups[0]?.query} />
      </div>
    </>
  );
}
