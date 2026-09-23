"use client";

import { useEffect, useState } from "react";
import type { MiniProduct } from "./mini";
import { TLink } from "./PageTransition";
import { anton, priceLabel, useAddMini, useSwipe } from "./shared";

export interface Slide {
  eyebrow: string;
  title: string;
  title2: string;
  desc: string;
  href: string;
  cta: string;
  form: string;
  /** Forme du nuage : 0 feuille, 1 résine, 2 huile. */
  mix: number;
  items: MiniProduct[];
}

const AUTO_MS = 8000;

/** Accueil : nuage à gauche, cartes en coverflow 3D à droite. */
export function HomeCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const addMini = useAddMini();
  const n = slides.length;

  useEffect(() => {
    if (hold) return;
    const id = window.setInterval(() => {
      if (window.scrollY < window.innerHeight * 0.5) setActive((a) => (a + 1) % n);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [hold, n]);

  const pick = (i: number) => { setHold(true); setActive(((i % n) + n) % n); };
  const swipe = useSwipe(() => pick(active + 1), () => pick(active - 1));
  const cur = slides[active];

  return (
    <section className="flex items-center pt-28 pb-10 lg:min-h-dvh lg:pt-24">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-2 sm:gap-[clamp(20px,3vw,48px)] px-[clamp(20px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        {/* Mobile : nuage réduit pour garder les cartes visibles sans défiler. */}
        <div data-cloud="" data-mix={cur.mix} className="relative aspect-square w-full max-w-[min(230px,30vh)] justify-self-center sm:max-w-[min(600px,70vh)]">
          <div className="absolute inset-[4%] rounded-full border border-dashed border-[#ffc46b]/30 [animation:nuage-spin_60s_linear_infinite]" />
          <span className="absolute top-[8%] -left-16 rounded-full sm:left-0 border border-[#fbeee2]/10 bg-[#140a07]/60 px-3.5 py-2 text-[13px] font-semibold backdrop-blur-md">
            Forme · <span className="text-[#ff7a3d]">{cur.form}</span>
          </span>
        </div>

        <div>
          <div
            {...swipe}
            className="relative -mx-5 overflow-hidden px-5 select-none [perspective:1600px]"
            style={{ ...swipe.style, height: "min(520px, calc(100dvh - 200px))", minHeight: 380 }}
          >
            {slides.map((s, i) => {
              let o = i - active;
              if (o > n / 2) o -= n;
              if (o < -n / 2 + 0.5) o += n;
              const ao = Math.abs(o);
              return (
                <div
                  key={s.title2}
                  onClick={() => i !== active && pick(i)}
                  aria-hidden={i !== active}
                  className="absolute top-0 left-1/2 h-full"
                  style={{
                    width: "min(360px,72vw)",
                    marginLeft: "max(-180px,-36vw)",
                    transform: `translateX(${o * 40}%) translateZ(${-ao * 260}px) rotateY(${-o * 34}deg)`,
                    opacity: ao > 1 ? 0 : ao === 1 ? 0.3 : 1,
                    zIndex: 10 - ao,
                    cursor: i === active ? "default" : "pointer",
                    transition: "transform .9s cubic-bezier(.16,1,.3,1), opacity .6s",
                  }}
                >
                  <div
                    className="flex h-full flex-col overflow-hidden rounded-[30px] bg-[#211209] p-[clamp(22px,2.4vw,30px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]"
                    style={{ border: `1px solid ${i === active ? "rgba(255,122,61,.7)" : "rgba(251,238,226,.1)"}` }}
                  >
                    <div className="flex justify-between text-xs font-bold tracking-[.18em] text-[#ffc46b]">
                      <span>{s.eyebrow}</span>
                      <span className="text-[#fbeee2]/45">0{i + 1} / 0{n}</span>
                    </div>
                    <h2 className="mt-3 uppercase leading-[.92]" style={{ ...anton, fontSize: "clamp(36px,3.6vw,54px)" }}>
                      {s.title}
                      <br />
                      <span className="text-[#ff7a3d]">{s.title2}</span>
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#fbeee2]/70">{s.desc}</p>
                    <div className="flex-1" />
                    <div className="grid gap-2">
                      {s.items.map((p) => (
                        <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-[#fbeee2]/10 bg-[#fbeee2]/5 py-2 pr-2 pl-3.5">
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-bold">{p.name}</div>
                            <div className="text-xs text-[#fbeee2]/55">{p.region} · CBD {p.cbd}</div>
                          </div>
                          <span className="text-[17px]" style={anton}>{priceLabel(p)}</span>
                          <button
                            type="button"
                            tabIndex={i === active ? 0 : -1}
                            onClick={() => addMini(p)}
                            disabled={p.variant.stock <= 0}
                            aria-label={p.variant.stock > 0 ? `Ajouter ${p.name} (${p.variant.label}) au panier` : `${p.name} : rupture de stock`}
                            className="h-[34px] w-[34px] shrink-0 rounded-full bg-[#ff7a3d] text-lg font-bold text-[#140a07] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                    <TLink
                      href={s.href}
                      label={s.title2}
                      tabIndex={i === active ? 0 : -1}
                      className="mt-3.5 rounded-full bg-[#fbeee2] px-5 py-[15px] text-center text-[15px] font-bold text-[#140a07] transition hover:bg-[#ff7a3d]"
                    >
                      {s.cta} →
                    </TLink>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3.5 flex items-center justify-center gap-[18px]">
            <button type="button" onClick={() => pick(active - 1)} aria-label="Carte précédente" className="h-[50px] w-[50px] rounded-full border border-[#fbeee2]/20 text-xl transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]">←</button>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title2}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Aller à ${s.title2}`}
                  className="relative h-1.5 overflow-hidden rounded-md bg-[#fbeee2]/20 transition-[width] duration-400"
                  style={{ width: i === active ? 42 : 12 }}
                >
                  <span
                    key={`${i}-${active}-${hold}`}
                    className="absolute inset-0 origin-left bg-[#ff7a3d]"
                    style={{
                      transform: `scaleX(${i === active ? (hold ? 1 : 0) : 0})`,
                      animation: i === active && !hold ? `nuage-progress ${AUTO_MS}ms linear forwards` : undefined,
                    }}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => pick(active + 1)} aria-label="Carte suivante" className="h-[50px] w-[50px] rounded-full border border-[#fbeee2]/20 text-xl transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
