import type { Metadata } from "next";
import { BoutiqueBrowser } from "@/components/shop/BoutiqueBrowser";
import { getCatalog } from "@/lib/data/catalog";
import { getGammes } from "@/lib/data/gammes";

export const metadata: Metadata = {
  title: "Produits africains à acheter sur Amazon",
  description:
    "Épices, céréales, feuilles séchées, huiles, cafés, thés et ustensiles : une sélection de produits africains disponibles sur Amazon pour réussir nos recettes.",
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
