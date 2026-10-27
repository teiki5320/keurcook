/**
 * Tests de la veille actus : nettoyage du fichier, filtre par pays, vignettes, âge, et codes des pays.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { COUNTRIES } from "../src/lib/countries";
import { findHealthClaims } from "../src/lib/compliance";
import { actuValide, ageActu, filtrerParPays, imageCarree, nettoyerFichier, type Actu } from "../src/lib/veille";

const actu = (x: Partial<Actu> = {}): Actu => ({
  id: "93dddac0c18cb2bf8810cc73a84fa306dadd58e7",
  titre: "À São Tomé, la vanille prend le relais du cacao",
  resume: "Un résumé réécrit de deux phrases, pour le test.",
  pays: ["ST"],
  source_nom: "Mondafrique",
  source_url: "https://mondafrique.com/loisirs-culture/article/",
  publie_le: "2026-10-26T23:15:00.000Z",
  image: {
    url: "https://teiki5320.github.io/veille/images/keurcook/93dddac0c18cb2bf8810cc73a84fa306dadd58e7.webp",
    source: "wikimedia",
    credit: "Diego Delso",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Vainilla.jpg",
    alt: "Le vanillier, plante dont on tire la vanille",
    largeur: 1600,
    hauteur: 900,
  },
  ...x,
});

describe("veille actus", () => {
  it("garde les actus complètes et écarte les liens Amazon et les images d'ailleurs", () => {
    assert.ok(actuValide(actu()));
    assert.ok(!actuValide(actu({ source_url: "https://www.amazon.fr/dp/2070000000?tag=keurcookfr-21" })));
    assert.ok(!actuValide(actu({ source_url: "https://amzn.to/abc" })));
    assert.ok(!actuValide(actu({ source_url: "javascript:alert(1)" })));
    assert.ok(!actuValide(actu({ image: { ...actu().image, url: "https://exemple.com/photo.webp" } })));
    assert.ok(!actuValide(null));
  });

  it("nettoie un fichier et trie du plus récent au plus ancien ; fichier cassé = null", () => {
    const f = nettoyerFichier({ version: 3, site: "keurcook", genere_le: "2026-10-27T00:00:00Z", actus: [actu({ id: "a".repeat(40), publie_le: "2026-10-20T00:00:00Z" }), actu(), { id: "x" }] });
    assert.equal(f?.actus.length, 2);
    assert.equal(f?.actus[0].id, actu().id);
    assert.equal(nettoyerFichier("<html>"), null);
    assert.equal(nettoyerFichier({ actus: "rien" }), null);
  });

  it("filtre par pays (code ISO2)", () => {
    const liste = [actu({ pays: ["SN", "ML"] }), actu({ id: "b".repeat(40), pays: ["TN"] }), actu({ id: "c".repeat(40), pays: undefined })];
    assert.equal(filtrerParPays(liste, "SN").length, 1);
    assert.equal(filtrerParPays(liste, "sn").length, 1);
    assert.equal(filtrerParPays(liste, "CM").length, 0);
    assert.equal(filtrerParPays(liste).length, 3);
  });

  it("vignette carrée : -carre.webp pour une photo, la même carte SVG sinon", () => {
    assert.match(imageCarree(actu().image), /-carre\.webp$/);
    const carte = { ...actu().image, source: "carte" as const, url: "https://teiki5320.github.io/veille/cartes/keurcook/x.svg" };
    assert.equal(imageCarree(carte), carte.url);
  });

  it("âge lisible", () => {
    const now = Date.parse("2026-10-27T12:00:00Z");
    assert.equal(ageActu("2026-10-27T09:00:00Z", now), "il y a 3 h");
    assert.equal(ageActu("2026-10-26T10:00:00Z", now), "hier");
    assert.equal(ageActu("2026-10-24T10:00:00Z", now), "il y a 3 jours");
    assert.equal(ageActu("pas une date", now), "");
  });

  it("les codes des pays respectent le schéma de la veille", () => {
    for (const c of COUNTRIES) assert.match(c.code, /^[A-Z]{2}$/, c.slug);
  });

  it("textes ajoutés : ni allégation santé, ni vocabulaire de vente, ni lien Amazon", () => {
    const fichiers = ["src/app/(shop)/actus/page.tsx", "src/components/actus/BlocActus.tsx", "src/components/actus/ActuBandeau.tsx", "src/components/actus/ActuVignette.tsx", "src/components/actus/CreditImage.tsx", "src/components/actus/LienSource.tsx"];
    for (const f of fichiers) {
      const texte = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/className=(\{`[^`]*`\}|"[^"]*")/g, ""); // classes CSS (« leading-relaxed ») écartées
      assert.deepEqual(findHealthClaims(texte), [], f);
      assert.doesNotMatch(texte, /\bacheter\b|\bprix\b|disponible sur|amazon|amzn|AdSlot/i, f);
    }
  });

  it("la CSP autorise la veille en connect-src et img-src", () => {
    const csp = readFileSync("public/_headers", "utf8").match(/Content-Security-Policy: (.*)/)?.[1] ?? "";
    for (const d of ["connect-src", "img-src"]) assert.match(csp.split(";").find((x) => x.trim().startsWith(d)) ?? "", /https:\/\/teiki5320\.github\.io/, d);
  });
});
