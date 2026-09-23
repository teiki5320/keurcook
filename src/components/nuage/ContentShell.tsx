"use client";

import { usePathname } from "next/navigation";
import { isImmersive } from "./immersive";

/**
 * Les pages non immersives (catégories, fiche produit, panier, commande, pages
 * légales) gardent leur structure ; le thème sombre leur est appliqué via nuage.css.
 */
export function ContentShell({ children }: { children: React.ReactNode }) {
  if (isImmersive(usePathname())) return <>{children}</>;
  return <div className="relative pt-32 pb-10">{children}</div>;
}
