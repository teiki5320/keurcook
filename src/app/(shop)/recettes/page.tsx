import type { Metadata } from "next";
import { RecipesBrowser } from "@/components/recipe/RecipesBrowser";
import { getCountriesWithRecipes, getRecipes } from "@/lib/data/recipes";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Recettes africaines",
  description:
    "Toutes nos recettes de plats africains, pas à pas : mijotés, grillades, riz et céréales, accompagnements, desserts et boissons. Recherche par pays ou par ingrédient.",
  alternates: { canonical: "/recettes" },
};

export default async function RecipesPage() {
  const [recipes, countries] = await Promise.all([getRecipes(), getCountriesWithRecipes()]);
  return <RecipesBrowser recipes={recipes} countries={countries} />;
}
