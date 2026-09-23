/**
 * Fonctions pures de filtrage / tri du catalogue.
 * Utilisables côté serveur comme côté navigateur (export statique).
 */
import type { CategoryKind, Product, ProductWithCategory } from "./types";

// ---------------------------------------------------------------- Filtres

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "cbd-desc" | "name";

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
