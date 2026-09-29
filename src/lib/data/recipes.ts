import "server-only";
import { cache } from "react";
import { COUNTRIES } from "../countries";
import { demoRecipes } from "../demo/recipes";
import { RECIPE_COURSES } from "../recipe-utils";
import type { Recipe, RecipeCourse } from "../types";

/** Recettes publiées, écrites dans src/lib/demo/recipes*.ts. */
export const getRecipes = cache(async (): Promise<Recipe[]> => demoRecipes.filter((r) => r.isPublished));

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
