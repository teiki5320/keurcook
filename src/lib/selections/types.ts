/**
 * Pages « Nos sélections » (/selections/<sujet>) : une liste ordonnée de vrais produits de la boutique,
 * chacun relié aux recettes du site où il sert. Ni prix ni note : le prix du jour est sur Amazon.
 */

/** Texte avec liens internes : chaînes et liens mis bout à bout. */
export type RichText = Array<string | { href: string; label: string }>;

export interface SelectionItem {
  /** Produit de la boutique (slug) : il doit exister et avoir un lien Amazon. */
  product: string;
  /** Geste ou usage (clé de `Selection.gestes`), pour les filtres. */
  geste: string;
  /** Pourquoi il figure dans la sélection, tiré de la fiche produit et des recettes citées. */
  pourquoi: string;
  /** Points forts, d'après la fiche produit. */
  onAime: string[];
  /** Points à connaître (entretien, usage), d'après la fiche produit. */
  aSavoir: string[];
  /** Fin de phrase après « Idéal pour ». */
  idealPour: string;
  /** Caractéristiques courtes, uniquement celles indiquées par la fiche produit. */
  matiere: string;
  taille?: string;
  entretien: string;
  /** Recettes du site où il sert (slugs) : chacune doit exister et l'employer. */
  recettes: string[];
  /** Mention du podium (« Notre top 3 ») : présente sur trois produits au plus. */
  podium?: { mention: string; resume: string };
}

export interface Selection {
  slug: string;
  /** Titre de la page (h1). */
  title: string;
  /** Titre pour Google (≤ 60 caractères, suffixe compris), sinon `title`. */
  seoTitle?: string;
  /** Description pour Google et pour la carte de l'index (≤ 160 caractères). */
  description: string;
  /** Chapeau sous le titre. */
  intro: string;
  /** Nom court de la famille (« ustensiles »), pour « 9 ustensiles ». */
  unite: string;
  /** Date de mise à jour (AAAA-MM-JJ). */
  updated: string;
  /** Gestes proposés en filtre, dans l'ordre : clé → libellé. */
  gestes: Record<string, string>;
  items: SelectionItem[];
  /** « Comment choisir » : trois conseils. */
  guide: Array<{ titre: string; texte: RichText }>;
  faq: Array<{ question: string; reponse: RichText }>;
}
