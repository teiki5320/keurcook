/**
 * Données de démonstration : 10 produits CBD + 6 accessoires.
 *
 * Elles servent :
 *  - de catalogue de secours quand Supabase n'est pas configuré (mode démo) ;
 *  - de source pour générer `supabase/seed.sql` (npm run db:seed-sql).
 *
 * Producteurs, certificats et références sont FICTIFS. Les textes ne
 * contiennent volontairement aucune allégation thérapeutique ou médicale.
 */
import type { Category, Product, Variant } from "../types";

const id = (prefix: string, n: number) =>
  `${prefix}0000000-0000-4000-a000-${n.toString(16).padStart(12, "0")}`;

export const demoCategories: Category[] = [
  { id: id("1", 1), slug: "fleurs", name: "Fleurs", kind: "cbd", position: 1, description: "Fleurs de chanvre françaises, séchées et affinées lentement." },
  { id: id("1", 2), slug: "resines", name: "Résines", kind: "cbd", position: 2, description: "Résines obtenues par tamisage à sec ou pression, selon des méthodes artisanales." },
  { id: id("1", 3), slug: "huiles", name: "Huiles", kind: "cbd", position: 3, description: "Huiles de chanvre à spectre complet ou large, en flacon compte-gouttes." },
  { id: id("1", 4), slug: "infusions", name: "Infusions", kind: "cbd", position: 4, description: "Mélanges de plantes et de chanvre pour des infusions parfumées." },
  { id: id("1", 5), slug: "cosmetiques", name: "Cosmétiques", kind: "cbd", position: 5, description: "Soins pour le corps formulés avec des extraits de chanvre." },
  { id: id("1", 6), slug: "grinders", name: "Grinders", kind: "accessoire", position: 6, description: "Grinders en aluminium, en bois ou en métal." },
  { id: id("1", 7), slug: "vaporisateurs", name: "Vaporisateurs", kind: "accessoire", position: 7, description: "Vaporisateurs pour herbes sèches." },
  { id: id("1", 8), slug: "feuilles", name: "Feuilles & filtres", kind: "accessoire", position: 8, description: "Feuilles non blanchies, filtres et tips." },
  { id: id("1", 9), slug: "conservation", name: "Boîtes de conservation", kind: "accessoire", position: 9, description: "Bocaux et boîtes pour conserver vos produits à l'abri de la lumière." },
];

const cat = (slug: string) => demoCategories.find((c) => c.slug === slug)!.id;

let variantCounter = 0;
function variants(productId: string, list: Array<[label: string, priceCents: number, stock: number]>): Variant[] {
  return list.map(([label, priceCents, stock], position) => {
    variantCounter += 1;
    return {
      id: id("3", variantCounter),
      productId,
      label,
      priceCents,
      stock,
      sku: `AH-${variantCounter.toString().padStart(4, "0")}`,
      position,
    };
  });
}

type ProductSeed = Omit<Product, "variants" | "id" | "createdAt" | "isActive" | "images" | "coaUrl"> & {
  variants: Array<[string, number, number]>;
};

const seeds: ProductSeed[] = [
  // ------------------------------------------------------------------ CBD
  {
    slug: "fleur-amnesia-du-luberon",
    name: "Amnesia du Luberon",
    categoryId: cat("fleurs"),
    shortDescription: "Fleur cultivée en plein champ, notes citronnées et poivrées.",
    description:
      "Cultivée en plein champ sur les coteaux du Luberon, cette fleur est récoltée à la main puis séchée lentement dans un séchoir ventilé. Ses têtes compactes dégagent un parfum de zeste de citron et de poivre blanc, avec une finale légèrement boisée.\n\nConditionnée en sachet opaque refermable pour préserver ses arômes.",
    cbdRate: 11.5,
    thcRate: 0.19,
    originRegion: "Provence-Alpes-Côte d'Azur",
    producer: "Les Champs de Lure (fictif)",
    tags: ["plein champ", "agrumes"],
    featured: true,
    variants: [["2 g", 1400, 40], ["5 g", 3000, 25], ["10 g", 5500, 12]],
  },
  {
    slug: "fleur-gorilla-des-cevennes",
    name: "Gorilla des Cévennes",
    categoryId: cat("fleurs"),
    shortDescription: "Culture sous serre, arômes terreux et notes de pin.",
    description:
      "Issue d'une culture sous serre à lumière naturelle dans les Cévennes, cette fleur présente des têtes denses et résineuses. Au nez : sous-bois, aiguilles de pin et une touche de cacao.\n\nSéchage lent de trois semaines et affinage en bocal de verre.",
    cbdRate: 14.2,
    thcRate: 0.24,
    originRegion: "Occitanie",
    producer: "Serres du Mont Aigoual (fictif)",
    tags: ["sous serre", "boisé"],
    featured: true,
    variants: [["2 g", 1600, 30], ["5 g", 3500, 20], ["10 g", 6400, 8]],
  },
  {
    slug: "fleur-harlequin-d-alsace",
    name: "Harlequin d'Alsace",
    categoryId: cat("fleurs"),
    shortDescription: "Fleur indoor aux notes fruitées de mangue et de pêche.",
    description:
      "Cultivée en intérieur par un petit producteur alsacien, cette fleur se distingue par ses notes fruitées (mangue, pêche blanche) et une texture aérée. Taillée à la main, sans pulvérisation ni ajout d'aucune sorte.",
    cbdRate: 9.8,
    thcRate: 0.12,
    originRegion: "Grand Est",
    producer: "Ferme du Haut-Koenigsbourg (fictif)",
    tags: ["indoor", "fruité"],
    featured: false,
    variants: [["2 g", 1300, 50], ["5 g", 2900, 30]],
  },
  {
    slug: "resine-pollen-de-bretagne",
    name: "Pollen de Bretagne",
    categoryId: cat("resines"),
    shortDescription: "Pollen tamisé à sec, texture friable et parfum épicé.",
    description:
      "Obtenue par tamisage à sec de fleurs bretonnes, cette résine offre une texture friable et un parfum d'épices douces et de foin coupé. Pressée légèrement à froid, sans ajout d'aucune substance.",
    cbdRate: 22,
    thcRate: 0.21,
    originRegion: "Bretagne",
    producer: "Chanvrière de l'Argoat (fictif)",
    tags: ["tamisage à sec"],
    featured: true,
    variants: [["1 g", 1100, 40], ["3 g", 3000, 25], ["5 g", 4600, 10]],
  },
  {
    slug: "resine-ice-o-lator-des-alpes",
    name: "Ice-O-Lator des Alpes",
    categoryId: cat("resines"),
    shortDescription: "Extraction à l'eau glacée, notes de résine de pin.",
    description:
      "Extraite à l'eau glacée selon une méthode artisanale, cette résine savoyarde révèle des arômes de résine de pin et de miel de montagne. Consistance souple et malléable.",
    cbdRate: 28,
    thcRate: 0.26,
    originRegion: "Auvergne-Rhône-Alpes",
    producer: "Alpages du Beaufortain (fictif)",
    tags: ["ice-o-lator"],
    featured: false,
    variants: [["1 g", 1400, 25], ["3 g", 3900, 12]],
  },
  {
    slug: "huile-cbd-10-spectre-complet",
    name: "Huile CBD 10 % spectre complet",
    categoryId: cat("huiles"),
    shortDescription: "Extrait de chanvre français dans une huile de chanvre bio.",
    description:
      "Extrait de chanvre à spectre complet dilué dans une huile de graines de chanvre biologique pressée à froid. Flacon en verre ambré avec pipette graduée.\n\nComposition : huile de graines de chanvre (Cannabis sativa) biologique, extrait de chanvre.\n\nLire attentivement l'étiquette avant utilisation. Conserver à l'abri de la lumière et de la chaleur.",
    cbdRate: 10,
    thcRate: 0.2,
    originRegion: "Nouvelle-Aquitaine",
    producer: "Huilerie du Périgord Vert (fictif)",
    tags: ["bio", "spectre complet"],
    featured: true,
    variants: [["10 ml", 3900, 35], ["30 ml", 9900, 15]],
  },
  {
    slug: "huile-cbd-20-spectre-large",
    name: "Huile CBD 20 % spectre large",
    categoryId: cat("huiles"),
    shortDescription: "Spectre large, huile de tournesol française, goût neutre.",
    description:
      "Extrait de chanvre à spectre large dilué dans une huile de tournesol française. Goût neutre, flacon en verre ambré de 10 ml avec pipette graduée.\n\nComposition : huile de tournesol, extrait de chanvre.\n\nLire attentivement l'étiquette avant utilisation.",
    cbdRate: 20,
    thcRate: 0.0,
    originRegion: "Centre-Val de Loire",
    producer: "Domaine de la Sologne (fictif)",
    tags: ["spectre large"],
    featured: false,
    variants: [["10 ml", 6900, 20]],
  },
  {
    slug: "infusion-verveine-chanvre",
    name: "Infusion Verveine & Chanvre",
    categoryId: cat("infusions"),
    shortDescription: "Feuilles de chanvre, verveine citronnée et tilleul.",
    description:
      "Mélange de feuilles de chanvre, de verveine citronnée et de tilleul cultivés dans la Drôme. Infuser 5 minutes dans une eau frémissante pour une tasse aux notes florales et citronnées.\n\nIngrédients : feuilles de chanvre, verveine, tilleul.",
    cbdRate: 1.5,
    thcRate: 0.05,
    originRegion: "Auvergne-Rhône-Alpes",
    producer: "Jardins de la Drôme (fictif)",
    tags: ["infusion", "plantes"],
    featured: true,
    variants: [["30 g", 1200, 60], ["80 g", 2800, 25]],
  },
  {
    slug: "baume-corps-chanvre-lavande",
    name: "Baume corps Chanvre & Lavande",
    categoryId: cat("cosmetiques"),
    shortDescription: "Baume nourrissant au beurre de karité et à la lavande de Provence.",
    description:
      "Baume onctueux formulé à partir de beurre de karité, d'huile de chanvre et d'huile essentielle de lavande de Provence. Texture fondante, parfum délicatement floral.\n\nUsage externe uniquement. Éviter le contour des yeux. Pot en verre de 50 ml.",
    cbdRate: 1,
    thcRate: 0.0,
    originRegion: "Provence-Alpes-Côte d'Azur",
    producer: "Savonnerie du Ventoux (fictif)",
    tags: ["cosmétique", "lavande"],
    featured: false,
    variants: [["50 ml", 2400, 30]],
  },
  {
    slug: "huile-de-massage-chanvre",
    name: "Huile de massage au chanvre",
    categoryId: cat("cosmetiques"),
    shortDescription: "Huile sèche pour le corps, parfum d'amande douce.",
    description:
      "Huile sèche pour le corps associant huile de chanvre, huile d'amande douce et vitamine E. Pénètre rapidement sans laisser de film gras.\n\nUsage externe uniquement. Flacon pompe de 100 ml.",
    cbdRate: 0.5,
    thcRate: 0.0,
    originRegion: "Normandie",
    producer: "Atelier du Bocage (fictif)",
    tags: ["cosmétique"],
    featured: false,
    variants: [["100 ml", 2900, 20]],
  },
  // ---------------------------------------------------------- Accessoires
  {
    slug: "grinder-aluminium-4-parties",
    name: "Grinder aluminium 4 parties",
    categoryId: cat("grinders"),
    shortDescription: "Aluminium anodisé, dents en losange, tamis à pollen.",
    description:
      "Grinder en aluminium anodisé de 55 mm, 4 parties avec tamis inox et racloir inclus. Fermeture aimantée.",
    cbdRate: null,
    thcRate: null,
    originRegion: null,
    producer: null,
    tags: ["aluminium"],
    featured: true,
    variants: [["Vert sauge", 2200, 20], ["Noir", 2200, 15]],
  },
  {
    slug: "grinder-bois-d-olivier",
    name: "Grinder en bois d'olivier",
    categoryId: cat("grinders"),
    shortDescription: "Tourné à la main dans du bois d'olivier, 2 parties.",
    description:
      "Grinder 2 parties tourné dans du bois d'olivier, dents métalliques et couvercle aimanté. Chaque pièce est unique.",
    cbdRate: null,
    thcRate: null,
    originRegion: "Provence-Alpes-Côte d'Azur",
    producer: "Tournerie des Alpilles (fictif)",
    tags: ["bois", "artisanal"],
    featured: false,
    variants: [["Ø 50 mm", 3400, 8]],
  },
  {
    slug: "vaporisateur-portable-herbes-seches",
    name: "Vaporisateur portable herbes sèches",
    categoryId: cat("vaporisateurs"),
    shortDescription: "Chauffe par convection, 4 niveaux de température, USB-C.",
    description:
      "Vaporisateur portable pour herbes sèches, chauffe par convection, chambre en céramique et 4 réglages de température (170 à 210 °C). Batterie rechargeable en USB-C. Garantie 2 ans.",
    cbdRate: null,
    thcRate: null,
    originRegion: null,
    producer: null,
    tags: ["électronique"],
    featured: true,
    variants: [["Graphite", 11900, 10]],
  },
  {
    slug: "feuilles-slim-non-blanchies",
    name: "Feuilles slim non blanchies + filtres",
    categoryId: cat("feuilles"),
    shortDescription: "Papier non blanchi, gomme arabique, carnet de filtres carton.",
    description: "Carnet de 32 feuilles slim non blanchies avec 32 filtres en carton non blanchi.",
    cbdRate: null,
    thcRate: null,
    originRegion: null,
    producer: null,
    tags: ["papier"],
    featured: false,
    variants: [["1 carnet", 250, 200], ["Boîte de 24", 4800, 20]],
  },
  {
    slug: "bocal-verre-anti-uv",
    name: "Bocal en verre anti-UV",
    categoryId: cat("conservation"),
    shortDescription: "Verre violet filtrant les UV, couvercle à vis hermétique.",
    description:
      "Bocal en verre violet qui filtre la lumière visible et UV pour préserver les arômes. Couvercle à vis hermétique.",
    cbdRate: null,
    thcRate: null,
    originRegion: null,
    producer: null,
    tags: ["verre"],
    featured: false,
    variants: [["100 ml", 1500, 30], ["250 ml", 2100, 20]],
  },
  {
    slug: "boite-conservation-bambou",
    name: "Boîte de conservation en bambou",
    categoryId: cat("conservation"),
    shortDescription: "Bambou et verre, compartiment aimanté.",
    description:
      "Boîte en bambou avec couvercle aimanté, compartiment intérieur en verre et plateau de préparation amovible.",
    cbdRate: null,
    thcRate: null,
    originRegion: null,
    producer: null,
    tags: ["bambou"],
    featured: false,
    variants: [["Taille unique", 2900, 12]],
  },
];

export const demoProducts: Product[] = seeds.map((seed, index) => {
  const productId = id("2", index + 1);
  const category = demoCategories.find((c) => c.id === seed.categoryId)!;
  return {
    ...seed,
    id: productId,
    images: [`/demo/${seed.slug}.svg`],
    coaUrl: category.kind === "cbd" ? `/coa/${seed.slug}.pdf` : null,
    isActive: true,
    createdAt: new Date(Date.UTC(2026, 0, 1 + index)).toISOString(),
    variants: variants(productId, seed.variants),
  };
});
