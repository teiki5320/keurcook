"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { TLink } from "./PageTransition";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/categorie/fleurs", label: "Fleurs" },
  { href: "/categorie/huiles", label: "Huiles" },
];

export function NuageHeader({ notice }: { notice?: string | null }) {
  const raw = usePathname() || "/";
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;
  const { count, ready } = useCart();
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {notice && <div className="bg-[#ffc46b] px-4 py-1 text-center text-xs text-[#140a07]">{notice}</div>}
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-[clamp(20px,4vw,56px)] py-5">
        <TLink href="/" label="Alohash." className="text-[26px] tracking-[.02em] text-[#fbeee2]" style={{ fontFamily: "var(--font-anton), sans-serif" }}>
          ALOHASH<span className="text-[#ff7a3d]">.</span>
        </TLink>
        <nav aria-label="Navigation principale" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#fbeee2]/10 bg-[#fbeee2]/6 p-[5px] backdrop-blur-md">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <TLink
                key={item.href}
                href={item.href}
                label={item.label}
                aria-current={active ? "page" : undefined}
                className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition"
                style={active ? { background: "#fbeee2", color: "#140a07" } : { color: "#fbeee2" }}
              >
                {item.label}
              </TLink>
            );
          })}
        </nav>
        <TLink href="/panier" label="Panier" className="flex items-center gap-2 text-sm font-semibold text-[#fbeee2]" aria-label={`Panier (${count} article${count > 1 ? "s" : ""})`}>
          Panier
          <span className="inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full bg-[#ff7a3d] px-1.5 text-[#140a07]">{ready ? count : 0}</span>
        </TLink>
      </div>
    </header>
  );
}
