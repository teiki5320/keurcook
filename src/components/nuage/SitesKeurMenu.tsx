"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Les autres sites de la maison TOA KEUR (le site courant, Keur Cook, est retiré).
const SITES_KEUR = [
  { nom: "Keurbook", detail: "les livres d'auteurs africains", href: "https://keurbook.com/" },
  { nom: "Keur Déco", detail: "la déco africaine", href: "https://keurdeco.com/" },
  { nom: "Keurfoot", detail: "le foot africain", href: "https://keurfoot.com/" },
  { nom: "Keur Kado", detail: "les cadeaux africains", href: "https://keurkado.com/" },
  { nom: "Keur Bible", detail: "les objets chrétiens et l'art chrétien afro", href: "https://keurbible.com/" },
] as const;

const anton = { fontFamily: "var(--font-anton), sans-serif" } as const;

/**
 * Menu déroulant « Les sites Keur ».
 * - variante « bureau » : bouton dans l'en-tête, liste en panneau flottant ;
 * - variante « mobile » : bouton pleine largeur dans le menu mobile, liste dépliée en dessous.
 */
export function SitesKeurMenu({ variant }: { variant: "bureau" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const racine = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);
  const panneauId = useId();
  const mobile = variant === "mobile";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (racine.current && !racine.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        bouton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Sortie du menu au clavier (Tab) : on referme.
  const onBlur = (e: React.FocusEvent) => {
    if (racine.current && !racine.current.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  const lien = "block px-4 py-2.5 text-sm text-[#fbeee2] hover:bg-[#fbeee2]/10 focus-visible:bg-[#fbeee2]/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ff7a3d]";

  return (
    <div ref={racine} onBlur={onBlur} className={mobile ? "mt-2" : "relative hidden lg:block"}>
      <button
        ref={bouton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panneauId}
        className={
          mobile
            ? "flex w-full items-center justify-between py-4 text-left text-3xl text-[#fbeee2] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a3d]"
            : "flex items-center gap-1.5 rounded-full border border-[#fbeee2]/10 px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-[#fbeee2] hover:bg-[#fbeee2]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a3d]"
        }
        style={mobile ? anton : undefined}
      >
        Les sites Keur
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <div
        id={panneauId}
        hidden={!open}
        className={
          mobile
            ? "pb-2"
            : "absolute right-0 top-full z-[70] mt-2 w-72 overflow-hidden rounded-2xl border border-[#fbeee2]/15 bg-[#140a07] py-2 shadow-xl"
        }
      >
        <ul>
          {SITES_KEUR.map((s) => (
            <li key={s.href}>
              <a href={s.href} className={lien} data-umami-event="Menu sites Keur" data-umami-event-site={s.nom}>
                <span className="font-semibold">{s.nom}</span>
                <span className="text-[#fbeee2]/65"> — {s.detail}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-[#fbeee2]/15 pt-1">
          <a href="https://toakeur.com/" className={lien} data-umami-event="Menu sites Keur" data-umami-event-site="toakeur.com">
            Toute la maison : <span className="font-semibold">toakeur.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
