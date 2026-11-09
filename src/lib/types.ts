export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  position: number;
}

export interface Variant {
  id: string;
  productId: string;
  label: string;
  priceCents: number;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  /** Pays d'origine (ex. « Cameroun »). */
  originCountry: string | null;
  originRegion: string | null;
  producer: string | null;
  images: string[];
  /** Liste des ingrédients (étiquetage alimentaire). */
  composition: string | null;
  /** Allergènes présents (ex. « arachide », « poisson »). */
  allergens: string[];
  /** Conseils d'utilisation en cuisine. */
  usageTips: string | null;
  /** Conditions de conservation. */
  conservation: string | null;
  tags: string[];
  /** Code ASIN de la fiche Amazon.fr : si présent, le bouton « Voir sur Amazon » mène à Amazon. */
  amazonAsin: string | null;
  /** Titre pour Google (60 caractères au plus avec « | Keur Cook »), s'il diffère du nom. */
  seoTitle?: string;
  /** Méta-description (155 caractères au plus), à la place de la description courte et de l'origine. */
  seoDescription?: string;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  variants: Variant[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

// ------------------------------------------------------------------ Recettes

/** Type de plat : chaque type forme un carrousel sur l'accueil et la page Recettes. */
export type RecipeCourse = "mijotes" | "grillades" | "riz-cereales" | "accompagnements" | "douceurs";

export interface RecipeIngredient {
  /** Quantité pour le nombre de personnes de la recette (null : « à votre goût »). */
  quantity: number | null;
  unit: string | null;
  name: string;
  /** Produit de la boutique correspondant (slug), s'il est vendu sur le site. */
  productSlug: string | null;
}

export interface RecipeStep {
  text: string;
  image: string | null;
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  /** Code du pays (voir src/lib/countries.ts). */
  countryCode: string;
  region: string | null;
  course: RecipeCourse;
  shortDescription: string;
  /** Histoire du plat : origine, occasions. Paragraphes séparés par une ligne vide. */
  story: string;
  image: string | null;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: 1 | 2 | 3;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: string[];
  tags: string[];
  /** Ustensiles de la boutique utiles pour cette recette (slugs de produits). */
  equipment?: string[];
  /** Titre de la page pour Google (60 caractères au plus avec « | Keur Cook »), s'il diffère du titre automatique. */
  seoTitle?: string;
  /** Méta-description (155 caractères au plus), à la place de la description courte. */
  seoDescription?: string;
  /** Questions fréquentes affichées sur la page (et données FAQPage), avec des faits déjà présents dans la recette. */
  faq?: Array<{ question: string; answer: string }>;
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface Country {
  code: string;
  slug: string;
  name: string;
  /** Complément « de … » avec le bon article : « du Sénégal », « de Côte d'Ivoire », « d'Éthiopie ». */
  of: string;
  /** Présentation courte de la cuisine du pays. */
  description: string;
  /** Titre et méta-description pour Google, s'ils diffèrent de « Recettes du … » et de la présentation courte. */
  seoTitle?: string;
  seoDescription?: string;
  /** Position sur la carte (longitude, latitude). */
  lon: number;
  lat: number;
}

/** Question fréquente d'une fiche détaillée ; la réponse peut contenir des liens « [texte](/chemin) ». */
export interface FicheQuestion {
  question: string;
  reponse: string;
}

/**
 * Fiche détaillée d'un produit (section « Le produit en détail », règles docs/FICHES.md).
 * Chaque texte : paragraphes séparés par une ligne vide, liens internes écrits « [texte](/recette/slug) ».
 * Total 250 à 450 mots (vérifié par tests/fiches.test.ts).
 */
export interface ProductDetail {
  /** Origine et histoire (épicerie), ou origine, matière et fabrication (ustensile), ou le livre et son auteur. */
  origine: string;
  /** Comment le choisir, en le comparant aux produits voisins de la boutique (liens /produit/…). */
  choisir: string;
  /** Conservation (épicerie) ou entretien et rangement (ustensile). Facultatif pour les livres. */
  conserver?: string;
  /** Par quoi le remplacer (épicerie) ou que faire sans lui (ustensile). Facultatif pour les livres. */
  remplacer?: string;
  /** Avec nos recettes et nos conseils : liens vers les recettes et articles « Conseils » publiés. */
  enCuisine: string;
  /** 2 ou 3 questions fréquentes (affichées et données FAQPage pour Google). Facultatif. */
  faq?: FicheQuestion[];
}

/**
 * Fiche détaillée d'un pays (section « La cuisine du … en détail » des pages /pays/…, règles docs/FICHES.md).
 * Ne répète pas le texte de src/lib/country-cuisine.ts. Total 400 à 700 mots.
 */
export interface CountryDetail {
  /** Histoire, géographie et influences qui ont façonné la cuisine. */
  histoire: string;
  /** D'une région à l'autre : les spécialités locales. Facultatif. */
  regions?: string;
  /** Les produits du placard, avec des liens vers les fiches produits du site. */
  produits: string;
  /** À table : repas du quotidien, cuisine de rue, boissons, coutumes. */
  table: string;
  /** Par où commencer : recettes et conseils du site à essayer d'abord. */
  commencer: string;
  /** 2 ou 3 questions fréquentes (affichées et données FAQPage). Facultatif. */
  faq?: FicheQuestion[];
}
