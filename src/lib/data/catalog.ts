import "server-only";
import { cache } from "react";
import { demoCategories, demoProducts } from "../demo/catalog";
import { isSupabaseConfigured } from "../supabase/env";
import { createPublicClient } from "../supabase/public";
import { mapCategory, mapProduct } from "../supabase/mappers";
import type { Category, CategoryKind, Product, ProductWithCategory } from "../types";

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

// ---------------------------------------------------------------- Filtres

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "cbd-desc" | "name";

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Mis en avant" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "cbd-desc", label: "Taux de CBD" },
  { value: "name", label: "Nom (A → Z)" },
];

export interface CatalogFilters {
  q?: string;
  category?: string;
  kind?: CategoryKind;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  minCbd?: number;
  inStock?: boolean;
  sort?: SortKey;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const minPriceCents = (p: Product) => Math.min(...p.variants.map((v) => v.priceCents));
export const totalStock = (p: Product) => p.variants.reduce((sum, v) => sum + v.stock, 0);

export function filterProducts(products: ProductWithCategory[], f: CatalogFilters) {
  const terms = f.q ? normalize(f.q).split(/\s+/).filter(Boolean) : [];

  const result = products.filter((p) => {
    if (f.category && p.category.slug !== f.category) return false;
    if (f.kind && p.category.kind !== f.kind) return false;
    if (f.region && p.originRegion !== f.region) return false;
    if (f.inStock && totalStock(p) <= 0) return false;
    const price = minPriceCents(p);
    if (f.minPrice !== undefined && price < f.minPrice * 100) return false;
    if (f.maxPrice !== undefined && price > f.maxPrice * 100) return false;
    if (f.minCbd !== undefined && (p.cbdRate ?? 0) < f.minCbd) return false;
    if (terms.length) {
      const haystack = normalize(
        [p.name, p.shortDescription, p.description, p.producer, p.originRegion, p.category.name, ...p.tags]
          .filter(Boolean)
          .join(" "),
      );
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    return true;
  });

  const sorters: Record<SortKey, (a: ProductWithCategory, b: ProductWithCategory) => number> = {
    featured: (a, b) => Number(b.featured) - Number(a.featured) || a.category.position - b.category.position,
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => minPriceCents(a) - minPriceCents(b),
    "price-desc": (a, b) => minPriceCents(b) - minPriceCents(a),
    "cbd-desc": (a, b) => (b.cbdRate ?? -1) - (a.cbdRate ?? -1),
    name: (a, b) => a.name.localeCompare(b.name, "fr"),
  };
  return result.sort(sorters[f.sort ?? "featured"]);
}

/** Lit les filtres depuis les paramètres d'URL. */
export function parseFilters(sp: Record<string, string | string[] | undefined>): CatalogFilters {
  const str = (k: string) => {
    const v = sp[k];
    const s = Array.isArray(v) ? v[0] : v;
    return s && s.trim() ? s.trim() : undefined;
  };
  const n = (k: string) => {
    const s = str(k);
    const v = s === undefined ? NaN : Number(s.replace(",", "."));
    return Number.isFinite(v) ? v : undefined;
  };
  const kind = str("type");
  const sort = str("tri") as SortKey | undefined;
  return {
    q: str("q"),
    category: str("categorie"),
    kind: kind === "cbd" || kind === "accessoire" ? kind : undefined,
    region: str("region"),
    minPrice: n("prixMin"),
    maxPrice: n("prixMax"),
    minCbd: n("cbdMin"),
    inStock: str("dispo") === "1",
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? sort : undefined,
  };
}

export function listRegions(products: Product[]) {
  return [...new Set(products.map((p) => p.originRegion).filter((r): r is string => Boolean(r)))].sort(
    (a, b) => a.localeCompare(b, "fr"),
  );
}
