/**
 * Fiches détaillées des produits, lot 2 : Mixeurs, petits ustensiles, service et thé (26 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - blender-ninja-detect-3-en-1 — Blender Detect 3-en-1 1200 W, pichet 2 L, bol et gobelet (Ninja)
 *   - blender-amzchef-2000w — Blender professionnel 2000 W, bol 2 L (AMZCHEF)
 *   - blender-springlane-hanno-2000w — Blender Hanno 2000 W avec bol inox pour purées de noix (Springlane)
 *   - blender-magimix-power-4 — Blender Power 4, 1300 W, bol en verre 1,8 L (Magimix)
 *   - blender-moulinex-perfectmix — Blender PerfectMix Plus 1200 W, bol en verre 2 L (Moulinex)
 *   - blender-philips-5000 — Blender 5000 ProBlend Plus 1000 W, bol 2 L (Philips)
 *   - blender-moulinex-blendforce — Blender Blendforce 800 W, bol en verre 1,75 L (Moulinex)
 *   - robot-moulinex-easy-force — Robot multifonction compact Easy Force 800 W, bol 3 L (Moulinex)
 *   - mixeur-plongeant-moulinex-daily-chef — Mixeur plongeant Daily Chef 600 W (Moulinex)
 *   - hachoir-h-koenig-leo8 — Mini hachoir électrique LEO8, bol en verre 1 L (H.Koenig)
 *   - tamis-en-bois — Tamis en bois 24 cm maille fine
 *   - passoire-a-couscous — Passoire à couscous 23 cm
 *   - araignee-a-friture — Araignée à friture 14 cm
 *   - spatules-en-bois — Spatules en bois (lot de 8)
 *   - brochettes-en-metal — Brochettes en métal 40 cm (lot de 30)
 *   - feuilles-de-bananier-fraiches — Feuilles de bananier fraîches (lot de 100)
 *   - saladier-en-bois — Grand saladier en bois d'acacia 26 cm
 *   - saladiers-acacia-lot-de-2 — Lot de 2 saladiers en bois d'acacia 20 cm, 760 ml
 *   - plateau-acacia-amazon-basics — Plateau de service en bois d'acacia 43 × 30 cm (Amazon Basics)
 *   - plateau-rond-bambou-40-cm — Plateau de service rond en bambou 40 cm (5five)
 *   - bols-manguier-lot-de-3 — Lot de 3 bols ronds en bois de manguier (Samhita)
 *   - bols-noix-de-coco-lot-de-2 — Lot de 2 bols en noix de coco avec cuillères (Jungle Culture)
 *   - verres-a-the — Verres à thé facettés 210 ml (lot de 6)
 *   - verres-a-the-et-soucoupes-pasabahce — Lot de 6 verres à thé et 6 soucoupes Aurora (Pasabahce)
 *   - theiere-a-ataya — Théière à ataya inox 1,2 L
 *   - bouilloire-emaillee — Bouilloire émaillée 2,4 L
 */
import type { ProductDetail } from "../../types";

export const SLUGS = [
  "blender-ninja-detect-3-en-1",
  "blender-amzchef-2000w",
  "blender-springlane-hanno-2000w",
  "blender-magimix-power-4",
  "blender-moulinex-perfectmix",
  "blender-philips-5000",
  "blender-moulinex-blendforce",
  "robot-moulinex-easy-force",
  "mixeur-plongeant-moulinex-daily-chef",
  "hachoir-h-koenig-leo8",
  "tamis-en-bois",
  "passoire-a-couscous",
  "araignee-a-friture",
  "spatules-en-bois",
  "brochettes-en-metal",
  "feuilles-de-bananier-fraiches",
  "saladier-en-bois",
  "saladiers-acacia-lot-de-2",
  "plateau-acacia-amazon-basics",
  "plateau-rond-bambou-40-cm",
  "bols-manguier-lot-de-3",
  "bols-noix-de-coco-lot-de-2",
  "verres-a-the",
  "verres-a-the-et-soucoupes-pasabahce",
  "theiere-a-ataya",
  "bouilloire-emaillee",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], ProductDetail>> = {
};
