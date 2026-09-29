import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { anton } from "@/components/nuage/typography";
import { FavoritesList } from "@/components/recipe/FavoritesList";
import { getRecipes } from "@/lib/data/recipes";

export const metadata: Metadata = pageMetadata({
  title: "Mes recettes favorites",
  description: "Les recettes africaines que vous avez mises de côté sur Keur Cook.",
  path: "/favoris",
  noindex: true,
});

export default async function FavoritesPage() {
  const recipes = await getRecipes();
  return (
    <div className="container-page">
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
        Mes favoris<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">Vos recettes mises de côté, enregistrées dans ce navigateur (sans compte).</p>
      <FavoritesList recipes={recipes} />
    </div>
  );
}
