/**
 * Tests des articles complets des actus : nettoyage d'un article, choix du lien d'une carte,
 * page de secours (chargement dans le navigateur) et garde-fous des textes.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import type { Actu } from "../src/lib/veille";
import { BASE_ARTICLES, PAGE_SECOURS, articlesAConstruire, chargerArticle, dateLongue, entreesIndex, lienActu, nettoyerArticle, type ArticleActu } from "../src/lib/veille-articles";

const ID = "0634a1f512649530f376ea40256aee6efc045af7";
const SLUG = "la-tunisie-fete-son-huile-olive-du-28-au-31-octobre-0634a1";
const IMAGE = {
  url: `https://teiki5320.github.io/veille/images/keurcook/${ID}.webp`,
  source: "wikimedia" as const,
  credit: "Emna Mizouni",
  licence: "CC BY-SA 4.0",
  page: "https://commons.wikimedia.org/wiki/File:Olive_oil_and_honey.jpg",
  alt: "De l'huile d'olive de Tunisie",
  largeur: 1600,
  hauteur: 900,
};

const article = (x: Partial<ArticleActu> & Record<string, unknown> = {}) => ({
  version: 1,
  site: "keurcook",
  id: ID,
  slug: SLUG,
  titre: "La Tunisie fête son huile d'olive du 28 au 31 octobre",
  chapo: "Quatre jours consacrés à l'huile d'olive tunisienne, avec un concours, des ateliers et une dégustation.",
  blocs: [
    { intertitre: null, paragraphes: ["Un premier paragraphe réécrit pour le test, assez long."] },
    { intertitre: "Un concours", paragraphes: ["Un deuxième paragraphe réécrit pour le test.", "  "] },
  ],
  mots: 320,
  lecture_min: 2,
  theme: "cuisine",
  pays: ["TN"],
  source_nom: "AllAfrica",
  source_url: "https://fr.allafrica.com/stories/202610260790.html",
  autres_sources: ["https://www.rfi.fr/fr/exemple", "javascript:alert(1)"],
  publie_le: "2026-10-26T16:41:43.000Z",
  redige_le: "2026-10-28T00:33:54.439Z",
  image: IMAGE,
  ...x,
});

const actu = (x: Partial<Actu> = {}): Actu => ({
  id: ID,
  titre: "La Tunisie fête son huile d'olive",
  resume: "Résumé.",
  source_nom: "AllAfrica",
  source_url: "https://fr.allafrica.com/stories/202610260790.html",
  publie_le: "2026-10-26T16:41:43.000Z",
  image: IMAGE,
  slug: SLUG,
  article_url: `${BASE_ARTICLES}${ID}.json`,
  lecture_min: 2,
  ...x,
});

/** Faux fetch : renvoie le corps donné (ou une erreur réseau). */
const fauxFetch = (corps: unknown, status = 200) =>
  (async (url: string | URL | Request) => {
    if (corps instanceof Error) throw corps;
    assert.equal(String(url), `${BASE_ARTICLES}${ID}.json`);
    return new Response(JSON.stringify(corps), { status });
  }) as typeof fetch;

describe("articles des actus", () => {
  it("nettoie un article conforme : paragraphes vides et autres sources non http écartés", () => {
    const a = nettoyerArticle(article());
    assert.ok(a);
    assert.equal(a.blocs[1].paragraphes.length, 1);
    assert.deepEqual(a.autres_sources, ["https://www.rfi.fr/fr/exemple"]);
    assert.equal(a.lecture_min, 2);
  });

  it("refuse un article incomplet ou peu sûr", () => {
    assert.equal(nettoyerArticle(null), null);
    assert.equal(nettoyerArticle(article({ id: "abc" })), null);
    assert.equal(nettoyerArticle(article({ slug: "Pas Un Slug" })), null);
    assert.equal(nettoyerArticle(article({ blocs: [] })), null);
    assert.equal(nettoyerArticle(article({ source_url: "https://www.amazon.fr/dp/123?tag=keurcookfr-21" })), null);
    assert.equal(nettoyerArticle(article({ image: { ...IMAGE, url: "https://exemple.com/photo.webp" } })), null);
    assert.equal(nettoyerArticle(article({ redige_le: "pas une date" })), null);
  });

  it("lien d'une carte : page construite, sinon page de secours, sinon la source", () => {
    assert.deepEqual(lienActu(actu(), [SLUG]), { href: `/actus/${SLUG}`, interne: true });
    assert.deepEqual(lienActu(actu(), new Set([SLUG])), { href: `/actus/${SLUG}`, interne: true });
    assert.deepEqual(lienActu(actu(), []), { href: `${PAGE_SECOURS}?id=${ID}`, interne: true });
    const sansArticle = actu({ slug: undefined, article_url: undefined, lecture_min: undefined });
    assert.deepEqual(lienActu(sansArticle, [SLUG]), { href: sansArticle.source_url, interne: false });
    // Fichier d'article qui ne vient pas de la veille de Keur Cook : pas de page de secours.
    assert.equal(lienActu(actu({ article_url: "https://exemple.com/a.json" }), []).interne, false);
  });

  it("page de secours : charge l'article de la veille", async () => {
    const a = await chargerArticle(ID, fauxFetch(article()));
    assert.equal(a?.slug, SLUG);
  });

  it("page de secours : id inconnu, invalide, fichier absent ou cassé = null (message « Article introuvable »)", async () => {
    assert.equal(await chargerArticle("../../secret", fauxFetch(article())), null);
    assert.equal(await chargerArticle(null, fauxFetch(article())), null);
    assert.equal(await chargerArticle(ID, fauxFetch({ message: "Not Found" }, 404)), null);
    assert.equal(await chargerArticle(ID, fauxFetch("<html>")), null);
    assert.equal(await chargerArticle(ID, fauxFetch(article({ id: "f".repeat(40) }))), null);
    assert.equal(await chargerArticle(ID, fauxFetch(new Error("réseau coupé"))), null);
  });

  it("page de secours : noindex, et absente du sitemap", () => {
    assert.match(readFileSync("src/app/(shop)/actus/article/page.tsx", "utf8"), /noindex: true/);
    const sitemap = readFileSync("src/app/sitemap.ts", "utf8").replace(/\/\/.*$/gm, "");
    assert.doesNotMatch(sitemap, /actus\/article/);
  });

  it("index des articles : entrées valides seulement, index illisible = []", () => {
    const vieux = "a".repeat(40);
    const index = entreesIndex({
      version: 1,
      articles: [
        { id: vieux, slug: "vieil-article-aaaaaa", url: `${BASE_ARTICLES}${vieux}.json` },
        { id: "b".repeat(40), slug: "autre-site-bbbbbb", url: "https://teiki5320.github.io/veille/articles/keurfoot/x.json" },
        { id: "zz", slug: "mauvais-id" },
        { id: "c".repeat(40), slug: "Pas Un Slug" },
      ],
    });
    assert.deepEqual(index, [{ id: vieux, slug: "vieil-article-aaaaaa" }]);
    assert.deepEqual(entreesIndex("<html>"), []);
    assert.deepEqual(entreesIndex({ articles: "rien" }), []);
  });

  it("pages à construire : tout l'index (même les actus sorties du fichier), plus les actus récentes pas encore indexées", () => {
    const vieux = { id: "a".repeat(40), slug: "vieil-article-aaaaaa" };
    const sansArticle = actu({ id: "d".repeat(40), slug: undefined, article_url: undefined });
    const liste = articlesAConstruire([vieux, { id: ID, slug: SLUG }], [actu(), sansArticle]);
    assert.deepEqual(liste.map((e) => e.id), [vieux.id, ID]);
    // Index injoignable : les actus récentes qui ont un article suffisent.
    assert.deepEqual(articlesAConstruire([], [actu(), sansArticle]), [{ id: ID, slug: SLUG }]);
    // Rien du tout (veille injoignable) : aucune page.
    assert.deepEqual(articlesAConstruire([], []), []);
  });

  it("date longue en français", () => {
    assert.equal(dateLongue("2026-10-26T16:41:43.000Z"), "26 octobre 2026");
    assert.equal(dateLongue("rien"), "");
  });

  it("textes ajoutés : ni allégation santé, ni vocabulaire de vente, ni lien Amazon", () => {
    const fichiers = [
      "src/app/(shop)/actus/[slug]/page.tsx",
      "src/app/(shop)/actus/article/page.tsx",
      "src/components/actus/ArticleVue.tsx",
      "src/components/actus/ArticleSecours.tsx",
      "src/components/actus/LienCarte.tsx",
      "src/lib/veille-articles.ts",
      "src/lib/data/articles.ts",
    ];
    for (const f of fichiers) {
      const texte = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/className=(\{`[^`]*`\}|"[^"]*")/g, "");
      assert.deepEqual(findHealthClaims(texte), [], f);
      assert.doesNotMatch(texte, /\bacheter\b|\bprix\b|disponible sur|amazon|amzn|\/boutique|\/produit/i, f);
    }
  });
});
