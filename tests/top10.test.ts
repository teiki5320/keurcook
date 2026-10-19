/**
 * Page « Top 10 » : exactement dix vrais produits par onglet, de vraies recettes et de vrais articles,
 * un classement conforme à la règle annoncée, aucune allégation de santé ni vocabulaire de vente.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { NORTH_AFRICAN_SLUGS } from "../src/lib/catalog-utils";
import { findHealthClaims } from "../src/lib/compliance";
import { demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";
import { demoTop10 } from "../src/lib/demo/top10";
import type { RichText, Top10 } from "../src/lib/top10/types";

const plain = (value: RichText) => value.map((p) => (typeof p === "string" ? p : p.label)).join("");
const links = (value: RichText) => value.flatMap((p) => (typeof p === "string" ? [] : [p.href]));
const conseilFile = (slug: string) => join(process.cwd(), "content", "conseils", `${slug}.md`);

/** Texte commun des onglets classés selon la note des acheteurs : il nomme la note et précise qu'elle n'est pas affichée. */
const CRITERE = /^Notre sélection de .+, classée?s selon la note moyenne des acheteurs sur Amazon\.fr, relevée le \d{1,2} \S+ \d{4} ; à égalité, (le|la) plus évaluée? passe devant\. Seuls les produits disponibles avec au moins 10 évaluations sont retenus\. Les notes servent à classer mais ne sont pas affichées, et nous n'avons pas testé ces produits\. /;

function texts(t: Top10): string[] {
  return [
    t.tab,
    t.title,
    t.description,
    // Onglets classés selon la note : seul ce qui suit le texte commun est contrôlé ici.
    t.rankBy === "note-acheteurs" ? t.intro.replace(CRITERE, "") : t.intro,
    ...t.items.map((it) => it.pourquoi),
    ...t.guide.map(plain),
    ...t.faq.flatMap((q) => [q.question, plain(q.reponse)]),
  ];
}

describe("Top 10", () => {
  it("adresses uniques", () => {
    assert.equal(new Set(demoTop10.map((t) => t.slug)).size, demoTop10.length);
  });

  for (const t of demoTop10) {
    describe(t.slug, () => {
      it("exactement 10 produits, sans doublon", () => {
        assert.equal(t.items.length, 10);
        assert.equal(new Set(t.items.map((it) => it.product)).size, 10);
      });

      it("produits actifs, avec lien Amazon, jamais d'Afrique du Nord", () => {
        for (const it of t.items) {
          const p = demoProducts.find((x) => x.slug === it.product);
          assert.ok(p, `produit inconnu : ${it.product}`);
          assert.ok(p.isActive, `produit inactif : ${it.product}`);
          assert.ok(p.amazonAsin, `produit sans lien Amazon : ${it.product}`);
          assert.ok(!NORTH_AFRICAN_SLUGS.has(it.product), `produit d'Afrique du Nord : ${it.product}`);
        }
      });

      it("recettes et articles existants", () => {
        for (const it of t.items) {
          for (const s of it.recettes) assert.ok(demoRecipes.some((r) => r.slug === s), `recette inconnue : ${s}`);
          assert.equal(new Set(it.recettes).size, it.recettes.length, `recette en double : ${it.product}`);
          for (const s of it.articles ?? []) assert.ok(existsSync(conseilFile(s)), `article inconnu : ${s}`);
        }
        for (const href of [...t.guide.flatMap(links), ...t.faq.flatMap((q) => links(q.reponse))]) {
          const m = href.match(/^\/conseils\/([a-z0-9-]+)$/);
          assert.ok(m && existsSync(conseilFile(m[1])), `lien inconnu : ${href}`);
        }
      });

      it("classement conforme à la règle annoncée", () => {
        if (t.rankBy === "note-acheteurs") {
          // Les notes ne sont pas enregistrées : l'ordre vient du relevé du jour indiqué.
          assert.match(t.classementLe ?? "", /^\d{4}-\d{2}-\d{2}$/);
          assert.match(t.intro, CRITERE);
          const first = demoProducts.find((p) => p.slug === t.items[0].product)!;
          assert.ok(t.intro.endsWith(`N° 1 : ${first.name}.`), "le n° 1 doit être nommé à la fin de l'introduction");
          return;
        }
        const parMesure = ["taille", "contenance", "pages", "puissance"].includes(t.rankBy);
        if (parMesure) assert.ok(t.items.every((it) => typeof it.mesure === "number"), "mesure manquante");
        const score = (it: Top10["items"][number]) =>
          parMesure ? it.mesure! : it.recettes.length + (t.rankBy === "recettes-et-articles" ? (it.articles?.length ?? 0) : 0);
        for (let i = 1; i < t.items.length; i++) {
          assert.ok(score(t.items[i - 1]) >= score(t.items[i]), `${t.items[i - 1].product} (${score(t.items[i - 1])}) avant ${t.items[i].product} (${score(t.items[i])})`);
        }
      });

      it("pourquoi en 3 ou 4 phrases, 3 questions, titre « Top 10 des … »", () => {
        for (const it of t.items) {
          const n = it.pourquoi.split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ý])/).length;
          assert.ok(n >= 3 && n <= 4, `${it.product} : ${n} phrases`);
        }
        assert.equal(t.faq.length, 3);
        assert.match(t.title, /^Top 10 des /);
      });

      it("titre et description adaptés à Google", () => {
        const title = t.seoTitle ?? t.title;
        assert.ok(title.length <= 60, `titre de ${title.length} caractères`);
        assert.ok(t.description.length <= 160, `description de ${t.description.length} caractères`);
      });

      it("aucune allégation de santé", () => {
        assert.deepEqual(findHealthClaims(...texts(t)), []);
      });

      it("aucune note, aucune étoile, aucun nombre d'avis, ni enregistrés ni affichés", () => {
        assert.doesNotMatch(JSON.stringify(t), /"(note|notes|etoiles|avis|evaluations)"\s*:/);
        for (const text of texts(t)) assert.doesNotMatch(text, /★|\d\s*(,\d)?\s*(\/|sur)\s*5\b|\d\s*(avis|évaluations)\b/, text);
      });

      it("image de partage", () => {
        assert.ok(existsSync(join(process.cwd(), "public", "top10", `${t.slug}.jpg`)), "lancer : npx tsx scripts/images-top10.ts");
      });

      it("aucun vocabulaire de vente, de prix, de note ou d'essai", () => {
        const forbidden = /€|\bprix\b|\bdisponibles?\b|\ben stock\b|\bachet(ez|er)\b|\btest[ée]s?\b|\bétoiles?\b|\bnote\b|\bMaghreb\b|\bMaroc\b|\bTunisie\b|\bAlg[ée]rie\b/i;
        for (const text of texts(t)) assert.doesNotMatch(text, forbidden, text);
      });
    });
  }
});

describe("Top 10 : articles cités déjà publiés", () => {
  it("chaque article cité a une date de parution passée", () => {
    const today = new Date().toISOString().slice(0, 10);
    const slugs = new Set(demoTop10.flatMap((t) => [...t.items.flatMap((it) => it.articles ?? []), ...[...t.guide, ...t.faq.map((q) => q.reponse)].flatMap(links).map((h) => h.split("/").pop()!)]));
    for (const s of slugs) {
      const date = readFileSync(conseilFile(s), "utf8").match(/^date:\s*(\S+)/m)?.[1] ?? "";
      assert.ok(date <= today, `${s} paraît le ${date}`);
    }
  });
});
