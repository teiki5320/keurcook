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
};
