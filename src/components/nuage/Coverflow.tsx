"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";
import { usePageTransition } from "./PageTransition";
import { anton, useSwipe } from "./shared";

export interface CoverflowItem {
  key: string;
  title: string;
  /** Petite ligne au-dessus du titre (région, nombre de produits…). */
  eyebrow?: string;
  image: string | null;
  href: string;
  /** Silhouette du nuage 3D quand la carte est au centre (0 feuille, 1 résine, 2 goutte, 3 anneau). */
  cloudMix?: number;
}

/**
 * Carrousel de cartes : carte centrale en avant, voisines visibles sur les côtés.
 * Glisser (doigt ou souris), flèches du clavier ou toucher une voisine pour changer de carte ;
 * toucher la carte centrale ouvre son lien.
 */
export function Coverflow({
  items,
  cloud = false,
  hint,
  hintMouse,
  onActiveChange,
  onOpen,
  activeIndex,
}: {
  items: CoverflowItem[];
  cloud?: boolean;
  /** Aide affichée sur écran tactile… */
  hint?: string;
  /** … et avec une souris / un pavé tactile. */
  hintMouse?: string;
  /** Appelé quand la carte centrale change (index). */
  onActiveChange?: (index: number) => void;
  /** Remplace l'ouverture du lien quand on touche la carte centrale. */
  onOpen?: (item: CoverflowItem) => void;
  /** Carte centrale imposée de l'extérieur (mode contrôlé, ex. suivie dans l'URL). */
  activeIndex?: number;
}) {
  const n = items.length;
  const [inner, setInner] = useState(0);
  const active = activeIndex ?? inner;
  const setActive = (i: number) => {
    if (i === active) return;
    if (activeIndex === undefined) setInner(i);
    onActiveChange?.(i);
  };
  const navigate = usePageTransition();
  const loop = n >= 3;

  const go = (d: number) => setActive(loop ? (((active + d) % n) + n) % n : Math.min(n - 1, Math.max(0, active + d)));
  const swipe = useSwipe(() => go(1), () => go(-1));
  const router = useRouter();
  const open = (it: CoverflowItem) => (onOpen ? onOpen(it) : navigate ? navigate(it.href, it.title) : router.push(it.href));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.altKey || e.ctrlKey || e.metaKey || t?.closest("input, select, textarea, [contenteditable='true']")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (n === 0) return null;
  const cur = items[active];

  return (
    <div>
      <div
        {...swipe}
        onDragStart={(e) => e.preventDefault()}
        className="relative cursor-grab overflow-hidden select-none [perspective:1600px] active:cursor-grabbing"
        style={{ ...swipe.style, height: "clamp(380px,56vh,500px)" }}
      >
        {cloud && (
          <div
            data-cloud=""
            data-mix={cur.cloudMix ?? 3}
            data-shape={(cur.cloudMix ?? 3) === 3 ? "ring" : undefined}
            aria-hidden
            className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
            style={{ width: (cur.cloudMix ?? 3) === 3 ? "min(640px,92vw)" : undefined, height: (cur.cloudMix ?? 3) === 3 ? undefined : "92%" }}
          />
        )}
        {items.map((it, i) => {
          let o = i - active;
          if (loop) {
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
          }
          const ao = Math.abs(o);
          const isActive = o === 0;
          return (
            <div
              key={it.key}
              onClick={() => (isActive ? open(it) : setActive(i))}
              role={isActive ? "link" : "button"}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={ao > 1}
              aria-label={isActive ? `Ouvrir ${it.title}` : `Afficher ${it.title}`}
              onKeyDown={(e) => {
                if (isActive && e.key === "Enter") open(it);
              }}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                width: "min(270px,66vw)",
                aspectRatio: "3 / 4.2",
                transform: `translate(-50%,-50%) translateX(${o * 64}%) translateZ(${-ao * 240}px) rotateY(${-o * 26}deg)`,
                opacity: ao > 2 ? 0 : ao === 0 ? 1 : ao === 1 ? 0.6 : 0.25,
                zIndex: 10 - ao,
                pointerEvents: ao > 1 ? "none" : "auto",
                transition: "transform .8s cubic-bezier(.16,1,.3,1), opacity .5s",
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[26px] bg-[#281610] shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]"
                style={{ border: `1px solid ${isActive ? "#ff7a3d" : "rgba(251,238,226,.12)"}` }}
              >
                {it.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={withBasePath(it.image)} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#140a07]/95 p-5 pt-20">
                  {it.eyebrow && <div className="mb-1 text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">{it.eyebrow}</div>}
                  <div className="text-3xl leading-none uppercase" style={anton}>{it.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Cartes">
          {items.map((it, i) => (
            <button
              key={it.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={it.title}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-md transition-[width] duration-300"
              style={{ width: i === active ? 32 : 10, background: i === active ? "#ff7a3d" : "rgba(251,238,226,.25)" }}
            />
          ))}
        </div>
      )}
      <p className="mt-3 text-center text-xs text-[#fbeee2]/45">
        <span className="pointer-fine:hidden">{hint ?? "Glissez pour parcourir · touchez la carte pour l'ouvrir"}</span>
        <span className="hidden pointer-fine:inline">
          {hintMouse ?? "Cliquez sur une carte voisine ou glissez pour parcourir · cliquez la carte centrale pour l'ouvrir"}
        </span>
      </p>
    </div>
  );
}
