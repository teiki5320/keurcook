/**
 * Fonctions pures autour des recettes (libellés, durées, quantités, recherche).
 * Utilisables côté serveur comme côté navigateur (export statique).
 */
import type { Recipe, RecipeCourse, RecipeIngredient } from "./types";

export const RECIPE_COURSES: { key: RecipeCourse; name: string; description: string }[] = [
  { key: "mijotes", name: "Mijotés & sauces", description: "Les grandes marmites qui cuisent lentement : ndolé, mafé, pondu, wats…" },
  { key: "grillades", name: "Grillades", description: "Au charbon de bois, comme dans les maquis et au coin des rues." },
  { key: "riz-cereales", name: "Riz & céréales", description: "Riz au poisson, fonio, mil : les plats complets du quotidien et des fêtes." },
  { key: "accompagnements", name: "Accompagnements", description: "Plantain, manioc et en-cas pour compléter le repas." },
  { key: "douceurs", name: "Douceurs & boissons", description: "Desserts frais et boissons de l'hospitalité." },
];

export const courseName = (key: RecipeCourse) => RECIPE_COURSES.find((c) => c.key === key)?.name ?? key;

export const DIFFICULTY_LABELS: Record<1 | 2 | 3, string> = { 1: "Facile", 2: "Intermédiaire", 3: "Élaborée" };

/** 75 → « 1 h 15 », 40 → « 40 min ». */
export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m.toString().padStart(2, "0")}` : `${h} h`;
}

/** Durée ISO 8601 pour les données structurées (PT1H15M). */
export const isoDuration = (minutes: number) => `PT${Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)}H` : ""}${minutes % 60 ? `${minutes % 60}M` : ""}` || "PT0M";

const FRACTIONS: Array<[number, string]> = [[0.25, "¼"], [0.5, "½"], [0.75, "¾"], [1 / 3, "⅓"], [2 / 3, "⅔"]];

/** Quantité adaptée au nombre de personnes, arrondie de façon lisible (« 1 ½ », « 250 »). */
export function formatQuantity(quantity: number | null, factor = 1) {
  if (quantity === null) return "";
  const q = quantity * factor;
  if (q >= 20) return String(Math.round(q / 5) * 5);
  if (q >= 5) return String(Math.round(q));
  const whole = Math.floor(q);
  const rest = q - whole;
  const frac = FRACTIONS.find(([v]) => Math.abs(v - rest) < 0.09);
  if (rest < 0.09) return String(whole || 1);
  if (rest > 0.91) return String(whole + 1);
  if (frac) return whole ? `${whole} ${frac[1]}` : frac[1];
  return q.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
}

/** « 200 g de feuilles de ndolé séchées », « 2 oignons », « sel ». */
export function ingredientLine(i: RecipeIngredient, factor = 1) {
  const q = formatQuantity(i.quantity, factor);
  if (!q) return { quantity: "", label: i.name };
  if (!i.unit) return { quantity: q, label: i.name };
  const de = /^[aeiouyhéèêâîôû]/i.test(i.name) ? "d'" : "de ";
  return { quantity: `${q} ${i.unit}`, label: `${de}${i.name}` };
}

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export interface RecipeFilters {
  q?: string;
  country?: string | null;
  course?: string | null;
  difficulty?: number | null;
}

/** Recherche par nom, pays, ingrédient ou mot-clé (« fonio », « arachide »…). */
export function filterRecipes(recipes: Recipe[], f: RecipeFilters, countryName: (code: string) => string = (c) => c) {
  const terms = f.q ? normalize(f.q).split(/\s+/).filter(Boolean) : [];
  return recipes.filter((r) => {
    if (f.country && r.countryCode !== f.country) return false;
    if (f.course && r.course !== f.course) return false;
    if (f.difficulty && r.difficulty !== f.difficulty) return false;
    if (!terms.length) return true;
    const haystack = normalize(
      [r.name, r.shortDescription, r.region, countryName(r.countryCode), courseName(r.course), ...r.tags, ...r.ingredients.map((i) => i.name)]
        .filter(Boolean)
        .join(" "),
    );
    return terms.every((t) => haystack.includes(t));
  });
}
