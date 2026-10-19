/**
 * Page « Top 10 » (/top-10/<sujet>) : un onglet par sujet, chacun avec exactement dix vrais produits
 * de la boutique, classés selon la règle donnée dans l'introduction. Ni prix ni note.
 */

/** Texte avec liens internes : chaînes et liens mis bout à bout. */
export type RichText = Array<string | { href: string; label: string }>;

export interface Top10Item {
  /** Produit de la boutique (slug) : il doit exister, être actif et avoir un lien Amazon. */
  product: string;
  /** 3 ou 4 phrases : pourquoi il est dans le top, d'après la fiche produit et les recettes citées. */
  pourquoi: string;
  /** Recettes du site où il sert (slugs), qui le nomment ou nomment son usage. */
  recettes: string[];
  /** Articles Conseils publiés qui en parlent (slugs). */
  articles?: string[];
  /** Taille indiquée par la fiche Amazon (diamètre en cm), pour un classement par taille. */
  tailleCm?: number;
}

export interface Top10 {
  /** Adresse : /top-10/<slug>. */
  slug: string;
  /** Libellé court de l'onglet. */
  tab: string;
  /** Titre de la page (« Top 10 des … »). */
  title: string;
  /** Titre pour Google, si `title` dépasse 60 caractères avec le suffixe. */
  seoTitle?: string;
  /** Description pour Google (≤ 160 caractères). */
  description: string;
  /** 2 ou 3 phrases : comment le classement est fait. */
  intro: string;
  /** Date de mise à jour (AAAA-MM-JJ). */
  updated: string;
  /** Règle de classement annoncée dans l'introduction (vérifiée par les tests). */
  rankBy: "recettes" | "recettes-et-articles" | "taille";
  /** Exactement dix produits, du 1er au 10e. */
  items: Top10Item[];
  /** « Comment choisir » : quelques conseils courts. */
  guide: RichText[];
  /** Trois questions fréquentes. */
  faq: Array<{ question: string; reponse: RichText }>;
}
