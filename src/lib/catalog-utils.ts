/**
 * Fonctions pures de filtrage / tri du catalogue.
 * Utilisables côté serveur comme côté navigateur (export statique).
 */
import type { CategoryKind, Product, ProductWithCategory } from "./types";

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

/** Lit les filtres depuis un URLSearchParams (navigateur). */
export function filtersFromSearchParams(params: URLSearchParams): CatalogFilters {
  return parseFilters(Object.fromEntries(params.entries()));
}
