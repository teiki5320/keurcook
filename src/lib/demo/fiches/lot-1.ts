/**
 * Fiches détaillées des produits, lot 1 : Ustensiles de cuisson et de pilage (22 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - mortier-et-pilon-en-bois — Mortier et pilon en bois d'acacia
 *   - mortier-en-granit — Mortier et pilon en granit 14 cm
 *   - grand-mortier-granit-20-cm — Grand mortier et pilon en granit 20 cm (Cole & Mason)
 *   - mortier-granit-18-cm — Mortier et pilon en granit poli 18 cm (Cole & Mason)
 *   - mortier-granit-16-cm — Mortier et pilon en granit 16 cm, 400 ml
 *   - mortier-granit-socle-acacia — Mortier et pilon en granit sur socle en acacia 15,5 cm (ECENCE)
 *   - mortier-marbre-noir — Mortier et pilon en marbre noir 15 cm (Coninx)
 *   - mortier-marbre-blanc — Petit mortier et pilon en marbre blanc 11 cm (Silk Route Spice Company)
 *   - mortier-inox — Mortier et pilon en inox 13 cm (Mastrad)
 *   - petit-mortier-hetre — Petit mortier et pilon en bois de hêtre 10,5 cm (Wooden World)
 *   - marmite-en-aluminium — Marmite en aluminium type caldero
 *   - marmite-potjie — Marmite en fonte à trois pieds (potjie)
 *   - marmite-inox-13-litres — Marmite traiteur en inox 28 cm, 13,5 L (Baumalu)
 *   - faitout-en-fonte-d-aluminium — Faitout en fonte d'aluminium 28 cm
 *   - faitout-fonte-aluminium-36-cm — Grande marmite faitout en fonte d'aluminium 36 cm, 13 L (Kamberg)
 *   - faitout-inox-24-cm — Faitout en inox 18/10 24 cm (Beka Polo)
 *   - caldero-aluminium-7-litres — Caldero traditionnel en aluminium poli 7 L (IMUSA)
 *   - cocotte-staub-28-cm — Cocotte ronde en fonte 28 cm, 6,7 L (Staub)
 *   - cocotte-fonte-emaillee-28-cm — Cocotte ronde en fonte émaillée 28 cm, 6,6 L (Overmont)
 *   - cocotte-fonte-emaillee-4-litres — Cocotte ronde en fonte émaillée 4,1 L (Amazon Basics)
 *   - couscoussier — Couscoussier inox
 *   - plaque-a-injera — Plaque de cuisson électrique 30 cm
 */
import type { ProductDetail } from "../../types";

export const SLUGS = [
  "mortier-et-pilon-en-bois",
  "mortier-en-granit",
  "grand-mortier-granit-20-cm",
  "mortier-granit-18-cm",
  "mortier-granit-16-cm",
  "mortier-granit-socle-acacia",
  "mortier-marbre-noir",
  "mortier-marbre-blanc",
  "mortier-inox",
  "petit-mortier-hetre",
  "marmite-en-aluminium",
  "marmite-potjie",
  "marmite-inox-13-litres",
  "faitout-en-fonte-d-aluminium",
  "faitout-fonte-aluminium-36-cm",
  "faitout-inox-24-cm",
  "caldero-aluminium-7-litres",
  "cocotte-staub-28-cm",
  "cocotte-fonte-emaillee-28-cm",
  "cocotte-fonte-emaillee-4-litres",
  "couscoussier",
  "plaque-a-injera",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], ProductDetail>> = {
  // Fiche modèle (ustensile) : à prendre comme exemple pour la forme, jamais pour recopier des phrases.
  "mortier-en-granit": {
    origine:
      "Écraser des graines entre deux pierres est l'un des plus vieux gestes de la cuisine. En Afrique, le grand mortier en bois pile les tubercules et les céréales, tandis qu'une pierre plus petite travaille l'ail, le piment et les épices. Le granit, roche née du refroidissement lent d'un magma, est fait de grains de quartz, de feldspath et de mica soudés entre eux : dense et très dur, il écrase sans s'user.",
    choisir:
      "Le diamètre décide de l'usage. Avec 14 cm, ce mortier convient à une marinade pour quatre personnes ou à une poignée d'épices. Pour piler de grandes quantités de piment ou de feuilles, le [grand mortier en granit de 20 cm](/produit/grand-mortier-granit-20-cm) ou celui de [18 cm](/produit/mortier-granit-18-cm) offrent plus de place. Le [mortier en granit de 16 cm](/produit/mortier-granit-16-cm) est plus profond, pratique pour les préparations liquides.\n\nLe marbre, comme le [mortier en marbre noir](/produit/mortier-marbre-noir), est plus lisse et convient mieux aux herbes qu'aux graines dures. Le [mortier en inox](/produit/mortier-inox) ne garde aucune odeur et passe au lave-vaisselle. Le [mortier en bois d'acacia](/produit/mortier-et-pilon-en-bois), enfin, est le compagnon des arachides et des feuilles.",
    conserver:
      "Le granit est solide mais cassant : une chute sur un carrelage peut l'ébrécher ou fendre le pilon. Rangez-le sur une étagère basse plutôt qu'en hauteur, posé sur un torchon s'il glisse. Évitez aussi de le passer brutalement d'un liquide bouillant à l'eau froide.",
    remplacer:
      "Sans mortier, un hachoir ou un blender réduit vite l'ail, le gingembre et l'oignon, mais en coupant au lieu d'écraser : la pâte est moins parfumée. Pour quelques graines, placez-les dans un sac de congélation et roulez dessus avec une bouteille ou un rouleau à pâtisserie. Une gousse d'ail s'écrase aussi avec le plat d'un large couteau et une pincée de sel.",
    enCuisine:
      "Il prépare la pâte d'aromates du [pilau de Zanzibar](/recette/pilau) et du [romazava](/recette/romazava) malgache, la marinade du [poulet yassa](/recette/poulet-yassa) ou le mélange d'épices du [suya de bœuf](/recette/suya). Pour choisir entre bois et pierre, lisez [Mortier en bois ou en pierre : lequel choisir ?](/conseils/mortier-bois-ou-pierre), et pour bien relever vos pâtes, [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Quelle taille de mortier en granit choisir ?",
        reponse:
          "Un mortier de 14 cm suffit pour la cuisine de tous les jours d'une famille. Au-delà de 18 cm, il devient intéressant si vous pilez souvent de grosses quantités.",
      },
      {
        question: "Peut-on mettre un mortier en granit au lave-vaisselle ?",
        reponse:
          "Mieux vaut s'en tenir au rinçage à l'eau chaude : le détergent peut laisser un goût, et un choc dans le panier risque de l'ébrécher.",
      },
    ],
  },
};
