import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { Top10 } from "@/lib/top10/types";

/** Titre, description, adresse de référence et image de partage (3 premiers produits et titre) d'un onglet. */
export async function top10Metadata(top: Top10): Promise<Metadata> {
  return pageMetadata({
    title: top.seoTitle ?? top.title,
    description: top.description,
    path: `/top-10/${top.slug}`,
    image: `/top10/${top.slug}.jpg`,
    imageAlt: top.title,
    type: "article",
    publishedTime: top.updated,
  });
}
