"use client";

import Link from "next/link";
import { useState } from "react";
import { FileDown, MapPin } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { RateBadges } from "@/components/product/RateBadges";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { withBasePath } from "@/lib/paths";
import type { ProductWithCategory, Variant } from "@/lib/types";
import { Coverflow } from "./Coverflow";
import { anton, CART_ADDED_EVENT } from "./shared";

/** Prix au gramme quand le format est exprimé en grammes (« 5 g » → 6,00 €/g). */
function perGram(v: Variant) {
  const m = v.label.match(/^(\d+(?:[.,]\d+)?)\s*g$/i);
  if (!m) return null;
  const grams = Number(m[1].replace(",", "."));
  return grams > 0 ? `${formatPrice(Math.round(v.priceCents / grams))} / g` : null;
}

function Offers({ product }: { product: ProductWithCategory }) {
  const { add } = useCart();
  const addVariant = (v: Variant) => {
    add(
      {
        variantId: v.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantLabel: v.label,
        priceCents: v.priceCents,
        image: product.images[0] ?? null,
        maxStock: v.stock,
      },
      1,
    );
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: `${product.name} (${v.label})` }));
  };

  return (
    <section id="formats" aria-live="polite" className="scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Formats disponibles</p>
          <h2 className="mt-1 text-3xl leading-none uppercase sm:text-4xl" style={anton}>{product.name}</h2>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <Link href={`/produit/${product.slug}`} className="font-semibold text-[#ff7a3d] underline-offset-4 hover:underline">
            Fiche complète →
          </Link>
          {product.coaUrl && (
            <a href={withBasePath(product.coaUrl)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[#fbeee2]/75 hover:text-[#fbeee2]">
              <FileDown className="h-4 w-4" aria-hidden /> Certificat d&apos;analyse
            </a>
          )}
        </div>
      </div>

      {/* Même présentation que les cartes produit de la boutique, une carte par format. */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {product.variants.map((v, i) => {
          const out = v.stock <= 0;
          const unit = perGram(v);
          return (
            <li key={v.id} className="card flex flex-col overflow-hidden">
              <Link href={`/produit/${product.slug}`} className="group relative block aspect-square overflow-hidden bg-sage-100">
                <ProductImage
                  src={product.images[0]}
                  alt={`${product.name} — ${v.label}`}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  priority={i < 2}
                  className="transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800">
                  {product.category.name}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-[#ff7a3d] px-3 py-1 text-sm font-bold text-[#140a07]">{v.label}</span>
                {out && (
                  <span className="absolute inset-x-3 bottom-3 rounded-full bg-[#140a07]/85 py-1 text-center text-xs font-semibold text-[#fbeee2]">
                    Rupture de stock
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
                <h3 className="font-display text-base leading-snug text-forest-900 sm:text-lg">
                  {product.name} <span className="text-[#ff7a3d] normal-case">· {v.label}</span>
                </h3>
                {product.originRegion && (
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {product.originRegion}
                  </p>
                )}
                <RateBadges product={product} />
                <p className="mt-auto pt-1">
                  <span className="text-base font-bold text-forest-800">{formatPrice(v.priceCents)}</span>
                  {unit && <span className="ml-1.5 text-xs text-muted">({unit})</span>}
                </p>
                {!out && v.stock <= 5 && <p className="text-xs text-[#ff7a3d]">Plus que {v.stock} en stock</p>}
                <button
                  type="button"
                  disabled={out}
                  onClick={() => addVariant(v)}
                  aria-label={`Ajouter ${product.name} (${v.label}) au panier`}
                  className="btn-primary mt-1 w-full py-2.5"
                >
                  Ajouter
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * Page de gamme : carrousel des variétés ; dessous, les formats en vente
 * de la variété au centre (ex. 3 g, 5 g, 10 g).
 */
export function GammeBrowser({ products, noun = "variété" }: { products: ProductWithCategory[]; noun?: string }) {
  const [active, setActive] = useState(0);
  const cards = products.map((p) => ({
    key: p.id,
    title: p.name,
    eyebrow: p.category.kind === "cbd" ? p.originRegion ?? "France" : p.category.name,
    image: p.images[0] ?? null,
    href: `/produit/${p.slug}`,
  }));
  const current = products[active] ?? products[0];

  return (
    <>
      <div className="-mx-4 mt-2 mb-8 sm:-mx-6 lg:-mx-8">
        <Coverflow
          items={cards}
          onActiveChange={setActive}
          onOpen={() => document.getElementById("formats")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          hint={`Glissez pour choisir une ${noun} · ses formats s'affichent dessous`}
        />
      </div>
      {current && <Offers product={current} />}
    </>
  );
}
