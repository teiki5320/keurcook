import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { RecipesBrowser } from "@/components/recipe/RecipesBrowser";
import { getCountriesWithRecipes, getRecipes } from "@/lib/data/recipes";


export const metadata: Metadata = pageMetadata({
  title: "Recettes africaines",
  description:
    "Toutes nos recettes de plats africains, pas à pas : mijotés, grillades, riz et céréales, accompagnements, desserts et boissons. Recherche par pays ou par ingrédient.",
  path: "/recettes",
});

export default async function RecipesPage() {
  const [recipes, countries] = await Promise.all([getRecipes(), getCountriesWithRecipes()]);
  return <RecipesBrowser recipes={recipes} countries={countries} />;
}
