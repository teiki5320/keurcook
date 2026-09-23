"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const CONSENT_COOKIE = "ah_consent";
export const OPEN_CONSENT_EVENT = "alohash:open-cookie-settings";

interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
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

function writeConsent(c: Omit<Consent, "necessary" | "date">) {
  const value: Consent = { necessary: true, ...c, date: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // Durée de conservation du choix : 6 mois (recommandation CNIL).
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${60 * 60 * 24 * 182}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("alohash:consent", { detail: value }));
}

/** Bouton à placer n'importe où (pied de page) pour rouvrir les préférences. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Gérer les cookies
    </button>
  );
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    // Lecture du cookie de consentement après montage uniquement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!existing) setOpen(true);
    const reopen = () => {
      const c = readConsent();
      setAnalytics(Boolean(c?.analytics));
      setMarketing(Boolean(c?.marketing));
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const save = (a: boolean, m: boolean) => {
    writeConsent({ analytics: a, marketing: m });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="nuage-theme fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-sage-300 bg-white p-5 shadow-xl" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <p className="font-semibold text-forest-800">Votre vie privée</p>
        <p className="mt-1.5 text-sm text-muted">
          Nous utilisons des cookies strictement nécessaires au fonctionnement du site (panier, vérification d&apos;âge,
          session). Avec votre accord, nous pourrions utiliser des cookies de mesure d&apos;audience et marketing. Vous
          pouvez modifier votre choix à tout moment. <Link href="/confidentialite#cookies" className="underline">En savoir plus</Link>
        </p>

        {custom && (
          <div className="mt-4 space-y-3 rounded-xl bg-sage-50 p-4 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1 accent-[#ff7a3d]" />
              <span>
                <strong>Nécessaires</strong> — toujours actifs : panier, vérification d&apos;âge, choix cookies, connexion admin.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 accent-[#ff7a3d]" />
              <span>
                <strong>Mesure d&apos;audience</strong> — statistiques de fréquentation anonymisées.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 accent-[#ff7a3d]" />
              <span>
                <strong>Marketing</strong> — personnalisation des offres.
              </span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {custom ? (
            <button type="button" className="btn-primary" onClick={() => save(analytics, marketing)}>
              Enregistrer mes choix
            </button>
          ) : (
            <button type="button" className="btn-secondary" onClick={() => setCustom(true)}>
              Personnaliser
            </button>
          )}
          <button type="button" className="btn-secondary" onClick={() => save(false, false)}>
            Tout refuser
          </button>
          <button type="button" className="btn-primary" onClick={() => save(true, true)}>
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
