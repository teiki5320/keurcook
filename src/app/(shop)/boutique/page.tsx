import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BoutiqueBrowser } from "@/components/shop/BoutiqueBrowser";
import { getCatalog } from "@/lib/data/catalog";
import { getMaintenance } from "@/lib/data/settings";
import { getGammes } from "@/lib/data/gammes";
import { siteConfig } from "@/lib/config";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Produits africains à acheter sur Amazon",
  description:
    "Épices, céréales, feuilles séchées, huiles, cafés, thés et ustensiles : une sélection de produits africains disponibles sur Amazon pour réussir nos recettes.",
  path: "/boutique",
});

export default async function ShopPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const [gammes, { products }] = await Promise.all([getGammes(), getCatalog()]);
  return (
    <>
      <JsonLdScript
        data={[
          breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Boutique", url: `${siteConfig.url}/boutique` }]),
          itemListLd("Produits africains rares", products.map((p) => ({ name: p.name, url: `${siteConfig.url}/produit/${p.slug}` }))),
        ]}
      />
      <BoutiqueBrowser
        gammes={gammes.map(({ key, name, description, image, products }) => ({ key, name, description, image, products }))}
        allProducts={products}
      />
    </>
  );
}
