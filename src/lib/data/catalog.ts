import "server-only";
import { cache } from "react";
import { demoCategories, demoProducts } from "../demo/catalog";
import { NORTH_AFRICAN_SLUGS } from "../catalog-utils";
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
  const candidates = products.filter((p) => p.id !== product.id && !NORTH_AFRICAN_SLUGS.has(p.slug));
  return candidates
    .filter((p) => p.categoryId === product.categoryId)
    .concat(candidates.filter((p) => p.categoryId !== product.categoryId))
    .slice(0, limit);
}
