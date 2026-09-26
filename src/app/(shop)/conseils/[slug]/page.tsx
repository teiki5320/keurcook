import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConseilCard } from "@/components/conseils/ConseilCard";
import { formatConseilDate } from "@/components/conseils/format";
import { anton } from "@/components/nuage/typography";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { conseilSections } from "@/lib/conseils/article";
import { CONSEIL_THEMES } from "@/lib/conseils/themes";
import { siteConfig } from "@/lib/config";
import { getCatalog } from "@/lib/data/catalog";
import { getConseilBySlug, getConseils, getRelatedConseils, renderConseil } from "@/lib/data/conseils";
import { getRecipes } from "@/lib/data/recipes";
import { withBasePath } from "@/lib/paths";

// Relu toutes les heures : un article programmé devient accessible le jour de sa date.
export const revalidate = 3600;

export function generateStaticParams() {
  return getConseils().map((c) => ({ slug: c.slug }));
}

const absolute = (path: string) => (path.startsWith("http") ? path : `${siteConfig.url}${path}`);

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const conseil = getConseilBySlug(slug);
  if (!conseil) return {};
  return {
    title: conseil.title,
    description: conseil.description,
    alternates: { canonical: `/conseils/${conseil.slug}` },
    openGraph: {
      type: "article",
      title: conseil.title,
      description: conseil.description,
      publishedTime: conseil.date,
      images: conseil.image ? [{ url: conseil.image, alt: conseil.imageAlt ?? conseil.title }] : undefined,
    },
  };
}

export default async function ConseilPage({ params }: PageProps<"/conseils/[slug]">) {
  const { slug } = await params;
  const conseil = getConseilBySlug(slug);
  if (!conseil) notFound();

  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  const linkedRecipes = conseil.recettes.flatMap((s) => recipes.filter((r) => r.slug === s));
  const linkedProducts = conseil.produits.flatMap((s) => products.filter((p) => p.slug === s));
  const related = getRelatedConseils(conseil);
  const sections = conseilSections(conseil.body);
  const theme = CONSEIL_THEMES[conseil.theme];
  const Icon = theme.icon;
  const url = `${siteConfig.url}/conseils/${conseil.slug}`;

  const jsonLd = [
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link href="/conseils" className="hover:underline">Conseils</Link> /{" "}
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
            <img src={withBasePath(conseil.image)} alt={conseil.imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(55%_65%_at_50%_45%,rgba(255,122,61,.3),transparent_70%)]">
              <Icon className="h-16 w-16 text-[#ff7a3d] sm:h-20 sm:w-20" strokeWidth={1.25} />
            </span>
          )}
        </div>
        {conseil.image && <figcaption className="mt-2 text-xs text-muted">Photo d&apos;illustration générée par IA.</figcaption>}
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
        <div
          className="max-w-3xl space-y-4 text-[17px] leading-relaxed text-[#fbeee2]/85 [&_a]:font-semibold [&_a]:text-[#ffc46b] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#ff7a3d] [&_h2]:scroll-mt-28 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-[#fbeee2] [&_h3]:pt-2 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_strong]:text-[#fbeee2] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: renderConseil(conseil.body) }}
        />
      </div>

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

      {linkedProducts.length > 0 && (
        <section aria-labelledby="produits-lies" className="mt-16">
          <h2 id="produits-lies" className="font-display text-3xl">
            Les produits<span className="text-[#ff7a3d]">.</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {linkedProducts.map((p) => (
              <VarietyCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

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
    </article>
  );
}
