"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { X } from "lucide-react";
import { Coverflow } from "@/components/nuage/Coverflow";
import { anton } from "@/components/nuage/shared";
import { filterProducts } from "@/lib/catalog-utils";
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

/** Boutique en une page : carrousel des gammes ; dessous, les variétés de la gamme au centre. */
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
  const index = Math.max(0, gammes.findIndex((g) => g.key === gammeKey));
  const gamme = gammes[index];
  const choose = (i: number) => router.replace(`/boutique?gamme=${gammes[i].key}`, { scroll: false });

  const results = query ? filterProducts(allProducts, { q: query }) : null;
  const list = results ?? gamme?.products ?? [];

  const cards = gammes.map((g) => ({
    key: g.key,
    title: g.name,
    eyebrow: `${g.products.length} ${g.key === "accessoires" ? "article" : "variété"}${g.products.length > 1 ? "s" : ""}`,
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
            onOpen={() => document.getElementById("varietes")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            hint="Glissez pour choisir une gamme · ses variétés s'affichent dessous"
          />
        </div>
      </section>

      <section id="varietes" aria-live="polite" className="container-page relative scroll-mt-24 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
              {results ? "Recherche" : `${list.length} ${gamme?.key === "accessoires" ? "article" : "variété"}${list.length > 1 ? "s" : ""}`}
            </p>
            <h2 className="mt-1 text-4xl leading-none uppercase" style={anton}>
              {results ? `« ${query} »` : gamme?.name}
            </h2>
            {!results && gamme?.description && <p className="mt-2 max-w-2xl text-sm text-muted">{gamme.description}</p>}
          </div>
          {results && (
            <button
              type="button"
              onClick={() => choose(index)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#fbeee2]/20 px-4 py-2 text-sm hover:border-[#ff7a3d]"
            >
              <X className="h-4 w-4" aria-hidden /> Effacer la recherche
            </button>
          )}
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
