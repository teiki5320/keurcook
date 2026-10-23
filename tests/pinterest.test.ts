/**
 * Publication Pinterest (scripts/pinterest-*.mjs et scripts/epingles.ts) : choix des épingles du jour,
 * tableaux reliés par leur nom, manifeste des recettes et fichier d'état.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { demoRecipes } from "../src/lib/demo/recipes";
import { findHealthClaims } from "../src/lib/compliance";
import { manifeste, tableauRecette } from "../scripts/epingles";
import { choisirEpingles, relierTableaux, tableauPour } from "../scripts/pinterest-lib.mjs";

const racine = join(import.meta.dirname, "..");
const config = JSON.parse(readFileSync(join(racine, "config/pinterest.json"), "utf8"));
const etat = JSON.parse(readFileSync(join(racine, "data/pinterest-etat.json"), "utf8"));

const e = (id: string, slug: string, publie_le = "2026-10-01", numero = 1) => ({ id, slug, numero, publie_le, titre: id, description: "", lien: "", image: "", tableau: "senegal" });

describe("Pinterest : choix des épingles du jour", () => {
  it("au plus 5, jamais deux de la même page le même jour, rien de déjà publié ni de futur", () => {
    const m = { epingles: [e("a-1", "a"), e("a-2", "a", "2026-10-01", 2), e("b-1", "b"), e("c-1", "c"), e("d-1", "d"), e("f-1", "f"), e("g-1", "g"), e("h-1", "h", "2026-12-01")] };
    const choix = choisirEpingles(m, { publiees: [{ id: "b-1", slug: "b", publie_le: "2026-10-01" }] }, { max: 5, aujourdhui: "2026-10-23" });
    assert.equal(choix.length, 5);
    assert.equal(new Set(choix.map((x: { slug: string }) => x.slug)).size, 5);
    assert.ok(!choix.some((x: { id: string }) => ["b-1", "h-1", "a-2"].includes(x.id)));
  });
  it("une page déjà épinglée aujourd'hui attend le lendemain", () => {
    const choix = choisirEpingles({ epingles: [e("a-2", "a", "2026-10-01", 2)] }, { publiees: [{ id: "a-1", slug: "a", publie_le: "2026-10-23" }] }, { aujourdhui: "2026-10-23" });
    assert.equal(choix.length, 0);
  });
});

describe("Pinterest : tableaux", () => {
  it("relie les tableaux du compte par leur nom (casse et apostrophes ignorées)", () => {
    const ids = relierTableaux(config, [{ id: "1", name: "Recettes de Côte d’Ivoire" }, { id: "2", name: "recettes du sénégal" }]);
    assert.equal(ids["cote-divoire"], "1");
    assert.equal(ids.senegal, "2");
    assert.equal(ids.douceurs, null);
    assert.equal(tableauPour("douceurs", { ...ids, mijotes: "3" }, config), "3");
  });
  it("chaque recette va dans un tableau de la config", () => {
    for (const r of demoRecipes) assert.ok(config.tableaux[tableauRecette(r)], r.slug);
  });
});

describe("Pinterest : manifeste et état", () => {
  const m = manifeste(demoRecipes, () => true);
  it("une épingle par recette publiée, lien vers la recette, sans allégation de santé", () => {
    assert.equal(m.length, demoRecipes.filter((r) => r.isPublished).length);
    for (const x of m) {
      assert.match(x.lien, /^https:\/\/keurcook\.com\/recette\/[a-z0-9-]+$/);
      assert.ok(x.description.length <= 500 && x.titre.length <= 100, x.id);
      assert.deepEqual(findHealthClaims(`${x.titre} ${x.description}`), [], x.id);
    }
  });
  it("le fichier d'état ne cite que des épingles du manifeste, sans doublon", () => {
    const ids = new Set(m.map((x) => x.id));
    const publiees = etat.publiees.map((p: { id: string }) => p.id);
    assert.equal(new Set(publiees).size, publiees.length);
    for (const id of publiees) assert.ok(ids.has(id), id);
  });
});
