/**
 * Publicité Google AdSense.
 * Identifiant d'éditeur public (il figure aussi dans public/ads.txt) : ce n'est pas un secret.
 */
export const ADSENSE_CLIENT = "ca-pub-2680784147246798";

/**
 * Numéros des blocs d'annonces créés dans AdSense (Annonces → Par bloc d'annonces).
 * Un emplacement sans numéro n'affiche rien : la page reste telle quelle.
 */
export const AD_SLOTS = {
  /** Recette : entre « L'histoire du plat » et la préparation. */
  recetteMilieu: "",
  /** Recette : en fin de page, après les recettes proches. */
  recetteFin: "",
  /** Conseil : au milieu de l'article, avant un intertitre. */
  conseilMilieu: "",
  /** Conseil : en fin de page, après « À lire aussi ». */
  conseilFin: "",
  /** Pays : entre les recettes et la présentation de la cuisine. */
  pays: "",
} as const;
