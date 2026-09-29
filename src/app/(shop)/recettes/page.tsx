import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { RecipesBrowser } from "@/components/recipe/RecipesBrowser";
import { getMaintenance } from "@/lib/data/settings";
import { getCountriesWithRecipes, getRecipes } from "@/lib/data/recipes";


export const metadata: Metadata = pageMetadata({
  title: "Recettes africaines",
  description:
    "Toutes nos recettes de plats africains, pas à pas : mijotés, grillades, riz et céréales, accompagnements, desserts et boissons. Recherche par pays ou par ingrédient.",
  path: "/recettes",
});

export default async function RecipesPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const [recipes, countries] = await Promise.all([getRecipes(), getCountriesWithRecipes()]);
  return <RecipesBrowser recipes={recipes} countries={countries} />;
}
