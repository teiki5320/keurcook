"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { normalizePath } from "./immersive";
import { TLink } from "./PageTransition";

export interface NavItem {
  href: string;
  label: string;
}

const anton = { fontFamily: "var(--font-anton), sans-serif" } as const;

function SearchBox({ onDone, autoFocus }: { onDone?: () => void; autoFocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        router.push(term ? `/boutique?q=${encodeURIComponent(term)}` : "/boutique");
        onDone?.();
      }}
    >
      <label htmlFor={autoFocus ? "search-top" : "search-menu"} className="sr-only">
        Rechercher un produit
      </label>
      <input
        id={autoFocus ? "search-top" : "search-menu"}
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher une fleur, une huile, un grinder…"
        className="w-full rounded-full border border-[#fbeee2]/15 bg-[#140a07]/80 py-3 pr-4 pl-11 text-sm text-[#fbeee2] placeholder:text-[#fbeee2]/45 focus:border-[#ff7a3d] focus:outline-none"
      />
      <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#fbeee2]/50" aria-hidden />
    </form>
  );
}

export function NuageHeader({ nav }: { nav: NavItem[] }) {
  const pathname = normalizePath(usePathname());
  const { count, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Ferme menu et recherche à chaque changement de page.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]) && !href.includes("?"));

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#fbeee2]/8 bg-[#140a07]/85 backdrop-blur-md">

      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-[clamp(16px,4vw,56px)] py-3">
        <TLink href="/" label="Alohash." className="shrink-0 text-[26px] tracking-[.02em] text-[#fbeee2]" style={anton}>
          ALOHASH<span className="text-[#ff7a3d]">.</span>
        </TLink>

        <nav aria-label="Navigation principale" className="hidden gap-1 rounded-full border border-[#fbeee2]/10 bg-[#fbeee2]/6 p-[5px] backdrop-blur-md lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <TLink
                key={item.href}
                href={item.href}
                label={item.label}
                aria-current={active ? "page" : undefined}
                className="rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition"
                style={active ? { background: "#fbeee2", color: "#140a07" } : { color: "#fbeee2" }}
              >
                {item.label}
              </TLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Rechercher"
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#fbeee2] hover:bg-[#fbeee2]/10"
          >
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <TLink
            href="/panier"
            label="Panier"
            className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-[#fbeee2]"
            aria-label={`Panier (${count} article${count > 1 ? "s" : ""})`}
          >
            <span className="hidden sm:inline">Panier</span>
            <span className="inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full bg-[#ff7a3d] px-1.5 text-[#140a07]">{ready ? count : 0}</span>
          </TLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#fbeee2] hover:bg-[#fbeee2]/10 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="mx-auto max-w-xl px-4 pb-3">
          <SearchBox autoFocus onDone={() => setSearchOpen(false)} />
        </div>
      )}

    </header>
      {/* Hors de <header> : son flou d'arrière-plan enfermerait le menu dans l'en-tête. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#140a07]/97 backdrop-blur-md lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[26px] text-[#fbeee2]" style={anton}>
              MENU<span className="text-[#ff7a3d]">.</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#fbeee2] hover:bg-[#fbeee2]/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="px-5">
            <SearchBox onDone={() => setMenuOpen(false)} />
          </div>
          <nav aria-label="Menu mobile" className="mt-4 px-5 pb-10">
            <ul className="divide-y divide-[#fbeee2]/10">
              {nav.map((item) => (
                <li key={item.href}>
                  <TLink
                    href={item.href}
                    label={item.label}
                    className={`block py-4 text-3xl uppercase ${isActive(item.href) ? "text-[#ff7a3d]" : "text-[#fbeee2]"}`}
                    style={anton}
                  >
                    {item.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
