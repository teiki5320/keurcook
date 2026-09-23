"use client";

import { usePathname } from "next/navigation";

/** Pages « immersives » : elles gèrent elles-mêmes leur espacement sous l'en-tête. */
const IMMERSIVE = ["/", "/boutique"];

/**
 * Les autres pages (catégories, fiche produit, panier, commande, pages légales)
 * gardent leur structure ; le thème sombre leur est appliqué via nuage.css.
 */
export function ContentShell({ children }: { children: React.ReactNode }) {
  const raw = usePathname() || "/";
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, "") : raw; // GitHub Pages : trailingSlash
  if (IMMERSIVE.includes(pathname)) return <>{children}</>;
  return <div className="relative pt-24 pb-10">{children}</div>;
}
