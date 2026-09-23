"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export const AGE_COOKIE = "ah_age";

/**
 * Script injecté dans <head> : masque la vérification avant le premier
 * affichage si le visiteur l'a déjà validée (pas de clignotement).
 */
export const ageGateScript = `try{if(document.cookie.split('; ').indexOf('${AGE_COOKIE}=1')!==-1){document.documentElement.dataset.age='ok'}}catch(e){}`;

export function AgeGate({ siteName }: { siteName: string }) {
  const [refused, setRefused] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Une fois la majorité confirmée, on retire complètement la fenêtre du DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (document.documentElement.dataset.age === "ok") setVerified(true);
  }, []);

  if (verified) return null;

  function confirm() {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${AGE_COOKIE}=1; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax${secure}`;
    document.documentElement.dataset.age = "ok";
    setVerified(true);
  }

  return (
    <div
      id="age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/85 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-3xl bg-cream p-7 text-center shadow-2xl sm:p-9">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-700 text-cream">
          <Leaf className="h-7 w-7" aria-hidden />
        </div>
        <p className="font-display text-2xl text-forest-800">{siteName}</p>
        {refused ? (
          <>
            <h2 id="age-gate-title" className="mt-4 text-lg font-semibold">Accès refusé</h2>
            <p className="mt-2 text-sm text-muted">
              Ce site et ses produits sont strictement réservés aux personnes majeures. Revenez nous voir à vos 18 ans.
            </p>
            <a href="https://www.google.fr" className="btn-secondary mt-6 w-full">
              Quitter le site
            </a>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="mt-4 text-lg font-semibold">
              Avez-vous 18 ans ou plus ?
            </h2>
            <p className="mt-2 text-sm text-muted">
              La vente de produits à base de CBD est <strong>interdite aux mineurs</strong>. Vous devez être majeur pour
              accéder à ce site.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={confirm} className="btn-primary w-full">
                Oui, j&apos;ai 18 ans ou plus
              </button>
              <button type="button" onClick={() => setRefused(true)} className="btn-secondary w-full">
                Non, j&apos;ai moins de 18 ans
              </button>
            </div>
            <p className="mt-5 text-xs text-muted">
              Nos produits contiennent un taux de THC inférieur ou égal à 0,3 %, conformément à la réglementation
              française. Ils ne sont pas des médicaments.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
