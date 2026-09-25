/** Format compact des recettes de démonstration, converti en objets Recipe. */
import type { Recipe, RecipeIngredient } from "../types";

/** [quantité, unité, nom, slug du produit de la boutique] */
export type Ing = [number | null, string | null, string, string?];

export type RecipeSeed = Omit<Recipe, "id" | "image" | "isPublished" | "createdAt" | "ingredients" | "steps"> & {
  ingredients: Ing[];
  steps: string[];
};

const id = (n: number) => `40000000-0000-4000-a000-${n.toString(16).padStart(12, "0")}`;

const ing = (list: Ing[]): RecipeIngredient[] =>
  list.map(([quantity, unit, name, productSlug]) => ({ quantity, unit, name, productSlug: productSlug ?? null }));

export function buildRecipes(seeds: RecipeSeed[]): Recipe[] {
  return seeds.map((seed, index) => ({
    ...seed,
    id: id(index + 1),
    image: `/recipes/${seed.slug}.webp`,
    ingredients: ing(seed.ingredients),
    steps: seed.steps.map((text) => ({ text, image: null })),
    isPublished: true,
    createdAt: new Date(Date.UTC(2026, 1, 1 + index)).toISOString(),
  }));
}
