import { mapPercent } from "@/components/nuage/africa-map";

export interface MapCountry {
  code: string;
  slug: string;
  name: string;
  lon: number;
  lat: number;
  count: number;
}

/**
 * Carte de l'Afrique en particules : le nuage 3D se pose sur cette ancre
 * (data-mix="0", immobile) ; chaque pays ayant des recettes est marqué d'un point lumineux.
 * Les points sont décoratifs : on choisit un pays dans le carrousel des pays.
 */
export function CountryMap({ countries, className = "" }: { countries: MapCountry[]; className?: string }) {
  return (
    <div data-cloud="" data-mix="0" data-still="" aria-hidden className={`relative aspect-square w-full ${className}`}>
      {countries.map((c) => {
        const { left, top } = mapPercent(c.lon, c.lat);
        return (
          <span
            key={c.code}
            className="pointer-events-none absolute z-[3] block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc46b] shadow-[0_0_0_4px_rgba(255,122,61,.35)]"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#ff7a3d]/60" />
          </span>
        );
      })}
    </div>
  );
}
