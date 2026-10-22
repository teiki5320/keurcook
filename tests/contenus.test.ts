/**
 * Recettes et produits sont écrits dans le code (src/lib/demo/) : ces tests
 * bloquent toute allégation de santé avant publication.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import { demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";
import { COUNTRIES } from "../src/lib/countries";
import { COUNTRY_CUISINE } from "../src/lib/country-cuisine";
import { PRODUCT_GUIDES } from "../src/lib/product-guides";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isPublished, parseConseil, todayInParis } from "../src/lib/conseils/article";
import { faqLinks, faqPlainText } from "../src/lib/recipe-utils";

/** Longueur du titre affiché par Google : avec « | Keur Cook » s'il tient en 60 caractères (src/lib/metadata.ts). */
const googleTitle = (title: string) => (`${title} | Keur Cook`.length <= 60 ? `${title} | Keur Cook` : title);

describe("Recettes et produits : titre, description et FAQ pour Google", () => {
  const conseilsDir = join(import.meta.dirname, "..", "content", "conseils");
  const today = todayInParis();
  const publishedConseils = new Set(
    readdirSync(conseilsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(conseilsDir, f), "utf8")))
      .filter((c) => isPublished(c, today))
      .map((c) => c.slug),
  );
  const exists = (path: string) => {
    const [, section, slug] = path.split("/");
    if (section === "recette") return demoRecipes.some((r) => r.isPublished && r.slug === slug);
    if (section === "produit") return demoProducts.some((p) => p.isActive && p.slug === slug);
    if (section === "pays") return COUNTRIES.some((c) => c.slug === slug);
    if (section === "conseils") return publishedConseils.has(slug);
    return false;
  };
  for (const r of demoRecipes.filter((x) => x.seoTitle || x.seoDescription || x.faq)) {
    it(r.slug, () => {
      if (r.seoTitle) assert.ok(googleTitle(r.seoTitle).length <= 60, `titre de ${r.seoTitle.length} caractères`);
      if (r.seoDescription) assert.ok(r.seoDescription.length <= 155, `description de ${r.seoDescription.length} caractères`);
      const answers = (r.faq ?? []).map((q) => q.answer);
      assert.deepEqual(findHealthClaims(r.seoTitle, r.seoDescription, ...(r.faq ?? []).map((q) => q.question), ...answers.map(faqPlainText)), []);
      for (const path of answers.flatMap(faqLinks)) assert.ok(exists(path), `lien de FAQ invalide : ${path}`);
    });
  }
  for (const p of demoProducts.filter((x) => x.seoTitle || x.seoDescription)) {
    it(p.slug, () => {
      if (p.seoTitle) assert.ok(googleTitle(p.seoTitle).length <= 60, `titre de ${p.seoTitle.length} caractères`);
      if (p.seoDescription) assert.ok(p.seoDescription.length <= 155, `description de ${p.seoDescription.length} caractères`);
      assert.deepEqual(findHealthClaims(p.seoTitle, p.seoDescription), []);
    });
  }
});

describe("Recettes : aucune allégation de santé", () => {
  for (const r of demoRecipes) {
    it(r.slug, () => {
      assert.deepEqual(findHealthClaims(r.name, r.shortDescription, r.story, ...r.steps.map((s) => s.text), ...r.tips), []);
    });
  }
});

describe("Produits : aucune allégation de santé", () => {
  for (const p of demoProducts) {
    it(p.slug, () => {
      assert.deepEqual(findHealthClaims(p.name, p.shortDescription, p.description, p.usageTips, p.composition, p.conservation), []);
    });
  }
});

describe("Produits d'Afrique du Nord : jamais en suggestion", () => {
  it("les slugs exclus existent bien dans le catalogue", async () => {
    const { NORTH_AFRICAN_SLUGS } = await import("../src/lib/catalog-utils");
    for (const slug of NORTH_AFRICAN_SLUGS) assert.ok(demoProducts.some((p) => p.slug === slug), slug);
  });
});

describe("Pages pays : présentation de la cuisine", () => {
  for (const country of COUNTRIES.filter((c) => demoRecipes.some((r) => r.countryCode === c.code))) {
    it(`${country.name} a une présentation d'au moins 100 mots`, () => {
      const text = COUNTRY_CUISINE[country.code] ?? "";
      assert.ok(text.split(/\s+/).length >= 100, `${text.split(/\s+/).length} mots`);
      assert.deepEqual(findHealthClaims(text), []);
    });
  }
});

describe("Fiches produits : textes « Bien l'utiliser »", () => {
  for (const [slug, text] of Object.entries(PRODUCT_GUIDES)) {
    it(`${slug} : produit existant, 100 mots au moins, aucune allégation de santé`, () => {
      assert.ok(demoProducts.some((p) => p.slug === slug), "produit inconnu");
      assert.ok(text.split(/\s+/).length >= 100, `${text.split(/\s+/).length} mots`);
      assert.deepEqual(findHealthClaims(text), []);
    });
  }
});
