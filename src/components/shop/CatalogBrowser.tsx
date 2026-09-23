"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/ProductCard";
import { filterProducts, filtersFromSearchParams, listRegions } from "@/lib/catalog-utils";
import type { Category, CategoryKind, ProductWithCategory } from "@/lib/types";
import { FiltersPanel, SortSelect } from "./Filters";

interface Props {
  products: ProductWithCategory[];
  categories: Category[];
  action: string;
  lockedCategory?: { slug: string; kind: CategoryKind };
  hideCategoryFilters?: boolean;
  defaultQuery?: Record<string, string>;
}

const pick = (p: URLSearchParams, keys: string[]) =>
  Object.fromEntries(keys.filter((k) => p.get(k)).map((k) => [k, p.get(k)!]));

export function CatalogBrowser(props: Props) {
  // Avant lecture des paramètres d'URL (rendu statique), on affiche tout le catalogue.
  return (
    <Suspense fallback={<CatalogView {...props} params={new URLSearchParams()} />}>
      <CatalogWithParams {...props} />
    </Suspense>
  );
}

function CatalogWithParams(props: Props) {
  const params = useSearchParams();
  return <CatalogView {...props} params={new URLSearchParams(params.toString())} />;
}

/** Applique le filtre par défaut si l'URL ne désigne ni catégorie, ni type, ni recherche. */
function withDefaults(params: URLSearchParams, defaults?: Record<string, string>) {
  if (!defaults || ["categorie", "type", "q"].some((k) => params.has(k))) return params;
  const merged = new URLSearchParams(params);
  Object.entries(defaults).forEach(([k, v]) => merged.set(k, v));
  return merged;
}

function CatalogView({ products, categories, action, lockedCategory, hideCategoryFilters, defaultQuery, params: urlParams }: Props & { params: URLSearchParams }) {
  const params = withDefaults(urlParams, defaultQuery);
  const keep = hideCategoryFilters ? pick(params, ["categorie", "type"]) : {};
  const resetHref = Object.keys(keep).length ? `${action}?${new URLSearchParams(keep).toString()}` : action;
  const parsed = filtersFromSearchParams(params);
  const filters = lockedCategory ? { ...parsed, category: lockedCategory.slug, kind: lockedCategory.kind } : parsed;
  const scope = lockedCategory ? products.filter((p) => p.category.slug === lockedCategory.slug) : products;
  const results = filterProducts(products, filters);
  const regions = listRegions(scope);
  const visibleCategories = filters.kind ? categories.filter((c) => c.kind === filters.kind) : categories;
  const rawParams = Object.fromEntries(params.entries());


  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltersPanel
          key={params.toString()}
          action={action}
          filters={filters}
          categories={visibleCategories}
          regions={regions}
          lockedCategory={Boolean(lockedCategory) || hideCategoryFilters}
          hiddenParams={hideCategoryFilters ? keep : undefined}
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
            <SortSelect key={params.toString()} current={filters.sort} params={rawParams} />
          </div>
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="card p-10 text-center">
              <p className="font-display text-xl text-forest-900">Aucun produit ne correspond à votre recherche.</p>
              <p className="mt-2 text-sm text-muted">Essayez d&apos;élargir vos filtres.</p>
              <Link href={resetHref} className="btn-secondary mt-5">
                Réinitialiser les filtres
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
