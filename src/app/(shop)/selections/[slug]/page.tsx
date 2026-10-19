import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Utensils } from "lucide-react";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { ProductImage } from "@/components/product/ProductImage";
import { SelectionExplorer } from "@/components/selections/SelectionExplorer";
import { AmazonLink, RichText, type SelectionCard } from "@/components/selections/shared";
import { AMAZON_DISCLOSURE, amazonUrl } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { getSelectionBySlug, getSelections, resolveSelection } from "@/lib/data/selections";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import type { RichText as RichTextValue } from "@/lib/selections/types";

export function generateStaticParams() {
  return getSelections().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/selections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const selection = getSelectionBySlug(slug);
  if (!selection) return {};
  const items = await resolveSelection(slug);
  const image = items[0]?.productData.images[0];
  return pageMetadata({
    title: selection.seoTitle ?? selection.title,
    description: selection.description,
    path: `/selections/${slug}`,
    image,
    imageAlt: selection.title,
    type: "article",
    publishedTime: selection.updated,
  });
}

const plain = (value: RichTextValue) => value.map((p) => (typeof p === "string" ? p : p.label)).join("");

/** « octobre 2026 » à partir de « 2026-10-19 ». */
const monthYear = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("fr-FR", { month: "long", year: "numeric", timeZone: "Europe/Paris" });

const SECTIONS = [
  { id: "top-3", label: "Top 3" },
  { id: "selection", label: "La sélection" },
  { id: "tableau", label: "Tableau" },
  { id: "comment-choisir", label: "Comment choisir" },
  { id: "questions", label: "Questions" },
];

export default async function SelectionPage({ params }: PageProps<"/selections/[slug]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { slug } = await params;
  const selection = getSelectionBySlug(slug);
  if (!selection) notFound();
  const items = await resolveSelection(slug);
  const path = `/selections/${slug}`;

  const cards: SelectionCard[] = items.map((it) => ({
    rank: it.rank,
    slug: it.productData.slug,
    name: it.productData.name,
    image: it.productData.images[0] ?? null,
    amazon: amazonUrl(it.asin),
    geste: it.geste,
    gesteLabel: selection.gestes[it.geste] ?? it.geste,
    pourquoi: it.pourquoi,
    onAime: it.onAime,
    aSavoir: it.aSavoir,
    idealPour: it.idealPour,
    matiere: it.matiere,
    taille: it.taille ?? null,
    entretien: it.entretien,
    recettes: it.recipesData.map((r) => ({ slug: r.slug, name: r.name })),
  }));
  const podium = items.filter((it) => it.podium).slice(0, 3);

  return (
    <article className="container-page pb-10">
      <JsonLdScript
        data={[
          breadcrumbLd([
            { name: "Accueil", url: siteConfig.url },
            { name: "Nos sélections", url: `${siteConfig.url}/selections` },
            { name: selection.title, url: `${siteConfig.url}${path}` },
          ]),
          itemListLd(
            selection.title,
            items.map((it) => ({ name: it.productData.name, url: `${siteConfig.url}/produit/${it.productData.slug}` })),
          ),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: selection.faq.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: plain(q.reponse) },
            })),
          },
        ]}
      />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link href="/selections" className="hover:underline">Nos sélections</Link> /{" "}
        <span className="text-ink">{selection.title}</span>
      </nav>

      <header className="max-w-4xl">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
          <span className="inline-flex items-center gap-1.5">
            <Utensils className="h-3.5 w-3.5" aria-hidden /> Notre sélection
          </span>
          <span aria-hidden className="hidden text-[#fbeee2]/40 sm:inline">·</span>
          <span className="text-[#fbeee2]/60">
            {items.length} {selection.unite} · <time dateTime={selection.updated}>{monthYear(selection.updated)}</time>
          </span>
        </p>
        <h1 className="mt-3 uppercase leading-[.95] text-balance" style={{ ...anton, fontSize: "clamp(38px,6vw,88px)" }}>
          {selection.title}
          <span className="text-[#ff7a3d]">.</span>
        </h1>
        <p className="mt-5 border-l-4 border-[#ff7a3d] pl-4 text-lg leading-relaxed text-[#fbeee2]/90 sm:text-xl">{selection.intro}</p>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          {AMAZON_DISCLOSURE} Aucun prix ni note n&apos;est affiché : le prix du jour figure sur Amazon. Keur Cook ne vend aucun produit.
        </p>
      </header>

      <nav aria-label="Dans cette page" className="mt-8 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-[#fbeee2]/15 bg-[#fbeee2]/5 px-4 py-2 text-sm font-semibold text-[#fbeee2] transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {podium.length > 0 && (
        <section id="top-3" aria-labelledby="titre-top-3" className="mt-12 scroll-mt-28">
          <h2 id="titre-top-3" className="font-display text-3xl">
            Notre top 3<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {podium.map((it) => (
              <li key={it.product}>
                <article className="card flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-[#ff7a3d] px-2.5 py-1 text-xs font-bold tracking-[.06em] text-[#140a07] uppercase">{it.podium!.mention}</span>
                    <span className="text-xs text-muted">n° {it.rank}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <TLink
                      href={`/produit/${it.productData.slug}`}
                      label={it.productData.name}
                      tabIndex={-1}
                      aria-hidden
                      className="relative block h-20 w-20 flex-none overflow-hidden rounded-xl bg-sage-100"
                    >
                      <ProductImage src={it.productData.images[0]} alt={it.productData.name} sizes="80px" />
                    </TLink>
                    <div className="min-w-0">
                      <h3 className="text-lg leading-snug font-bold">
                        <TLink href={`/produit/${it.productData.slug}`} label={it.productData.name} className="hover:text-[#ff7a3d]">
                          {it.productData.name}
                        </TLink>
                      </h3>
                      <p className="mt-1 text-sm text-muted">{selection.gestes[it.geste]}</p>
                    </div>
                  </div>
                  <p className="border-t border-[#fbeee2]/10 pt-3 text-sm leading-relaxed text-[#fbeee2]/85">{it.podium!.resume}</p>
                  <AmazonLink href={amazonUrl(it.asin)} name={it.productData.name} className="mt-auto" />
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="selection" aria-labelledby="titre-selection" className="mt-14 scroll-mt-28">
        <h2 id="titre-selection" className="mb-4 font-display text-3xl">
          La sélection complète<span className="text-[#ff7a3d]">.</span>
        </h2>
        <SelectionExplorer items={cards} gestes={selection.gestes} unite={selection.unite} />
      </section>

      <section id="tableau" aria-labelledby="titre-tableau" className="mt-14 scroll-mt-28">
        <h2 id="titre-tableau" className="font-display text-3xl">
          Tableau récapitulatif<span className="text-[#ff7a3d]">.</span>
        </h2>
        {/* Ordinateur : tableau. Téléphone : une ligne par produit, sans défilement horizontal. */}
        <div className="card mt-6 hidden overflow-hidden md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] tracking-[.08em] text-muted uppercase">
                <th scope="col" className="px-4 py-3">Produit</th>
                <th scope="col" className="px-4 py-3">Geste</th>
                <th scope="col" className="px-4 py-3">Matière</th>
                <th scope="col" className="px-4 py-3">Taille</th>
                <th scope="col" className="px-4 py-3">Entretien</th>
                <th scope="col" className="px-4 py-3 text-right">Recettes</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Lien</span></th>
              </tr>
            </thead>
            <tbody>
              {cards.map((it) => (
                <tr key={it.slug} className="border-t border-[#fbeee2]/8 align-top">
                  <th scope="row" className="px-4 py-3 font-semibold">
                    <span className="mr-2 text-xs font-bold text-[#ff7a3d]">{it.rank}</span>
                    <TLink href={`/produit/${it.slug}`} label={it.name} className="hover:text-[#ff7a3d]">
                      {it.name}
                    </TLink>
                  </th>
                  <td className="px-4 py-3 text-muted">{it.gesteLabel}</td>
                  <td className="px-4 py-3">{it.matiere}</td>
                  <td className="px-4 py-3">{it.taille ?? "—"}</td>
                  <td className="px-4 py-3">{it.entretien}</td>
                  <td className="px-4 py-3 text-right font-bold">{it.recettes.length}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <AmazonLink href={it.amazon} name={it.name} compact className="flex-col items-end" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 space-y-2 md:hidden">
          {cards.map((it) => (
            <li key={it.slug} className="card p-4">
              <p className="font-semibold">
                <span className="mr-2 text-xs font-bold text-[#ff7a3d]">{it.rank}</span>
                {it.name}
              </p>
              <p className="mt-1 text-sm text-muted">
                {[it.gesteLabel, it.matiere, it.taille, `${it.recettes.length} recette${it.recettes.length > 1 ? "s" : ""}`].filter(Boolean).join(" · ")}
              </p>
              <AmazonLink href={it.amazon} name={it.name} compact className="mt-2" />
            </li>
          ))}
        </ul>
      </section>

      <section id="comment-choisir" aria-labelledby="titre-choisir" className="mt-14 scroll-mt-28">
        <h2 id="titre-choisir" className="font-display text-3xl">
          Comment choisir<span className="text-[#ff7a3d]">.</span>
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {selection.guide.map((g, i) => (
            <li key={g.titre} className="card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#ff7a3d] text-sm font-bold text-[#140a07]">{i + 1}</span>
                <h3 className="font-bold leading-snug">{g.titre}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#fbeee2]/85">
                <RichText value={g.texte} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="questions" aria-labelledby="titre-questions" className="mt-14 max-w-3xl scroll-mt-28">
        <h2 id="titre-questions" className="font-display text-3xl">
          Questions fréquentes<span className="text-[#ff7a3d]">.</span>
        </h2>
        <div className="mt-4">
          {selection.faq.map((q) => (
            <details key={q.question} className="group border-t border-[#fbeee2]/12 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden className="text-2xl leading-none text-[#ff7a3d] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#fbeee2]/85">
                <RichText value={q.reponse} />
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted">
          {AMAZON_DISCLOSURE} Cette page présente notre sélection : Keur Cook ne vend aucun produit lui-même.
        </p>
      </section>
    </article>
  );
}
