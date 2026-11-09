/**
 * Fiches détaillées des produits, lot 1 : Ustensiles de cuisson et de pilage (22 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - mortier-et-pilon-en-bois — Mortier et pilon en bois d'acacia
 *   - mortier-en-granit — Mortier et pilon en granit 13 cm
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
      "Le diamètre décide de l'usage. Avec 13 cm, ce mortier convient à une marinade pour quatre personnes ou à une poignée d'épices. Pour piler de grandes quantités de piment ou de feuilles, le [grand mortier en granit de 20 cm](/produit/grand-mortier-granit-20-cm) ou celui de [18 cm](/produit/mortier-granit-18-cm) offrent plus de place. Le [mortier en granit de 16 cm](/produit/mortier-granit-16-cm) est plus profond, pratique pour les préparations liquides.\n\nLe marbre, comme le [mortier en marbre noir](/produit/mortier-marbre-noir), est plus lisse et convient mieux aux herbes qu'aux graines dures. Le [mortier en inox](/produit/mortier-inox) ne garde aucune odeur et passe au lave-vaisselle. Le [mortier en bois d'acacia](/produit/mortier-et-pilon-en-bois), enfin, est le compagnon des arachides et des feuilles.",
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
          "Un mortier de 13 cm suffit pour la cuisine de tous les jours d'une famille. Au-delà de 18 cm, il devient intéressant si vous pilez souvent de grosses quantités.",
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
      "Le bois absorbe un peu les huiles et les parfums : il convient aux préparations sèches ou grasses, comme les arachides grillées, le piment séché, les [crevettes séchées](/produit/crevettes-sechees) ou les feuilles. Pour les marinades très liquides, la pierre du [mortier en granit de 13 cm](/produit/mortier-en-granit) se nettoie plus facilement.\n\nSi vous ne pilez que quelques graines à la fois, le [petit mortier en hêtre](/produit/petit-mortier-hetre) prend moins de place. Le [mortier en granit sur socle en acacia](/produit/mortier-granit-socle-acacia) marie les deux matières : une cuve en pierre posée sur une base en bois.",
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
      "Avec ses 20 cm, c'est le plus large des mortiers de la boutique. On le choisit pour les grandes familles, les repas de fête ou les cuisiniers qui préparent leurs pâtes d'aromates pour la semaine.\n\nPour un usage plus courant, le [mortier Cole & Mason de 18 cm](/produit/mortier-granit-18-cm) offre la même finition dans un format un peu plus maniable, et le [mortier en granit de 13 cm](/produit/mortier-en-granit) se range dans un placard. Si vous pilez surtout des herbes tendres, le [mortier en marbre noir](/produit/mortier-marbre-noir) est plus doux.",
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
      "Le diamètre de 18 cm est un bon compromis entre capacité et encombrement. Il accueille une pâte d'aromates pour une grande cocotte sans obliger à travailler en plusieurs fois, tout en restant plus facile à déplacer que le [grand mortier de 20 cm](/produit/grand-mortier-granit-20-cm) de la même marque.\n\nSi la profondeur compte davantage que la largeur, par exemple pour une sauce pimentée liquide, le [mortier en granit de 16 cm](/produit/mortier-granit-16-cm), dont la cuve est creusée en coquille profonde, retient mieux le jus. Pour un usage quotidien en petites quantités, le [mortier de 13 cm](/produit/mortier-en-granit) suffit, et l'[inox de Mastrad](/produit/mortier-inox) convient à ceux qui veulent un nettoyage au lave-vaisselle.",
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
      "Sa contenance de 400 ml le place au milieu de la gamme. Sa vraie force est la profondeur : un piment frais qui éclate, un jus de tomate ou une pâte un peu liquide restent dans la cuve au lieu de gicler sur le plan de travail. C'est un bon choix pour les sauces crues pimentées.\n\nLe [mortier Cole & Mason de 18 cm](/produit/mortier-granit-18-cm) est plus large, pratique pour étaler une pâte. Le [mortier sur socle en acacia](/produit/mortier-granit-socle-acacia), de 15,5 cm, ajoute une base en bois amovible. Pour les herbes fraîches seules, un mortier en marbre comme le [modèle noir de 15 cm](/produit/mortier-marbre-noir) fait aussi l'affaire.",
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
      "Ce mortier de la marque ECENCE associe deux matières naturelles. La cuve, en granit foncé, mesure 15,5 cm de diamètre. Elle repose sur un socle en bois d'acacia, essence dense et résistante que l'on retrouve aussi sur les planches et les saladiers.\n\nLe pilon, que le fabricant présente comme extra-long, est lui aussi en granit. Sa longueur éloigne la main de la cuve et donne un bras de levier plus confortable quand on écrase en tournant.",
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
      "Le marbre est nettement moins dur que le granit. Il est donc plus à l'aise avec les herbes fraîches, l'ail, le gingembre ou les feuilles qu'avec les graines très dures, qui finissent par le marquer. À diamètre égal, il paraît aussi plus lisse sous le pilon.\n\nPour moudre des épices sèches, comme les graines de [maniguette](/produit/maniguette) ou d'[akpi](/produit/akpi-djansang), le [mortier en granit de 13 cm](/produit/mortier-en-granit) est mieux adapté. Le [petit mortier en marbre blanc](/produit/mortier-marbre-blanc) offre la même matière en format compact. Le [mortier sur socle en acacia](/produit/mortier-granit-socle-acacia) a un diamètre très proche, en granit.",
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
      "C'est le plus petit mortier en pierre de la boutique. Il est fait pour les gestes rapides : une gousse d'ail, une pincée de gros sel, quelques grains de [poivre de Penja](/produit/poivre-de-penja) écrasés au dernier moment. Il trouve sa place dans une cuisine étroite ou sur la table, à côté du plat.\n\nPour des quantités plus importantes, le [mortier en marbre noir de 15 cm](/produit/mortier-marbre-noir) garde la même douceur de pierre. Le [petit mortier en hêtre](/produit/petit-mortier-hetre), de taille voisine, est beaucoup plus léger mais retient les parfums. Si vous écrasez surtout des graines dures, préférez un mortier en granit, comme celui de [13 cm](/produit/mortier-en-granit).",
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
  "marmite-en-aluminium": {
    origine:
      "Le mot caldero vient de l'espagnol et désigne un chaudron. Dans les Caraïbes et en Amérique latine, c'est la marmite à riz de tous les foyers, aux parois arrondies et au couvercle bien ajusté. Les cuisinières d'Afrique de l'Ouest connaissent une marmite très proche, en aluminium épais, sur laquelle mijotent le riz au poisson et les sauces.\n\nCette marmite est en fonte d'aluminium : le métal est coulé dans un moule, ce qui donne des parois et un fond plus épais qu'une casserole emboutie dans une simple tôle.",
    choisir:
      "Pour un riz avec une belle croûte au fond, l'épaisseur du métal est le critère principal : un fond mince brûle le riz avant qu'il ne dore. La forme haute et le couvercle lourd gardent la vapeur pendant que les grains finissent de gonfler.\n\nPour les grandes tablées, le [caldero IMUSA de 7 litres](/produit/caldero-aluminium-7-litres) reprend la même forme en plus grand. Si vous cuisinez surtout des sauces longues, le [faitout en fonte d'aluminium de 28 cm](/produit/faitout-en-fonte-d-aluminium), plus large, laisse mieux réduire. Sur une plaque à induction, choisissez plutôt une [marmite en inox](/produit/marmite-inox-13-litres) ou une [cocotte en fonte](/produit/cocotte-fonte-emaillee-28-cm).",
    conserver:
      "L'aluminium noircit et se tache au contact des produits alcalins : évitez les pastilles pour lave-vaisselle et les détergents agressifs. Une éponge douce et un peu de liquide vaisselle suffisent. Si l'intérieur se ternit, faire bouillir de l'eau additionnée d'un peu de vinaigre lui redonne de la clarté.",
    remplacer:
      "Toute casserole haute à fond épais, munie d'un couvercle qui ferme bien, peut cuire le riz. Une cocotte en fonte donne aussi un fond doré, avec un peu plus d'attention au feu. Avec une casserole fine, on renonce plutôt à la croûte et on cuit le riz à feu très doux.",
    enCuisine:
      "Elle est faite pour le [thiéboudienne](/recette/thieboudienne), le [riz jollof](/recette/riz-jollof) ou le [waakye](/recette/waakye) ghanéen, et elle accueille aussi la [groundnut soup](/recette/groundnut-soup) ou le [matoké au bœuf](/recette/matoke). Pour la cuisson du riz dans la sauce, lisez [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne).",
    faq: [
      {
        question: "Qu'est-ce que le xoon ?",
        reponse:
          "C'est le nom wolof de la croûte de riz dorée qui se forme au fond de la marmite pendant la cuisson du thiéboudienne. Beaucoup la considèrent comme le meilleur morceau.",
      },
      {
        question: "Cette marmite fonctionne-t-elle sur induction ?",
        reponse:
          "L'aluminium seul n'est pas magnétique. Sans fond spécial, il faut un disque adaptateur pour l'utiliser sur une plaque à induction.",
      },
    ],
  },
  "caldero-aluminium-7-litres": {
    origine:
      "IMUSA est une entreprise colombienne fondée en 1934 dans la région de Medellín. Elle fabrique dès ses débuts des ustensiles en aluminium, un métal alors rare dans les cuisines du pays, et fait aujourd'hui partie du groupe français SEB. Son caldero est devenu un classique dans les foyers d'Amérique latine.\n\nEn République dominicaine, la couche de riz croustillant qui reste au fond s'appelle concón ; à Porto Rico, on parle de pegao, mot qui vient de l'espagnol « collé ». La même idée existe au Sénégal avec le xoon.",
    choisir:
      "Avec près de 7 litres, ce caldero vise les grandes portions : riz pour huit à dix personnes, haricots en quantité, ragoûts pour plusieurs repas. Sa finition en aluminium poli le rend facile à surveiller et à nettoyer.\n\nLa [marmite type caldero](/produit/marmite-en-aluminium) reprend le même principe dans un format plus courant. Pour encore plus de volume ou une cuisson sur induction, la [marmite traiteur en inox de 13,5 litres](/produit/marmite-inox-13-litres) est adaptée. Les sauces qui doivent réduire longtemps, comme le mafé, trouvent davantage de surface dans le [grand faitout de 36 cm](/produit/faitout-fonte-aluminium-36-cm).",
    conserver:
      "L'aluminium poli garde son éclat si on le lave à la main, à l'eau chaude savonneuse, et qu'on le sèche aussitôt. Le lave-vaisselle le ternit et le noircit. Pour décoller un fond de riz, laissez simplement tremper un moment au lieu de gratter avec un ustensile métallique.",
    remplacer:
      "Une grande marmite à fond épais et un couvercle lourd font le même travail. Pour obtenir une croûte au fond sans caldero, versez un filet d'huile dans la casserole avant le riz et laissez les dernières minutes de cuisson se faire à feu doux, sans remuer.",
    enCuisine:
      "Il convient aux recettes de riz pour les grandes tablées : [riz jollof](/recette/riz-jollof), [waakye](/recette/waakye), [thiéboudienne](/recette/thieboudienne). On y prépare aussi les plats en sauce qui se gardent bien, comme la [pepper soup de chèvre](/recette/pepper-soup) ou l'[eru](/recette/eru). Pour bien choisir selon le plat, voyez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Faut-il huiler le caldero avant la première cuisson ?",
        reponse:
          "Un lavage à l'eau savonneuse suffit. Un peu d'huile au fond, au moment de cuire le riz, aide ensuite à former la croûte et à la décoller.",
      },
      {
        question: "Peut-on le mettre au four ?",
        reponse:
          "La fiche du produit ne le précise pas pour ce modèle. Dans le doute, réservez-le à la cuisson sur le feu.",
      },
    ],
  },
  "marmite-potjie": {
    origine:
      "Potjie veut dire « petit pot » en afrikaans. Les marmites en fonte sont arrivées au Cap avec les colons européens, et sont devenues indissociables des longs voyages en chariot des Voortrekkers, qui quittent la colonie du Cap dans les années 1830 : à chaque halte, la marmite était posée sur le feu de camp.\n\nLe potjiekos, littéralement « nourriture du petit pot », est né de cette cuisine de plein air. Ce modèle de BBQ-Toro, le potjie n° 3, contient environ 8 litres et tient sur trois pieds qui le gardent au-dessus des braises ; il est vendu déjà culotté au four.",
    choisir:
      "Ses trois pieds sont faits pour les braises : la marmite tient seule au-dessus du feu, sans grille. Sa forme ventrue et son couvercle épais gardent la vapeur, et la fonte de fer garde la chaleur bien après que le feu a baissé.\n\nPour une cuisson en intérieur, une cocotte en fonte émaillée comme la [Staub de 28 cm](/produit/cocotte-staub-28-cm) ou l'[Overmont de 28 cm](/produit/cocotte-fonte-emaillee-28-cm) offre la même inertie sans entretien du métal nu. Le [tajine en argile](/produit/tajine-en-argile) cuit aussi lentement, mais il redoute les flammes vives. Pour les [brochettes](/produit/brochettes-en-metal), le même feu de bois sert de gril.",
    conserver:
      "La fonte nue rouille si elle reste humide. Après lavage, remettez la marmite quelques minutes sur le feu pour chasser l'eau, puis huilez légèrement l'intérieur encore tiède. Rangez-la dans un endroit sec, avec un papier absorbant glissé sous le couvercle pour capter l'humidité.",
    remplacer:
      "Sur un barbecue ou un brasero, une cocotte en fonte sans pieds posée sur une grille fait le même travail. En cuisine, un plat en fonte au four à 150 °C reproduit la cuisson lente et enveloppante. Gardez le principe des couches : la viande au fond, les légumes au-dessus.",
    enCuisine:
      "Au-delà du potjiekos, elle convient au [mafé de bœuf](/recette/mafe) cuit au feu de bois, au [kedjenou de poulet](/recette/kedjenou), qui mijote sans eau en secouant la marmite, ou au [chakalaka](/recette/chakalaka) sud-africain. Pour régler la cuisson d'une sauce sur les braises, relisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Pourquoi ne remue-t-on pas un potjiekos ?",
        reponse:
          "Chaque ingrédient cuit à son rythme dans sa propre couche : la viande au fond, les légumes plus fragiles au-dessus. Remuer mélangerait tout et écraserait les légumes.",
      },
      {
        question: "Peut-on utiliser le potjie sur une cuisinière ?",
        reponse:
          "Ses pieds le rendent instable sur une plaque. Il est pensé pour les braises ou un réchaud de plein air.",
      },
    ],
  },
  "marmite-inox-13-litres": {
    origine:
      "Baumalu est une entreprise alsacienne fondée en 1971 à Baldenheim, dans le Bas-Rhin. Réputée pour ses ustensiles en cuivre, elle travaille aussi l'aluminium, la fonte émaillée et l'acier inoxydable. Ses marmites dites « traiteur » sont pensées pour les grandes quantités des cuisines collectives et des repas de famille.\n\nCelle-ci mesure 28 cm de diamètre pour 13,5 litres. Son fond est composé de trois couches : un cœur conducteur pris entre deux épaisseurs d'inox, qui diffuse la chaleur sur toute la surface au lieu de la concentrer au centre.",
    choisir:
      "C'est la plus grande marmite de la boutique, avec le [faitout Kamberg de 36 cm](/produit/faitout-fonte-aluminium-36-cm) et ses 13 litres. La différence tient à la forme : la Baumalu est haute et étroite, idéale pour les bouillons et le riz, qui ont besoin de profondeur ; le Kamberg est large et bas, mieux adapté aux sauces qui doivent réduire.\n\nL'inox ne réagit pas avec la tomate ni le citron, et il convient à l'induction, ce qui n'est pas le cas de la [marmite en aluminium type caldero](/produit/marmite-en-aluminium). Pour un usage quotidien à quatre, le [faitout en inox de 24 cm](/produit/faitout-inox-24-cm) sera plus maniable.",
    conserver:
      "L'inox supporte le lavage énergique. Des reflets bleutés ou des auréoles blanches peuvent apparaître après une forte chauffe ou une eau calcaire : un peu de vinaigre blanc sur une éponge les fait disparaître. Pleine, elle pèse lourd : posez-la sur le feu avant de la remplir d'eau.",
    remplacer:
      "Pour une grande tablée, deux marmites moyennes sur deux feux remplacent une grande, en partageant la sauce à la fin. Le [caldero IMUSA de 7 litres](/produit/caldero-aluminium-7-litres) suffit pour une dizaine de portions de riz. Pour les bouillons, une grande cocotte en fonte fait aussi l'affaire.",
    enCuisine:
      "Sa contenance accueille le [thiéboudienne](/recette/thieboudienne) des jours de fête, le [riz jollof](/recette/riz-jollof) pour une grande famille ou les paquets de [koki](/recette/koki), qui cuisent deux heures sur un lit de feuilles de bananier. Pour choisir le bon contenant selon la recette, voyez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "À quoi sert le trou du couvercle ?",
        reponse:
          "Il laisse s'échapper un filet de vapeur. Le couvercle ne se soulève pas sous la pression et le liquide déborde moins.",
      },
      {
        question: "Les poignées chauffent-elles ?",
        reponse:
          "Elles sont en métal : utilisez des maniques pour déplacer la marmite après une longue cuisson.",
      },
    ],
  },
  "faitout-en-fonte-d-aluminium": {
    origine:
      "Le faitout doit son nom à sa polyvalence : une seule casserole large, à deux anses, capable de faire revenir, de mijoter et de bouillir. En Afrique de l'Ouest et du Centre, c'est la forme qui accueille les sauces du quotidien, celles que l'on prépare en grande quantité pour toute la maison.\n\nCe modèle est en fonte d'aluminium, c'est-à-dire en aluminium coulé dans un moule. Ce procédé donne des parois épaisses qui répartissent la chaleur, pour un poids bien moindre que la fonte de fer.",
    choisir:
      "Avec 28 cm de diamètre, il offre une large surface de fond : les oignons dorent sans s'entasser et la sauce réduit plus vite qu'en marmite haute. C'est un format adapté à une famille de quatre à six personnes.\n\nPour les grandes réunions, le [faitout Kamberg de 36 cm](/produit/faitout-fonte-aluminium-36-cm) contient 13 litres. Le [faitout en inox de 24 cm](/produit/faitout-inox-24-cm), sans revêtement, convient à ceux qui préfèrent un métal nu qui supporte les ustensiles métalliques. Pour les plats qui mijotent plusieurs heures, une cocotte en fonte de fer comme la [Staub](/produit/cocotte-staub-28-cm) garde encore mieux la chaleur.",
    conserver:
      "Évitez de le poser chaud sous l'eau froide, qui pourrait le voiler. Lavez-le à l'eau tiède avec une éponge douce, sans poudre abrasive. Si une sauce a attaché, laissez tremper avec un peu de liquide vaisselle : le fond se décolle tout seul. Pour remuer, des [spatules en bois](/produit/spatules-en-bois) ménagent le fond mieux qu'une cuillère en métal.",
    remplacer:
      "Une grande sauteuse profonde avec couvercle peut le remplacer pour les sauces. Une cocotte en fonte émaillée fait aussi l'affaire, avec une montée en chaleur plus lente : on fait alors revenir à feu moyen un peu plus longtemps. Une marmite haute convient aussi, mais la sauce y réduit moins vite.",
    enCuisine:
      "On y prépare le [romazava](/recette/romazava) malgache, la [sauce graine au poulet](/recette/sauce-graine), le [mafé de bœuf](/recette/mafe) ou le [ndolé aux crevettes](/recette/ndole). Pour réussir la texture des sauces à l'arachide, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide), et pour comparer les matières, [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Quelle différence entre fonte d'aluminium et fonte de fer ?",
        reponse:
          "La fonte d'aluminium chauffe plus vite et pèse moins lourd. La fonte de fer met plus de temps à chauffer mais garde la chaleur plus longtemps.",
      },
      {
        question: "Peut-on y faire frire des beignets ?",
        reponse:
          "Pour une friture profonde, une marmite haute est plus sûre. Le faitout convient mieux aux cuissons en sauce.",
      },
    ],
  },
  "faitout-fonte-aluminium-36-cm": {
    origine:
      "Les grandes marmites larges sont au cœur des repas de fête en Afrique : baptêmes, mariages ou fins de ramadan réunissent des dizaines de convives autour d'un même plat. Ce faitout Kamberg reprend cette idée dans un format adapté aux cuisines européennes.\n\nIl est en fonte d'aluminium, avec un revêtement intérieur d'aspect pierre qui limite l'attache. Son diamètre de 36 cm et ses 13 litres en font l'ustensile de cuisson le plus large de la boutique. Ses poignées sont gainées de silicone et son couvercle en verre porte une soupape vapeur.",
    choisir:
      "Avant de le choisir, mesurez votre plus grand feu : un fond de 36 cm déborde largement d'un brûleur ordinaire, et la chaleur risque de se concentrer au centre. Il trouve sa place sur une grande zone d'induction ou un réchaud de forte puissance.\n\nPour une famille, le [faitout de 28 cm](/produit/faitout-en-fonte-d-aluminium) dans la même matière est plus simple à manier. Si vous cherchez la même contenance en forme haute, pour un bouillon ou du riz, la [marmite Baumalu de 13,5 litres](/produit/marmite-inox-13-litres) est plus étroite. Pour un riz en grande quantité avec croûte, préférez le [caldero de 7 litres](/produit/caldero-aluminium-7-litres).",
    conserver:
      "Le revêtement craint les ustensiles métalliques et les éponges abrasives : remuez avec une spatule en bois ou en silicone. Même s'il passe au lave-vaisselle, sa taille rend le lavage à la main souvent plus pratique. Pour le ranger, glissez un torchon entre la cuve et le couvercle afin de protéger le revêtement.",
    remplacer:
      "Deux faitouts plus petits sur deux feux permettent de préparer la même quantité. Pour un repas de fête, on peut aussi cuire la viande et la sauce séparément, puis tout réunir dans le plat de service au dernier moment. Un traiteur ou une salle des fêtes prête parfois ses grandes marmites.",
    enCuisine:
      "Il est à l'aise avec les sauces des grandes tablées : [mafé de bœuf](/recette/mafe), [poulet à la moambé](/recette/moambe), [sauce graine](/recette/sauce-graine) ou [soupe egusi](/recette/soupe-egusi). Pour une sauce à l'arachide qui reste onctueuse en grande quantité, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide).",
    faq: [
      {
        question: "Combien de personnes peut-on servir avec 13 litres ?",
        reponse:
          "Une sauce remplie aux deux tiers donne largement de quoi nourrir une quinzaine de convives, accompagnée de riz ou de foufou.",
      },
      {
        question: "Fonctionne-t-il sur induction ?",
        reponse:
          "Oui, la fiche du fabricant indique qu'il convient à tous les feux, induction comprise.",
      },
    ],
  },
  "faitout-inox-24-cm": {
    origine:
      "La marque Beka est née en 1899 à Betzingen, en Allemagne, où Daniel Braun et Jakob Kemmler fabriquaient leurs premiers ustensiles de cuisson. Elle appartient depuis 2000 au groupe familial belge Allinox, spécialiste de l'acier inoxydable. La ligne Polo regroupe ses modèles en inox pour la cuisine de tous les jours.\n\nLa mention 18/10 désigne la composition de l'acier : environ 18 % de chrome, qui le protège de la rouille, et 10 % de nickel, qui lui donne son éclat et sa résistance aux aliments acides.",
    choisir:
      "Avec ses 24 cm et environ 5,4 litres, ce faitout répond aux repas de quatre personnes : une sauce, une soupe, des légumes mijotés. L'inox sans revêtement accepte le fouet et la cuillère en métal, et ne s'use pas avec le temps comme un antiadhésif.\n\nEn contrepartie, il attache plus facilement qu'une surface revêtue si l'on ne chauffe pas assez la matière grasse. Le [faitout en fonte d'aluminium de 28 cm](/produit/faitout-en-fonte-d-aluminium) offre plus de surface pour les grandes familles. Pour les mijotés de plusieurs heures, une cocotte comme l'[Amazon Basics de 4,1 litres](/produit/cocotte-fonte-emaillee-4-litres) garde mieux la chaleur, à volume comparable.",
    conserver:
      "Pour un fond qui a légèrement brûlé, versez de l'eau et une cuillère de bicarbonate, portez à ébullition quelques minutes, puis frottez. Les traces arc-en-ciel laissées par une forte chauffe partent avec un peu de vinaigre blanc. Ne salez pas l'eau froide : le sel posé au fond peut piquer l'inox ; ajoutez-le une fois l'eau chaude.",
    remplacer:
      "Une casserole haute de taille proche convient pour les soupes et les sauces. Une [cocotte en fonte émaillée](/produit/cocotte-fonte-emaillee-28-cm) le remplace pour les plats mijotés, avec une montée en chaleur plus lente. Pour les sauces qui doivent réduire, une sauteuse large va plus vite.",
    enCuisine:
      "Il convient au [chakalaka](/recette/chakalaka) sud-africain, au [misir wat](/recette/misir-wat) aux lentilles corail, à la [groundnut soup](/recette/groundnut-soup) ou à la [light soup du fufu](/recette/fufu-light-soup). L'inox ne réagit pas avec la tomate : c'est un bon choix pour les sauces qui en contiennent beaucoup. Pour comparer les matières, lisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Comment éviter que les oignons attachent dans l'inox ?",
        reponse:
          "Chauffez le faitout à vide, ajoutez l'huile, attendez qu'elle soit chaude, puis versez les oignons. Ils se décollent d'eux-mêmes en dorant.",
      },
      {
        question: "Que signifie fond capsulé ?",
        reponse:
          "C'est un disque rapporté sous le faitout, qui enferme une couche conductrice entre deux plaques d'acier pour mieux répartir la chaleur.",
      },
    ],
  },
  "cocotte-staub-28-cm": {
    origine:
      "Francis Staub dessine sa première cocotte en 1974, en Alsace. L'entreprise, longtemps installée à Turckheim, au pied des Vosges, est devenue l'un des grands noms de la fonte émaillée. Elle appartient depuis 2008 au groupe allemand Zwilling, tout en restant une marque à part, et ses cocottes sont toujours fabriquées en France.\n\nLa fonte de fer est coulée dans un moule de sable, puis recouverte d'émail, une fine couche de verre fondue sur le métal à très haute température. Chez Staub, l'intérieur reçoit un émail noir mat, légèrement rugueux.",
    choisir:
      "Deux détails distinguent cette cocotte. L'émail noir mat permet de bien saisir la viande et les oignons, là où un émail clair et lisse colore moins. Les picots sous le couvercle recueillent la vapeur condensée et la font retomber en gouttes régulières sur les aliments.\n\nL'[Overmont de 28 cm](/produit/cocotte-fonte-emaillee-28-cm) offre un volume presque identique : 6,6 litres contre 6,7. La [cocotte Amazon Basics de 4,1 litres](/produit/cocotte-fonte-emaillee-4-litres) convient aux foyers de deux à quatre personnes. Pour cuire sur les braises, le [potjie](/produit/marmite-potjie) en fonte nue est fait pour ça.",
    conserver:
      "Laissez-la tiédir avant de la laver : un choc thermique peut faire sauter l'émail. Un trempage à l'eau chaude suffit à décoller les sucs. Avec le temps, l'émail noir se patine et attache de moins en moins. Rangez-la couvercle posé de travers, un torchon glissé entre les deux pour protéger l'émail.",
    remplacer:
      "Toute cocotte en fonte, émaillée ou non, la remplace pour les longs mijotés. Un faitout à fond épais fonctionne aussi, à condition de baisser davantage le feu et de surveiller le niveau de liquide, qui s'évapore plus vite sous un couvercle léger.",
    enCuisine:
      "Elle est taillée pour le [doro wat](/recette/doro-wat), dont les oignons cuisent longuement à sec, le [poulet DG](/recette/poulet-dg), le [kedjenou](/recette/kedjenou) ou le [poulet à l'odika](/recette/poulet-odika). Pour un plat épicé à l'éthiopienne, découvrez [Qu'est-ce que le berbéré et avec quoi le cuisiner ?](/conseils/quest-ce-que-le-berbere).",
    faq: [
      {
        question: "Faut-il culotter une cocotte Staub ?",
        reponse:
          "Non, l'émail la protège déjà. Les premières cuissons grasses suffisent à patiner l'émail noir de l'intérieur.",
      },
      {
        question: "Peut-on l'utiliser au four ?",
        reponse:
          "La fonte s'y prête très bien : on démarre sur le feu pour saisir, puis on termine au four, couvercle posé.",
      },
    ],
  },
  "cocotte-fonte-emaillee-28-cm": {
    origine:
      "La cocotte en fonte descend des marmites de fer que l'on suspendait autrefois dans l'âtre ou que l'on enfouissait sous la cendre. L'émail, ajouté plus tard, a permis de cuisiner sur le feu de la cuisinière sans craindre la rouille ni le goût du métal.\n\nCette cocotte Overmont reprend ce principe : un corps en fonte de fer de 28 cm, recouvert d'émail vitrifié, pour une contenance de 6,6 litres. Elle convient à tous les feux, induction comprise.",
    choisir:
      "Son diamètre et son volume sont presque ceux de la [cocotte Staub de 28 cm](/produit/cocotte-staub-28-cm). La Staub y ajoute un émail intérieur noir mat et des picots sous le couvercle ; l'Overmont s'en tient à l'essentiel de la fonte émaillée : une forte inertie, un couvercle lourd et une compatibilité avec tous les feux.\n\nPour deux à quatre personnes, la [cocotte de 4,1 litres](/produit/cocotte-fonte-emaillee-4-litres) suffit et pèse moins lourd. Si vous cherchez un ustensile plus léger pour des sauces de tous les jours, le [faitout en fonte d'aluminium](/produit/faitout-en-fonte-d-aluminium) chauffe plus vite. Le [potjie](/produit/marmite-potjie) reste réservé à la cuisine sur les braises.",
    conserver:
      "L'émail finit par se teinter avec les sauces à la tomate ou à l'huile de palme. Pour l'éclaircir, laissez agir une nuit un mélange d'eau chaude et de bicarbonate, puis rincez. Évitez les éponges métalliques, qui rayent l'émail, et ne chauffez jamais la cocotte vide à feu vif.",
    remplacer:
      "Un faitout épais avec un couvercle bien ajusté convient à la plupart des mijotés. Pour les plats qui finissent au four, un plat profond en céramique couvert de papier d'aluminium fait l'affaire, avec une cuisson un peu moins régulière. Prévoyez alors un peu plus de liquide.",
    enCuisine:
      "Elle accueille les sauces longues du Cameroun et du Congo, comme le [ndolé aux crevettes](/recette/ndole) ou le [poulet à la moambé](/recette/moambe), mais aussi la [soupe egusi](/recette/soupe-egusi) nigériane ou le [caldou de poisson](/recette/caldou). Pour préparer un ndolé sans amertume, lisez [Comment enlever l'amertume du ndolé ?](/conseils/enlever-amertume-du-ndole).",
    faq: [
      {
        question: "Pourquoi une cocotte en fonte est-elle si lourde ?",
        reponse:
          "Ses parois épaisses stockent la chaleur et la rendent ensuite peu à peu aux aliments. Pleine, une cocotte de cette taille se porte à deux mains, avec des maniques.",
      },
      {
        question: "Comment éviter d'écailler l'émail ?",
        reponse:
          "Utilisez des ustensiles en bois ou en silicone, évitez les chocs contre l'évier et laissez la cocotte refroidir avant de la passer sous l'eau.",
      },
    ],
  },
  "cocotte-fonte-emaillee-4-litres": {
    origine:
      "L'émail vitrifié est une couche de verre fondue sur la fonte, qui forme une surface lisse et inerte : elle ne réagit ni avec la tomate ni avec le citron, et ne transmet aucun goût de métal. C'est ce qui permet de faire mariner, cuire et garder un plat dans le même récipient.\n\nCette cocotte de la gamme Amazon Basics contient 4,1 litres. Son émail est blanc, elle convient à tous les feux, dont l'induction, et elle supporte le four jusqu'à 260 °C.",
    choisir:
      "C'est la plus petite cocotte de la boutique. Ses 4,1 litres conviennent à un plat pour deux à quatre personnes : un ragoût de lentilles, un poulet découpé, un mijoté de légumes. Moins lourde que les modèles de 28 cm, elle se manie plus facilement, surtout pleine.\n\nPour les familles nombreuses ou les plats qui se gardent plusieurs jours, la [Staub](/produit/cocotte-staub-28-cm) ou l'[Overmont de 28 cm](/produit/cocotte-fonte-emaillee-28-cm) offrent plus de 6,5 litres. Le [faitout en inox de 24 cm](/produit/faitout-inox-24-cm), de volume voisin, chauffe plus vite mais garde moins la chaleur une fois sur la table.",
    conserver:
      "L'émail blanc se colore avec le curcuma, le berbéré ou l'huile de palme rouge. Un trempage à l'eau chaude additionnée de bicarbonate atténue ces traces. Ne la mettez pas au four vide à température maximale et laissez-la refroidir avant de la laver. Le couvercle pose à plat sur un torchon.",
    remplacer:
      "Une casserole épaisse munie d'un couvercle convient pour les mijotés sur le feu, à condition de garder une flamme très douce. Pour les recettes qui finissent au four, un plat creux en terre cuite ou en verre fait l'affaire, couvert d'une feuille de papier d'aluminium bien serrée.",
    enCuisine:
      "Son format convient au [misir wat](/recette/misir-wat) aux lentilles corail, au [shiro](/recette/shiro) éthiopien, au [poulet nyembwe](/recette/poulet-nyembwe) pour quatre ou au [bobotie](/recette/bobotie), qui passe au four. Pour relever ces plats éthiopiens, voyez [Qu'est-ce que le berbéré et avec quoi le cuisiner ?](/conseils/quest-ce-que-le-berbere).",
    faq: [
      {
        question: "Peut-on conserver un plat au réfrigérateur dans la cocotte ?",
        reponse:
          "Oui, l'émail ne réagit pas avec les aliments. Laissez le plat refroidir, couvrez et réchauffez-le ensuite à feu doux dans la même cocotte.",
      },
      {
        question: "La cocotte va-t-elle sur une plaque vitrocéramique ?",
        reponse:
          "Oui, elle convient à tous les feux. Soulevez-la plutôt que de la faire glisser, pour ne pas rayer la plaque.",
      },
    ],
  },
  "couscoussier": {
    origine:
      "La cuisson des graines à la vapeur, dans un panier percé posé sur une marmite, est au cœur du couscous maghrébin. En décembre 2020, l'Algérie, le Maroc, la Mauritanie et la Tunisie ont fait inscrire ensemble les savoirs et pratiques liés au couscous au patrimoine culturel immatériel de l'UNESCO.\n\nLe même principe voyage bien au-delà du Maghreb. Au Sénégal et au Mali, on cuit ainsi le couscous de mil ; en Côte d'Ivoire, on réchauffe l'attiéké ; en Guinée, au Mali ou au Burkina Faso, le fonio cuit de la même manière. Ce modèle en inox associe la marmite et son panier.",
    choisir:
      "Vérifiez d'abord que le panier s'emboîte bien : la vapeur doit passer à travers les grains, pas sur les côtés. L'inox ne réagit pas avec les sauces tomate et supporte le lavage énergique nécessaire pour déboucher les trous.\n\nSi vous avez déjà une grande marmite, la [passoire à couscous](/produit/passoire-a-couscous) se pose dessus et remplace le panier. Pour égrener les graines entre deux cuissons, un large [saladier en bois](/produit/saladier-en-bois) est plus agréable qu'un plat creux. Pour un repas de grande famille, la marmite peut aussi servir seule, comme un faitout.",
    conserver:
      "Les petits trous du panier retiennent facilement des grains de mil ou de fonio. Un trempage dans l'eau chaude, puis un passage à la brosse sur l'envers, les décolle. Séchez bien les deux parties avant de les ranger emboîtées, pour éviter les traces de calcaire et les odeurs.",
    remplacer:
      "Une passoire métallique fine posée sur une casserole, et coiffée d'un torchon, permet de cuire une petite quantité à la vapeur. Pour le fonio, une cuisson par absorption dans un peu d'eau dépanne, avec des grains moins aérés. L'attiéké se réchauffe aussi au micro-ondes, couvert, avec une cuillère d'eau.",
    enCuisine:
      "Il cuit le couscous de mil du [thiéré mbuum](/recette/thiere-mbuum), du [ngalakh](/recette/ngalakh) et du [dégué](/recette/degue), et réchauffe l'attiéké du [garba](/recette/garba). Pour savoir s'il est vraiment indispensable, lisez [Faut-il un couscoussier pour cuire le fonio ou l'attiéké ?](/conseils/couscoussier-fonio-attieke), puis [Comment cuire le couscous de mil (thiéré) ?](/conseils/cuire-le-couscous-de-mil).",
    faq: [
      {
        question: "Pourquoi cuire la semoule deux fois à la vapeur ?",
        reponse:
          "Le premier passage gonfle les grains, qui s'agglomèrent. On les égrène, on les humecte, puis le second passage les rend légers et bien séparés.",
      },
      {
        question: "Peut-on y cuire du fonio ?",
        reponse:
          "Oui, mais les grains du [fonio](/produit/fonio) sont très fins : tapissez le panier d'un linge propre et humide pour qu'ils ne passent pas à travers les trous.",
      },
    ],
  },
  "plaque-a-injera": {
    origine:
      "En Éthiopie et en Érythrée, l'injera se cuit sur une grande plaque ronde appelée mitad en amharique et mogogo en tigrinya. Traditionnellement, c'est un disque d'argile épais posé sur trois pierres au-dessus d'un feu de bois. Les versions électriques, qui chauffent par une résistance placée sous la plaque, se sont largement répandues dans les villes et la diaspora.\n\nL'injera est faite de farine de teff, une céréale aux grains minuscules cultivée sur les hauts plateaux éthiopiens. La pâte fermente plusieurs jours avant la cuisson, ce qui lui donne son goût acidulé.",
    choisir:
      "Une plaque de 30 cm donne des injeras plus petites que celles des restaurants, mais faciles à retirer et à empiler à la maison. La régularité de la chaleur compte plus que la puissance : une plaque qui chauffe inégalement donne des crêpes cuites au centre et pâles au bord.\n\nPour réussir la pâte elle-même, partez d'une [farine de teff](/produit/farine-de-teff) pure ou mélangée à un peu de farine de blé. Le [berbéré](/produit/berbere) servira ensuite à relever les ragoûts posés sur l'injera. Une poêle à crêpes ne la remplace qu'en partie : sa surface plus petite oblige à des galettes très fines.",
    conserver:
      "Rangez la plaque à plat, dans son carton ou sous un torchon, pour protéger la surface des rayures et de la poussière. Enroulez le cordon sans le serrer. Avant chaque usage, un simple essuyage au papier absorbant suffit si elle a été bien nettoyée la fois précédente.",
    remplacer:
      "Une grande poêle antiadhésive à fond épais, munie d'un couvercle, permet de cuire des injeras plus petites. Chauffez-la bien, versez la pâte, couvrez aussitôt et ne retournez pas : la vapeur cuit le dessus. Une crêpière électrique ronde convient aussi, couverte d'un grand couvercle.",
    enCuisine:
      "Elle cuit l'[injera au teff](/recette/injera) qui accompagne le [doro wat](/recette/doro-wat), le [misir wat](/recette/misir-wat) et le [shiro](/recette/shiro). Pour comprendre cette farine et ses autres usages, lisez [Qu'est-ce que la farine de teff et que peut-on en faire ?](/conseils/que-faire-avec-la-farine-de-teff), et pour l'épice des ragoûts, [Qu'est-ce que le berbéré et avec quoi le cuisiner ?](/conseils/quest-ce-que-le-berbere).",
    faq: [
      {
        question: "Pourquoi ne retourne-t-on pas l'injera ?",
        reponse:
          "Elle cuit d'un seul côté, couverte : la vapeur cuit le dessus, qui garde ses petits trous. Ce sont eux qui retiennent la sauce des ragoûts.",
      },
      {
        question: "Que faire si l'injera colle à la plaque ?",
        reponse:
          "La plaque n'était sans doute pas assez chaude, ou la pâte trop épaisse. Allongez-la d'un peu d'eau et attendez qu'une goutte grésille avant de verser.",
      },
    ],
  },
};
