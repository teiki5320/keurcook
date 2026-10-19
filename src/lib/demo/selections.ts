import type { Selection } from "@/lib/selections/types";

/**
 * Pages « Nos sélections ». Uniquement des produits du catalogue (src/lib/demo/catalog-nouveautes.ts)
 * et des recettes du site ; caractéristiques et conseils tirés des fiches produits.
 * Vérifié par tests/selections.test.ts.
 */
export const demoSelections: Selection[] = [
  {
    slug: "ustensiles-cuisine-africaine",
    title: "Les ustensiles indispensables de la cuisine africaine",
    seoTitle: "Ustensiles de cuisine africaine : notre sélection",
    description:
      "Marmite à riz, couscoussier, mortier, araignée, spatules en bois : notre sélection d'ustensiles pour réussir les recettes africaines du site.",
    intro:
      "Pas besoin d'un équipement complet pour cuisiner africain. Voici neuf ustensiles de notre boutique, classés par ce qu'ils permettent de cuisiner. Pour chacun : sa matière, son entretien et les recettes du site qui s'en servent.",
    unite: "ustensiles",
    updated: "2026-10-19",
    gestes: {
      mijoter: "Mijoter et cuire le riz",
      tourner: "Piler et tourner",
      vapeur: "Vapeur",
      frire: "Frire",
      tamiser: "Tamiser",
      griller: "Galettes et grillades",
    },
    items: [
      {
        product: "marmite-en-aluminium",
        geste: "mijoter",
        pourquoi:
          "Le riz est au cœur de nombreux plats d'Afrique de l'Ouest, et il demande une marmite qui chauffe de façon régulière. Celle-ci, en aluminium épais, répartit bien la chaleur et favorise le xoon, ce fond de riz doré que l'on se dispute au Sénégal. C'est la marmite du thiéboudienne et du riz jollof ; nos recettes de pepper soup et de mbongo tchobi l'indiquent aussi.",
        onAime: ["Aluminium épais : la chaleur se répartit bien", "Favorise le xoon, le fond de riz doré"],
        aSavoir: ["Pas de lave-vaisselle : eau chaude savonneuse, puis bien sécher"],
        idealPour: "le thiéboudienne, le riz jollof et les sauces",
        matiere: "Aluminium épais",
        entretien: "À la main, sans lave-vaisselle",
        recettes: ["thieboudienne", "riz-jollof", "pepper-soup", "mbongo-tchobi"],
        podium: {
          mention: "Notre premier choix",
          resume: "La marmite des plats de riz : elle chauffe de façon régulière et donne le fond doré du thiéboudienne.",
        },
      },
      {
        product: "spatules-en-bois",
        geste: "tourner",
        pourquoi:
          "Le tô, le foufou ou l'ugali se travaillent avec énergie, en écrasant la pâte contre la paroi de la marmite. Il faut pour cela un ustensile solide qui ne raye pas le fond. Ce lot de huit spatules en bois couvre ce besoin, et sert aussi à remuer les sauces, le riz et les mijotés.",
        onAime: ["Solides pour tourner les pâtes épaisses", "Le bois ne raye pas la marmite"],
        aSavoir: ["Lavage à la main, bien sécher et huiler de temps en temps"],
        idealPour: "tourner le tô, le foufou et l'ugali",
        matiere: "Bois",
        taille: "Lot de 8",
        entretien: "À la main, huiler de temps en temps",
        recettes: ["to-sauce-gombo", "fufu-light-soup", "ugali-sukuma-wiki"],
        podium: {
          mention: "Pour débuter",
          resume: "Huit spatules solides pour tourner les pâtes contre la paroi et remuer toutes les sauces.",
        },
      },
      {
        product: "mortier-et-pilon-en-bois",
        geste: "tourner",
        pourquoi:
          "Le mortier en bois reste un outil du quotidien dans beaucoup de cuisines africaines. Celui-ci, en acacia, écrase l'ail, le piment, le gingembre, les arachides grillées ou les épices entières, en petites quantités. On s'en sert pour concasser les épices du pilau de Zanzibar, piler les gousses de la pepper soup ou écraser l'ail et le gingembre du liboke.",
        onAime: ["Acacia, un bois dense et solide", "Écrase épices, ail, piment et arachides"],
        aSavoir: ["Fait pour les petites quantités", "Lavage à l'eau chaude sans tremper, puis huiler"],
        idealPour: "les pâtes d'épices, l'ail et le piment",
        matiere: "Bois d'acacia",
        entretien: "Eau chaude sans tremper, huiler",
        recettes: ["pilau", "pepper-soup", "liboke-de-poisson"],
        podium: {
          mention: "Au quotidien",
          resume: "Un mortier en acacia pour écraser épices, ail, piment et arachides grillées.",
        },
      },
      {
        product: "faitout-en-fonte-d-aluminium",
        geste: "mijoter",
        pourquoi:
          "Pour les plats qui mijotent longtemps, un grand faitout à fond épais évite que la sauce n'attache. Celui-ci, en fonte d'aluminium, chauffe vite et reste plus léger qu'une cocotte en fonte de fer. Il convient au mafé, au romazava malgache et au luwombo, dont les paquets cuisent à la vapeur au fond du faitout.",
        onAime: ["Chauffe vite et répartit la chaleur", "Plus léger que la fonte de fer"],
        aSavoir: ["Éponge non abrasive pour le lavage"],
        idealPour: "le mafé, le ndolé et les longs mijotés",
        matiere: "Fonte d'aluminium",
        taille: "28 cm",
        entretien: "Eau chaude, éponge non abrasive",
        recettes: ["mafe", "romazava", "luwombo"],
      },
      {
        product: "couscoussier",
        geste: "vapeur",
        pourquoi:
          "Le couscoussier cuit les graines à la vapeur, dans un panier percé posé au-dessus d'une sauce ou d'une eau qui frémit. On s'en sert pour le couscous de mil du thiéré mbuum, l'attiéké du garba ou le mil du ngalakh et du dégué. Nous avons retenu un modèle en inox, avec sa marmite et son panier qui s'emboîtent.",
        onAime: ["Sauce en bas, vapeur en haut : deux cuissons à la fois", "Marmite et panier en inox qui s'emboîtent"],
        aSavoir: ["La semoule se cuit en deux passages, en l'égrenant entre les deux"],
        idealPour: "le thiéré, l'attiéké et le mil à la vapeur",
        matiere: "Inox",
        entretien: "Eau chaude savonneuse, bien sécher",
        recettes: ["thiere-mbuum", "garba", "ngalakh", "degue"],
      },
      {
        product: "araignee-a-friture",
        geste: "frire",
        pourquoi:
          "Beignets, plantains frits, accras : la friture tient une grande place dans les cuisines d'Afrique de l'Ouest. L'araignée, avec son large panier en fils métalliques, sort plusieurs morceaux à la fois de l'huile et les égoutte aussitôt. Elle sert pour les akara, l'alloco, les puff-puff et le kelewele.",
        onAime: ["Large panier : plusieurs beignets à la fois", "Égoutte dès la sortie de l'huile"],
        aSavoir: ["Poser ensuite les fritures sur du papier absorbant"],
        idealPour: "l'alloco, les puff-puff et les accras",
        matiere: "Fils métalliques",
        taille: "14 cm",
        entretien: "Eau chaude savonneuse, bien sécher",
        recettes: ["akara", "alloco", "puff-puff", "kelewele"],
      },
      {
        product: "tamis-en-bois",
        geste: "tamiser",
        pourquoi:
          "Un tamis à maille fine sert autant pour les farines que pour les boissons. Il affine la farine de teff, de maïs ou de manioc, et retient les fibres du jus de bouye ou du jus de gingembre. Dans la light soup ghanéenne qui accompagne le foufou, il sert à passer les légumes mixés.",
        onAime: ["Maille fine pour les farines et les jus", "Cadre en bois classique"],
        aSavoir: ["Se brosse à sec et sèche à l'air"],
        idealPour: "les farines, le fonio et les jus filtrés",
        matiere: "Cadre en bois",
        taille: "24 cm",
        entretien: "Brosser à sec, sécher à l'air",
        recettes: ["jus-de-bouye", "jus-de-gingembre", "fufu-light-soup"],
      },
      {
        product: "plaque-a-injera",
        geste: "griller",
        pourquoi:
          "L'injera se cuit traditionnellement sur le mitad, une large plaque de terre cuite qu'on trouve rarement en Europe. Cette plaque électrique de 30 cm permet de la préparer à la maison : la pâte se verse en spirale et la crêpe cuit sans être retournée. Elle convient aussi aux crêpes de mil et aux galettes.",
        onAime: ["Grande surface de 30 cm", "Cuisson sans retourner la crêpe"],
        aSavoir: ["Se nettoie au chiffon humide, une fois refroidie et débranchée"],
        idealPour: "l'injera, les crêpes de mil et les galettes",
        matiere: "Plaque électrique",
        taille: "30 cm",
        entretien: "Chiffon humide, plaque refroidie",
        recettes: ["injera"],
      },
      {
        product: "brochettes-en-metal",
        geste: "griller",
        pourquoi:
          "Le suya se grille sur de longues piques, la viande taillée très finement et enfilée en accordéon. Ces brochettes en métal de 40 cm sont réutilisables et passent au barbecue comme au four. Elles servent aussi pour les brochettes de poisson ou de légumes.",
        onAime: ["Réutilisables", "Barbecue comme four"],
        aSavoir: ["Vérifiez sur la fiche Amazon qu'elles tiennent sur votre grille ou votre plat"],
        idealPour: "le suya, les dibi et les grillades",
        matiere: "Métal",
        taille: "40 cm, lot de 30",
        entretien: "Eau chaude savonneuse, bien sécher",
        recettes: ["suya"],
      },
    ],
    guide: [
      {
        titre: "Commencez par l'essentiel",
        texte: [
          "Une marmite à fond épais, une spatule en bois solide et un mortier suffisent pour une bonne partie des recettes du site. Ajoutez le couscoussier, la plaque ou les brochettes quand une recette précise vous en donne l'envie.",
        ],
      },
      {
        titre: "Vérifiez la taille et votre plaque de cuisson",
        texte: [
          "Regardez la contenance et le diamètre sur la fiche Amazon, et assurez-vous que l'ustensile convient à votre plaque (gaz, électrique ou induction). Pour cuire à la vapeur, le panier doit s'emboîter sur votre marmite.",
        ],
      },
      {
        titre: "Bois, pierre ou métal",
        texte: [
          "Le bois ne raye pas les marmites mais se lave à la main et se sèche bien. Pour le mortier, le bois convient aux épices et aux arachides, le granit aux aromates frais : voir ",
          { href: "/conseils/mortier-bois-ou-pierre", label: "mortier en bois ou en pierre" },
          ".",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il vraiment un couscoussier pour le fonio ou l'attiéké ?",
        reponse: [
          "Pas forcément. Le fonio précuit et l'attiéké sec se préparent sans lui ; pour le couscous de mil, en revanche, la vapeur est la méthode de base. Pour improviser, posez une passoire à trous fins sur une marmite et colmatez la jonction avec un torchon humide roulé, pour que la vapeur passe par les grains. Tous les détails dans ",
          { href: "/conseils/couscoussier-fonio-attieke", label: "notre conseil sur le couscoussier" },
          ".",
        ],
      },
      {
        question: "Comment entretenir un mortier et des spatules en bois ?",
        reponse: [
          "Lavez-les à l'eau chaude, sans les laisser tremper, séchez-les bien puis huilez-les de temps en temps. Voir aussi ",
          { href: "/conseils/entretenir-mortier-pilon-bois", label: "comment entretenir un mortier en bois" },
          ".",
        ],
      },
      {
        question: "Peut-on passer ces ustensiles au lave-vaisselle ?",
        reponse: [
          "Mieux vaut l'éviter. La marmite en aluminium se lave à l'eau chaude savonneuse et se sèche bien, le bois se lave à la main, et la plaque électrique se nettoie avec un chiffon humide, une fois refroidie et débranchée, sans jamais la plonger dans l'eau. En cas de doute, suivez la notice du fabricant.",
        ],
      },
      {
        question: "Pourquoi aucun prix n'est affiché ?",
        reponse: [
          "Les prix changent souvent sur Amazon : le prix du jour figure sur la fiche Amazon du produit. Notre sélection repose sur l'usage en cuisine et sur les recettes du site.",
        ],
      },
    ],
  },
];
