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
  "mortier-et-pilon-en-bois": {
    origine:
      "Dans les cours d'Afrique de l'Ouest et du Centre, le grand mortier taillé dans un tronc rythme encore la journée : on y pile le mil, l'igname bouillie pour le foufou ou les feuilles de manioc. À côté de ce géant existe un modèle de cuisine, bien plus petit, que l'on appelle talier ou talié dans plusieurs pays francophones.\n\nL'acacia fournit un bois dur, lourd et serré, apprécié des tourneurs parce qu'il résiste aux coups répétés. Le mortier et son pilon sont façonnés au tour dans une seule pièce de bois, puis poncés.",
    choisir:
      "Le bois absorbe un peu les huiles et les parfums : il convient aux préparations sèches ou grasses, comme les arachides grillées, le piment séché, les [crevettes séchées](/produit/crevettes-sechees) ou les feuilles. Pour les marinades très liquides, la pierre du [mortier en granit de 14 cm](/produit/mortier-en-granit) se nettoie plus facilement.\n\nSi vous ne pilez que quelques graines à la fois, le [petit mortier en hêtre](/produit/petit-mortier-hetre) prend moins de place. Le [mortier en granit sur socle en acacia](/produit/mortier-granit-socle-acacia) marie les deux matières : une cuve en pierre posée sur une base en bois.",
    conserver:
      "Ne le laissez jamais tremper dans l'évier : l'eau fait gonfler les fibres, puis le bois se fend en séchant. Après le lavage, essuyez-le et laissez-le sécher debout, à l'air libre, loin d'un radiateur. Une huile alimentaire neutre passée de temps en temps nourrit le bois et l'empêche de griser.",
    remplacer:
      "Pour les arachides, un rouleau à pâtisserie sur un sac bien fermé donne une poudre grossière comparable. Le [hachoir H.Koenig](/produit/hachoir-h-koenig-leo8) réduit l'ail et l'oignon en quelques secondes, avec une texture plus hachée que pilée. Un bol épais et le dos d'une cuillère en bois suffisent aussi pour écraser une gousse d'ail avec du gros sel.",
    enCuisine:
      "Il sert à écraser les arachides grillées avant le [mafé](/recette/mafe), à piler le piment de l'[eru](/recette/eru) avec les crevettes séchées ou à moudre au pilon le mélange du [café Touba](/recette/cafe-touba). Pour le garder longtemps en bon état, suivez [Comment entretenir un mortier et un pilon en bois ?](/conseils/entretenir-mortier-pilon-bois), et pour comparer avec la pierre, [Mortier en bois ou en pierre : lequel choisir ?](/conseils/mortier-bois-ou-pierre).",
    faq: [
      {
        question: "Le mortier en bois garde-t-il l'odeur de l'ail ?",
        reponse:
          "Un peu, oui : c'est la nature du bois. Frotter l'intérieur avec du gros sel puis rincer à l'eau chaude atténue l'odeur.",
      },
      {
        question: "Quelle différence avec un grand mortier africain ?",
        reponse:
          "Le grand mortier en tronc sert à piler debout les céréales et les tubercules. Celui-ci se pose sur la table, pour les condiments.",
      },
    ],
  },
  "grand-mortier-granit-20-cm": {
    origine:
      "Cole & Mason est une maison britannique fondée en 1919 dans la City de Londres, d'abord comme commerce d'objets à offrir. Elle s'est fait un nom après la Seconde Guerre mondiale avec ses moulins à poivre, le premier en bois datant de 1946, avant d'élargir sa gamme aux ustensiles pour les épices, dont ces mortiers.\n\nCelui-ci est taillé dans un bloc de granit naturel. Cette roche magmatique, très dure, ne se raye pas sous le pilon et ne prend pas l'humidité : c'est elle qui donne à l'objet son poids et sa stabilité.",
    choisir:
      "Avec ses 20 cm, c'est le plus large des mortiers de la boutique. On le choisit pour les grandes familles, les repas de fête ou les cuisiniers qui préparent leurs pâtes d'aromates pour la semaine.\n\nPour un usage plus courant, le [mortier Cole & Mason de 18 cm](/produit/mortier-granit-18-cm) offre la même finition dans un format un peu plus maniable, et le [mortier en granit de 14 cm](/produit/mortier-en-granit) se range dans un placard. Si vous pilez surtout des herbes tendres, le [mortier en marbre noir](/produit/mortier-marbre-noir) est plus doux.",
    conserver:
      "Après usage, un rinçage à l'eau chaude et un coup de brosse dans le fond suffisent. Séchez l'extérieur poli avec un torchon pour éviter les traces de calcaire, puis laissez l'intérieur sécher à l'air. Soulevez-le à deux mains, jamais par le bord : un bloc de cette taille glisse facilement des doigts mouillés.",
    remplacer:
      "Sans grand mortier, travaillez en plusieurs fois dans un plus petit, en vidant la pâte dans un bol au fur et à mesure. Pour de gros volumes d'ail, de gingembre et d'oignon, un blender comme le [Moulinex Blendforce](/produit/blender-moulinex-blendforce) va plus vite, avec une pâte plus lisse et un parfum un peu moins rond.",
    enCuisine:
      "Sa contenance convient aux recettes pour six personnes et plus : la pâte d'ail et de gingembre du [romazava](/recette/romazava), le mélange d'épices du [pilau de Zanzibar](/recette/pilau) ou celle du [ravitoto](/recette/ravitoto). Pour garder la main légère sur le piment quand on prépare beaucoup de pâte, relisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Peut-on servir directement dans ce mortier ?",
        reponse:
          "Oui, son extérieur poli le permet : il fait un joli bol pour une sauce pimentée ou un condiment posé au milieu de la table.",
      },
      {
        question: "Faut-il le préparer avant le premier usage ?",
        reponse:
          "Comme toute pierre neuve, il gagne à être rodé : on y broie un peu de riz cru, que l'on jette, puis on rince à l'eau claire.",
      },
    ],
  },
  "mortier-granit-18-cm": {
    origine:
      "Ce modèle appartient à la ligne Worcester de Cole & Mason, nom emprunté à une ville des Midlands anglais. La marque, née à Londres en 1919, est surtout connue au Royaume-Uni pour ses moulins à sel et à poivre, et ses mortiers en pierre complètent cet univers des épices.\n\nLe bloc de granit noir est travaillé de deux façons : la paroi extérieure est polie jusqu'à briller, tandis que la cuve et la tête du pilon restent brutes. Cette surface granuleuse agit comme une râpe très fine et retient les ingrédients sous le pilon.",
    choisir:
      "Le diamètre de 18 cm est un bon compromis entre capacité et encombrement. Il accueille une pâte d'aromates pour une grande cocotte sans obliger à travailler en plusieurs fois, tout en restant plus facile à déplacer que le [grand mortier de 20 cm](/produit/grand-mortier-granit-20-cm) de la même marque.\n\nSi la profondeur compte davantage que la largeur, par exemple pour une sauce pimentée liquide, le [mortier en granit de 16 cm](/produit/mortier-granit-16-cm) est plus creux. Pour un usage quotidien en petites quantités, le [mortier de 14 cm](/produit/mortier-en-granit) suffit, et l'[inox de Mastrad](/produit/mortier-inox) convient à ceux qui veulent un nettoyage au lave-vaisselle.",
    conserver:
      "Gardez-le hors du lave-vaisselle : la pierre risque de se marquer et de prendre le goût du détergent. Une brosse à vaisselle souple suffit pour déloger les fibres de gingembre restées dans le grain. Si l'extérieur poli se ternit, un chiffon légèrement huilé lui rend son éclat.",
    remplacer:
      "Le [mixeur plongeant Moulinex Daily Chef](/produit/mixeur-plongeant-moulinex-daily-chef) réduit vite une base d'oignon, d'ail et de piment, à condition d'ajouter un peu d'huile ou d'eau. Pour quelques graines de cumin ou de coriandre, un moulin à café réservé aux épices donne une poudre fine, plus régulière qu'au pilon.",
    enCuisine:
      "On y pile l'ail, le gingembre et le piment de la marinade du [poulet yassa](/recette/poulet-yassa), les gousses grillées de poivre de Selim de la [pepper soup](/recette/pepper-soup) ou les graines noircies du [mbongo tchobi](/recette/mbongo-tchobi). La marinade du yassa gagne à reposer longtemps : [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa) explique pourquoi.",
    faq: [
      {
        question: "Pourquoi l'intérieur n'est-il pas poli comme l'extérieur ?",
        reponse:
          "Une surface lisse laisserait glisser les graines et l'ail. Le grain brut accroche les ingrédients et les broie plus vite.",
      },
      {
        question: "Ce mortier convient-il aux épices très dures ?",
        reponse:
          "Oui, le granit supporte bien les graines sèches. Torréfiez-les d'abord, laissez-les refroidir et pilez-les par petites poignées.",
      },
    ],
  },
  "mortier-granit-16-cm": {
    origine:
      "Le granit gris moucheté de ce mortier laisse voir les minéraux qui le composent : des grains clairs de quartz et de feldspath, des points sombres de mica. Ces cristaux se sont formés très lentement dans les profondeurs de la croûte terrestre, ce qui explique la dureté de la pierre.\n\nLa forme compte autant que la matière. Avec 8 cm de hauteur pour 16 cm de diamètre, la cuve est creusée en coquille profonde, et le pilon cylindrique de 17 cm descend jusqu'au fond sans que la main touche le bord.",
    choisir:
      "Sa contenance de 400 ml le place au milieu de la gamme. Sa vraie force est la profondeur : un piment frais qui éclate, un jus de tomate ou une pâte un peu liquide restent dans la cuve au lieu de gicler sur le plan de travail. C'est un bon choix pour les sauces crues pimentées.\n\nLe [mortier Cole & Mason de 18 cm](/produit/mortier-granit-18-cm) est plus large mais moins creux, pratique pour étaler une pâte. Le [mortier sur socle en acacia](/produit/mortier-granit-socle-acacia) a une hauteur proche, avec une base en bois en plus. Pour les herbes fraîches seules, un mortier en marbre comme le [modèle noir de 15 cm](/produit/mortier-marbre-noir) fait aussi l'affaire.",
    conserver:
      "Le granit gris montre moins les taches que le noir, mais le curcuma et l'huile de palme peuvent tout de même le colorer. Rincez-le aussitôt après usage, avant que la pâte ne sèche. Pour une trace tenace, frottez avec une pâte de bicarbonate et d'eau, puis rincez abondamment.",
    remplacer:
      "Pour une sauce pimentée crue, un bol à bords hauts et une fourchette écrasent tomate et piment en version rustique. Un pilon à purée fait aussi l'affaire pour les ingrédients tendres, comme l'avocat ou l'oignon déjà cuit. Les épices sèches passent bien au moulin électrique réservé à cet usage.",
    enCuisine:
      "Sa cuve profonde convient au piment écrasé des sauces, comme celui qui relève le [poisson braisé et attiéké](/recette/poisson-braise-attieke) ou le [kedjenou de poulet](/recette/kedjenou). On y pile aussi l'ail et le gingembre du [romazava](/recette/romazava). Pour régler la force de vos sauces, voyez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Que veut dire la contenance de 400 ml ?",
        reponse:
          "C'est le volume de la cuve remplie à ras. En pratique, on la remplit au tiers pour piler confortablement, soit l'équivalent d'une grosse poignée d'aromates.",
      },
      {
        question: "Le pilon cylindrique est-il moins efficace qu'un pilon arrondi ?",
        reponse:
          "Non, sa longueur et son extrémité large couvrent bien le fond de la cuve. Il suffit de l'incliner un peu pour suivre la courbe de la paroi.",
      },
    ],
  },
  "mortier-granit-socle-acacia": {
    origine:
      "Ce mortier de la marque ECENCE associe deux matières naturelles. La cuve, en granit foncé, mesure 15,5 cm de diamètre pour 10,5 cm de hauteur, ce qui en fait l'un des plus hauts de la boutique. Elle repose sur un socle en bois d'acacia, essence dense et résistante que l'on retrouve aussi sur les planches et les saladiers.\n\nLe pilon, long de 16 cm, est lui aussi en granit. Sa longueur éloigne la main de la cuve et donne un bras de levier plus confortable quand on écrase en tournant.",
    choisir:
      "Le socle est l'atout de ce modèle : il évite le contact direct entre la pierre et un plan de travail fragile, comme le bois, le stratifié ou le verre, et amortit les coups. Il cale aussi la cuve, qui ne tourne pas pendant qu'on pile.\n\nSi votre plan de travail est en pierre ou en carrelage, le [mortier en granit de 16 cm](/produit/mortier-granit-16-cm), sans socle, offre une profondeur comparable. Le [mortier en bois d'acacia](/produit/mortier-et-pilon-en-bois) est plus léger mais garde les odeurs. Pour les très grandes quantités, mieux vaut le [grand mortier de 20 cm](/produit/grand-mortier-granit-20-cm). Le [saladier en bois](/produit/saladier-en-bois) se marie bien avec ce socle sur la table.",
    conserver:
      "Les deux matières ne s'entretiennent pas de la même façon. La cuve se rince à l'eau chaude puis sèche à l'air. Le socle ne doit jamais passer sous le robinet : un chiffon humide suffit, puis un essuyage complet. Une goutte d'huile neutre de temps en temps évite que l'acacia ne se dessèche et ne blanchisse.",
    remplacer:
      "Faute de socle, un torchon plié sous n'importe quel mortier en pierre protège le plan de travail et empêche la cuve de glisser. Sans mortier du tout, une planche, le plat d'un couteau large et une pincée de sel suffisent pour réduire l'ail et le gingembre en pâte.",
    enCuisine:
      "Sa hauteur convient aux épices en graines que l'on concasse avant de les faire revenir, comme la cardamome et le cumin du [pilau de Zanzibar](/recette/pilau), ou aux gousses de poivre de Selim et à l'ail du [liboké de poisson](/recette/liboke-de-poisson). Pour bien utiliser ces gousses, lisez [Comment utiliser le poivre de Selim ?](/conseils/utiliser-poivre-de-selim).",
    faq: [
      {
        question: "Le socle se détache-t-il de la cuve ?",
        reponse:
          "Oui, la cuve est simplement posée dessus. On peut donc rincer la pierre sans mouiller le bois.",
      },
      {
        question: "Peut-on huiler le socle avec de l'huile d'olive ?",
        reponse:
          "Mieux vaut une huile qui ne rancit pas vite, comme une huile de pépins de raisin ou une huile spéciale pour planches.",
      },
    ],
  },
  "mortier-marbre-noir": {
    origine:
      "Le marbre est un calcaire transformé par la chaleur et la pression au fond de l'écorce terrestre. Il se compose surtout de carbonate de calcium recristallisé, ce qui lui donne son grain fin et sa surface douce au toucher. Le marbre noir doit sa teinte à des matières organiques ou à des minéraux sombres pris dans la roche.\n\nCe mortier Coninx est taillé dans un bloc massif de marbre naturel, de 15 cm de diamètre pour 8 cm de hauteur. Son pilon est taillé dans la même pierre.",
    choisir:
      "Le marbre est nettement moins dur que le granit. Il est donc plus à l'aise avec les herbes fraîches, l'ail, le gingembre ou les feuilles qu'avec les graines très dures, qui finissent par le marquer. À diamètre égal, il paraît aussi plus lisse sous le pilon.\n\nPour moudre des épices sèches, comme les graines de [maniguette](/produit/maniguette) ou d'[akpi](/produit/akpi-djansang), le [mortier en granit de 14 cm](/produit/mortier-en-granit) est mieux adapté. Le [petit mortier en marbre blanc](/produit/mortier-marbre-blanc) offre la même matière en format compact. Le [mortier sur socle en acacia](/produit/mortier-granit-socle-acacia) a un diamètre très proche, en granit.",
    conserver:
      "Le marbre craint les acides : citron, vinaigre, tomate ou bissap laissés trop longtemps dans la cuve y creusent des taches mates. Rincez-le dès que vous avez fini, sans attendre la fin du repas. Évitez aussi les produits ménagers acides ou anticalcaires. Un essuyage au torchon garde au noir sa profondeur.",
    remplacer:
      "Pour des herbes fraîches, un hachoir berceuse ou un couteau bien aiguisé donne une texture proche, moins pâteuse. Le [mortier en inox de Mastrad](/produit/mortier-inox) ne réagit pas avec les ingrédients acides : c'est la solution si vous écrasez souvent du citron ou de la tomate.",
    enCuisine:
      "Il réduit en pâte l'ail et le gingembre du [ravitoto](/recette/ravitoto) ou du [romazava](/recette/romazava), et écrase l'ail du [poulet DG](/recette/poulet-dg). Le jus de citron se verse plutôt dans le plat que dans le mortier. Pour comparer les matières, voyez [Mortier en bois ou en pierre : lequel choisir ?](/conseils/mortier-bois-ou-pierre).",
    faq: [
      {
        question: "Pourquoi mon mortier en marbre a-t-il des taches claires ?",
        reponse:
          "Ce sont souvent des traces d'acide, laissées par du citron ou de la tomate. Elles ne gênent pas l'usage mais ne s'effacent pas au lavage.",
      },
      {
        question: "Marbre ou granit : lequel dure le plus longtemps ?",
        reponse:
          "Le granit, plus dur, s'use moins vite. Le marbre reste toutefois très durable s'il sert surtout aux ingrédients frais.",
      },
    ],
  },
  "mortier-marbre-blanc": {
    origine:
      "Ce petit mortier de Silk Route Spice Company est taillé dans un bloc de marbre blanc massif. Il se distingue par sa forme carrée : 11 cm de côté pour 8 cm de hauteur, avec une cuve ronde creusée au centre. Les angles offrent une bonne prise quand on le tient d'une main.\n\nLe marbre blanc est l'une des pierres les plus anciennement travaillées autour de la Méditerranée. Sa couleur claire vient de la pureté du calcaire d'origine, transformé en profondeur par la chaleur et la pression.",
    choisir:
      "C'est le plus petit mortier en pierre de la boutique. Il est fait pour les gestes rapides : une gousse d'ail, une pincée de gros sel, quelques grains de [poivre de Penja](/produit/poivre-de-penja) écrasés au dernier moment. Il trouve sa place dans une cuisine étroite ou sur la table, à côté du plat.\n\nPour des quantités plus importantes, le [mortier en marbre noir de 15 cm](/produit/mortier-marbre-noir) garde la même douceur de pierre. Le [petit mortier en hêtre](/produit/petit-mortier-hetre), de taille voisine, est beaucoup plus léger mais retient les parfums. Si vous écrasez surtout des graines dures, préférez un mortier en granit, comme celui de [14 cm](/produit/mortier-en-granit).",
    conserver:
      "La couleur blanche révèle tout : le curcuma, l'huile de palme rouge ou le piment peuvent laisser une auréole. Rincez la cuve tout de suite à l'eau tiède. Comme tout marbre, il redoute le citron et le vinaigre, qui le rendent mat. Rangé à l'abri de la poussière, il reste aussi un bel objet de table.",
    remplacer:
      "Pour quelques grains de poivre, un moulin réglé sur une mouture grossière fait le même travail. Une gousse d'ail s'écrase aussi avec un presse-ail, ou avec le plat d'une lame et un peu de sel. Pour une petite quantité d'épices, deux cuillères à soupe frottées l'une contre l'autre dépannent.",
    enCuisine:
      "Sa petite taille convient aux finitions : quelques grains de poivre concassés sur le [poisson braisé](/recette/poisson-braise-attieke), une gousse d'ail pour le [chakalaka](/recette/chakalaka) ou le gingembre et le piment qui enrobent le [kelewele](/recette/kelewele). Pour choisir un poivre qui mérite le pilon, lisez [Comment reconnaître un bon poivre de Penja ?](/conseils/reconnaitre-un-bon-poivre-de-penja).",
    faq: [
      {
        question: "Peut-on écraser du piment rouge dans un mortier blanc ?",
        reponse:
          "Oui, à condition de le rincer aussitôt. Laissé longtemps, le jus coloré pénètre légèrement la pierre et laisse une teinte rosée.",
      },
      {
        question: "Ce mortier est-il assez lourd pour rester stable ?",
        reponse:
          "Il est massif pour sa taille. Pour un geste énergique, posez-le sur un torchon humide qui l'empêche de glisser.",
      },
    ],
  },
  "mortier-inox": {
    origine:
      "Mastrad est une entreprise française créée en 1994 par Mathieu Lion et Anne-Laure Nabat. Elle conçoit des accessoires de cuisine pensés pour faciliter les gestes du quotidien, et s'est fait connaître notamment avec ses gants en silicone.\n\nCe mortier rompt avec la tradition de la pierre et du bois : il est en acier inoxydable. Sa paroi double laisse une couche d'air entre l'intérieur et l'extérieur, ce qui le rend plus léger qu'un bloc massif tout en lui donnant de la tenue. Il mesure environ 13 cm de diamètre.",
    choisir:
      "Ses atouts sont l'hygiène et la simplicité. L'inox ne boit ni l'huile ni le jus de piment, ne garde aucune odeur d'un usage à l'autre et ne craint pas les acides. On peut y écraser de l'ail le midi et des graines pour un dessert le soir.\n\nIl est en revanche plus léger et moins abrasif que la pierre : pour des graines très dures ou de grandes quantités, le [mortier en granit de 18 cm](/produit/mortier-granit-18-cm) ou le [grand mortier de 20 cm](/produit/grand-mortier-granit-20-cm) écrasent plus vite. Pour les préparations acides, il prend l'avantage sur les mortiers en marbre, [noir](/produit/mortier-marbre-noir) ou [blanc](/produit/mortier-marbre-blanc).",
    conserver:
      "Il passe au lave-vaisselle, ce qui en fait le plus simple de la gamme à entretenir. Pour éviter les traces de calcaire, séchez-le au torchon à la sortie de la machine. Une éponge non abrasive suffit à la main ; la laine d'acier rayerait la surface brillante.",
    remplacer:
      "Tout bol solide en inox ou en céramique épaisse peut servir de cuve, avec le bout arrondi d'un rouleau à pâtisserie en guise de pilon. Pour les herbes fraîches et l'ail en quantité, le [hachoir H.Koenig](/produit/hachoir-h-koenig-leo8) est plus rapide, au prix d'une texture hachée plutôt qu'écrasée.",
    enCuisine:
      "Il convient aux pâtes aromatiques qui contiennent du citron, comme la marinade du [poulet yassa](/recette/poulet-yassa), et aux mélanges d'épices qui changent souvent : l'ail et le gingembre du [kedjenou](/recette/kedjenou) un jour, la cardamome du [chai kényan](/recette/chai-kenyan) le lendemain. Pour la marinade, voyez [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa).",
    faq: [
      {
        question: "L'inox écrase-t-il aussi bien que la pierre ?",
        reponse:
          "Pour l'ail, les herbes et les épices tendres, oui. Pour les graines très dures, la pierre, plus lourde et plus rugueuse, reste plus efficace.",
      },
      {
        question: "À quoi sert la double paroi ?",
        reponse:
          "Elle allège le mortier tout en le rendant rigide, et garde l'extérieur propre et lisse. Elle permet aussi de le poser sur la table pour servir une sauce.",
      },
    ],
  },
  "petit-mortier-hetre": {
    origine:
      "Le hêtre est l'un des arbres les plus répandus des forêts d'Europe. Son bois clair, au grain fin et régulier, se travaille bien au tour et ne dégage pas d'odeur propre : il est utilisé depuis longtemps pour les cuillères, les planches et les ustensiles de cuisine.\n\nCe mortier de la marque Wooden World mesure 10,5 cm de diamètre pour 6 cm de hauteur. Cuve et pilon sont tournés dans le même bois naturel, sans vernis.",
    choisir:
      "C'est le plus léger des mortiers de la boutique. On le sort pour moudre une petite dose d'épices entières juste avant de cuisiner, et on le range aussi vite dans un tiroir. Sa faible hauteur le destine aux graines et aux poudres plutôt qu'aux pâtes juteuses.\n\nLe [mortier en bois d'acacia](/produit/mortier-et-pilon-en-bois), plus grand et plus dense, convient mieux aux arachides et aux feuilles. Le [petit mortier en marbre blanc](/produit/mortier-marbre-blanc), de taille voisine, ne garde aucune odeur mais pèse bien plus lourd. Pour broyer des épices dures comme le [pèbè](/produit/pebe-moulu) entier, un mortier en granit est plus rapide.",
    conserver:
      "Le hêtre est un bois sensible à l'eau. Lavez-le rapidement à la main, essuyez-le aussitôt et laissez-le finir de sécher à l'air, cuve retournée. Un passage d'huile neutre, une ou deux fois par an, l'empêche de se fendiller. Réservez-le de préférence aux épices sèches pour limiter les lavages.",
    remplacer:
      "Pour une petite dose d'épices, un moulin à poivre vide ou un moulin à café manuel rend une poudre plus régulière. Les graines tendres, comme le cumin ou la coriandre, s'écrasent aussi au fond d'une tasse épaisse avec le manche d'un couteau. Le gros sel aide à les broyer.",
    enCuisine:
      "Il sert à moudre au dernier moment la cardamome et les clous de girofle du [chai kényan](/recette/chai-kenyan) ou du [pilau de Zanzibar](/recette/pilau), ou la cardamome verte du [kahawa chungu](/recette/kahawa-chungu), le café épicé du Kenya. Pour conserver vos épices entières entre deux usages, voyez [Quels ingrédients avoir toujours dans son placard ?](/conseils/ingredients-placard-cuisine-africaine).",
    faq: [
      {
        question: "Pourquoi moudre les épices juste avant usage ?",
        reponse:
          "Les arômes sont enfermés dans la graine. Une fois moulue, l'épice perd son parfum en quelques semaines, alors qu'entière elle le garde bien plus longtemps.",
      },
      {
        question: "Peut-on y écraser de l'ail ?",
        reponse:
          "C'est possible, mais le bois clair en gardera l'odeur. Mieux vaut le réserver aux épices sèches et utiliser un mortier en pierre pour l'ail.",
      },
    ],
  },
};
