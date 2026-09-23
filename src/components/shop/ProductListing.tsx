import { getCatalog } from "@/lib/data/catalog";
import type { CategoryKind } from "@/lib/types";
import { CatalogBrowser } from "./CatalogBrowser";

/**
 * Liste de produits filtrable, partagée par /boutique et /categorie/[slug].
 * Le catalogue est rendu côté serveur (HTML statique indexable) puis filtré
 * dans le navigateur selon les paramètres d'URL — ce qui fonctionne aussi
 * en export statique (GitHub Pages).
 */
export async function ProductListing({
  action,
  lockedCategory,
  showHeading,
}: {
  action: string;
  lockedCategory?: { slug: string; kind: CategoryKind };
  showHeading?: boolean;
}) {
  const { products, categories } = await getCatalog();
  return (
    <CatalogBrowser
      products={products}
      categories={categories}
      action={action}
      lockedCategory={lockedCategory}
      showHeading={showHeading}
    />
  );
}
