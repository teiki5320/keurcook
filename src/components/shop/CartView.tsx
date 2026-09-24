"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { isStaticExport } from "@/lib/paths";
import { CartSummary } from "./CartSummary";

export function CartView({ flatRateCents, freeThresholdCents }: { flatRateCents: number; freeThresholdCents: number }) {
  const { lines, ready, subtotalCents, setQuantity, remove } = useCart();

  if (!ready) return <div className="h-40 animate-pulse rounded-3xl bg-sage-100" />;

  if (lines.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display text-2xl text-forest-900">Votre panier est vide.</p>
        <Link href="/boutique" className="btn-primary mt-6">
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <ul className="card divide-y divide-sage-200">
        {lines.map((line) => (
          <li key={line.variantId} className="flex gap-4 p-4">
            <Link href={`/produit/${line.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-sage-100">
              <ProductImage src={line.image} alt={line.name} sizes="96px" />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <div>
                  <Link href={`/produit/${line.slug}`} className="font-semibold text-forest-900 hover:underline">
                    {line.name}
                  </Link>
                  <p className="text-sm text-muted">{line.variantLabel}</p>
                </div>
                <p className="font-semibold">{formatPrice(line.priceCents * line.quantity)}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-full border border-sage-300">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sage-100"
                    aria-label={`Diminuer la quantité de ${line.name}`}
                    onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sage-100 disabled:opacity-40"
                    aria-label={`Augmenter la quantité de ${line.name}`}
                    disabled={line.quantity >= line.maxStock}
                    onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(line.variantId)}
                  className="inline-flex items-center gap-1 text-sm text-muted hover:text-terracotta-dark"
                >
                  <Trash2 className="h-4 w-4" aria-hidden /> Retirer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-4">
        <CartSummary subtotalCents={subtotalCents} flatRateCents={flatRateCents} freeThresholdCents={freeThresholdCents}>
          {isStaticExport ? (
            <>
              <button type="button" disabled className="btn-primary mt-2 w-full py-3">
                Passer commande
              </button>
              <p role="note" className="mt-3 rounded-2xl border border-[#ffc46b]/40 bg-[#ffc46b]/10 p-3 text-xs text-[#ffc46b]">
                Site de démonstration : la commande en ligne n&apos;est pas active sur cette version. Elle fonctionne
                sur la version complète du site.
              </p>
            </>
          ) : (
            <Link href="/commande" className="btn-primary mt-2 w-full py-3">
              Passer commande
            </Link>
          )}
        </CartSummary>
        <p className="text-xs text-muted">
          Vente réservée aux personnes majeures. Les prix et disponibilités sont vérifiés lors de la validation de la commande.
        </p>
      </div>
    </div>
  );
}
