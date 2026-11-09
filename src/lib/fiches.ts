/**
 * Outils des fiches détaillées (src/lib/demo/fiches) : titres des parties, texte brut, comptage des mots.
 * Utilisés par les pages produit et pays, et par tests/fiches.test.ts.
 */
import { faqPlainText } from "./recipe-utils";
import type { CountryDetail, FicheQuestion, ProductDetail } from "./types";

export type GenreFiche = "epicerie" | "ustensile" | "livre";

export interface PartieFiche {
  id: string;
  titre: string;
  texte: string;
}

const TITRES_PRODUIT: Record<GenreFiche, Record<"origine" | "choisir" | "conserver" | "remplacer" | "enCuisine", string>> = {
  epicerie: {
    origine: "Origine et histoire",
    choisir: "Comment bien le choisir",
    conserver: "Conservation",
    remplacer: "Par quoi le remplacer",
    enCuisine: "Avec nos recettes et nos conseils",
  },
  ustensile: {
    origine: "Origine et fabrication",
    choisir: "Comment bien le choisir",
    conserver: "Entretien et rangement",
    remplacer: "Si vous n'en avez pas",
    enCuisine: "Avec nos recettes et nos conseils",
  },
  livre: {
    origine: "Le livre et son auteur",
    choisir: "À qui le conseiller",
    conserver: "Pour bien s'en servir",
    remplacer: "Pour aller plus loin",
    enCuisine: "Avec nos recettes et nos conseils",
  },
};

/** Parties d'une fiche produit, dans l'ordre d'affichage (les parties absentes sont omises). */
export function partiesProduit(d: ProductDetail, genre: GenreFiche): PartieFiche[] {
  const t = TITRES_PRODUIT[genre];
  return (["origine", "choisir", "conserver", "remplacer", "enCuisine"] as const)
    .filter((k) => d[k])
    .map((k) => ({ id: `fiche-${k}`, titre: t[k], texte: d[k]! }));
}

/** Parties d'une fiche pays, dans l'ordre d'affichage. */
export function partiesPays(d: CountryDetail): PartieFiche[] {
  const titres = {
    histoire: "Histoire et influences",
    regions: "D'une région à l'autre",
    produits: "Les produits du placard",
    table: "À table",
    commencer: "Par où commencer",
  };
  return (["histoire", "regions", "produits", "table", "commencer"] as const)
    .filter((k) => d[k])
    .map((k) => ({ id: `pays-${k}`, titre: titres[k], texte: d[k]! }));
}

/** Tout le texte d'une fiche, sans la syntaxe des liens (FAQ comprise). */
export function texteFiche(d: ProductDetail | CountryDetail): string {
  const parties = Object.entries(d)
    .filter(([k, v]) => k !== "faq" && typeof v === "string")
    .map(([, v]) => v as string);
  const faq = ((d.faq ?? []) as FicheQuestion[]).flatMap((q) => [q.question, q.reponse]);
  return faqPlainText([...parties, ...faq].join("\n\n"));
}

export const compterMots = (s: string) => faqPlainText(s).trim().split(/\s+/).filter(Boolean).length;
