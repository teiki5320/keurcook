import type { MetadataRoute } from "next";
import { COUNTRIES } from "@/lib/countries";
import { getCatalog } from "@/lib/data/catalog";
import { getConseils } from "@/lib/data/conseils";
import { getRecipes } from "@/lib/data/recipes";
import { getMaintenance } from "@/lib/data/settings";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance : rien à indexer.
  if (getMaintenance().enabled) return [];
  const [{ products }, recipes] = await Promise.all([getCatalog(), getRecipes()]);
  const base = siteConfig.url;
  // Photos jointes aux pages (Google Images) : adresses complètes, sans les images vides.
  const imgs = (...srcs: Array<string | null | undefined>) =>
    srcs.filter((s): s is string => !!s).map((s) => (s.startsWith("http") ? s : `${base}${s}`));
  const staticPages = ["", "/recettes", "/pays", "/boutique", "/conseils", "/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: ["", "/recettes", "/boutique"].includes(path) ? ("daily" as const) : ["/pays", "/conseils"].includes(path) ? ("weekly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : ["/recettes", "/boutique"].includes(path) ? 0.9 : ["/pays", "/conseils"].includes(path) ? 0.7 : 0.3,
  }));
  const entries: MetadataRoute.Sitemap = [
    ...staticPages,
    ...recipes.map((r) => ({
      url: `${base}/recette/${r.slug}`,
      lastModified: new Date(r.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: imgs(r.image),
    })),
    ...COUNTRIES.filter((c) => recipes.some((r) => r.countryCode === c.code)).map((c) => ({
      url: `${base}/pays/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getConseils().map((c) => ({
      url: `${base}/conseils/${c.slug}`,
      lastModified: new Date(`${c.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: imgs(c.image),
    })),
    ...products.map((p) => ({
      url: `${base}/produit/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: imgs(...p.images.slice(0, 1)),
    })),
  ];
  return entries;
}
