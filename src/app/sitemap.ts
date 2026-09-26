import type { MetadataRoute } from "next";
import { COUNTRIES } from "@/lib/countries";
import { getCatalog } from "@/lib/data/catalog";
import { getConseils } from "@/lib/data/conseils";
import { getRecipes } from "@/lib/data/recipes";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  const base = siteConfig.url;
  const now = new Date();
  const staticPages = ["", "/recettes", "/pays", "/boutique", "/conseils", "/cgv", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: ["", "/recettes", "/boutique"].includes(path) ? ("daily" as const) : ["/pays", "/conseils"].includes(path) ? ("weekly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : ["/recettes", "/boutique"].includes(path) ? 0.9 : ["/pays", "/conseils"].includes(path) ? 0.7 : 0.3,
  }));
  return [
    ...staticPages,
    ...recipes.map((r) => ({
      url: `${base}/recette/${r.slug}`,
      lastModified: new Date(r.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...COUNTRIES.filter((c) => recipes.some((r) => r.countryCode === c.code)).map((c) => ({
      url: `${base}/pays/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getConseils().map((c) => ({
      url: `${base}/conseils/${c.slug}`,
      lastModified: new Date(`${c.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((p) => ({
      url: `${base}/produit/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
