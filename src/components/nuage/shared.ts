"use client";

import { useRef } from "react";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import type { MiniProduct } from "./mini";

/** Événement écouté par <CartToast> pour confirmer un ajout au panier. */
export const CART_ADDED_EVENT = "alohash:cart-added";

export function useAddMini() {
  const { add } = useCart();
  return (p: MiniProduct) => {
    if (p.variant.stock <= 0) return;
    add(
      {
        variantId: p.variant.id,
        productId: p.id,
        slug: p.slug,
        name: p.name,
        variantLabel: p.variant.label,
        priceCents: p.variant.priceCents,
        image: p.image,
        maxStock: p.variant.stock,
      },
      1,
    );
    window.dispatchEvent(new CustomEvent(CART_ADDED_EVENT, { detail: `${p.name} (${p.variant.label})` }));
  };
}

export function priceLabel(p: MiniProduct) {
  return (p.fromPrice ? "dès " : "") + formatPrice(p.variant.priceCents).replace(",00", "");
}

export const anton: React.CSSProperties = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 };

/**
 * Glissement horizontal (doigt ou souris) pour les carrousels.
 * `touch-action: pan-y` laisse le défilement vertical de la page au navigateur.
 * Un clic qui suit un glissement est ignoré (pas d'ouverture de carte par erreur).
 */
export function useSwipe(onNext: () => void, onPrev: () => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    style: { touchAction: "pan-y" } as React.CSSProperties,
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
      swiped.current = false;
    },
    onPointerUp: (e: React.PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
      swiped.current = true;
      if (dx < 0) onNext();
      else onPrev();
    },
    onPointerCancel: () => {
      start.current = null;
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (swiped.current) {
        e.preventDefault();
        e.stopPropagation();
        swiped.current = false;
      }
    },
  };
}
