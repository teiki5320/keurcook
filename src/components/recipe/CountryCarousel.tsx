"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { countryPath } from "@/components/nuage/africa-map";
import { TLink } from "@/components/nuage/PageTransition";
import { anton, useSwipe } from "@/components/nuage/shared";
import { recipeWord } from "@/lib/gamme-words";
import type { MapCountry } from "./CountryMap";

export interface CarouselCountry extends MapCountry {
  of: string;
  description: string;
}

/**
 * Carrousel des pays : au centre, le nuage de particules prend la forme du pays
 * (data-country) et se transforme d'un pays à l'autre ; les voisins sont dessinés en contour.
 */
export function CountryCarousel({ countries }: { countries: CarouselCountry[] }) {
  const n = countries.length;
  const [active, setActive] = useState(0);
  const go = (d: number) => setActive((i) => (((i + d) % n) + n) % n);
  const swipe = useSwipe(() => go(1), () => go(-1));
  if (n === 0) return null;
  const cur = countries[active];

  return (
    <div>
      <div {...swipe} className="relative select-none" style={{ ...swipe.style, height: "min(clamp(300px,52vh,480px), 86vw)" }}>
        {countries.map((c, i) => {
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const ao = Math.abs(o);
          if (ao > 2) return null;
          const isActive = o === 0;
          return (
            <div
              key={c.code}
              aria-hidden={!isActive}
              onClick={() => !isActive && setActive(i)}
              className={`absolute top-1/2 left-1/2 aspect-square ${isActive ? "" : "cursor-pointer"}`}
              style={{
                height: isActive ? "100%" : "48%",
                transform: `translate(-50%,-50%) translateX(${o * 105}%)`,
                opacity: isActive ? 1 : ao === 1 ? 0.55 : 0.2,
                transition: "transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, height .7s cubic-bezier(.16,1,.3,1)",
              }}
            >
              {/* Ancre du nuage pour le pays au centre ; contour dessiné pour les voisins. */}
              {isActive && <div data-cloud="" data-mix="0" data-still="" data-country={c.code} className="absolute inset-0" />}
              <svg viewBox="-1.85 -1.85 3.7 3.7" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <path
                  d={countryPath(c.code)}
                  fill={isActive ? "none" : "rgba(255,122,61,.08)"}
                  stroke={isActive ? "rgba(255,196,107,.18)" : "rgba(255,196,107,.7)"}
                  strokeWidth={isActive ? 0.012 : 0.03}
                  strokeDasharray={isActive ? "0.03 0.05" : undefined}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {!isActive && (
                <span className="absolute inset-x-0 -bottom-7 hidden text-center text-sm uppercase text-[#fbeee2]/80 sm:block" style={anton}>
                  {c.name}
                </span>
              )}
            </div>
          );
        })}
        <button type="button" onClick={() => go(-1)} aria-label="Pays précédent" className="absolute top-1/2 left-0 z-[4] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#fbeee2]/20 bg-[#140a07]/70 backdrop-blur hover:border-[#ff7a3d]">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Pays suivant" className="absolute top-1/2 right-0 z-[4] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#fbeee2]/20 bg-[#140a07]/70 backdrop-blur hover:border-[#ff7a3d]">
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="mt-1 text-center" aria-live="polite">
        <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">{recipeWord(cur.count)}</p>
        <h3 className="mt-1 uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,7vw,72px)" }}>
          {cur.name}
          <span className="text-[#ff7a3d]">.</span>
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[#fbeee2]/70">{cur.description}</p>
        <TLink href={`/pays/${cur.slug}`} label={cur.name} className="mt-5 inline-flex rounded-full bg-[#ff7a3d] px-7 py-3.5 font-bold text-[#140a07] transition hover:bg-[#ffc46b]">
          Les recettes {cur.of} →
        </TLink>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Pays">
        {countries.map((c, i) => (
          <button
            key={c.code}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={c.name}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-md transition-[width] duration-300"
            style={{ width: i === active ? 28 : 8, background: i === active ? "#ff7a3d" : "rgba(251,238,226,.25)" }}
          />
        ))}
      </div>
    </div>
  );
}
