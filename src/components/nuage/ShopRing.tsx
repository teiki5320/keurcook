"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";
import type { MiniProduct } from "./mini";
import { TLink } from "./PageTransition";
import { anton, priceLabel, useAddMini } from "./shared";

interface Props {
  products: MiniProduct[];
  categories: { slug: string; name: string }[];
}

const RADIUS = 400;

/** Pastille active d'après l'URL (?categorie=… ou ?type=accessoire). */
function chipFromParams(params: URLSearchParams) {
  if (params.get("type") === "accessoire") return "accessoires";
  return params.get("categorie") ?? "tout";
}

/** Boutique : cartes produits en anneau 3D autour du nuage. */
export function ShopRing(props: Props) {
  return (
    <Suspense fallback={<ShopRingView {...props} activeChip="tout" />}>
      <ShopRingWithParams {...props} />
    </Suspense>
  );
}

function ShopRingWithParams(props: Props) {
  const params = useSearchParams();
  return <ShopRingView {...props} activeChip={chipFromParams(new URLSearchParams(params.toString()))} />;
}

function ShopRingView({ products, categories, activeChip }: Props & { activeChip: string }) {
  const n = products.length;
  const ang = 360 / Math.max(1, n);
  const [spin, setSpin] = useState(0);
  const router = useRouter();
  const cat = activeChip;
  const addMini = useAddMini();
  const idx = ((spin % n) + n) % n;
  const cur = products[idx];

  const step = (d: number) => setSpin((s) => s + d);
  const goTo = (i: number) => {
    let d = (((i - idx) % n) + n) % n;
    if (d > n / 2) d -= n;
    step(d);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.altKey || e.ctrlKey || e.metaKey || t?.closest("input, select, textarea, [contenteditable='true']")) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!cur) return null;
  const chips = [{ slug: "tout", name: "Tout" }, ...categories, { slug: "accessoires", name: "Accessoires" }];
  // Les pastilles filtrent la liste des produits sous l'anneau (via l'URL).
  const chipHref = (slug: string) =>
    slug === "tout" ? "/boutique" : slug === "accessoires" ? "/boutique?type=accessoire" : `/boutique?categorie=${slug}`;

  return (
    <section className="overflow-hidden pt-28 pb-12">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-5 px-[clamp(20px,4vw,56px)]">
        <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(60px,8vw,130px)" }}>
          La boutique<span className="text-[#ff7a3d]">.</span>
        </h1>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={cat === c.slug}
              onClick={() => {
                router.replace(chipHref(c.slug), { scroll: false });
                if (c.slug !== "tout") {
                  const i = products.findIndex((p) => p.categorySlug === c.slug);
                  if (i >= 0) goTo(i);
                }
              }}
              className="rounded-full border border-[#fbeee2]/20 px-[18px] py-2.5 text-sm font-semibold transition"
              style={cat === c.slug ? { background: "#fbeee2", color: "#140a07" } : undefined}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-2.5 [perspective:1600px]" style={{ height: "clamp(360px,48vh,520px)" }}>
        <div data-cloud="" data-mix="3" data-shape="ring" className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2" style={{ width: "min(640px,90vw)" }} />
        <div
          className="absolute top-1/2 left-1/2 h-0 w-0 [transform-style:preserve-3d]"
          style={{ transform: `translateZ(-${RADIUS}px) rotateY(${-spin * ang}deg)`, transition: "transform 1s cubic-bezier(.16,1,.3,1)" }}
        >
          {products.map((p, i) => {
            const active = i === idx;
            const inCat = cat === "tout" || p.categorySlug === cat;
            return (
              <div
                key={p.id}
                onClick={() => !active && goTo(i)}
                className="absolute cursor-pointer [backface-visibility:hidden]"
                style={{
                  left: -120, top: -170, width: 240, height: 340,
                  transform: `rotateY(${i * ang}deg) translateZ(${RADIUS}px)`,
                  opacity: active ? 1 : inCat ? 0.6 : 0.22,
                  transition: "opacity .6s",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-[#281610] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]" style={{ border: `1px solid ${active ? "#ff7a3d" : "rgba(251,238,226,.12)"}` }}>
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBasePath(p.image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#140a07]/95 p-4 pt-16">
                    <div className="text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">{p.category}</div>
                    <div className="mt-1 text-2xl leading-none uppercase" style={anton}>{p.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-2.5 flex max-w-[1320px] flex-wrap items-center justify-center gap-[18px] px-[clamp(20px,4vw,56px)]">
        <button type="button" onClick={() => step(-1)} aria-label="Produit précédent" className="h-[54px] w-[54px] rounded-full border border-[#fbeee2]/20 text-xl transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]">←</button>
        <div className="flex min-w-[min(100%,440px)] items-center justify-between gap-4 rounded-full border border-[#fbeee2]/12 bg-[#fbeee2]/6 py-3 pr-3 pl-6 backdrop-blur-md">
          <TLink href={`/produit/${cur.slug}`} label={cur.name.split(" ")[0]} className="min-w-0">
            <div className="truncate text-base font-bold text-[#fbeee2]">{cur.name}</div>
            <div className="text-[13px] text-[#fbeee2]/60">{cur.region} · CBD {cur.cbd} · THC {cur.thc}</div>
          </TLink>
          <button
            type="button"
            onClick={() => addMini(cur)}
            disabled={cur.variant.stock <= 0}
            className="shrink-0 rounded-full bg-[#ff7a3d] px-[18px] py-3 text-sm font-bold whitespace-nowrap text-[#140a07] transition hover:bg-[#ffc46b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {cur.variant.stock > 0 ? `${priceLabel(cur)} · Ajouter` : "Rupture de stock"}
          </button>
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Produit suivant" className="h-[54px] w-[54px] rounded-full border border-[#fbeee2]/20 text-xl transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]">→</button>
      </div>
    </section>
  );
}
