/**
 * Articles complets des actus, téléchargés avant chaque build (prebuild) dans .veille/articles.json (non versionné).
 * Chaque article devient une page /actus/<slug> (src/app/(shop)/actus/[slug]/page.tsx).
 *
 * Ne casse jamais le build : veille injoignable, fichier illisible ou article invalide = simplement moins de pages.
 *
 * Réglages (facultatifs) :
 * - VEILLE_HORS_LIGNE=1 : n'interroge pas la veille (0 page article) ;
 * - VEILLE_DOSSIER=<dossier> : lit actus/keurcook.json et articles/keurcook/<id>.json dans une copie locale de la veille.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { URL_VEILLE, nettoyerFichier, type Actu } from "../src/lib/veille";
import { BASE_ARTICLES, aUnArticle, nettoyerArticle, type ArticleActu } from "../src/lib/veille-articles";

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

async function principal() {
  if (process.env.VEILLE_HORS_LIGNE === "1") {
    ecrire([], []);
    console.log("Articles de la veille : hors ligne demandé, 0 page article.");
    return;
  }
  let actus: Actu[] = [];
  try {
    actus = nettoyerFichier(await lireJson(URL_VEILLE))?.actus ?? [];
  } catch (e) {
    ecrire([], []);
    console.warn(`Articles de la veille : fichier des actus injoignable (${(e as Error).message}), 0 page article.`);
    return;
  }
  const avecArticle = actus.filter(aUnArticle);
  const resultats = await Promise.all(
    avecArticle.map(async (a) => {
      try {
        const art = nettoyerArticle(await lireJson(`${BASE_ARTICLES}${a.id}.json`));
        // L'article doit bien être celui de l'actu (même id, même adresse).
        return art && art.id === a.id && art.slug === a.slug ? art : null;
      } catch {
        return null;
      }
    }),
  );
  const articles = resultats.filter((a): a is ArticleActu => !!a);
  ecrire(actus, articles);
  console.log(`Articles de la veille : ${actus.length} actus, ${avecArticle.length} avec article, ${articles.length} page(s) article construite(s).`);
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
