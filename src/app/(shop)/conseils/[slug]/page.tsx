import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { ConseilCard } from "@/components/conseils/ConseilCard";
import { formatConseilDate } from "@/components/conseils/format";
import { anton } from "@/components/nuage/typography";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { ProduitEncart } from "@/components/product/ProduitEncart";
import { LiensTop10 } from "@/components/top10/LiensTop10";
import { topsPourConseil } from "@/lib/data/top10";
import { conseilSections } from "@/lib/conseils/article";
import { CONSEIL_THEMES } from "@/lib/conseils/themes";
import { AD_SLOTS } from "@/lib/ads";
import { siteConfig } from "@/lib/config";
import { jsonLd } from "@/lib/json-ld";
import { getCatalog } from "@/lib/data/catalog";
import { getConseilBySlug, getConseils, getRelatedConseils, renderConseil } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { getRecipes } from "@/lib/data/recipes";
import { photoSrcSet } from "@/lib/image-loader";

// Relu toutes les heures : un article programmé devient accessible le jour de sa date.

export function generateStaticParams() {
  return getConseils().map((c) => ({ slug: c.slug }));
}

/**
 * Coupe l'article en deux avant l'intertitre le plus proche du milieu, pour y placer une annonce.
 * Article trop court (moins de trois intertitres) : pas de coupure.
 */
function splitAtMiddleHeading(html: string): [string, string] {
  const starts = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index);
  if (starts.length < 3) return [html, ""];
  const cut = starts.reduce((best, i) => (Math.abs(i - html.length / 2) < Math.abs(best - html.length / 2) ? i : best));
  return [html.slice(0, cut), html.slice(cut)];
}

/** Longueur du texte visible d'un morceau de HTML. */
const texteLong = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().length;

/** Texte entre l'encadré produit et l'annonce du milieu (au moins un bon paragraphe : environ un demi-écran de téléphone). */
const ECART_PUB = 600;

/**
 * Place l'encadré produit à un intertitre, loin de l'annonce du milieu :
 * - de préférence avant l'annonce, après la première partie, s'il reste assez de texte jusqu'à l'annonce ;
 * - sinon après l'annonce, au premier intertitre qui en est assez éloigné.
 * Renvoie le morceau coupé et l'endroit, ou null (pas d'encadré dans le texte, les produits restent en bas).
 */
function placeEncart(start: string, end: string): { morceau: "debut" | "fin"; avant: string; apres: string } | null {
  const intertitres = (html: string) => [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index).filter((i) => i > 0);
  const avantPub = intertitres(start).find((i) => texteLong(start.slice(i)) >= ECART_PUB || !end);
  if (avantPub !== undefined) return { morceau: "debut", avant: start.slice(0, avantPub), apres: start.slice(avantPub) };
  const apresPub = intertitres(end).find((i) => texteLong(end.slice(0, i)) >= ECART_PUB);
  if (apresPub !== undefined) return { morceau: "fin", avant: end.slice(0, apresPub), apres: end.slice(apresPub) };
  return null;
}

const ARTICLE_CLASS =
  "space-y-4 text-[17px] leading-relaxed text-[#fbeee2]/85 [&_a]:font-semibold [&_a]:text-[#ffc46b] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#ff7a3d] [&_h2]:scroll-mt-28 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-[#fbeee2] [&_h3]:pt-2 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_strong]:text-[#fbeee2] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6";

const absolute = (path: string) => (path.startsWith("http") ? path : `${siteConfig.url}${path}`);

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const conseil = getConseilBySlug(slug);
  if (!conseil) return {};
  return pageMetadata({
    title: conseil.seoTitle ?? conseil.title,
    description: conseil.description,
    path: `/conseils/${conseil.slug}`,
    image: conseil.image,
    imageAlt: conseil.imageAlt ?? conseil.title,
    type: "article",
    publishedTime: conseil.date,
  });
}

export default async function ConseilPage({ params }: PageProps<"/conseils/[slug]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { slug } = await params;
  const conseil = getConseilBySlug(slug);
  if (!conseil) notFound();

  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  const linkedRecipes = conseil.recettes.flatMap((s) => recipes.filter((r) => r.slug === s));
  const linkedProducts = conseil.produits.flatMap((s) => products.filter((p) => p.slug === s));
  const related = getRelatedConseils(conseil);
  const sections = conseilSections(conseil.body);
  const html = renderConseil(conseil.body);
  const [bodyStart, bodyEnd] = splitAtMiddleHeading(html);
  const encart = linkedProducts.length > 0 ? placeEncart(bodyStart, bodyEnd) : null;
  const produitEncart = <ProduitEncart id="produit-conseil" titre="Le produit de ce conseil" produits={linkedProducts.slice(0, 1)} emplacement="conseil" className="my-8" />;
  const tops = topsPourConseil(conseil);
  const theme = CONSEIL_THEMES[conseil.theme];
  const Icon = theme.icon;
  const url = `${siteConfig.url}/conseils/${conseil.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: conseil.title,
      description: conseil.description,
      datePublished: conseil.date,
      dateModified: conseil.date,
      image: conseil.image ? [absolute(conseil.image)] : undefined,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      mainEntityOfPage: url,
      articleSection: theme.name,
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Conseils", item: `${siteConfig.url}/conseils` },
        { "@type": "ListItem", position: 3, name: conseil.title, item: url },
      ],
    },
  ];

  return (
    <article className="container-page pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link prefetch={false} href="/conseils" className="hover:underline">Conseils</Link> /{" "}
        <span className="text-ink">{conseil.title}</span>
      </nav>

      {/* Bandeau : thème, date, question et réponse courte. */}
      <header className="max-w-4xl">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
          <span className="inline-flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" aria-hidden /> {theme.name}
          </span>
          <span aria-hidden className="text-[#fbeee2]/40">·</span>
          <time dateTime={conseil.date} className="text-[#fbeee2]/60">{formatConseilDate(conseil.date)}</time>
        </p>
        <h1 className="mt-3 uppercase leading-[.95] text-balance" style={{ ...anton, fontSize: "clamp(40px,6vw,88px)" }}>
          {conseil.title}
        </h1>
        <p className="mt-5 border-l-4 border-[#ff7a3d] pl-4 text-lg leading-relaxed text-[#fbeee2]/90 sm:text-xl">{conseil.resume}</p>
      </header>

      <figure className="mt-8">
        <div className={`relative overflow-hidden rounded-[28px] border border-[#fbeee2]/10 bg-[#281610] ${conseil.image ? "aspect-[16/9]" : "aspect-[3/1]"}`}>
          {conseil.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={conseil.image} srcSet={photoSrcSet(conseil.image)} sizes="(min-width: 1152px) 1088px, 100vw" fetchPriority="high" alt={conseil.imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(55%_65%_at_50%_45%,rgba(255,122,61,.3),transparent_70%)]">
              <Icon className="h-16 w-16 text-[#ff7a3d] sm:h-20 sm:w-20" strokeWidth={1.25} />
            </span>
          )}
        </div>
      </figure>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-14">
        {sections.length > 1 ? (
          <nav aria-labelledby="sommaire" className="card h-fit p-5 lg:sticky lg:top-24">
            <h2 id="sommaire" className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Sommaire</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-2">
                  <span className="font-bold text-[#ff7a3d]">{i + 1}.</span>
                  <a href={`#${s.id}`} className="hover:text-[#ffc46b]">{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}
        <div className="max-w-3xl">
          {encart?.morceau === "debut" ? (
            <>
              <div className={ARTICLE_CLASS} dangerouslySetInnerHTML={{ __html: encart.avant }} />
              {produitEncart}
              <div className={ARTICLE_CLASS} dangerouslySetInnerHTML={{ __html: encart.apres }} />
            </>
          ) : (
            <div className={ARTICLE_CLASS} dangerouslySetInnerHTML={{ __html: bodyStart }} />
          )}
          {bodyEnd && (
            <>
              <AdSlot slot={AD_SLOTS.conseilMilieu} />
              {encart?.morceau === "fin" ? (
                <>
                  <div className={`mt-4 ${ARTICLE_CLASS}`} dangerouslySetInnerHTML={{ __html: encart.avant }} />
                  {produitEncart}
                  <div className={ARTICLE_CLASS} dangerouslySetInnerHTML={{ __html: encart.apres }} />
                </>
              ) : (
                <div className={`mt-4 ${ARTICLE_CLASS}`} dangerouslySetInnerHTML={{ __html: bodyEnd }} />
              )}
            </>
          )}
        </div>
      </div>

      {linkedProducts.length > 0 && (
        <section aria-labelledby="produits-lies" className="mt-16">
          <h2 id="produits-lies" className="font-display text-3xl">
            Les produits<span className="text-[#ff7a3d]">.</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {linkedProducts.map((p) => (
              <VarietyCard key={p.id} product={p} emplacement="conseil" />
            ))}
          </div>
        </section>
      )}

      {linkedRecipes.length > 0 && (
        <section aria-labelledby="recettes-liees" className="mt-16">
          <h2 id="recettes-liees" className="font-display text-3xl">
            Les recettes<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {linkedRecipes.map((r) => (
              <li key={r.id}>
                <RecipeCard recipe={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <LiensTop10 liens={tops} className="mt-10" />

      {related.length > 0 && (
        <section aria-labelledby="a-lire-aussi" className="mt-16">
          <h2 id="a-lire-aussi" className="font-display text-3xl">
            À lire aussi<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <li key={c.slug}>
                <ConseilCard conseil={c} headingLevel={3} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdSlot slot={AD_SLOTS.conseilFin} className="mt-16" />
    </article>
  );
}
