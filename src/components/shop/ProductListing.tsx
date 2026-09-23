import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductCard";
import { filterProducts, getCatalog, listRegions, type CatalogFilters } from "@/lib/data/catalog";
import { FiltersPanel, SortSelect } from "./Filters";

/** Liste de produits filtrable, partagée par /boutique et /categorie/[slug]. */
export async function ProductListing({
  action,
  filters,
  rawParams,
  lockedCategory,
}: {
  action: string;
  filters: CatalogFilters;
  rawParams: Record<string, string>;
  lockedCategory?: boolean;
}) {
  const { products, categories } = await getCatalog();
  const scope = lockedCategory ? products.filter((p) => p.category.slug === filters.category) : products;
  const results = filterProducts(products, filters);
  const regions = listRegions(scope);
  const visibleCategories = filters.kind ? categories.filter((c) => c.kind === filters.kind) : categories;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <FiltersPanel
        action={action}
        filters={filters}
        categories={visibleCategories}
        regions={regions}
        lockedCategory={lockedCategory}
      />
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            {results.length} produit{results.length > 1 ? "s" : ""}
            {filters.q && (
              <>
                {" "}pour « <strong className="text-ink">{filters.q}</strong> »
              </>
            )}
          </p>
          <SortSelect current={filters.sort} params={rawParams} />
        </div>
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="card p-10 text-center">
            <p className="font-display text-xl text-forest-900">Aucun produit ne correspond à votre recherche.</p>
            <p className="mt-2 text-sm text-muted">Essayez d&apos;élargir vos filtres.</p>
            <Link href={action} className="btn-secondary mt-5">
              Réinitialiser les filtres
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function flattenParams(sp: Record<string, string | string[] | undefined>) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    const s = Array.isArray(v) ? v[0] : v;
    if (s) out[k] = s;
  }
  return out;
}
