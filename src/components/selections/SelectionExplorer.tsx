"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { TLink } from "@/components/nuage/PageTransition";
import { ProductImage } from "@/components/product/ProductImage";
import { AmazonLink, type SelectionCard } from "./shared";

const MAX_COMPARE = 3;

type Sort = "rank" | "recettes";

/** Classement complet : filtre par geste, tri, et comparaison côte à côte de 2 ou 3 produits. */
export function SelectionExplorer({ items, gestes, unite }: { items: SelectionCard[]; gestes: Record<string, string>; unite: string }) {
  const [geste, setGeste] = useState("tous");
  const [sort, setSort] = useState<Sort>("rank");
  const [compare, setCompare] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  // Gestes réellement présents, dans l'ordre défini par la sélection.
  const chips = [["tous", "Tous"], ...Object.entries(gestes).filter(([key]) => items.some((it) => it.geste === key))];
  const list = items
    .filter((it) => geste === "tous" || it.geste === geste)
    .sort((a, b) => (sort === "rank" ? a.rank - b.rank : b.recettes.length - a.recettes.length || a.rank - b.rank));
  const chosen = compare.map((rank) => items.find((it) => it.rank === rank)!).filter(Boolean);

  const toggle = (rank: number) =>
    setCompare((c) => (c.includes(rank) ? c.filter((x) => x !== rank) : c.length >= MAX_COMPARE ? c : [...c, rank]));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-muted">
          {geste === "tous" ? `${items.length} ${unite}` : `${list.length} pour « ${gestes[geste]} »`} · cochez « Comparer » sur 2 ou 3 {unite}.
        </p>
        <label className="flex items-center gap-2 text-sm text-muted">
          Trier par
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-[#fbeee2]/20 bg-[#211209] px-3 py-2 text-sm font-semibold text-[#fbeee2]"
          >
            <option value="rank">Notre ordre</option>
            <option value="recettes">Nombre de recettes</option>
          </select>
        </label>
      </div>

      <div role="group" aria-label="Filtrer par geste" className="mt-4 flex flex-wrap gap-2">
        {chips.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={geste === key}
            onClick={() => setGeste(key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              geste === key ? "border-[#ff7a3d] bg-[#ff7a3d] text-[#140a07]" : "border-[#fbeee2]/20 bg-[#211209] text-[#fbeee2] hover:border-[#ff7a3d]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ol className="mt-5 space-y-4">
        {list.map((it) => (
          <li key={it.slug} id={`choix-${it.rank}`} className="scroll-mt-28">
            <article aria-labelledby={`titre-${it.rank}`} className="card overflow-hidden p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-[#fbeee2]/15 bg-[#140a07] text-base font-bold text-[#ff7a3d]">
                  {it.rank}
                </span>
                <TLink
                  href={`/produit/${it.slug}`}
                  label={it.name}
                  tabIndex={-1}
                  aria-hidden
                  className="relative block h-20 w-20 flex-none overflow-hidden rounded-xl bg-sage-100 sm:h-24 sm:w-24"
                >
                  <ProductImage src={it.image} alt={it.name} sizes="96px" />
                </TLink>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full border border-[#fbeee2]/18 px-2.5 py-0.5 text-[11px] font-semibold text-muted">{it.gesteLabel}</span>
                  <h3 id={`titre-${it.rank}`} className="mt-1.5 text-lg leading-snug font-bold sm:text-xl">
                    <TLink href={`/produit/${it.slug}`} label={it.name} className="hover:text-[#ff7a3d]">
                      {it.name}
                    </TLink>
                  </h3>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[#fbeee2]/10 py-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-muted">Matière</dt>
                  <dd className="font-semibold">{it.matiere}</dd>
                </div>
                {it.taille && (
                  <div>
                    <dt className="text-xs text-muted">Taille</dt>
                    <dd className="font-semibold">{it.taille}</dd>
                  </div>
                )}
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs text-muted">Entretien</dt>
                  <dd className="font-semibold">{it.entretien}</dd>
                </div>
              </dl>

              <p className="mt-4 text-[15px] leading-relaxed text-[#fbeee2]/85">
                <strong className="text-[#fbeee2]">Pourquoi on l&apos;a choisi.</strong> {it.pourquoi}
              </p>

              <div className="mt-4 grid gap-4 text-sm leading-relaxed sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold tracking-[.14em] text-[#ff7a3d] uppercase">On aime</p>
                  <ul className="mt-1.5 space-y-1">
                    {it.onAime.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden className="text-[#ff7a3d]">+</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[.14em] text-[#ffc46b] uppercase">À savoir</p>
                  <ul className="mt-1.5 space-y-1">
                    {it.aSavoir.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden className="text-[#ffc46b]">–</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-muted">On s&apos;en sert dans ces recettes</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {it.recettes.map((r) => (
                    <li key={r.slug}>
                      <TLink
                        href={`/recette/${r.slug}`}
                        label={r.name}
                        className="inline-flex rounded-full border border-[#ff7a3d]/50 px-3 py-1 text-sm font-semibold text-[#fbeee2] transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]"
                      >
                        {r.name} →
                      </TLink>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-muted">
                <strong className="text-[#fbeee2]">Idéal pour</strong> {it.idealPour}.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <AmazonLink href={it.amazon} name={it.name} />
                <button
                  type="button"
                  aria-pressed={compare.includes(it.rank)}
                  disabled={!compare.includes(it.rank) && compare.length >= MAX_COMPARE}
                  onClick={() => toggle(it.rank)}
                  className={`ml-auto rounded-full border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    compare.includes(it.rank) ? "border-[#fbeee2] bg-[#fbeee2] text-[#140a07]" : "border-[#fbeee2]/25 text-[#fbeee2] hover:border-[#fbeee2]"
                  }`}
                >
                  {compare.includes(it.rank) ? "✓ À comparer" : "+ Comparer"}
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {/* Barre et fenêtre posées à la racine de la page (avec le thème), au-dessus du menu et du pied de page. */}
      {compare.length > 0 &&
        createPortal(
          <div className="nuage-theme" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            <div className="fixed inset-x-0 bottom-0 z-[55] bg-[#fbeee2] text-[#140a07] shadow-[0_-6px_24px_rgba(0,0,0,.4)]">
              <div className="container-page flex items-center justify-between gap-3 py-3">
                <div className="min-w-0 text-sm">
                  <strong>
                    {compare.length} sélectionné{compare.length > 1 ? "s" : ""}
                  </strong>
                  <p className="truncate text-xs text-[#6b5445]">{chosen.map((c) => c.name).join(" · ")}</p>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCompare([]);
                      setOpen(false);
                    }}
                    className="rounded-full border border-[#140a07]/25 px-4 py-2 text-sm font-semibold"
                  >
                    Vider
                  </button>
                  <button
                    type="button"
                    disabled={compare.length < 2}
                    onClick={() => setOpen(true)}
                    className="rounded-full bg-[#140a07] px-4 py-2 text-sm font-bold text-[#fbeee2] disabled:opacity-40"
                  >
                    Comparer
                  </button>
                </div>
              </div>
            </div>
            {open && chosen.length > 1 && <CompareDialog items={chosen} onClose={() => setOpen(false)} />}
          </div>,
          document.body,
        )}
    </>
  );
}

function CompareDialog({ items, onClose }: { items: SelectionCard[]; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const rows: Array<[string, (it: SelectionCard) => string]> = [
    ["Geste", (it) => it.gesteLabel],
    ["Matière", (it) => it.matiere],
    ["Taille", (it) => it.taille ?? "Voir la fiche Amazon"],
    ["Entretien", (it) => it.entretien],
    ["Recettes du site", (it) => String(it.recettes.length)],
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="comparer-titre"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88dvh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-[#211209] px-4 pt-5 pb-8 sm:px-6"
      >
        <div className="flex items-center justify-between">
          <h2 id="comparer-titre" className="font-display text-2xl">
            Côte à côte<span className="text-[#ff7a3d]">.</span>
          </h2>
          <button ref={close} type="button" onClick={onClose} aria-label="Fermer la comparaison" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fbeee2]/10">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {items.map((it) => (
            <div key={it.slug} className="flex flex-col gap-2 rounded-xl border border-[#fbeee2]/12 bg-[#140a07] p-4">
              <p className="font-bold leading-snug">{it.name}</p>
              <dl className="space-y-1.5 border-t border-[#fbeee2]/10 pt-2 text-sm">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-right font-semibold">{value(it)}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-[#fbeee2]/10 pt-2 text-sm text-[#fbeee2]/85">
                <strong className="text-[#fbeee2]">Idéal pour</strong> {it.idealPour}.
              </p>
              <AmazonLink href={it.amazon} name={it.name} className="mt-auto pt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
