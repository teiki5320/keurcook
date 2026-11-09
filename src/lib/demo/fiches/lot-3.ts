/**
 * Fiches détaillées des produits, lot 3 : Épices, feuilles, huiles et pâtes, poisson séché, snacks (35 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - poivre-de-penja — Poivre blanc de Penja
 *   - soumbala — Soumbala (nététou)
 *   - berbere — Berbéré d'Éthiopie
 *   - poivre-de-selim — Poivre de Selim (djar)
 *   - graines-d-egusi — Egusi moulu (pistache africaine)
 *   - piment-pili-pili — Piment oiseau pili-pili entier
 *   - akpi-djansang — Akpi / djansang (graines)
 *   - assaisonnement-jollof — Assaisonnement jollof
 *   - maniguette — Maniguette (graines de paradis)
 *   - essesse-sassas — Essessè / sassas en poudre
 *   - pebe-moulu — Pèbè moulu (muscade africaine)
 *   - vanille-bourbon-de-madagascar — Vanille bourbon de Madagascar
 *   - sauce-peri-peri — Sauce peri-peri
 *   - poivre-sauvage-voatsiperifery — Poivre sauvage voatsiperifery
 *   - feuilles-de-ndole — Feuilles de ndolé séchées
 *   - feuilles-de-manioc — Feuilles de manioc pilées (pondu, ravitoto)
 *   - fleurs-de-bissap — Fleurs de bissap
 *   - gombo-seche — Gombo séché en poudre
 *   - feuilles-de-moringa — Feuilles de moringa séchées
 *   - feuilles-de-sorgho — Feuilles de sorgho rouge (waakye)
 *   - huile-de-palme-rouge — Huile de palme rouge
 *   - pate-d-arachide — Pâte d'arachide
 *   - pulpe-de-noix-de-palme — Pulpe de noix de palme
 *   - base-soupe-noix-de-palme — Base de soupe de noix de palme (Ghana)
 *   - crevettes-sechees — Crevettes séchées
 *   - chips-de-plantain — Chips de plantain
 *   - biltong — Biltong
 *   - souchet — Souchet (noix tigrée)
 *   - ras-el-hanout — Ras el hanout (Afrique du Nord, page en noindex)
 *   - epices-tunisiennes — Tabel karouia (mélange tunisien) (Afrique du Nord, page en noindex)
 *   - dukkah — Dukkah (Afrique du Nord, page en noindex)
 *   - harissa-artisanale — Harissa artisanale (Afrique du Nord, page en noindex)
 *   - huile-d-argan — Huile d'argan alimentaire (Afrique du Nord, page en noindex)
 *   - citrons-beldi-confits — Citrons beldi confits (Afrique du Nord, page en noindex)
 *   - dattes-deglet-nour — Dattes Deglet Nour (Afrique du Nord, page en noindex)
 */
import type { ProductDetail } from "../../types";

export const SLUGS = [
  "poivre-de-penja",
  "soumbala",
  "berbere",
  "poivre-de-selim",
  "graines-d-egusi",
  "piment-pili-pili",
  "akpi-djansang",
  "assaisonnement-jollof",
  "maniguette",
  "essesse-sassas",
  "pebe-moulu",
  "vanille-bourbon-de-madagascar",
  "sauce-peri-peri",
  "poivre-sauvage-voatsiperifery",
  "feuilles-de-ndole",
  "feuilles-de-manioc",
  "fleurs-de-bissap",
  "gombo-seche",
  "feuilles-de-moringa",
  "feuilles-de-sorgho",
  "huile-de-palme-rouge",
  "pate-d-arachide",
  "pulpe-de-noix-de-palme",
  "base-soupe-noix-de-palme",
  "crevettes-sechees",
  "chips-de-plantain",
  "biltong",
  "souchet",
  "ras-el-hanout",
  "epices-tunisiennes",
  "dukkah",
  "harissa-artisanale",
  "huile-d-argan",
  "citrons-beldi-confits",
  "dattes-deglet-nour",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], ProductDetail>> = {
  // Fiche modèle (épicerie) : à prendre comme exemple pour la forme, jamais pour recopier des phrases.
  "poivre-de-penja": {
    origine:
      "Penja est une petite ville du département du Moungo, dans la région camerounaise du Littoral. Les poivriers y sont cultivés depuis les années 1950 sur les sols volcaniques qui s'étendent au pied du mont Koupé.\n\nEn 2013, il est devenu la première indication géographique reconnue par l'Organisation africaine de la propriété intellectuelle (OAPI). L'Union européenne l'a enregistré à son tour en 2022 : le nom est réservé au poivre de cette zone. Pour le poivre blanc, on cueille les baies mûres, on les fait tremper pour détacher leur peau, puis on sèche au soleil le grain clair qui reste.",
    choisir:
      "Le Penja vient de la même plante que le poivre noir ordinaire, Piper nigrum. Les autres « poivres » africains de la boutique sont des épices différentes : le [poivre de Selim](/produit/poivre-de-selim) se présente en gousses au parfum fumé et s'infuse plutôt qu'il ne se moud ; la [maniguette](/produit/maniguette), graine de la famille du gingembre, pique avec des notes d'agrumes ; le [poivre sauvage voatsiperifery](/produit/poivre-sauvage-voatsiperifery), cueilli dans les forêts de Madagascar, est plus boisé.\n\nPour un piquant net qui ne marque pas les sauces claires, le Penja blanc est le choix le plus simple. Vérifiez la mention de la région sur l'emballage et préférez les grains entiers.",
    conserver:
      "Un bocal en verre bien fermé, rangé dans un placard loin de la plaque de cuisson, convient parfaitement. La lumière et la chaleur font tomber l'arôme bien plus vite que le temps : évitez le pot laissé en plein soleil. Remplissez le moulin par petites quantités plutôt que d'y verser tout le sachet.",
    remplacer:
      "Un autre poivre blanc en grains peut prendre sa place, avec un parfum moins intense : on en met alors un peu plus. Le poivre noir convient aussi, mais il laisse des points sombres dans les plats clairs. Pour garder une touche africaine, la maniguette donne un piquant comparable, plus citronné ; dosez-la prudemment la première fois.",
    enCuisine:
      "Au Cameroun, il relève le [ndolé aux crevettes](/recette/ndole) et le [poulet DG](/recette/poulet-dg). Il parfume aussi le [poisson braisé et attiéké](/recette/poisson-braise-attieke), le [kedjenou de poulet](/recette/kedjenou) ou le [caldou de poisson](/recette/caldou) sénégalais. Pour repérer un bon grain dès l'emballage, lisez [Comment reconnaître un bon poivre de Penja ?](/conseils/reconnaitre-un-bon-poivre-de-penja).",
    faq: [
      {
        question: "Pourquoi le poivre de Penja est-il blanc ?",
        reponse:
          "Parce qu'on retire la peau des baies mûres après un trempage dans l'eau. Il ne reste que le cœur du grain, plus clair et au goût plus franc que le poivre noir.",
      },
      {
        question: "Le poivre de Penja et le poivre de Selim, est-ce la même chose ?",
        reponse:
          "Non. Le Penja est un vrai poivre, en grains ronds. Le [poivre de Selim](/produit/poivre-de-selim) vient d'un autre arbre et se vend en gousses longues et sombres.",
      },
    ],
  },
  soumbala: {
    origine:
      "Le mot soumbala vient des langues mandingues, parlées notamment au Mali, au Burkina Faso et en Guinée. Le même condiment s'appelle dawadawa en haoussa, iru en yoruba, afitin au Bénin et nététou en wolof : un seul produit, de nombreux noms.\n\nIl naît des graines du néré (Parkia biglobosa), un arbre des savanes. Crues, ces graines ne se mangent pas. On les cuit longuement, on les débarrasse de leur enveloppe dure, on les cuit une seconde fois, puis on les laisse fermenter deux à trois jours avant de les façonner et de les sécher. Bien sec, il se gardait autrefois plus d'un an dans des pots en terre.",
    choisir:
      "On le trouve en boules sombres, en galettes ou déjà moulu. Les boules gardent mieux leur parfum ; la poudre se dose plus facilement et se disperse vite dans la sauce. Une odeur forte, presque animale, n'a rien d'inquiétant : c'est la signature de la fermentation. Un produit collant, en revanche, a pris l'humidité.\n\nLes [crevettes séchées](/produit/crevettes-sechees) apportent elles aussi de la profondeur, mais avec un goût marin. Le [poivre de Selim](/produit/poivre-de-selim) ou la [maniguette](/produit/maniguette) parfument et piquent, sans ce fond savoureux. Le soumbala est un assaisonnement de base, celui qui donne du corps à une sauce même sans viande.",
    conserver:
      "Son odeur traverse un simple sachet et gagne vite tout le placard. Glissez-le dans un bocal en verre à fermeture hermétique et rangez-le loin du café, du thé ou des farines, qui prennent les odeurs. L'humidité est son principal ennemi : prélevez chaque portion avec une cuillère bien sèche et refermez aussitôt.",
    remplacer:
      "Cherchez-le d'abord sous ses autres noms : un sachet de dawadawa ou d'iru trouvé dans une épicerie nigériane fera exactement le même travail. À défaut, une cuillère de crevettes séchées pilées ou un peu de miso brun délayé rapprochent la sauce de son goût, sans l'égaler. Notre article [Par quoi remplacer le soumbala ?](/conseils/par-quoi-remplacer-le-soumbala) détaille les dosages.",
    enCuisine:
      "Il donne sa profondeur à la [sauce gombo du tô](/recette/to-sauce-gombo) burkinabè et se glisse dans le [mafé de bœuf](/recette/mafe) comme dans le [fonio aux légumes et sauce arachide](/recette/fonio-aux-legumes). Notre [thiéboudienne](/recette/thieboudienne) en demande aussi un morceau, sous son nom sénégalais de nététou : voyez [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne). Pour tout savoir sur ce condiment, lisez [Qu'est-ce que le soumbala ?](/conseils/quest-ce-que-le-soumbala).",
    faq: [
      {
        question: "Le soumbala sent très fort : est-ce normal ?",
        reponse:
          "Oui. Cette odeur vient de la fermentation des graines et s'atténue nettement à la cuisson. Dans l'assiette, il ne reste qu'un goût rond et profond.",
      },
      {
        question: "Soumbala et nététou, est-ce le même produit ?",
        reponse: "Oui : nététou est son nom au Sénégal. Seuls la forme et le sel varient selon le fabricant.",
      },
    ],
  },
  berbere: {
    origine:
      "En amharique, la langue la plus parlée d'Éthiopie, berbere veut dire à peu près « piquant » ou « piment ». Le mélange réunit des piments rouges séchés et une série d'épices : fenugrec, coriandre, gingembre, ail, nigelle, basilic éthiopien et korarima, une graine parente de la cardamome.\n\nIl sert de socle aux wats, ces ragoûts épais qu'on dépose sur l'injera. À ses côtés, la cuisine éthiopienne emploie le niter kibbeh, un beurre clarifié parfumé aux épices, et le mitmita, une poudre bien plus brûlante à base de petit piment, que l'on saupoudre à table, notamment sur le kitfo.",
    choisir:
      "Regardez la couleur : un berbéré rouge brique, sans teinte brune, a été moulu récemment. L'odeur doit être chaude, avec une pointe d'amertume due au fenugrec. La composition varie d'une marque à l'autre ; lisez l'étiquette si vous surveillez le sel.\n\nIl ne remplace pas l'[assaisonnement jollof](/produit/assaisonnement-jollof), plus doux et pensé pour la tomate, ni le [piment pili-pili](/produit/piment-pili-pili), qui donne de la force sans autre parfum. Pour un repas éthiopien complet, la [farine de teff](/produit/farine-de-teff) sert à préparer l'injera, cuite sur une [plaque à injera](/produit/plaque-a-injera).",
    conserver:
      "Un mélange moulu perd son parfum plus vite que des épices entières. Rangez le berbéré dans un pot opaque ou dans un placard fermé, et refermez-le juste après usage. Évitez de le verser directement au-dessus d'une marmite fumante : la vapeur entre dans le pot et fait durcir la poudre en grumeaux.",
    remplacer:
      "Il n'existe pas de vrai substitut tout prêt. On s'en approche avec du paprika fort, un peu de piment de Cayenne, du gingembre et de l'ail en poudre, une pincée de fenugrec moulu et de cardamome. Il manquera la profondeur du korarima, mais le misir wat restera honnête. Le mitmita, plus sec et plus brûlant, n'est pas un bon remplaçant.",
    enCuisine:
      "Il colore le [doro wat](/recette/doro-wat), ragoût de poulet aux œufs durs servi à Noël et à Pâques, et le [misir wat](/recette/misir-wat) de lentilles corail. On le retrouve plus discrètement dans le [shiro](/recette/shiro), lui aussi servi avec l'[injera](/recette/injera). Notre article [Qu'est-ce que le berbéré ?](/conseils/quest-ce-que-le-berbere) donne d'autres idées, et [Comment doser le piment ?](/conseils/comment-doser-le-piment) aide à trouver la bonne mesure.",
    faq: [
      {
        question: "Le berbéré est-il très piquant ?",
        reponse:
          "Assez, oui, mais il est surtout parfumé. Une cuillère à soupe dans un wat pour quatre donne une chaleur nette ; commencez par moins si vos convives craignent le piment.",
      },
      {
        question: "Berbéré et mitmita, quelle différence ?",
        reponse:
          "Le berbéré est un mélange complexe qui cuit longuement avec les oignons. Le mitmita, plus simple et plus fort, s'ajoute en fin de préparation ou directement à table.",
      },
    ],
  },
  "poivre-de-selim": {
    origine:
      "C'est le fruit séché du Xylopia aethiopica, un arbre de la famille des annones répandu dans toute l'Afrique tropicale. Ses gousses ressemblent à de petits chapelets sombres et tordus. En wolof, on dit djar ; au Ghana, hwentia ; les livres de cuisine camerounais l'appellent souvent kieng. Les Européens l'ont baptisé poivre de Guinée ou poivre d'Éthiopie, ce dernier mot désignant alors toute l'Afrique subsaharienne.\n\nEn cuisine, on utilise le fruit entier, gousse et graines ensemble. Son parfum, résineux et légèrement musqué, ne ressemble à celui d'aucun poivre en grains.",
    choisir:
      "Des gousses entières, sèches et cassantes, d'un brun très foncé, promettent un bon parfum ; une gousse molle ou poussiéreuse a vieilli.\n\nLe poivre de Selim se travaille autrement que les poivres en grains. Le [poivre de Penja](/produit/poivre-de-penja) se moud au-dessus de l'assiette ; le Selim s'écrase grossièrement et infuse dans le liquide, comme une branche de cannelle. La [maniguette](/produit/maniguette) pique davantage, avec une fraîcheur d'agrume, et le [pèbè](/produit/pebe-moulu) apporte une rondeur proche de la muscade. Les trois se complètent volontiers dans un même bouillon.",
    conserver:
      "Entières, les gousses gardent leur parfum de longs mois dans un bocal fermé, à l'abri de la lumière. Ne les écrasez qu'au moment de cuisiner. Si vous préparez votre propre café Touba, ne broyez que la quantité de la semaine : une fois moulu avec le café, le djar s'évente vite.",
    remplacer:
      "Rien n'imite tout à fait son parfum fumé. En dépannage, une gousse de cardamome noire écrasée et quelques grains de poivre noir donnent une note résineuse comparable dans un bouillon. Pour le café Touba, mieux vaut attendre d'avoir du djar : sans lui, on boit simplement un café poivré.",
    enCuisine:
      "Il est torréfié avec les grains dans le [café Touba](/recette/cafe-touba) et parfume la [pepper soup de chèvre](/recette/pepper-soup) nigériane. On le retrouve dans la marinade du [poulet yassa](/recette/poulet-yassa), dans le [thiéré mbuum](/recette/thiere-mbuum), le [liboké de poisson](/recette/liboke-de-poisson) congolais et même les bananes frites du [kelewele](/recette/kelewele). À lire : [Comment utiliser le poivre de Selim ?](/conseils/utiliser-poivre-de-selim) et [Qu'est-ce que le café Touba ?](/conseils/quest-ce-que-le-cafe-touba).",
    faq: [
      {
        question: "Faut-il retirer les gousses avant de servir ?",
        reponse:
          "Oui, de préférence, car elles restent dures après la cuisson. Enfermez-les dans une boule à thé ou un nouet de tissu pour les repêcher facilement.",
      },
      {
        question: "Peut-on moudre le poivre de Selim ?",
        reponse:
          "Oui, au moulin à café ou au mortier, gousses et graines ensemble. La poudre obtenue s'emploie alors en petite quantité dans les marinades.",
      },
    ],
  },
  "graines-d-egusi": {
    origine:
      "Le mot egusi vient du yoruba, la langue du sud-ouest du Nigeria ; les Igbo disent egwusi. Il désigne les graines de plusieurs cucurbitacées cultivées en Afrique de l'Ouest, surtout un melon proche de la pastèque (Citrullus mucosospermus) et une courge grimpante (Cucumeropsis mannii). Ces plantes sont cultivées pour leurs graines plus que pour leur chair.\n\nAprès la récolte, les graines sont séchées puis débarrassées de leur coque. Le cœur blanc, riche en matière grasse, est ensuite moulu en une poudre claire. La soupe qu'on en tire est l'une des plus répandues d'Afrique de l'Ouest, avec des variantes d'une région à l'autre.",
    choisir:
      "La poudre doit être crème, presque blanche, et sentir la graine fraîche. Une odeur de vieux beurre ou une teinte jaunie signale un produit rance. Les graines entières décortiquées se gardent plus longtemps : on les moud soi-même, au mortier ou au moulin.\n\nDans une sauce, l'egusi épaissit comme le font l'[akpi](/produit/akpi-djansang) ou la [pâte d'arachide](/produit/pate-d-arachide), mais avec un goût plus neutre. L'akpi est bien plus parfumé et s'emploie par petites cuillères ; l'arachide donne une sauce lisse et grasse ; l'egusi, lui, forme des flocons tendres qui font tout le charme de la soupe.",
    conserver:
      "Riche en huile, l'egusi moulu rancit plus vite qu'une épice. Gardez le sachet entamé dans un bocal hermétique, au frais, et utilisez-le dans les semaines qui suivent. Pour une provision plus longue, le congélateur convient bien : la poudre ne prend pas en bloc et s'utilise sans décongélation.",
    remplacer:
      "Des graines de tournesol ou de melon décortiquées, moulues finement, donnent une texture voisine. Le goût change, mais la soupe garde son épaisseur ; une cuillère de pâte d'arachide aide si elle reste trop claire. Notre article [Par quoi remplacer l'egusi ?](/conseils/par-quoi-remplacer-l-egusi) compare les solutions.",
    enCuisine:
      "Notre [soupe egusi](/recette/soupe-egusi) suit la méthode nigériane : la poudre cuit dans l'[huile de palme rouge](/produit/huile-de-palme-rouge), avec des légumes-feuilles, de la viande et des [crevettes séchées](/produit/crevettes-sechees). Servez-la avec un foufou de [farine de foufou](/produit/farine-de-foufou) ou du [gari](/produit/gari-jaune) roulé en eba ; [Comment faire un foufou sans grumeaux ?](/conseils/foufou-sans-grumeaux) vous aidera pour l'accompagnement.",
    faq: [
      {
        question: "Egusi et pistache, est-ce la même chose ?",
        reponse:
          "Non. Le surnom de pistache africaine tient à la douceur des graines. Il s'agit de graines de melon ou de courge, sans lien avec le pistachier.",
      },
      {
        question: "Pourquoi ma soupe egusi est-elle lisse au lieu de faire des morceaux ?",
        reponse:
          "La poudre a sans doute été versée dans trop de liquide ou remuée trop tôt. Pour obtenir des flocons, déposez-la en pâte épaisse dans l'huile chaude et patientez avant de mélanger.",
      },
    ],
  },
  "piment-pili-pili": {
    origine:
      "Pili-pili, ou piri-piri dans les pays lusophones, désigne le petit piment très fort dans une bonne partie de l'Afrique. En swahili, pilipili signifie simplement « piment ». Botaniquement, c'est une forme de Capsicum frutescens, l'espèce qui sert aussi à faire le tabasco.\n\nComme tous les piments, il vient d'Amérique : les navigateurs portugais l'ont introduit sur les côtes africaines à partir du XVIe siècle. Il s'y est si bien acclimaté qu'il pousse aujourd'hui aussi bien cultivé qu'à l'état sauvage, et qu'il a gagné presque toutes les cuisines du continent.",
    choisir:
      "Un bon pili-pili séché est rouge vif, entier, avec sa queue, et cassant sous les doigts. Les piments ternes ou brunis ont perdu leur parfum fruité ; ceux qui plient encore ont été mal séchés.\n\nC'est la source de chaleur la plus pure de la boutique. Le [berbéré](/produit/berbere) et l'[assaisonnement jollof](/produit/assaisonnement-jollof) contiennent aussi du piment, mais mêlé à d'autres épices qui orientent le plat. La [maniguette](/produit/maniguette) et le [poivre de Penja](/produit/poivre-de-penja) piquent autrement, de façon plus aromatique et moins brûlante. La [sauce peri-peri](/produit/sauce-peri-peri), enfin, offre ce même petit piment déjà mêlé d'ail et de citron.",
    conserver:
      "Bien secs, les piments entiers se gardent longtemps dans un bocal en verre, loin de la lumière qui fait pâlir leur couleur. Évitez le réfrigérateur, trop humide. Une huile pimentée maison se garde au frais et se consomme dans le mois, en veillant à ce que l'ail reste toujours couvert d'huile.",
    remplacer:
      "Des flocons de piment ou du piment de Cayenne en poudre donnent une chaleur proche ; dosez-les plus prudemment, car la poudre se répartit dans toute la sauce. Un petit piment frais de type bird's eye, courant dans les épiceries asiatiques, appartient à la même famille et convient très bien, entier ou haché.",
    enCuisine:
      "Le piment est partout dans nos recettes : dans la marinade du [poulet yassa](/recette/poulet-yassa), le [mafé de bœuf](/recette/mafe), la [sauce graine](/recette/sauce-graine) ou la [pepper soup de chèvre](/recette/pepper-soup). Un pili-pili écrasé relève aussi l'[alloco](/recette/alloco) ou le [chakalaka](/recette/chakalaka) sud-africain. Pour régler la force selon vos convives, lisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "Comment rattraper un plat trop pimenté ?",
        reponse:
          "Ajoutez du volume plutôt que du sucre : un peu de bouillon, de tomate ou de pâte d'arachide dilue la chaleur. Servir le plat avec du riz, de l'attiéké ou un foufou aide aussi.",
      },
      {
        question: "Où se cache la force du piment ?",
        reponse:
          "Surtout dans les membranes blanches qui portent les graines. Ouvrir le piment et les gratter adoucit sa chaleur sans lui ôter son goût fruité.",
      },
    ],
  },
  "akpi-djansang": {
    origine:
      "L'akpi vient du Ricinodendron heudelotii, un arbre à croissance rapide qui dépasse parfois quarante mètres dans les forêts d'Afrique de l'Ouest et centrale. Son nom change avec les frontières : akpi en Côte d'Ivoire, wama au Ghana, njansang, djansang ou essang au Cameroun.\n\nLes fruits tombés au sol sont ramassés, laissés quelque temps en tas pour que la pulpe se défasse, puis cuits pour libérer les noyaux. Il faut encore casser chaque coque dure pour en tirer une petite amande claire, que l'on sèche. Ce travail long, transmis de génération en génération dans les villages, explique la petite taille des sachets.",
    choisir:
      "Les graines doivent être entières, d'un blanc crème à brun clair, sans taches sombres. Comme toutes les amandes riches en huile, elles peuvent rancir : sentez le sachet, l'odeur doit rester douce.\n\nL'akpi se situe entre deux autres produits de la boutique. Comme l'[egusi](/produit/graines-d-egusi), il lie une sauce, mais en quantité bien plus faible et avec un parfum marqué. Il accompagne souvent le [pèbè](/produit/pebe-moulu) et l'[essessè](/produit/essesse-sassas) dans les épices camerounaises du poisson et des soupes : là où ces deux-là parfument, lui donne de la tenue et une rondeur de fruit sec.",
    conserver:
      "Gardez les graines entières dans un bocal fermé, au frais et au sec, et ne les écrasez qu'au moment de l'emploi : la pâte obtenue s'oxyde vite. En été, ou pour un grand sachet, le réfrigérateur les protège mieux qu'un placard chaud.",
    remplacer:
      "Il n'a pas de jumeau. Pour lier une marinade, quelques noix de cajou ou des amandes grillées puis pilées font l'affaire. Pour retrouver son goût, une pointe de sésame grillé s'en rapproche, tandis que l'egusi reprend son pouvoir épaississant sans son arôme.",
    enCuisine:
      "Il a toute sa place dans la marinade du [poisson braisé et attiéké](/recette/poisson-braise-attieke), à côté de l'ail et du gingembre : la pâte d'akpi colle à la chair et dore au gril. On peut aussi en ajouter une cuillère dans le [kedjenou de poulet](/recette/kedjenou) ou une [sauce graine](/recette/sauce-graine) pour l'épaissir. Pour découvrir les cuisines qui l'emploient, voyez les pages [Côte d'Ivoire](/pays/cote-d-ivoire) et [Cameroun](/pays/cameroun).",
    faq: [
      {
        question: "Akpi et djansang, est-ce le même produit ?",
        reponse:
          "Oui. Akpi est le nom ivoirien, djansang ou njansang le nom camerounais de la même graine. Seuls les plats où on l'emploie changent un peu d'un pays à l'autre.",
      },
      {
        question: "L'akpi est-il piquant ?",
        reponse:
          "Non. Il n'apporte aucune chaleur : son goût rappelle la noisette grillée et il sert surtout à lier. Le piquant d'une marinade vient du piment ou du poivre qu'on lui associe.",
      },
    ],
  },
  "assaisonnement-jollof": {
    origine:
      "Le nom du riz jollof renvoie au Jolof, un royaume wolof qui dominait au Moyen Âge une partie de l'actuel Sénégal. On le rattache souvent au thiéboudienne sénégalais, dont il serait une variante diffusée le long des côtes d'Afrique de l'Ouest. Sa forme actuelle, avec la tomate, ne remonterait toutefois pas au-delà du XIXe siècle.\n\nAujourd'hui, Nigérians et Ghanéens se disputent avec humour le titre du meilleur jollof, sur les réseaux sociaux comme dans les fêtes de famille. La composition d'un mélange prêt à l'emploi varie selon la marque : l'étiquette fait foi.",
    choisir:
      "Lisez l'étiquette : certains mélanges contiennent du sel, d'autres non, ce qui change tout au moment d'assaisonner. Une poudre de couleur vive, à l'odeur franche, est récente.\n\nDans la boutique, le [berbéré](/produit/berbere) est lui aussi un mélange rouge, mais bien plus piquant et marqué par le fenugrec : il donnerait au riz un goût éthiopien. Pour garder la main sur la chaleur, associez l'assaisonnement jollof à un [piment pili-pili](/produit/piment-pili-pili) entier que l'on retire en fin de cuisson. N'oubliez pas que la belle couleur rouge du plat vient d'abord des tomates et des poivrons.",
    conserver:
      "Comme tous les mélanges en poudre, il craint l'humidité, qui le fait prendre en bloc. Refermez bien le sachet ou transvasez-le dans un pot à vis, rangé loin des plaques. S'il a durci, écrasez-le du dos d'une cuillère : il reste utilisable tant qu'il garde son parfum.",
    remplacer:
      "Une version maison courante associe un cube de bouillon, une feuille de laurier, une cuillère de curry doux et une pincée de thym séché. Un peu de gingembre râpé et d'ail frais apportent le reste. L'essentiel est ailleurs : une base tomate longuement réduite donne au jollof la plus grande partie de son goût.",
    enCuisine:
      "Notre [riz jollof](/recette/riz-jollof) suit la méthode nigériane, avec un riz long grain étuvé cuit dans la sauce tomate réduite. Pour comparer avec son cousin sénégalais, essayez le [thiéboudienne](/recette/thieboudienne) et lisez [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne) : les conseils sur la cuisson du riz valent aussi pour le jollof. Le [waakye](/recette/waakye) ghanéen montre une tout autre façon de colorer le riz.",
    faq: [
      {
        question: "Le jollof est-il nigérian ou ghanéen ?",
        reponse:
          "Les deux pays le revendiquent, mais son nom renvoie au Sénégal. Chacun a sa version : le jollof ghanéen se prépare souvent avec un riz parfumé, le nigérian avec un riz étuvé.",
      },
      {
        question: "Le mélange est-il piquant ?",
        reponse:
          "Cela dépend de la marque : regardez si le piment figure dans la composition. Dans le doute, cuisez le riz sans piment supplémentaire et servez une sauce pimentée à part.",
      },
    ],
  },
  maniguette: {
    origine:
      "La maniguette est la graine de l'Aframomum melegueta, une plante de la famille du gingembre qui pousse sur les côtes du golfe de Guinée. Au Moyen Âge, elle gagnait l'Europe par les routes du Sahara, sous le nom flatteur de graine de paradis, et servait souvent de substitut au poivre.\n\nAu XVe siècle, les Portugais allèrent la chercher par la mer : en 1469, le roi Alphonse V accorda au marchand lisboète Fernão Gomes le monopole du commerce dans le golfe de Guinée, maniguette comprise. Le littoral de l'actuel Liberia y gagna le nom de Côte des Graines, ou Côte du Poivre.",
    choisir:
      "Les gousses entières protègent mieux les graines que les graines vendues seules. À l'intérieur, celles-ci doivent être brun-rouge et dures. Écrasée entre les doigts, une graine fraîche libère aussitôt une odeur d'agrume.\n\nParmi les poivres de la boutique, c'est la plus vive. Le [poivre de Penja](/produit/poivre-de-penja) donne un piquant franc et neutre ; le [voatsiperifery](/produit/poivre-sauvage-voatsiperifery) est boisé et plus doux ; le [poivre de Selim](/produit/poivre-de-selim) s'infuse et apporte une note fumée. La maniguette se moud comme un poivre, mais son parfum citronné la destine plutôt aux grillades et aux plats de poisson.",
    conserver:
      "Laissez les graines dans leurs gousses jusqu'au dernier moment, et gardez le tout dans un bocal fermé, à l'abri de la chaleur. Ainsi protégée, elle reste parfumée bien plus longtemps qu'une fois moulue. Un moulin à poivre réservé à cet usage évite de mélanger les arômes.",
    remplacer:
      "Un poivre noir fraîchement moulu, relevé d'un zeste de citron râpé, rend à la fois son piquant et sa fraîcheur dans une grillade. Pour un plat mijoté, le poivre de Penja seul fait aussi l'affaire, avec moins de parfum mais un piquant comparable.",
    enCuisine:
      "Elle se moud au moment de servir sur le [poisson braisé et attiéké](/recette/poisson-braise-attieke), parfume les brochettes de [suya](/recette/suya) ou de [nyama choma](/recette/nyama-choma) et relève un [caldou de poisson](/recette/caldou). Pour cuire les brochettes à la maison, lisez [Comment griller des brochettes suya au four ?](/conseils/griller-des-brochettes-suya-au-four), puis dosez la maniguette comme vous le feriez d'un poivre.",
    faq: [
      {
        question: "Maniguette et cardamome, est-ce la même plante ?",
        reponse:
          "Non, mais elles sont cousines : toutes deux appartiennent à la famille du gingembre. La cardamome est plus florale, la maniguette plus poivrée.",
      },
      {
        question: "Pourquoi l'appelle-t-on graine de paradis ?",
        reponse:
          "Le nom remonte au commerce médiéval, quand les marchands européens vantaient ainsi une épice à l'origine lointaine et mystérieuse. Il est resté en français comme en anglais.",
      },
    ],
  },
  "essesse-sassas": {
    origine:
      "Au Cameroun, essessè est le nom sawa, c'est-à-dire celui des peuples de la côte, d'un fruit que l'on appelle aussi « quatre côtés ». Il s'agit de la gousse du Tetrapleura tetraptera, un arbre des forêts d'Afrique de l'Ouest et centrale. Longue et brun foncé, elle porte quatre arêtes saillantes sur toute sa longueur, d'où ce surnom.\n\nLe même fruit est connu au Ghana sous le nom de prekese et au Nigeria sous celui d'aidan, en yoruba. Dans l'ouest du Cameroun, il fait partie des épices de la sauce jaune qui accompagne le taro, un plat très chargé de sens dans cette région.",
    choisir:
      "En poudre, il s'emploie sans préparation ; la gousse entière, elle, se casse en morceaux qu'on fait cuire dans le bouillon avant de les retirer. Une poudre brune et odorante, sans trace d'humidité, est bon signe. Son parfum est fort : mieux vaut un petit sachet vite utilisé.\n\nOn le confond facilement avec le [pèbè](/produit/pebe-moulu), autre épice camerounaise en poudre. Le pèbè rappelle la muscade ; l'essessè est plus sucré, avec une touche fumée. Le [poivre de Selim](/produit/poivre-de-selim), lui aussi en gousse, a un parfum résineux bien différent.",
    conserver:
      "Gardez la poudre dans un bocal à fermeture hermétique : si le contenant reste ouvert, son arôme puissant se répand dans le placard et s'évapore en même temps. Placez-le à l'abri de la lumière et de la vapeur de cuisson. Les gousses entières se gardent encore plus longtemps, dans un sachet en papier glissé dans une boîte.",
    remplacer:
      "Une épicerie ghanéenne ou nigériane le propose parfois sous le nom de prekese ou d'aidan, en gousses entières : c'est le même fruit. Sinon, une pincée de quatre-épices donne une note douce et chaude au bouillon, sans reproduire son goût.",
    enCuisine:
      "Peu de recettes l'exigent, mais il trouve sa place dans les soupes de poisson ou de viande. Une pincée enrichit le bouillon de la [pepper soup de chèvre](/recette/pepper-soup), à côté du pèbè, ou la sauce du [mbongo tchobi](/recette/mbongo-tchobi). Il s'accorde aussi au [poivre de Penja](/produit/poivre-de-penja) dans un [kedjenou de poulet](/recette/kedjenou) cuit à l'étouffée. Pour mieux connaître la cuisine dont il vient, voyez la page [Cameroun](/pays/cameroun).",
    faq: [
      {
        question: "Pourquoi l'appelle-t-on « quatre côtés » ?",
        reponse:
          "Parce que la gousse entière porte quatre arêtes en relief sur toute sa longueur. Vue en coupe, elle dessine une petite croix.",
      },
      {
        question: "Peut-on mélanger essessè et pèbè ?",
        reponse:
          "Oui, ils se retrouvent souvent ensemble dans les épices à soupe camerounaises. Dosez-les tous deux avec légèreté pour que l'un ne masque pas l'autre.",
      },
    ],
  },
  "pebe-moulu": {
    origine:
      "Le pèbè est la graine du Monodora myristica, un arbre de la famille des annones qui pousse de la Sierra Leone jusqu'à l'Angola. Son fruit, une grosse boule ligneuse de dix à vingt centimètres de diamètre, ressemble à une petite calebasse, d'où son nom anglais de calabash nutmeg. À l'intérieur, de nombreuses graines allongées baignent dans une pulpe blanche parfumée.\n\nLes fruits sont surtout récoltés sur des arbres sauvages. On en retire les graines, que l'on sèche avant de les vendre entières ou moulues. Au Nigeria, on l'appelle ehuru ; au Cameroun, pèbè.",
    choisir:
      "Moulu, il doit être brun clair, sec et très odorant ; une poudre qui ne sent presque plus rien a vieilli. Les graines entières se gardent mieux, mais demandent un passage à la poêle puis au mortier.\n\nOn le confond souvent avec deux autres épices de la boutique. L'[essessè](/produit/essesse-sassas) vient d'une gousse au parfum plus sucré et fumé ; le [poivre de Selim](/produit/poivre-de-selim), issu lui aussi d'un arbre de la famille des annones, se présente en gousses sombres et résineuses. Le pèbè reste le plus proche de la muscade, en plus doux. Mêlé à l'[akpi](/produit/akpi-djansang), à l'ail et au gingembre, il compose une marinade classique pour le poisson.",
    conserver:
      "Une fois le sachet ouvert, la poudre s'évente plus vite que les graines. Versez-la dans un petit bocal en verre bien fermé et rangez-le dans un placard sombre. Si vous préférez les graines entières, gardez-les telles quelles et moulez-en une petite portion à la fois, au moulin à café ou au mortier.",
    remplacer:
      "La noix de muscade râpée reste le remplaçant le plus naturel ; prenez-en environ deux fois moins, car elle est plus puissante. Une pointe de cannelle et de clou de girofle peut compléter dans une soupe épicée, pour retrouver sa chaleur.",
    enCuisine:
      "Il parfume le bouillon de la [pepper soup de chèvre](/recette/pepper-soup) nigériane et entre dans le mélange d'épices grillées du [mbongo tchobi](/recette/mbongo-tchobi), la sauce noire camerounaise au poisson. Une pincée trouve aussi sa place dans la marinade du [poulet DG](/recette/poulet-dg) ou du [poisson braisé et attiéké](/recette/poisson-braise-attieke). Pour découvrir la cuisine qui l'emploie le plus, voyez la page [Cameroun](/pays/cameroun).",
    faq: [
      {
        question: "Le pèbè et la noix de muscade viennent-ils du même arbre ?",
        reponse:
          "Non. La muscade vient d'un arbre originaire d'Indonésie, sans parenté directe. Le pèbè lui ressemble par le goût, d'où son surnom de muscade africaine.",
      },
      {
        question: "Le pèbè est-il piquant ?",
        reponse:
          "Non, il est chaud et parfumé mais sans piquant. Dans une pepper soup, la chaleur vient du piment ; le pèbè, lui, donne au bouillon son parfum.",
      },
    ],
  },
};
