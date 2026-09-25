import type { Metadata } from "next";
import { BoutiqueBrowser } from "@/components/shop/BoutiqueBrowser";
import { getCatalog } from "@/lib/data/catalog";
import { getGammes } from "@/lib/data/gammes";

export const metadata: Metadata = {
  title: "Épicerie de produits africains rares",
  description:
    "Épices, céréales anciennes, feuilles séchées, poissons fumés et huiles : les produits africains rares pour réussir nos recettes.",
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
