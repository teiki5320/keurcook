"use client";

import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import type { MiniProduct } from "./mini";

export function useAddMini() {
  const { add } = useCart();
  return (p: MiniProduct) =>
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
}

export function priceLabel(p: MiniProduct) {
  return (p.fromPrice ? "dès " : "") + formatPrice(p.variant.priceCents).replace(",00", "");
}

export const anton: React.CSSProperties = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 };
