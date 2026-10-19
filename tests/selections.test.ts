/**
 * Pages « Nos sélections » : uniquement de vrais produits et de vraies recettes du site,
 * aucune allégation de santé, aucun vocabulaire de vente (le site ne vend rien).
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";
import { demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";
import { demoSelections } from "../src/lib/demo/selections";
import type { RichText, Selection } from "../src/lib/selections/types";

const plain = (value: RichText) => value.map((p) => (typeof p === "string" ? p : p.label)).join("");
const links = (value: RichText) => value.flatMap((p) => (typeof p === "string" ? [] : [p.href]));

function texts(s: Selection): string[] {
  return [
    s.title,
    s.description,
    s.intro,
    ...s.items.flatMap((it) => [it.pourquoi, ...it.onAime, ...it.aSavoir, it.idealPour, it.matiere, it.taille, it.entretien, it.podium?.mention, it.podium?.resume]),
    ...s.guide.flatMap((g) => [g.titre, plain(g.texte)]),
    ...s.faq.flatMap((q) => [q.question, plain(q.reponse)]),
  ].filter((t): t is string => !!t);
}

describe("Sélections", () => {
  it("adresses uniques", () => {
    assert.equal(new Set(demoSelections.map((s) => s.slug)).size, demoSelections.length);
  });

  for (const s of demoSelections) {
    describe(s.slug, () => {
      it("produits : actifs, avec lien Amazon, sans doublon", () => {
        assert.equal(new Set(s.items.map((it) => it.product)).size, s.items.length);
        for (const it of s.items) {
          const p = demoProducts.find((x) => x.slug === it.product);
          assert.ok(p, `produit inconnu : ${it.product}`);
          assert.ok(p.isActive, `produit inactif : ${it.product}`);
          assert.ok(p.amazonAsin, `produit sans lien Amazon : ${it.product}`);
        }
      });

      it("recettes : toutes existent, au moins une par produit", () => {
        for (const it of s.items) {
          assert.ok(it.recettes.length > 0, it.product);
          for (const slug of it.recettes) assert.ok(demoRecipes.some((r) => r.slug === slug), `recette inconnue : ${slug}`);
        }
      });

      it("gestes connus, top 3 au plus", () => {
        for (const it of s.items) assert.ok(it.geste in s.gestes, `geste inconnu : ${it.geste}`);
        assert.ok(s.items.filter((it) => it.podium).length <= 3);
      });

      it("liens internes vers des conseils existants", () => {
        for (const href of [...s.guide.flatMap((g) => links(g.texte)), ...s.faq.flatMap((q) => links(q.reponse))]) {
          const m = href.match(/^\/conseils\/([a-z0-9-]+)$/);
          assert.ok(m, `lien non prévu : ${href}`);
          assert.ok(existsSync(join(process.cwd(), "content", "conseils", `${m[1]}.md`)), `conseil inconnu : ${href}`);
        }
      });

      it("titre et description adaptés à Google", () => {
        assert.ok(`${s.seoTitle ?? s.title} | Keur Cook`.length <= 60 || (s.seoTitle ?? s.title).length <= 60);
        assert.ok(s.description.length <= 160, `description de ${s.description.length} caractères`);
      });

      it("aucune allégation de santé", () => {
        assert.deepEqual(findHealthClaims(...texts(s)), []);
      });

      it("aucun vocabulaire de vente, de prix ou d'essai", () => {
        const forbidden = /€|\bdisponibles?\b|\ben stock\b|\bachet(ez|er)\b|\btest[ée]s?\b|\bétoiles?\b|\bMaghreb\b|\bMaroc\b|\bTunisie\b|\bAlg[ée]rie\b/i;
        for (const t of texts(s)) assert.doesNotMatch(t, forbidden, t);
      });
    });
  }
});
