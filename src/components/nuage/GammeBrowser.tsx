"use client";

import Link from "next/link";
import { useState } from "react";
import { FileDown, MapPin } from "lucide-react";
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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Formats disponibles</p>
          <h2 className="mt-1 text-4xl leading-none uppercase" style={anton}>{product.name}</h2>
        </div>
        <RateBadges product={product} />
      </div>
      {(product.originRegion || product.producer) && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {[product.originRegion, product.producer].filter(Boolean).join(" · ")}
        </p>
      )}
      <p className="mt-2 max-w-2xl text-sm text-muted">{product.shortDescription}</p>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
        {product.variants.map((v) => {
          const out = v.stock <= 0;
          const unit = perGram(v);
          return (
            <li
              key={v.id}
              className="flex items-center gap-4 rounded-2xl border border-[#fbeee2]/10 bg-[#211209] px-4 py-3 sm:flex-col sm:items-stretch sm:rounded-3xl sm:p-5"
            >
              <span className="w-16 shrink-0 text-3xl leading-none sm:w-auto sm:text-4xl" style={anton}>{v.label}</span>
              <span className="min-w-0 flex-1 sm:mt-2">
                <span className="block text-lg font-bold text-[#fbeee2] sm:text-2xl">{formatPrice(v.priceCents)}</span>
                <span className={`block text-xs ${out ? "text-[#ffc46b]" : v.stock <= 5 ? "text-[#ff7a3d]" : "text-muted"}`}>
                  {out ? "Rupture de stock" : v.stock <= 5 ? `Plus que ${v.stock} en stock` : unit ? `soit ${unit}` : "En stock"}
                </span>
              </span>
              <button
                type="button"
                disabled={out}
                onClick={() => addVariant(v)}
                aria-label={`Ajouter ${product.name} (${v.label}) au panier`}
                className="shrink-0 rounded-full bg-[#ff7a3d] px-4 py-2.5 text-sm font-bold text-[#140a07] transition hover:bg-[#ffc46b] disabled:cursor-not-allowed disabled:opacity-40 sm:mt-4 sm:py-3"
              >
                Ajouter
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href={`/produit/${product.slug}`} className="font-semibold text-[#ff7a3d] underline-offset-4 hover:underline">
          Fiche complète →
        </Link>
        {product.coaUrl && (
          <a href={withBasePath(product.coaUrl)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[#fbeee2]/75 hover:text-[#fbeee2]">
            <FileDown className="h-4 w-4" aria-hidden /> Certificat d&apos;analyse (PDF)
          </a>
        )}
      </div>
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
