/**
 * Recettes et produits sont écrits dans le code (src/lib/demo/) : ces tests
 * remplacent le contrôle qui se faisait à l'enregistrement dans l'admin.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import { demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";

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
