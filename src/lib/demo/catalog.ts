/**
 * Données de démonstration : produits africains rares (épicerie).
 *
 * Elles servent :
 *  - de catalogue de secours quand la base de données n'est pas configurée (mode démo) ;
 *  - de source pour générer `db/seed.sql` (npm run db:seed-sql).
 *
 * Les textes décrivent les produits de façon générale : l'achat se fait sur des
 * fiches Amazon.fr de vendeurs tiers. Ils ne contiennent volontairement aucune
 * allégation de santé.
 */
import type { Category, Product, Variant } from "../types";
import { nouveauxProduits } from "./catalog-nouveautes";

const id = (prefix: string, n: number) =>
  `${prefix}0000000-0000-4000-a000-${n.toString(16).padStart(12, "0")}`;

export const demoCategories: Category[] = [
  { id: id("1", 1), slug: "epices", name: "Épices & aromates", position: 1, description: "Poivres, graines, condiments et mélanges d'épices des cuisines africaines, souvent introuvables en grande surface." },
  { id: id("1", 2), slug: "cereales", name: "Farines & céréales", position: 2, description: "Fonio, attiéké, couscous de mil : les céréales anciennes et les semoules du continent." },
  { id: id("1", 3), slug: "feuilles", name: "Feuilles & fleurs séchées", position: 3, description: "Feuilles de ndolé, de manioc ou de moringa, fleurs d'hibiscus : les feuilles et fleurs des sauces et des boissons africaines." },
  { id: id("1", 4), slug: "poissons", name: "Poissons & fumés", position: 4, description: "Poissons séchés, fumés ou fermentés et crevettes séchées, les exhausteurs de goût de la cuisine africaine." },
  { id: id("1", 5), slug: "huiles", name: "Huiles & pâtes", position: 5, description: "Huile de palme rouge, pâte d'arachide, pulpe de noix de palme : la base des grandes sauces." },
  { id: id("1", 8), slug: "snacks", name: "Snacks & fruits secs", position: 6, description: "Chips de plantain, dattes, souchet, biltong, bitter kola : de quoi grignoter à l'africaine." },
  { id: id("1", 6), slug: "cafes-thes", name: "Cafés & thés", position: 7, description: "Cafés d'Éthiopie, du Kenya ou du Rwanda, rooibos, kinkeliba et thé vert pour l'ataya : les boissons chaudes du continent." },
  { id: id("1", 7), slug: "ustensiles", name: "Ustensiles", position: 8, description: "Mortiers, couscoussiers, marmites, théières : le matériel pour cuisiner et servir les plats africains." },
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

type ProductSeed = Omit<Product, "variants" | "id" | "createdAt" | "isActive" | "images" | "amazonAsin"> & {
  variants: Array<[string, number, number]>;
};

const seeds: ProductSeed[] = [
  // ----------------------------------------------------- Épices & aromates
  {
    slug: "poivre-de-penja",
    name: "Poivre blanc de Penja",
    categoryId: cat("epices"),
    shortDescription: "Poivre blanc de la région de Penja, au Cameroun, au piquant franc et aux notes boisées et musquées.",
    description:
      "Le poivre de Penja est cultivé dans la région de Penja, au Cameroun, qui a donné son nom à cette appellation. Le poivre blanc est obtenu à partir de baies mûres débarrassées de leur enveloppe : il offre un piquant net et des notes boisées et musquées.\n\nDans la cuisine camerounaise, il relève le poisson braisé, le ndolé et les viandes grillées. Il se moud de préférence au dernier moment.",
    originCountry: "Cameroun",
    originRegion: "Penja",
    producer: null,
    composition: "Poivre blanc en grains (Piper nigrum).",
    allergens: [],
    usageTips: "Moudre en fin de cuisson sur les poissons braisés, le ndolé ou les viandes grillées pour garder tout son parfum.",
    conservation: "Au sec, à l'abri de la lumière, dans un contenant fermé.",
    tags: ["poivre", "Cameroun"],
    featured: true,
    variants: [["50 g", 890, 40], ["100 g", 1590, 25]],
  },
  {
    slug: "soumbala",
    name: "Soumbala (nététou)",
    categoryId: cat("epices"),
    shortDescription: "Graines de néré fermentées, le condiment de caractère des sauces d'Afrique de l'Ouest et du Sahel.",
    description:
      "Le soumbala, appelé nététou au Sénégal, est obtenu à partir des graines de néré, un arbre des savanes d'Afrique de l'Ouest, cuites puis fermentées. Il se présente en boules, en galettes ou en poudre, et dégage une odeur puissante.\n\nUtilisé en petite quantité, il donne au mafé, au riz gras et aux sauces feuilles un goût profond et savoureux, proche de l'umami.",
    originCountry: "Afrique de l'Ouest",
    originRegion: null,
    producer: null,
    composition: "Graines de néré (Parkia biglobosa) fermentées ; peut contenir du sel selon la préparation, voir l'étiquette.",
    allergens: [],
    usageTips: "Écraser un petit morceau dans le mafé, les sauces feuilles ou le riz gras en début de cuisson : une petite quantité suffit.",
    conservation: "Au sec, dans une boîte hermétique, car son odeur est puissante.",
    tags: ["fermenté", "umami"],
    featured: true,
    variants: [["100 g", 690, 30], ["250 g", 1490, 15]],
  },
  {
    slug: "berbere",
    name: "Berbéré d'Éthiopie",
    categoryId: cat("epices"),
    shortDescription: "Le mélange d'épices rouge et relevé de la cuisine éthiopienne, base des wats mijotés.",
    description:
      "Le berbéré est le mélange d'épices emblématique de la cuisine éthiopienne. Sa composition varie selon les recettes, mais on y trouve le plus souvent du piment, du fenugrec, du gingembre, de l'ail et des épices chaudes comme le clou de girofle.\n\nIl parfume et colore les wats, ces ragoûts mijotés servis sur l'injera : doro wat au poulet, misir wat aux lentilles corail.",
    originCountry: "Éthiopie",
    originRegion: null,
    producer: null,
    composition: "Mélange d'épices à base de piment ; composition exacte selon la marque, voir l'étiquette.",
    allergens: [],
    usageTips: "Base du doro wat et du misir wat : faire revenir le berbéré dans le beurre ou l'huile avec les oignons avant d'ajouter les autres ingrédients.",
    conservation: "Au sec, à l'abri de la lumière, dans un contenant fermé.",
    tags: ["mélange", "piquant"],
    featured: false,
    variants: [["80 g", 790, 30]],
  },
  {
    slug: "yaji-suya",
    name: "Yaji, épices à suya",
    categoryId: cat("epices"),
    shortDescription: "Le mélange arachide-piment qui enrobe le suya, la brochette grillée vendue dans les rues du Nigeria.",
    description:
      "Le yaji est le mélange d'épices qui enrobe le suya, la brochette de viande grillée vendue dans les rues du Nigeria. Il associe généralement de l'arachide grillée moulue (kuli-kuli), du piment, du gingembre et d'autres épices.\n\nIl donne à la viande un enrobage relevé et légèrement croustillant ; on l'utilise aussi sur le poulet, le poisson ou les légumes grillés.",
    originCountry: "Nigeria",
    originRegion: null,
    producer: null,
    composition: "Arachide grillée moulue, piment, épices ; composition exacte selon la marque, voir l'étiquette.",
    allergens: ["arachide"],
    usageTips: "Frotter la viande avec le yaji avant de la griller, puis en saupoudrer à la sortie du feu.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["grillade", "piquant"],
    featured: true,
    variants: [["100 g", 790, 25]],
  },
  {
    slug: "poivre-de-selim",
    name: "Poivre de Selim (djar)",
    categoryId: cat("epices"),
    shortDescription: "Gousses sombres aux notes fumées, résineuses et musquées, qui parfument le café Touba et les bouillons.",
    description:
      "Le poivre de Selim est le fruit du Xylopia aethiopica, un arbre d'Afrique tropicale. Ses longues gousses sombres, appelées djar au Sénégal, ont un parfum résineux, musqué et poivré.\n\nAu Sénégal, il est torréfié avec le café pour donner le café Touba ; ailleurs en Afrique de l'Ouest et centrale, il parfume les bouillons, les soupes et les marinades.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Gousses de poivre de Selim (Xylopia aethiopica).",
    allergens: [],
    usageTips: "Écraser les gousses et les infuser dans les bouillons, ou les moudre avec le café.",
    conservation: "Au sec, à l'abri de la lumière, dans un contenant fermé.",
    tags: ["épice", "gousses"],
    featured: false,
    variants: [["50 g", 690, 30]],
  },
  // ---------------------------------------------------- Farines & céréales
  {
    slug: "fonio",
    name: "Fonio précuit",
    categoryId: cat("cereales"),
    shortDescription: "Petite céréale d'Afrique de l'Ouest à la cuisson rapide et au goût léger, pour accompagner les sauces.",
    description:
      "Le fonio est une toute petite céréale cultivée depuis très longtemps en Afrique de l'Ouest, notamment au Mali, en Guinée, au Burkina Faso et au Sénégal. Ses grains très fins cuisent en quelques minutes.\n\nSon goût léger, entre noisette et semoule, en fait un accompagnement pour les sauces ; on le prépare aussi en salade ou en version sucrée.",
    originCountry: "Afrique de l'Ouest",
    originRegion: null,
    producer: null,
    composition: "Fonio (Digitaria exilis).",
    allergens: [],
    usageTips: "Suivre le temps de cuisson indiqué sur l'emballage : en général, cuire à la vapeur ou dans l'eau bouillante salée, couvrir quelques minutes puis égrener à la fourchette.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["céréale ancienne"],
    featured: true,
    variants: [["500 g", 590, 50], ["1 kg", 990, 30]],
  },
  {
    slug: "attieke-sec",
    name: "Attiéké déshydraté",
    categoryId: cat("cereales"),
    shortDescription: "La semoule de manioc fermenté de Côte d'Ivoire, en version séchée à réhydrater en quelques minutes.",
    description:
      "L'attiéké est une semoule de manioc fermenté au goût légèrement acidulé, emblématique de la cuisine ivoirienne. La version déshydratée se conserve longtemps et se réhydrate en quelques minutes.\n\nIl accompagne traditionnellement le poisson braisé ou frit, avec des oignons, de la tomate et du piment.",
    originCountry: "Côte d'Ivoire",
    originRegion: null,
    producer: null,
    composition: "Manioc fermenté, séché.",
    allergens: [],
    usageTips: "Suivre les indications de l'emballage : en général, humidifier, laisser gonfler quelques minutes puis réchauffer à la vapeur. Servir avec oignons, tomates et piment.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["manioc", "fermenté"],
    featured: false,
    variants: [["500 g", 490, 40], ["1 kg", 890, 20]],
  },
  {
    slug: "couscous-de-mil",
    name: "Couscous de mil (thiéré)",
    categoryId: cat("cereales"),
    shortDescription: "Couscous de mil pour le thiéré et le thiakry, deux classiques de la cuisine sénégalaise.",
    description:
      "Au Sénégal, la farine de mil est roulée en petits grains puis cuite à la vapeur pour donner le thiéré, un couscous au goût plus rustique que la semoule de blé.\n\nIl accompagne les plats en sauce comme le thiéré mbuum et sert aussi au thiakry, un dessert au lait caillé.",
    originCountry: "Sénégal",
    originRegion: null,
    producer: null,
    composition: "Mil ; voir l'étiquette pour la composition exacte.",
    allergens: [],
    usageTips: "Cuire à la vapeur, de préférence en deux fois, en égrenant les grains entre les deux cuissons.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["mil"],
    featured: false,
    variants: [["500 g", 550, 30]],
  },
  // -------------------------------------------- Feuilles & fleurs séchées
  {
    slug: "feuilles-de-ndole",
    name: "Feuilles de ndolé séchées",
    categoryId: cat("feuilles"),
    shortDescription: "Feuilles de ndolé séchées pour préparer le plat du même nom, emblème de la cuisine camerounaise.",
    description:
      "Le ndolé désigne à la fois une plante aux feuilles amères (Vernonia) et le plat camerounais qu'on en tire, cuisiné avec des arachides, de la viande, du poisson ou des crevettes. Séchées, les feuilles se conservent longtemps.\n\nAvant la cuisson, on les réhydrate et on les rince pour atténuer leur amertume, puis on les fait mijoter dans la sauce d'arachide.",
    originCountry: "Cameroun",
    originRegion: null,
    producer: null,
    composition: "Feuilles de Vernonia séchées.",
    allergens: [],
    usageTips: "Réhydrater dans l'eau tiède, rincer plusieurs fois puis presser avant de cuisiner, en suivant aussi les indications de l'emballage.",
    conservation: "Au sec, à l'abri de la lumière.",
    tags: ["feuilles", "Cameroun"],
    featured: true,
    variants: [["100 g", 790, 30], ["250 g", 1790, 15]],
  },
  {
    slug: "feuilles-de-manioc",
    name: "Feuilles de manioc pilées (pondu, ravitoto)",
    categoryId: cat("feuilles"),
    shortDescription: "Feuilles de manioc pilées en conserve, prêtes à cuisiner pour le pondu, le saka-saka ou le ravitoto.",
    description:
      "Les feuilles de manioc pilées sont la base du pondu (ou saka-saka) des deux Congo et du ravitoto malgache. En conserve ou en bocal, elles sont déjà pilées et prêtes à être cuisinées.\n\nOn les fait mijoter avec de l'huile de palme, de l'oignon, de l'ail et souvent du poisson fumé ; à Madagascar, le ravitoto se cuisine avec de la viande de porc.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Feuilles de manioc pilées ; voir l'étiquette pour la composition exacte.",
    allergens: [],
    usageTips: "Faire mijoter avec l'huile de palme, les aromates et le poisson ou la viande, en suivant le temps de cuisson indiqué sur l'emballage.",
    conservation: "Tant que le contenant est fermé : à température ambiante. Une fois entamé : au frais, dans un récipient fermé, et à utiliser rapidement.",
    tags: ["feuilles", "manioc"],
    featured: false,
    variants: [["200 g", 690, 30]],
  },
  {
    slug: "fleurs-de-bissap",
    name: "Fleurs de bissap",
    categoryId: cat("feuilles"),
    shortDescription: "Calices d'hibiscus séchés pour préparer le bissap, la boisson rouge rubis d'Afrique de l'Ouest.",
    description:
      "Les fleurs de bissap sont les calices séchés de l'Hibiscus sabdariffa. Infusés, ils donnent une boisson d'un rouge profond, au goût acidulé et fruité, très populaire en Afrique de l'Ouest, notamment au Sénégal.\n\nLe bissap se sert sucré et bien frais, parfumé à la menthe, à la vanille ou à la fleur d'oranger ; les fleurs entrent aussi dans certaines sauces et confitures.",
    originCountry: "Afrique de l'Ouest",
    originRegion: null,
    producer: null,
    composition: "Calices d'Hibiscus sabdariffa séchés.",
    allergens: [],
    usageTips: "Infuser à froid une nuit ou à chaud 10 minutes, filtrer, sucrer et parfumer à la menthe ou à la fleur d'oranger.",
    conservation: "Au sec, à l'abri de la lumière.",
    tags: ["boisson", "hibiscus"],
    featured: true,
    variants: [["100 g", 490, 60], ["250 g", 990, 30]],
  },
  // ----------------------------------------------------- Poissons & fumés
  {
    slug: "guedj",
    name: "Guedj (poisson séché fermenté)",
    categoryId: cat("poissons"),
    shortDescription: "Poisson fermenté puis séché, utilisé en petite quantité pour donner du goût au thiéboudienne.",
    description:
      "Le guedj est un poisson fermenté puis séché, très utilisé dans la cuisine sénégalaise. Son odeur est puissante, c'est normal : on n'en utilise qu'un petit morceau.\n\nIl donne au thiéboudienne, au yassa et à de nombreuses sauces un goût profond et iodé.",
    originCountry: "Sénégal",
    originRegion: null,
    producer: null,
    composition: "Poisson fermenté et séché ; peut contenir du sel, voir l'étiquette.",
    allergens: ["poisson"],
    usageTips: "Rincer, puis ajouter un morceau dans la sauce en début de cuisson.",
    conservation: "Au sec, dans une boîte hermétique.",
    tags: ["poisson", "fermenté"],
    featured: false,
    variants: [["150 g", 890, 20]],
  },
  {
    slug: "crevettes-sechees",
    name: "Crevettes séchées",
    categoryId: cat("poissons"),
    shortDescription: "Petites crevettes séchées qui relèvent le ndolé, les sauces gombo et les soupes, entières ou moulues.",
    description:
      "Les crevettes séchées sont un ingrédient courant des cuisines d'Afrique de l'Ouest et centrale. Séchées, parfois fumées, elles concentrent un goût marin prononcé.\n\nOn les utilise entières ou moulues pour relever le ndolé, les sauces gombo, les sauces feuilles et les soupes.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Crevettes séchées ; peut contenir du sel, voir l'étiquette.",
    allergens: ["crustacés"],
    usageTips: "Rincer rapidement, puis ajouter entières en fin de cuisson ou moudre dans la sauce.",
    conservation: "Au sec, dans une boîte hermétique.",
    tags: ["crustacés"],
    featured: false,
    variants: [["100 g", 990, 25]],
  },
  {
    slug: "poisson-fume",
    name: "Machoiron fumé",
    categoryId: cat("poissons"),
    shortDescription: "Poisson-chat fumé, utilisé pour parfumer le pondu, les sauces graine et les plats de légumes feuilles.",
    description:
      "Le machoiron est un poisson-chat que l'on fume pour le conserver. Sa chair ferme prend un goût fumé prononcé.\n\nÉmietté, il parfume le pondu, les sauces graine et les plats de légumes feuilles d'Afrique centrale et de l'Ouest.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Poisson-chat fumé.",
    allergens: ["poisson"],
    usageTips: "Tremper 15 minutes dans l'eau chaude, retirer les arêtes et émietter dans la sauce.",
    conservation: "Au sec et au frais, dans une boîte hermétique.",
    tags: ["fumé", "poisson"],
    featured: false,
    variants: [["200 g", 1290, 15]],
  },
  // ------------------------------------------------------ Huiles & pâtes
  {
    slug: "huile-de-palme-rouge",
    name: "Huile de palme rouge",
    categoryId: cat("huiles"),
    shortDescription: "Huile de palme rouge non raffinée, au goût fruité, base de nombreuses sauces d'Afrique de l'Ouest et centrale.",
    description:
      "L'huile de palme rouge est extraite de la pulpe des fruits du palmier à huile. Non raffinée, elle garde sa couleur orangée et son goût fruité caractéristique.\n\nElle est la base du pondu, de la sauce graine, de l'eru et de nombreux plats d'Afrique de l'Ouest et centrale.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Huile de palme rouge.",
    allergens: [],
    usageTips: "Chauffer doucement sans la faire fumer. Elle fige au frais : c'est normal.",
    conservation: "À température ambiante, à l'abri de la lumière.",
    tags: ["palme"],
    featured: false,
    variants: [["500 ml", 890, 30]],
  },
  {
    slug: "pate-d-arachide",
    name: "Pâte d'arachide",
    categoryId: cat("huiles"),
    shortDescription: "Pâte d'arachides grillées pour préparer le mafé, les sauces d'arachide et la soupe d'arachide.",
    description:
      "La pâte d'arachide est obtenue en broyant des arachides grillées jusqu'à former une pâte épaisse. Selon les marques, elle peut contenir du sel ou de l'huile végétale.\n\nC'est l'ingrédient clé du mafé, de la soupe d'arachide du Ghana et de nombreuses sauces d'Afrique de l'Ouest et centrale.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Arachides grillées, peut contenir sel et huile végétale selon la marque ; voir l'étiquette.",
    allergens: ["arachide"],
    usageTips: "Délayer dans un peu de bouillon chaud avant de l'ajouter à la sauce.",
    conservation: "À température ambiante, pot bien fermé. Remuer avant usage si l'huile est remontée à la surface.",
    tags: ["arachide"],
    featured: true,
    variants: [["500 g", 690, 40]],
  },
  {
    slug: "pulpe-de-noix-de-palme",
    name: "Pulpe de noix de palme (800 g)",
    categoryId: cat("huiles"),
    shortDescription: "Crème de noix de palme prête à cuisiner, pour la sauce graine, le poulet nyembwe et la soupe de noix de palme.",
    description:
      "La pulpe de noix de palme est extraite des noix de palme cuites et pilées. Onctueuse et orangée, elle évite la longue préparation des noix fraîches.\n\nElle sert de base à la sauce graine de Côte d'Ivoire, au poulet nyembwe du Gabon, à la palm nut soup du Ghana ou au banga du Nigeria.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Pulpe de noix de palme ; voir l'étiquette pour la composition exacte.",
    allergens: [],
    usageTips: "Diluer dans l'eau et faire réduire lentement avec la viande ou le poisson jusqu'à ce que l'huile remonte.",
    conservation: "Tant que le contenant est fermé : à température ambiante. Une fois entamé : au frais, dans un récipient fermé, et à utiliser rapidement.",
    tags: ["palme"],
    featured: false,
    variants: [["400 g", 490, 40]],
  },
  // ------------------------------------------- Ajouts (nouvelles recettes)
  {
    slug: "graines-d-egusi",
    name: "Egusi moulu (pistache africaine)",
    categoryId: cat("epices"),
    shortDescription: "Graines d'egusi moulues, pour épaissir et parfumer la soupe egusi du Nigeria et du Ghana.",
    description:
      "L'egusi, parfois appelé pistache africaine, désigne les graines de certaines courges et melons d'Afrique de l'Ouest. Moulues, elles ont un goût doux qui rappelle la noisette.\n\nElles épaississent et parfument la soupe egusi, un grand classique du Nigeria et du Ghana, servie avec le fufu, l'eba ou l'amala.",
    originCountry: "Afrique de l'Ouest",
    originRegion: null,
    producer: null,
    composition: "Graines d'egusi moulues.",
    allergens: [],
    usageTips: "Délayer la poudre avec un peu d'eau, puis l'ajouter à la sauce et laisser cuire jusqu'à former de petits grumeaux moelleux.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["graines", "egusi"],
    featured: true,
    variants: [["250 g", 790, 30], ["500 g", 1390, 15]],
  },
  {
    slug: "gombo-seche",
    name: "Gombo séché en poudre",
    categoryId: cat("feuilles"),
    shortDescription: "Gombo séché et moulu, pour donner à la sauce gombo sa texture filante, même hors saison.",
    description:
      "Le gombo séché en poudre est obtenu à partir de gombos coupés, séchés puis moulus. Cette poudre permet de préparer la sauce gombo toute l'année.\n\nAu Sahel, elle donne sa texture filante à la sauce qui accompagne le tô ; on l'utilise aussi dans les soupes et les sauces d'Afrique de l'Ouest.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Gombo (Abelmoschus esculentus) séché et moulu.",
    allergens: [],
    usageTips: "Verser en pluie dans la sauce frémissante en fouettant, puis cuire 5 minutes.",
    conservation: "Au sec, à l'abri de la lumière.",
    tags: ["gombo", "Sahel"],
    featured: false,
    variants: [["100 g", 590, 30]],
  },
  {
    slug: "feuilles-de-moringa",
    name: "Feuilles de moringa séchées",
    categoryId: cat("feuilles"),
    shortDescription: "Feuilles de moringa séchées, le nébédaye du Sénégal, pour le thiéré mbuum et les sauces feuilles.",
    description:
      "Le moringa est un arbre dont les feuilles sont très utilisées en cuisine en Afrique de l'Ouest. Au Sénégal, on les appelle nébédaye.\n\nSéchées, elles parfument le thiéré mbuum, un couscous de mil aux feuilles et à l'arachide, ainsi que diverses sauces feuilles, avec un goût herbacé.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Feuilles de moringa (Moringa oleifera) séchées.",
    allergens: [],
    usageTips: "Réhydrater quelques minutes puis ajouter dans la sauce ou le couscous en fin de cuisson.",
    conservation: "Au sec, à l'abri de la lumière.",
    tags: ["feuilles", "Sénégal"],
    featured: false,
    variants: [["100 g", 690, 30]],
  },
  {
    slug: "feuilles-de-sorgho",
    name: "Feuilles de sorgho rouge (waakye)",
    categoryId: cat("feuilles"),
    shortDescription: "Feuilles de sorgho séchées qui donnent au waakye ghanéen sa couleur brun-rouge caractéristique.",
    description:
      "Au Ghana, le waakye, un plat de riz et de haricots, cuit avec des feuilles de sorgho séchées. Elles lui donnent sa couleur brun-rouge caractéristique et un léger parfum.\n\nLes feuilles ne se mangent pas : on les retire avant de servir. Le waakye s'accompagne de sauce pimentée, d'œufs, de gari ou de spaghettis.",
    originCountry: "Ghana",
    originRegion: null,
    producer: null,
    composition: "Feuilles de sorgho séchées.",
    allergens: [],
    usageTips: "Rincer, ajouter à l'eau de cuisson du riz et des haricots, puis retirer avant de servir.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["feuilles", "Ghana"],
    featured: false,
    variants: [["50 g", 490, 40]],
  },
  {
    slug: "feuilles-d-okok",
    name: "Feuilles d'okok émincées",
    categoryId: cat("feuilles"),
    shortDescription: "Feuilles d'okok émincées et séchées, pour préparer l'eru et les plats de légumes du Cameroun.",
    description:
      "L'okok, ou eru, est une liane des forêts d'Afrique centrale dont les feuilles se consomment émincées très finement. Séchées, elles se conservent longtemps.\n\nAu Cameroun, elles se cuisinent avec de l'huile de palme, de la viande, du poisson fumé ou des crevettes séchées.",
    originCountry: "Cameroun",
    originRegion: null,
    producer: null,
    composition: "Feuilles de Gnetum africanum émincées et séchées.",
    allergens: [],
    usageTips: "Réhydrater dans l'eau tiède avant de cuisiner, en suivant les indications de l'emballage.",
    conservation: "Au sec, à l'abri de la lumière.",
    tags: ["feuilles", "forêt"],
    featured: false,
    variants: [["100 g", 890, 25]],
  },
  {
    slug: "odika",
    name: "Odika (chocolat indigène)",
    categoryId: cat("huiles"),
    shortDescription: "Pain d'amandes de mangue sauvage, surnommé chocolat indigène, qui épaissit les sauces gabonaises.",
    description:
      "L'odika est préparé à partir des amandes de la mangue sauvage (Irvingia gabonensis), grillées puis pressées en un pain sombre. On le surnomme parfois « chocolat indigène » pour son aspect.\n\nRâpé dans les sauces, il leur donne une couleur brune, une texture onctueuse et un goût fumé ; c'est un ingrédient phare de la cuisine gabonaise.",
    originCountry: "Gabon",
    originRegion: null,
    producer: null,
    composition: "Amandes de mangue sauvage (Irvingia gabonensis) grillées et pressées.",
    allergens: ["fruits à coque"],
    usageTips: "Râper ou chauffer légèrement pour ramollir, puis délayer dans la sauce en fin de cuisson.",
    conservation: "Au sec et au frais, emballé.",
    tags: ["Gabon", "forêt"],
    featured: true,
    variants: [["150 g", 1190, 15]],
  },
  {
    slug: "farine-de-teff",
    name: "Farine de teff",
    categoryId: cat("cereales"),
    shortDescription: "Farine de teff, la petite céréale éthiopienne qui sert à préparer l'injera, la grande galette alvéolée.",
    description:
      "Le teff est une céréale minuscule cultivée depuis très longtemps sur les hauts plateaux d'Éthiopie et d'Érythrée. Sa farine a un goût légèrement acidulé.\n\nFermentée quelques jours, elle donne l'injera, la grande galette alvéolée qui sert à la fois d'assiette et de couvert pour les wats ; on l'utilise aussi en pâtisserie.",
    originCountry: "Éthiopie",
    originRegion: null,
    producer: null,
    composition: "Farine de teff (Eragrostis tef).",
    allergens: [],
    usageTips: "Mélanger à l'eau et laisser fermenter 2 à 3 jours avant de cuire les injeras.",
    conservation: "Au sec et au frais, dans un contenant fermé.",
    tags: ["céréale ancienne", "Éthiopie"],
    featured: true,
    variants: [["500 g", 690, 30], ["1 kg", 1190, 15]],
  },
  {
    slug: "poudre-de-baobab",
    name: "Pain de singe (poudre de baobab)",
    categoryId: cat("cereales"),
    shortDescription: "Pulpe de fruit du baobab en poudre, au goût acidulé, pour le jus de bouye et le ngalakh sénégalais.",
    description:
      "Le fruit du baobab, appelé pain de singe, renferme une pulpe sèche et farineuse au goût acidulé. Réduite en poudre, elle se délaye facilement.\n\nAu Sénégal, elle sert à préparer le jus de bouye et la crème du ngalakh, un dessert à base de mil et d'arachide ; elle parfume aussi les glaces et les pâtisseries.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Pulpe de fruit du baobab (Adansonia digitata) en poudre.",
    allergens: [],
    usageTips: "Délayer dans l'eau froide ou le lait, filtrer si besoin et sucrer à votre goût.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["baobab", "Sénégal"],
    featured: false,
    variants: [["250 g", 790, 30]],
  },
  {
    slug: "farine-de-foufou",
    name: "Farine de manioc pour foufou",
    categoryId: cat("cereales"),
    shortDescription: "Farine de manioc pour préparer rapidement un foufou lisse et élastique, sans piler au mortier.",
    description:
      "La farine de manioc permet de préparer le foufou à la casserole, sans piler au mortier. Travaillée dans l'eau bouillante, elle donne une pâte lisse et élastique.\n\nLe foufou accompagne les sauces et les soupes d'Afrique centrale et de l'Ouest : sauce feuilles, soupe egusi, sauce graine ou pondu.",
    originCountry: null,
    originRegion: null,
    producer: null,
    composition: "Farine de manioc.",
    allergens: [],
    usageTips: "Verser dans l'eau bouillante en remuant vigoureusement avec une spatule jusqu'à obtenir une pâte lisse.",
    conservation: "Au sec, dans un contenant fermé.",
    tags: ["manioc", "foufou"],
    featured: false,
    variants: [["1 kg", 690, 40]],
  },
];

/**
 * Offres Amazon.fr retenues (plus de 3,5 étoiles, relevées le 26 septembre 2026) :
 * ASIN, format et prix de la fiche, et nom affiché s'il diffère du produit de démo.
 * Les produits sans offre sont masqués de la boutique.
 */
const amazonOffers: Record<string, { asin: string; label: string; priceCents: number; name?: string }> = {
  "poivre-de-penja": { asin: "B000PBXHBS", label: "70 g", priceCents: 2105 },
  soumbala: { asin: "B0CQKHMT2Y", label: "50 g", priceCents: 899 },
  berbere: { asin: "B079R281WV", label: "40 g", priceCents: 419 },
  "yaji-suya": { asin: "B0CTTM79ZR", label: "180 g", priceCents: 2499 },
  "poivre-de-selim": { asin: "B07GFN2J77", label: "250 g", priceCents: 995 },
  "graines-d-egusi": { asin: "B0DLV721PS", label: "50 g", priceCents: 899, name: "Egusi moulu (pistache africaine)" },
  fonio: { asin: "B0C78LFHJS", label: "1 kg", priceCents: 990 },
  "attieke-sec": { asin: "B0CCLHXJFJ", label: "500 g", priceCents: 1990 },
  "couscous-de-mil": { asin: "B0DWKQHXLN", label: "500 g", priceCents: 990 },
  "farine-de-teff": { asin: "B0C1TBB24S", label: "1 kg", priceCents: 2496 },
  "poudre-de-baobab": { asin: "B06Y3L4CP1", label: "1 kg", priceCents: 3399 },
  "farine-de-foufou": { asin: "B0DY1V2QVZ", label: "500 g", priceCents: 1299, name: "Farine de manioc pour foufou" },
  "feuilles-de-ndole": { asin: "B0FQQXJ23P", label: "100 g", priceCents: 1490 },
  "feuilles-de-manioc": { asin: "B092379XP9", label: "3 × 420 g", priceCents: 3299, name: "Feuilles de manioc pilées (pondu, ravitoto)" },
  "fleurs-de-bissap": { asin: "B09LMHFX9T", label: "1 kg", priceCents: 2299 },
  "gombo-seche": { asin: "B0C66R4FWK", label: "100 g", priceCents: 490 },
  "feuilles-de-moringa": { asin: "B086JBQJ1J", label: "250 g", priceCents: 999 },
  "feuilles-de-sorgho": { asin: "B0F922WGDC", label: "130 g", priceCents: 1499 },
  guedj: { asin: "B0DK3SVDJN", label: "100 g", priceCents: 3391 },
  "crevettes-sechees": { asin: "B0BVGJQC39", label: "50 g", priceCents: 490 },
  "huile-de-palme-rouge": { asin: "B0962X7DNX", label: "75 cl", priceCents: 1499, name: "Huile de palme rouge" },
  "pate-d-arachide": { asin: "B07VX8JBYN", label: "425 g", priceCents: 1349, name: "Pâte d'arachide" },
  "pulpe-de-noix-de-palme": { asin: "B07C1KX53F", label: "800 g", priceCents: 1200, name: "Pulpe de noix de palme (800 g)" },
};

// Produits ajoutés le 27/09/2026 (catalog-nouveautes.ts), à la suite pour garder les identifiants existants.
for (const n of nouveauxProduits) {
  const { category, amazon, ...rest } = n;
  seeds.push({ ...rest, categoryId: cat(category), producer: null, featured: false, variants: [] });
  amazonOffers[n.slug] = amazon;
}

export const demoProducts: Product[] = seeds.map((seed, index) => {
  const productId = id("2", index + 1);
  const offer = amazonOffers[seed.slug];
  return {
    ...seed,
    id: productId,
    name: offer?.name ?? seed.name,
    // Produits vendus via Amazon : pas de producteur propre.
    producer: offer ? null : seed.producer,
    images: [`/products/${seed.slug}.webp`],
    amazonAsin: offer?.asin ?? null,
    isActive: Boolean(offer),
    createdAt: new Date(Date.UTC(2026, 0, 1 + index)).toISOString(),
    variants: variants(productId, offer ? [[offer.label, offer.priceCents, 99]] : seed.variants),
  };
});
