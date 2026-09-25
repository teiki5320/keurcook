"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { LayoutGrid, X } from "lucide-react";
import { Coverflow } from "@/components/nuage/Coverflow";
import { anton } from "@/components/nuage/shared";
import { filterProducts, SORT_OPTIONS, type SortKey } from "@/lib/catalog-utils";
import { unitWord } from "@/lib/gamme-words";
import type { ProductWithCategory } from "@/lib/types";
import { VarietyCard } from "./VarietyCard";

export interface BoutiqueGamme {
  key: string;
  name: string;
  description: string;
  image: string | null;
  products: ProductWithCategory[];
}

interface Props {
  gammes: BoutiqueGamme[];
  allProducts: ProductWithCategory[];
}

/**
 * Boutique en une page : carrousel des gammes ; dessous, les produits de la gamme au centre.
 * `?gamme=tout` affiche tout le catalogue, `?q=` une recherche.
 */
const ALL = "tout";
const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-[#fbeee2]/20 px-4 py-2 text-sm hover:border-[#ff7a3d]";

export function BoutiqueBrowser(props: Props) {
  return (
    <Suspense fallback={<BoutiqueView {...props} gammeKey={null} query="" />}>
      <BoutiqueWithParams {...props} />
    </Suspense>
  );
}

function BoutiqueWithParams(props: Props) {
  const params = useSearchParams();
  return <BoutiqueView {...props} gammeKey={params.get("gamme")} query={params.get("q")?.trim() ?? ""} />;
}

function BoutiqueView({ gammes, allProducts, gammeKey, query }: Props & { gammeKey: string | null; query: string }) {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("featured");
  const showAll = gammeKey === ALL;
  const index = Math.max(0, gammes.findIndex((g) => g.key === gammeKey));
  const gamme = gammes[index];
  const choose = (i: number) => router.replace(`/boutique?gamme=${gammes[i].key}`, { scroll: false });

  const base = query || showAll ? allProducts : (gamme?.products ?? []);
  const list = filterProducts(base, { q: query, sort });
  const eyebrow = query ? "Recherche" : showAll ? `${list.length} produits` : unitWord(list.length);
  const title = query ? `« ${query} »` : showAll ? "Toute la boutique" : gamme?.name;

  const cards = gammes.map((g) => ({
    key: g.key,
    title: g.name,
    eyebrow: unitWord(g.products.length),
    image: g.image,
    href: `/boutique?gamme=${g.key}`,
    // Nuage en anneau : un halo autour des cartes (une silhouette serait cachée derrière).
    cloudMix: 3,
  }));

  return (
    <>
      <section className="pt-24 pb-6 sm:pt-28">
        <div className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,56px)]">
          <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
            La boutique<span className="text-[#ff7a3d]">.</span>
          </h1>
        </div>
        <div className="mt-4">
          <Coverflow
            items={cards}
            cloud
            activeIndex={index}
            onActiveChange={choose}
            onOpen={() => {
              if (showAll || query) choose(index);
              document.getElementById("varietes")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            hint="Glissez pour choisir une gamme · ses produits s'affichent dessous"
            hintMouse="Cliquez ou glissez pour choisir une gamme · ses produits s'affichent dessous"
          />
        </div>
      </section>

      <section id="varietes" aria-live="polite" className="container-page relative scroll-mt-24 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">{eyebrow}</p>
            <h2 className="mt-1 text-4xl leading-none uppercase" style={anton}>
              {title}
            </h2>
            {!query && !showAll && gamme?.description && <p className="mt-2 max-w-2xl text-sm text-muted">{gamme.description}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="tri">
              Trier par
            </label>
            <select
              id="tri"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-[#fbeee2]/20 bg-[#140a07] px-4 py-2 text-sm text-[#fbeee2] hover:border-[#ff7a3d]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {query ? (
              <button type="button" onClick={() => choose(index)} className={chip}>
                <X className="h-4 w-4" aria-hidden /> Effacer la recherche
              </button>
            ) : showAll ? (
              <button type="button" onClick={() => choose(index)} className={chip}>
                <X className="h-4 w-4" aria-hidden /> Par gamme
              </button>
            ) : (
              <button type="button" onClick={() => router.replace(`/boutique?gamme=${ALL}`, { scroll: false })} className={chip}>
                <LayoutGrid className="h-4 w-4" aria-hidden /> Tout voir ({allProducts.length})
              </button>
            )}
          </div>
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <VarietyCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        ) : (
          <p className="card p-8 text-center text-muted">Aucun produit ne correspond à « {query} ».</p>
        )}
      </section>
    </>
  );
}
