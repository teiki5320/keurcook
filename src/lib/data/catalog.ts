import "server-only";
import { cache } from "react";
import { demoCategories, demoProducts } from "../demo/catalog";
import { isSupabaseConfigured } from "../supabase/env";
import { createPublicClient } from "../supabase/public";
import { mapCategory, mapProduct } from "../supabase/mappers";
import type { Category, Product, ProductWithCategory } from "../types";

export interface Catalog {
  categories: Category[];
  products: ProductWithCategory[];
}

/**
 * Charge le catalogue actif (catégories + produits + variantes).
 * Le catalogue d'une boutique CBD reste modeste (quelques centaines de
 * références) : on le charge en une requête puis on filtre en mémoire, ce
 * qui garde un comportement identique en mode démo et avec Supabase.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  let categories: Category[];
  let products: Product[];

  if (isSupabaseConfigured) {
    const supabase = createPublicClient();
    const [cats, prods] = await Promise.all([
      supabase.from("categories").select("*").order("position"),
      supabase
        .from("products")
        .select("*, product_variants(*)")
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
    ]);
    if (cats.error) throw new Error(`Supabase (categories) : ${cats.error.message}`);
    if (prods.error) throw new Error(`Supabase (products) : ${prods.error.message}`);
    categories = cats.data.map(mapCategory);
    products = prods.data.map(mapProduct);
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

export async function getCategoryBySlug(slug: string) {
  const { categories } = await getCatalog();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProductBySlug(slug: string) {
  const { products } = await getCatalog();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  const { products } = await getCatalog();
  return products.filter((p) => p.featured).slice(0, limit);
}

export async function getRelatedProducts(product: ProductWithCategory, limit = 4) {
  const { products } = await getCatalog();
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .concat(products.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId && p.category.kind === product.category.kind))
    .slice(0, limit);
}
