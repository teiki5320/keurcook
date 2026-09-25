"use client";

import { mapPercent } from "@/components/nuage/africa-map";
import { TLink } from "@/components/nuage/PageTransition";

export interface MapCountry {
  slug: string;
  name: string;
  lon: number;
  lat: number;
  count: number;
}

/**
 * Carte de l'Afrique en particules : le nuage 3D se pose sur cette ancre
 * (data-mix="0", immobile) et chaque pays ayant des recettes devient un point cliquable.
 */
export function CountryMap({ countries, className = "" }: { countries: MapCountry[]; className?: string }) {
  return (
    <div data-cloud="" data-mix="0" data-still="" className={`relative aspect-square w-full ${className}`}>
      {countries.map((c) => {
        const { left, top } = mapPercent(c.lon, c.lat);
        return (
          <TLink
            key={c.slug}
            href={`/pays/${c.slug}`}
            label={c.name}
            aria-label={`${c.name} : ${c.count} recette${c.count > 1 ? "s" : ""}`}
            className="group absolute z-[3] -translate-x-1/2 -translate-y-1/2 p-2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="relative block h-3 w-3 rounded-full bg-[#ffc46b] shadow-[0_0_0_4px_rgba(255,122,61,.35)] transition group-hover:scale-150 group-focus-visible:scale-150">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff7a3d]/60" aria-hidden />
            </span>
            <span className="pointer-events-none absolute top-1/2 left-full ml-1 -translate-y-1/2 rounded-full bg-[#140a07]/90 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-[#fbeee2] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {c.name} · {c.count}
            </span>
          </TLink>
        );
      })}
    </div>
  );
}
