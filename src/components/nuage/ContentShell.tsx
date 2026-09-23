"use client";

import { usePathname } from "next/navigation";

/** Pages « immersives » affichées directement sur le fond sombre. */
const IMMERSIVE = ["/", "/boutique"];

/**
 * Les autres pages (fiche produit, panier, commande, pages légales…) gardent
 * leur mise en page d'origine, posées sur une feuille claire au-dessus du nuage.
 */
export function ContentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (IMMERSIVE.includes(pathname)) return <>{children}</>;
  return (
    <div className="relative mx-3 mt-24 mb-10 overflow-hidden rounded-[32px] bg-cream text-ink shadow-[0_40px_120px_-40px_rgba(0,0,0,.8)] sm:mx-6 xl:mx-auto xl:max-w-[1280px]">
      {children}
    </div>
  );
}
