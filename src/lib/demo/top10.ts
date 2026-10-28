import type { Top10 } from "@/lib/top10/types";
import { demoProducts } from "./catalog";

/**
 * Date du relevé des notes des acheteurs sur Amazon.fr (page de chaque produit). Les notes ne sont ni
 * enregistrées ni affichées : seul l'ordre des produits en découle. À relever de nouveau avant de modifier un classement.
 */
const RELEVE = "2026-10-19";
/** Mixeurs : notes relevées de nouveau le 28 octobre 2026, quand le hachoir Choppeo (indisponible) a été remplacé. */
const RELEVE_MIXEURS = "2026-10-28";

/**
 * Introduction des onglets classés selon la note des acheteurs ; le n° 1 est nommé à la suite.
 * `peuDAvis` (livres) : tous les produits sont gardés, même avec peu d'évaluations, et ceux sans note vont à la fin.
 */
function introNote(quoi: string, feminin: boolean, peuDAvis?: { qui: string; suite: string }, releve: string = RELEVE): string {
  const date = new Date(`${releve}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
  const debut = `Notre sélection de ${quoi}, parmi ${feminin ? "celles" : "ceux"} de la boutique, ${feminin ? "classées" : "classés"} selon la note moyenne des acheteurs sur Amazon.fr, relevée le ${date} ; à égalité, ${feminin ? "la plus évaluée" : "le plus évalué"} passe devant.`;
  if (peuDAvis) {
    return `${debut} Certains ${peuDAvis.qui} n'ont encore que quelques évaluations, parfois une seule : leur note est donc moins sûre, et ceux qui n'ont aucune note sont placés à la fin. Les notes servent à classer mais ne sont pas affichées, et nous n'avons pas testé ces ${peuDAvis.qui}. ${peuDAvis.suite}`;
  }
  return `${debut} Seuls les produits disponibles avec au moins 10 évaluations sont retenus. Les notes servent à classer mais ne sont pas affichées, et nous n'avons pas testé ces produits.`;
}

/**
 * Onglets de la page « Top 10 », dans l'ordre d'affichage. Uniquement des produits de la boutique
 * avec un lien Amazon (src/lib/demo/catalog*.ts) et des recettes ou articles du site.
 * Textes tirés des fiches produits. Vérifié par tests/top10.test.ts.
 */
const tops: Top10[] = [
  {
    slug: "ustensiles-cuisine-africaine",
    tab: "Ustensiles",
    title: "Top 10 des ustensiles indispensables de la cuisine africaine",
    seoTitle: "Top 10 des ustensiles de la cuisine africaine",
    description:
      "Araignée, faitout, spatules, mortiers, couscoussier : notre top 10 des ustensiles, classés selon l'avis des acheteurs sur Amazon.fr.",
    intro: introNote("dix ustensiles de cuisine", false),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "araignee-a-friture",
        pourquoi:
          "Huit recettes du site passent par la friture : alloco, kelewele, puff-puff, akara… Avec son large panier en fils métalliques, l'araignée retire plusieurs morceaux de l'huile à la fois et les égoutte aussitôt. On pose ensuite les fritures sur du papier absorbant. Elle se lave à l'eau chaude savonneuse et se sèche bien.",
        recettes: ["alloco", "kelewele", "riz-jollof", "soupe-egusi", "garba", "poulet-dg", "puff-puff", "akara"],
      },
      {
        product: "faitout-en-fonte-d-aluminium",
        pourquoi:
          "Quatorze recettes du site se cuisinent dans un faitout ou une cocotte, du ndolé au doro wat. Celui-ci, en fonte d'aluminium, chauffe vite et répartit la chaleur de façon homogène, sans être aussi lourd que la fonte de fer. C'est l'allié des plats qui mijotent longtemps : sauces feuilles, ragoûts, kedjenou. Il se lave à l'eau chaude avec une éponge non abrasive.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "spatules-en-bois",
        pourquoi:
          "Le tô, le foufou ou l'ugali se tournent avec énergie contre la paroi de la marmite : six recettes du site demandent une spatule ou une cuillère en bois. Solides, ces spatules ne rayent pas le fond. Le lot de huit sert aussi à remuer les sauces, le riz et les mijotés. Elles se lavent à la main, se sèchent bien et s'huilent de temps en temps.",
        recettes: ["to-sauce-gombo", "fufu-light-soup", "ugali-sukuma-wiki", "cafe-touba", "puff-puff", "akara"],
      },
      {
        product: "mortier-en-granit",
        pourquoi:
          "Il sert dans les mêmes neuf recettes que le mortier en bois, avec un autre usage. Le granit, lourd et non poreux, écrase efficacement les aromates frais sans glisser. On y prépare la base ail-gingembre-piment des marinades, les pâtes de piment frais ou les mélanges d'épices en graines. Il se rince à l'eau chaude et sèche à l'air.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["mortier-bois-ou-pierre"],
      },
      {
        product: "couscoussier",
        pourquoi:
          "Le couscoussier associe une marmite et un panier percé : l'eau ou la sauce mijote en bas pendant que les graines cuisent à la vapeur en haut. Quatre recettes du site l'emploient : le thiéré mbuum, l'attiéké du garba, le ngalakh et le dégué. On humidifie la semoule, on la cuit, on l'égrène puis on la remet à cuire une seconde fois. Ce modèle en inox se lave à l'eau chaude savonneuse.",
        recettes: ["garba", "thiere-mbuum", "ngalakh", "degue"],
        articles: ["couscoussier-fonio-attieke"],
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
        product: "brochettes-en-metal",
        pourquoi:
          "Ce lot de trente brochettes en métal de 40 cm sert au suya, la brochette épicée des rues du Nigeria, grillée sur de longues piques au-dessus des braises. Elles conviennent aussi aux dibi et aux brochettes de poisson ou de légumes. Réutilisables, elles vont au barbecue comme au four. On les lave à l'eau chaude savonneuse, puis on les sèche bien.",
        recettes: ["suya"],
      },
      {
        product: "saladier-en-bois",
        pourquoi:
          "Dans beaucoup de cuisines africaines, on partage le repas autour d'un plat commun : ce grand saladier en acacia de 26 cm s'y prête bien. Quatre recettes du site commencent dans un saladier, de la pâte de l'injera à celle des puff-puff. Il met aussi en valeur le thiakry ou l'attiéké. On évite les liquides très chauds et on le lave rapidement à la main.",
        recettes: ["injera", "puff-puff", "jus-de-bouye", "jus-de-gingembre"],
      },
      {
        product: "tamis-en-bois",
        pourquoi:
          "Un tamis à maille fine sert autant aux farines qu'aux boissons. Quatre recettes du site l'emploient : il retient les fibres du jus de bouye et du jus de gingembre, passe les légumes de la light soup et sert pour le ngalakh. Son cadre en bois est un classique des cuisines africaines. Il se brosse à sec et sèche à l'air.",
        recettes: ["fufu-light-soup", "jus-de-gingembre", "ngalakh", "jus-de-bouye"],
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
      "Farine de maïs blanc, pain de singe, poivre de Penja, feuilles de manioc, soumbala : notre top 10 des ingrédients, classés selon l'avis des acheteurs.",
    intro: introNote("dix ingrédients", false),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "farine-de-mais-blanc",
        pourquoi:
          "Cuite à l'eau, la farine de maïs blanc donne une pâte ferme et lisse : le tô au Burkina Faso et au Mali, l'ugali au Kenya, le pap en Afrique du Sud. Deux recettes du site l'emploient, le tô sauce gombo et l'ugali au sukuma wiki. On la verse en pluie dans l'eau bouillante, puis on tourne vigoureusement à la spatule.",
        recettes: ["to-sauce-gombo",  "ugali-sukuma-wiki"],
      },
      {
        product: "poudre-de-baobab",
        pourquoi:
          "Le pain de singe est la pulpe du fruit du baobab réduite en poudre, au goût acidulé. Au Sénégal, elle sert au jus de bouye et à la crème du ngalakh, deux recettes du site. Elle se délaye facilement dans l'eau froide ou le lait, puis se sucre à votre goût.",
        recettes: ["jus-de-bouye",  "ngalakh"],
      },
      {
        product: "poivre-de-penja",
        pourquoi:
          "Cinq recettes du site le demandent, dont le ndolé, le poulet DG et le kedjenou. Cultivé dans la région de Penja, au Cameroun, ce poivre blanc offre un piquant net et des notes boisées et musquées. On le moud au dernier moment, en fin de cuisson, pour garder tout son parfum.",
        recettes: ["ndole", "poisson-braise-attieke", "kedjenou", "caldou", "poulet-dg"],
      },
      {
        product: "feuilles-de-manioc",
        pourquoi:
          "Ces feuilles de manioc pilées sont la base du pondu, ou saka-saka, des deux Congo, et du ravitoto malgache, deux recettes du site. En conserve, elles sont déjà pilées et prêtes à cuisiner. On les fait mijoter avec de l'huile de palme, de l'oignon, de l'ail et souvent du poisson fumé.",
        recettes: ["pondu",  "ravitoto"],
      },
      {
        product: "soumbala",
        pourquoi:
          "Le soumbala, ou nététou, est fait de graines de néré cuites puis fermentées. Il donne au mafé, au thiéboudienne et aux sauces un goût profond, proche de l'umami : quatre recettes du site l'emploient. Son odeur est forte, mais un petit morceau écrasé en début de cuisson suffit.",
        recettes: ["mafe", "thieboudienne", "fonio-aux-legumes", "to-sauce-gombo"],
        articles: ["quest-ce-que-le-soumbala", "par-quoi-remplacer-le-soumbala"],
      },
      {
        product: "attieke-sec",
        pourquoi:
          "L'attiéké est une semoule de manioc fermenté au goût légèrement acidulé, emblématique de la cuisine ivoirienne. La version déshydratée se garde longtemps et se réhydrate en quelques minutes. Nos recettes de garba et de poisson braisé à l'attiéké l'emploient, avec oignons, tomate et piment.",
        recettes: ["poisson-braise-attieke", "garba"],
        articles: ["reussir-attieke-maison"],
      },
      {
        product: "berbere",
        pourquoi:
          "Le berbéré est le mélange d'épices rouge et relevé de la cuisine éthiopienne : piment, fenugrec, gingembre, ail et épices chaudes, le plus souvent. Il parfume les wats servis sur l'injera, et trois recettes du site l'emploient. On le fait d'abord revenir dans le beurre ou l'huile avec les oignons.",
        recettes: ["doro-wat", "misir-wat", "shiro"],
        articles: ["quest-ce-que-le-berbere"],
      },
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
    slug: "mortiers-et-pilons",
    tab: "Mortiers",
    title: "Top 10 des mortiers et pilons",
    seoTitle: "Top 10 des mortiers et pilons pour la cuisine africaine",
    description:
      "Granit, marbre, bois ou inox, de 20 à 10,5 cm : notre top 10 des mortiers et pilons pour piler ail, piment, arachides et épices dans les recettes africaines.",
    intro: introNote("dix mortiers et pilons", false),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "mortier-en-granit",
        pourquoi:
          "Lourd et non poreux, ce mortier en granit de 14 cm écrase les aromates frais sans glisser. On y prépare la base ail-gingembre-piment des marinades, les pâtes de piment frais ou les mélanges d'épices en graines. Il se rince à l'eau chaude et sèche à l'air.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["mortier-bois-ou-pierre"],
      },
      {
        product: "mortier-marbre-blanc",
        pourquoi:
          "Petit mais lourd, ce mortier en marbre blanc massif de 11 cm reste stable pendant qu'on écrase. Il suffit pour une gousse d'ail, une pincée de poivre de Selim ou quelques clous de girofle. Ses dimensions compactes conviennent aux petites cuisines.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "mortier-marbre-noir",
        pourquoi:
          "Ce mortier Coninx en marbre massif noir mesure 15 cm pour 8 cm de haut. Lourd et stable, il écrase facilement les herbes fraîches, l'ail et les épices pour en libérer les arômes. Il peut rester posé sur le plan de travail. On le rince à l'eau chaude, puis on le sèche.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "mortier-granit-16-cm",
        pourquoi:
          "Profond, avec ses 16 cm de diamètre et 8 cm de haut, ce mortier en granit garde les ingrédients dans la coquille pendant qu'on pile. Son poids l'empêche de glisser sur le plan de travail. Il convient aux arachides grillées, aux graines d'egusi ou aux épices du pilau.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "mortier-granit-socle-acacia",
        pourquoi:
          "Le granit pour écraser, le bois d'acacia pour protéger le plan de travail : ce mortier de 15,5 cm est posé sur un socle et livré avec un pilon extra-long. Le long manche donne de la force sans effort pour broyer herbes et épices. Le granit se rince à l'eau chaude, le socle s'essuie.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "grand-mortier-granit-20-cm",
        pourquoi:
          "Le plus grand de notre sélection : 20 cm de granit massif, pour piler de grandes quantités d'ail, de gingembre, de piment ou de feuilles en une fois. C'est le mortier des grandes tablées, quand la sauce est prévue pour huit. L'extérieur poli lui permet aussi de servir de bol. Il se rince à l'eau chaude, sans lave-vaisselle.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "mortier-granit-18-cm",
        pourquoi:
          "Ce mortier Cole & Mason en granit noir de 18 cm est lisse à l'extérieur et brut à l'intérieur, pour bien accrocher les ingrédients secs comme humides. Assez grand pour une pâte d'épices ou une marinade de poulet yassa, il reste maniable au quotidien. Il ne passe pas au lave-vaisselle.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["mortier-bois-ou-pierre"],
      },
      {
        product: "mortier-et-pilon-en-bois",
        pourquoi:
          "En acacia, un bois dense et solide, ce mortier de 12,7 cm écrase épices, ail, piment, arachides grillées ou feuilles. C'est un outil du quotidien dans beaucoup de cuisines africaines, fait pour les petites quantités. Il se lave à l'eau chaude sans tremper, puis s'huile de temps en temps.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["entretenir-mortier-pilon-bois"],
      },
      {
        product: "mortier-inox",
        pourquoi:
          "L'inox ne retient ni les odeurs ni les traces : le piment d'hier ne parfume pas les épices du lendemain. Ce mortier Mastrad d'environ 13 cm, à double paroi et base stable, passe au lave-vaisselle. Il peut aussi servir de petit bol pour une sauce.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
      },
      {
        product: "petit-mortier-hetre",
        pourquoi:
          "Le plus petit et le plus léger de notre sélection : 10,5 cm de bois de hêtre. Il sert à moudre en poudre les épices entières juste avant usage, pour en libérer l'arôme. Il se lave à la main à l'eau chaude, sans tremper, puis se sèche bien.",
        recettes: ["soupe-egusi", "eru", "liboke-de-poisson", "pilau", "romazava", "ravitoto", "cafe-touba", "pepper-soup", "mbongo-tchobi"],
        articles: ["entretenir-mortier-pilon-bois"],
      },
    ],
    guide: [
      ["Choisissez la taille selon vos quantités : un grand mortier pour les sauces familiales et les feuilles, un petit pour moudre des épices au dernier moment."],
      [
        "Le bois convient aux épices et aux arachides, la pierre (granit, marbre) aux aromates frais et humides. Voir ",
        { href: "/conseils/mortier-bois-ou-pierre", label: "mortier en bois ou en pierre" },
        ".",
      ],
      ["L'inox ne retient pas les odeurs et passe au lave-vaisselle ; la pierre et le bois se rincent à l'eau chaude."],
    ],
    faq: [
      {
        question: "Mortier en bois ou en pierre ?",
        reponse: [
          "Le bois convient aux épices sèches et aux arachides ; le granit, lourd et non poreux, écrase mieux les aromates frais sans glisser. Voir ",
          { href: "/conseils/mortier-bois-ou-pierre", label: "notre conseil" },
          ".",
        ],
      },
      {
        question: "Comment entretenir un mortier en bois ?",
        reponse: [
          "Lavez-le à l'eau chaude sans le laisser tremper, séchez-le bien puis huilez-le de temps en temps. Voir ",
          { href: "/conseils/entretenir-mortier-pilon-bois", label: "comment entretenir un mortier en bois" },
          ".",
        ],
      },
      {
        question: "Peut-on passer un mortier au lave-vaisselle ?",
        reponse: ["Seulement s'il est en inox, comme le Mastrad de cette sélection. Le bois, le granit et le marbre se rincent à l'eau chaude puis sèchent à l'air."],
      },
    ],
  },
  {
    slug: "marmites-et-cocottes",
    tab: "Marmites",
    title: "Top 10 des marmites et cocottes pour les plats mijotés",
    seoTitle: "Top 10 des marmites et cocottes pour mijoter",
    description:
      "Inox, fonte émaillée, caldero, potjie : notre top 10 des marmites et cocottes pour le ndolé, le riz jollof et les mijotés, de 13,5 à 2,5 litres.",
    intro: introNote("dix marmites et cocottes", true),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "cocotte-staub-28-cm",
        pourquoi:
          "Cette cocotte Staub de 28 cm, fabriquée en France, contient 6,7 litres de fonte émaillée. Son émail intérieur noir mat facilite le rissolage, et les picots du couvercle répartissent l'humidité sur les aliments. La fonte garde longtemps la chaleur : le plat reste chaud à table.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "cocotte-fonte-emaillee-28-cm",
        pourquoi:
          "Même taille que la Staub, 28 cm pour 6,6 litres, cette cocotte Overmont en fonte émaillée retient et diffuse la chaleur de façon régulière. Elle convient aux cuissons lentes : ragoûts, soupes épaisses, viandes braisées. Elle va sur tous les feux, dont l'induction.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "faitout-fonte-aluminium-36-cm",
        pourquoi:
          "Avec 36 cm de diamètre et 13 litres, ce faitout Kamberg est fait pour les mijotés en grande quantité. La fonte d'aluminium chauffe vite et son revêtement type pierre limite l'attache. Il va sur tous les feux, dont l'induction, et passe au lave-vaisselle.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "faitout-en-fonte-d-aluminium",
        pourquoi:
          "Ce faitout Kamberg de 28 cm contient 5,8 litres : la taille du quotidien pour quatre à six personnes. La fonte d'aluminium chauffe vite et répartit la chaleur de façon homogène, sans le poids de la fonte de fer. Il se lave à l'eau chaude avec une éponge non abrasive.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "marmite-potjie",
        pourquoi:
          "Le potjie est une marmite ventrue en fonte d'environ 6 litres, montée sur trois pieds, héritée des cuisines de plein air d'Afrique du Sud. Posée sur les braises, elle mijote lentement viande, légumes et épices. Le potjiekos, ragoût en couches cuit sans remuer, en est le plat emblématique.",
        recettes: [],
      },
      {
        product: "marmite-inox-13-litres",
        pourquoi:
          "La plus grande de notre sélection : 13,5 litres d'inox pour le riz, les bouillons et les sauces des grandes tablées. Son triple fond diffuseur répartit la chaleur pour une cuisson homogène, et elle va sur tous les feux, dont l'induction. Le couvercle en verre a un trou vapeur. Elle se lave à l'eau chaude savonneuse.",
        recettes: ["riz-jollof", "thiere-mbuum", "fufu-light-soup", "waakye", "eru", "koki", "poulet-odika", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi", "matoke"],
      },
      {
        product: "cocotte-fonte-emaillee-4-litres",
        pourquoi:
          "Une cocotte en fonte émaillée de 4,1 litres, pour les mijotés à deux ou quatre personnes. L'émail vitrifié ne réagit pas avec les aliments : on peut mariner, cuire et conserver dans le même plat. Elle va sur tous les feux et au four jusqu'à 260 °C.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "marmite-en-aluminium",
        pourquoi:
          "La plus petite de notre sélection, environ 2,5 litres, mais la marmite des plats de riz. En aluminium épais, elle répartit bien la chaleur et favorise au fond la formation du xoon, le riz légèrement croustillant recherché au Sénégal. Elle se lave à l'eau chaude savonneuse, sans lave-vaisselle.",
        recettes: ["riz-jollof", "thiere-mbuum", "fufu-light-soup", "waakye", "eru", "koki", "poulet-odika", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi", "matoke"],
      },
      {
        product: "faitout-inox-24-cm",
        pourquoi:
          "Ce faitout Beka Polo en inox 18/10, sans revêtement, contient environ 5,4 litres. Son fond capsulé trois couches chauffe vite et de façon homogène, et son couvercle en verre à évent permet de surveiller la sauce sans le soulever. Il passe au lave-vaisselle.",
        recettes: ["ndole", "doro-wat", "soupe-egusi", "sauce-graine", "kedjenou", "caldou", "poulet-dg", "moambe", "poulet-odika", "misir-wat", "pilau", "luwombo", "romazava", "ravitoto"],
      },
      {
        product: "caldero-aluminium-7-litres",
        pourquoi:
          "La grande version du caldero : près de 7 litres d'aluminium poli, pour les grandes portions de riz, de haricots et de ragoûts. L'aluminium répartit la chaleur, ce qui aide le riz à cuire de façon régulière. On cuit le riz à feu doux, couvercle fermé.",
        recettes: ["riz-jollof", "thiere-mbuum", "fufu-light-soup", "waakye", "eru", "koki", "poulet-odika", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi", "matoke"],
      },
    ],
    guide: [
      ["Choisissez la contenance selon la tablée : 4 à 6 litres pour quatre à six personnes, 7 litres et plus pour les grandes familles et les plats de fête."],
      ["Fonte émaillée ou fonte d'aluminium pour les longs mijotés ; aluminium épais pour le riz ; inox pour les bouillons et un entretien simple."],
      ["Vérifiez sur la fiche Amazon que la marmite convient à votre plaque (gaz, électrique ou induction)."],
    ],
    faq: [
      {
        question: "Fonte ou aluminium pour une marmite ?",
        reponse: ["La fonte garde longtemps la chaleur, idéale pour les longs mijotés ; l'aluminium chauffe plus vite et pèse moins. La fonte d'aluminium est entre les deux."],
      },
      {
        question: "Quelle marmite pour le thiéboudienne ou le riz jollof ?",
        reponse: [
          "Une marmite en aluminium épais, comme le caldero : elle répartit bien la chaleur et favorise le fond de riz doré. Voir ",
          { href: "/conseils/reussir-le-riz-rouge-du-thieboudienne", label: "réussir le riz rouge du thiéboudienne" },
          ".",
        ],
      },
      {
        question: "Peut-on passer ces marmites au lave-vaisselle ?",
        reponse: ["Le faitout Beka en inox et les faitouts Kamberg oui ; la fonte et l'aluminium poli se lavent plutôt à l'eau chaude, puis se sèchent bien. Suivez la notice du fabricant."],
      },
    ],
  },
  {
    slug: "mixeurs-sauces-pate-d-arachide",
    tab: "Mixeurs",
    title: "Top 10 des mixeurs pour sauces et pâtes d'arachide",
    seoTitle: "Top 10 des mixeurs pour sauces africaines",
    description:
      "Blenders de 2000 à 800 W, robot, mixeur plongeant et hachoir : notre top 10 des mixeurs pour les sauces, la pâte d'arachide et les jus de la cuisine africaine.",
    intro: introNote("dix mixeurs", false, undefined, RELEVE_MIXEURS),
    updated: "2026-10-28",
    rankBy: "note-acheteurs",
    classementLe: RELEVE_MIXEURS,
    items: [
      {
        product: "blender-ninja-2-en-1",
        pourquoi:
          "Ce Ninja de 1200 W associe un pichet de 2,1 litres et un gobelet de 700 ml. Ses programmes « hacher » et « réduire en purée » conviennent aux oignons et au piment comme aux bases de sauce. Le gobelet sert pour un jus de gingembre individuel.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "mixeur-plongeant-moulinex-daily-chef",
        pourquoi:
          "Le mixeur plongeant se glisse directement dans la marmite : pratique pour lisser une soupe d'arachide ou une light soup sans transvaser. Ce Moulinex de 600 W a quatre lames en inox et un pied anti-éclaboussure. Il est livré avec un gobelet de 800 ml.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "hachoir-h-koenig-leo8",
        pourquoi:
          "Le moins puissant de notre sélection, mais le plus simple pour hacher : 320 W et un bol en verre gradué d'un litre. Par impulsions, il garde des morceaux d'oignon ou de piment ; plus longtemps, il donne une purée d'ail et de gingembre. Il se range facilement.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-magimix-power-4",
        pourquoi:
          "Ce blender Magimix de 1300 W a un bol en verre thermorésistant de 1,8 litre, qui accepte les préparations chaudes comme froides. Il mixe, hache et pile la glace, avec cinq programmes automatiques. Pratique pour mixer la base d'une sauce encore tiède.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-amzchef-2000w",
        pourquoi:
          "Le plus puissant de notre sélection avec le Springlane : 2000 W et jusqu'à 25 000 tours par minute. Ses huit lames en inox entraînent les ingrédients vers le bas, utile pour les bases ail-oignon-piment, les graines d'egusi ou les haricots trempés des akara. Le bol contient 2 litres.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-moulinex-perfectmix",
        pourquoi:
          "Le Moulinex PerfectMix Plus, 1200 W, a un bol en verre de 2 litres et des lames Powelix pour un mixage rapide. Son programme de nettoyage automatique évite de démonter les lames après une sauce au piment. Une valeur sûre pour les mixages du quotidien.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-springlane-hanno-2000w",
        pourquoi:
          "Comme l'AMZCHEF, 2000 W, mais avec un atout pour la pâte d'arachide : un petit bol en inox de 750 ml prévu pour les purées de noix. Le grand bol mixe les sauces et les soupes, le petit broie les arachides grillées. Il pile aussi la glace pour les jus.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "robot-moulinex-easy-force",
        pourquoi:
          "Plus qu'un blender : ce robot Moulinex de 800 W hache, émince, râpe, pétrit et mixe grâce à six accessoires. Il prépare en quelques secondes les oignons du yassa ou les légumes d'une sauce. Son bol de 3 litres range la plupart des accessoires.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-moulinex-blendforce",
        pourquoi:
          "Ce Moulinex Blendforce de 800 W mixe jusqu'à trois minutes en continu, et son moteur est refroidi par air. Le bol en verre de 1,75 litre supporte jusqu'à 80 °C. Un bon premier blender pour les bases tomate-oignon et les soupes.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
      {
        product: "blender-philips-5000",
        pourquoi:
          "Simple et peu encombrant, ce Philips de 1000 W fait circuler les ingrédients grâce à son bol nervuré pour une texture lisse. Le bol contient 2 litres, dont 1,5 litre utile. Il suffit pour les sauces et les jus d'une famille.",
        recettes: ["ndole", "poisson-braise-attieke", "thieboudienne", "kelewele", "riz-jollof", "soupe-egusi", "fufu-light-soup", "poulet-dg", "koki", "liboke-de-poisson", "misir-wat", "jus-de-gingembre", "akara", "pepper-soup", "groundnut-soup", "mbongo-tchobi"],
      },
    ],
    guide: [
      ["Pour la pâte d'arachide et les graines, visez un blender puissant (1200 W et plus) ou un petit bol dédié aux purées de noix."],
      ["Pour les sauces et les soupes, un bol en verre accepte mieux les préparations tièdes ; un mixeur plongeant évite de transvaser."],
      ["Pour l'ail, l'oignon et le piment en petite quantité, un hachoir suffit et se nettoie plus vite."],
    ],
    faq: [
      {
        question: "Peut-on faire sa pâte d'arachide au blender ?",
        reponse: ["Oui, avec un blender puissant ou un petit bol pour purées de noix : mixez les arachides grillées par impulsions en raclant les bords, jusqu'à obtenir une pâte lisse."],
      },
      {
        question: "Blender ou mixeur plongeant pour les sauces ?",
        reponse: ["Le blender donne une texture plus fine et convient aux bases crues ; le mixeur plongeant mixe directement dans la marmite, pratique pour les soupes."],
      },
      {
        question: "Combien de temps se garde la pâte d'arachide ?",
        reponse: [
          "Bien fermée et entamée avec une cuillère propre, plusieurs semaines, souvent davantage. Voir ",
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
      "Poivre voatsiperifery, vanille de Madagascar, maniguette, pili-pili, poivre de Penja : notre top 10 des épices, classées selon l'avis des acheteurs.",
    intro: introNote("dix épices", true),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "poivre-sauvage-voatsiperifery",
        pourquoi:
          "Le voatsiperifery est un poivre sauvage qui pousse sur des lianes dans les forêts de Madagascar. Ses baies à petite queue sont cueillies à la main, puis séchées. Son piquant est plus doux que celui du poivre noir, avec un parfum boisé et légèrement citronné. On le moud au dernier moment sur les poissons, les viandes blanches ou les légumes.",
        recettes: [],
      },
      {
        product: "vanille-bourbon-de-madagascar",
        pourquoi:
          "La vanille bourbon est cultivée à Madagascar, où chaque fleur est fécondée à la main ; les gousses sont ensuite échaudées, étuvées et séchées lentement. Elle parfume le dégué, la crème de mil au lait caillé de notre site, ainsi que les desserts et certaines sauces pour le poisson. On fend la gousse, on gratte les graines et on les infuse dans le lait chaud.",
        recettes: ["degue"],
      },
      {
        product: "maniguette",
        pourquoi:
          "La maniguette, ou graine de paradis, pousse en gousses sur une plante des côtes d'Afrique de l'Ouest. Ses petites graines brunes ont un piquant proche du poivre, avec des touches citronnées et florales. Elle parfume les sauces, les grillades et les bouillons. On l'écrase au mortier et on l'ajoute en fin de cuisson.",
        recettes: [],
      },
      {
        product: "piment-pili-pili",
        pourquoi:
          "Petit, rouge vif et très piquant, le pili-pili, ou piment oiseau, est présent de Dakar à Kinshasa. Séché entier, il garde son parfum fruité et sa force. On le met entier dans le poulet yassa pour une chaleur douce, puis on le retire avant de servir, ou on l'écrase au mortier pour un piquant franc. Pensez à vous laver les mains après l'avoir manipulé.",
        recettes: ["poulet-yassa"],
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
        product: "assaisonnement-jollof",
        pourquoi:
          "Le riz jollof, riz rouge cuit dans une sauce tomate épicée, se dispute entre le Nigeria et le Ghana. Ce mélange prêt à l'emploi réunit les épices et aromates qui lui donnent sa couleur et son parfum, sans multiplier les pots. On l'ajoute à la base tomate-oignon-piment une fois qu'elle a bien réduit, avant le riz et le bouillon.",
        recettes: ["riz-jollof"],
      },
      {
        product: "berbere",
        pourquoi:
          "Le berbéré est le mélange d'épices rouge et relevé de la cuisine éthiopienne : on y trouve le plus souvent du piment, du fenugrec, du gingembre, de l'ail et des épices chaudes. Il parfume et colore les wats servis sur l'injera, et trois recettes du site l'emploient. On le fait d'abord revenir dans le beurre ou l'huile avec les oignons.",
        recettes: ["doro-wat", "misir-wat", "shiro"],
        articles: ["quest-ce-que-le-berbere"],
      },
      {
        product: "poivre-de-selim",
        pourquoi:
          "Le poivre de Selim est l'épice la plus présente dans nos recettes : six plats l'emploient, du poulet yassa au café Touba. Ce sont les longues gousses sombres du Xylopia aethiopica, au parfum résineux, musqué et poivré, appelées djar au Sénégal. On les écrase pour les infuser dans les bouillons, ou on les moud avec le café. Il parfume aussi les soupes et les marinades d'Afrique de l'Ouest et centrale.",
        recettes: ["poulet-yassa", "kelewele", "thiere-mbuum", "liboke-de-poisson", "cafe-touba", "pepper-soup"],
        articles: ["utiliser-poivre-de-selim"],
      },
      {
        product: "essesse-sassas",
        pourquoi:
          "L'essessè est une épice de la cuisine camerounaise, séchée puis réduite en poudre. Elle apporte un parfum boisé, légèrement sucré et fumé. On l'associe au pèbè et au djansang dans les soupes, les bouillons de poisson et les sauces jaunes. Une petite pincée suffit, en début de cuisson.",
        recettes: [],
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
      "Notre sélection de dix céréales, semoules et farines d'Afrique, parmi celles de la boutique. Elles sont classées selon le nombre de recettes du site qui les emploient. À égalité, la plus courante passe devant. N° 1 : Couscous de mil (thiéré), en tête car quatre recettes du site l'emploient, du thiéré mbuum au thiakry, au ngalakh et au dégué.",
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
    slug: "livres-de-recettes-africaines",
    tab: "Livres",
    title: "Top 10 des livres de recettes africaines",
    description:
      "Cuisines des deux Congo, du Sénégal et du Cameroun, Youssou N'Dour, Cheikh Niang : notre top 10 des livres de recettes africaines, selon l'avis des lecteurs.",
    intro: introNote("dix livres de recettes africaines en français", false, {
      qui: "livres",
      suite: "Les images sont des illustrations Keur Cook : chaque édition vendue sur Amazon a sa propre couverture.",
    }),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "livre-dans-ma-cuisine-congolaise",
        pourquoi:
          "Gisèle Mbeku Andjelani partage plus de 70 recettes de la RD Congo, des rives du Kivu à Kinshasa : sombe, madesu, liboke, sambaza, ndazi, mikate. Chacune est accompagnée d'une petite histoire, sur 178 pages. Notre recette de liboké de poisson permet de goûter l'un de ces plats.",
        recettes: ["liboke-de-poisson"],
      },
      {
        product: "livre-afro-vegan",
        pourquoi:
          "Le plus court de notre sélection : 80 pages et 50 recettes afro véganes, salées et sucrées, entrées, plats, desserts et boissons. Chaque recette est expliquée pas à pas et accompagnée d'une photo en couleur. Pour cuisiner africain sans produits d'origine animale.",
        recettes: [],
      },
      {
        product: "livre-cuisine-du-senegal-81-recettes",
        pourquoi:
          "Kaya N'Dor réunit, en 109 pages, 81 recettes traditionnelles du Sénégal, avec des explications pas à pas, des astuces de réussite et des substitutions d'ingrédients. Le livre vise les grands classiques, comme le thiéboudienne, le yassa ou le mafé. Vous trouverez aussi ces trois plats sur notre site, pour comparer les versions.",
        recettes: ["thieboudienne", "poulet-yassa", "mafe"],
      },
      {
        product: "livre-cuisine-d-afrique-et-d-ailleurs",
        pourquoi:
          "Le premier livre de @niangcook reprend les classiques de ses vidéos : des recettes pas à pas, simples et accessibles. Il mêle les saveurs d'Afrique de l'Ouest et d'Afrique centrale à des influences du monde entier. Un livre relié de 144 pages, publié chez Solar.",
        recettes: [],
      },
      {
        product: "livre-grain-d-afrique",
        pourquoi:
          "Aïssatou Mbaye propose plus de 60 recettes du quotidien relevées d'une touche africaine : pancakes à la farine de mil, houmous de niébé et cajou, chips de plantain, madeleines au manioc. Une bonne porte d'entrée pour glisser des saveurs africaines dans les plats de tous les jours. Un broché de 128 pages, publié aux éditions Marie Claire en 2026.",
        recettes: [],
      },
      {
        product: "livre-senegal-cuisine-intime-et-gourmande",
        pourquoi:
          "Le chanteur Youssou N'Dour raconte la cuisine de son enfance à Dakar : le marché, la préparation du repas entre femmes, la famille autour du grand plat commun. Les photographies d'Isabelle Rozenbaum accompagnent ses recettes. Un beau livre de 192 pages, publié aux éditions de La Martinière.",
        recettes: [],
      },
      {
        product: "livre-plats-express-saveurs-d-afrique",
        pourquoi:
          "Cheikh Niang, le cuisinier @niangcook, propose 60 recettes inédites prêtes en 30 minutes maximum, entre goûts d'Afrique et saveurs du monde. Riz à la tomate express, pancakes de plantain ou afro burger : des idées rapides pour se lancer. Un livre de 160 pages publié chez Solar, avec les photos de Laurent Moynat.",
        recettes: [],
      },
      {
        product: "livre-le-meilleur-de-la-cuisine-congolaise",
        pourquoi:
          "Lukusa Jessica présente les plats emblématiques de la cuisine congolaise, de l'accompagnement à la pâtisserie. Chaque recette est accompagnée d'une histoire, d'anecdotes et de conseils de technique, pour les débutants comme pour les cuisiniers aguerris. Un broché de 155 pages, paru en 2025.",
        recettes: [],
      },
      {
        product: "livre-la-cuisine-congolaise",
        pourquoi:
          "Un ouvrage de référence de 216 pages, publié chez L'Harmattan : Fidèle Mialoundama et Isabelle Goma Mouyokani y recensent les recettes les plus courantes de toutes les régions du Congo. Le livre se veut une mémoire des recettes et des aliments traditionnels. Une bonne base pour qui s'intéresse au pays.",
        recettes: [],
      },
      {
        product: "livre-200-recettes-camerounaises",
        pourquoi:
          "Le plus épais de notre sélection : 218 pages et 200 recettes camerounaises, des plats traditionnels des différentes régions du pays aux versions revisitées. Chaque recette est expliquée étape par étape, avec des astuces de préparation. C'est un livre relié, paru en 2026.",
        recettes: [],
      },
    ],
    guide: [
      ["Un pays ou toute l'Afrique : les livres sur le Cameroun, le Sénégal ou les deux Congo vont plus loin dans une cuisine ; les livres de Cheikh Niang ou d'Aïssatou Mbaye mêlent l'Afrique et d'autres saveurs."],
      ["Débutant : préférez les recettes expliquées pas à pas et les plats express ; curieux d'histoire : les livres qui racontent les plats et les familles."],
      ["Avant de commander, regardez sur la fiche Amazon le format (broché ou relié), le nombre de pages et l'éditeur."],
    ],
    faq: [
      {
        question: "Ces livres sont-ils en français ?",
        reponse: ["Oui, les dix livres de cette sélection sont écrits en français."],
      },
      {
        question: "Pourquoi les images ne sont-elles pas les couvertures ?",
        reponse: ["Ce sont des illustrations Keur Cook faites d'après la description de chaque livre. L'édition vendue sur Amazon a sa propre couverture, visible sur la fiche Amazon."],
      },
      {
        question: "Par quelle recette commencer ?",
        reponse: [
          "Par un plat mijoté à base d'ingrédients courants, comme le poulet yassa ou le mafé. Voir ",
          { href: "/conseils/par-quelle-recette-commencer", label: "notre conseil" },
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
      "Rooibos, thés du Kenya, cafés de Tanzanie, du Rwanda, d'Éthiopie et du Burundi, kinkeliba : notre top 10 des thés et cafés d'Afrique.",
    intro: introNote("dix cafés, thés et infusions d'Afrique", false, undefined, "2026-10-24"),
    updated: "2026-10-24",
    rankBy: "note-acheteurs",
    classementLe: "2026-10-24",
    items: [
      {
        product: "rooibos-vert",
        pourquoi:
          "Le rooibos vert vient, comme le rouge, de la région du Cederberg, en Afrique du Sud. Ses feuilles sont séchées sans fermentation : l'infusion est plus claire, avec un goût végétal et légèrement miellé. Il s'infuse dans une eau juste avant l'ébullition et se boit chaud ou glacé, avec un zeste d'orange.",
        recettes: [],
      },
      {
        product: "the-noir-du-kenya-cardamome",
        pourquoi:
          "La cardamome parfume le thé dans toute l'Afrique de l'Est, de Mombasa à Zanzibar. Ce thé noir corsé est déjà aromatisé : il suffit de l'infuser. Préparé en chai, bouilli avec du lait et du sucre, il remplace le thé nature et les gousses de cardamome de notre chai kényan.",
        recettes: ["chai-kenyan"],
      },
      {
        product: "rooibos",
        pourquoi:
          "Le rooibos est un arbuste qui pousse principalement dans la région du Cederberg, en Afrique du Sud. Ses feuilles fermentées puis séchées donnent une infusion rouge ambré, au goût doux et légèrement vanillé. Il se boit à toute heure, chaud avec du lait et du miel, ou glacé au citron comme dans notre recette.",
        recettes: ["rooibos-glace"],
      },
      {
        product: "the-noir-du-kenya",
        pourquoi:
          "Le Kenya est l'un des grands producteurs de thé noir au monde. Ses thés, cultivés sur les hauts plateaux, sont corsés et donnent une infusion très colorée. Au Kenya, il se prépare en chai : bouilli dans un mélange d'eau et de lait, sucré, parfois épicé, puis filtré, comme dans notre recette.",
        recettes: ["chai-kenyan"],
      },
      {
        product: "cafe-de-tanzanie",
        pourquoi:
          "La Tanzanie cultive le café sur les pentes de ses montagnes, notamment autour du Kilimandjaro. Ses cafés sont vifs et équilibrés, avec un goût fruité. En grains, ils se moulent juste avant la préparation et conviennent bien au filtre et à la cafetière à piston.",
        recettes: [],
      },
      {
        product: "cafe-du-rwanda",
        pourquoi:
          "Au Rwanda, le café pousse sur les collines, en altitude, et est cueilli par de petits producteurs. Il offre une tasse douce, fruitée et sucrée. Il donne une version plus ronde de notre kahawa chungu, et se prête à toutes les méthodes, du filtre à l'expresso.",
        recettes: ["kahawa-chungu"],
        articles: ["cafes-ethiopie-kenya-rwanda"],
      },
      {
        product: "cafe-yirgacheffe",
        pourquoi:
          "Yirgacheffe, dans le sud de l'Éthiopie, est l'une des régions de café les plus réputées au monde. Ses cafés lavés offrent une tasse légère, aux notes de fleurs blanches et d'agrumes. C'est le café de notre buna, préparé comme lors de la cérémonie, et deux de nos articles en parlent. À moudre juste avant la préparation.",
        recettes: ["buna-cafe-ethiopien"],
        articles: ["ceremonie-du-cafe-ethiopienne", "cafes-ethiopie-kenya-rwanda"],
      },
      {
        product: "citronnelle-sechee",
        pourquoi:
          "La citronnelle pousse dans de nombreuses cours d'Afrique de l'Ouest. Ses feuilles séchées ont un parfum frais et citronné. On l'infuse seule ou avec du kinkeliba et de la menthe. Elle parfume aussi les bouillons et les marinades de poisson.",
        recettes: [],
      },
      {
        product: "kinkeliba",
        pourquoi:
          "Le kinkeliba est un arbuste du Sahel dont on infuse les feuilles séchées. Il donne une boisson ambrée au goût boisé et légèrement amer. Au Sénégal, on le boit le matin, sucré, avec du pain, et il est très présent au moment du ramadan. Notre recette explique comment le faire frémir puis le filtrer.",
        recettes: ["kinkeliba"],
      },
      {
        product: "cafe-du-burundi",
        pourquoi:
          "Au Burundi, au cœur de l'Afrique des Grands Lacs, le café est cultivé en altitude par de petits producteurs, sur les collines. Il donne une tasse sucrée et fruitée, à l'acidité douce. Il se moud juste avant la préparation et se prête à toutes les méthodes, du filtre à l'expresso.",
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
  {
    slug: "service-et-the",
    tab: "Service et thé",
    title: "Top 10 des ustensiles pour le service et le thé",
    seoTitle: "Top 10 du service et du thé à l'africaine",
    description:
      "Théière et verres pour l'ataya, bouilloire émaillée, saladiers et bols en bois, plateaux : notre top 10 pour servir le repas et le thé à l'africaine.",
    intro: introNote("dix objets pour servir le repas et le thé", false),
    updated: "2026-10-19",
    rankBy: "note-acheteurs",
    classementLe: RELEVE,
    items: [
      {
        product: "plateau-acacia-amazon-basics",
        pourquoi:
          "Un plateau en acacia de 43 × 30 cm à poignées intégrées, pour porter le thé, les beignets ou les petits plats à table. Chaque plateau a son propre motif de veines de bois. On l'essuie avec un chiffon humide, sans le laisser tremper.",
        recettes: ["chai-kenyan", "puff-puff", "akara"],
      },
      {
        product: "verres-a-the-et-soucoupes-pasabahce",
        pourquoi:
          "Six petits verres à thé d'environ 155 ml, au ventre arrondi, et leurs six soucoupes : de quoi servir le thé à six sans marquer la table. La soucoupe permet aussi de tenir le verre chaud. Une autre option pour l'ataya, plus classique.",
        recettes: ["ataya"],
        articles: ["comment-preparer-l-ataya"],
      },
      {
        product: "saladiers-acacia-lot-de-2",
        pourquoi:
          "Deux grands bols individuels en acacia de 20 cm et 760 ml : l'assiette de chacun quand on ne mange pas au plat commun. Ils conviennent au riz, à l'attiéké, aux salades et aux plats en sauce tièdes. On les lave rapidement à la main.",
        recettes: ["injera", "puff-puff", "jus-de-bouye", "jus-de-gingembre"],
      },
      {
        product: "plateau-rond-bambou-40-cm",
        pourquoi:
          "Ce grand plateau rond en bambou de 40 cm accueille la théière et tous les verres de l'ataya, ou les petites tasses du café éthiopien. Ses deux poignées intégrées assurent une prise stable. Il s'essuie avec un chiffon humide.",
        recettes: ["ataya", "buna-cafe-ethiopien"],
      },
      {
        product: "verres-a-the",
        pourquoi:
          "Au Sénégal, l'ataya se sert dans de petits verres facettés. On fait passer le thé d'un verre à l'autre pour former la mousse. Ce lot de six verres de 210 ml accompagne la théière pour les trois services.",
        recettes: ["ataya"],
        articles: ["comment-preparer-l-ataya"],
      },
      {
        product: "bols-noix-de-coco-lot-de-2",
        pourquoi:
          "Deux bols taillés à la main dans des coquilles de noix de coco, polis à l'huile de coco, avec leurs cuillères. Ils conviennent aux fruits, aux salades de fruits et aux desserts comme le thiakry. Ils se lavent à l'eau tiède, sans lave-vaisselle ni micro-ondes.",
        recettes: ["thiakry", "degue"],
      },
      {
        product: "bouilloire-emaillee",
        pourquoi:
          "Les bouilloires émaillées colorées font partie du paysage de nombreuses cuisines africaines. Posée directement sur le feu, celle-ci chauffe l'eau de l'ataya et fait frémir le kinkeliba du matin. Elle contient 2,4 litres.",
        recettes: ["ataya", "kinkeliba"],
      },
      {
        product: "saladier-en-bois",
        pourquoi:
          "Dans beaucoup de cuisines africaines, on partage le repas autour d'un plat commun : ce grand saladier en acacia de 26 cm s'y prête bien. Quatre recettes du site commencent dans un saladier, de la pâte de l'injera à celle des puff-puff. Il met aussi en valeur le thiakry ou l'attiéké.",
        recettes: ["injera", "puff-puff", "jus-de-bouye", "jus-de-gingembre"],
      },
      {
        product: "bols-manguier-lot-de-3",
        pourquoi:
          "Trois bols en bois de manguier sculptés à la main, pour servir les sauces au piment, les arachides grillées ou les desserts. Leurs tailles différentes permettent de présenter plusieurs accompagnements à la fois. On les lave rapidement à la main.",
        recettes: ["kelewele", "alloco", "suya"],
      },
      {
        product: "theiere-a-ataya",
        pourquoi:
          "La théière de l'ataya : en inox, de 1,2 litre, avec une forme ventrue et un long bec qui permet de verser le thé de haut pour former la mousse. Elle se pose directement sur le feu. Notre recette et notre article expliquent comment préparer l'ataya en trois tournées.",
        recettes: ["ataya"],
        articles: ["comment-preparer-l-ataya"],
      },
    ],
    guide: [
      [
        "Pour l'ataya, il faut une théière en métal qui va sur le feu et de petits verres pour faire mousser le thé. Voir ",
        { href: "/conseils/comment-preparer-l-ataya", label: "comment préparer l'ataya" },
        ".",
      ],
      ["Pour le plat commun, un grand saladier ; pour servir chacun, des bols individuels en bois."],
      ["Le bois et la noix de coco se lavent à la main et se sèchent bien ; évitez les liquides très chauds."],
    ],
    faq: [
      {
        question: "Comment se prépare l'ataya ?",
        reponse: [
          "On fait bouillir du thé vert avec du sucre dans une théière en métal, on le fait mousser en le versant de haut d'un verre à l'autre, puis on le sert en trois tournées. Voir ",
          { href: "/conseils/comment-preparer-l-ataya", label: "notre article" },
          ".",
        ],
      },
      {
        question: "Peut-on mettre ces bols en bois au lave-vaisselle ?",
        reponse: ["Non : le bois, le bambou et la noix de coco se lavent rapidement à la main, puis se sèchent bien."],
      },
      {
        question: "Quelle bouilloire pour le kinkeliba ?",
        reponse: ["Une bouilloire qui va sur le feu, comme la bouilloire émaillée de cette sélection : on y fait frémir les feuilles quelques minutes avant de filtrer."],
      },
    ],
  },
];

/** Les onglets classés selon la note des acheteurs nomment leur n° 1 à la fin de l'introduction. */
export const demoTop10: Top10[] = tops.map((t) => {
  if (t.rankBy !== "note-acheteurs") return t;
  const first = demoProducts.find((p) => p.slug === t.items[0].product);
  return first ? { ...t, intro: `${t.intro} N° 1 : ${first.name}.` } : t;
});
