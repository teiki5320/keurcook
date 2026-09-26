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
  stock: number;
  sku: string | null;
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
  /** Code ASIN de la fiche Amazon.fr : si présent, le bouton « Acheter » mène à Amazon. */
  amazonAsin: string | null;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  variants: Variant[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string | null;
  variantId: string | null;
  productName: string;
  variantLabel: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  accessToken: string;
  status: OrderStatus;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  city: string;
  country: string;
  notes: string | null;
  paymentProvider: string;
  paymentReference: string | null;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  trackingNumber: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface CustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  country: string;
  notes?: string;
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
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
  /** Position sur la carte (longitude, latitude). */
  lon: number;
  lat: number;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface RecipeReview {
  id: string;
  recipeId: string;
  authorName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  consentAt: string;
  unsubscribedAt: string | null;
}
