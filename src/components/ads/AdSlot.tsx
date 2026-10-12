"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Emplacement publicitaire AdSense, toujours titré « Publicité » pour ne pas être confondu
 * avec le contenu ni avec les liens Amazon. Invisible tant qu'aucune annonce n'est servie.
 */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const ins = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Une seule demande d'annonce par emplacement (le mode strict de React rejoue les effets).
    if (!slot || !ins.current || ins.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Script bloqué (bloqueur de publicité, refus) : l'emplacement reste vide.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside aria-label="Publicité" className={`ad-slot print:hidden ${className}`}>
      <p className="ad-label">Publicité</p>
      <ins
        ref={ins}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
