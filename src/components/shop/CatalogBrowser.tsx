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
  showHeading?: boolean;
}

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

function CatalogView({ products, categories, action, lockedCategory, showHeading, params }: Props & { params: URLSearchParams }) {
  const parsed = filtersFromSearchParams(params);
  const filters = lockedCategory ? { ...parsed, category: lockedCategory.slug, kind: lockedCategory.kind } : parsed;
  const scope = lockedCategory ? products.filter((p) => p.category.slug === lockedCategory.slug) : products;
  const results = filterProducts(products, filters);
  const regions = listRegions(scope);
  const visibleCategories = filters.kind ? categories.filter((c) => c.kind === filters.kind) : categories;
  const rawParams = Object.fromEntries(params.entries());

  const heading = filters.q
    ? "Résultats de recherche"
    : filters.kind === "accessoire"
      ? "Accessoires"
      : filters.kind === "cbd"
        ? "Produits CBD"
        : "Toute la boutique";

  return (
    <>
      {showHeading && <h1 className="mb-8 font-display text-4xl text-forest-900">{heading}</h1>}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltersPanel
          key={params.toString()}
          action={action}
          filters={filters}
          categories={visibleCategories}
          regions={regions}
          lockedCategory={Boolean(lockedCategory)}
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
              <Link href={action} className="btn-secondary mt-5">
                Réinitialiser les filtres
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
