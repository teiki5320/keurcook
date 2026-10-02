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
  // Dernière modification (lastmod) : la date du contenu le plus récent de chaque page.
  const latest = (dates: string[]) => new Date(dates.reduce((a, b) => (a > b ? a : b), "1970-01-01"));
  const recipesAt = recipes.map((r) => r.createdAt);
  const productsAt = products.map((p) => p.createdAt);
  const conseilsAt = getConseils().map((c) => `${c.date}T00:00:00Z`);
  // Même date que « Dernière mise à jour » affichée sur les trois pages légales.
  const LEGAL_UPDATED = "2026-10-01T00:00:00Z";
  const pageUpdated: Record<string, Date> = {
    "": latest([...recipesAt, ...productsAt, ...conseilsAt]),
    "/recettes": latest(recipesAt),
    "/pays": latest(recipesAt),
    "/boutique": latest(productsAt),
    "/conseils": latest(conseilsAt),
    "/conditions": new Date(LEGAL_UPDATED),
    "/mentions-legales": new Date(LEGAL_UPDATED),
    "/confidentialite": new Date(LEGAL_UPDATED),
  };
  const staticPages = ["", "/recettes", "/pays", "/boutique", "/conseils", "/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    lastModified: pageUpdated[path],
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
      lastModified: latest([
        ...recipes.filter((r) => r.countryCode === c.code).map((r) => r.createdAt),
        ...products.filter((p) => p.originCountry === c.name).map((p) => p.createdAt),
      ]),
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
