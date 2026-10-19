import "server-only";
import { cache } from "react";
import { demoTop10 } from "../demo/top10";
import type { Top10, Top10Item } from "../top10/types";
import type { ProductWithCategory, Recipe } from "../types";
import { getCatalog } from "./catalog";
import { getConseilBySlug } from "./conseils";
import { getRecipes } from "./recipes";

/** Produit du top, avec sa fiche, ses recettes et ses articles. */
export interface ResolvedTop10Item extends Top10Item {
  rank: number;
  productData: ProductWithCategory;
  asin: string;
  recipesData: Recipe[];
  articlesData: Array<{ slug: string; title: string }>;
}

/** Onglets, dans l'ordre d'affichage. */
export function getTop10s(): Top10[] {
  return demoTop10;
}

export function getTop10BySlug(slug: string): Top10 | null {
  return demoTop10.find((t) => t.slug === slug) ?? null;
}

/**
 * Relie chaque produit à sa fiche, ses recettes et ses articles publiés.
 * Un produit absent, inactif ou sans lien Amazon, une recette inconnue ou un top qui ne compte pas
 * exactement dix produits fait échouer le build : rien d'inventé ne peut être publié.
 */
export const resolveTop10 = cache(async (slug: string): Promise<ResolvedTop10Item[]> => {
  const top = getTop10BySlug(slug);
  if (!top) return [];
  if (top.items.length !== 10) throw new Error(`Top 10 « ${slug} » : ${top.items.length} produits au lieu de 10.`);
  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  return top.items.map((item, i) => {
    const productData = products.find((p) => p.slug === item.product);
    if (!productData?.amazonAsin) throw new Error(`Top 10 « ${slug} » : produit « ${item.product} » introuvable ou sans lien Amazon.`);
    const recipesData = item.recettes.map((s) => {
      const r = recipes.find((x) => x.slug === s);
      if (!r) throw new Error(`Top 10 « ${slug} » : recette « ${s} » introuvable.`);
      return r;
    });
    // Articles programmés pas encore parus : simplement omis.
    const articlesData = (item.articles ?? []).flatMap((s) => {
      const c = getConseilBySlug(s);
      return c ? [{ slug: c.slug, title: c.title }] : [];
    });
    return { ...item, rank: i + 1, productData, asin: productData.amazonAsin, recipesData, articlesData };
  });
});
