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
 *   - spatules-en-bois — Ustensiles de cuisine en bois de hêtre (lot de 4)
 *   - brochettes-en-metal — Brochettes en métal 40 cm (lot de 30)
 *   - feuilles-de-bananier-fraiches — Feuilles de bananier fraîches (lot de 100)
 *   - saladier-en-bois — Grand saladier en bois d'acacia 26 cm
 *   - saladiers-acacia-lot-de-2 — Lot de 2 saladiers en bois d'acacia 20 cm, 760 ml
 *   - plateau-acacia-amazon-basics — Plateau de service en bois d'acacia 43 × 30 cm (Amazon Basics)
 *   - plateau-rond-bambou-40-cm — Plateau de service rond en bambou 40 cm (5five)
 *   - bols-manguier-lot-de-3 — Lot de 3 bols ronds en bois de manguier (Samhita)
 *   - bols-noix-de-coco-lot-de-2 — Lot de 2 bols en noix de coco avec cuillères (Jungle Culture)
 *   - verres-a-the — Verres à thé facettés à anse 210 ml (lot de 6)
 *   - verres-a-the-et-soucoupes-pasabahce — Lot de 6 verres à thé et 6 soucoupes Aurora (Pasabahce)
 *   - theiere-a-ataya — Théière à ataya inox 1 L (Ibili El Yadida)
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
      "Ses 2 litres en verre en font un bon choix pour les familles nombreuses qui veulent éviter le plastique. Le [Magimix Power 4](/produit/blender-magimix-power-4), un peu plus petit avec 1,8 litre, a un moteur plus puissant de 1 300 W et cinq programmes automatiques. Le [Moulinex Blendforce](/produit/blender-moulinex-blendforce), de la même marque, est plus modeste en puissance et en volume. Si le poids du verre vous gêne, le [Philips 5000](/produit/blender-philips-5000) a un bol en plastique plus léger.",
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
      "Le Blendforce est l'un des blenders les plus simples de Moulinex, marque française issue du moulin-légumes des années 1930. Son moteur est refroidi par un flux d'air, ce qui lui permet de tourner quelques minutes d'affilée sans chauffer.\n\nMoulinex annonce jusqu'à trois minutes de mixage continu, à toutes les vitesses, pour un moteur de 800 W et un bol en verre de 1,75 litre. Beaucoup de cuisinières l'utilisent en complément du mortier, qui garde la main sur les épices et les graines.",
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
  "tamis-en-bois": {
    origine:
      "Bien avant les toiles métalliques, on séparait la farine du son avec des vanneries finement tressées ou des tissus tendus sur un cadre. En Afrique de l'Ouest, les femmes vannent encore le mil et le fonio dans de larges plateaux de paille, en faisant sauter les grains pour que le vent emporte les balles.\n\nLe tamis à cadre en bois reprend ce principe sous une forme plus précise : une toile à maille fine, tendue sur un cercle de bois, laisse passer la poudre et retient les grumeaux, les fibres et les petites impuretés.",
    choisir:
      "Le diamètre de 24 cm convient à la plupart des saladiers et permet de tamiser une quantité de farine pour une famille. Une maille fine sert aux farines de [teff](/produit/farine-de-teff), de [maïs blanc](/produit/farine-de-mais-blanc) ou de [foufou](/produit/farine-de-foufou), et aux jus que l'on veut sans fibres. Ne le confondez pas avec la [passoire à couscous](/produit/passoire-a-couscous), percée de trous plus larges : elle sert à cuire à la vapeur et à égoutter, pas à affiner une poudre.",
    conserver:
      "Les farines attirent les petits insectes du placard. Tapotez bien le tamis après chaque usage pour qu'il ne reste aucune poudre dans les angles du cadre, puis rangez-le dans un sac en tissu ou un tiroir fermé. Si vous l'avez utilisé pour un jus, rincez la toile aussitôt à l'eau froide, sans savon, et laissez-le sécher debout, loin d'une source de chaleur qui pourrait fendre le bois.",
    remplacer:
      "Une passoire fine en inox fait l'affaire pour une petite quantité de farine, en remuant avec une cuillère. Pour filtrer un jus de baobab ou de gingembre, un linge propre en coton fin, pressé à la main, retient encore mieux les fibres. À défaut de tout cela, fouettez simplement la farine à sec pour l'aérer.",
    enCuisine:
      "Il filtre la boisson de pain de singe du [jus de bouye](/recette/jus-de-bouye) et la crème du [ngalakh](/recette/ngalakh), le [jus de gingembre](/recette/jus-de-gingembre), et affine les légumes de la [fufu et light soup](/recette/fufu-light-soup). Pour la farine éthiopienne, lisez [Qu'est-ce que la farine de teff et que peut-on en faire ?](/conseils/que-faire-avec-la-farine-de-teff), puis lancez-vous dans l'[injera](/recette/injera).",
    faq: [
      {
        question: "Faut-il tamiser la farine de teff pour l'injera ?",
        reponse:
          "Ce n'est pas obligatoire, mais une farine tamisée se délaye sans grumeaux et donne une pâte plus homogène, qui fermente de façon régulière.",
      },
      {
        question: "Peut-on filtrer un jus avec un tamis en bois ?",
        reponse:
          "Oui, ponctuellement. Rincez-le tout de suite et laissez-le bien sécher ; si vous filtrez souvent des jus, un linge ou une passoire en inox s'abîme moins.",
      },
    ],
  },
  "passoire-a-couscous": {
    origine:
      "La cuisson à la vapeur des grains roulés est née en Afrique du Nord et a gagné le Sahel. Au Sénégal ou au Mali, le couscous de mil se cuit de la même manière, au-dessus de la marmite où mijote la sauce. En Côte d'Ivoire, l'attiéké de manioc suit le même principe.\n\nCette passoire de 23 cm reprend ce montage simple : un fond percé qui se pose sur une marmite et laisse monter la vapeur à travers les grains, sans qu'ils trempent dans le liquide.",
    choisir:
      "Le point essentiel est le diamètre : la passoire doit reposer sur le bord de la marmite sans tomber dedans. Mesurez l'ouverture de votre [marmite en aluminium](/produit/marmite-en-aluminium) ou de votre [faitout](/produit/faitout-en-fonte-d-aluminium) avant de l'utiliser. Si vous cuisez souvent pour une grande tablée, un [couscoussier](/produit/couscoussier) complet, avec son panier ajusté, évite les fuites de vapeur. Pour affiner une farine, prenez plutôt le [tamis en bois](/produit/tamis-en-bois), dont la maille est bien plus serrée.",
    conserver:
      "Les grains de fonio, très fins, se coincent facilement dans les trous. Faites tremper la passoire quelques minutes dans l'eau chaude avant de la brosser, puis tapotez-la à l'envers au-dessus de l'évier. Séchez-la bien avant de la ranger, surtout si elle est en métal, et empilez-la à l'envers sur la marmite qui lui correspond pour ne plus chercher la bonne paire.",
    remplacer:
      "Une passoire à pâtes en métal, posée sur une marmite de même taille, peut servir de panier vapeur. Si les trous sont trop larges pour le fonio, tapissez le fond d'un linge fin humide. Le [couscous de mil](/produit/couscous-de-mil) précuit et l'[attiéké sec](/produit/attieke-sec) se réhydratent aussi à l'eau chaude, couverts, quand on manque de temps.",
    enCuisine:
      "Elle cuit le mil du [thiéré mbuum](/recette/thiere-mbuum), du [thiakry](/recette/thiakry) et du [dégué](/recette/degue), le [fonio aux légumes](/recette/fonio-aux-legumes) et l'attiéké du [garba](/recette/garba). L'article [Faut-il un couscoussier pour cuire le fonio ou l'attiéké ?](/conseils/couscoussier-fonio-attieke) compare les deux solutions, et [Comment cuire le couscous de mil (thiéré) ?](/conseils/cuire-le-couscous-de-mil) détaille les passages à la vapeur.",
    faq: [
      {
        question: "Comment éviter que la vapeur s'échappe sur les côtés ?",
        reponse:
          "Entourez la jointure entre la passoire et la marmite d'une bande de tissu humide ou d'un boudin de pâte faite de farine et d'eau.",
      },
      {
        question: "Faut-il couvrir la passoire pendant la cuisson ?",
        reponse:
          "Posez un couvercle ou un torchon propre sans tasser les grains. La vapeur doit traverser la semoule, pas rester bloquée en dessous.",
      },
    ],
  },
  "araignee-a-friture": {
    origine:
      "L'araignée doit son nom à son panier de fils métalliques, qui rappelle une toile. On la retrouve aussi bien dans les cuisines d'Asie que dans celles d'Afrique, partout où l'on frit beaucoup et vite.\n\nEn Afrique de l'Ouest, la friture est l'art de la rue : bananes plantains de l'alloco ivoirien et du kelewele ghanéen, beignets de haricots akara, boules de pâte levée puff-puff. Les vendeuses plongent et ressortent des dizaines de pièces à la minute, et un ustensile qui égoutte d'un seul geste fait gagner un temps précieux.",
    choisir:
      "Un panier de 14 cm convient à une marmite ou une sauteuse familiale : il ramasse plusieurs beignets à la fois sans être encombrant. Comparée à une écumoire pleine percée de petits trous, l'araignée laisse l'huile s'écouler bien plus vite, et les fritures restent croustillantes. Le manche doit être assez long pour garder la main loin des projections. Pour sortir des légumes d'une eau de cuisson, une [passoire à couscous](/produit/passoire-a-couscous) reste plus pratique.",
    conserver:
      "L'huile figée et les miettes de pâte se logent entre les fils. Trempez la tête de l'araignée dans une eau très chaude et savonneuse quelques minutes avant de la frotter avec une brosse à vaisselle. Séchez-la aussitôt avec un torchon, puis suspendez-la par son manche : le panier ne se déforme pas et sèche complètement.",
    remplacer:
      "Une écumoire ou une grande cuillère percée fonctionne, en égouttant un peu plus longtemps au-dessus de la marmite. Pour les grosses pièces comme les morceaux de poulet ou de poisson, une pince de cuisine est même plus sûre. Évitez les cuillères en plastique, qui fondent au contact d'une huile de friture.",
    enCuisine:
      "Elle sort de l'huile l'[alloco](/recette/alloco), les [kelewele](/recette/kelewele), les [puff-puff](/recette/puff-puff) et les [akara](/recette/akara), ainsi que les plantains frits du [poulet DG](/recette/poulet-dg). En accompagnement, les [chips de plantain](/produit/chips-de-plantain) donnent une idée du croustillant à atteindre. Pour un premier essai, voyez [Par quelle recette africaine commencer quand on débute ?](/conseils/par-quelle-recette-commencer).",
    faq: [
      {
        question: "À quelle température frire l'alloco ou les puff-puff ?",
        reponse:
          "Autour de 170 à 180 °C. Sans thermomètre, plongez un petit morceau de pâte : il doit remonter aussitôt en grésillant, sans brunir trop vite.",
      },
      {
        question: "Pourquoi mes beignets sont-ils gras ?",
        reponse:
          "L'huile n'est pas assez chaude, souvent parce qu'on en met trop à la fois. Faites de petites fournées et égouttez-les sur du papier absorbant.",
      },
    ],
  },
  "spatules-en-bois": {
    origine:
      "Tourner une pâte de céréales ou de tubercules jusqu'à la rendre lisse est un geste commun à presque toute l'Afrique. En Afrique de l'Est, on se sert d'un bâton plat en bois appelé mwiko en swahili pour l'ugali ; au Burkina Faso et au Mali, une spatule semblable sert au tô. Le bois résiste à la force du poignet et ne casse pas dans une pâte épaisse.\n\nCe lot de la marque MIAMM, fabriqué en Europe dans du hêtre, réunit quatre ustensiles : une grande cuillère à sauce, une spatule à mortaise et une spatule biseautée, toutes trois de 30 cm, et une maryse pour racler les bols.",
    choisir:
      "Pour les pâtes fermes, foufou, tô ou ugali, prenez la spatule biseautée : son bord plat écrase les grumeaux contre la paroi sans plier. La cuillère à sauce convient aux sauces, au riz et aux mijotés, et la spatule à mortaise, percée en son centre, remue sans pousser tout le contenu. Une spatule à bout droit racle mieux le fond d'un [faitout](/produit/faitout-en-fonte-d-aluminium) qu'une cuillère ronde. Pour sortir des fritures, préférez l'[araignée](/produit/araignee-a-friture), et pour servir, le [saladier en acacia](/produit/saladier-en-bois).",
    conserver:
      "Une spatule qui sent encore l'oignon ou le poisson se frotte avec un demi-citron et un peu de gros sel, puis se rince à l'eau claire. Si le bois devient rugueux après plusieurs lavages, un léger ponçage au papier de verre fin le rend lisse. Rangez-les debout dans un pot, pas dans un tiroir humide.",
    remplacer:
      "Une cuillère en bois classique suffit pour les sauces, mais plie parfois dans une pâte de foufou. Une spatule en silicone épais convient aux pâtes plus souples. Évitez les ustensiles en métal sur une marmite antiadhésive ou émaillée, qu'ils risquent de rayer.",
    enCuisine:
      "Elles servent à tourner le tô du [tô et sauce gombo](/recette/to-sauce-gombo), le fufu de la [fufu et light soup](/recette/fufu-light-soup) et l'ugali de l'[ugali et sukuma wiki](/recette/ugali-sukuma-wiki), avec la [farine de foufou](/produit/farine-de-foufou) ou la [farine de maïs blanc](/produit/farine-de-mais-blanc). L'article [Comment préparer un foufou sans qu'il fasse de grumeaux ?](/conseils/foufou-sans-grumeaux) détaille le geste.",
    faq: [
      {
        question: "Quelle spatule pour tourner le foufou ?",
        reponse:
          "La spatule biseautée, la plus adaptée à cet effort. Tenez la marmite d'une main avec un torchon et écrasez la pâte contre la paroi de l'autre.",
      },
      {
        question: "Pourquoi le bois noircit-il par endroits ?",
        reponse:
          "Le bois absorbe l'humidité et les sauces colorées. Ce n'est pas gênant tant qu'il ne se fend pas ; un séchage à l'air après chaque lavage limite ces taches.",
      },
    ],
  },
  "brochettes-en-metal": {
    origine:
      "Griller de la viande enfilée sur une pique au-dessus des braises est une pratique très ancienne. En Afrique de l'Ouest, le suya en est l'exemple le plus célèbre : il est associé aux Haoussas du nord du Nigeria, où il porte aussi le nom de tsire, et on le trouve aussi au Niger, au nord du Cameroun et au Ghana. Le soir, les grilleurs alignent les brochettes de fines lamelles de bœuf enrobées de poudre d'arachide épicée.\n\nAu Sénégal, les dibiteries servent le dibi, du mouton grillé sur la braise, et au Kenya la nyama choma est le grand plat des braises.",
    choisir:
      "Des brochettes longues de 40 cm laissent les mains loin du feu et permettent d'enfiler une portion entière. Le métal ne brûle pas comme le bambou, n'a pas besoin de tremper avant usage et se réutilise sans fin. Il conduit aussi la chaleur au cœur des morceaux, ce qui aide les gros cubes à cuire. Pour une cuisson au four, vérifiez simplement que leur longueur tient dans votre plaque, ou posez-les en travers d'un plat creux.",
    conserver:
      "Les sucs caramélisés de la marinade collent au métal en refroidissant. Faites tremper les brochettes dans une bassine d'eau très chaude dès la fin du repas, puis frottez-les avec une éponge grattante. Séchez-les une à une avant de les ranger, attachées par un élastique ou dans un étui, pointes du même côté.",
    remplacer:
      "Des piques en bambou font l'affaire, à condition de les faire tremper trente minutes dans l'eau avant la cuisson pour qu'elles ne brûlent pas. Au four, vous pouvez aussi poser les lamelles de viande à plat sur une grille, au-dessus d'une plaque. Une poêle en fonte bien chaude donne un résultat proche pour quelques morceaux.",
    enCuisine:
      "Elles sont faites pour le [suya de bœuf](/recette/suya), dont l'épice est présentée dans [Qu'est-ce que le yaji (épice à suya) ?](/conseils/quest-ce-que-le-yaji). Sans barbecue, suivez [Comment faire griller des brochettes façon suya au four ?](/conseils/griller-des-brochettes-suya-au-four). Pour relever les morceaux, le [piment pili-pili](/produit/piment-pili-pili) et le [poivre de Selim](/produit/poivre-de-selim) ont leur place dans la marinade.",
    faq: [
      {
        question: "Faut-il huiler les brochettes en métal ?",
        reponse:
          "Un léger film d'huile aide la viande à glisser au moment de servir, surtout avec une marinade sucrée ou à base de pâte d'arachide.",
      },
      {
        question: "Pourquoi couper la viande en lamelles pour le suya ?",
        reponse:
          "Les lamelles fines cuisent en quelques minutes et retiennent beaucoup d'épices. C'est la découpe des grilleurs nigérians.",
      },
    ],
  },
  "feuilles-de-bananier-fraiches": {
    origine:
      "Le bananier a été domestiqué en Nouvelle-Guinée il y a plusieurs millénaires, puis s'est diffusé vers l'Asie du Sud-Est et l'Afrique. Des traces archéologiques au Cameroun montrent que le plantain y était déjà présent il y a environ 2 500 ans. Depuis, ses grandes feuilles souples sont devenues l'emballage de cuisson naturel de toute l'Afrique humide.\n\nAu Cameroun, on y cuit le koki ; au Congo, le liboké ; en Ouganda, le luwombo. En Côte d'Ivoire, elles ferment le canari du kedjenou, et au Ghana elles enveloppent le kenkey fanti.",
    choisir:
      "Les feuilles fraîches se reconnaissent à leur vert franc et à leur souplesse. Une feuille qui craque quand on la plie a commencé à sécher : réservez-la pour tapisser le fond d'une marmite. Si vous en trouvez surgelées dans les épiceries asiatiques ou africaines, elles conviennent aussi, une fois décongelées et essuyées. Prévoyez large : il faut souvent deux épaisseurs pour un koki, et les bords se déchirent facilement le long des nervures.",
    conserver:
      "Les feuilles se gardent quelques jours dans le bac à légumes du réfrigérateur, roulées dans un linge légèrement humide puis dans un sac. Pour une conservation longue, coupez-les à la taille de vos papillotes, empilez-les à plat et congelez-les : elles en ressortent assouplies et prêtes à plier. Évitez de les laisser au soleil, où elles brunissent en quelques heures.",
    remplacer:
      "Au Ghana, le kenkey ga est enveloppé dans des feuilles de maïs séchées, que l'on trouve parfois en épicerie latino-américaine : elles conviennent aux petites papillotes cuites à la vapeur. Pour un koki, des ramequins couverts cuits au bain-marie donnent la bonne texture, sans le parfum végétal. Et pour un poisson, une papillote de papier cuisson reste la solution la plus simple.",
    enCuisine:
      "Elles enveloppent le [koki](/recette/koki), le [liboké de poisson](/recette/liboke-de-poisson) et le [luwombo de poulet](/recette/luwombo), et servent d'assiette au [waakye](/recette/waakye) ghanéen. Pour l'esprit des cuisines qui les utilisent, voyez les pages [Cameroun](/pays/cameroun) et [Ouganda](/pays/ouganda), et la recette du [kedjenou](/recette/kedjenou) ivoirien, cuit à l'étouffée.",
    faq: [
      {
        question: "Peut-on manger la feuille de bananier ?",
        reponse:
          "Non, elle est trop fibreuse. Elle sert d'emballage et de plat : on l'ouvre à table et on mange ce qu'elle contient.",
      },
      {
        question: "Pourquoi passer la feuille sur une flamme ?",
        reponse:
          "La chaleur la rend souple et brillante, ce qui évite qu'elle se fende quand on la plie. Quelques secondes suffisent, en la déplaçant sans cesse.",
      },
    ],
  },
  "saladier-en-bois": {
    origine:
      "Avant la vaisselle industrielle, la table africaine était faite de calebasses, ces courges séchées et évidées, et de bols taillés dans le bois. On y servait le plat commun que chacun partage, à la main ou à la cuillère, assis autour du même récipient.\n\nCe grand saladier en acacia s'inscrit dans cette tradition. L'acacia est un bois dense, au grain serré et aux veines contrastées, apprécié pour la vaisselle parce qu'il absorbe peu les liquides.",
    choisir:
      "Avec 26 cm de diamètre, il convient à un plat principal pour quatre à six personnes ou à une grande salade. Pour des portions individuelles, le [lot de deux saladiers de 20 cm](/produit/saladiers-acacia-lot-de-2) est plus adapté. Pour servir des sauces ou des accompagnements en petite quantité, les [bols en manguier](/produit/bols-manguier-lot-de-3) complètent bien la table. Et pour apporter boissons et beignets, pensez au [plateau en acacia](/produit/plateau-acacia-amazon-basics).",
    conserver:
      "Si le bois devient terne ou rêche, poncez très légèrement l'intérieur au papier de verre fin, dépoussiérez, puis nourrissez-le avec une huile alimentaire neutre. Laissez pénétrer une nuit et essuyez l'excédent. Rangez-le à l'abri du soleil direct et loin du four : la chaleur sèche peut le fendre. Une petite fente se rebouche rarement, d'où l'intérêt de l'entretenir avant.",
    remplacer:
      "Un grand plat creux en céramique ou en émail remplit le même rôle de plat commun, et supporte mieux les sauces chaudes. Pour le service à la mode d'Afrique de l'Ouest, une grande calebasse décorative peut aussi accueillir des fruits ou du pain. L'essentiel est un récipient large et peu profond, où chacun accède facilement.",
    enCuisine:
      "Il accueille le [thiakry](/recette/thiakry) bien frais, l'attiéké du [poisson braisé et attiéké](/recette/poisson-braise-attieke), le [kachumbari](/recette/nyama-choma) qui accompagne la nyama choma ou le [chakalaka](/recette/chakalaka) servi froid. Pour composer un repas sans viande, l'article [Quels plats africains sont naturellement végétariens ?](/conseils/plats-africains-vegetariens) donne des idées.",
    faq: [
      {
        question: "Peut-on servir une sauce chaude dans un saladier en bois ?",
        reponse:
          "Tiède, oui, pour peu de temps. Une sauce brûlante ou très grasse risque de marquer le bois ; servez-la plutôt dans un plat en céramique.",
      },
      {
        question: "Quelle huile utiliser pour l'entretenir ?",
        reponse:
          "Une huile alimentaire neutre, comme l'huile de tournesol ou de pépins de raisin. Évitez l'huile d'olive en couche épaisse, qui peut rancir.",
      },
    ],
  },
  "saladiers-acacia-lot-de-2": {
    origine:
      "Manger dans un bol de bois est une habitude ancienne sur tout le continent, des bols sculptés du Sahel aux écuelles des hauts plateaux de l'Est. Le bois isole bien : un plat tiède le reste plus longtemps, et le bol ne brûle pas les doigts.\n\nCes deux bols en acacia sont recouverts d'un revêtement alimentaire qui protège la surface. L'acacia fait partie des bois durs les plus utilisés pour la vaisselle, grâce à sa densité et à son grain serré qui limite les infiltrations.",
    choisir:
      "Ces bols de taille généreuse servent de bol individuel pour un plat complet : riz et sauce, attiéké et poisson, salade composée. Pour un plat commun posé au centre, le [grand saladier de 26 cm](/produit/saladier-en-bois) convient mieux. Pour les petites portions, sauces ou arachides grillées, regardez les [bols en manguier](/produit/bols-manguier-lot-de-3) ; pour les desserts et les fruits, les [bols en noix de coco](/produit/bols-noix-de-coco-lot-de-2) apportent une touche différente.",
    conserver:
      "Le revêtement alimentaire protège le bois, mais s'use avec les lavages. Quand l'intérieur paraît sec ou blanchâtre, passez une fine couche d'huile alimentaire neutre avec un chiffon, laissez agir quelques heures, puis essuyez. Ne laissez jamais un bol sale dans l'évier jusqu'au lendemain : l'eau stagnante gonfle les fibres et fait apparaître des fissures.",
    remplacer:
      "Des bols creux en céramique ou en grès de même contenance font le même usage et supportent le lave-vaisselle. Pour un service plus léger, notamment en extérieur, une assiette creuse en émail convient aussi. Seule différence notable : la chaleur passe davantage dans les mains, et la céramique pèse plus lourd sur un plateau chargé.",
    enCuisine:
      "Ils conviennent au [garba](/recette/garba) d'Abidjan, au [riz jollof](/recette/riz-jollof) servi en portion, au [thiakry](/recette/thiakry) ou au [dégué](/recette/degue) en dessert. L'attiéké, semoule de manioc fermentée de Côte d'Ivoire, y trouve aussi sa place : l'article [Comment réussir un attiéké maison ?](/conseils/reussir-attieke-maison) explique comment le préparer.",
    faq: [
      {
        question: "Ces bols vont-ils au lave-vaisselle ?",
        reponse:
          "Non. Comme tout bois, ils se lavent rapidement à la main et se sèchent aussitôt, faute de quoi ils se fendillent.",
      },
      {
        question: "Peut-on y servir de la soupe ?",
        reponse:
          "Une soupe froide ou tiède, oui. Pour une soupe brûlante, laissez-la refroidir un peu avant de la verser.",
      },
    ],
  },
  "plateau-acacia-amazon-basics": {
    origine:
      "Porter le thé, les beignets ou le café sur un plateau est un geste d'accueil dans bien des maisons africaines. Au Sénégal, les petits verres de l'ataya circulent sur un plateau d'un invité à l'autre ; au Kenya, la théière de chai et les tasses arrivent ensemble à table.\n\nCe plateau de la gamme Amazon Basics, la marque de produits courants d'Amazon, est taillé dans le bois d'acacia. Ce bois dur aux veines marquées donne à chaque pièce un dessin propre, et sa densité le rend moins sensible aux taches qu'un bois tendre.",
    choisir:
      "Sa forme rectangulaire et ses poignées intégrées en font un plateau de transport : on le saisit à deux mains, chargé, sans risquer de tout renverser. Pour un service de thé posé au centre d'une table basse, le [plateau rond en bambou](/produit/plateau-rond-bambou-40-cm) est plus grand et plus léger. Pour présenter des petits plats ou des sauces, associez-le aux [bols en manguier](/produit/bols-manguier-lot-de-3), et pour le thé, aux [verres à thé facettés](/produit/verres-a-the).",
    conserver:
      "Le plateau supporte mal le trempage, mais aussi les verres mouillés posés longtemps au même endroit, qui laissent des cercles clairs. Essuyez les gouttes au fil du service. Si le bois perd son éclat, une fine couche d'huile alimentaire neutre, appliquée au chiffon puis essuyée après quelques heures, ravive les veines. Rangez-le à plat ou debout contre un mur, à l'abri de la chaleur.",
    remplacer:
      "Une grande planche à découper bien propre dépanne pour apporter quelques verres ou une assiette de beignets. Un plateau en métal ou en mélamine, plus léger, supporte mieux les liquides renversés. Pour un service de thé, l'essentiel est une surface stable et plate, où les petits verres ne glissent pas.",
    enCuisine:
      "Il porte le service de l'[ataya](/recette/ataya), les tasses de [chai kényan](/recette/chai-kenyan) ou de [café Touba](/recette/cafe-touba), et les [puff-puff](/recette/puff-puff) encore chauds, posés sur une serviette en papier. Pour réussir les trois services du thé sénégalais, suivez [Comment préparer l'ataya, le thé sénégalais en trois services ?](/conseils/comment-preparer-l-ataya).",
    faq: [
      {
        question: "Peut-on poser une théière brûlante sur ce plateau ?",
        reponse:
          "Mieux vaut glisser un dessous de plat ou un petit torchon plié sous une théière qui sort du feu, pour éviter une marque sombre sur le bois.",
      },
      {
        question: "Comment enlever une tache de thé sur le bois ?",
        reponse:
          "Frottez-la rapidement avec un chiffon humide et une pointe de bicarbonate, rincez, séchez, puis nourrissez la zone d'un peu d'huile.",
      },
    ],
  },
  "plateau-rond-bambou-40-cm": {
    origine:
      "Le bambou n'est pas un arbre mais une graminée géante, cousine des herbes, dont certaines espèces poussent de plusieurs dizaines de centimètres par jour. Ses tiges creuses sont découpées en lamelles, puis pressées et collées pour former des panneaux pleins, comme celui de ce plateau rond de la marque 5five.\n\nLe plateau rond partagé a une longue histoire en Afrique. En Éthiopie et en Érythrée, l'injera se pose sur un grand plat rond, garnie de ragoûts, et chacun en déchire un morceau pour se servir. Ailleurs, le grand plateau accueille les verres de thé ou les tasses de café de la cérémonie.",
    choisir:
      "Ses 40 cm de diamètre accueillent un service complet pour six : théière, verres, sucrier et petite assiette. Rond, il se pose au centre d'une table basse et chacun y accède. Le bambou est léger, ce qui compte une fois le plateau chargé. Pour porter un repas d'une pièce à l'autre, le [plateau rectangulaire en acacia](/produit/plateau-acacia-amazon-basics) se tient mieux à deux mains. Côté verres, les [verres Pasabahce et leurs soucoupes](/produit/verres-a-the-et-soucoupes-pasabahce) y trouvent leur place.",
    conserver:
      "Le bambou craint les longs contacts avec l'eau, qui peuvent faire gonfler les joints entre les lamelles. Essuyez-le après chaque service avec un chiffon à peine humide, puis séchez-le. Ne le laissez pas au soleil derrière une vitre : il pâlit et peut se voiler. Une goutte d'huile alimentaire, deux ou trois fois par an, garde sa surface douce.",
    remplacer:
      "Un grand plat rond en métal, comme ceux que l'on utilise pour le plat commun, convient aussi pour le thé. Pour l'injera, une grande assiette plate ou une plaque à pizza fait l'affaire, recouverte d'une première galette. Ce qui compte, c'est une surface large et plate que tout le monde peut atteindre.",
    enCuisine:
      "Il sert de base à l'[injera](/recette/injera) garnie de [doro wat](/recette/doro-wat), de [misir wat](/recette/misir-wat) ou de [shiro](/recette/shiro), et au service du [buna](/recette/buna-cafe-ethiopien), le café éthiopien servi en trois tournées. Pour comprendre ce rituel, lisez [Comment se déroule la cérémonie du café éthiopienne ?](/conseils/ceremonie-du-cafe-ethiopienne).",
    faq: [
      {
        question: "Peut-on poser l'injera directement sur le bambou ?",
        reponse:
          "Oui, pour le temps du repas. Essuyez ensuite le plateau, car les sauces au berbéré peuvent laisser une teinte orangée si elles restent longtemps.",
      },
      {
        question: "Le bambou va-t-il au lave-vaisselle ?",
        reponse:
          "Non : la chaleur et l'humidité prolongée décollent les lamelles. Un nettoyage rapide à la main suffit.",
      },
    ],
  },
  "bols-manguier-lot-de-3": {
    origine:
      "Le manguier est originaire d'Asie du Sud, où on le cultive depuis des millénaires, et il s'est largement répandu en Afrique tropicale, où ses fruits rythment la saison chaude. Son bois, clair et veiné, se travaille facilement et se prête bien à la sculpture : on en fait des meubles, des planches et de la vaisselle.\n\nCes trois bols Samhita sont sculptés à la main, ce qui explique les légères différences de forme et de dessin de l'un à l'autre. Ils rappellent les petites coupes de bois qui, sur les tables africaines, accompagnent le plat principal.",
    choisir:
      "Ces bols ronds sont faits pour les petites portions : une sauce pimentée, des arachides grillées, des dattes ou un condiment posé à côté du plat. Pour un plat individuel complet, les [saladiers en acacia de 20 cm](/produit/saladiers-acacia-lot-de-2) sont plus grands. Pour un dessert ou une salade de fruits servie avec style, regardez les [bols en noix de coco](/produit/bols-noix-de-coco-lot-de-2). Sur un [plateau en acacia](/produit/plateau-acacia-amazon-basics), ils composent un bel assortiment de petits plats.",
    conserver:
      "Le bois de manguier, plus tendre que l'acacia, marque plus vite. Évitez d'y couper quoi que ce soit au couteau et ne les empilez pas avec des objets lourds. Après une sauce grasse ou à l'huile de palme, essuyez d'abord l'intérieur avec un papier absorbant, puis lavez rapidement. Une fois secs, nourrissez-les de temps en temps avec une huile alimentaire neutre.",
    remplacer:
      "Des ramequins en céramique ou de petites coupelles en verre font le même travail pour les sauces et les condiments, et supportent mieux le piment et l'huile. Pour une table plus rustique, de petites calebasses décoratives peuvent aussi présenter les arachides ou les fruits secs.",
    enCuisine:
      "Ils accueillent la sauce crue du [poisson braisé et attiéké](/recette/poisson-braise-attieke), le kachumbari de la [nyama choma](/recette/nyama-choma), ou une poignée de [dattes Deglet Nour](/produit/dattes-deglet-nour). Pour régler la force d'une sauce pimentée servie à part, voyez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Peut-on y servir une sauce au piment et à l'huile ?",
        reponse:
          "Oui, pour la durée du repas. Ne la laissez pas des heures dans le bol : l'huile rouge et le piment finissent par imprégner le bois.",
      },
      {
        question: "Pourquoi les trois bols ne sont-ils pas identiques ?",
        reponse:
          "Ils sont sculptés à la main, et chaque morceau de bois a ses propres veines. Ces écarts font partie du charme de ce type de vaisselle.",
      },
    ],
  },
  "bols-noix-de-coco-lot-de-2": {
    origine:
      "La noix de coco est présente depuis des siècles sur les côtes de l'océan Indien, de la Somalie au Mozambique en passant par Zanzibar et Madagascar. Sur la côte swahilie, on râpe sa chair assis sur le mbuzi, un tabouret muni d'une lame dentée, pour en tirer le lait qui parfume riz, haricots et poissons. La coque dure, elle, a longtemps servi de louche ou de récipient.\n\nLa marque Jungle Culture indique faire tailler ces bols dans des coques récupérées dans la région de Bến Tre, au sud du Vietnam, connue pour ses cocoteraies.",
    choisir:
      "Chaque coque a sa taille et sa forme : ces bols sont plutôt faits pour une portion de fruits, de dessert, de céréales ou de salade froide. Leur fond arrondi les rend moins stables qu'un bol tourné. Pour un plat complet, les [saladiers en acacia](/produit/saladiers-acacia-lot-de-2) ont plus de contenance. Pour des sauces ou des condiments, les [bols en manguier](/produit/bols-manguier-lot-de-3), à fond plat, se posent plus facilement sur la table.",
    conserver:
      "La coque supporte mal la chaleur et les écarts de température : pas de liquide bouillant, pas de micro-ondes, pas de lave-vaisselle. Après lavage, séchez-la tout de suite et laissez-la à l'air libre. Quand elle paraît terne, frottez l'intérieur avec un peu d'huile de coco ou d'huile neutre, comme lors de son polissage d'origine. La brosse en fibre de coco fournie sert à ce nettoyage.",
    remplacer:
      "Un petit bol en bois ou en céramique remplit le même usage, sans l'aspect naturel de la coque. Pour un dessert lacté comme le thiakry, de simples verrines permettent aussi de voir les couches de mil et de crème. L'important est un récipient qui tienne bien en main.",
    enCuisine:
      "Ils conviennent au [thiakry](/recette/thiakry) et au [dégué](/recette/degue), desserts de mil au lait caillé, ou à une salade de fruits arrosée de [jus de bouye](/recette/jus-de-bouye). Pour connaître la pulpe de baobab qui parfume ces boissons, lisez [Que faire avec la poudre de baobab (pain de singe) ?](/conseils/que-faire-avec-la-poudre-de-baobab).",
    faq: [
      {
        question: "Peut-on y servir un plat chaud ?",
        reponse:
          "Tiède seulement. La chaleur forte peut fendre la coque ou altérer son vernis à l'huile.",
      },
      {
        question: "Les bols gardent-ils un goût de coco ?",
        reponse:
          "Non, l'odeur est très discrète. Elle s'estompe après les premiers lavages et ne passe pas dans les aliments.",
      },
    ],
  },
  "verres-a-the": {
    origine:
      "Le thé vert a gagné le Maroc vers le XVIIIe siècle, puis la Mauritanie, avant d'atteindre le Sénégal : selon un récit répandu, des étudiants partis apprendre le Coran en Mauritanie l'auraient rapporté. Le mot attaya vient d'ailleurs de « atay », le nom du thé au Maghreb. Avec la boisson ont voyagé la théière à long bec et les petits verres.\n\nLe verre facetté est épais et solide, ce qui convient aux versements répétés. Ses facettes accrochent la lumière et renforcent la couleur ambrée du thé, et sa petite taille oblige à boire par gorgées.",
    choisir:
      "Avec 210 ml, ces verres sont un peu plus grands que les verres d'ataya habituels : on les remplit à moitié pour le thé, et jusqu'en haut pour un jus froid. Leur forme droite et leur épaisseur supportent bien les versements répétés. Si vous préférez un service avec soucoupes, les [verres Pasabahce Aurora](/produit/verres-a-the-et-soucoupes-pasabahce) ont une forme plus galbée. Pour compléter le service, il vous faut une [théière à ataya](/produit/theiere-a-ataya) et du [thé vert gunpowder](/produit/the-vert-gunpowder).",
    conserver:
      "Le calcaire et le tanin du thé laissent un voile sur le verre. Un bain d'eau chaude avec un peu de vinaigre blanc, une fois par mois, le fait disparaître. Ne passez pas un verre froid sous l'eau bouillante d'un coup : même épais, il peut se fêler. Rangez-les en piles de deux ou trois au plus, ou alignés sur un plateau.",
    remplacer:
      "Des verres à liqueur ou de petits verres à eau de 10 à 15 cl conviennent pour le thé, à condition qu'ils supportent la chaleur. Évitez le verre très fin, qui chauffe vite les doigts. Pour la mousse, l'essentiel est de verser de haut, quel que soit le verre.",
    enCuisine:
      "Ils servent l'[ataya](/recette/ataya), dont le rituel est expliqué dans [Comment préparer l'ataya, le thé sénégalais en trois services ?](/conseils/comment-preparer-l-ataya), mais aussi le [café Touba](/recette/cafe-touba), le [kinkeliba](/recette/kinkeliba) du matin ou un [jus de bissap](/recette/jus-de-bissap) bien frais, préparé avec les [fleurs de bissap](/produit/fleurs-de-bissap).",
    faq: [
      {
        question: "Combien de verres faut-il pour l'ataya ?",
        reponse:
          "Un par invité, plus un ou deux pour faire la mousse. Un lot de six suffit pour quatre à cinq personnes.",
      },
      {
        question: "Les verres facettés supportent-ils le thé bouillant ?",
        reponse:
          "Oui, leur verre épais résiste bien à la chaleur. Rincez-les à l'eau chaude avant le service pour éviter un choc thermique.",
      },
    ],
  },
  "verres-a-the-et-soucoupes-pasabahce": {
    origine:
      "Pasabahçe est une verrerie turque fondée en 1935 à Beykoz, sur la rive asiatique du Bosphore à Istanbul. Elle fait aujourd'hui partie du groupe Şişecam. Ses verres à thé reprennent la silhouette du verre turc traditionnel, appelé « ince belli », c'est-à-dire « à taille fine », dont on ignore la date exacte d'apparition.\n\nEn Turquie, le thé noir se sert dans ces petits verres posés sur une soucoupe, et l'on en boit plusieurs au fil de la journée. Le thé y vient surtout des plantations de la région de Rize, au bord de la mer Noire.",
    choisir:
      "Avec environ 155 ml, ces verres sont faits pour un thé bu chaud, en plusieurs tournées. La taille marquée permet de les tenir par le haut sans se brûler, et la soucoupe accueille la cuillère et le sucre. Pour l'ataya, où l'on fait passer le thé d'un verre à l'autre, les [verres facettés](/produit/verres-a-the) droits sont plus pratiques. Pour présenter le service, le [plateau rond en bambou](/produit/plateau-rond-bambou-40-cm) accueille aisément les six verres et leurs soucoupes.",
    conserver:
      "Le verre fin de la taille est le point fragile : lavez les verres un par un, sans les entrechoquer dans l'évier. Séchez-les avec un torchon de coton non pelucheux pour garder leur transparence. Rangez les soucoupes empilées et les verres debout, côte à côte, plutôt qu'emboîtés les uns dans les autres.",
    remplacer:
      "De petits verres droits ou des tasses à expresso conviennent pour un thé bu en petites quantités. Sans soucoupe, posez les verres sur un plateau garni d'un petit linge, qui absorbe les gouttes. La forme change l'allure du service, pas le goût du thé.",
    enCuisine:
      "Ils conviennent au [chai kényan](/recette/chai-kenyan) préparé avec le [thé noir du Kenya](/produit/the-noir-du-kenya), au [rooibos glacé](/recette/rooibos-glace) servi l'été ou au [kinkeliba](/recette/kinkeliba) du petit-déjeuner sénégalais. Pour infuser la plante sud-africaine dans les règles, lisez [Qu'est-ce que le rooibos et comment l'infuser ?](/conseils/quest-ce-que-le-rooibos).",
    faq: [
      {
        question: "Ces verres conviennent-ils pour l'ataya ?",
        reponse:
          "Oui pour le servir, moins pour faire la mousse : leur col étroit rend les versements de haut moins faciles qu'avec des verres droits.",
      },
      {
        question: "Pourquoi le verre turc a-t-il cette taille fine ?",
        reponse:
          "Elle permet de tenir le verre par le haut, là où il est moins chaud, et laisse le thé refroidir un peu à la surface. Son origine exacte reste discutée.",
      },
    ],
  },
  "theiere-a-ataya": {
    origine:
      "La théière ventrue à long bec vient de la tradition maghrébine du thé vert, passée en Mauritanie puis au Sénégal, en Gambie et au Mali. Au Sénégal, elle est au cœur de l'ataya, le thé que l'on prépare lentement sur un petit fourneau à charbon, entre amis ou en famille, après le repas ou pendant les longues heures de la journée.\n\nCe modèle El Yadida de la marque Ibili, en inox, contient 1 litre ; le fabricant le donne compatible avec le gaz, les plaques électriques et la vitrocéramique. On y fait réellement bouillir le thé, ce qui le distingue d'une théière à infuser.",
    choisir:
      "Le bec allongé est le critère principal : plus il est fin et long, plus le jet est précis quand on sert de haut. Avec 1 litre, cette théière sert quatre à six petits verres par tournée. L'inox résiste mieux aux chocs et à la flamme directe que la porcelaine ou l'émail. Pour chauffer l'eau à côté, la [bouilloire émaillée](/produit/bouilloire-emaillee) est la compagne habituelle de la théière, et les [verres à thé facettés](/produit/verres-a-the) complètent le service.",
    conserver:
      "Les feuilles de thé gunpowder et le sucre laissent un dépôt brun à l'intérieur. Videz la théière dès la fin du dernier service et rincez-la à l'eau chaude. Une fois par mois, faites bouillir de l'eau additionnée de bicarbonate pour décoller le tanin, puis rincez abondamment. Rangez-la couvercle posé de travers, pour que l'air circule.",
    remplacer:
      "Une petite casserole à bec verseur permet de faire bouillir le thé, puis de le verser dans les verres. Le jet est moins précis, mais la mousse se forme quand même si l'on verse de haut. Une théière en émail allant sur le feu fonctionne aussi, avec un peu plus de précaution.",
    enCuisine:
      "Elle est faite pour l'[ataya](/recette/ataya) et le [thé vert gunpowder](/produit/the-vert-gunpowder), parfumé ou non de menthe fraîche. Le rituel des trois services et le dosage du sucre sont détaillés dans [Comment préparer l'ataya, le thé sénégalais en trois services ?](/conseils/comment-preparer-l-ataya). Elle convient aussi pour faire bouillir le [kinkeliba](/recette/kinkeliba).",
    faq: [
      {
        question: "Peut-on utiliser cette théière sur une plaque à induction ?",
        reponse:
          "Le fabricant cite le gaz, les plaques électriques et la vitrocéramique, mais pas l'induction. Testez le fond avec un aimant : s'il n'accroche pas, gardez-la pour le gaz ou une plaque classique.",
      },
      {
        question: "Faut-il de la menthe dans l'ataya ?",
        reponse:
          "Ce n'est pas obligatoire. Beaucoup la préparent avec du thé vert seul ; d'autres ajoutent de la menthe fraîche ou du nana au deuxième service.",
      },
    ],
  },
  "bouilloire-emaillee": {
    origine:
      "L'émail de cuisine est une fine couche de verre fondue à haute température sur une tôle d'acier. Il donne un récipient léger, qui chauffe vite, ne rouille pas tant qu'il reste intact et ne transmet aucun goût à l'eau. La vaisselle émaillée, souvent décorée de fleurs aux couleurs vives, est très présente sur les marchés d'Afrique de l'Ouest.\n\nBouilloires, cuvettes et plats émaillés font aujourd'hui partie du décor familier des cuisines, posés près du fourneau pour le thé ou l'infusion du matin.",
    choisir:
      "Avec 2,4 litres, cette bouilloire chauffe l'eau d'un service d'ataya complet ou de plusieurs tasses d'infusion. Elle ne sert pas à faire bouillir le thé lui-même, qui se prépare à part, dans la [théière à ataya](/produit/theiere-a-ataya). Vérifiez que l'émail est uniforme, sans éclat au bord du bec ni au fond, et que la poignée est bien fixée. Pour le service, accompagnez-la des [verres Pasabahce](/produit/verres-a-the-et-soucoupes-pasabahce) ou des [verres facettés](/produit/verres-a-the).",
    conserver:
      "Le calcaire se dépose vite dans une eau dure. Si une croûte blanche apparaît, laissez tremper une nuit un mélange d'eau et d'acide citrique, puis rincez. Ne frappez jamais la bouilloire contre l'évier : un éclat d'émail met l'acier à nu, et la rouille gagne. En cas d'éclat, séchez toujours bien la zone et limitez son usage à l'eau.",
    remplacer:
      "Une casserole à bec ou une bouilloire électrique remplissent le même rôle pour chauffer l'eau. Pour le kinkeliba, une casserole couverte permet de faire frémir les feuilles, puis de filtrer l'infusion dans une passoire fine. Seule la bouilloire sur le feu garde l'eau chaude près du fourneau pendant tout le service.",
    enCuisine:
      "Elle chauffe l'eau de l'[ataya](/recette/ataya) et du [café Touba](/recette/cafe-touba), et prépare le [kinkeliba](/recette/kinkeliba) avec les feuilles de [kinkeliba](/produit/kinkeliba). Elle sert aussi pour le [rooibos](/produit/rooibos) ou le [kahawa chungu](/recette/kahawa-chungu). Pour le café épicé sénégalais, lisez [Qu'est-ce que le café Touba et comment le préparer ?](/conseils/quest-ce-que-le-cafe-touba).",
    faq: [
      {
        question: "Peut-on poser la bouilloire émaillée sur l'induction ?",
        reponse:
          "L'émail recouvre de l'acier, en général compatible. Vérifiez avec un aimant sous le fond et chauffez progressivement.",
      },
      {
        question: "Que faire si l'émail s'écaille à l'intérieur ?",
        reponse:
          "Gardez-la pour l'eau, séchez-la après chaque usage et surveillez la rouille. Si elle s'étend, mieux vaut la remplacer.",
      },
    ],
  },
// FICHES
};
