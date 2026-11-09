/**
 * Tests du garde-fou santé (src/lib/compliance.ts) : mots entiers, lettres accentuées comprises.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findHealthClaims } from "../src/lib/compliance";

describe("Garde-fou santé : refuse toujours les allégations", () => {
  const refus: Array<[string, string]> = [
    ["Une infusion qui soigne le rhume.", "soigner"],
    ["Elle guérit tout.", "guérir"],
    ["Idéal contre la dépression.", "dépression"],
    ["Aide en cas de dépression saisonnière.", "dépression"],
    ["Les dépressions de l'hiver s'éloignent.", "dépression"],
    ["Faites une cure de baobab.", "cure / curatif"],
    ["Un effet curatif reconnu.", "cure / curatif"],
    ["Une tisane anti-stress.", "stress"],
    ["Un thé déstressant.", "stress"],
    ["Bon pour la santé.", "santé"],
    ["Riche en vitamines.", "vitamines"],
    ["Ses vertus sont connues.", "vertus"],
    ["Pour mieux trouver le sommeil.", "sommeil"],
    ["Une plante médicinale.", "médical / médicament"],
    ["Une boisson apaisante.", "apaisant"],
  ];
  for (const [texte, motif] of refus)
    it(`« ${texte} » → ${motif}`, () => assert.ok(findHealthClaims(texte).includes(motif), `${findHealthClaims(texte)}`));
});

describe("Garde-fou santé : n'attrape plus des mots ordinaires", () => {
  const permis = [
    "Récurer le fond de la marmite avec du gros sel.",
    "On récure la cocotte à l'eau chaude.",
    "La dépression du Danakil, en Éthiopie, est l'un des lieux les plus chauds du monde.",
    "Le sel est extrait dans la dépression de l'Afar.",
    "La dépression de Qattara, en Égypte.",
    "Une dépression géographique sous le niveau de la mer.",
    "Une sécurité de verrouillage sur le couvercle.",
    "Procurez-vous des feuilles fraîches.",
  ];
  for (const texte of permis) it(`« ${texte} »`, () => assert.deepEqual(findHealthClaims(texte), []));
});
