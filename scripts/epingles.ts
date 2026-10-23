/**
 * Manifeste des épingles Pinterest (public/epingles.json, non versionné), lu chaque matin par
 * scripts/pinterest-publier.mjs une fois le site en ligne. Lancé avant chaque build (prebuild).
 *
 * Une épingle par recette publiée qui a son image verticale public/pins/<slug>.jpg (scripts/pin-images.mjs) ;
 * tableau choisi selon le pays (puis le type de plat), parmi ceux de config/pinterest.json.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { countryByCode } from "../src/lib/countries";
import { demoRecipes } from "../src/lib/demo/recipes";
import { formatDuration } from "../src/lib/recipe-utils";
import type { Recipe } from "../src/lib/types";

const RACINE = join(import.meta.dirname, "..");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://keurcook.com").replace(/\/$/, "");

/** Tableau Pinterest d'une recette (clés de config/pinterest.json). */
export function tableauRecette(r: Pick<Recipe, "countryCode" | "course">): string {
  const parPays: Record<string, string> = {
    SN: "senegal",
    CI: "cote-divoire",
    NG: "nigeria-ghana",
    GH: "nigeria-ghana",
    CM: "afrique-centrale",
    GA: "afrique-centrale",
    CD: "afrique-centrale",
    CG: "afrique-centrale",
    ET: "est-australe",
    UG: "est-australe",
    KE: "est-australe",
    TZ: "est-australe",
    MG: "est-australe",
    ZA: "est-australe",
  };
  return parPays[r.countryCode] ?? (r.course === "douceurs" ? "douceurs" : "mijotes");
}

/** Description de l'épingle (500 caractères au plus), uniquement avec des faits de la recette. */
export function descriptionRecette(r: Recipe): string {
  const pays = countryByCode(r.countryCode)?.of;
  const texte = `${r.name} : ${r.shortDescription.replace(/\.?$/, ".")} La recette ${pays ?? "africaine"} pas à pas, prête en ${formatDuration(r.prepMinutes + r.cookMinutes)}, pour ${r.servings} personnes : ingrédients, étapes et astuces sur Keur Cook.`;
  return texte.length > 500 ? `${texte.slice(0, 499)}…` : texte;
}

export interface EntreeManifeste {
  id: string;
  slug: string;
  numero: number;
  image: string;
  titre: string;
  description: string;
  alt: string;
  lien: string;
  tableau: string;
  publie_le: string;
}

export function manifeste(recettes: Recipe[], aUneImage: (slug: string) => boolean): EntreeManifeste[] {
  return recettes
    .filter((r) => r.isPublished && aUneImage(r.slug))
    .map((r) => ({
      id: `${r.slug}-1`,
      slug: r.slug,
      numero: 1,
      image: `${SITE_URL}/pins/${r.slug}.jpg`,
      titre: `${r.name} : la recette ${countryByCode(r.countryCode)?.of ?? "africaine"}`,
      description: descriptionRecette(r),
      alt: `${r.name}, recette ${countryByCode(r.countryCode)?.of ?? "africaine"} : photo du plat et titre. Épingle Keur Cook.`,
      lien: `${SITE_URL}/recette/${r.slug}`,
      tableau: tableauRecette(r),
      publie_le: r.createdAt.slice(0, 10),
    }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const config = JSON.parse(readFileSync(join(RACINE, "config/pinterest.json"), "utf8"));
  const epingles = manifeste(demoRecipes, (slug) => existsSync(join(RACINE, "public/pins", `${slug}.jpg`)));
  const inconnus = epingles.filter((e) => !config.tableaux[e.tableau]);
  if (inconnus.length) throw new Error(`Tableau absent de config/pinterest.json : ${inconnus.map((e) => e.tableau).join(", ")}`);
  writeFileSync(join(RACINE, "public/epingles.json"), JSON.stringify({ site: "Keur Cook", epingles }, null, 2) + "\n");
  console.log(`Épingles Pinterest : ${epingles.length} au manifeste public/epingles.json.`);
}
