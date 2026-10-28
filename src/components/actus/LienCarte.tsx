"use client";

import { TLink } from "@/components/nuage/PageTransition";
import type { LienCarte as Lien } from "@/lib/veille-articles";

/**
 * Lien du titre d'une carte d'actu, étendu à toute la carte (calque ::after) :
 * un toucher n'importe où sur la carte ouvre l'article du site, ou la source s'il n'y a pas encore d'article.
 * La carte parente doit être en « relative » ; le crédit de l'image reste cliquable au-dessus (z-10).
 */
export function LienCarte({ lien, children }: { lien: Lien; children: React.ReactNode }) {
  // Le contour de focus est dessiné par la carte (CARTE_CLIQUABLE), pas par le titre.
  const classe = "outline-none after:absolute after:inset-0 after:content-['']";
  if (lien.interne) {
    return (
      <TLink href={lien.href} className={classe}>
        {children}
      </TLink>
    );
  }
  return (
    <a href={lien.href} target="_blank" rel="noopener nofollow" className={classe}>
      {children}
      <span className="sr-only"> (article d&apos;origine, nouvel onglet)</span>
    </a>
  );
}
