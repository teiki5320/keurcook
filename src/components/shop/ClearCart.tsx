"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/cart-context";

/** Vide le panier une seule fois par commande (pas lors d'une visite ultérieure depuis l'email). */
export function ClearCart({ orderNumber }: { orderNumber: string }) {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (!ready) return;
    const key = `alohash-cleared-${orderNumber}`;
    try {
      if (window.localStorage.getItem(key)) return;
      window.localStorage.setItem(key, "1");
    } catch {
      /* stockage indisponible */
    }
    clear();
  }, [ready, clear, orderNumber]);
  return null;
}
