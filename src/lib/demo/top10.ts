import type { Top10 } from "@/lib/top10/types";

/**
 * Onglets de la page « Top 10 », dans l'ordre d'affichage. Uniquement des produits de la boutique
 * avec un lien Amazon (src/lib/demo/catalog*.ts) et des recettes ou articles du site.
 * Textes tirés des fiches produits. Vérifié par tests/top10.test.ts.
 */
export const demoTop10: Top10[] = [
  {
    slug: "ustensiles-cuisine-africaine",
    tab: "Ustensiles",
    title: "Top 10 des ustensiles indispensables de la cuisine africaine",
    seoTitle: "Top 10 des ustensiles de la cuisine africaine",
    description:
      "Faitout, marmite à riz, mortiers, araignée, couscoussier : notre top 10 des ustensiles, classés selon le nombre de recettes du site où ils servent.",
    intro:
      "Notre sélection de dix ustensiles parmi ceux de la boutique. Ils sont classés selon le nombre de recettes du site qui s'en servent : plus un ustensile revient dans nos recettes, plus il monte. À égalité, le plus courant passe devant.",
    updated: "2026-10-19",
    rankBy: "recettes",
    items: [
      {
        product: "faitout-en-fonte-d-aluminium",
        pourquoi:
          "Le faitout arrive en tête : quatorze recettes du site se cuisinent dans un faitout ou une cocotte, du ndolé au doro wat. Celui-ci, en fonte d'aluminium, chauffe vite et répartit la chaleur de façon homogène, sans être aussi lourd que la fonte de fer. C'est l'allié des plats qui mijotent longtemps : sauces feuilles, ragoûts, kedjenou. Il se lave à l'eau chaude avec une éponge non abrasive.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "marmite-en-aluminium",
        pourquoi:
          "Douze recettes du site passent par une grande marmite, du riz jollof à la pepper soup. Celle-ci, en aluminium épais, répartit bien la chaleur et favorise au fond la formation du xoon, le riz légèrement croustillant recherché au Sénégal. Elle est faite pour le riz et sert aussi pour les ragoûts et les sauces. Elle se lave à l'eau chaude savonneuse, sans lave-vaisselle.",
        recettes: ["riz-jollof", "thiere-mbuum", "fufu-light-soup", "waakye", "eru", "koki", "poulet-odika", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi", "matoke"],
      },
      {
        product: "mortier-et-pilon-en-bois",
        pourquoi:
          "Neuf recettes du site demandent de piler : l'egusi, l'eru, l'ail et le gingembre du liboke, les épices du pilau ou les gousses de la pepper soup. En acacia, un bois dense et solide, ce mortier écrase épices, ail, piment, arachides grillées ou feuilles. Sa taille le destine aux préparations de tous les jours et aux petites quantités. Il se lave à l'eau chaude sans tremper, puis s'huile de temps en temps.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["entretenir-mortier-pilon-bois"],
      },
      {
        product: "mortier-en-granit",
        pourquoi:
          "Il sert dans les mêmes neuf recettes que le mortier en bois, avec un autre usage. Le granit, lourd et non poreux, écrase efficacement les aromates frais sans glisser. On y prépare la base ail-gingembre-piment des marinades, les pâtes de piment frais ou les mélanges d'épices en graines. Il se rince à l'eau chaude et sèche à l'air.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["mortier-bois-ou-pierre"],
      },
      {
        product: "araignee-a-friture",
        pourquoi:
          "Huit recettes du site passent par la friture : alloco, kelewele, puff-puff, akara… Avec son large panier en fils métalliques, l'araignée retire plusieurs morceaux de l'huile à la fois et les égoutte aussitôt. On pose ensuite les fritures sur du papier absorbant. Elle se lave à l'eau chaude savonneuse et se sèche bien.",
        recettes: ["alloco", "kelewele", "riz-jollof", "soupe-egusi", "garba", "poulet-dg", "puff-puff", "akara"],
      },
      {
        product: "spatules-en-bois",
        pourquoi:
          "Le tô, le foufou ou l'ugali se tournent avec énergie contre la paroi de la marmite : six recettes du site demandent une spatule ou une cuillère en bois. Solides, ces spatules ne rayent pas le fond. Le lot de huit sert aussi à remuer les sauces, le riz et les mijotés. Elles se lavent à la main, se sèchent bien et s'huilent de temps en temps.",
        recettes: ["to-sauce-gombo", "fufu-light-soup", "ugali-sukuma-wiki", "cafe-touba", "puff-puff", "akara"],
      },
      {
        product: "couscoussier",
        pourquoi:
          "Le couscoussier associe une marmite et un panier percé : l'eau ou la sauce mijote en bas pendant que les graines cuisent à la vapeur en haut. Quatre recettes du site l'emploient : le thiéré mbuum, l'attiéké du garba, le ngalakh et le dégué. On humidifie la semoule, on la cuit, on l'égrène puis on la remet à cuire une seconde fois. Ce modèle en inox se lave à l'eau chaude savonneuse.",
        recettes: ["garba", "thiere-mbuum", "ngalakh", "degue"],
        articles: ["couscoussier-fonio-attieke"],
      },
      {
        product: "tamis-en-bois",
        pourquoi:
          "Un tamis à maille fine sert autant aux farines qu'aux boissons. Quatre recettes du site l'emploient : il retient les fibres du jus de bouye et du jus de gingembre, passe les légumes de la light soup et sert pour le ngalakh. Son cadre en bois est un classique des cuisines africaines. Il se brosse à sec et sèche à l'air.",
        recettes: ["fufu-light-soup", "jus-de-gingembre", "ngalakh", "jus-de-bouye"],
      },
      {
        product: "rechaud-a-charbon-jiko",
        pourquoi:
          "Le jiko est le réchaud à charbon de bois des cuisines d'Afrique de l'Est. Il concentre la chaleur des braises pour griller ou mijoter : quatre recettes du site se cuisent sur les braises, du nyama choma au suya. Il s'utilise uniquement à l'extérieur ou dans un lieu très bien aéré. Les cendres se vident une fois refroidies.",
        recettes: ["nyama-choma", "suya", "poisson-braise-attieke", "liboke-de-poisson"],
      },
      {
        product: "saladier-en-bois",
        pourquoi:
          "Dans beaucoup de cuisines africaines, on partage le repas autour d'un plat commun : ce grand saladier en acacia de 26 cm s'y prête bien. Quatre recettes du site commencent dans un saladier, de la pâte de l'injera à celle des puff-puff. Il met aussi en valeur le thiakry ou l'attiéké. On évite les liquides très chauds et on le lave rapidement à la main.",
        recettes: ["injera", "puff-puff", "jus-de-bouye", "jus-de-gingembre"],
      },
    ],
    guide: [
      ["Commencez par l'essentiel : un faitout ou une marmite à fond épais, une spatule en bois et un mortier suffisent pour une grande partie des recettes du site."],
      ["Vérifiez sur la fiche Amazon la contenance, le diamètre et la compatibilité avec votre plaque (gaz, électrique ou induction)."],
      [
        "Pour le mortier, le bois convient aux épices et aux arachides, le granit aux aromates frais : voir ",
        { href: "/conseils/mortier-bois-ou-pierre", label: "mortier en bois ou en pierre" },
        ".",
      ],
    ],
    faq: [
      {
        question: "Faut-il vraiment un couscoussier pour le fonio ou l'attiéké ?",
        reponse: [
          "Pas forcément : le fonio précuit et l'attiéké sec se préparent sans lui. Pour improviser, posez une passoire à trous fins sur une marmite et fermez la jonction avec un torchon humide roulé. Tous les détails dans ",
          { href: "/conseils/couscoussier-fonio-attieke", label: "notre conseil sur le couscoussier" },
          ".",
        ],
      },
      {
        question: "Comment entretenir un mortier et des spatules en bois ?",
        reponse: [
          "Lavez-les à l'eau chaude sans les laisser tremper, séchez-les bien puis huilez-les de temps en temps. Voir aussi ",
          { href: "/conseils/entretenir-mortier-pilon-bois", label: "comment entretenir un mortier en bois" },
          ".",
        ],
      },
      {
        question: "Peut-on passer ces ustensiles au lave-vaisselle ?",
        reponse: [
          "Mieux vaut l'éviter : la marmite en aluminium se lave à l'eau chaude savonneuse, le bois à la main. En cas de doute, suivez la notice du fabricant.",
        ],
      },
    ],
  },
  {
    slug: "ingredients-cuisine-africaine",
    tab: "Ingrédients",
    title: "Top 10 des ingrédients pour débuter la cuisine africaine",
    seoTitle: "Top 10 des ingrédients de la cuisine africaine",
    description:
      "Pâte d'arachide, poivre de Selim, huile de palme rouge, soumbala : notre top 10 des ingrédients, classés selon le nombre de recettes du site qui les emploient.",
    intro:
      "Notre sélection de dix ingrédients de la boutique pour se lancer. Ils sont classés selon le nombre de recettes du site qui les emploient : avec les premiers, vous pouvez déjà cuisiner une bonne partie de nos plats. À égalité, le plus courant passe devant.",
    updated: "2026-10-19",
    rankBy: "recettes",
    items: [
      {
        product: "pate-d-arachide",
        pourquoi:
          "C'est l'ingrédient le plus employé du site : sept recettes, du mafé à la groundnut soup du Ghana. Obtenue en broyant des arachides grillées, elle forme une pâte épaisse qui, selon les marques, contient du sel ou de l'huile végétale. On la délaie dans un peu de bouillon chaud avant de l'ajouter à la sauce. Bien fermée, elle se garde plusieurs semaines.",
        recettes: ["mafe", "fonio-aux-legumes", "thiere-mbuum", "moambe", "luwombo", "ngalakh", "groundnut-soup"],
        articles: ["combien-de-temps-se-garde-la-pate-d-arachide"],
      },
      {
        product: "poivre-de-selim",
        pourquoi:
          "Six recettes du site l'emploient, du poulet yassa au café Touba. Ce sont les longues gousses sombres du Xylopia aethiopica, au parfum résineux, musqué et poivré, appelées djar au Sénégal. On les écrase pour les infuser dans les bouillons, ou on les moud avec le café. Quelques gousses suffisent.",
        recettes: ["poulet-yassa", "kelewele", "thiere-mbuum", "liboke-de-poisson", "cafe-touba", "pepper-soup"],
        articles: ["utiliser-poivre-de-selim"],
      },
      {
        product: "huile-de-palme-rouge",
        pourquoi:
          "Six recettes du site reposent sur elle, dont le pondu, l'eru et la soupe egusi. Extraite de la pulpe des fruits du palmier à huile et non raffinée, elle garde sa couleur orangée et son goût fruité. On la chauffe doucement, sans la faire fumer. Elle fige au frais : c'est normal.",
        recettes: ["pondu", "soupe-egusi", "eru", "koki", "poulet-odika", "mbongo-tchobi"],
        articles: ["huile-de-palme-rouge-ou-raffinee", "remplacer-huile-de-palme-rouge"],
      },
      {
        product: "poivre-de-penja",
        pourquoi:
          "Cinq recettes du site le demandent, dont le ndolé, le poulet DG et le kedjenou. Cultivé dans la région de Penja, au Cameroun, ce poivre blanc offre un piquant net et des notes boisées et musquées. On le moud au dernier moment, en fin de cuisson, pour garder tout son parfum.",
        recettes: ["ndole", "poisson-braise-attieke", "kedjenou", "caldou", "poulet-dg"],
      },
      {
        product: "soumbala",
        pourquoi:
          "Le soumbala, ou nététou, est fait de graines de néré cuites puis fermentées. Il donne au mafé, au thiéboudienne et aux sauces un goût profond, proche de l'umami : quatre recettes du site l'emploient. Son odeur est forte, mais un petit morceau écrasé en début de cuisson suffit.",
        recettes: ["mafe", "thieboudienne", "fonio-aux-legumes", "to-sauce-gombo"],
        articles: ["quest-ce-que-le-soumbala", "par-quoi-remplacer-le-soumbala"],
      },
      {
        product: "couscous-de-mil",
        pourquoi:
          "Au Sénégal, la farine de mil est roulée en petits grains puis cuite à la vapeur pour donner le thiéré, au goût plus rustique que la semoule de blé. Quatre recettes du site l'emploient : le thiéré mbuum, le thiakry, le ngalakh et le dégué. Il se cuit à la vapeur, jamais dans l'eau, de préférence en deux fois.",
        recettes: ["thiakry", "thiere-mbuum", "ngalakh", "degue"],
        articles: ["cuire-le-couscous-de-mil"],
      },
      {
        product: "berbere",
        pourquoi:
          "Le berbéré est le mélange d'épices rouge et relevé de la cuisine éthiopienne : piment, fenugrec, gingembre, ail et épices chaudes, le plus souvent. Il parfume les wats servis sur l'injera, et trois recettes du site l'emploient. On le fait d'abord revenir dans le beurre ou l'huile avec les oignons.",
        recettes: ["doro-wat", "misir-wat", "shiro"],
        articles: ["quest-ce-que-le-berbere"],
      },
      {
        product: "crevettes-sechees",
        pourquoi:
          "Séchées, parfois fumées, les crevettes concentrent un goût marin prononcé, courant dans les cuisines d'Afrique de l'Ouest et centrale. Trois recettes du site les emploient : le ndolé, la soupe egusi et l'eru. On les rince rapidement, puis on les ajoute entières en fin de cuisson ou moulues dans la sauce.",
        recettes: ["ndole", "soupe-egusi", "eru"],
      },
      {
        product: "pulpe-de-noix-de-palme",
        pourquoi:
          "Extraite des noix de palme cuites et pilées, cette pulpe onctueuse évite la longue préparation des noix fraîches. Elle sert de base à trois recettes du site : la sauce graine, le poulet nyembwe et la moambé. On la dilue dans l'eau et on la fait réduire lentement jusqu'à ce que l'huile remonte.",
        recettes: ["poulet-nyembwe", "sauce-graine", "moambe"],
      },
      {
        product: "attieke-sec",
        pourquoi:
          "L'attiéké est une semoule de manioc fermenté au goût légèrement acidulé, emblématique de la cuisine ivoirienne. La version déshydratée se garde longtemps et se réhydrate en quelques minutes. Nos recettes de garba et de poisson braisé à l'attiéké l'emploient, avec oignons, tomate et piment.",
        recettes: ["poisson-braise-attieke", "garba"],
        articles: ["reussir-attieke-maison"],
      },
    ],
    guide: [
      ["Commencez par une recette simple, comme le mafé ou le poulet yassa : la pâte d'arachide et le poivre de Selim y suffisent pour une bonne partie du goût."],
      ["Privilégiez les produits qui se gardent longtemps : pâte d'arachide, crevettes séchées, couscous de mil, attiéké déshydraté."],
      [
        "Ajoutez ensuite deux ou trois épices clés. Voir ",
        { href: "/conseils/ingredients-placard-cuisine-africaine", label: "les ingrédients à avoir dans son placard" },
        ".",
      ],
    ],
    faq: [
      {
        question: "Par quelle recette commencer ?",
        reponse: [
          "Par un plat mijoté à base d'ingrédients courants, comme le poulet yassa ou le mafé : ils demandent surtout du temps, pas de technique particulière. Voir ",
          { href: "/conseils/par-quelle-recette-commencer", label: "notre conseil" },
          ".",
        ],
      },
      {
        question: "Par quoi remplacer l'huile de palme rouge ?",
        reponse: [
          "Aucune huile ne la remplace parfaitement. Le plus proche est la pulpe de noix de palme ; sinon, une huile neutre colorée au paprika doux redonne la couleur, mais pas tout le goût. Voir ",
          { href: "/conseils/remplacer-huile-de-palme-rouge", label: "remplacer l'huile de palme rouge" },
          ".",
        ],
      },
      {
        question: "Combien de temps se garde la pâte d'arachide ?",
        reponse: [
          "Bien fermée et entamée avec une cuillère propre, plusieurs semaines, souvent davantage ; la durée exacte figure sur l'étiquette. Voir ",
          { href: "/conseils/combien-de-temps-se-garde-la-pate-d-arachide", label: "notre conseil" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "epices-africaines",
    tab: "Épices",
    title: "Top 10 des épices et condiments africains",
    description:
      "Poivre de Selim, poivre de Penja, soumbala, berbéré, yaji : notre top 10 des épices et condiments, classés selon le nombre de recettes du site.",
    intro:
      "Notre sélection de dix épices et condiments d'Afrique subsaharienne, parmi ceux de la boutique. Ils sont classés selon le nombre de recettes du site qui les emploient. À égalité, le plus courant passe devant.",
    updated: "2026-10-19",
    rankBy: "recettes",
    items: [
      {
        product: "poivre-de-selim",
        pourquoi:
          "Le poivre de Selim est l'épice la plus présente dans nos recettes : six plats l'emploient, du poulet yassa au café Touba. Ce sont les longues gousses sombres du Xylopia aethiopica, au parfum résineux, musqué et poivré, appelées djar au Sénégal. On les écrase pour les infuser dans les bouillons, ou on les moud avec le café. Il parfume aussi les soupes et les marinades d'Afrique de l'Ouest et centrale.",
        recettes: ["poulet-yassa", "kelewele", "thiere-mbuum", "liboke-de-poisson", "cafe-touba", "pepper-soup"],
        articles: ["utiliser-poivre-de-selim"],
      },
      {
        product: "poivre-de-penja",
        pourquoi:
          "Cinq recettes du site le demandent, dont le ndolé, le poulet DG et le kedjenou. Cultivé dans la région de Penja, au Cameroun, ce poivre blanc offre un piquant net et des notes boisées et musquées. Il relève le poisson braisé et les viandes grillées. On le moud au dernier moment, en fin de cuisson, pour garder tout son parfum.",
        recettes: ["ndole", "poisson-braise-attieke", "kedjenou", "caldou", "poulet-dg"],
      },
      {
        product: "soumbala",
        pourquoi:
          "Le soumbala, ou nététou, est fait de graines de néré cuites puis fermentées. Utilisé en petite quantité, il donne au mafé, au thiéboudienne et aux sauces un goût profond, proche de l'umami : quatre recettes du site l'emploient. C'est aussi le produit le plus cité dans nos articles Conseils, qui expliquent ce qu'il est et comment le remplacer.",
        recettes: ["mafe", "thieboudienne", "fonio-aux-legumes", "to-sauce-gombo"],
        articles: ["quest-ce-que-le-soumbala", "par-quoi-remplacer-le-soumbala"],
      },
      {
        product: "berbere",
        pourquoi:
          "Le berbéré est le mélange d'épices rouge et relevé de la cuisine éthiopienne : on y trouve le plus souvent du piment, du fenugrec, du gingembre, de l'ail et des épices chaudes. Il parfume et colore les wats servis sur l'injera, et trois recettes du site l'emploient. On le fait d'abord revenir dans le beurre ou l'huile avec les oignons.",
        recettes: ["doro-wat", "misir-wat", "shiro"],
        articles: ["quest-ce-que-le-berbere"],
      },
      {
        product: "pebe-moulu",
        pourquoi:
          "Le pèbè est la graine du Monodora myristica, appelée muscade africaine, aux notes plus douces et légèrement épicées que la muscade. Au Cameroun, il entre dans les épices du poisson braisé et de nombreuses sauces. Nos recettes de pepper soup et de mbongo tchobi l'emploient. On en ajoute une pincée dans le bouillon, ou on le mélange à l'ail et au gingembre pour mariner.",
        recettes: ["pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "yaji-suya",
        pourquoi:
          "Le yaji est le mélange qui enrobe le suya, la brochette grillée vendue dans les rues du Nigeria. Il associe généralement arachide grillée moulue, piment, gingembre et autres épices, et donne à la viande un enrobage relevé et légèrement croustillant. On en frotte la viande avant de la griller, puis on en saupoudre à la sortie du feu.",
        recettes: ["suya"],
        articles: ["quest-ce-que-le-yaji"],
      },
      {
        product: "assaisonnement-jollof",
        pourquoi:
          "Le riz jollof, riz rouge cuit dans une sauce tomate épicée, se dispute entre le Nigeria et le Ghana. Ce mélange prêt à l'emploi réunit les épices et aromates qui lui donnent sa couleur et son parfum, sans multiplier les pots. On l'ajoute à la base tomate-oignon-piment une fois qu'elle a bien réduit, avant le riz et le bouillon.",
        recettes: ["riz-jollof"],
      },
      {
        product: "piment-pili-pili",
        pourquoi:
          "Petit, rouge vif et très piquant, le pili-pili, ou piment oiseau, est présent de Dakar à Kinshasa. Séché entier, il garde son parfum fruité et sa force. On le met entier dans le poulet yassa pour une chaleur douce, puis on le retire avant de servir, ou on l'écrase au mortier pour un piquant franc. Pensez à vous laver les mains après l'avoir manipulé.",
        recettes: ["poulet-yassa"],
      },
      {
        product: "graines-d-egusi",
        pourquoi:
          "L'egusi, parfois appelé pistache africaine, désigne les graines de certaines courges et melons d'Afrique de l'Ouest. Moulues, elles ont un goût doux qui rappelle la noisette. Elles épaississent et parfument la soupe egusi, grand classique du Nigeria et du Ghana. On délaie la poudre dans un peu d'eau avant de l'ajouter à la sauce.",
        recettes: ["soupe-egusi"],
      },
      {
        product: "vanille-bourbon-de-madagascar",
        pourquoi:
          "La vanille bourbon est cultivée à Madagascar, où chaque fleur est fécondée à la main ; les gousses sont ensuite échaudées, étuvées et séchées lentement. Elle parfume le dégué, la crème de mil au lait caillé de notre site, ainsi que les desserts et certaines sauces pour le poisson. On fend la gousse, on gratte les graines et on les infuse dans le lait chaud.",
        recettes: ["degue"],
      },
    ],
    guide: [
      ["Partez des recettes : chaque épice de ce top est reliée aux plats du site qui l'emploient."],
      ["Moulez au dernier moment : le poivre de Penja et les gousses de Selim gardent mieux leur parfum ainsi."],
      [
        "Dosez les condiments puissants : le soumbala s'utilise en petite quantité, et le pili-pili entier se retire avant de servir. Voir ",
        { href: "/conseils/ingredients-placard-cuisine-africaine", label: "les ingrédients à avoir dans son placard" },
        ".",
      ],
    ],
    faq: [
      {
        question: "Par quoi remplacer le soumbala ?",
        reponse: [
          "Cherchez-le d'abord sous ses autres noms, dawadawa ou nététou. À défaut, un peu de guedj, de crevettes séchées pilées ou de miso brun apporte une profondeur comparable, sans donner exactement le même goût. Voir ",
          { href: "/conseils/par-quoi-remplacer-le-soumbala", label: "notre conseil" },
          ".",
        ],
      },
      {
        question: "Qu'est-ce que le yaji ?",
        reponse: [
          "C'est le mélange d'épices du suya, la brochette grillée du Nigeria : arachide torréfiée moulue, piment, gingembre et autres épices. Tous les détails dans ",
          { href: "/conseils/quest-ce-que-le-yaji", label: "qu'est-ce que le yaji" },
          ".",
        ],
      },
      {
        question: "Comment utiliser le poivre de Selim ?",
        reponse: [
          "Écrasez les gousses et infusez-les dans les bouillons, ou moulez-les avec le café pour le café Touba. Voir ",
          { href: "/conseils/utiliser-poivre-de-selim", label: "comment utiliser le poivre de Selim" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "farines-africaines",
    tab: "Farines",
    title: "Top 10 des fonios, garis et farines africaines",
    description:
      "Couscous de mil, attiéké, farine de maïs blanc, fonio, gari, farine de teff : notre top 10, classé selon le nombre de recettes du site qui les emploient.",
    intro:
      "Notre sélection de dix céréales, semoules et farines d'Afrique, parmi celles de la boutique. Elles sont classées selon le nombre de recettes du site qui les emploient. À égalité, la plus courante passe devant.",
    updated: "2026-10-19",
    rankBy: "recettes",
    items: [
      {
        product: "couscous-de-mil",
        pourquoi:
          "Au Sénégal, la farine de mil est roulée en petits grains puis cuite à la vapeur pour donner le thiéré. C'est la semoule la plus employée du site : quatre recettes, du thiéré mbuum au thiakry et au dégué. Il se cuit à la vapeur, jamais dans l'eau, de préférence en deux fois.",
        recettes: ["thiakry", "thiere-mbuum", "ngalakh", "degue"],
        articles: ["cuire-le-couscous-de-mil"],
      },
      {
        product: "attieke-sec",
        pourquoi:
          "L'attiéké est une semoule de manioc fermenté au goût légèrement acidulé, emblématique de la cuisine ivoirienne. La version déshydratée se garde longtemps et se réhydrate en quelques minutes. Deux recettes du site l'emploient : le garba et le poisson braisé à l'attiéké.",
        recettes: ["poisson-braise-attieke", "garba"],
        articles: ["reussir-attieke-maison", "difference-gari-attieke-tapioca"],
      },
      {
        product: "farine-de-mais-blanc",
        pourquoi:
          "Cuite à l'eau, la farine de maïs blanc donne une pâte ferme et lisse : le tô au Burkina Faso et au Mali, l'ugali au Kenya, le pap en Afrique du Sud. Deux recettes du site l'emploient, le tô sauce gombo et l'ugali au sukuma wiki. On la verse en pluie dans l'eau bouillante, puis on tourne vigoureusement à la spatule.",
        recettes: ["to-sauce-gombo", "ugali-sukuma-wiki"],
      },
      {
        product: "fonio",
        pourquoi:
          "Le fonio est une toute petite céréale cultivée depuis très longtemps en Afrique de l'Ouest, notamment au Mali, en Guinée, au Burkina Faso et au Sénégal. Ses grains très fins cuisent en quelques minutes, au goût léger entre noisette et semoule. Notre fonio aux légumes l'emploie, et il se prépare aussi en salade ou en version sucrée.",
        recettes: ["fonio-aux-legumes"],
        articles: ["quest-ce-que-le-fonio"],
      },
      {
        product: "gari-jaune",
        pourquoi:
          "Le gari est obtenu en râpant du manioc, en le laissant fermenter, puis en le torréfiant en fines graines croquantes ; la version jaune doit sa couleur à l'huile de palme. Au Bénin, au Nigeria et au Ghana, on le travaille dans l'eau chaude pour faire l'eba. Notre waakye le sert en accompagnement.",
        recettes: ["waakye"],
        articles: ["difference-gari-attieke-tapioca"],
      },
      {
        product: "farine-de-foufou",
        pourquoi:
          "Cette farine de manioc permet de préparer le foufou à la casserole, sans piler au mortier. Travaillée dans l'eau bouillante, elle donne une pâte lisse et élastique, qui accompagne les sauces et soupes d'Afrique centrale et de l'Ouest. Notre recette de foufou et light soup l'emploie.",
        recettes: ["fufu-light-soup"],
        articles: ["foufou-sans-grumeaux"],
      },
      {
        product: "farine-de-plantain-pour-fufu",
        pourquoi:
          "Au Ghana, le foufou se pile traditionnellement au mortier à partir de plantain et de manioc cuits. Cette farine de plantain séché permet d'obtenir une pâte lisse directement à la casserole. Elle sert dans notre foufou et light soup, avec la farine de manioc.",
        recettes: ["fufu-light-soup"],
      },
      {
        product: "farine-de-teff",
        pourquoi:
          "Le teff est une céréale minuscule cultivée depuis très longtemps sur les hauts plateaux d'Éthiopie et d'Érythrée, au goût doux et légèrement noisetté. Fermentée deux à trois jours, sa farine donne l'injera, la grande galette alvéolée de notre recette. On l'utilise aussi en pâtisserie.",
        recettes: ["injera"],
      },
      {
        product: "farine-d-igname",
        pourquoi:
          "L'elubo est une farine obtenue à partir d'igname épluchée, séchée puis moulue. Travaillée dans l'eau bouillante, elle donne l'amala, une pâte souple à la couleur brune caractéristique. Au sud-ouest du Nigeria, l'amala accompagne l'ewedu, le gbegiri et les sauces au poisson ou à la viande.",
        recettes: [],
      },
      {
        product: "tapioca-de-manioc",
        pourquoi:
          "Le tapioca granulé est tiré de l'amidon de manioc, humidifié puis roulé en petits grains qui gonflent et deviennent translucides dans l'eau. En Afrique de l'Ouest et centrale, on le prépare en bouillie sucrée, ou trempé dans l'eau froide avec du lait et du sucre. Il entre aussi dans des desserts à la noix de coco.",
        recettes: [],
        articles: ["difference-gari-attieke-tapioca"],
      },
    ],
    guide: [
      ["Semoule ou farine : le couscous de mil, l'attiéké et le fonio se cuisent à la vapeur ou se réhydratent ; les farines de maïs, de manioc ou de plantain se travaillent dans l'eau bouillante pour faire une pâte."],
      [
        "Pour une pâte sans grumeaux, versez la farine en pluie en remuant vigoureusement. Voir ",
        { href: "/conseils/foufou-sans-grumeaux", label: "le foufou sans grumeaux" },
        ".",
      ],
      [
        "Pour la vapeur, un couscoussier aide mais n'est pas indispensable. Voir ",
        { href: "/conseils/couscoussier-fonio-attieke", label: "notre conseil" },
        ".",
      ],
    ],
    faq: [
      {
        question: "Quelle différence entre gari, attiéké et tapioca ?",
        reponse: [
          "Les trois sont tirés du manioc. Le gari est une semoule fermentée puis grillée, l'attiéké une semoule fermentée cuite à la vapeur, et le tapioca l'amidon extrait de la racine, au goût neutre. Voir ",
          { href: "/conseils/difference-gari-attieke-tapioca", label: "notre conseil" },
          ".",
        ],
      },
      {
        question: "Qu'est-ce que le fonio ?",
        reponse: [
          "Une céréale ancienne d'Afrique de l'Ouest aux grains minuscules. Il se cuit très vite, à l'eau ou à la vapeur, puis s'égrène à la fourchette comme une semoule. Voir ",
          { href: "/conseils/quest-ce-que-le-fonio", label: "qu'est-ce que le fonio" },
          ".",
        ],
      },
      {
        question: "Comment cuire le couscous de mil ?",
        reponse: [
          "À la vapeur, jamais dans l'eau : on l'humidifie, on le cuit une première fois, on l'égrène, puis on le repasse à la vapeur jusqu'à ce qu'il soit tendre. Voir ",
          { href: "/conseils/cuire-le-couscous-de-mil", label: "cuire le couscous de mil" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "thes-et-cafes-africains",
    tab: "Thés et cafés",
    title: "Top 10 des thés et cafés d'Afrique",
    description:
      "Cafés d'Éthiopie, du Kenya, du Rwanda et du Cameroun, kinkeliba, rooibos : notre top 10 des thés et cafés d'Afrique, avec nos recettes et conseils.",
    intro:
      "Notre sélection de dix cafés, thés et infusions d'Afrique, parmi ceux de la boutique. Peu de recettes emploient ces boissons : ils sont donc classés selon le nombre de recettes et d'articles Conseils du site qui en parlent. À égalité, le plus courant passe devant.",
    updated: "2026-10-19",
    rankBy: "recettes-et-articles",
    items: [
      {
        product: "cafe-vert-du-cameroun",
        pourquoi:
          "Dans l'Ouest du Cameroun, de nombreuses familles torréfient encore leur café à la poêle. Ces grains verts permettent de retrouver ce geste et de choisir son degré de torréfaction. Ils servent à notre café Touba, et notre article explique comment les torréfier à la maison. Une fois grillés, ils se moulent et se préparent comme n'importe quel café.",
        recettes: ["cafe-touba"],
        articles: ["torrefier-cafe-vert-maison"],
      },
      {
        product: "cafe-yirgacheffe",
        pourquoi:
          "Yirgacheffe, dans le sud de l'Éthiopie, est l'une des régions de café les plus réputées au monde. Ses cafés lavés offrent une tasse légère, aux notes de fleurs blanches et d'agrumes. Deux de nos articles en parlent, dont celui sur la cérémonie du café éthiopienne. À moudre juste avant la préparation, au filtre ou à la cafetière à piston.",
        recettes: [],
        articles: ["ceremonie-du-cafe-ethiopienne", "cafes-ethiopie-kenya-rwanda"],
      },
      {
        product: "cafe-harrar",
        pourquoi:
          "La région de Harrar, à l'est de l'Éthiopie, produit un café séché dans son fruit, au soleil. Il en ressort une tasse corsée et fruitée, avec des notes de cacao : l'un des cafés les plus typés du pays. Il convient particulièrement à la cafetière italienne et à l'expresso.",
        recettes: [],
        articles: ["ceremonie-du-cafe-ethiopienne"],
      },
      {
        product: "cafe-du-kenya",
        pourquoi:
          "Les cafés du Kenya poussent sur les hauts plateaux, au pied du mont Kenya. Ils sont réputés pour leur acidité vive et leurs notes de fruits rouges et d'agrumes. En grains, ils gardent tout leur parfum jusqu'à la mouture, plutôt grossière pour le filtre ou la cafetière à piston.",
        recettes: [],
        articles: ["cafes-ethiopie-kenya-rwanda"],
      },
      {
        product: "cafe-du-rwanda",
        pourquoi:
          "Au Rwanda, le café pousse sur les collines, en altitude, et est cueilli par de petits producteurs. Il offre une tasse douce, fruitée et sucrée. Il se prête à toutes les méthodes, du filtre à l'expresso, et se moud juste avant la préparation.",
        recettes: [],
        articles: ["cafes-ethiopie-kenya-rwanda"],
      },
      {
        product: "cafe-moka-sidamo",
        pourquoi:
          "L'Éthiopie est le berceau de l'arabica. Dans la région de Sidamo, au sud du pays, le café pousse en altitude et offre une tasse florale, fruitée et délicate. Moulu, il se prépare au filtre ou à la cafetière à piston ; en Éthiopie, on le sert parfois avec une pincée de sel ou de cardamome.",
        recettes: [],
        articles: ["cafe-en-grains-ou-moulu"],
      },
      {
        product: "cafe-d-ethiopie-bio",
        pourquoi:
          "Ce café éthiopien vient de coopératives de petits producteurs, en agriculture biologique et commerce équitable. Il offre les notes florales et fruitées typiques des cafés d'Éthiopie. En grains, il se moud selon la préparation choisie : filtre, piston ou expresso. Bien refermer le paquet après chaque usage.",
        recettes: [],
        articles: ["cafe-en-grains-ou-moulu"],
      },
      {
        product: "kinkeliba",
        pourquoi:
          "Le kinkeliba est un arbuste du Sahel dont on infuse les feuilles séchées. Il donne une boisson ambrée au goût boisé et légèrement amer. Au Sénégal, on le boit le matin, souvent sucré, avec du pain, et il est très présent au moment du ramadan. On fait bouillir les feuilles quelques minutes, on filtre puis on sucre.",
        recettes: [],
      },
      {
        product: "the-noir-du-kenya",
        pourquoi:
          "Le Kenya est l'un des grands producteurs de thé noir au monde. Ses thés, cultivés sur les hauts plateaux, sont corsés et donnent une infusion très colorée. Au Kenya, il se prépare en chai : bouilli dans un mélange d'eau et de lait, sucré, parfois épicé, puis filtré.",
        recettes: [],
      },
      {
        product: "rooibos",
        pourquoi:
          "Le rooibos est un arbuste qui pousse principalement dans la région du Cederberg, en Afrique du Sud. Ses feuilles fermentées puis séchées donnent une infusion rouge ambré, au goût doux et légèrement vanillé. Il se boit à toute heure, chaud ou glacé ; en Afrique du Sud, souvent avec du lait et du miel.",
        recettes: [],
      },
    ],
    guide: [
      [
        "Grains ou moulu : le café en grains garde son arôme plus longtemps s'il est moulu juste avant usage ; le moulu est plus pratique mais s'évente vite. Voir ",
        { href: "/conseils/cafe-en-grains-ou-moulu", label: "café en grains ou moulu" },
        ".",
      ],
      ["Choisissez selon votre méthode : filtre ou piston pour les cafés floraux d'Éthiopie, cafetière italienne ou expresso pour le Harrar."],
      ["Pour les infusions, suivez la fiche : le kinkeliba se fait bouillir quelques minutes, le rooibos s'infuse dans l'eau bouillante."],
    ],
    faq: [
      {
        question: "Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?",
        reponse: [
          "Tous trois sont des arabicas d'altitude, mais l'Éthiopie donne souvent des cafés floraux et fruités, le Kenya des cafés vifs aux notes de fruits rouges, et le Rwanda des cafés doux et ronds. Voir ",
          { href: "/conseils/cafes-ethiopie-kenya-rwanda", label: "notre comparaison" },
          ".",
        ],
      },
      {
        question: "Comment se déroule la cérémonie du café éthiopienne ?",
        reponse: [
          "Les grains verts sont lavés, torréfiés devant les invités, pilés puis bouillis dans une jebena, une verseuse en terre cuite, et servis en trois tournées. Tous les détails dans ",
          { href: "/conseils/ceremonie-du-cafe-ethiopienne", label: "notre article" },
          ".",
        ],
      },
      {
        question: "Comment torréfier du café vert à la maison ?",
        reponse: [
          "Faites griller les grains dans une poêle épaisse, à sec et à feu moyen, en remuant sans arrêt jusqu'à la couleur voulue, puis laissez-les reposer avant de les moudre. Voir ",
          { href: "/conseils/torrefier-cafe-vert-maison", label: "comment torréfier du café vert" },
          ".",
        ],
      },
    ],
  },
];
