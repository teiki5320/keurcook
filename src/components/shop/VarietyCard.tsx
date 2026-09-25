"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { CART_ADDED_EVENT } from "@/components/nuage/shared";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice, pricePerGram } from "@/lib/format";
import type { ProductWithCategory } from "@/lib/types";

/** Carte produit : photo, origine, choix du format (100 g · 250 g…) et ajout au panier. */
export function VarietyCard({ product, priority }: { product: ProductWithCategory; priority?: boolean }) {
  const { add } = useCart();
  const firstAvailable = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  if (!variant) return null;
  const out = variant.stock <= 0;
  const unit = pricePerGram(variant.label, variant.priceCents);

  const onAdd = () => {
    if (out) return;
    add(
      {
        variantId: variant.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantLabel: variant.label,
        priceCents: variant.priceCents,
        image: product.images[0] ?? null,
        maxStock: variant.stock,
      },
      1,
    );
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: `${product.name} (${variant.label})` }));
  };

  return (
    <article className="card flex flex-col overflow-hidden">
      <Link href={`/produit/${product.slug}`} className="group relative block aspect-square overflow-hidden bg-sage-100">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800">
          {product.category.name}
        </span>
        {product.featured && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#ff7a3d] px-2.5 py-0.5 text-[11px] font-bold text-[#140a07]">
            <Heart className="h-3 w-3 fill-current" aria-hidden /> Coup de cœur
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <h3 className="font-display text-base leading-snug text-forest-900 sm:text-lg">
          <Link href={`/produit/${product.slug}`} className="hover:text-[#ff7a3d]">
            {product.name}
          </Link>
        </h3>
        {(product.originCountry || product.originRegion) && (
          <p className="flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {[product.originCountry, product.originRegion].filter(Boolean).join(" · ")}
          </p>
        )}

        {product.variants.length > 1 && (
          <div className="mt-1 flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Format de ${product.name}`}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === variant.id}
                disabled={v.stock <= 0}
                onClick={() => setVariantId(v.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${
                  v.id === variant.id ? "border-[#ff7a3d] bg-[#ff7a3d] text-[#140a07]" : "border-[#fbeee2]/20 text-[#fbeee2] hover:border-[#ff7a3d]"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <p className="mt-auto pt-1">
          <span className="text-base font-bold text-forest-800">{formatPrice(variant.priceCents)}</span>
          <span className="ml-1.5 text-xs text-muted">{product.variants.length === 1 ? variant.label : unit ? `(${unit})` : ""}</span>
        </p>
        {!out && variant.stock <= 5 && <p className="text-xs text-[#ff7a3d]">Plus que {variant.stock} en stock</p>}
        <button
          type="button"
          disabled={out}
          onClick={onAdd}
          aria-label={`Ajouter ${product.name} (${variant.label}) au panier`}
          className="btn-primary mt-1 w-full py-2.5"
        >
          {out ? "Rupture de stock" : "Ajouter"}
        </button>
      </div>
    </article>
  );
}
