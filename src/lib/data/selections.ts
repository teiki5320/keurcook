import "server-only";
import { cache } from "react";
import { demoSelections } from "../demo/selections";
import type { Selection, SelectionItem } from "../selections/types";
import type { ProductWithCategory, Recipe } from "../types";
import { getCatalog } from "./catalog";
import { getRecipes } from "./recipes";

/** Produit de la sélection, avec sa fiche et ses recettes. */
export interface ResolvedItem extends SelectionItem {
  rank: number;
  productData: ProductWithCategory;
  asin: string;
  recipesData: Recipe[];
}

export function getSelections(): Selection[] {
  return demoSelections;
}

export function getSelectionBySlug(slug: string): Selection | null {
  return demoSelections.find((s) => s.slug === slug) ?? null;
}

/**
 * Relie chaque produit de la sélection à sa fiche et à ses recettes.
 * Un produit absent, inactif ou sans lien Amazon, ou une recette inconnue, fait échouer le build :
 * rien d'inventé ne peut être publié.
 */
export const resolveSelection = cache(async (slug: string): Promise<ResolvedItem[]> => {
  const selection = getSelectionBySlug(slug);
  if (!selection) return [];
  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  return selection.items.map((item, i) => {
    const productData = products.find((p) => p.slug === item.product);
    if (!productData?.amazonAsin) throw new Error(`Sélection « ${slug} » : produit « ${item.product} » introuvable ou sans lien Amazon.`);
    const recipesData = item.recettes.map((s) => {
      const r = recipes.find((x) => x.slug === s);
      if (!r) throw new Error(`Sélection « ${slug} » : recette « ${s} » introuvable.`);
      return r;
    });
    return { ...item, rank: i + 1, productData, asin: productData.amazonAsin, recipesData };
  });
});
