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

/** Lien interne vers un Top 10 (aucun lien Amazon). */
export interface LienTop10 {
  slug: string;
  href: string;
  title: string;
}

const lienTop = (t: Top10): LienTop10 => ({ slug: t.slug, href: `/top-10/${t.slug}`, title: t.title });

/** Le Top 10 où figure un produit (le premier, dans l'ordre des onglets), avec son rang ; null s'il n'y est pas. */
export function topPourProduit(productSlug: string): (LienTop10 & { rank: number }) | null {
  for (const t of demoTop10) {
    const i = t.items.findIndex((it) => it.product === productSlug);
    if (i >= 0) return { ...lienTop(t), rank: i + 1 };
  }
  return null;
}

/**
 * Top 10 liés à une recette (2 au plus) : d'abord ceux qui contiennent un produit de la recette,
 * puis ceux dont le plus de produits citent la recette.
 */
export function topsPourRecette(recipe: Pick<Recipe, "slug" | "ingredients" | "equipment">): LienTop10[] {
  const produits = new Set([...recipe.ingredients.flatMap((i) => (i.productSlug ? [i.productSlug] : [])), ...(recipe.equipment ?? [])]);
  return demoTop10
    .map((t) => ({
      t,
      direct: t.items.some((it) => produits.has(it.product)) ? 1 : 0,
      cites: t.items.filter((it) => it.recettes.includes(recipe.slug)).length,
    }))
    .filter((x) => x.direct || x.cites)
    .sort((a, b) => b.direct - a.direct || b.cites - a.cites)
    .slice(0, 2)
    .map((x) => lienTop(x.t));
}

/** Top 10 liés à un conseil (2 au plus) : ceux qui citent l'article, puis ceux qui contiennent un de ses produits. */
export function topsPourConseil(conseil: { slug: string; produits: string[] }): LienTop10[] {
  return demoTop10
    .map((t) => ({
      t,
      cite: t.items.some((it) => it.articles?.includes(conseil.slug)) ? 1 : 0,
      produits: t.items.filter((it) => conseil.produits.includes(it.product)).length,
    }))
    .filter((x) => x.cite || x.produits)
    .sort((a, b) => b.cite - a.cite || b.produits - a.produits)
    .slice(0, 2)
    .map((x) => lienTop(x.t));
}
