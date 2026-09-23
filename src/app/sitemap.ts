import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/data/catalog";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories, products } = await getCatalog();
  const base = siteConfig.url;
  const now = new Date();
  const staticPages = ["", "/boutique", "/avertissements", "/cgv", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/boutique" ? ("daily" as const) : ("yearly" as const),
    priority: path === "" ? 1 : path === "/boutique" ? 0.9 : 0.3,
  }));
  return [
    ...staticPages,
    ...categories.map((c) => ({
      url: `${base}/categorie/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${base}/produit/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
