/**
 * Fonctions pures de recherche / tri du catalogue.
 * Utilisables côté serveur comme côté navigateur (export statique).
 */
import type { ProductWithCategory } from "./types";

export type SortKey = "featured" | "name";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Mis en avant" },
  // Pas de tri par prix : le site n'affiche aucun prix (seul celui d'Amazon fait foi).
  { value: "name", label: "Ordre alphabétique" },
];

export interface CatalogFilters {
  q?: string;
  sort?: SortKey;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();


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
    name: (a, b) => a.name.localeCompare(b.name, "fr"),
  };
  return result.sort(sorters[f.sort ?? "featured"]);
}

/** Gamme qui ne contient pas de denrées (pas de liste d'ingrédients ni d'allergènes exigés). */
export const NON_FOOD_CATEGORY = "ustensiles";

/**
 * Produits d'Afrique du Nord : gardés dans la boutique, mais jamais proposés en suggestion
 * sur les autres fiches (le site est centré sur l'Afrique subsaharienne).
 */
export const NORTH_AFRICAN_SLUGS = new Set([
  "ras-el-hanout",
  "epices-tunisiennes",
  "dukkah",
  "dattes-deglet-nour",
  "huile-d-argan",
  "citrons-beldi-confits",
  "harissa-artisanale",
  "tajine-en-argile",
]);

/** Livres : l'image est une illustration Keur Cook, pas la couverture de l'édition vendue (comme sur Keurbook). */
export const BOOK_ILLUSTRATION_NOTE = "Illustration Keur Cook d'après la description du livre. L'édition vendue sur Amazon a sa propre couverture.";
export const isBook = (p: { category: { slug: string } }) => p.category.slug === "livres";
