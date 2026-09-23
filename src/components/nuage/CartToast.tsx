"use client";

import { useEffect, useState } from "react";
import { TLink } from "./PageTransition";
import { CART_ADDED_EVENT } from "./shared";

/** Petite confirmation « Ajouté au panier » après un ajout rapide. */
export function CartToast() {
  const [item, setItem] = useState<string | null>(null);

  useEffect(() => {
    let timer = 0;
    const onAdded = (e: Event) => {
      setItem(String((e as CustomEvent<string>).detail));
      clearTimeout(timer);
      timer = window.setTimeout(() => setItem(null), 3500);
    };
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => {
      window.removeEventListener(CART_ADDED_EVENT, onAdded);
      clearTimeout(timer);
    };
  }, []);

  if (!item) return null;
  return (
    <div role="status" className="fixed inset-x-3 bottom-4 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#ff7a3d]/50 bg-[#211209] px-4 py-3 text-sm text-[#fbeee2] shadow-2xl sm:inset-x-auto sm:right-6">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff7a3d] font-bold text-[#140a07]">✓</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">Ajouté au panier</span>
        <span className="block truncate text-[#fbeee2]/65">{item}</span>
      </span>
      <TLink href="/panier" label="Panier" className="shrink-0 rounded-full bg-[#fbeee2] px-3.5 py-2 text-xs font-bold text-[#140a07]">
        Voir
      </TLink>
    </div>
  );
}
