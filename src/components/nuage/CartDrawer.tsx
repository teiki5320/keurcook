"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { TLink } from "./PageTransition";
import { CART_ADDED_EVENT } from "./shared";

/** Mini-panier latéral qui s'ouvre après chaque ajout au panier. */
export function CartDrawer() {
  const { lines, subtotalCents, setQuantity } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = added !== null;
  const close = () => setAdded(null);

  useEffect(() => {
    const onAdded = (e: Event) => setAdded(String((e as CustomEvent<string>).detail ?? ""));
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => window.removeEventListener(CART_ADDED_EVENT, onAdded);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAdded(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={close} className={`absolute inset-0 bg-black/55 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        inert={!open}
        className={`absolute top-0 right-0 flex h-full w-[min(100%,400px)] flex-col border-l border-[#fbeee2]/10 bg-[#1a0e08] text-[#fbeee2] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start gap-3 border-b border-[#fbeee2]/10 p-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff7a3d] text-[#140a07]">
            <Check className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1" role="status">
            <p className="font-semibold">Ajouté au panier</p>
            <p className="truncate text-sm text-[#fbeee2]/65">{added}</p>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Fermer le panier" className="rounded-full p-1.5 hover:bg-[#fbeee2]/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex-1 divide-y divide-[#fbeee2]/10 overflow-y-auto px-5">
          {lines.map((l) => (
            <li key={l.variantId} className="flex gap-3 py-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sage-100">
                <ProductImage src={l.image} alt="" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{l.name}</p>
                <p className="text-xs text-[#fbeee2]/60">{l.variantLabel}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-[#fbeee2]/20">
                    <button type="button" onClick={() => setQuantity(l.variantId, l.quantity - 1)} aria-label={`Retirer un ${l.name}`} className="p-1.5">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm">{l.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(l.variantId, l.quantity + 1)}
                      disabled={l.quantity >= l.maxStock}
                      aria-label={`Ajouter un ${l.name}`}
                      className="p-1.5 disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(l.priceCents * l.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
          {lines.length === 0 && <li className="py-8 text-center text-sm text-[#fbeee2]/60">Votre panier est vide.</li>}
        </ul>

        <div className="space-y-3 border-t border-[#fbeee2]/10 p-5">
          <p className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span className="font-bold">{formatPrice(subtotalCents)}</span>
          </p>
          <TLink href="/panier" label="Panier" onClick={close} className="btn-primary w-full py-3">
            Voir le panier
          </TLink>
          <button type="button" onClick={close} className="w-full rounded-full border border-[#fbeee2]/20 py-2.5 text-sm hover:border-[#ff7a3d]">
            Continuer mes achats
          </button>
        </div>
      </aside>
    </div>
  );
}
