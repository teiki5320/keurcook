import type { Metadata } from "next";
import { BoutiqueBrowser } from "@/components/shop/BoutiqueBrowser";
import { getCatalog } from "@/lib/data/catalog";
import { getGammes } from "@/lib/data/gammes";

export const metadata: Metadata = {
  title: "Boutique CBD",
  description:
    "Fleurs, résines, huiles, infusions, cosmétiques CBD français et accessoires. THC ≤ 0,3 %, certificat d'analyse pour chaque produit.",
  alternates: { canonical: "/boutique" },
};

export default async function ShopPage() {
  const [gammes, { products }] = await Promise.all([getGammes(), getCatalog()]);
  return (
    <BoutiqueBrowser
      gammes={gammes.map(({ key, name, description, image, products }) => ({ key, name, description, image, products }))}
      allProducts={products}
    />
  );
}
