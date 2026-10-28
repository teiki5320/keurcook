/**
 * Accueil : le bloc « Nos coups de cœur » montre au moins 4 produits disponibles, avec leur illustration,
 * reliés à leur fiche interne ; l'accueil n'a aucun lien Amazon.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import { COUPS_DE_COEUR } from "../src/lib/coups-de-coeur";
import { demoProducts } from "../src/lib/demo/catalog";

const racine = join(import.meta.dirname, "..");
const accueil = readFileSync(join(racine, "src", "app", "(shop)", "page.tsx"), "utf8");

describe("Accueil : Nos coups de cœur", () => {
  const actifs = COUPS_DE_COEUR.flatMap((s) => demoProducts.filter((p) => p.slug === s && p.isActive));

  it("au moins 4 produits disponibles (non masqués)", () => {
    assert.ok(actifs.length >= 4, `${actifs.length} produits disponibles : ${COUPS_DE_COEUR.join(", ")}`);
  });

  it("chaque produit a son illustration dans public/products", () => {
    for (const p of actifs) assert.ok(existsSync(join(racine, "public", p.images[0])), p.images[0]);
  });

  it("aucune allégation de santé dans les noms", () => {
    for (const p of actifs) assert.deepEqual(findHealthClaims(p.name), [], p.name);
  });

  it("le bloc est sur l'accueil, relié aux fiches internes, et l'accueil n'a aucun lien Amazon", () => {
    assert.match(accueil, /id="coups-de-coeur"/);
    assert.match(accueil, /href=\{`\/produit\/\$\{p\.slug\}`\}/);
    assert.doesNotMatch(accueil, /amazon\.fr|amzn\.|Voir sur Amazon|amazonUrl|AmazonButton/i);
  });
});
