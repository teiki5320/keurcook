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
