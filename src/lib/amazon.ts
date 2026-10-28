/** Programme Partenaires Amazon : liens d'achat vers Amazon.fr avec l'identifiant du site. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "keurcookfr-21";

/**
 * Emplacement d'un lien Amazon sur le site : chaque type de page peut avoir son propre code de suivi,
 * pour savoir dans Amazon Partenaires quelles pages amènent les achats.
 * - recette : page d'une recette (ingrédients et produits de la recette) ;
 * - conseil : article « Conseils » ;
 * - top : page Top 10 ;
 * - fiche : fiche produit (bouton principal et « Vous aimerez aussi ») ;
 * - rubrique : boutique et pages pays.
 */
export type EmplacementAmazon = "recette" | "conseil" | "top" | "fiche" | "rubrique";

/**
 * Table unique des codes de suivi, par emplacement. Pour l'instant, tous les emplacements utilisent
 * le code du site : rien ne change en ligne. Quand les codes seront créés dans Amazon Partenaires
 * (Outils → Gestion des codes de suivi), il suffira de les écrire ici.
 */
export const CODES_SUIVI: Record<EmplacementAmazon, string> = {
  recette: AMAZON_TAG,
  conseil: AMAZON_TAG,
  top: AMAZON_TAG,
  fiche: AMAZON_TAG,
  rubrique: AMAZON_TAG,
};

/** Lien vers la fiche Amazon.fr d'un produit (ASIN), avec le code de suivi de l'emplacement. */
export function amazonUrl(asin: string, emplacement: EmplacementAmazon): string {
  return `https://www.amazon.fr/dp/${encodeURIComponent(asin)}?tag=${CODES_SUIVI[emplacement]}`;
}

/** Ligne placée sous chaque bouton « Voir sur Amazon ». */
export const LIGNE_PARTENAIRE = "Lien partenaire Amazon : prix et disponibilité sur Amazon.";

/** Mention obligatoire du programme Partenaires Amazon. */
export const AMAZON_DISCLOSURE =
  "En tant que Partenaire Amazon, Keur Cook réalise un bénéfice sur les achats remplissant les conditions requises.";
