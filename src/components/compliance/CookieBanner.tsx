"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const CONSENT_COOKIE = "ah_consent";
export const OPEN_CONSENT_EVENT = "alohash:open-cookie-settings";

interface Consent {
  necessary: true;
  date: string;
}

function readConsent(): Consent | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

function writeConsent() {
  const value: Consent = { necessary: true, date: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // Durée de conservation du choix : 6 mois (recommandation CNIL).
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${60 * 60 * 24 * 182}; Path=/; SameSite=Lax${secure}`;
}

/** Bouton à placer n'importe où (pied de page) pour rouvrir les préférences. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookies
    </button>
  );
}

/**
 * Information sur les cookies : le site ne dépose que des cookies nécessaires
 * (favoris, mémorisation de ce message, session admin), aucun cookie de mesure
 * d'audience ni publicitaire ; aucun consentement n'est donc à recueillir.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lecture du cookie après montage uniquement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies" className="nuage-theme fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-sage-300 bg-white p-5 shadow-xl sm:flex-row sm:items-center" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <p className="text-sm text-muted">
          <strong className="text-forest-800">Cookies</strong> — Ce site n&apos;utilise que des cookies nécessaires (vos
          favoris et ce message). Aucun cookie de mesure d&apos;audience ni publicitaire. Les boutons « Acheter » ouvrent
          Amazon.fr, qui dépose ses propres cookies.{" "}
          <Link href="/confidentialite#cookies" className="underline">En savoir plus</Link>
        </p>
        <button
          type="button"
          className="btn-primary shrink-0"
          onClick={() => {
            writeConsent();
            setOpen(false);
          }}
        >
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}
