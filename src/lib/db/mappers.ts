/* Conversion des lignes SQL (snake_case) vers les types applicatifs. */
import type { Category, NewsletterSubscriber, Product, Recipe, RecipeReview, Variant } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

/** Le pilote renvoie des objets Date, les colonnes JSON des chaînes ISO. */
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v));

export function mapCategory(r: Row): Category {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description ?? "",
    position: r.position ?? 0,
  };
}

export function mapVariant(r: Row): Variant {
  return {
    id: r.id,
    productId: r.product_id,
    label: r.label,
    priceCents: r.price_cents,
    stock: r.stock,
    sku: r.sku ?? null,
    position: r.position ?? 0,
  };
}

export function mapProduct(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    categoryId: r.category_id,
    shortDescription: r.short_description ?? "",
    description: r.description ?? "",
    originCountry: r.origin_country ?? null,
    originRegion: r.origin_region ?? null,
    producer: r.producer ?? null,
    images: r.images ?? [],
    composition: r.composition ?? null,
    allergens: r.allergens ?? [],
    usageTips: r.usage_tips ?? null,
    conservation: r.conservation ?? null,
    tags: r.tags ?? [],
    amazonAsin: r.amazon_asin ?? null,
    isActive: r.is_active,
    featured: r.featured,
    createdAt: iso(r.created_at),
    variants: ((r.product_variants ?? []) as Row[])
      .map(mapVariant)
      .sort((a, b) => a.position - b.position),
  };
}

export function mapRecipe(r: Row): Recipe {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    countryCode: r.country_code,
    region: r.region ?? null,
    course: r.course,
    shortDescription: r.short_description ?? "",
    story: r.story ?? "",
    image: r.image ?? null,
    prepMinutes: r.prep_minutes ?? 0,
    cookMinutes: r.cook_minutes ?? 0,
    servings: r.servings ?? 4,
    difficulty: r.difficulty ?? 1,
    ingredients: (r.ingredients ?? []).map((i: Row) => ({
      quantity: i.quantity ?? null,
      unit: i.unit ?? null,
      name: String(i.name ?? ""),
      productSlug: i.productSlug ?? null,
    })),
    steps: (r.steps ?? []).map((st: Row) => ({ text: String(st.text ?? ""), image: st.image ?? null })),
    tips: r.tips ?? [],
    tags: r.tags ?? [],
    featured: r.featured,
    isPublished: r.is_published,
    createdAt: iso(r.created_at),
  };
}

export function mapReview(r: Row): RecipeReview {
  return {
    id: r.id,
    recipeId: r.recipe_id,
    authorName: r.author_name,
    rating: r.rating,
    comment: r.comment ?? "",
    status: r.status,
    createdAt: iso(r.created_at),
  };
}

export function mapSubscriber(r: Row): NewsletterSubscriber {
  return {
    id: r.id,
    email: r.email,
    consentAt: iso(r.consent_at),
    unsubscribedAt: r.unsubscribed_at ? iso(r.unsubscribed_at) : null,
  };
}
