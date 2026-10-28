import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleSecours } from "@/components/actus/ArticleSecours";
import { getSlugsConstruits } from "@/lib/data/articles";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

// Page de secours : jamais indexée (noindex) et absente du sitemap ; l'adresse de référence d'un article est /actus/<slug>.
export const metadata: Metadata = pageMetadata({
  title: "Article",
  description: "Article complet d'une actu de la cuisine africaine, rédigé par Keur Cook avec un lien vers ses sources.",
  path: "/actus/article",
  noindex: true,
});

/**
 * Page de secours /actus/article?id=<id> : affiche, dans le navigateur, l'article d'une actu publiée
 * par la veille après la dernière construction du site (sa page /actus/<slug> n'existe pas encore).
 */
export default function ArticleSecoursPage() {
  if (getMaintenance().enabled) return null;
  return (
    <Suspense fallback={<div className="container-page min-h-[60vh]" />}>
      <ArticleSecours construits={getSlugsConstruits()} />
    </Suspense>
  );
}
