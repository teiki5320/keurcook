import "server-only";
import { cache } from "react";
import { demoCategories, demoProducts } from "../demo/catalog";
import { getSql, isDbConfigured, PRODUCT_SELECT } from "../db/client";
import { mapCategory, mapProduct } from "../db/mappers";
import type { Category, Product, ProductWithCategory } from "../types";

export interface Catalog {
  categories: Category[];
  products: ProductWithCategory[];
}

/**
 * Charge le catalogue actif (catégories + produits + variantes).
 * Le catalogue d'une boutique CBD reste modeste (quelques centaines de
 * références) : on le charge en une requête puis on filtre en mémoire, ce
 * qui garde un comportement identique en mode démo et avec la base de données.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  let categories: Category[];
  let products: Product[];

  if (isDbConfigured) {
    const sql = getSql();
    const [cats, prods] = await Promise.all([
      sql.query("select * from categories order by position"),
      sql.query(`${PRODUCT_SELECT} where p.is_active order by p.created_at desc`),
    ]);
    categories = cats.map(mapCategory);
    products = prods.map(mapProduct);
  } else {
    categories = demoCategories;
    products = demoProducts.filter((p) => p.isActive);
  }

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
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .concat(products.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId && p.category.kind === product.category.kind))
    .slice(0, limit);
}
