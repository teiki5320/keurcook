import { Clock } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { countryByCode } from "@/lib/countries";
import { DIFFICULTY_LABELS, formatDuration } from "@/lib/recipe-utils";
import type { Recipe } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";

/** Carte recette : grande photo, pays, durée, difficulté et cœur « favori ». */
export function RecipeCard({ recipe, priority, className = "" }: { recipe: Recipe; priority?: boolean; className?: string }) {
  const country = countryByCode(recipe.countryCode);
  return (
    <article className={`group relative ${className}`}>
      <TLink
        href={`/recette/${recipe.slug}`}
        label={recipe.name}
        className="relative block aspect-[4/5] overflow-hidden rounded-[26px] border border-[#fbeee2]/12 bg-[#281610] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] transition hover:border-[#ff7a3d]"
      >
        <ProductImage
          src={recipe.image}
          alt={recipe.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
          priority={priority}
          className="transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent via-[#140a07]/70 to-[#140a07]/95 p-5 pt-24">
          <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">{country?.name ?? recipe.countryCode}</span>
          <span className="mt-1 block text-[28px] leading-[.95] uppercase" style={anton}>
            {recipe.name}
          </span>
          <span className="mt-2 flex items-center gap-3 text-xs text-[#fbeee2]/75">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden /> {formatDuration(recipe.prepMinutes + recipe.cookMinutes)}
            </span>
            <span aria-hidden>·</span>
            <span>{DIFFICULTY_LABELS[recipe.difficulty]}</span>
          </span>
        </span>
      </TLink>
      <div className="absolute top-3 right-3">
        <FavoriteButton slug={recipe.slug} name={recipe.name} />
      </div>
    </article>
  );
}

/** Rangée de cartes qui défile horizontalement (accueil, pages pays). */
export function RecipeRow({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul className="-mx-[clamp(20px,4vw,56px)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(20px,4vw,56px)] pb-4 [scrollbar-width:none]">
      {recipes.map((r) => (
        <li key={r.id} className="w-[min(78vw,300px)] shrink-0 snap-start">
          <RecipeCard recipe={r} />
        </li>
      ))}
    </ul>
  );
}
