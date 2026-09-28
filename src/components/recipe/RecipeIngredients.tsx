"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AmazonBuyButton } from "@/components/product/AmazonBuyButton";
import { TLink } from "@/components/nuage/PageTransition";
import { ingredientLine } from "@/lib/recipe-utils";
import type { RecipeIngredient } from "@/lib/types";

/** Produit de la boutique lié à un ingrédient : fiche du site et lien d'achat Amazon. */
export interface LinkedProduct {
  slug: string;
  name: string;
  priceCents: number;
  amazonAsin: string;
}

/**
 * Liste d'ingrédients : quantités ajustées au nombre de personnes ; les
 * ingrédients présents dans la boutique renvoient à leur fiche et à Amazon.
 */
export function RecipeIngredients({
  ingredients,
  servings,
  products,
}: {
  ingredients: RecipeIngredient[];
  servings: number;
  products: Record<string, LinkedProduct>;
}) {
  const [people, setPeople] = useState(servings);
  const factor = people / servings;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-3xl">Ingrédients</h2>
        <div className="flex items-center gap-1 rounded-full border border-[#fbeee2]/20 print:hidden" role="group" aria-label="Nombre de personnes">
          <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} disabled={people <= 1} aria-label="Une personne de moins" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#fbeee2]/10 disabled:opacity-40">
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <span aria-live="polite" className="min-w-[5.5rem] text-center text-sm font-semibold">
            {people} pers.
          </span>
          <button type="button" onClick={() => setPeople((p) => Math.min(30, p + 1))} aria-label="Une personne de plus" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#fbeee2]/10">
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <span className="hidden text-sm print:inline">Pour {people} personnes</span>
      </div>

      <ul className="mt-5 divide-y divide-[#fbeee2]/10">
        {ingredients.map((i, k) => {
          const { quantity, label } = ingredientLine(i, factor);
          const product = i.productSlug ? products[i.productSlug] : undefined;
          return (
            <li key={k} className="flex items-start justify-between gap-3 py-2.5">
              <span className="text-[15px] leading-snug">
                {quantity && <strong className="font-semibold text-[#ffc46b]">{quantity} </strong>}
                {label}
              </span>
              {product && (
                <span className="flex shrink-0 items-center gap-1.5 print:hidden">
                  <TLink href={`/produit/${product.slug}`} label={product.name} className="rounded-full bg-[#ff7a3d]/15 px-2.5 py-1 text-[11px] font-bold text-[#ffc46b] hover:bg-[#ff7a3d]/25">
                    Produit rare
                  </TLink>
                  <AmazonBuyButton
                    asin={product.amazonAsin}
                    priceCents={product.priceCents}
                    name={product.name}
                    icon
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7a3d] text-[#140a07] hover:bg-[#ffc46b]"
                  />
                </span>
              )}
            </li>
          );
        })}
      </ul>

    </div>
  );
}
