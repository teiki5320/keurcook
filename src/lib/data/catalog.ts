import "server-only";
import { cache } from "react";
import { demoCategories, demoProducts } from "../demo/catalog";
import { NORTH_AFRICAN_SLUGS } from "../catalog-utils";
import { COUPS_DE_COEUR } from "../coups-de-coeur";
import type { Category, Product, ProductWithCategory } from "../types";

export interface Catalog {
  categories: Category[];
  products: ProductWithCategory[];
}

/** Catalogue actif (gammes + produits), écrit dans src/lib/demo/catalog*.ts. */
export const getCatalog = cache(async (): Promise<Catalog> => {
  const categories: Category[] = demoCategories;
  const products: Product[] = demoProducts.filter((p) => p.isActive);

  const byId = new Map(categories.map((c) => [c.id, c]));
  return {
    categories,
    products: products
      .filter((p) => byId.has(p.categoryId) && p.variants.length > 0)
      .map((p) => ({ ...p, category: byId.get(p.categoryId)! })),
  };
});

export async function getProductBySlug(slug: string) {
  const { products } = await getCatalog();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProducts(product: ProductWithCategory, limit = 4) {
  const { products } = await getCatalog();
  const candidates = products.filter((p) => !NORTH_AFRICAN_SLUGS.has(p.slug));
  // Les produits qui suivent dans la même gamme (en revenant au début) : chaque fiche reçoit ainsi des liens
  // de plusieurs autres fiches, et pas seulement les premières de la gamme.
  const sameRange = candidates.filter((p) => p.categoryId === product.categoryId);
  const start = sameRange.findIndex((p) => p.id === product.id);
  const next = sameRange.slice(start + 1).concat(sameRange.slice(0, Math.max(start, 0))).filter((p) => p.id !== product.id);
  return next.concat(candidates.filter((p) => p.categoryId !== product.categoryId)).slice(0, limit);
}

/** Produits « Nos coups de cœur » de l'accueil, dans l'ordre choisi ; les produits masqués sont omis. */
export async function getCoupsDeCoeur() {
  const { products } = await getCatalog();
  return COUPS_DE_COEUR.flatMap((slug) => products.filter((p) => p.slug === slug));
}
