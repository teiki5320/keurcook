"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";
import { anton, useSwipe } from "./shared";

/** Une gamme affichée dans l'anneau (catégorie CBD ou « Accessoires »). */
export interface RingGroup {
  key: string;
  name: string;
  image: string | null;
  count: number;
  /** Paramètres d'URL qui filtrent la liste des produits sous l'anneau. */
  query: Record<string, string>;
  /** Slugs de catégories couverts par la gamme (pour relire l'URL). */
  slugs: string[];
}

/** Largeur d'une carte (px) : le rayon de l'anneau s'adapte au nombre de gammes. */
const CARD_W = 240;

/** Index de la gamme correspondant à l'URL (?categorie=… ou ?type=accessoire). */
export function groupIndexFromParams(groups: RingGroup[], params: URLSearchParams) {
  const cat = params.get("categorie");
  const type = params.get("type");
  const i = groups.findIndex(
    (g) => (cat && g.slugs.includes(cat)) || (!cat && type && g.query.type === type),
  );
  return Math.max(0, i);
}

/** Boutique : anneau 3D de gammes ; la carte du centre filtre la liste en dessous. */
export function ShopRing({ groups }: { groups: RingGroup[] }) {
  return (
    <Suspense fallback={<ShopRingView groups={groups} initial={0} />}>
      <ShopRingWithParams groups={groups} />
    </Suspense>
  );
}

function ShopRingWithParams({ groups }: { groups: RingGroup[] }) {
  const params = useSearchParams();
  return <ShopRingView groups={groups} initial={groupIndexFromParams(groups, new URLSearchParams(params.toString()))} />;
}

function ShopRingView({ groups, initial }: { groups: RingGroup[]; initial: number }) {
  const n = groups.length;
  const ang = 360 / Math.max(1, n);
  // Rayon minimal pour que les cartes ne se chevauchent pas, les voisines restant visibles sur mobile.
  const radius = Math.max(260, Math.round((CARD_W / 2 + 20) / Math.tan(Math.PI / Math.max(3, n))));
  const router = useRouter();
  const [spin, setSpin] = useState(initial);
  const idx = ((spin % n) + n) % n;

  const step = (d: number) => {
    const next = spin + d;
    setSpin(next);
    // L'URL porte le filtre : la liste des produits suit la carte du centre.
    const g = groups[((next % n) + n) % n];
    router.replace(`/boutique?${new URLSearchParams(g.query).toString()}`, { scroll: false });
  };
  const goTo = (i: number) => {
    let d = (((i - idx) % n) + n) % n;
    if (d > n / 2) d -= n;
    step(d);
  };
  const swipe = useSwipe(() => step(1), () => step(-1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.altKey || e.ctrlKey || e.metaKey || t?.closest("input, select, textarea, [contenteditable='true']")) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (n === 0) return null;
  const showProducts = () => document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="overflow-hidden pt-24 pb-6 sm:pt-28">
      <div className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,56px)]">
        <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(60px,8vw,130px)" }}>
          La boutique<span className="text-[#ff7a3d]">.</span>
        </h1>
      </div>

      <div
        {...swipe}
        onDragStart={(e) => e.preventDefault()}
        className="relative mt-4 cursor-grab select-none [perspective:1600px] active:cursor-grabbing"
        style={{ ...swipe.style, height: "clamp(360px,48vh,520px)" }}
      >
        <div data-cloud="" data-mix="3" data-shape="ring" className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2" style={{ width: "min(640px,90vw)" }} />
        <div
          className="absolute top-1/2 left-1/2 h-0 w-0 [transform-style:preserve-3d]"
          style={{ transform: `translateZ(-${radius}px) rotateY(${-spin * ang}deg)`, transition: "transform 1s cubic-bezier(.16,1,.3,1)" }}
        >
          {groups.map((g, i) => {
            const active = i === idx;
            return (
              <div
                key={g.key}
                onClick={() => (active ? showProducts() : goTo(i))}
                role="button"
                tabIndex={active ? 0 : -1}
                aria-pressed={active}
                aria-label={active ? `${g.name} : voir les ${g.count} produits` : `Choisir ${g.name}`}
                onKeyDown={(e) => {
                  if (active && e.key === "Enter") showProducts();
                }}
                className="absolute cursor-pointer [backface-visibility:hidden]"
                style={{
                  left: -120, top: -170, width: 240, height: 340,
                  transform: `rotateY(${i * ang}deg) translateZ(${radius}px)`,
                  opacity: active ? 1 : 0.55,
                  transition: "opacity .6s",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-[#281610] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]" style={{ border: `1px solid ${active ? "#ff7a3d" : "rgba(251,238,226,.12)"}` }}>
                  {g.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBasePath(g.image)} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#140a07]/95 p-4 pt-20">
                    <div className="text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">
                      {g.count} produit{g.count > 1 ? "s" : ""}
                    </div>
                    <div className="mt-1 text-4xl leading-none uppercase" style={anton}>{g.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-[#fbeee2]/45">Glissez pour choisir une gamme · ses produits s&apos;affichent dessous</p>
    </section>
  );
}
