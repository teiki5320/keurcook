import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { ProductImage } from "@/components/product/ProductImage";
import { AMAZON_DISCLOSURE, amazonUrl } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import type { ResolvedTop10Item } from "@/lib/data/top10";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";
import { TabsStrip } from "./TabsStrip";
import type { RichText as RichTextValue, Top10 } from "@/lib/top10/types";

const linkClass = "font-semibold text-[#ffc46b] underline underline-offset-2 hover:text-[#ff7a3d]";
const chipClass =
  "inline-flex rounded-full border border-[#ff7a3d]/50 px-3 py-1 text-sm font-semibold text-[#fbeee2] transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]";

function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link key={i} href={part.href} className={linkClass}>
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}

const plain = (value: RichTextValue) => value.map((p) => (typeof p === "string" ? p : p.label)).join("");

/**
 * Page « Top 10 » : rangée d'onglets (un par sujet, chacun à sa propre adresse), puis le top du sujet actif.
 * Chaque onglet est une page construite à part, avec son contenu complet dans le HTML.
 */
export function Top10View({ tops, active, items }: { tops: Top10[]; active: Top10; items: ResolvedTop10Item[] }) {
  const path = `/top-10/${active.slug}`;
  return (
    <article className="container-page pb-10">
      <JsonLdScript
        data={[
          breadcrumbLd([
            { name: "Accueil", url: siteConfig.url },
            { name: "Top 10", url: `${siteConfig.url}/top-10` },
            { name: active.title, url: `${siteConfig.url}${path}` },
          ]),
          itemListLd(
            active.title,
            items.map((it) => ({ name: it.productData.name, url: `${siteConfig.url}/produit/${it.productData.slug}` })),
          ),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: active.faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: plain(q.reponse) } })),
          },
        ]}
      />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link href="/top-10" className="hover:underline">Top 10</Link> /{" "}
        <span className="text-ink">{active.tab}</span>
      </nav>

      {/* Onglets : sur téléphone, la bande défile seule de côté, sans faire défiler la page. */}
      <TabsStrip>
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {tops.map((t) => {
            const current = t.slug === active.slug;
            return (
              <li key={t.slug}>
                <Link
                  href={`/top-10/${t.slug}`}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-full border px-5 py-2.5 text-sm font-bold whitespace-nowrap transition ${
                    current ? "border-[#ff7a3d] bg-[#ff7a3d] text-[#140a07]" : "border-[#fbeee2]/20 bg-[#211209] text-[#fbeee2] hover:border-[#ff7a3d]"
                  }`}
                >
                  {t.tab}
                </Link>
              </li>
            );
          })}
        </ul>
      </TabsStrip>

      <header className="mt-8 max-w-4xl">
        <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
          Notre sélection · <time dateTime={active.updated}>{monthYear(active.updated)}</time>
        </p>
        <h1 className="mt-3 uppercase leading-[.95] text-balance" style={{ ...anton, fontSize: "clamp(36px,6vw,80px)" }}>
          {active.title}
          <span className="text-[#ff7a3d]">.</span>
        </h1>
        <p className="mt-5 border-l-4 border-[#ff7a3d] pl-4 text-lg leading-relaxed text-[#fbeee2]/90">{active.intro}</p>
        <p className="mt-4 text-xs leading-relaxed text-muted">{AMAZON_DISCLOSURE}</p>
      </header>

      <ol className="mt-10 space-y-6">
        {items.map((it) => (
          <li key={it.product} id={`n${it.rank}`} className="scroll-mt-28">
            <article aria-labelledby={`titre-${it.rank}`} className="card grid overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <TLink href={`/produit/${it.productData.slug}`} label={it.productData.name} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] bg-sage-100 md:aspect-auto md:min-h-80">
                <ProductImage src={it.productData.images[0]} alt={it.productData.name} sizes="(min-width: 768px) 40vw, 100vw" priority={it.rank === 1} />
                <span
                  aria-hidden
                  className="absolute top-3 left-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#140a07]/85 text-[44px] leading-none text-[#ff7a3d]"
                  style={anton}
                >
                  {it.rank}
                </span>
              </TLink>
              <div className="flex flex-col gap-4 p-5 sm:p-7">
                <h2 id={`titre-${it.rank}`} className="text-xl leading-snug font-bold sm:text-2xl">
                  <span className="sr-only">N° {it.rank} : </span>
                  <TLink href={`/produit/${it.productData.slug}`} label={it.productData.name} className="hover:text-[#ff7a3d]">
                    {it.productData.name}
                  </TLink>
                </h2>
                <p className="text-[15px] leading-relaxed text-[#fbeee2]/85">{it.pourquoi}</p>
                {it.recipesData.length > 0 && (
                  <div>
                    <p className="text-xs font-bold tracking-[.14em] text-[#ffc46b] uppercase">Dans nos recettes</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {it.recipesData.map((r) => (
                        <li key={r.slug}>
                          <TLink href={`/recette/${r.slug}`} label={r.name} className={chipClass}>
                            {r.name} →
                          </TLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {it.articlesData.length > 0 && (
                  <div>
                    <p className="text-xs font-bold tracking-[.14em] text-[#ffc46b] uppercase">Dans nos conseils</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {it.articlesData.map((c) => (
                        <li key={c.slug}>
                          <TLink href={`/conseils/${c.slug}`} label={c.title} className={chipClass}>
                            {c.title} →
                          </TLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                  <a
                    href={amazonUrl(it.asin)}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    aria-label={`Voir ${it.productData.name} sur Amazon, lien partenaire (nouvel onglet)`}
                    className="btn-primary px-6"
                  >
                    Voir sur Amazon <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                  <span className="text-xs text-muted">Lien partenaire</span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section aria-labelledby="comment-choisir" className="mt-14 max-w-3xl">
        <h2 id="comment-choisir" className="font-display text-3xl">
          Comment choisir<span className="text-[#ff7a3d]">.</span>
        </h2>
        <ul className="mt-4 space-y-3">
          {active.guide.map((g, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-[#fbeee2]/85">
              <span aria-hidden className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#ff7a3d] text-xs font-bold text-[#140a07]">
                {i + 1}
              </span>
              <span>
                <RichText value={g} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="questions" className="mt-14 max-w-3xl">
        <h2 id="questions" className="font-display text-3xl">
          Questions fréquentes<span className="text-[#ff7a3d]">.</span>
        </h2>
        <div className="mt-4">
          {active.faq.map((q) => (
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
        <p className="mt-8 text-xs leading-relaxed text-muted">{AMAZON_DISCLOSURE} Keur Cook ne vend aucun produit lui-même.</p>
      </section>
    </article>
  );
}

/** « octobre 2026 » à partir de « 2026-10-19 ». */
function monthYear(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("fr-FR", { month: "long", year: "numeric", timeZone: "Europe/Paris" });
}
