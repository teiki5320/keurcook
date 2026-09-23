import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { SORT_OPTIONS, type CatalogFilters } from "@/lib/catalog-utils";
import { withBasePath } from "@/lib/paths";
import type { Category } from "@/lib/types";
import { AutoSubmitSelect } from "./AutoSubmitSelect";

interface Props {
  action: string;
  filters: CatalogFilters;
  categories: Category[];
  regions: string[];
  /** Masque le choix de catégorie (pages catégorie). */
  lockedCategory?: boolean;
}

/**
 * Filtres en simple formulaire GET : fonctionnent sans JavaScript et
 * produisent des URL partageables / indexables.
 */
export function Filters({ action, filters, categories, regions, lockedCategory }: Props) {
  const showCbdFilters = !filters.kind || filters.kind === "cbd";
  return (
    <form action={withBasePath(action)} method="get" className="space-y-5 text-sm">
      {filters.q && <input type="hidden" name="q" value={filters.q} />}
      {filters.sort && <input type="hidden" name="tri" value={filters.sort} />}

      {!lockedCategory && (
        <>
          <div>
            <label htmlFor="f-type" className="label">Univers</label>
            <select id="f-type" name="type" defaultValue={filters.kind ?? ""} className="input">
              <option value="">Tout</option>
              <option value="cbd">Produits CBD</option>
              <option value="accessoire">Accessoires</option>
            </select>
          </div>
          <div>
            <label htmlFor="f-cat" className="label">Catégorie</label>
            <select id="f-cat" name="categorie" defaultValue={filters.category ?? ""} className="input">
              <option value="">Toutes</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {showCbdFilters && regions.length > 0 && (
        <div>
          <label htmlFor="f-region" className="label">Région d&apos;origine</label>
          <select id="f-region" name="region" defaultValue={filters.region ?? ""} className="input">
            <option value="">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}

      <fieldset>
        <legend className="label">Prix (€)</legend>
        <div className="flex items-center gap-2">
          <input name="prixMin" type="number" min={0} inputMode="numeric" placeholder="Min" defaultValue={filters.minPrice ?? ""} className="input" aria-label="Prix minimum" />
          <span className="text-muted">–</span>
          <input name="prixMax" type="number" min={0} inputMode="numeric" placeholder="Max" defaultValue={filters.maxPrice ?? ""} className="input" aria-label="Prix maximum" />
        </div>
      </fieldset>

      {showCbdFilters && (
        <div>
          <label htmlFor="f-cbd" className="label">Taux de CBD minimum</label>
          <select id="f-cbd" name="cbdMin" defaultValue={filters.minCbd?.toString() ?? ""} className="input">
            <option value="">Indifférent</option>
            {[5, 10, 15, 20, 25].map((v) => (
              <option key={v} value={v}>
                {v} % et plus
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" name="dispo" value="1" defaultChecked={filters.inStock} className="h-4 w-4 accent-forest-700" />
        En stock uniquement
      </label>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1">
          Filtrer
        </button>
        <Link href={action} className="btn-secondary">
          Réinitialiser
        </Link>
      </div>
    </form>
  );
}

export function FiltersPanel(props: Props) {
  return (
    <>
      <details className="card mb-5 p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-forest-800">
          <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filtres
        </summary>
        <div className="mt-4">
          <Filters {...props} />
        </div>
      </details>
      <aside className="hidden lg:block">
        <div className="card sticky top-36 p-5">
          <p className="mb-4 flex items-center gap-2 font-semibold text-forest-800">
            <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filtres
          </p>
          <Filters {...props} />
        </div>
      </aside>
    </>
  );
}

export function SortSelect({ current, params }: { current?: string; params: Record<string, string> }) {
  return (
    <form method="get" className="flex items-center gap-2 text-sm">
      {Object.entries(params)
        .filter(([k]) => k !== "tri")
        .map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
      <label htmlFor="sort" className="text-muted">Trier</label>
      <AutoSubmitSelect id="sort" name="tri" defaultValue={current ?? "featured"} className="input w-auto py-2">
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </AutoSubmitSelect>
      <noscript>
        <button type="submit" className="btn-secondary py-2">OK</button>
      </noscript>
    </form>
  );
}
