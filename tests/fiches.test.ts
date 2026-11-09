/**
 * Tests des fiches détaillées (src/lib/demo/fiches, règles docs/FICHES.md).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import { isPublished, parseConseil, todayInParis } from "../src/lib/conseils/article";
import { COUNTRIES } from "../src/lib/countries";
import { COUNTRY_CUISINE } from "../src/lib/country-cuisine";
import { demoProducts } from "../src/lib/demo/catalog";
import { COUNTRY_DETAILS, LOTS_FICHES, PRODUCT_DETAILS, SLUGS_PAYS_FICHES } from "../src/lib/demo/fiches";
import { demoRecipes } from "../src/lib/demo/recipes";
import { compterMots, texteFiche } from "../src/lib/fiches";
import { PRODUCT_GUIDES } from "../src/lib/product-guides";
import { faqLinks } from "../src/lib/recipe-utils";
import type { CountryDetail, ProductDetail } from "../src/lib/types";

const conseilsDir = join(import.meta.dirname, "..", "content", "conseils");
const conseilsPublies = new Set(
  readdirSync(conseilsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(conseilsDir, f), "utf8")))
    .filter((c) => isPublished(c, todayInParis()))
    .map((c) => c.slug),
);
const actifs = new Set(demoProducts.filter((p) => p.isActive).map((p) => p.slug));
const tousProduits = new Set(demoProducts.map((p) => p.slug));

/** Un lien interne mène-t-il à une page en ligne aujourd'hui ? */
function lienValide(chemin: string) {
  const [, section, slug, reste] = chemin.split(/[/#?]/);
  if (reste !== undefined && reste !== "") return false;
  if (section === "recette") return demoRecipes.some((r) => r.isPublished && r.slug === slug);
  if (section === "produit") return actifs.has(slug);
  if (section === "pays") return COUNTRIES.some((c) => c.slug === slug);
  if (section === "conseils") return conseilsPublies.has(slug);
  return false;
}

/** Vocabulaire de vente interdit (le site ne vend rien, aucun prix affiché). */
const VENTE =
  /\b(acheter|achetez|achat|promo|promos|promotions?|soldes|bon plan|meilleur prix|petit prix|bon prix|prix bas|à prix|pas cher|moins cher|plus cher|en stock|livraison|disponibles? sur|commandez|rapport qualit[ée])\b/i;

/** Phrases d'au moins 8 mots, normalisées, pour repérer les redites. */
const phrases = (texte: string) =>
  texte
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((p) => p.toLowerCase().replace(/[^a-zà-ÿœæ0-9 ]+/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.split(" ").length >= 8);

function verifierCommun(d: ProductDetail | CountryDetail, parties: Array<string | undefined>, minPartie: number) {
  for (const p of parties) if (p !== undefined) assert.ok(compterMots(p) >= minPartie, `partie trop courte (${compterMots(p)} mots) : « ${p.slice(0, 60)}… »`);
  if (d.faq) {
    assert.ok(d.faq.length >= 2 && d.faq.length <= 3, `FAQ : 2 ou 3 questions (${d.faq.length})`);
    for (const q of d.faq) assert.ok(q.question.trim().endsWith("?"), `question sans « ? » : ${q.question}`);
  }
  const brut = [...parties, ...(d.faq ?? []).flatMap((q) => [q.question, q.reponse])].filter(Boolean).join("\n\n");
  assert.deepEqual(findHealthClaims(texteFiche(d)), [], "allégation de santé (src/lib/compliance.ts)");
  const vente = texteFiche(d).match(VENTE);
  assert.equal(vente, null, `vocabulaire de vente : « ${vente?.[0]} »`);
  assert.doesNotMatch(brut, /\*\*|^#|^- /m, "pas de Markdown (seulement les liens [texte](/chemin))");
  for (const lien of faqLinks(brut)) assert.ok(lienValide(lien), `lien vers une page absente ou pas encore publiée : ${lien}`);
}

describe("Fiches produits : découpage des lots", () => {
  it("chaque slug n'est prévu que dans un seul lot, et existe au catalogue", () => {
    const vus = new Map<string, string>();
    for (const lot of LOTS_FICHES)
      for (const s of lot.slugs) {
        assert.ok(!vus.has(s), `${s} est dans ${vus.get(s)} et ${lot.nom}`);
        assert.ok(tousProduits.has(s), `${s} (${lot.nom}) n'existe pas au catalogue`);
        vus.set(s, lot.nom);
      }
    // Un produit ajouté au catalogue après le découpage n'a pas encore de lot : on le signale sans bloquer la publication.
    const sansLot = [...actifs].filter((s) => !vus.has(s));
    if (sansLot.length) console.warn(`Produits actifs sans lot de fiches (à ajouter dans un lot) : ${sansLot.join(", ")}`);
  });
  it("chaque fiche écrite est dans la liste de son lot", () => {
    for (const lot of LOTS_FICHES) for (const s of Object.keys(lot.fiches)) assert.ok(lot.slugs.includes(s), `${s} écrit dans ${lot.nom} sans y être prévu`);
  });
});

describe("Fiches produits : contenu", () => {
  for (const [slug, d] of Object.entries(PRODUCT_DETAILS)) {
    it(`« ${slug} » : 250 à 450 mots, règles de rédaction`, () => {
      // Un produit retiré (indisponible sur Amazon) n'a plus de page : sa fiche ne s'affiche pas, on le signale sans bloquer.
      if (!actifs.has(slug)) {
        console.warn(`Fiche « ${slug} » : produit masqué, fiche non affichée.`);
        return;
      }
      verifierCommun(d, [d.origine, d.choisir, d.conserver, d.remplacer, d.enCuisine], 40);
      const total = compterMots(texteFiche(d));
      assert.ok(total >= 250 && total <= 450, `${total} mots (250 à 450 attendus)`);
      // Pas de redite de la fiche existante : description, « En cuisine » ni « Bien l'utiliser ».
      const p = demoProducts.find((x) => x.slug === slug)!;
      const deja = new Set(phrases([p.description, p.shortDescription, p.usageTips ?? "", PRODUCT_GUIDES[slug] ?? ""].join("\n")));
      for (const ph of phrases(texteFiche(d))) assert.ok(!deja.has(ph), `phrase déjà présente sur la fiche : « ${ph} »`);
    });
  }
});

describe("Fiches pays", () => {
  it("les pays prévus sont ceux du site", () => {
    assert.deepEqual([...SLUGS_PAYS_FICHES].sort(), COUNTRIES.map((c) => c.slug).sort());
  });
  for (const [slug, d] of Object.entries(COUNTRY_DETAILS)) {
    it(`« ${slug} » : 400 à 700 mots, règles de rédaction`, () => {
      const pays = COUNTRIES.find((c) => c.slug === slug);
      assert.ok(pays, `pays inconnu : ${slug}`);
      verifierCommun(d, [d.histoire, d.regions, d.produits, d.table, d.commencer], 50);
      const total = compterMots(texteFiche(d));
      assert.ok(total >= 400 && total <= 700, `${total} mots (400 à 700 attendus)`);
      const deja = new Set(phrases(`${pays.description}\n${COUNTRY_CUISINE[pays.code] ?? ""}`));
      for (const ph of phrases(texteFiche(d))) assert.ok(!deja.has(ph), `phrase déjà présente sur la page pays : « ${ph} »`);
    });
  }
});

describe("Fiches : pas de phrase répétée d'une fiche à l'autre", () => {
  it("chaque phrase d'au moins 8 mots est unique", () => {
    const vues = new Map<string, string>();
    const toutes: Array<[string, ProductDetail | CountryDetail]> = [
      ...Object.entries(PRODUCT_DETAILS).map(([s, d]) => [`produit ${s}`, d] as [string, ProductDetail]),
      ...Object.entries(COUNTRY_DETAILS).map(([s, d]) => [`pays ${s}`, d] as [string, CountryDetail]),
    ];
    for (const [nom, d] of toutes)
      for (const ph of phrases(texteFiche(d))) {
        assert.ok(!vues.has(ph) || vues.get(ph) === nom, `phrase répétée (${vues.get(ph)} et ${nom}) : « ${ph} »`);
        assert.ok(vues.get(ph) !== nom, `phrase répétée dans ${nom} : « ${ph} »`);
        vues.set(ph, nom);
      }
  });
});
