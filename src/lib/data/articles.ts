import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { countryByCode, countryBySlug } from "@/lib/countries";
import { getConseilBySlug } from "@/lib/data/conseils";
import { getRecipes } from "@/lib/data/recipes";
import { nettoyerFichier, type Actu } from "@/lib/veille";
import { getCatalog } from "@/lib/data/catalog";
import { getTop10BySlug, topPourProduit } from "@/lib/data/top10";
import { nettoyerArticle, sujetsDeLActu, type ArticleActu, type FicheLiee } from "@/lib/veille-articles";

/**
 * Articles complets des actus, téléchargés juste avant le build par scripts/articles-veille.ts
 * dans .veille/articles.json (non versionné). Fichier absent ou illisible : aucun article, le build continue.
 */
export const FICHIER_ARTICLES = join(process.cwd(), ".veille", "articles.json");

interface DonneesArticles {
  /** Actus du fichier de la veille au moment du build (pour « Autres actus »). */
  actus: Actu[];
  /** Articles qui deviennent une page /actus/<slug>. */
  articles: ArticleActu[];
}

export const getDonneesArticles = cache((): DonneesArticles => {
  try {
    const brut = JSON.parse(readFileSync(FICHIER_ARTICLES, "utf8")) as { actus?: unknown; articles?: unknown };
    const actus = nettoyerFichier({ actus: brut.actus })?.actus ?? [];
    const vus = new Set<string>();
    const articles = (Array.isArray(brut.articles) ? brut.articles : [])
      .map(nettoyerArticle)
      .filter((a): a is ArticleActu => !!a && !vus.has(a.slug) && !!vus.add(a.slug))
      .sort((a, b) => Date.parse(b.publie_le) - Date.parse(a.publie_le));
    return { actus, articles };
  } catch {
    return { actus: [], articles: [] };
  }
});

/** Articles construits en page, du plus récent au plus ancien. */
export const getArticles = (): ArticleActu[] => getDonneesArticles().articles;

export const getArticleBySlug = (slug: string): ArticleActu | null => getArticles().find((a) => a.slug === slug) ?? null;

/** Slugs des pages /actus/<slug> construites : les cartes d'actus y renvoient. */
export const getSlugsConstruits = (): string[] => getArticles().map((a) => a.slug);

/** Trois autres actus (les plus récentes), pour le bas d'un article. */
export function getAutresActus(id: string, nombre = 3): Actu[] {
  return getDonneesArticles().actus.filter((a) => a.id !== id).slice(0, nombre);
}

/**
 * Fiches du site liées à un article : les tags qui correspondent à une page existante
 * (« recette:mafe », « pays:senegal », « conseil:… »), puis la fiche produit et le Top 10 du sujet de l'actu
 * (ex. une actu sur la vanille → fiche de la vanille bourbon), puis la page de chaque pays cité qui a des recettes.
 * Liens internes seulement : jamais de lien Amazon ni de bouton d'achat dans une actu.
 */
export async function getFichesLiees(article: ArticleActu): Promise<FicheLiee[]> {
  const recipes = await getRecipes();
  const avecRecettes = (code: string) => recipes.some((r) => r.countryCode === code);
  const fiches: FicheLiee[] = [];
  const ajouter = (f: FicheLiee) => !fiches.some((x) => x.href === f.href) && fiches.push(f);
  for (const tag of article.tags ?? []) {
    const [type, slug] = tag.split(":");
    if (!slug) continue;
    if (type === "recette") {
      const r = recipes.find((x) => x.slug === slug);
      if (r) ajouter({ href: `/recette/${r.slug}`, label: `Lire la recette : ${r.name}` });
    } else if (type === "pays") {
      const c = countryBySlug(slug);
      if (c && avecRecettes(c.code)) ajouter({ href: `/pays/${c.slug}`, label: `Découvrir la cuisine ${c.of}` });
    } else if (type === "conseil") {
      const c = getConseilBySlug(slug);
      if (c) ajouter({ href: `/conseils/${c.slug}`, label: `Lire le conseil : ${c.title}` });
    }
  }
  // Sujet de l'actu : une fiche produit du catalogue actif et un Top 10 au plus.
  const { products } = await getCatalog();
  let fiche = false;
  let top = false;
  for (const sujet of sujetsDeLActu(article)) {
    const produit = sujet.produit ? products.find((p) => p.slug === sujet.produit) : undefined;
    if (produit && !fiche) {
      fiche = true;
      ajouter({ href: `/produit/${produit.slug}`, label: `Découvrir la fiche : ${produit.name}` });
    }
    const t = sujet.top ? getTop10BySlug(sujet.top) : produit ? topPourProduit(produit.slug) : null;
    if (t && !top) {
      top = true;
      ajouter({ href: `/top-10/${t.slug}`, label: `Voir notre ${t.title.replace(/^Top 10/, "top 10")}` });
    }
  }
  for (const code of article.pays ?? []) {
    const c = countryByCode(code);
    if (c && avecRecettes(c.code)) ajouter({ href: `/pays/${c.slug}`, label: `Découvrir la cuisine ${c.of}` });
  }
  return fiches.slice(0, 4);
}
