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
  "blender-ninja-detect-3-en-1": {
    origine:
      "Le mixeur à lame tournante est une invention du XXe siècle : en 1922, l'Américain Stephen Poplawski dépose le brevet d'un appareil dont l'hélice tourne au fond d'un récipient. Ninja, la marque de l'entreprise américaine SharkNinja, en propose ici une version à trois récipients montés sur un seul socle.\n\nDans les cuisines d'Afrique de l'Ouest et du Centre, le blender a repris une partie du travail longtemps confié au mortier et à la pierre à écraser : la purée de tomates, de poivrons et de piment qui ouvre tant de sauces, la pâte de haricots des beignets, les graines moulues des soupes.",
    choisir:
      "L'intérêt de ce modèle tient à ses trois contenants. Le grand pichet sert aux bases de sauce et aux jus, le bol à lames remplace un petit robot pour hacher sans liquéfier, et le gobelet évite de sortir tout l'appareil pour une seule boisson. Si vous cherchez avant tout la puissance brute pour les graines dures, le [blender AMZCHEF de 2000 W](/produit/blender-amzchef-2000w) va plus loin. Pour les purées d'arachide, le [Springlane Hanno](/produit/blender-springlane-hanno-2000w) a un petit bol en inox dédié. Si vous préférez le verre au plastique, regardez le [Magimix Power 4](/produit/blender-magimix-power-4) ou le [Moulinex PerfectMix](/produit/blender-moulinex-perfectmix).",
    conserver:
      "Débranchez toujours le socle avant de retirer les lames : elles sont amovibles et très coupantes. Rincez chaque récipient dès la fin du mixage, surtout après une sauce à l'huile de palme ou au curcuma, qui colorent vite le plastique. Laissez sécher les joints et les couvercles à l'air libre avant de tout remonter, et rangez les lames à part, dans le bol.",
    remplacer:
      "Un [mortier en granit](/produit/mortier-en-granit) écrase l'ail, le gingembre et le piment avec plus de parfum, mais demande du temps pour une grande quantité de tomates. Une râpe à gros trous suffit pour l'oignon et la tomate d'une petite sauce. Pour une seule boisson, un [mixeur plongeant](/produit/mixeur-plongeant-moulinex-daily-chef) et son gobelet font aussi l'affaire.",
    enCuisine:
      "Le pichet prépare la purée rouge du [riz jollof](/recette/riz-jollof) et la pâte de niébé des [akara](/recette/akara) ou du [koki](/recette/koki). Le gobelet convient au [jus de gingembre](/recette/jus-de-gingembre), dont la méthode est détaillée dans [Comment faire un jus de gingembre maison ?](/conseils/faire-un-jus-de-gingembre-maison).",
    faq: [
      {
        question: "Faut-il ajouter de l'eau pour mixer une base de sauce ?",
        reponse:
          "Les tomates fraîches rendent assez de jus. Pour l'oignon et le piment seuls, ajoutez deux ou trois cuillères d'eau afin que les lames tournent librement.",
      },
      {
        question: "Peut-on mixer des haricots crus trempés ?",
        reponse:
          "Oui, c'est la méthode des akara : les haricots trempés et dépelliculés se mixent avec un peu d'eau jusqu'à une pâte lisse et légère.",
      },
    ],
  },
  "blender-amzchef-2000w": {
    origine:
      "Les blenders dits professionnels se distinguent par un moteur très rapide et des lames multiples. Ce modèle AMZCHEF dispose ses huit lames sur plusieurs niveaux pour créer un tourbillon qui ramène sans cesse les morceaux vers le centre.\n\nCette puissance répond à un besoin bien connu des cuisines africaines : réduire en poudre ou en pâte des ingrédients durs que l'on écrasait autrefois à la pierre ou au pilon, comme les graines d'egusi, les arachides grillées ou le gingembre fibreux. Ce qui demandait une longue séance de pilage se fait désormais en quelques dizaines de secondes, à condition de bien doser.",
    choisir:
      "Choisissez ce modèle si vous travaillez souvent des graines, des noix ou des racines dures, ou si vous mixez de grands volumes pour une famille. Pour un usage plus léger, sauces et jus du quotidien, le [Philips 5000](/produit/blender-philips-5000) ou le [Moulinex Blendforce](/produit/blender-moulinex-blendforce) suffisent et prennent moins de place. Le [Springlane Hanno](/produit/blender-springlane-hanno-2000w) offre une puissance comparable avec, en plus, un petit bol pour les pâtes épaisses. Le [Ninja Detect](/produit/blender-ninja-detect-3-en-1), lui, ajoute un bol de hachage et un gobelet individuel.",
    conserver:
      "Après une pâte grasse, versez de l'eau tiède et une goutte de liquide vaisselle dans le bol, puis lancez quelques secondes à vitesse basse : la plupart des résidus se détachent. Rincez, puis séchez le bol tête en bas. Ne plongez jamais le socle moteur dans l'eau ; essuyez-le avec un chiffon humide. Laissez reposer l'appareil quelques minutes entre deux longues séances.",
    remplacer:
      "Pour moudre des graines sans blender, un moulin à café électrique réservé aux épices donne une poudre fine en petite quantité. Le [grand mortier en granit de 20 cm](/produit/grand-mortier-granit-20-cm) écrase arachides et graines avec un peu de patience. Vous pouvez aussi partir de produits déjà prêts, comme la [pâte d'arachide](/produit/pate-d-arachide) ou les [graines d'egusi](/produit/graines-d-egusi) moulues.",
    enCuisine:
      "Sa puissance sert pour l'oignon et les piments de la [soupe egusi](/recette/soupe-egusi), les arachides cuites du [ndolé](/recette/ndole) ou la base tomate-oignon de la [groundnut soup](/recette/groundnut-soup). Pour corriger une sauce trop liquide, voyez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide), et pour régler la force des piments mixés, [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Peut-on faire de la pâte d'arachide maison avec ce blender ?",
        reponse:
          "Oui, avec des arachides grillées et refroidies, par petites quantités. Arrêtez-vous régulièrement pour racler les parois et laisser le moteur respirer.",
      },
      {
        question: "Pourquoi la préparation reste-t-elle bloquée sous les lames ?",
        reponse:
          "Le bol est trop plein ou la pâte trop sèche. Retirez une partie du contenu ou ajoutez une cuillère de liquide, puis reprenez par impulsions.",
      },
    ],
  },
  "blender-springlane-hanno-2000w": {
    origine:
      "Springlane est une marque allemande d'ustensiles et d'appareils de cuisine, installée à Düsseldorf. Son blender Hanno associe un grand bol à un petit récipient en inox, prévu pour les préparations épaisses qui collent aux parois.\n\nCe petit bol rejoint une vieille habitude africaine. Les pâtes de graines et d'oléagineux, arachide, sésame ou egusi, ont longtemps été obtenues à la meule de pierre ou au mortier, au prix d'un long effort. Une petite quantité dans un récipient étroit se mixe mieux qu'au fond d'un grand pichet, où les lames tournent souvent à vide.",
    choisir:
      "Le petit bol en inox fait la différence pour quiconque prépare souvent une pâte d'arachide, un pesto de feuilles ou une purée de graines. Pour les grands volumes de sauce, le [blender AMZCHEF](/produit/blender-amzchef-2000w) a la même puissance avec un bol de 2 litres. Si vous voulez surtout hacher et trancher, le [robot Moulinex Easy Force](/produit/robot-moulinex-easy-force) est plus polyvalent. Et pour de toutes petites quantités d'ail ou de piment, le [mini hachoir LEO8](/produit/hachoir-h-koenig-leo8) reste plus pratique.",
    conserver:
      "Les pâtes d'oléagineux laissent un film gras : nettoyez le bol en inox à l'eau chaude dès la fin du mixage, avant qu'elles ne durcissent. Une spatule souple aide à récupérer le reste de pâte et facilite le lavage. Laissez la gourde ouverte pour qu'elle sèche sans odeur, et rangez les lames hors de portée des enfants.",
    remplacer:
      "Sans blender puissant, la pâte d'arachide se fait au [mortier en bois](/produit/mortier-et-pilon-en-bois), en pilant les arachides grillées par petites poignées. Le résultat est plus rustique, mais très parfumé. Un robot à couteau peut aussi convenir, avec des pauses fréquentes pour racler le bol. Et la [pâte d'arachide](/produit/pate-d-arachide) toute prête dépanne pour un mafé improvisé.",
    enCuisine:
      "Le petit bol est idéal pour la pâte d'arachide du [mafé](/recette/mafe) ou du [ndolé](/recette/ndole), et pour le mélange de gingembre, d'oignon et de piment des [kelewele](/recette/kelewele). La gourde accueille un [jus de bissap](/recette/jus-de-bissap) à emporter. Pour garder une pâte maison, lisez [Combien de temps se garde la pâte d'arachide ouverte ?](/conseils/combien-de-temps-se-garde-la-pate-d-arachide).",
    faq: [
      {
        question: "Faut-il griller les arachides avant de les mixer ?",
        reponse:
          "Pour une pâte, oui : le grillage développe le goût et aide l'huile à sortir. Laissez-les refroidir et retirez les peaux en les frottant entre les mains.",
      },
      {
        question: "Combien d'arachides mettre dans le petit bol ?",
        reponse:
          "Remplissez-le à moitié environ. Une petite quantité tourne mieux et donne une pâte plus lisse qu'un bol plein à ras bord.",
      },
    ],
  },
  "blender-magimix-power-4": {
    origine:
      "Magimix est une marque française dont les robots ménagers sont fabriqués à Montceau-les-Mines, en Bourgogne, depuis le début des années 1970. Elle est née d'un robot conçu pour les cuisines professionnelles, adapté ensuite aux foyers. Le Power 4 est l'un de ses blenders à bol en verre.\n\nLe verre a une qualité précieuse pour la cuisine africaine : il ne garde ni l'odeur du poisson fumé ni la couleur rouge de l'huile de palme, du piment ou de la tomate, qui finissent souvent par teinter les bols en plastique.",
    choisir:
      "Prenez ce modèle si vous mixez à la fois des soupes chaudes et des boissons froides, et si un bol qui ne se raye pas compte pour vous. Le verre est plus lourd à manipuler qu'un pichet en plastique. Le [Moulinex PerfectMix](/produit/blender-moulinex-perfectmix) propose aussi un bol en verre, un peu plus grand, et le [Moulinex Blendforce](/produit/blender-moulinex-blendforce) une version plus simple et moins puissante. Pour les grandes quantités de graines dures, l'[AMZCHEF de 2000 W](/produit/blender-amzchef-2000w) a plus de réserve.",
    conserver:
      "Le programme de rinçage dégrossit le nettoyage, mais un passage à l'éponge reste utile autour des lames. Ne versez pas d'eau froide dans un bol encore brûlant, même si le verre supporte bien la chaleur. Rangez le bol sur une étagère basse, couvercle posé dessus, et vérifiez de temps en temps l'état du joint.",
    remplacer:
      "Pour une soupe, un [mixeur plongeant](/produit/mixeur-plongeant-moulinex-daily-chef) travaille directement dans la marmite, sans transvaser. Pour une petite base d'aromates, le [mini hachoir LEO8](/produit/hachoir-h-koenig-leo8), lui aussi en verre, suffit. Et pour une sauce plus rustique, le [tamis en bois](/produit/tamis-en-bois) permet de passer des légumes écrasés à la fourchette.",
    enCuisine:
      "Le bol en verre convient bien à la [fufu et light soup](/recette/fufu-light-soup), dont les légumes cuits se mixent avec le bouillon, à la sauce du [mbongo tchobi](/recette/mbongo-tchobi) ou à la purée de tomates de la [groundnut soup](/recette/groundnut-soup). Côté boissons, il prépare le [jus de bouye](/recette/jus-de-bouye) ; pour en savoir plus, lisez [Que faire avec la poudre de baobab (pain de singe) ?](/conseils/que-faire-avec-la-poudre-de-baobab).",
    faq: [
      {
        question: "Peut-on mixer une soupe bouillante dans un bol en verre ?",
        reponse:
          "Le verre supporte la chaleur, mais la vapeur peut soulever le couvercle. Laissez tiédir quelques minutes et ne remplissez pas le bol au-delà de la moitié.",
      },
      {
        question: "Le bol garde-t-il l'odeur du piment ?",
        reponse:
          "Beaucoup moins qu'un bol en plastique. Un rinçage à l'eau chaude avec un peu de liquide vaisselle suffit en général.",
      },
    ],
  },
  "blender-moulinex-perfectmix": {
    origine:
      "Moulinex est née en France d'un ustensile tout simple, le moulin-légumes à manivelle, breveté en 1932 par Jean Mantelet. L'entreprise prend le nom de Moulinex en 1957, pour « moulin express », et la marque appartient aujourd'hui au groupe SEB. Le PerfectMix Plus perpétue cette histoire avec un bol en verre de grande contenance.\n\nDans beaucoup de familles africaines, le blender est devenu l'appareil des grandes marmites : on y prépare en une fois la base d'une sauce pour huit ou dix personnes, là où le mortier demandait plusieurs tournées.",
    choisir:
      "Ses 2 litres en verre en font un bon choix pour les familles nombreuses qui veulent éviter le plastique. Le [Magimix Power 4](/produit/blender-magimix-power-4), un peu plus petit, ajoute des programmes automatiques. Le [Moulinex Blendforce](/produit/blender-moulinex-blendforce), de la même marque, est plus modeste en puissance et en volume. Si le poids du verre vous gêne, le [Philips 5000](/produit/blender-philips-5000) a un bol en plastique plus léger.",
    conserver:
      "Le programme de nettoyage se lance juste après le mixage, avant que les restes ne sèchent. Démontez ensuite les lames de temps en temps pour rincer le joint, où se logent souvent des fibres de gingembre ou des peaux de tomate. Séchez bien chaque pièce avant de remonter le bol, et posez l'appareil loin du bord du plan de travail.",
    remplacer:
      "Sans blender, la purée de tomates d'un jollof se fait à la râpe, puis se réduit plus longtemps à la marmite. L'oignon et l'ail s'écrasent au [mortier en granit de 16 cm](/produit/mortier-granit-16-cm), assez profond pour les préparations juteuses. Pour une petite quantité, le [mini hachoir LEO8](/produit/hachoir-h-koenig-leo8) prend le relais.",
    enCuisine:
      "Il prépare d'un coup la purée de tomates et de poivrons du [riz jollof](/recette/riz-jollof), la marinade du [poulet DG](/recette/poulet-dg) ou les piments de la [pepper soup](/recette/pepper-soup). Pour la couleur et le goût du riz rouge sénégalais, lisez aussi [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne).",
    faq: [
      {
        question: "Pourquoi mixer la base de sauce plutôt que la couper ?",
        reponse:
          "Une purée cuit plus vite et de façon plus régulière. Elle donne aussi une sauce lisse qui enrobe bien le riz, comme dans le jollof.",
      },
      {
        question: "Faut-il cuire la purée de tomates après l'avoir mixée ?",
        reponse:
          "Oui, faites-la réduire jusqu'à ce que l'eau s'évapore et que l'huile remonte. C'est cette étape qui enlève le goût acide de la tomate crue.",
      },
    ],
  },
  "blender-philips-5000": {
    origine:
      "Philips est une entreprise néerlandaise née à Eindhoven en 1891, d'abord pour fabriquer des ampoules, avant de s'étendre à l'électroménager. Ce blender de la série 5000 mise sur un bol nervuré : les reliefs de la paroi cassent le tourbillon et renvoient les morceaux vers les lames.\n\nC'est un appareil du quotidien plus qu'un outil de force. Dans une cuisine africaine, il sert surtout aux préparations liquides ou juteuses, celles que l'on écrasait autrefois sur la pierre avant de les délayer : purées de tomates, marinades d'oignon et d'ail, jus de fruits ou de gingembre.",
    choisir:
      "Retenez surtout sa capacité utile de 1,5 litre : elle suffit pour une sauce de famille de quatre à six personnes. Son bol en plastique est léger et facile à manier, ce qui plaît à ceux qui trouvent le verre encombrant. Pour les grandes tablées, le [Moulinex PerfectMix](/produit/blender-moulinex-perfectmix) et ses 2 litres en verre conviennent mieux. Pour broyer des graines dures, l'[AMZCHEF](/produit/blender-amzchef-2000w) ou le [Springlane Hanno](/produit/blender-springlane-hanno-2000w) ont plus de puissance. Le [Moulinex Blendforce](/produit/blender-moulinex-blendforce) est une autre option simple, en verre.",
    conserver:
      "Le plastique prend vite la couleur de l'huile de palme et l'odeur du poisson séché. Lavez donc le bol sans attendre, à l'eau chaude savonneuse. Si une teinte orangée persiste, laissez le bol vide quelques heures à la lumière du jour : elle s'atténue souvent. Évitez les éponges abrasives, qui rayent la paroi et retiennent ensuite les odeurs.",
    remplacer:
      "Pour un jus de gingembre, une râpe fine et un linge propre pour presser la pulpe donnent un très bon résultat. Pour une marinade, l'ail, le gingembre et l'oignon s'écrasent au [mortier en granit](/produit/mortier-en-granit). Une soupe se mixe aussi avec un [mixeur plongeant](/produit/mixeur-plongeant-moulinex-daily-chef), sans sortir la marmite du plan de travail.",
    enCuisine:
      "Il réduit en purée l'ail, le gingembre et l'oignon de la [groundnut soup](/recette/groundnut-soup) ou du [poulet DG](/recette/poulet-dg), et prépare les piments du [poisson braisé et attiéké](/recette/poisson-braise-attieke). Pour la boisson, suivez [Comment faire un jus de gingembre maison ?](/conseils/faire-un-jus-de-gingembre-maison) ; vous pouvez aussi partir de l'[infusion de gingembre](/produit/infusion-de-gingembre).",
    faq: [
      {
        question: "Peut-on mixer de la glace dans ce blender ?",
        reponse:
          "Pour un jus servi frais, ajoutez plutôt les glaçons au moment de servir. Mixer la glace use les lames d'un appareil de puissance moyenne.",
      },
      {
        question: "Quelle quantité de sauce peut-on préparer en une fois ?",
        reponse:
          "Environ un litre et demi. Au-delà, mixez en deux fois et réunissez les deux purées dans la marmite.",
      },
    ],
  },
  "blender-moulinex-blendforce": {
    origine:
      "Le Blendforce est l'un des blenders les plus simples de Moulinex, marque française issue du moulin-légumes des années 1930. Son moteur est refroidi par un flux d'air, ce qui lui permet de tourner quelques minutes d'affilée sans chauffer.\n\nIl illustre bien la place qu'a prise le blender dans les foyers africains et de la diaspora : un appareil sans fioritures, sorti chaque jour pour la base de la sauce, puis rangé. Beaucoup de cuisinières l'utilisent en complément du mortier, qui garde la main sur les épices et les graines.",
    choisir:
      "C'est un bon premier blender, pour un couple ou une petite famille, si vous voulez un bol en verre sans investir dans un appareil très puissant. Il convient aux tomates, aux oignons, aux piments frais et aux jus. Son bol supporte une préparation chaude jusqu'à 80 °C, pas une soupe sortant du feu. Le [Magimix Power 4](/produit/blender-magimix-power-4) accepte les préparations plus chaudes et offre des programmes. Le [PerfectMix](/produit/blender-moulinex-perfectmix) de la même marque monte à 2 litres. Pour les graines dures, préférez l'[AMZCHEF](/produit/blender-amzchef-2000w).",
    conserver:
      "Respectez la durée maximale de mixage : au-delà, laissez le moteur refroidir quelques minutes. Rincez le bol en verre juste après usage et démontez de temps en temps le bloc de lames pour nettoyer le joint. Laissez un espace libre autour du socle pendant le fonctionnement, pour que l'air circule.",
    remplacer:
      "Un [mortier en bois d'acacia](/produit/mortier-et-pilon-en-bois) écrase oignons, ail et piment pour une petite sauce. Un [mini hachoir](/produit/hachoir-h-koenig-leo8) prend moins de place pour les aromates. Pour un jus de fruits, une fourchette et un [tamis en bois](/produit/tamis-en-bois) suffisent avec des fruits bien mûrs.",
    enCuisine:
      "Utilisez-le pour la marinade d'oignon du [poulet yassa](/recette/poulet-yassa) si vous préférez une version lisse, pour la base du [riz jollof](/recette/riz-jollof) ou pour les légumes mixés de la [fufu et light soup](/recette/fufu-light-soup), une fois tiédis. Pour débuter, l'article [Par quelle recette africaine commencer quand on débute ?](/conseils/par-quelle-recette-commencer) propose des plats simples.",
    faq: [
      {
        question: "Que veut dire « jusqu'à 80 °C » pour le bol ?",
        reponse:
          "Que le bol supporte une préparation chaude, mais pas bouillante. Laissez reposer une soupe ou une sauce quelques minutes hors du feu avant de la verser.",
      },
      {
        question: "Ce blender suffit-il pour moudre des graines d'egusi ?",
        reponse:
          "Pour une petite quantité, oui, par impulsions courtes. Pour des volumes réguliers, des graines déjà moulues ou un appareil plus puissant sont plus pratiques.",
      },
    ],
  },
  "robot-moulinex-easy-force": {
    origine:
      "Le robot multifonction est apparu dans les cuisines professionnelles françaises dans les années 1960, puis s'est installé dans les foyers au début des années 1970. Contrairement au blender, il ne fait pas que mixer : ses disques tranchent et râpent, son couteau hache et son crochet pétrit. Ce modèle compact de Moulinex réunit ces fonctions autour d'un bol de 3 litres.\n\nDans la cuisine africaine, il remplace surtout le couteau et la planche pour les grandes quantités de légumes, comme l'oignon, le chou ou la carotte.",
    choisir:
      "Choisissez un robot plutôt qu'un blender si vous émincez souvent beaucoup de légumes ou si vous pétrissez des pâtes. Il hache les aromates sans les liquéfier, ce qu'un blender fait mal. En revanche, pour une purée très lisse ou un jus, un blender comme le [Moulinex PerfectMix](/produit/blender-moulinex-perfectmix) reste plus efficace. Le [Ninja Detect](/produit/blender-ninja-detect-3-en-1) est un compromis : blender et bol à hacher sur le même socle. Pour l'ail seul, le [mini hachoir LEO8](/produit/hachoir-h-koenig-leo8) est plus rapide à sortir et à laver.",
    conserver:
      "Rangez les accessoires dans le bol, mais le couteau et les disques à part, dans leur étui ou bien enveloppés : ils coupent même à l'arrêt. Lavez-les dès la fin, avant que les fibres d'oignon ou la pâte ne sèchent. Vérifiez que l'arbre et le couvercle sont secs avant de remonter le robot.",
    remplacer:
      "Un bon couteau et une planche font le même travail pour une petite quantité, avec plus de temps. Une râpe à main suffit pour la carotte et le chou. Pour hacher ail, gingembre et piment, un [mortier en granit de 18 cm](/produit/mortier-granit-18-cm) écrase plutôt qu'il ne coupe, et donne plus de parfum.",
    enCuisine:
      "Ses disques émincent les nombreux oignons du [poulet yassa](/recette/poulet-yassa) ou du [misir wat](/recette/misir-wat), et râpent les légumes du [chakalaka](/recette/chakalaka). Le couteau prépare la pâte d'aromates du [kedjenou](/recette/kedjenou). Pour les oignons du yassa, l'article [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa) explique l'importance de la marinade.",
    faq: [
      {
        question: "Robot ou blender pour la cuisine africaine ?",
        reponse:
          "Les deux se complètent. Le blender fait les purées lisses et les jus, le robot émince, râpe et hache en gardant de la texture.",
      },
      {
        question: "Peut-on pétrir une pâte à beignets avec ce robot ?",
        reponse:
          "Oui, avec l'accessoire de pétrissage, pour une pâte à puff-puff ou à pain. La pâte très liquide se mélange mieux au fouet, dans un saladier.",
      },
    ],
  },
  "mixeur-plongeant-moulinex-daily-chef": {
    origine:
      "Le mixeur plongeant, avec son moteur dans le manche et sa lame protégée au bout d'un pied, a été mis au point en Suisse au milieu du XXe siècle. Il a changé la façon de mixer les soupes : plus besoin de transvaser une marmite brûlante dans un bol, on mixe sur place.\n\nCe modèle Daily Chef de Moulinex garde l'essentiel de cette idée. Il convient bien aux cuisines où l'on mijote de grandes marmites de sauce, comme dans beaucoup de foyers africains, et où l'on veut lisser une partie de la préparation sans tout déplacer.",
    choisir:
      "Prenez-le si vous mixez surtout des soupes, des sauces déjà cuites et de petites quantités dans son gobelet. Il ne prend presque pas de place dans un tiroir. Il atteint ses limites avec les graines sèches, la glace ou une grande quantité de tomates crues : un blender comme le [Philips 5000](/produit/blender-philips-5000) ou le [Moulinex Blendforce](/produit/blender-moulinex-blendforce) s'en charge mieux. Pour hacher ail et oignon, le [mini hachoir LEO8](/produit/hachoir-h-koenig-leo8) donne des morceaux plus réguliers.",
    conserver:
      "Débranchez-le avant de rincer le pied, puis passez celui-ci sous l'eau chaude en évitant de mouiller le manche moteur. Un mixage de quelques secondes dans un verre d'eau savonneuse nettoie bien la lame. Laissez sécher le pied à l'air, à la verticale, et rangez le cordon sans le serrer autour du corps.",
    remplacer:
      "Pour une soupe, un presse-purée donne une texture rustique, et un passage au [tamis en bois](/produit/tamis-en-bois) affine le tout. Pour une sauce, vous pouvez aussi verser la préparation dans un blender à bol en verre, comme le [Magimix Power 4](/produit/blender-magimix-power-4), après l'avoir laissée tiédir.",
    enCuisine:
      "Il lisse les légumes de la [fufu et light soup](/recette/fufu-light-soup) et la sauce de la [groundnut soup](/recette/groundnut-soup) directement dans la marmite. Son gobelet suffit pour les piments de la [pepper soup](/recette/pepper-soup). Pour ajuster une sauce trop fluide, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide).",
    faq: [
      {
        question: "Peut-on mixer dans une marmite en fonte émaillée ?",
        reponse:
          "Oui, mais gardez le pied bien droit et évitez de frotter le fond : la protection de la lame peut marquer l'émail.",
      },
      {
        question: "Pourquoi la soupe éclabousse-t-elle ?",
        reponse:
          "Le pied n'est pas assez immergé ou la vitesse est trop forte au départ. Plongez-le entièrement, démarrez doucement et inclinez légèrement la marmite si le liquide est peu profond.",
      },
    ],
  },
  "hachoir-h-koenig-leo8": {
    origine:
      "Le mini hachoir électrique est le cousin du robot : un bol, une lame en hélice et un moteur posé sur le couvercle, pour les petites quantités que les gros appareils broient mal. Le LEO8 de H.Koenig associe ce principe à un bol en verre gradué.\n\nIl répond à un geste répété chaque jour dans les cuisines africaines : écraser une ou deux gousses d'ail, un morceau de gingembre, un piment et un oignon pour la base de la sauce. Ce travail revenait au petit mortier ou à la pierre ; le hachoir le fait en quelques impulsions.",
    choisir:
      "Il convient aux aromates, aux herbes et aux petites marinades, pas aux grands volumes ni aux liquides abondants. Son bol en verre ne garde pas l'odeur de l'ail. Pour une sauce de famille, un blender comme le [Moulinex PerfectMix](/produit/blender-moulinex-perfectmix) ou le [Philips 5000](/produit/blender-philips-5000) est plus adapté. Pour émincer beaucoup de légumes, le [robot Easy Force](/produit/robot-moulinex-easy-force) est plus complet. Le [mortier en granit](/produit/mortier-en-granit), lui, donne une pâte plus parfumée mais demande davantage d'effort.",
    conserver:
      "Le bloc moteur ne va jamais sous l'eau : essuyez-le avec un chiffon humide. Le bol en verre et la lame se lavent à la main, la lame tenue par son axe central. Séchez bien l'axe avant de remonter. Rangez la lame dans le bol, couvercle fermé, pour la protéger des chocs et protéger vos doigts.",
    remplacer:
      "Un [petit mortier en hêtre](/produit/petit-mortier-hetre) suffit pour une gousse d'ail et un piment. Un couteau bien aiguisé hache finement oignon et herbes. Une râpe fine transforme le gingembre en pulpe, que l'on presse ensuite dans un linge propre pour en extraire le jus parfumé.",
    enCuisine:
      "Il prépare l'ail, le gingembre et l'oignon du [poulet DG](/recette/poulet-dg), du [kelewele](/recette/kelewele) ou du [pilau](/recette/pilau), et l'oignon et l'ail du [poulet nyembwe](/recette/poulet-nyembwe), avant leur passage dans la marmite. Pour jouer avec la force des piments frais, lisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Faut-il éplucher le gingembre avant de le hacher ?",
        reponse:
          "Pas forcément s'il est jeune et propre. Pour un gingembre plus vieux, grattez la peau avec le bord d'une cuillère et coupez-le en rondelles avant de le hacher.",
      },
      {
        question: "Comment éviter une purée quand on hache un oignon ?",
        reponse:
          "Coupez-le en quartiers et procédez par impulsions courtes, en regardant la texture. Arrêtez dès que les morceaux ont la taille voulue.",
      },
    ],
  },
// FICHES
};
