/**
 * Fiches détaillées : textes longs écrits par nous pour chaque produit (« Le produit en détail ») et chaque pays.
 * Un fichier par lot dans fiches/ ; chaque rédacteur ne modifie que son fichier. Règles : docs/FICHES.md.
 * Une fiche absente n'affiche rien : le site reste publiable à chaque étape.
 */
import type { CountryDetail, ProductDetail } from "../types";
import { SLUGS as slugs1, fiches as lot1 } from "./fiches/lot-1";
import { SLUGS as slugs2, fiches as lot2 } from "./fiches/lot-2";
import { SLUGS as slugs3, fiches as lot3 } from "./fiches/lot-3";
import { SLUGS as slugs4, fiches as lot4 } from "./fiches/lot-4";
import { SLUGS as slugsPays, fiches as pays } from "./fiches/pays";

/** Les 4 lots, dans l'ordre (liste des fiches prévues et fiches déjà écrites). */
export const LOTS_FICHES: Array<{ nom: string; slugs: readonly string[]; fiches: Record<string, ProductDetail | undefined> }> = [
  { nom: "lot-1", slugs: slugs1, fiches: lot1 },
  { nom: "lot-2", slugs: slugs2, fiches: lot2 },
  { nom: "lot-3", slugs: slugs3, fiches: lot3 },
  { nom: "lot-4", slugs: slugs4, fiches: lot4 },
];

/** Fiches produits écrites, par slug de produit. */
export const PRODUCT_DETAILS: Record<string, ProductDetail> = Object.fromEntries(
  LOTS_FICHES.flatMap((l) => Object.entries(l.fiches).filter((e): e is [string, ProductDetail] => Boolean(e[1]))),
);

/** Pays prévus dans fiches/pays.ts. */
export const SLUGS_PAYS_FICHES: readonly string[] = slugsPays;

/** Fiches pays écrites, par slug de pays. */
export const COUNTRY_DETAILS: Record<string, CountryDetail> = Object.fromEntries(
  Object.entries(pays as Record<string, CountryDetail | undefined>).filter((e): e is [string, CountryDetail] => Boolean(e[1])),
);
