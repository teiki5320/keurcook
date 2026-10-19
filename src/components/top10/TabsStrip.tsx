"use client";

import { useEffect, useRef } from "react";

/** Bande d'onglets qui défile seule sur téléphone ; l'onglet actif est ramené dans le champ à l'ouverture. */
export function TabsStrip({ children }: { children: React.ReactNode }) {
  const strip = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = strip.current;
    const active = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!el || !active) return;
    el.scrollLeft = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
  }, []);

  return (
    <nav ref={strip} aria-label="Sujets du top 10" className="relative -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      {children}
    </nav>
  );
}
