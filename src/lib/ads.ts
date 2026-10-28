/**
 * Publicité Google AdSense.
 * Identifiant d'éditeur public (il figure aussi dans public/ads.txt) : ce n'est pas un secret.
 */
export const ADSENSE_CLIENT = "ca-pub-2680784147246798";

/** Bloc d'annonces display responsive « Keur Cook », partagé par tous les emplacements. */
const KEUR_COOK_UNIT = "1417105513";

/**
 * Numéros des blocs d'annonces créés dans AdSense (Annonces → Par bloc d'annonces).
 * Un emplacement sans numéro n'affiche rien : la page reste telle quelle.
 */
export const AD_SLOTS = {
  /** Recette : entre « L'histoire du plat » et la préparation. */
  recetteMilieu: KEUR_COOK_UNIT,
  /** Recette : en fin de page, après les recettes proches. */
  recetteFin: KEUR_COOK_UNIT,
  /** Conseil : au milieu de l'article, avant un intertitre. */
  conseilMilieu: KEUR_COOK_UNIT,
  /** Conseil : en fin de page, après « À lire aussi ». */
  conseilFin: KEUR_COOK_UNIT,
  /** Article complet d'une actu (/actus/<slug>) : un seul, après l'article, avant « Autres actus ». */
  actuFin: KEUR_COOK_UNIT,
  /** Pays : entre les recettes et la présentation de la cuisine. */
  pays: KEUR_COOK_UNIT,
} as const;
