/**
 * Tests de la rubrique Conseils : en-têtes complets, liens internes valides
 * à la date de publication de chaque article, publication programmée.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  internalLinks,
  isPublished,
  parseConseil,
  todayInParis,
  type Conseil,
} from "../src/lib/conseils/article";
import { COUNTRIES } from "../src/lib/countries";
import { findHealthClaims } from "../src/lib/compliance";
import { demoCategories, demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";

const root = join(import.meta.dirname, "..");
const dir = join(root, "content", "conseils");
const conseils: Conseil[] = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8")));
const bySlug = new Map(conseils.map((c) => [c.slug, c]));
const recipeSlugs = new Set(demoRecipes.filter((r) => r.isPublished).map((r) => r.slug));
const productSlugs = new Set(demoProducts.filter((p) => p.isActive).map((p) => p.slug));

/** Vrai si le lien interne mène à une page existante le jour où l'article paraît. */
function validAt(path: string, date: string): boolean {
  const [, section, slug] = path.split("/");
  if (["", "recettes", "pays", "boutique", "conseils", "favoris"].includes(path.slice(1))) return true;
  if (section === "recette") return recipeSlugs.has(slug);
  if (section === "produit") return productSlugs.has(slug);
  if (section === "pays") return COUNTRIES.some((c) => c.slug === slug);
  if (section === "categorie") return demoCategories.some((c) => c.slug === slug);
  if (section === "conseils") {
    const target = bySlug.get(slug);
    return Boolean(target && target.date <= date);
  }
  return false;
}

describe("Conseils : en-têtes", () => {
  it("contient au moins un article", () => assert.ok(conseils.length > 0));
  for (const c of conseils) {
    it(`« ${c.slug} » a un en-tête complet`, () => {
      assert.match(c.title, /\?$/, "le titre doit être la question (terminée par « ? »)");
      assert.ok(c.description.length >= DESCRIPTION_MIN && c.description.length <= DESCRIPTION_MAX, `description de ${c.description.length} caractères (attendu ${DESCRIPTION_MIN} à ${DESCRIPTION_MAX})`);
      assert.match(c.date, /^\d{4}-\d{2}-\d{2}$/, "date au format AAAA-MM-JJ");
      assert.ok(!Number.isNaN(Date.parse(c.date)), "date valide");
      assert.equal(new Date(`${c.date}T12:00:00Z`).getUTCDay(), 1, "publication un lundi");
      assert.ok(c.resume.length > 0, "réponse courte (resume) obligatoire");
      assert.ok(c.body.length > 0, "corps de l'article vide");
      if (c.image) {
        assert.ok(existsSync(join(root, "public", c.image)), `photo introuvable : ${c.image}`);
        assert.ok(c.imageAlt, "texte alternatif obligatoire quand il y a une photo");
      }
      assert.deepEqual(findHealthClaims(c.title, c.description, c.resume, c.body), [], "allégation de santé interdite");
    });
  }
});

describe("Conseils : liens internes", () => {
  for (const c of conseils) {
    it(`« ${c.slug} » ne pointe que vers des pages existantes au ${c.date}`, () => {
      for (const path of internalLinks(c.body)) assert.ok(validAt(path, c.date), `lien invalide : ${path}`);
      for (const s of c.recettes) assert.ok(recipeSlugs.has(s), `recette inconnue : ${s}`);
      for (const s of c.produits) assert.ok(productSlugs.has(s), `produit inconnu ou masqué : ${s}`);
    });
  }
});

describe("Conseils : publication programmée", () => {
  const future: Conseil = parseConseil(
    "article-futur",
    "---\ntitle: Question future ?\ndescription: x\ndate: 2099-01-05\ntheme: epicerie\nresume: x\n---\nTexte.",
  );
  it("un article futur n'est pas publié", () => {
    assert.equal(isPublished(future, todayInParis()), false);
    assert.equal([...conseils, future].filter((c) => isPublished(c, todayInParis())).some((c) => c.slug === "article-futur"), false);
  });
  it("un article paraît le jour même de sa date, pas la veille", () => {
    assert.equal(isPublished({ date: "2026-09-28" }, "2026-09-27"), false);
    assert.equal(isPublished({ date: "2026-09-28" }, "2026-09-28"), true);
  });
  it("la date du jour suit l'heure de Paris", () => {
    // Dimanche 27/09/2026 à 22 h 30 UTC = lundi 28/09 à 0 h 30 à Paris.
    assert.equal(todayInParis(new Date("2026-09-27T22:30:00Z")), "2026-09-28");
  });
  it("une date invalide n'est jamais publiée", () => assert.equal(isPublished({ date: "bientôt" }, "2099-12-31"), false));
});
