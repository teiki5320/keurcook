import "server-only";
import { cache } from "react";
import { COUNTRIES } from "../countries";
import { getSql, isDbConfigured } from "../db/client";
import { mapRecipe, mapReview } from "../db/mappers";
import { demoRecipes } from "../demo/recipes";
import { RECIPE_COURSES } from "../recipe-utils";
import type { Recipe, RecipeCourse, RecipeReview } from "../types";

/**
 * Recettes publiées : depuis la base de données, ou les données de
 * démonstration (src/lib/demo/recipes.ts) en mode démo.
 */
export const getRecipes = cache(async (): Promise<Recipe[]> => {
  if (!isDbConfigured) return demoRecipes.filter((r) => r.isPublished);
  const rows = await getSql().query("select * from recipes where is_published order by featured desc, created_at");
  return rows.map(mapRecipe);
});

export async function getRecipeBySlug(slug: string) {
  return (await getRecipes()).find((r) => r.slug === slug) ?? null;
}

export interface RecipeGroup {
  key: RecipeCourse;
  name: string;
  description: string;
  recipes: Recipe[];
}

/** Recettes regroupées par type de plat (carrousels de l'accueil et de /recettes). */
export async function getRecipeGroups(): Promise<RecipeGroup[]> {
  const recipes = await getRecipes();
  return RECIPE_COURSES.map((c) => ({ ...c, recipes: recipes.filter((r) => r.course === c.key) })).filter((g) => g.recipes.length > 0);
}

/** Pays ayant au moins une recette publiée, avec leur nombre de recettes. */
export async function getCountriesWithRecipes() {
  const recipes = await getRecipes();
  return COUNTRIES.map((c) => ({ ...c, count: recipes.filter((r) => r.countryCode === c.code).length })).filter((c) => c.count > 0);
}

/** Recettes qui utilisent un produit de la boutique. */
export async function getRecipesUsingProduct(productSlug: string) {
  return (await getRecipes()).filter((r) => r.ingredients.some((i) => i.productSlug === productSlug));
}

/** Recettes proches : même pays, puis même type de plat. */
export async function getRelatedRecipes(recipe: Recipe, limit = 3) {
  const others = (await getRecipes()).filter((r) => r.id !== recipe.id);
  return [
    ...others.filter((r) => r.countryCode === recipe.countryCode),
    ...others.filter((r) => r.countryCode !== recipe.countryCode && r.course === recipe.course),
    ...others.filter((r) => r.countryCode !== recipe.countryCode && r.course !== recipe.course),
  ].slice(0, limit);
}

export interface RecipeRating {
  average: number;
  count: number;
}

/** Avis validés d'une recette et note moyenne (aucun avis en mode démo). */
export async function getRecipeReviews(recipeId: string): Promise<{ reviews: RecipeReview[]; rating: RecipeRating | null }> {
  if (!isDbConfigured) return { reviews: [], rating: null };
  const rows = await getSql().query(
    "select * from recipe_reviews where recipe_id = $1 and status = 'approved' order by created_at desc limit 50",
    [recipeId],
  );
  const reviews = rows.map(mapReview);
  if (!reviews.length) return { reviews, rating: null };
  const average = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { reviews, rating: { average: Math.round(average * 10) / 10, count: reviews.length } };
}
