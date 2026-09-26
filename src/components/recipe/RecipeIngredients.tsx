"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, ShoppingBasket } from "lucide-react";
import { CART_ADDED_EVENT } from "@/components/nuage/shared";
import { AmazonBuyButton } from "@/components/product/AmazonBuyButton";
import { TLink } from "@/components/nuage/PageTransition";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { ingredientLine } from "@/lib/recipe-utils";
import type { RecipeIngredient } from "@/lib/types";

/** Produit de la boutique lié à un ingrédient (format le moins cher disponible). */
export interface LinkedProduct {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  variantId: string;
  variantLabel: string;
  priceCents: number;
  stock: number;
  /** Fiche Amazon.fr : bouton « Acheter » au lieu de l'ajout au panier. */
  amazonAsin: string | null;
}

/**
 * Liste d'ingrédients : quantités ajustées au nombre de personnes, ingrédients
 * vendus sur le site mis en avant, et ajout de tous les produits rares en un clic.
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
  const { add } = useCart();
  const [people, setPeople] = useState(servings);
  const factor = people / servings;
  const linked = [...new Map(ingredients.flatMap((i) => (i.productSlug && products[i.productSlug] ? [[i.productSlug, products[i.productSlug]] as const] : []))).values()];
  const available = linked.filter((p) => p.stock > 0 && !p.amazonAsin);

  const addProducts = (list: LinkedProduct[]) => {
    for (const p of list) {
      add(
        { variantId: p.variantId, productId: p.productId, slug: p.slug, name: p.name, variantLabel: p.variantLabel, priceCents: p.priceCents, image: p.image, maxStock: p.stock },
        1,
      );
    }
    const label = list.length === 1 ? `${list[0].name} (${list[0].variantLabel})` : `${list.length} produits de la recette`;
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: label }));
  };

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
                  {product.amazonAsin ? (
                    <AmazonBuyButton
                      asin={product.amazonAsin}
                      priceCents={product.priceCents}
                      name={product.name}
                      icon
                      className="inline-flex items-center gap-1 rounded-full bg-[#ff7a3d] px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-[#140a07] hover:bg-[#ffc46b]"
                    />
                  ) : (
                  <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={() => addProducts([product])}
                    aria-label={`Ajouter ${product.name} (${product.variantLabel}, ${formatPrice(product.priceCents)}) au panier`}
                    title={`${product.variantLabel} · ${formatPrice(product.priceCents)}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7a3d] text-[#140a07] hover:bg-[#ffc46b] disabled:opacity-40"
                  >
                    <ShoppingBasket className="h-4 w-4" aria-hidden />
                  </button>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {available.length > 0 && (
        <div className="mt-5 rounded-2xl border border-[#ff7a3d]/40 bg-[#ff7a3d]/8 p-4 print:hidden">
          <p className="text-sm">
            <strong>{available.length} produit{available.length > 1 ? "s" : ""} rare{available.length > 1 ? "s" : ""}</strong> de cette recette{" "}
            {available.length > 1 ? "sont disponibles" : "est disponible"} dans notre épicerie.
          </p>
          <button type="button" onClick={() => addProducts(available)} className="btn-primary mt-3 w-full py-3">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Tout ajouter au panier · {formatPrice(available.reduce((s, p) => s + p.priceCents, 0))}
          </button>
        </div>
      )}
    </div>
  );
}
