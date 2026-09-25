"use client";

import { Heart } from "lucide-react";
import { TLink } from "@/components/nuage/PageTransition";
import { useFavorites } from "@/lib/favorites";
import type { Recipe } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";

/** Recettes mises en favori dans ce navigateur. */
export function FavoritesList({ recipes }: { recipes: Recipe[] }) {
  const { slugs } = useFavorites();
  const list = slugs.map((s) => recipes.find((r) => r.slug === s)).filter((r): r is Recipe => Boolean(r));

  if (list.length === 0) {
    return (
      <div className="card mt-8 p-10 text-center">
        <Heart className="mx-auto h-8 w-8 text-[#ff7a3d]" aria-hidden />
        <p className="mt-3 text-lg">Vous n&apos;avez pas encore de recette favorite.</p>
        <p className="mt-1 text-sm text-muted">Touchez le cœur d&apos;une recette pour la garder ici.</p>
        <TLink href="/recettes" label="Les recettes" className="btn-primary mt-6">
          Parcourir les recettes
        </TLink>
      </div>
    );
  }
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((r) => (
        <li key={r.id}>
          <RecipeCard recipe={r} />
        </li>
      ))}
    </ul>
  );
}
