"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { CART_ADDED_EVENT } from "@/components/nuage/shared";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice, pricePerGram } from "@/lib/format";
import type { Variant } from "@/lib/types";

interface Props {
  product: { id: string; slug: string; name: string; image: string | null };
  variants: Variant[];
}

export function AddToCart({ product, variants }: Props) {
  const { add } = useCart();
  const firstAvailable = variants.find((v) => v.stock > 0) ?? variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const [qty, setQty] = useState(1);
  const variant = variants.find((v) => v.id === variantId) ?? firstAvailable;

  if (!variant) return null;
  const outOfStock = variant.stock <= 0;
  const unit = pricePerGram(variant.label, variant.priceCents);

  function onAdd() {
    if (!variant || outOfStock) return;
    add(
      {
        variantId: variant.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantLabel: variant.label,
        priceCents: variant.priceCents,
        image: product.image,
        maxStock: variant.stock,
      },
      qty,
    );
    // Ouvre le mini-panier latéral.
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: `${product.name} (${variant.label})${qty > 1 ? ` × ${qty}` : ""}` }));
  }

  return (
    <div className="space-y-5">
      <p className="text-3xl font-semibold text-forest-900">
        {formatPrice(variant.priceCents)}
        {unit && <span className="ml-2 text-base font-normal text-muted">soit {unit}</span>}
      </p>

      {variants.length > 1 && (
        <fieldset>
          <legend className="label">Format</legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setVariantId(v.id);
                  setQty(1);
                }}
                aria-pressed={v.id === variant.id}
                disabled={v.stock <= 0}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  v.id === variant.id
                    ? "border-forest-700 bg-forest-700 text-cream"
                    : "border-sage-300 bg-white text-forest-800 hover:border-forest-600"
                } disabled:cursor-not-allowed disabled:line-through disabled:opacity-50`}
              >
                {v.label} · {formatPrice(v.priceCents)}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <p className={`text-sm ${outOfStock ? "text-terracotta-dark" : variant.stock <= 5 ? "text-terracotta" : "text-forest-600"}`}>
        {outOfStock ? "Rupture de stock" : variant.stock <= 5 ? `Plus que ${variant.stock} en stock` : "En stock — expédition sous 48 h"}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between rounded-full border border-sage-300 bg-white sm:w-36">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-sage-100"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            disabled={outOfStock}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span aria-live="polite" className="font-semibold">{qty}</span>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-sage-100"
            onClick={() => setQty((q) => Math.min(variant.stock, q + 1))}
            aria-label="Augmenter la quantité"
            disabled={outOfStock || qty >= variant.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button type="button" onClick={onAdd} disabled={outOfStock} className="btn-primary h-11 flex-1">
          <ShoppingBag className="h-4 w-4" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
