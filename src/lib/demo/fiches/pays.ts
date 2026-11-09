/**
 * Fiches détaillées des pays (section « La cuisine du … en détail » des pages /pays/…, 16 pays).
 * Règles de rédaction : docs/FICHES.md. Ne pas répéter le texte de src/lib/country-cuisine.ts.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Pays de ce fichier :
 *   - senegal — Sénégal
 *   - mali — Mali
 *   - burkina-faso — Burkina Faso
 *   - cote-d-ivoire — Côte d'Ivoire
 *   - ghana — Ghana
 *   - nigeria — Nigeria
 *   - cameroun — Cameroun
 *   - gabon — Gabon
 *   - rd-congo — RD Congo
 *   - ethiopie — Éthiopie
 *   - congo — Congo
 *   - ouganda — Ouganda
 *   - kenya — Kenya
 *   - tanzanie — Tanzanie
 *   - madagascar — Madagascar
 *   - afrique-du-sud — Afrique du Sud
 */
import type { CountryDetail } from "../../types";

export const SLUGS = [
  "senegal",
  "mali",
  "burkina-faso",
  "cote-d-ivoire",
  "ghana",
  "nigeria",
  "cameroun",
  "gabon",
  "rd-congo",
  "ethiopie",
  "congo",
  "ouganda",
  "kenya",
  "tanzanie",
  "madagascar",
  "afrique-du-sud",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], CountryDetail>> = {
  // Fiche modèle (pays) : à prendre comme exemple pour la forme, jamais pour recopier des phrases.
  cameroun: {
    histoire:
      "Du lac Tchad, au nord, jusqu'aux plages de Kribi, au sud, le Cameroun traverse presque tous les paysages d'Afrique : savanes sèches, hauts plateaux volcaniques, forêt dense et mangroves du littoral. Plus de deux cent cinquante peuples y vivent, et le pays a deux langues officielles, le français et l'anglais, héritage du partage du territoire entre la France et le Royaume-Uni après la Première Guerre mondiale.\n\nCette diversité se lit dans l'assiette. Le Nord, plus sec, mange des céréales comme le mil et le sorgho, du bœuf et du lait. Le Sud forestier vit du manioc, du plantain, des feuilles sauvages et du poisson. Les échanges anciens avec les commerçants européens ont apporté le maïs, l'arachide et le manioc, venus d'Amérique, qui sont devenus en quelques siècles des piliers de la cuisine locale.",
    regions:
      "Chaque région défend ses plats. À Douala et sur la côte du Littoral, le poisson et les crevettes dominent. Dans le Centre, autour de Yaoundé, on cuisine l'okok, des feuilles de Gnetum coupées très fin et mijotées avec de l'arachide ; c'est la même plante qui donne l'eru du Sud-Ouest anglophone. Les hauts plateaux de l'Ouest et du Nord-Ouest sont le pays du taro, servi à la sauce jaune, et du café arabica du pays Bamoun. Dans le Sud et l'Est forestiers, l'amande de la mangue sauvage, grillée puis broyée, sert à épaissir les sauces.",
    produits:
      "Pour cuisiner camerounais en France, quelques produits suffisent à commencer. Les [feuilles de ndolé séchées](/produit/feuilles-de-ndole) se réhydratent et se lavent avant cuisson. Le [poivre blanc de Penja](/produit/poivre-de-penja) se moud au moment de servir. Trois épices donnent leur caractère aux bouillons et aux grillades : le [pèbè moulu](/produit/pebe-moulu), muscade africaine, l'[essessè](/produit/essesse-sassas), boisé et légèrement sucré, et le [djansang](/produit/akpi-djansang), qui lie les sauces avec son goût de noisette.\n\nOn y ajoute l'[huile de palme rouge](/produit/huile-de-palme-rouge) pour le koki, les [crevettes séchées](/produit/crevettes-sechees) pour l'eru et le ndolé, et les [feuilles de bananier](/produit/feuilles-de-bananier-fraiches) pour cuire à la vapeur. Côté boisson, le [café du pays Bamoun](/produit/cafe-du-cameroun) se trouve en grains, et le [café vert du Cameroun](/produit/cafe-vert-du-cameroun) se torréfie à la maison.",
    table:
      "Le repas camerounais s'organise autour d'un plat en sauce et de son accompagnement : bâtons de manioc enveloppés dans des feuilles, plantain bouilli ou frit, macabo, riz ou couscous de maïs dans le Nord. Dans la rue, on grignote le soya, de fines brochettes de bœuf saupoudrées d'épices et de piment, proche du suya nigérian. Le matin, beaucoup de Camerounais prennent des beignets, des haricots et de la bouillie, un trio si courant qu'on l'appelle simplement « BHB ». Le poisson braisé se déguste le soir dans les quartiers animés, avec des bâtons de manioc ou du plantain, et l'on se rafraîchit avec le jus de foléré, nom local du [bissap](/produit/fleurs-de-bissap).",
    commencer:
      "Pour un premier repas, le [koki](/recette/koki) est une bonne entrée en matière : peu d'ingrédients, une cuisson longue mais simple. Le [poulet DG](/recette/poulet-dg) plaît à tout le monde grâce à ses plantains mûrs. Quand vous serez à l'aise, passez au [ndolé aux crevettes](/recette/ndole), puis à l'[eru](/recette/eru) et au [mbongo tchobi](/recette/mbongo-tchobi), plus originaux. Avant de préparer le ndolé, lisez [Comment enlever l'amertume du ndolé ?](/conseils/enlever-amertume-du-ndole) et, si les feuilles vous manquent, [Par quoi remplacer les feuilles de ndolé ?](/conseils/par-quoi-remplacer-les-feuilles-de-ndole).",
    faq: [
      {
        question: "Pourquoi appelle-t-on le Cameroun « l'Afrique en miniature » ?",
        reponse:
          "Parce qu'on y trouve, sur un seul territoire, le Sahel aride, la savane, la montagne, la forêt tropicale et la mer, ainsi qu'une très grande variété de peuples et de langues. Sa cuisine reflète ce mélange.",
      },
      {
        question: "Quelle différence entre l'eru et l'okok ?",
        reponse:
          "Les deux plats utilisent les feuilles du même arbuste grimpant, le Gnetum. L'[eru](/recette/eru) du Sud-Ouest se cuisine à l'huile de palme avec des feuilles de waterleaf, tandis que l'okok du Centre est mijoté avec de l'arachide.",
      },
    ],
  },

  senegal: {
    histoire:
      "Le Sénégal occupe la pointe la plus occidentale du continent : la presqu'île du Cap-Vert, où s'étend Dakar, avance dans l'Atlantique. Le fleuve Sénégal marque la frontière nord avec la Mauritanie, tandis que la Casamance, au sud, est séparée du reste du pays par la Gambie. Le wolof est la langue la plus parlée, à côté du français, langue officielle, du pulaar, du sérère et du diola.\n\nSaint-Louis fut la capitale de l'Afrique-Occidentale française jusqu'à ce que Dakar la remplace au début du XXe siècle. À l'époque coloniale, le riz brisé importé d'Asie s'est installé dans les cuisines des villes et ne les a plus quittées. Les Sénégalais résument leur sens de l'accueil d'un mot, la teranga : on ne laisse pas repartir un visiteur sans l'avoir invité à partager le plat.",
    regions:
      "La tradition situe à Saint-Louis la naissance du thiéboudienne, et la ville cuisine le poisson pêché à l'embouchure du fleuve. Le Sine-Saloum, pays sérère, est connu pour ses coquillages et ses greniers de mil. En Casamance, région humide de rizières et de palmiers, la cuisine diola fait une large place à l'huile de palme, aux huîtres de la mangrove et à la soupe kandia, sauce au gombo très appréciée dans le sud. Dans l'est et le Fouta, plus secs, le lait caillé et les bouillies de mil accompagnent la vie des éleveurs peuls.",
    produits:
      "Quelques produits suffisent pour retrouver les saveurs sénégalaises loin de Dakar. Le [soumbala](/produit/soumbala), que les Wolofs appellent nététou, apporte sa note fermentée aux sauces. Le [couscous de mil](/produit/couscous-de-mil) sert de base au thiéré et au thiakry. Les [fleurs de bissap](/produit/fleurs-de-bissap), la [poudre de baobab](/produit/poudre-de-baobab) et l'[infusion de tamarin](/produit/infusion-de-tamarin), le dakhar, donnent les boissons fraîches servies dans les familles.\n\nPour les boissons chaudes, le [poivre de Selim](/produit/poivre-de-selim) parfume le café Touba, les [feuilles de kinkeliba](/produit/kinkeliba) s'infusent le matin, et le [thé vert gunpowder](/produit/the-vert-gunpowder) se verse avec une [théière à ataya](/produit/theiere-a-ataya) dans de petits [verres à thé](/produit/verres-a-the). Deux livres prolongent la découverte : [Sénégal, cuisine intime et gourmande](/produit/livre-senegal-cuisine-intime-et-gourmande) et [Cuisine du Sénégal, 81 recettes traditionnelles](/produit/livre-cuisine-du-senegal-81-recettes).",
    table:
      "Le repas de midi est le plus important de la journée. On le partage autour d'un grand plat posé sur une natte, chacun mangeant dans la portion qui se trouve devant lui, à la cuillère ou de la main droite. Le dîner est souvent plus léger : thiéré au lait caillé, restes du midi ou bouillie. La Tabaski, où chaque famille sacrifie un mouton, et la Korité, qui clôt le ramadan, rassemblent toute la parenté. Dans la rue, on trouve des fatayas, chaussons frits farcis au poisson ou à la viande, et des dibiteries où l'on grille l'agneau.",
    commencer:
      "Le [poulet yassa](/recette/poulet-yassa) est le plat idéal pour débuter : préparez la marinade la veille, comme l'explique [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa). Le [caldou](/recette/caldou), poisson au citron, demande peu de temps. Vient ensuite le [thiéboudienne](/recette/thieboudienne), plus long, avec l'aide de [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne) et de [Le guedj, quel est ce poisson séché ?](/conseils/quest-ce-que-le-guedj). En dessert, le [thiakry](/recette/thiakry), puis un [jus de bissap](/recette/jus-de-bissap) ou un [ataya](/recette/ataya), détaillé dans [Comment préparer l'ataya ?](/conseils/comment-preparer-l-ataya).",
    faq: [
      {
        question: "Que veut dire « teranga » ?",
        reponse:
          "C'est le mot wolof pour l'hospitalité. Au Sénégal, il désigne l'habitude d'accueillir chaleureusement le visiteur et de lui proposer de manger avec la famille, même à l'improviste.",
      },
      {
        question: "Qu'est-ce que le café Touba ?",
        reponse:
          "Un café parfumé au poivre de Selim, lié à la ville sainte de Touba et à la confrérie mouride fondée par Cheikh Ahmadou Bamba. L'article [Qu'est-ce que le café Touba ?](/conseils/quest-ce-que-le-cafe-touba) explique comment le préparer.",
      },
    ],
  },

  mali: {
    histoire:
      "Le Mali est un vaste pays sans accès à la mer, dont le nord appartient au Sahara et le sud aux savanes. Le fleuve Niger le traverse en dessinant une grande boucle et forme, en amont de Tombouctou, un delta intérieur inondé chaque année. Sur ces terres se sont succédé de grands empires : l'empire du Mali, fondé au XIIIe siècle par Soundiata Keïta, puis l'empire songhaï. Le pèlerinage de Mansa Moussa à La Mecque, en 1324, est resté célèbre pour l'or qu'il emporta.\n\nBambaras, Peuls, Soninkés, Songhaïs, Dogons, Touaregs et pêcheurs bozos se partagent le pays. Chacun a apporté ses habitudes : céréales des cultivateurs, lait des éleveurs, poisson des gens du fleuve.",
    regions:
      "Autour de Ségou, les terres irriguées de l'Office du Niger produisent une grande partie du riz du pays. Mopti, au confluent du Niger et du Bani, est la ville du poisson, frais, séché ou fumé. Sur le plateau de Bandiagara, les Dogons cultivent l'oignon et l'échalote dans de petits jardins arrosés à la main ; l'échalote pilée et séchée en boules sert de condiment dans tout le pays. Au nord, chez les Touaregs, le lait, la viande et le thé dominent la table, tandis que Bamako et le sud mangent surtout le tô et le riz en sauce.",
    produits:
      "Le [soumbala](/produit/soumbala) est le premier condiment malien : on l'écrase dans la sauce en début de cuisson. La [pâte d'arachide](/produit/pate-d-arachide) fait le tigadèguèna, et le [gombo séché en poudre](/produit/gombo-seche) lie les sauces qui accompagnent le tô. Le [fonio](/produit/fonio), cultivé depuis des siècles dans le pays, cuit en quelques minutes, tout comme le [couscous de mil](/produit/couscous-de-mil). La [poudre de baobab](/produit/poudre-de-baobab) donne une boisson acidulée.\n\nLes [fleurs de bissap](/produit/fleurs-de-bissap) font le dabileni, et l'[infusion de gingembre](/produit/infusion-de-gingembre) évoque le jus de gingembre des fêtes. Le [thé vert gunpowder](/produit/the-vert-gunpowder) se boit dans de petits [verres à thé](/produit/verres-a-the), et un [mortier en bois](/produit/mortier-et-pilon-en-bois) reste l'outil de base pour piler épices et arachides.",
    table:
      "On mange en famille autour d'un grand plat, après s'être lavé les mains. Le matin, on prend une bouillie de mil ou de riz, parfois du lait caillé. Le riz au gras, cuit dans un bouillon de viande et de légumes, est servi lors des baptêmes et des mariages. Dans les rues, les femmes vendent des beignets de mil ou de haricots, chauds et croustillants. La Tabaski, que les Maliens appellent Seli ba, la grande fête, est l'occasion de partager le mouton avec les voisins et les proches.",
    commencer:
      "Le [mafé](/recette/mafe) est le meilleur point de départ : avant de le cuisiner, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide) et [Combien de temps se garde la pâte d'arachide ouverte ?](/conseils/combien-de-temps-se-garde-la-pate-d-arachide). La cuisine malienne partage beaucoup avec celle de ses voisins : le [tô sauce gombo](/recette/to-sauce-gombo), le [fonio aux légumes](/recette/fonio-aux-legumes) et le [dégué](/recette/degue) se retrouvent aussi sur les tables de Bamako. Pour le condiment, [Qu'est-ce que le soumbala ?](/conseils/quest-ce-que-le-soumbala) et [Par quoi remplacer le soumbala ?](/conseils/par-quoi-remplacer-le-soumbala) répondent aux questions courantes.",
    faq: [
      {
        question: "Pourquoi le fonio compte-t-il autant au Mali ?",
        reponse:
          "C'est l'une des plus anciennes céréales cultivées d'Afrique de l'Ouest. Il pousse sur des sols pauvres, mûrit vite et se garde bien, ce qui en fait une ressource précieuse au Sahel. Pour le cuire, voyez [Qu'est-ce que le fonio ?](/conseils/quest-ce-que-le-fonio).",
      },
      {
        question: "Le thé malien ressemble-t-il à l'ataya sénégalais ?",
        reponse:
          "Le principe est proche : du thé vert gunpowder, beaucoup de sucre, parfois de la menthe, et trois verres successifs. Les noms et les petites habitudes changent d'un pays à l'autre, mais la lenteur du service est partout la même.",
      },
    ],
  },

  "burkina-faso": {
    histoire:
      "Pays enclavé au cœur de l'Afrique de l'Ouest, le Burkina Faso s'appelait Haute-Volta jusqu'en 1984, quand le gouvernement de Thomas Sankara lui donna son nom actuel. Ouagadougou, la capitale, était déjà le siège du royaume mossi, dont le souverain porte le titre de Mogho Naba. Les Mossis forment le peuple le plus nombreux, à côté des Peuls, des Gourmantchés, des Bobos, des Gourounsis ou des Lobis.\n\nLes trois Volta, Noire, Blanche et Rouge, traversent un pays de savanes où la saison des pluies ne dure que quelques mois. La cuisine s'est construite sur ce que la terre donne malgré la sécheresse : mil, sorgho, maïs, arachide, niébé, et les arbres de la savane, karité, néré et baobab.",
    regions:
      "Le plateau central, pays mossi, mange le tô de sorgho ou de maïs avec des sauces aux feuilles. L'ouest, autour de Bobo-Dioulasso, plus arrosé, cultive le riz de la vallée du Kou, les mangues et l'igname. Au nord, dans le Sahel, les éleveurs peuls vivent du lait, du beurre et de la viande. Partout, le beurre de karité sert de matière grasse pour la cuisine, et le dolo, une bière de sorgho rouge brassée par les femmes, se boit les jours de marché et de fête.",
    produits:
      "Le [soumbala](/produit/soumbala) est la signature du pays : on le délaye directement dans la sauce qui mijote. Le [gombo séché en poudre](/produit/gombo-seche) donne la sauce filante du tô, et les [feuilles de moringa séchées](/produit/feuilles-de-moringa) entrent dans les sauces vertes. Le [fonio](/produit/fonio) et le [couscous de mil](/produit/couscous-de-mil) se cuisent à la vapeur.\n\nCôté boissons, l'[infusion de tamarin](/produit/infusion-de-tamarin) et l'[infusion de gingembre](/produit/infusion-de-gingembre) rappellent les saveurs du zoom-koom, et les [fleurs de bissap](/produit/fleurs-de-bissap) font le jus rouge vendu en sachets dans la rue. La [pâte d'arachide](/produit/pate-d-arachide) sert pour la sauce arachide, et la [poudre de baobab](/produit/poudre-de-baobab) pour le jus de pain de singe.",
    table:
      "La journée commence souvent par une bouillie de mil, parfois acidulée au tamarin. À midi et le soir, le tô revient, accompagné d'une sauce qui suit les saisons : feuilles fraîches pendant les pluies, feuilles séchées et gombo en poudre pendant la saison sèche. Le riz gras réunit les familles pour les fêtes. Dans les maquis de Ouagadougou, on commande du poulet grillé, du porc au four ou du poisson braisé. Le Festival panafricain du cinéma de Ouagadougou, le Fespaco, remplit tous les deux ans les terrasses de la ville.",
    commencer:
      "Le [tô sauce gombo](/recette/to-sauce-gombo) est le plat le plus représentatif : pour obtenir une sauce qui file, suivez [Comment réussir une sauce gombo qui file ?](/conseils/sauce-gombo-qui-file), et si le légume vous manque, [Par quoi remplacer le gombo ?](/conseils/par-quoi-remplacer-le-gombo). Le [fonio aux légumes](/recette/fonio-aux-legumes) est rapide ; [Faut-il un couscoussier pour cuire le fonio ou l'attiéké ?](/conseils/couscoussier-fonio-attieke) vous dira si votre matériel suffit. Terminez par le [dégué](/recette/degue), dessert de mil au lait caillé, et lisez [Qu'est-ce que le soumbala ?](/conseils/quest-ce-que-le-soumbala) avant de vous lancer dans les sauces.",
    faq: [
      {
        question: "Que signifie le nom Burkina Faso ?",
        reponse:
          "Il associe deux langues du pays : « burkina » désigne en mooré les hommes intègres, et « faso » veut dire en dioula la patrie. On le traduit donc par pays des hommes intègres.",
      },
      {
        question: "Le beurre de karité se mange-t-il ?",
        reponse:
          "Oui. Au Burkina Faso et dans toute la savane, le beurre tiré des amandes du karité sert de graisse de cuisson, pour les sauces comme pour les fritures. En France, il est surtout vendu pour la peau : vérifiez qu'il est bien alimentaire avant de le cuisiner.",
      },
    ],
  },

  "cote-d-ivoire": {
    histoire:
      "La Côte d'Ivoire s'étend du golfe de Guinée, bordé de lagunes, jusqu'aux savanes du nord. Abidjan, sa plus grande ville, a grandi au bord de la lagune Ébrié. Le pays compte une soixantaine de peuples, que l'on regroupe en quatre grandes familles : Akan à l'est et au centre, Krou à l'ouest, Mandé au nord-ouest et Voltaïques au nord-est.\n\nLa Côte d'Ivoire est le premier producteur mondial de cacao, mais sa cuisine du quotidien repose sur d'autres cultures : le manioc, l'igname, la banane plantain et le riz. Depuis l'indépendance, en 1960, Abidjan attire des habitants de toute la région, et sa cuisine de rue mélange volontiers les habitudes des pays voisins.",
    regions:
      "Les peuples lagunaires du sud, comme les Ébriés et les Adjoukrous de la région de Dabou, sont les maîtres de l'attiéké, préparé à partir de manioc râpé et fermenté. Au centre, en pays baoulé, l'igname règne : on la pile en foutou et l'on prépare le kedjenou. L'ouest forestier, pays krou et bété, cuisine les sauces à la graine de palme et aux feuilles. Au nord, chez les Sénoufos et les Malinkés, on retrouve le tô, le soumbala et le riz, comme au Mali et au Burkina voisins.",
    produits:
      "L'[attiéké déshydraté](/produit/attieke-sec) se réhydrate en quelques minutes à la vapeur. La [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) évite de piler les graines comme au village pour la sauce graine, et l'[huile de palme rouge](/produit/huile-de-palme-rouge) colore la sauce feuilles. L'[akpi](/produit/akpi-djansang), petite graine qu'on grille puis qu'on écrase, épaissit les sauces, et la [maniguette](/produit/maniguette) apporte une chaleur poivrée.\n\nLe [gombo séché en poudre](/produit/gombo-seche) sert pour la sauce gombo, le [piment oiseau](/produit/piment-pili-pili) se pose entier dans le bouillon pour parfumer sans brûler, et les [chips de plantain](/produit/chips-de-plantain) se grignotent à toute heure. L'[infusion de gingembre](/produit/infusion-de-gingembre) retrouve le goût vif du gnamankoudji.",
    table:
      "Le matin, on mange souvent de la bouillie de mil ou de maïs, des beignets ou du pain garni. Dans le sud, le placali, pâte de manioc fermenté, accompagne la sauce gombo. Les maquis d'Abidjan restent ouverts tard, et le poisson braisé arrive avec une montagne d'attiéké, de tomates et d'oignons. Les garbadrômes, petites cantines spécialisées dans le garba, nourrissent étudiants et travailleurs. On boit du bangui, le vin de palme, dans le sud, et du tchapalo, une bière de mil, dans le nord.",
    commencer:
      "L'[alloco](/recette/alloco) et le [garba](/recette/garba) se préparent vite et donnent tout de suite le goût d'Abidjan. Le [poisson braisé à l'attiéké](/recette/poisson-braise-attieke) demande un bon gril ; pour la semoule, lisez [Comment réussir un attiéké maison ?](/conseils/reussir-attieke-maison) et [Quelle différence entre gari, attiéké et tapioca ?](/conseils/difference-gari-attieke-tapioca). Le [kedjenou](/recette/kedjenou) mijote seul dans sa cocotte. Quand vous serez prêt, tentez la [sauce graine](/recette/sauce-graine), et servez un [jus de gingembre](/recette/jus-de-gingembre) préparé avec [Comment faire un jus de gingembre maison ?](/conseils/faire-un-jus-de-gingembre-maison).",
    faq: [
      {
        question: "Attiéké et couscous, est-ce la même chose ?",
        reponse:
          "Non. Le couscous est une semoule de blé dur ou de mil, alors que l'attiéké est fait de manioc râpé, fermenté puis cuit à la vapeur. Il a un goût légèrement acidulé et se mange surtout avec du poisson.",
      },
      {
        question: "Pourquoi Abidjan n'est-elle pas la capitale ?",
        reponse:
          "Abidjan reste la capitale économique et la plus grande ville, mais le président Félix Houphouët-Boigny a fait de Yamoussoukro, sa ville natale, la capitale politique en 1983.",
      },
    ],
  },

  ghana: {
    histoire:
      "Ancienne Gold Coast britannique, le Ghana est devenu indépendant le 6 mars 1957, sous la conduite de Kwame Nkrumah : c'était le premier pays d'Afrique de l'Ouest à se libérer de la colonisation. Il a pris le nom d'un empire médiéval situé bien plus au nord. Le lac Volta, créé par le barrage d'Akosombo, est l'un des plus grands lacs artificiels du monde.\n\nLes Akans, dont les Ashantis et les Fantis, forment le groupe le plus nombreux, à côté des Éwés à l'est, des Gas autour d'Accra et des peuples du nord comme les Dagombas. L'anglais est la langue officielle, mais le twi s'entend partout sur les marchés. Le pays est aussi le deuxième producteur mondial de cacao, derrière la Côte d'Ivoire.",
    regions:
      "Dans la région ashanti, autour de Kumasi, le fufu se mange avec la soupe de noix de palme, l'abenkwan. Sur la côte, les Gas enveloppent leur kenkey dans des feuilles de maïs, alors que les Fantis utilisent des feuilles de bananier. À l'est, les Éwés servent l'akple, une pâte de maïs, avec une sauce au gombo. Le nord, plus sec, mange le tuo zaafi, pâte de maïs ou de mil servie avec une soupe de feuilles, et récolte l'essentiel du karité du pays.",
    produits:
      "Les [feuilles de sorgho rouge](/produit/feuilles-de-sorgho) donnent au waakye sa couleur, et la [base de soupe de noix de palme](/produit/base-soupe-noix-de-palme) permet de préparer l'abenkwan sans piler les graines. L'[assaisonnement jollof](/produit/assaisonnement-jollof) et le [gari jaune](/produit/gari-jaune), qu'on mange trempé dans l'eau sucrée ou avec des haricots, sont incontournables. La [farine de manioc pour foufou](/produit/farine-de-foufou) remplace le long pilage au mortier.\n\nLa [pâte d'arachide](/produit/pate-d-arachide) sert à la groundnut soup, les [crevettes séchées](/produit/crevettes-sechees) entrent dans le shito, et les [chips de plantain](/produit/chips-de-plantain) se vendent aux carrefours d'Accra, dans des sachets que les marchands portent sur la tête.",
    table:
      "Les chop bars, petits restaurants populaires, servent fufu, banku et riz à toute heure. Le red red, des haricots à l'huile de palme rouge accompagnés de plantain frit, est l'un des repas les plus appréciés du midi. On se rafraîchit avec le sobolo, boisson d'hibiscus, et l'on mange de la main droite, après s'être lavé les mains dans un bol d'eau. Les funérailles, grands moments de la vie sociale ghanéenne, rassemblent des centaines d'invités autour de marmites de riz et de ragoût.",
    commencer:
      "Le [kelewele](/recette/kelewele) se prépare rapidement avec des plantains bien mûrs. Le [waakye](/recette/waakye) demande des feuilles de sorgho que l'on garde au sec, comme l'explique [Comment conserver les feuilles séchées ?](/conseils/conserver-feuilles-sechees). La [groundnut soup](/recette/groundnut-soup) profite des astuces de [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide). Pour le [fufu et sa light soup](/recette/fufu-light-soup), suivez [Comment préparer un foufou sans grumeaux ?](/conseils/foufou-sans-grumeaux), puis comparez votre [riz jollof](/recette/riz-jollof) à la version nigériane.",
    faq: [
      {
        question: "Quelle différence entre banku et kenkey ?",
        reponse:
          "Les deux sont faits de pâte de maïs fermentée. Le banku, souvent mélangé à du manioc, cuit dans une marmite qu'on remue sans cesse et se sert chaud. Le kenkey est en partie cuit, enveloppé dans des feuilles puis bouilli, ce qui le rend plus ferme et plus acide.",
      },
      {
        question: "Qu'est-ce que le shito ?",
        reponse:
          "Une sauce noire au piment, cuite longuement dans l'huile avec du poisson ou des crevettes séchées, de l'oignon et du gingembre. On la garde au réfrigérateur et on en pose une cuillerée à côté du kenkey, du riz ou des œufs.",
      },
    ],
  },

  nigeria: {
    histoire:
      "Avec plus de deux cents millions d'habitants, le Nigeria est une fédération de trente-six États, dont la capitale est Abuja depuis 1991, même si Lagos reste la plus grande ville. Le Niger et la Bénoué se rejoignent à Lokoja, au centre du pays, et partagent le territoire en trois grandes régions. Le pays est indépendant depuis 1960.\n\nOn y recense plus de deux cent cinquante peuples. Le Nord, sahélien et majoritairement musulman, a hérité des anciens émirats haoussas et peuls ; le Sud-Ouest est le pays yoruba ; le Sud-Est, igbo, est tourné vers la forêt et le delta du Niger. Le manioc, l'huile de palme et l'igname, dont le Nigeria est de loin le premier producteur mondial, nourrissent la plus grande partie de la population.",
    regions:
      "Chez les Yorubas, l'amala de farine d'igname se mange avec l'ewedu, une soupe gluante de feuilles de corète, et le gbegiri, un velouté de haricots. Le Sud-Est igbo cuisine l'ofe onugbu, soupe aux feuilles amères, et l'oha. Dans la région de Calabar, les Efiks préparent l'edikang ikong, riche en légumes-feuilles, et l'afang. Le Nord haoussa sert le tuwo shinkafa, pâte de riz, avec la miyan kuka, soupe aux feuilles de baobab, et sèche la viande en fines lanières épicées, le kilishi. Dans le delta du Niger, la banga soup se prépare avec le jus de la noix de palme.",
    produits:
      "L'[egusi moulu](/produit/graines-d-egusi) est indispensable pour la soupe du même nom. La [farine d'igname](/produit/farine-d-igname) donne l'amala, le [gari jaune](/produit/gari-jaune) l'eba, et la [farine de manioc pour foufou](/produit/farine-de-foufou) une autre de ces pâtes qu'on appelle swallows. L'[assaisonnement jollof](/produit/assaisonnement-jollof) facilite le riz des fêtes, et le [poivre de Selim](/produit/poivre-de-selim), appelé uda en igbo, parfume la pepper soup.\n\nL'[huile de palme rouge](/produit/huile-de-palme-rouge), la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) et les [crevettes séchées](/produit/crevettes-sechees) forment le socle des soupes du Sud. Le [piment oiseau](/produit/piment-pili-pili) se dose avec prudence, et la [poudre de baobab](/produit/poudre-de-baobab) rappelle les saveurs acidulées du Nord.",
    table:
      "Le mot swallow désigne toutes les pâtes qu'on avale sans les mâcher, après les avoir trempées dans la soupe : eba, amala, igname pilée ou fufu. Le petit-déjeuner peut associer des akara à une bouillie de maïs fermenté, l'ogi, qu'on appelle aussi pap. Dans les rues, on achète du boli, plantain grillé, et des chin chin, petits biscuits frits et croquants. Les grandes fêtes yorubas, les owambe, réunissent des centaines d'invités autour du riz jollof, du plantain frit et de la viande. On boit le zobo, boisson d'hibiscus, et le kunu, à base de mil, dans le Nord.",
    commencer:
      "Le [riz jollof](/recette/riz-jollof) est la porte d'entrée naturelle. Les [akara](/recette/akara) et les [puff-puff](/recette/puff-puff) plaisent aux enfants. Pour le [suya](/recette/suya), préparez votre épice grâce à [Qu'est-ce que le yaji ?](/conseils/quest-ce-que-le-yaji) et faites griller la viande avec [Comment faire griller des brochettes façon suya au four ?](/conseils/griller-des-brochettes-suya-au-four). La [soupe egusi](/recette/soupe-egusi) se sert avec un foufou bien lisse ; si les graines manquent, lisez [Par quoi remplacer l'egusi ?](/conseils/par-quoi-remplacer-l-egusi). Terminez par la [pepper soup](/recette/pepper-soup) et [Comment utiliser le poivre de Selim ?](/conseils/utiliser-poivre-de-selim).",
    faq: [
      {
        question: "Pourquoi le Ghana et le Nigeria se disputent-ils le jollof ?",
        reponse:
          "C'est une rivalité amicale, entretenue sur les réseaux sociaux et lors de concours. Chaque pays défend sa version : riz étuvé à grain long au Nigeria, souvent avec une note fumée, riz parfumé plus fréquent au Ghana.",
      },
      {
        question: "Que désigne le mot « egusi » ?",
        reponse:
          "Il désigne les graines de certaines courges et pastèques africaines, séchées puis moulues. Elles épaississent la soupe et lui donnent un goût proche de la noisette.",
      },
    ],
  },

  gabon: {
    histoire:
      "Traversé par l'équateur, le Gabon est l'un des pays les plus boisés du monde : la forêt couvre plus de 85 % de son territoire. Le fleuve Ogooué le parcourt d'est en ouest avant de se jeter dans l'Atlantique près de Port-Gentil, ville du pétrole. Libreville, la capitale, fut fondée en 1849 par des esclaves libérés, d'où son nom.\n\nLe pays, indépendant depuis 1960, compte une quarantaine de peuples, dont les Fangs, les plus nombreux, les Punus, les Nzébis et les Myènès. Les peuples pygmées, comme les Babongos et les Bakas, connaissent mieux que quiconque les ressources de la forêt. En 2002, le Gabon a créé treize parcs nationaux, qui protègent éléphants de forêt, gorilles et mandrills.",
    produits:
      "La [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) est la base du nyembwe ; un peu d'[huile de palme rouge](/produit/huile-de-palme-rouge) rappelle son goût quand le temps manque. Les [feuilles de manioc pilées](/produit/feuilles-de-manioc) se cuisent longuement avec du poisson fumé. La [chikwangue](/produit/chikwangue), que les Gabonais appellent bâton de manioc, et la [farine de manioc pour foufou](/produit/farine-de-foufou) accompagnent les sauces.\n\nLes [feuilles de bananier fraîches](/produit/feuilles-de-bananier-fraiches) servent à envelopper poissons et viandes pour les cuire à l'étouffée, comme pour le liboké des voisins congolais. Les [crevettes séchées](/produit/crevettes-sechees) enrichissent les bouillons de la côte, et les [chips de plantain](/produit/chips-de-plantain) rappellent la banane frite des marchés de Libreville.",
    table:
      "Le repas s'organise autour d'une sauce et d'un féculent : manioc, banane plantain, taro ou riz. En saison, on mange l'atanga, le fruit du safoutier, ramolli dans l'eau chaude ou passé quelques minutes sur la braise, avec du pain ou du manioc. Le poisson d'eau douce, frais ou fumé, est la protéine la plus courante loin de la côte. On partage volontiers le plat avec les voisins et la famille élargie, et le vin de palme accompagne les fêtes de village.",
    commencer:
      "Le [poulet nyembwe](/recette/poulet-nyembwe) est le plat à découvrir en premier, avec du riz blanc. Le [poulet à l'odika](/recette/poulet-odika) demande de trouver la pâte de mangue sauvage, mais il fait comprendre ce que la cuisine gabonaise a d'unique. Les plats des pays voisins utilisent les mêmes produits : le [liboké de poisson](/recette/liboke-de-poisson), le [pondu](/recette/pondu) ou la [moambé](/recette/moambe). Pour choisir votre huile, lisez [Quelle différence entre huile de palme rouge et raffinée ?](/conseils/huile-de-palme-rouge-ou-raffinee), et pour le poisson, [Comment conserver le poisson fumé ?](/conseils/comment-conserver-le-poisson-fume).",
    faq: [
      {
        question: "Qu'est-ce que l'atanga ?",
        reponse:
          "C'est le fruit du safoutier (Dacryodes edulis), un arbre des forêts d'Afrique centrale, appelé safou dans les pays voisins. Sa peau violette cache une pulpe verte et grasse, qu'on attendrit à l'eau chaude ou sur la braise.",
      },
      {
        question: "Le nyembwe se prépare-t-il sans poulet ?",
        reponse:
          "Oui. La sauce à la noix de palme accompagne aussi le poisson, les crevettes ou les légumes. Seule la base ne change pas : la pulpe des noix, longuement réduite jusqu'à devenir onctueuse.",
      },
    ],
  },

  "rd-congo": {
    histoire:
      "Deuxième plus grand pays d'Afrique par sa superficie, la République démocratique du Congo s'étend d'une étroite façade atlantique jusqu'aux grands lacs de l'est, Kivu et Tanganyika. Le fleuve Congo et ses affluents dessinent un immense bassin couvert de forêt équatoriale. Indépendant depuis le 30 juin 1960, le pays a pour langue officielle le français et quatre langues nationales : le lingala, le swahili, le kikongo et le tshiluba.\n\nPlus de deux cents peuples y vivent. Le manioc, venu d'Amérique avec les navigateurs portugais au XVIe siècle, s'est imposé comme la base de l'alimentation, au point qu'on en mange aussi bien les racines que les feuilles.",
    regions:
      "À Kinshasa et dans l'ouest, le repas type associe chikwangue ou fufu, pondu et poisson salé, le makayabu. Au Kasaï, on mange le bidia, une pâte de maïs et de manioc. L'est, autour de Goma et Bukavu, parle swahili et cuisine comme ses voisins d'Afrique de l'Est : haricots, bananes, bugali de maïs et sambaza, petits poissons du lac Kivu frits entiers. Le Katanga, au sud-est, mange lui aussi la pâte de maïs, appelée bukari. Les pentes volcaniques du Kivu produisent un café arabica réputé.",
    produits:
      "Les [feuilles de manioc pilées](/produit/feuilles-de-manioc) font le pondu sans passer des heures au mortier. La [chikwangue](/produit/chikwangue) se réchauffe à la vapeur, et la [farine de manioc pour foufou](/produit/farine-de-foufou) donne en quelques minutes une pâte souple. L'[huile de palme rouge](/produit/huile-de-palme-rouge) et la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) servent à la moambé. Le [piment oiseau](/produit/piment-pili-pili), dont le nom pili-pili vient du swahili, accompagne chaque plat.\n\nLe [café moulu du Kivu](/produit/cafe-du-kivu) rappelle les collines de l'est. Pour aller plus loin, le livre [Dans ma cuisine congolaise, du Kivu à Kinshasa](/produit/livre-dans-ma-cuisine-congolaise) parcourt les recettes du pays d'un bout à l'autre.",
    table:
      "Le plat commun reste la règle dans beaucoup de familles, et le manioc sert à saisir la sauce. À Kinshasa, les malewa, petits restaurants de rue, servent poisson, pondu et chikwangue aux travailleurs du quartier. Les mikaté, beignets ronds, accompagnent le thé ou le café du matin, et l'on grille la makemba, la banane plantain, sur le trottoir. Le ngaï-ngaï, feuilles d'oseille de Guinée, se cuisine avec du poisson. Mariages et deuils se célèbrent avec de grandes marmites de moambé.",
    commencer:
      "Le [pondu](/recette/pondu) est le plat le plus courant : il ne demande que de la patience. La [moambé](/recette/moambe), plat de fête, se prépare ensuite. Le [liboké de poisson](/recette/liboke-de-poisson), cuit en papillote de feuilles, est commun aux deux rives du fleuve. Si le poisson fumé vous manque, [Par quoi remplacer le poisson fumé dans une sauce ?](/conseils/remplacer-le-poisson-fume) propose des solutions, et [Comment préparer un foufou sans qu'il fasse de grumeaux ?](/conseils/foufou-sans-grumeaux) vous aidera pour l'accompagnement. Pour l'huile, voyez [Par quoi remplacer l'huile de palme rouge ?](/conseils/remplacer-huile-de-palme-rouge).",
    faq: [
      {
        question: "Quelle différence entre la RD Congo et le Congo ?",
        reponse:
          "Ce sont deux pays voisins, séparés par le fleuve Congo. La RD Congo, capitale Kinshasa, est l'ancienne colonie belge ; le Congo, capitale Brazzaville, l'ancienne colonie française. Leurs cuisines sont très proches.",
      },
      {
        question: "Qu'est-ce que le makayabu ?",
        reponse:
          "Du poisson salé et séché, souvent un poisson de mer importé, que l'on dessale dans l'eau avant de le cuire avec le pondu ou dans une sauce tomate.",
      },
    ],
  },

  ethiopie: {
    histoire:
      "Pays de hauts plateaux, l'Éthiopie culmine à plus de 4 500 mètres dans le massif du Simien et descend sous le niveau de la mer dans la plaine du Danakil. C'est l'un des rares pays d'Afrique à n'avoir jamais été colonisé, malgré l'occupation italienne de 1936 à 1941. Le pays suit son propre calendrier, avec treize mois, et le christianisme y est présent depuis le IVe siècle.\n\nLes Oromos et les Amharas sont les peuples les plus nombreux, suivis des Somalis, des Tigréens et de dizaines d'autres. Le teff, minuscule céréale domestiquée sur ces plateaux, et le café, né dans les forêts du sud-ouest, sont les deux grands cadeaux de l'Éthiopie à la cuisine du monde.",
    regions:
      "Au nord, en pays tigréen, l'injera accompagne le tsebhi, un ragoût épicé. Chez les Gouragués, au sud-ouest d'Addis-Abeba, on prépare le kitfo, bœuf haché assaisonné de mitmita et de beurre épicé, servi cru ou à peine saisi avec un fromage frais, l'ayib. La région de Harar, à l'est, cultive un café aux arômes fruités et garde une cuisine marquée par l'islam. Chez les Oromos, le chechebsa, galette émiettée au beurre et au berbéré, se mange volontiers au petit-déjeuner.",
    produits:
      "Le [berbéré](/produit/berbere), mélange de piment et d'épices, est la base de presque tous les wat. La [farine de teff](/produit/farine-de-teff) sert à l'injera, qu'on cuit sur une [plaque de cuisson](/produit/plaque-a-injera) large et plate. La [farine de pois chiches](/produit/farine-de-pois-chiches) est la base du shiro, que les familles éthiopiennes relèvent d'ail, d'oignon et d'épices.\n\nPour le café, trois origines montrent la diversité du pays : le [Harrar](/produit/cafe-harrar), cultivé dans l'est, le [Yirgacheffe](/produit/cafe-yirgacheffe), floral et léger, et le [Moka Sidamo](/produit/cafe-moka-sidamo), venu du sud. Torréfiés devant les invités, ces grains sont au cœur de la cérémonie du café.",
    table:
      "On mange de la main droite, en déchirant l'injera pour attraper la sauce. Porter une bouchée directement à la bouche de son voisin, la gursha, est un geste d'affection et d'amitié. Les fidèles orthodoxes jeûnent le mercredi et le vendredi, ainsi que pendant plusieurs longues périodes de l'année : ces jours-là, ni viande, ni lait, ni œufs. Les fêtes, comme Genna, le Noël éthiopien, ou Fasika, Pâques, voient le retour du doro wat et du tej, un vin de miel. Dans les campagnes, on brasse la tella, une bière d'orge ou de teff.",
    commencer:
      "L'[injera](/recette/injera) demande quelques jours de fermentation : lisez d'abord [Qu'est-ce que la farine de teff et que peut-on en faire ?](/conseils/que-faire-avec-la-farine-de-teff). Les plats de jeûne sont les plus simples : le [misir wat](/recette/misir-wat) de lentilles et le [shiro](/recette/shiro). Le [doro wat](/recette/doro-wat) est plus long, mais [Qu'est-ce que le berbéré ?](/conseils/quest-ce-que-le-berbere) vous aidera à doser l'épice. Pour finir, préparez le [buna, café éthiopien](/recette/buna-cafe-ethiopien), en suivant [Comment se déroule la cérémonie du café éthiopienne ?](/conseils/ceremonie-du-cafe-ethiopienne), et comparez les origines avec [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda).",
    faq: [
      {
        question: "Pourquoi trouve-t-on autant de plats sans viande en Éthiopie ?",
        reponse:
          "À cause du jeûne orthodoxe, qui exclut les produits animaux pendant de nombreux jours de l'année. Les cuisinières ont développé une grande variété de plats de légumineuses et de légumes, réunis sur un même plateau sous le nom de beyaynetu.",
      },
      {
        question: "Le café vient-il vraiment d'Éthiopie ?",
        reponse:
          "Oui, l'arabica est originaire des forêts du sud-ouest du pays, notamment de la région de Kaffa. Une légende raconte qu'un berger, Kaldi, remarqua l'agitation de ses chèvres après qu'elles eurent mangé les fruits rouges du caféier.",
      },
    ],
  },

  congo: {
    histoire:
      "La République du Congo, souvent appelée Congo-Brazzaville, s'étend de la côte atlantique, autour de Pointe-Noire, jusqu'aux forêts du nord, que traversent la Sangha et l'Oubangui. Brazzaville et Kinshasa se font face de part et d'autre du fleuve Congo : ce sont les deux capitales les plus proches du monde, si l'on met à part Rome et le Vatican. Le pays est devenu indépendant le 15 août 1960.\n\nLe français est la langue officielle, et le lingala et le kituba sont les deux langues nationales. Les Kongos, au sud, les Tékés, sur les plateaux du centre, et les Mbochis, au nord, comptent parmi les peuples les plus nombreux. La forêt couvre une grande partie du territoire, et le fleuve fournit depuis toujours poissons et voies d'échange.",
    regions:
      "Au sud, dans le Pool et autour de Brazzaville, le saka-saka et le poisson salé reviennent presque chaque jour. Les plateaux Tékés, au centre, sont une terre de manioc. Dans le nord forestier, la cuisine fait une large place au poisson d'eau douce, aux chenilles et aux champignons de saison, et l'on fume le poisson pour le conserver pendant des semaines. Sur la côte du Kouilou, autour de Pointe-Noire, le poisson de mer et les crevettes remplacent ceux du fleuve.",
    produits:
      "Les [feuilles de manioc pilées](/produit/feuilles-de-manioc) font le saka-saka, et la [chikwangue](/produit/chikwangue), roulée dans ses feuilles, l'accompagne. L'[egusi moulu](/produit/graines-d-egusi), proche des mbika, épaissit les sauces au poisson. La [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) donne la sauce moambé, et l'[huile de palme rouge](/produit/huile-de-palme-rouge) colore le saka-saka.\n\nPour le liboké, les [feuilles de bananier fraîches](/produit/feuilles-de-bananier-fraiches) sont indispensables, et le [piment oiseau](/produit/piment-pili-pili) se glisse dans le paquet avant la cuisson. Le livre [La cuisine congolaise](/produit/livre-la-cuisine-congolaise), de Fidèle Mialoundama et Isabelle Goma Mouyokani, réunit les recettes du pays.",
    table:
      "Le repas s'organise autour du manioc, servi en foufou ou en chikwangue, d'une sauce et d'un poisson. Les Congolais aiment se retrouver dans les nganda, les buvettes de quartier où l'on grille poisson et viande. Le safou, fruit violet du safoutier, se mange attendri à l'eau chaude ou sur la braise, souvent avec du manioc. Les cérémonies familiales, mariages, retraits de deuil ou retours au village, se fêtent avec de grandes marmites de sauce et du vin de palme fraîchement récolté.",
    commencer:
      "Le [liboké de poisson](/recette/liboke-de-poisson) est la recette la plus emblématique, et elle se réussit très bien au four quand on n'a pas de braise. Le [pondu](/recette/pondu) de la rive voisine se prépare comme le saka-saka. La [moambé](/recette/moambe) et le [poulet nyembwe](/recette/poulet-nyembwe) partagent la même base de noix de palme. Pour ajuster le piment, lisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment), et pour le poisson, [Par quoi remplacer le poisson fumé dans une sauce ?](/conseils/remplacer-le-poisson-fume).",
    faq: [
      {
        question: "Saka-saka et pondu, est-ce la même chose ?",
        reponse:
          "Oui, ce sont deux noms des feuilles de manioc pilées et mijotées. On dit plutôt saka-saka à Brazzaville et pondu à Kinshasa, avec de petites variantes d'une famille à l'autre.",
      },
      {
        question: "Pourquoi cuire en feuilles de bananier ?",
        reponse:
          "La feuille enferme la vapeur et les jus : le poisson cuit dans son propre bouillon sans se dessécher, et prend un léger parfum végétal. C'est tout le principe du liboké.",
      },
    ],
  },

  ouganda: {
    histoire:
      "L'Ouganda est un pays de hauts plateaux sans accès à la mer, bordé au sud par le lac Victoria. Le Nil Blanc en sort à Jinja pour commencer son long voyage vers la Méditerranée. Winston Churchill, de passage en 1907, l'avait surnommé « la perle de l'Afrique » pour ses paysages verdoyants. Indépendant depuis 1962, le pays a pour langues officielles l'anglais et le swahili.\n\nLe royaume du Buganda, qui a donné son nom au pays, reste un pilier culturel autour de Kampala. Les sols volcaniques et les deux saisons des pluies permettent de récolter presque toute l'année bananes, haricots, maïs, patates douces et arachides.",
    regions:
      "Le centre, pays des Bagandas, mange le matoké et le luwombo. Au nord, chez les Acholis et les Langis, on cuisine le mil, le sorgho et le sésame, appelé simsim, dont la pâte enrichit les sauces de feuilles ; le malakwang, légume-feuille acidulé, y est très apprécié. À l'ouest, en Ankole, pays d'éleveurs aux vaches à longues cornes, le lait et le ghee sont essentiels. À l'est, sur les pentes du mont Elgon, les Bagisus préparent le malewa, des pousses de bambou fumées, et cultivent un café arabica.",
    produits:
      "La [pâte d'arachide](/produit/pate-d-arachide) sert à la sauce binyebwa, qui nappe le matoké ou les patates douces. Les [feuilles de bananier fraîches](/produit/feuilles-de-bananier-fraiches) sont indispensables pour le luwombo et pour cuire le matoké à la vapeur, comme dans les cuisines de Kampala. La [farine de maïs blanc](/produit/farine-de-mais-blanc) donne le posho, la pâte ferme servie dans les cantines et les écoles.\n\nUne [marmite en aluminium](/produit/marmite-en-aluminium), comme celles qu'on pose sur le feu de bois, convient aux longues cuissons. Un [mortier en bois](/produit/mortier-et-pilon-en-bois) permet d'écraser soi-même les arachides grillées ou le sésame pour une sauce plus rustique.",
    table:
      "Le repas de midi est souvent le plus copieux, et le matoké, écrasé puis enveloppé dans sa feuille, garde la chaleur jusqu'au moment de servir. Les familles posent plusieurs féculents sur la table, matoké, patate douce, manioc ou posho, avec une seule sauce. Le chapati, hérité des communautés indiennes, se vend à chaque coin de rue. Le soir, on boit volontiers une bière locale ou le waragi, un alcool distillé à partir de banane ou de mil.",
    commencer:
      "Le [matoké](/recette/matoke) est le plat à essayer en premier ; à défaut de bananes à cuire d'Afrique de l'Est, le plantain vert s'en approche. Le [luwombo](/recette/luwombo) demande un peu plus d'organisation, mais la cuisson se fait toute seule. Le posho se prépare comme l'[ugali du Kenya](/recette/ugali-sukuma-wiki). Pour la sauce arachide, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide), et pour les repas sans viande, [Quels plats africains sont naturellement végétariens ?](/conseils/plats-africains-vegetariens).",
    faq: [
      {
        question: "Le matoké est-il une banane plantain ?",
        reponse:
          "Pas exactement. C'est une banane des hauts plateaux d'Afrique de l'Est, récoltée verte et cuisinée comme un légume. Une fois cuite, elle est plus tendre que le plantain.",
      },
      {
        question: "Que sont les nsenene ?",
        reponse:
          "Des sauterelles à longues antennes, capturées la nuit à la lumière pendant les saisons des pluies, surtout en mai et en novembre. On leur retire ailes et pattes avant de les faire revenir avec de l'oignon : c'est l'un des en-cas préférés des Ougandais.",
      },
    ],
  },

  kenya: {
    histoire:
      "Le Kenya s'étend de l'océan Indien jusqu'au lac Victoria, coupé du nord au sud par la vallée du Rift. Le mont Kenya, qui a donné son nom au pays, dépasse 5 000 mètres. Indépendant depuis 1963, le pays a deux langues officielles, l'anglais et le swahili. Nairobi, la capitale, est née d'un dépôt du chemin de fer qui reliait Mombasa à l'Ouganda, à la fin du XIXe siècle.\n\nPlus de quarante peuples y vivent : Kikuyus, Luhyas, Kalenjins, Luos, Kambas, Massaïs et Swahilis de la côte. Le maïs, venu d'Amérique, s'est imposé au XXe siècle comme la céréale de base, tandis que les plateaux d'altitude se couvraient de plantations de thé et de café.",
    regions:
      "Les Kikuyus du centre préparent le githeri, maïs et haricots mijotés, et le mukimo, purée de pommes de terre, de maïs et de légumes verts. Les Luos des rives du lac Victoria mangent le tilapia frit ou séché avec l'ugali. Les Massaïs et d'autres peuples d'éleveurs vivent surtout du lait et de la viande de leurs troupeaux. Sur la côte, la cuisine swahilie mêle influences arabes, indiennes et africaines : viazi karai, pommes de terre en beignets épicés, mandazi au lait de coco et poisson au curry de coco.",
    produits:
      "La [farine de maïs blanc](/produit/farine-de-mais-blanc) est la base de l'ugali : fine et bien blanche, elle donne la texture attendue. Le [thé noir du Kenya](/produit/the-noir-du-kenya), cultivé sur les hauts plateaux de Kericho et du mont Kenya, sert au chai, et le [thé noir à la cardamome](/produit/the-noir-du-kenya-cardamome) apporte d'emblée le parfum épicé. Le [café en grains du Kenya](/produit/cafe-du-kenya), connu pour son acidité vive, pousse sur les sols volcaniques du centre.\n\nPour la nyama choma, des [brochettes en métal](/produit/brochettes-en-metal) suffisent si l'on préfère la viande en morceaux. Le [piment oiseau](/produit/piment-pili-pili), que les Kényans appellent pilipili, relève le kachumbari.",
    table:
      "Le chai, thé noir bouilli avec du lait et du sucre, se boit dès le matin, souvent avec un mandazi ou une tranche de pain. Le midi, dans les cantines de Nairobi, on sert ugali, haricots et légumes verts, ou du riz au ragoût. Le week-end, les amis se retrouvent dans les bars à nyama choma, où l'on choisit sa viande crue avant qu'elle ne passe sur le gril. Le chapati, hérité des communautés indiennes, accompagne les repas de fête.",
    commencer:
      "L'[ugali et son sukuma wiki](/recette/ugali-sukuma-wiki) forment le repas le plus simple et le plus représentatif. La [nyama choma](/recette/nyama-choma) se prépare au barbecue comme au four. Le [chai kényan](/recette/chai-kenyan) se fait en quelques minutes, et le [kahawa chungu](/recette/kahawa-chungu), café amer de la côte, rappelle les vendeurs ambulants de Mombasa. Pour le café, [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu) vous guidera. Le [pilau](/recette/pilau) de la côte swahilie complète le tableau.",
    faq: [
      {
        question: "Le Kenya produit-il beaucoup de thé ?",
        reponse:
          "Oui. C'est l'un des premiers exportateurs mondiaux de thé noir, presque entièrement produit selon la méthode CTC, qui donne de petits grains et une infusion corsée.",
      },
      {
        question: "Que veut dire « nyama choma » ?",
        reponse:
          "En swahili, nyama signifie viande et choma veut dire grillé. L'expression désigne la viande cuite lentement sur la braise, le plus souvent de la chèvre ou du bœuf.",
      },
    ],
  },

  tanzanie: {
    histoire:
      "La Tanzanie est née en 1964 de l'union du Tanganyika, sur le continent, et de l'archipel de Zanzibar. Julius Nyerere, son premier président, a fait du swahili la langue commune d'un pays qui compte plus de cent vingt peuples. Dodoma est la capitale officielle, mais Dar es Salaam reste la plus grande ville et le premier port.\n\nLe pays abrite le Kilimandjaro, plus haut sommet d'Afrique avec 5 895 mètres, une partie du lac Victoria et le lac Tanganyika. Sur la côte, des siècles de commerce avec l'Arabie, la Perse et l'Inde ont façonné la langue et la cuisine swahilies. Au XIXe siècle, le sultan d'Oman installa sa capitale à Zanzibar, et l'île devint l'un des premiers producteurs mondiaux de clou de girofle.",
    regions:
      "Au nord, sur les pentes du Kilimandjaro, les Chaggas cultivent la banane et le café ; ils préparent le mtori, une soupe de bananes et de viande, et une bière de banane, le mbege. Les Massaïs de la steppe vivent de leurs troupeaux. Autour du lac Victoria, le tilapia et la perche du Nil se mangent avec l'ugali. Sur la côte et à Zanzibar, la cuisine est la plus parfumée du pays : poisson au lait de coco, biryani, et urojo, une soupe acidulée vendue le soir dans les rues de Zanzibar.",
    produits:
      "Le [café en grains de Tanzanie](/produit/cafe-de-tanzanie) vient surtout des pentes du Kilimandjaro et des hauts plateaux du sud. La [farine de maïs blanc](/produit/farine-de-mais-blanc) donne l'ugali de tous les jours. L'[infusion de tamarin](/produit/infusion-de-tamarin) rappelle l'acidité de l'urojo et des sauces côtières, et la [citronnelle séchée](/produit/citronnelle-sechee) sert au chai ya mchaichai, le thé à la citronnelle.\n\nPour les brochettes mishkaki, des [brochettes en métal](/produit/brochettes-en-metal) permettent de griller la viande marinée comme sur les marchés de nuit. Le [piment oiseau](/produit/piment-pili-pili) sert à la sauce pilipili qui accompagne grillades et frites. Pour le pilau, une [marmite en aluminium](/produit/marmite-en-aluminium) à fond épais évite que le riz attache.",
    table:
      "Le matin, on boit le chai avec des chapatis ou des maandazi, beignets légèrement sucrés. Le midi, l'ugali ou le riz accompagnent les haricots, les légumes verts et un peu de viande. À Zanzibar, des vendeurs ambulants servent dans les rues le kahawa, un café noir très fort versé dans de minuscules tasses depuis une cafetière en cuivre. Pendant le ramadan, très suivi sur la côte, le repas de rupture du jeûne réunit familles et voisins autour des beignets, des fruits et du thé.",
    commencer:
      "Le [pilau](/recette/pilau) est le plat tanzanien par excellence : faites revenir les épices entières, ce sont elles qui portent tout le parfum. L'[ugali au sukuma wiki](/recette/ugali-sukuma-wiki) se mange aussi bien à Dar es Salaam qu'à Nairobi. La [nyama choma](/recette/nyama-choma) rappelle les grillades du soir, et le [kahawa chungu](/recette/kahawa-chungu) le café des rues de Zanzibar. Pour ajuster le piquant, lisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment) ; pour le café, [Comment torréfier du café vert à la maison ?](/conseils/torrefier-cafe-vert-maison).",
    faq: [
      {
        question: "D'où vient le nom Tanzanie ?",
        reponse:
          "Il réunit les premières syllabes de Tanganyika et de Zanzibar, les deux États qui ont fusionné en 1964.",
      },
      {
        question: "Le pilau de Zanzibar est-il un biryani ?",
        reponse:
          "Non. Dans le pilau, le riz cuit directement avec la viande et les épices, dans une seule marmite. Le biryani, lui, superpose un riz et une sauce préparés séparément.",
      },
    ],
  },

  madagascar: {
    histoire:
      "Quatrième plus grande île du monde, Madagascar est séparée de l'Afrique par le canal du Mozambique. Ses premiers habitants sont venus d'Asie du Sud-Est, probablement de la région de Bornéo, il y a plus de mille ans, puis des populations bantoues d'Afrique de l'Est les ont rejoints. La langue malgache appartient d'ailleurs à la famille austronésienne, comme l'indonésien.\n\nCe double héritage se retrouve à table : la riziculture en terrasses des hauts plateaux rappelle l'Asie, tandis que l'élevage du zébu tient une place centrale dans la vie et les cérémonies. Le royaume merina, centré sur Antananarivo, a unifié une grande partie de l'île au XIXe siècle, avant la colonisation française. Le pays est indépendant depuis 1960.",
    regions:
      "Les hauts plateaux, autour d'Antananarivo et d'Antsirabe, sont le pays du riz, du ravitoto et du romazava. La côte est, humide, produit le litchi autour de Toamasina, le clou de girofle et le café, et cuisine volontiers au lait de coco. Le nord-est, région de la Sava, fournit l'essentiel de la vanille du pays. Dans l'ouest et le sud, plus secs, l'élevage du zébu domine, et le manioc, le maïs et le sorgho complètent ou remplacent le riz.",
    produits:
      "La [vanille bourbon de Madagascar](/produit/vanille-bourbon-de-madagascar), cultivée dans la Sava, est le produit le plus célèbre de l'île ; on l'emploie aussi dans des plats salés, avec le poisson ou le poulet. Le [poivre sauvage voatsiperifery](/produit/poivre-sauvage-voatsiperifery), cueilli sur des lianes de la forêt, a un parfum boisé et frais. Les [feuilles de manioc pilées](/produit/feuilles-de-manioc) font le ravitoto sans des heures de pilon.\n\nLe [piment oiseau](/produit/piment-pili-pili), écrasé avec du sel, donne un sakay maison. Les [feuilles de bananier fraîches](/produit/feuilles-de-bananier-fraiches) servent à envelopper le koba et d'autres préparations cuites à l'eau. Un [mortier en bois](/produit/mortier-et-pilon-en-bois) reste l'outil des cuisines malgaches pour broyer feuilles et épices.",
    table:
      "Le riz se mange matin, midi et soir. Au petit-déjeuner, beaucoup de familles prennent le vary sosoa, une bouillie de riz, parfois accompagnée de viande ou de brèdes. Le mi sao, nouilles sautées héritées de la communauté chinoise, et les sambos, cousins des samoussas, se vendent dans les petites gargotes appelées hotely. Le zébu se prépare en hen'omby ritra, viande mijotée jusqu'à ce que toute la sauce se soit évaporée.",
    commencer:
      "Le [romazava](/recette/romazava) est le plat idéal pour commencer : un bouillon de viande et de feuilles vertes, servi avec un grand bol de riz. Le [ravitoto](/recette/ravitoto) demande une cuisson longue, mais très peu de travail. Les feuilles séchées se gardent longtemps si l'on suit [Comment conserver les feuilles séchées ?](/conseils/conserver-feuilles-sechees). Pour le sakay, voyez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment), et si vous débutez, [Par quelle recette africaine commencer quand on débute ?](/conseils/par-quelle-recette-commencer) propose d'autres pistes.",
    faq: [
      {
        question: "Pourquoi le riz compte-t-il autant à Madagascar ?",
        reponse:
          "Il est cultivé sur l'île depuis l'arrivée des premiers habitants venus d'Asie, et les Malgaches comptent parmi les plus grands mangeurs de riz du monde par habitant. Un repas sans riz n'y est pas considéré comme un vrai repas.",
      },
      {
        question: "Qu'est-ce que le voatsiperifery ?",
        reponse:
          "Un poivre sauvage récolté sur des lianes du genre Piper dans les forêts de l'île. Ses grains gardent une petite queue, et son goût est plus frais et plus résineux que celui du poivre noir.",
      },
    ],
  },

  "afrique-du-sud": {
    histoire:
      "À la pointe sud du continent, l'Afrique du Sud est baignée par l'Atlantique et l'océan Indien. Depuis 2023, le pays compte douze langues officielles, dont le zoulou, le xhosa, l'afrikaans, l'anglais et la langue des signes sud-africaine. En 1652, la Compagnie néerlandaise des Indes orientales installa au Cap une station de ravitaillement pour ses navires ; elle y fit venir des esclaves d'Asie du Sud-Est, dont les descendants forment la communauté malaise du Cap. Des huguenots français arrivèrent en 1688 et développèrent la vigne.\n\nÀ partir de 1860, des travailleurs indiens furent amenés au Natal pour les plantations de canne à sucre. Après la fin de l'apartheid et l'élection de Nelson Mandela en 1994, le pays a pris le surnom de nation arc-en-ciel.",
    regions:
      "Au Cap, la cuisine malaise parfume les plats au curcuma, à la cannelle et aux fruits secs : bobotie, bredie de mouton, koesisters épicés. À Durban, la grande communauté indienne a inventé le bunny chow, un demi-pain évidé rempli de curry. Dans le Highveld, autour de Johannesburg, le pap et la viande grillée dominent. Les cuisines zouloue et xhosa reposent sur le maïs, les haricots et le lait caillé, l'amasi ; l'umngqusho, maïs concassé cuit avec des haricots, passait pour le plat préféré de Nelson Mandela.",
    produits:
      "Le [biltong](/produit/biltong), viande séchée au vinaigre et à la coriandre, se grignote devant les matchs de rugby. Le [rooibos](/produit/rooibos) et le [rooibos vert](/produit/rooibos-vert), non fermenté, viennent du Cederberg, et le [honeybush](/produit/honeybush), une autre plante infusée, pousse dans les montagnes du Cap. La [farine de maïs blanc](/produit/farine-de-mais-blanc) sert au pap, et la [marmite potjie](/produit/marmite-potjie), en fonte à trois pieds, se pose directement sur les braises.\n\nLa [sauce peri-peri](/produit/sauce-peri-peri), venue du Mozambique voisin et de l'héritage portugais, relève le poulet grillé, très populaire dans tout le pays. Des [brochettes en métal](/produit/brochettes-en-metal) suffisent pour les sosaties, brochettes marinées de la cuisine du Cap.",
    table:
      "Le braai dépasse le simple repas : le 24 septembre, jour du Patrimoine, beaucoup de Sud-Africains le rebaptisent National Braai Day. Le petit-déjeuner peut être une bouillie de maïs, du pain ou des rusks, biscuits secs qu'on trempe dans le café. Dans les townships, on vend le kota, quart de pain garni de frites et de saucisse, et le vetkoek, pain frit fourré de viande hachée. Au dessert, la melktert, tarte au lait à la cannelle, et le malva pudding, gâteau à l'abricot nappé d'un sirop crémeux, se disputent les faveurs du pays.",
    commencer:
      "Le [chakalaka](/recette/chakalaka) est rapide, se garde bien et accompagne aussi bien le pap que les grillades. Le [bobotie](/recette/bobotie) fait découvrir la cuisine malaise du Cap avec des ingrédients faciles à trouver. Pour finir sur une note fraîche, le [rooibos glacé](/recette/rooibos-glace) se prépare la veille ; [Qu'est-ce que le rooibos et comment l'infuser ?](/conseils/quest-ce-que-le-rooibos) explique le temps d'infusion. Si vous avez une cocotte en fonte, lisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces) avant votre premier potjie.",
    faq: [
      {
        question: "Quelle différence entre le biltong et une viande séchée ordinaire ?",
        reponse:
          "Le biltong est mariné au vinaigre et aux épices, surtout la coriandre, puis séché à l'air sans être fumé ni cuit. Il est souvent coupé en lamelles épaisses.",
      },
      {
        question: "Le rooibos est-il un thé ?",
        reponse:
          "Non. C'est une plante de la famille des légumineuses, Aspalathus linearis, qui pousse dans les montagnes du Cederberg, au nord du Cap. Ce n'est donc pas un thé au sens botanique, même si on l'infuse de la même façon.",
      },
    ],
  },
};
