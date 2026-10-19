import type { Metadata } from "next";
import { getCatalog } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/metadata";
import type { Top10 } from "@/lib/top10/types";

/** Titre, description, adresse de référence et image de partage (photo du n° 1) d'un onglet. */
export async function top10Metadata(top: Top10): Promise<Metadata> {
  const { products } = await getCatalog();
  return pageMetadata({
    title: top.seoTitle ?? top.title,
    description: top.description,
    path: `/top-10/${top.slug}`,
    image: products.find((p) => p.slug === top.items[0].product)?.images[0],
    imageAlt: top.title,
    type: "article",
    publishedTime: top.updated,
  });
}
