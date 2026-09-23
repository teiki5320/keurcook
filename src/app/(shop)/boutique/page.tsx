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
  const { products, categories } = await getCatalog();
  const cbd = categories.filter((c) => c.kind === "cbd");
  const ring = products.filter((p) => p.category.kind === "cbd").map(toMini).slice(0, 12);

  return (
    <>
      <ShopRing products={ring} categories={cbd.map((c) => ({ slug: c.slug, name: c.name }))} />
      <div className="relative mx-3 mb-10 overflow-hidden rounded-[32px] bg-cream text-ink sm:mx-6 xl:mx-auto xl:max-w-[1280px]">
        <div className="container-page py-10">
          <ProductListing action="/boutique" showHeading />
        </div>
      </div>
    </>
  );
}
