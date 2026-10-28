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
