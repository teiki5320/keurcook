/**
 * Valeurs nutritionnelles estimées d'une recette, par personne, calculées à partir des
 * ingrédients (valeurs moyennes pour 100 g, d'après les tables de composition usuelles).
 * Ce sont des ordres de grandeur, affichés comme tels : aucune allégation ne doit en être tirée.
 */
import type { Recipe, RecipeIngredient } from "./types";

/** [kcal, protéines, lipides, glucides, fibres, sucres] pour 100 g. */
type Per100 = [number, number, number, number, number, number];

interface Food {
  /** Reconnaît l'ingrédient par son nom (le premier aliment qui correspond l'emporte). */
  match: RegExp;
  per100: Per100;
  /** Poids d'une pièce (ingrédient sans unité, « 2 oignons »), en grammes comestibles. */
  piece?: number;
  /** Poids d'une cuillère à soupe, en grammes (15 par défaut ; la cuillère à café en vaut le tiers). */
  spoon?: number;
  /** Masse volumique (g/ml) pour les quantités en cl et l (1 par défaut). */
  density?: number;
  /** Part réellement consommée (huile de friture absorbée, os et arêtes déjà déduits sinon). */
  eaten?: number;
}

const ZERO: Per100 = [0, 0, 0, 0, 0, 0];
const SPICE: Per100 = [320, 12, 10, 50, 25, 5];
const OIL: Per100 = [900, 0, 100, 0, 0, 0];
const GREENS: Per100 = [23, 2.9, 0.4, 3.6, 2.2, 0.4];
const ONION: Per100 = [40, 1.1, 0.1, 9.3, 1.7, 4.2];
const TOMATO: Per100 = [18, 0.9, 0.2, 3.9, 1.2, 2.6];
const SUGAR: Per100 = [400, 0, 0, 100, 0, 100];
const SMOKED_FISH: Per100 = [280, 55, 6, 0, 0, 0];
const DRY_LEAVES: Per100 = [260, 20, 4, 45, 28, 2];
const CASSAVA_FLOUR: Per100 = [355, 1.2, 0.4, 87, 2, 1];

// L'ordre compte : les noms précis (« pâte d'arachide », « huile de friture ») avant les génériques.
const FOODS: Food[] = [
  // Sans apport : eau, infusions retirées, sel, levures, aromates en feuilles, emballages.
  { match: /eau de fleur|extrait de vanille|levure|bicarbonate|^sel|^eau|feuilles? de (laurier|bananier|sorgho)|feuilles de menthe|botte de menthe|café vert|fleurs de bissap|bâton de cannelle|clous? de girofle|cardamome/i, per100: ZERO },
  // Matières grasses.
  { match: /huile de friture/i, per100: OIL, density: 0.92, spoon: 13, eaten: 0.15 },
  { match: /huile/i, per100: OIL, density: 0.92, spoon: 13 },
  { match: /beurre/i, per100: [717, 0.9, 81, 0.1, 0, 0.1], spoon: 14 },
  { match: /pulpe de noix de palme/i, per100: [300, 2, 30, 6, 3, 0] },
  { match: /lait de coco/i, per100: [200, 2, 21, 3, 0, 2] },
  // Arachide, graines, noix.
  { match: /pâte d'arachide/i, per100: [590, 25, 50, 20, 6, 9], spoon: 16 },
  { match: /arachides/i, per100: [567, 25.8, 49, 16, 8.5, 4] },
  { match: /egusi/i, per100: [560, 28, 47, 12, 5, 2] },
  { match: /odika/i, per100: [680, 8, 67, 15, 10, 1] },
  { match: /yaji/i, per100: [500, 22, 35, 25, 8, 3] },
  { match: /soumbala|nététou/i, per100: [430, 37, 29, 11, 8, 2], piece: 20, spoon: 10 },
  // Produits laitiers et œufs.
  { match: /lait concentré/i, per100: [320, 7.9, 8.7, 54, 0, 54], density: 1.3, spoon: 20 },
  { match: /lait (fermenté|caillé)|yaourt/i, per100: [60, 3.5, 3.2, 4.7, 0, 4.7] },
  { match: /^lait/i, per100: [46, 3.3, 1.5, 4.8, 0, 4.8] },
  { match: /œufs?/i, per100: [143, 12.6, 9.5, 0.7, 0, 0.4], piece: 55 },
  // Viandes (crues, os déduits pour la volaille).
  { match: /cuisses de poulet/i, per100: [120, 19, 4.5, 0, 0, 0], piece: 150, eaten: 0.7 },
  { match: /poulet/i, per100: [215, 18.6, 15, 0, 0, 0], piece: 1500, eaten: 0.7 },
  { match: /bœuf haché/i, per100: [215, 18, 15, 0, 0, 0] },
  { match: /rumsteck|faux-filet/i, per100: [150, 22, 6.5, 0, 0, 0] },
  { match: /chèvre/i, per100: [143, 27, 3, 0, 0, 0], eaten: 0.8 },
  { match: /mouton/i, per100: [230, 18, 17, 0, 0, 0] },
  { match: /porc/i, per100: [260, 17, 21, 0, 0, 0] },
  { match: /bœuf|zébu/i, per100: [190, 20, 12, 0, 0, 0] },
  // Poissons et crustacés.
  { match: /poisson fumé|mâchoiron fumé|guedj/i, per100: SMOKED_FISH, spoon: 8 },
  { match: /crevettes séchées/i, per100: [290, 60, 3, 2, 0, 0] },
  { match: /crevettes/i, per100: [85, 20, 0.5, 0, 0, 0] },
  { match: /thon/i, per100: [120, 25, 2, 0, 0, 0] },
  { match: /dorades ou bars/i, per100: [100, 18, 3, 0, 0, 0], piece: 500, eaten: 0.5 },
  { match: /poisson/i, per100: [100, 20, 2, 0, 0, 0], eaten: 0.8 },
  // Céréales, farines et féculents secs.
  { match: /farine de maïs/i, per100: [360, 7, 3, 76, 4, 1] },
  { match: /farine de teff/i, per100: [366, 13, 2.4, 73, 8, 1.8] },
  { match: /farine de blé/i, per100: [350, 10, 1.2, 73, 3, 1] },
  { match: /farine de pois chiches/i, per100: [387, 22, 6.7, 58, 11, 11] },
  { match: /farine de plantain/i, per100: [350, 3, 1, 82, 6, 8] },
  { match: /farine de foufou|attiéké|gari/i, per100: CASSAVA_FLOUR },
  { match: /chikwangue/i, per100: [150, 0.6, 0.2, 36, 1.5, 1], piece: 300 },
  { match: /pain de mie/i, per100: [270, 8, 4, 50, 3, 5] },
  { match: /fonio/i, per100: [360, 8, 1, 80, 2, 0] },
  { match: /couscous de mil|thiéré/i, per100: [365, 10, 4, 72, 6, 1] },
  { match: /riz/i, per100: [350, 7, 0.6, 78, 1.3, 0] },
  // Légumineuses.
  { match: /lentilles/i, per100: [340, 24, 1.5, 55, 11, 2] },
  { match: /haricots blancs à la sauce tomate/i, per100: [90, 5, 0.5, 15, 5, 5] },
  { match: /haricots verts/i, per100: [31, 1.8, 0.2, 7, 3.4, 3.3] },
  { match: /haricots|niébé/i, per100: [336, 23.5, 1.3, 60, 10.6, 6.9] },
  // Sucres et fruits secs.
  { match: /confiture|chutney/i, per100: [250, 0.4, 0.1, 62, 1, 58], spoon: 20 },
  { match: /raisins secs/i, per100: [300, 3, 0.5, 79, 4, 59] },
  { match: /sucre vanillé/i, per100: SUGAR, piece: 7.5 },
  { match: /sucre/i, per100: SUGAR, spoon: 12 },
  { match: /pain de singe|bouye/i, per100: [250, 3, 0.5, 30, 45, 25] },
  // Feuilles et herbes.
  { match: /ndolé|okok|eru/i, per100: DRY_LEAVES },
  { match: /moringa/i, per100: [205, 27, 2.3, 38, 19, 0] },
  { match: /feuilles de manioc/i, per100: [55, 4, 1, 8, 4, 0] },
  { match: /épinards|waterleaf|taro|brèdes|chou cavalier/i, per100: GREENS, piece: 250 },
  { match: /persil/i, per100: [36, 3, 0.8, 6, 3.3, 0.9], piece: 50 },
  { match: /basilic|coriandre/i, per100: [23, 2.5, 0.6, 3.7, 2.8, 0.9], piece: 50 },
  { match: /ciboule/i, per100: [30, 1.8, 0.2, 7, 2.6, 2], piece: 100 },
  { match: /gombo séché/i, per100: [280, 14, 2, 55, 25, 8], spoon: 8 },
  // Légumes et fruits frais (poids d'une pièce épluchée).
  { match: /gros oignons/i, per100: ONION, piece: 200 },
  { match: /oignons?/i, per100: ONION, piece: 110 },
  { match: /ail/i, per100: [149, 6.4, 0.5, 33, 2.1, 1], piece: 5 },
  { match: /gingembre/i, per100: [80, 1.8, 0.8, 18, 2, 1.7] },
  { match: /concentré de tomate/i, per100: [82, 4.3, 0.5, 19, 4, 12], spoon: 16 },
  { match: /tomates concassées/i, per100: [20, 1, 0.2, 3.5, 1, 3] },
  { match: /tomates?/i, per100: TOMATO, piece: 120 },
  { match: /poivrons?/i, per100: [26, 1, 0.3, 6, 2, 4], piece: 150 },
  { match: /piments?/i, per100: [40, 2, 0.4, 9, 1.5, 5], piece: 10 },
  { match: /carottes?/i, per100: [41, 0.9, 0.2, 9.6, 2.8, 4.7], piece: 100 },
  { match: /patates? douces?/i, per100: [86, 1.6, 0.1, 20, 3, 4.2], piece: 250 },
  { match: /pommes? de terre/i, per100: [77, 2, 0.1, 17, 2.2, 0.8], piece: 150 },
  { match: /chou/i, per100: [25, 1.3, 0.1, 5.8, 2.5, 3.2], piece: 1000 },
  { match: /aubergines? africaines?/i, per100: [25, 1, 0.2, 6, 3, 3.5], piece: 80 },
  { match: /aubergine/i, per100: [25, 1, 0.2, 6, 3, 3.5], piece: 300 },
  { match: /courgettes?/i, per100: [17, 1.2, 0.3, 3.1, 1, 2.5], piece: 200 },
  { match: /gombos?/i, per100: [33, 1.9, 0.2, 7, 3.2, 1.5], piece: 12 },
  { match: /manioc/i, per100: [160, 1.4, 0.3, 38, 1.8, 1.7], piece: 400 },
  { match: /bananes vertes|matoké/i, per100: [120, 1.3, 0.4, 31, 2.3, 3] },
  { match: /plantains?/i, per100: [122, 1.3, 0.4, 32, 2.3, 15], piece: 180 },
  { match: /ananas/i, per100: [50, 0.5, 0.1, 13, 1.4, 10], piece: 1000 },
  { match: /jus de citron/i, per100: [25, 0.4, 0.1, 8, 0.4, 1.7] },
  { match: /citrons? verts?/i, per100: [25, 0.4, 0.1, 8, 0.4, 1.7], piece: 40 },
  { match: /citron/i, per100: [25, 0.4, 0.1, 8, 0.4, 1.7], piece: 60 },
  { match: /moutarde/i, per100: [150, 7, 10, 5, 3, 2] },
  // Bouillons et assaisonnements.
  { match: /bouillon de volaille/i, per100: [5, 0.5, 0.2, 0.5, 0, 0] },
  { match: /cube de bouillon/i, per100: [250, 8, 18, 15, 0, 1], piece: 10 },
  { match: /berbéré|curry|curcuma|cumin|thym|muscade|poivre|assaisonnement|pèbè|mbongo/i, per100: SPICE, spoon: 7, piece: 1 },
];

/** Aliment correspondant à un ingrédient (undefined : ingrédient inconnu de la table). */
export function findFood(name: string) {
  return FOODS.find((f) => f.match.test(name));
}

/** Poids en grammes d'un ingrédient (null : quantité « à votre goût » ou inconnue). */
export function ingredientGrams(i: RecipeIngredient, food: Food): number | null {
  if (i.quantity === null) return null;
  const q = i.quantity;
  const spoon = food.spoon ?? 15;
  switch (i.unit) {
    case "g": return q;
    case "kg": return q * 1000;
    case "cl": return q * 10 * (food.density ?? 1);
    case "l": return q * 1000 * (food.density ?? 1);
    case "c. à soupe": return q * spoon;
    case "c. à café": return (q * spoon) / 3;
    case "pincée": return q * 0.5;
    case "sachet": return q * 7.5;
    case "boule": return q * (food.piece ?? 20);
    case "botte": return q * (food.piece ?? 100);
    case "cube": return q * 10;
    case "gousse":
    case "gousses": return q * (food.piece ?? 1);
    // Morceau de gingembre : environ 5 g par centimètre, « (3 cm) » dans le nom.
    case "morceau": return q * 5 * Number(i.name.match(/(\d+)\s*cm/)?.[1] ?? 3);
    case null: return q * (food.piece ?? 0);
    default: return null;
  }
}

export interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  sugar: number;
}

/** Valeurs estimées pour une personne (ingrédients facultatifs non comptés). */
export function recipeNutrition(recipe: Pick<Recipe, "ingredients" | "servings">): Nutrition {
  const total = [0, 0, 0, 0, 0, 0];
  for (const i of recipe.ingredients) {
    if (/facultatif/i.test(i.name)) continue;
    const food = findFood(i.name);
    if (!food) continue;
    const grams = ingredientGrams(i, food);
    if (!grams) continue;
    const eaten = grams * (food.eaten ?? 1);
    food.per100.forEach((v, k) => (total[k] += (v * eaten) / 100));
  }
  const [calories, protein, fat, carbohydrate, fiber, sugar] = total.map((v) => v / recipe.servings);
  return {
    calories: Math.round(calories / 10) * 10,
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbohydrate: Math.round(carbohydrate),
    fiber: Math.round(fiber),
    sugar: Math.round(sugar),
  };
}
