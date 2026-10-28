/**
 * Articles complets des actus, téléchargés avant chaque build (prebuild) dans .veille/articles.json (non versionné).
 * Chaque article de l'index articles/keurcook/index.json (tous les articles jamais publiés, jamais supprimés),
 * plus ceux des actus récentes pas encore indexés, devient une page /actus/<slug> (src/app/(shop)/actus/[slug]/page.tsx).
 *
 * Ne casse jamais le build : veille injoignable, fichier illisible ou article invalide = simplement moins de pages.
 *
 * Réglages (facultatifs) :
 * - VEILLE_HORS_LIGNE=1 : n'interroge pas la veille (0 page article) ;
 * - VEILLE_DOSSIER=<dossier> : lit actus/keurcook.json, articles/keurcook/index.json et articles/keurcook/<id>.json dans une copie locale de la veille.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { URL_VEILLE, nettoyerFichier, type Actu } from "../src/lib/veille";
import { BASE_ARTICLES, URL_INDEX_ARTICLES, articlesAConstruire, entreesIndex, nettoyerArticle, type ArticleActu, type EntreeArticle } from "../src/lib/veille-articles";

const SORTIE = join(import.meta.dirname, "..", ".veille", "articles.json");
const DELAI_MS = 10_000;
const DOSSIER = process.env.VEILLE_DOSSIER;

async function lireJson(url: string): Promise<unknown> {
  if (DOSSIER) {
    const relatif = url.replace("https://teiki5320.github.io/veille/", "");
    return JSON.parse(readFileSync(join(DOSSIER, relatif), "utf8"));
  }
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
  try {
    const rep = await fetch(url, { signal: ctrl.signal, headers: { "Cache-Control": "no-cache" } });
    if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
    return await rep.json();
  } finally {
    clearTimeout(minuteur);
  }
}

function ecrire(actus: Actu[], articles: ArticleActu[]) {
  mkdirSync(dirname(SORTIE), { recursive: true });
  writeFileSync(SORTIE, JSON.stringify({ genere_le: new Date().toISOString(), actus, articles }));
}

/** Lance les tâches par lots (pas plus de 8 téléchargements à la fois). */
async function parLots<T, R>(liste: T[], f: (x: T) => Promise<R>, taille = 8): Promise<R[]> {
  const sortie: R[] = [];
  for (let i = 0; i < liste.length; i += taille) sortie.push(...(await Promise.all(liste.slice(i, i + taille).map(f))));
  return sortie;
}

/** Un article, avec un second essai si la veille ne répond pas du premier coup. */
async function lireArticle(e: EntreeArticle): Promise<ArticleActu | null> {
  for (let essai = 0; essai < 2; essai++) {
    try {
      const art = nettoyerArticle(await lireJson(`${BASE_ARTICLES}${e.id}.json`));
      // L'article doit bien être celui annoncé (même id, même adresse).
      return art && art.id === e.id && art.slug === e.slug ? art : null;
    } catch {
      // Nouvel essai, puis abandon : la page manquera à ce build seulement.
    }
  }
  return null;
}

async function principal() {
  if (process.env.VEILLE_HORS_LIGNE === "1") {
    ecrire([], []);
    console.log("Articles de la veille : hors ligne demandé, 0 page article.");
    return;
  }
  // Actus récentes : pour « Autres actus » et pour les articles pas encore dans l'index.
  let actus: Actu[] = [];
  try {
    actus = nettoyerFichier(await lireJson(URL_VEILLE))?.actus ?? [];
  } catch (e) {
    console.warn(`Articles de la veille : fichier des actus injoignable (${(e as Error).message}).`);
  }
  // Index de tous les articles jamais publiés : une page déjà construite (et indexée par Google) ne disparaît jamais.
  let index: EntreeArticle[] = [];
  try {
    index = entreesIndex(await lireJson(URL_INDEX_ARTICLES));
  } catch (e) {
    console.warn(`Articles de la veille : index des articles injoignable (${(e as Error).message}).`);
  }
  const aConstruire = articlesAConstruire(index, actus);
  const articles = (await parLots(aConstruire, lireArticle)).filter((a): a is ArticleActu => !!a);
  ecrire(actus, articles);
  console.log(`Articles de la veille : ${index.length} dans l'index, ${actus.length} actus récentes, ${articles.length}/${aConstruire.length} page(s) article construite(s).`);
}

principal().catch((e) => {
  // Filet de sécurité : jamais d'échec du build à cause de la veille.
  try {
    ecrire([], []);
  } catch {
    // Rien à faire.
  }
  console.warn(`Articles de la veille : erreur inattendue (${(e as Error).message}), 0 page article.`);
});
