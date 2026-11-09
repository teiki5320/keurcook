/**
 * Fiches détaillées des produits, lot 4 : Céréales et farines, cafés et thés, livres (43 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - fonio — Fonio précuit
 *   - attieke-sec — Attiéké déshydraté
 *   - couscous-de-mil — Couscous de mil (thiéré)
 *   - farine-de-teff — Farine de teff
 *   - poudre-de-baobab — Pain de singe (poudre de baobab)
 *   - farine-de-foufou — Farine de manioc pour foufou
 *   - farine-d-igname — Farine d'igname (amala / elubo)
 *   - gari-jaune — Gari jaune (semoule de manioc)
 *   - chikwangue — Chikwangue (bâton de manioc)
 *   - tapioca-de-manioc — Tapioca de manioc granulé
 *   - farine-de-mais-blanc — Farine de maïs blanc (Iwisa Super Maize Meal)
 *   - farine-de-pois-chiches — Farine de pois chiches bio
 *   - infusion-de-tamarin — Infusion de tamarin
 *   - infusion-de-gingembre — Infusion de gingembre
 *   - cafe-du-kivu — Café moulu du Kivu (RD Congo)
 *   - cafe-vert-du-cameroun — Café vert du Cameroun à torréfier
 *   - cafe-moka-sidamo — Café moulu Moka Sidamo
 *   - cafe-du-kenya — Café en grains du Kenya
 *   - cafe-harrar — Café en grains Éthiopie Harrar
 *   - cafe-yirgacheffe — Café en grains Yirgacheffe
 *   - cafe-du-cameroun — Café en grains du Cameroun (Bamoun)
 *   - cafe-du-rwanda — Café en grains du Rwanda
 *   - cafe-de-tanzanie — Café en grains de Tanzanie
 *   - cafe-du-burundi — Café en grains du Burundi
 *   - rooibos-vert — Rooibos vert bio
 *   - the-vert-gunpowder — Thé vert gunpowder pour ataya
 *   - kinkeliba — Feuilles de kinkeliba
 *   - rooibos — Rooibos bio en vrac
 *   - honeybush — Honeybush bio
 *   - citronnelle-sechee — Citronnelle séchée
 *   - the-noir-du-kenya — Thé noir du Kenya
 *   - the-noir-du-kenya-cardamome — Thé noir à la cardamome
 *   - livre-200-recettes-camerounaises — 200 recettes de cuisine camerounaise (Estelle Tiani)
 *   - livre-la-cuisine-congolaise — La cuisine congolaise (Fidèle Mialoundama et Isabelle Goma Mouyokani)
 *   - livre-senegal-cuisine-intime-et-gourmande — Sénégal, cuisine intime et gourmande (Youssou N'Dour)
 *   - livre-dans-ma-cuisine-congolaise — Dans ma cuisine congolaise, du Kivu à Kinshasa (Gisèle Mbeku Andjelani)
 *   - livre-plats-express-saveurs-d-afrique — Plats express aux saveurs d'Afrique (Cheikh Niang, @niangcook)
 *   - livre-le-meilleur-de-la-cuisine-congolaise — Le meilleur de la cuisine congolaise (Lukusa Jessica)
 *   - livre-cuisine-d-afrique-et-d-ailleurs — Cuisine d'Afrique et d'ailleurs (Cheikh Niang, @niangcook)
 *   - livre-grain-d-afrique — Grain d'Afrique, 60 recettes (Aïssatou Mbaye)
 *   - livre-cuisine-du-senegal-81-recettes — Cuisine du Sénégal, 81 recettes traditionnelles (Kaya N'Dor)
 *   - livre-afro-vegan — Afro Vegan, 50 recettes (Aurélie Payet et Blandine Mayissa)
 *   - tajine-en-argile — Tajine touareg en argile 30 cm (Afrique du Nord, page en noindex)
 */
import type { ProductDetail } from "../../types";

export const SLUGS = [
  "fonio",
  "attieke-sec",
  "couscous-de-mil",
  "farine-de-teff",
  "poudre-de-baobab",
  "farine-de-foufou",
  "farine-d-igname",
  "gari-jaune",
  "chikwangue",
  "tapioca-de-manioc",
  "farine-de-mais-blanc",
  "farine-de-pois-chiches",
  "infusion-de-tamarin",
  "infusion-de-gingembre",
  "cafe-du-kivu",
  "cafe-vert-du-cameroun",
  "cafe-moka-sidamo",
  "cafe-du-kenya",
  "cafe-harrar",
  "cafe-yirgacheffe",
  "cafe-du-cameroun",
  "cafe-du-rwanda",
  "cafe-de-tanzanie",
  "cafe-du-burundi",
  "rooibos-vert",
  "the-vert-gunpowder",
  "kinkeliba",
  "rooibos",
  "honeybush",
  "citronnelle-sechee",
  "the-noir-du-kenya",
  "the-noir-du-kenya-cardamome",
  "livre-200-recettes-camerounaises",
  "livre-la-cuisine-congolaise",
  "livre-senegal-cuisine-intime-et-gourmande",
  "livre-dans-ma-cuisine-congolaise",
  "livre-plats-express-saveurs-d-afrique",
  "livre-le-meilleur-de-la-cuisine-congolaise",
  "livre-cuisine-d-afrique-et-d-ailleurs",
  "livre-grain-d-afrique",
  "livre-cuisine-du-senegal-81-recettes",
  "livre-afro-vegan",
  "tajine-en-argile",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], ProductDetail>> = {
};
