import type { MetadataRoute } from "next";
import { COUNTRIES } from "@/lib/countries";
import { getArticles } from "@/lib/data/articles";
import { getCatalog } from "@/lib/data/catalog";
import { getConseils } from "@/lib/data/conseils";
import { getRecipes } from "@/lib/data/recipes";
import { getTop10s } from "@/lib/data/top10";
import { getMaintenance } from "@/lib/data/settings";
import { siteConfig } from "@/lib/config";
import { NORTH_AFRICAN_SLUGS } from "@/lib/catalog-utils";
import { estActuMaghreb } from "@/lib/veille-articles";

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
  const tops = getTop10s();
  // Même date que « Dernière mise à jour » affichée sur les trois pages légales.
  const LEGAL_UPDATED = "2026-10-28T00:00:00Z";
  const pageUpdated: Record<string, Date> = {
    "": latest([...recipesAt, ...productsAt, ...conseilsAt]),
    "/recettes": latest(recipesAt),
    "/pays": latest(recipesAt),
    "/boutique": latest(productsAt),
    "/conseils": latest(conseilsAt),
    // Actus lues en direct depuis la veille (2 passages par jour) : la page change chaque jour.
    "/actus": new Date(),
    "/conditions": new Date(LEGAL_UPDATED),
    "/mentions-legales": new Date(LEGAL_UPDATED),
    "/confidentialite": new Date(LEGAL_UPDATED),
  };
  const staticPages = ["", "/recettes", "/pays", "/boutique", "/conseils", "/actus", "/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    lastModified: pageUpdated[path],
    changeFrequency: ["", "/recettes", "/boutique", "/actus"].includes(path) ? ("daily" as const) : ["/pays", "/conseils"].includes(path) ? ("weekly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : ["/recettes", "/boutique"].includes(path) ? 0.9 : ["/pays", "/conseils", "/actus"].includes(path) ? 0.7 : 0.3,
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
    // Un top 10 par onglet ; /top-10 renvoie vers le premier onglet (adresse de référence), il n'est donc pas listé.
    ...tops.map((t) => ({
      url: `${base}/top-10/${t.slug}`,
      lastModified: new Date(`${t.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: imgs(...t.items.slice(0, 3).map((it) => products.find((p) => p.slug === it.product)?.images[0])),
    })),
    // Articles complets des actus construits au build (la page de secours /actus/article n'est pas listée).
    ...getArticles().filter((a) => !estActuMaghreb(a)).map((a) => ({
      url: `${base}/actus/${a.slug}`,
      lastModified: new Date(a.redige_le),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      images: imgs(a.image.url),
    })),
    // Produits d'Afrique du Nord : hors de Google (fiches en noindex), donc hors du sitemap.
    ...products.filter((p) => !NORTH_AFRICAN_SLUGS.has(p.slug)).map((p) => ({
      url: `${base}/produit/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: imgs(...p.images.slice(0, 1)),
    })),
  ];
  return entries;
}
