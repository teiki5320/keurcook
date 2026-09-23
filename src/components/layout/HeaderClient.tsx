"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";

function SearchFormInner({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  return (
    <form
      role="search"
      className="relative w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/boutique?q=${encodeURIComponent(q.trim())}` : "/boutique");
        onDone?.();
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Rechercher un produit
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher une fleur, une huile, un grinder…"
        className="input rounded-full pl-10"
      />
      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
    </form>
  );
}

export function SearchForm(props: { onDone?: () => void }) {
  return (
    <Suspense fallback={<div className="h-10 w-full max-w-md" />}>
      <SearchFormInner {...props} />
    </Suspense>
  );
}

export function HeaderActions() {
  const { count, ready } = useCart();
  return (
    <div className="ml-auto flex items-center gap-1 md:ml-0">
      <Link
        href="/panier"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-forest-800 hover:bg-sage-100"
        aria-label={`Panier (${count} article${count > 1 ? "s" : ""})`}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden />
        {ready && count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-bold text-white">
            {count}
          </span>
        )}
      </Link>
    </div>
  );
}

type NavItem = { href: string; label: string };

export function MobileMenu({ nav, accessories }: { nav: NavItem[]; accessories: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu à chaque navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest-800 hover:bg-sage-100 lg:hidden"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-forest-900/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-cream p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xl text-forest-800">Menu</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage-100"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <SearchForm onDone={() => setOpen(false)} />
            <p className="mt-6 text-xs font-semibold tracking-wider text-muted uppercase">CBD</p>
            <ul className="mt-2 divide-y divide-sage-200">
              <li>
                <Link href="/boutique" className="block py-3 font-medium">
                  Toute la boutique
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold tracking-wider text-muted uppercase">Accessoires</p>
            <ul className="mt-2 divide-y divide-sage-200">
              {accessories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-8 text-xs text-muted">Interdit aux mineurs · THC ≤ 0,3 %</p>
          </div>
        </div>
      )}
    </>
  );
}
