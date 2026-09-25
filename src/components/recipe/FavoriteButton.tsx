"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

/** Cœur « garder cette recette » (favoris enregistrés dans le navigateur). */
export function FavoriteButton({ slug, name, variant = "icon" }: { slug: string; name: string; variant?: "icon" | "pill" }) {
  const { has, toggle } = useFavorites();
  const on = has(slug);
  const label = on ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={on}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
          on ? "border-[#ff7a3d] bg-[#ff7a3d] text-[#140a07]" : "border-[#fbeee2]/25 text-[#fbeee2] hover:border-[#ff7a3d]"
        }`}
      >
        <Heart className={`h-4 w-4 ${on ? "fill-current" : ""}`} aria-hidden />
        {on ? "Dans mes favoris" : "Ajouter aux favoris"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        // Le cœur est posé sur une carte cliquable : on n'ouvre pas la recette.
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
        on ? "bg-[#ff7a3d] text-[#140a07]" : "bg-[#140a07]/60 text-[#fbeee2] hover:bg-[#140a07]/85"
      }`}
    >
      <Heart className={`h-5 w-5 ${on ? "fill-current" : ""}`} aria-hidden />
    </button>
  );
}
