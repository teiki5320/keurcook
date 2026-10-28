import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleVue } from "@/components/actus/ArticleVue";
import { AdSlot } from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/ads";
import { siteConfig } from "@/lib/config";
import { getArticleBySlug, getArticles, getAutresActus, getFichesLiees, getSlugsConstruits } from "@/lib/data/articles";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, JsonLdScript, newsArticleLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { lienActu } from "@/lib/veille-articles";

/** Seules les pages construites existent : une actu plus récente s'ouvre sur la page de secours /actus/article?id=… */
export const dynamicParams = false;

/**
 * Une page par article de la veille téléchargé avant le build (scripts/articles-veille.ts).
 * Aucun article (veille injoignable) : aucune page article, le build continue.
 */
const SANS_ARTICLE = "aucun-article";
export function generateStaticParams() {
  const slugs = getArticles().map((a) => ({ slug: a.slug }));
  // Next.js exige au moins une page en export statique : adresse réservée (jamais liée, hors sitemap, noindex) qui affiche la 404.
  return slugs.length > 0 ? slugs : [{ slug: SANS_ARTICLE }];
}

export async function generateMetadata({ params }: PageProps<"/actus/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { robots: { index: false, follow: true } };
  return pageMetadata({
    title: article.titre,
    description: article.chapo,
    path: `/actus/${article.slug}`,
    image: article.image.url,
    imageAlt: article.image.alt,
    type: "article",
    publishedTime: article.publie_le,
  });
}

export default async function ArticleActuPage({ params }: PageProps<"/actus/[slug]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const construits = new Set(getSlugsConstruits());
  const autres = getAutresActus(article.id).map((actu) => ({ actu, lien: lienActu(actu, construits) }));
  const fiches = await getFichesLiees(article);
  const url = `${siteConfig.url}/actus/${article.slug}`;

  return (
    <>
      <JsonLdScript
        data={[
          newsArticleLd(article),
          breadcrumbLd([
            { name: "Accueil", url: siteConfig.url },
            { name: "Actus", url: `${siteConfig.url}/actus` },
            { name: article.titre, url },
          ]),
        ]}
      />
      <ArticleVue article={article} fiches={fiches} autres={autres} pub={<AdSlot slot={AD_SLOTS.actuFin} className="mx-auto mt-12 max-w-[680px]" />} />
    </>
  );
}
