/**
 * Fonctions pures de recherche / tri du catalogue.
 * Utilisables côté serveur comme côté navigateur (export statique).
 */
import type { Product, ProductWithCategory } from "./types";

export type SortKey = "featured" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Mis en avant" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

export interface CatalogFilters {
  q?: string;
  sort?: SortKey;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const minPriceCents = (p: Product) => Math.min(...p.variants.map((v) => v.priceCents));
export const totalStock = (p: Product) => p.variants.reduce((sum, v) => sum + v.stock, 0);

export function filterProducts(products: ProductWithCategory[], f: CatalogFilters) {
  const terms = f.q ? normalize(f.q).split(/\s+/).filter(Boolean) : [];

  const result = products.filter((p) => {
    if (!terms.length) return true;
    const haystack = normalize(
      [p.name, p.shortDescription, p.description, p.producer, p.originCountry, p.originRegion, p.category.name, ...p.tags]
        .filter(Boolean)
        .join(" "),
    );
    return terms.every((t) => haystack.includes(t));
  });

  // Tri stable : à égalité, l'ordre d'origine (catégorie puis catalogue) est conservé.
  const sorters: Record<SortKey, (a: ProductWithCategory, b: ProductWithCategory) => number> = {
    featured: (a, b) => Number(b.featured) - Number(a.featured),
    "price-asc": (a, b) => minPriceCents(a) - minPriceCents(b),
    "price-desc": (a, b) => minPriceCents(b) - minPriceCents(a),
  };
  return result.sort(sorters[f.sort ?? "featured"]);
}
