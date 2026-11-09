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
      "Peu de recettes l'exigent, mais il trouve sa place dans les soupes de poisson ou de viande. Une pincée enrichit le bouillon de la [pepper soup de chèvre](/recette/pepper-soup), à côté du pèbè, ou la sauce du [mbongo tchobi](/recette/mbongo-tchobi). Au Cameroun, on met aussi la gousse en morceaux, en petite quantité, dans les sauces au poisson et à la viande. Pour mieux connaître la cuisine dont il vient, voyez la page [Cameroun](/pays/cameroun).",
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
  "vanille-bourbon-de-madagascar": {
    origine:
      "La vanille vient du Mexique, où les Totonaques la cultivaient bien avant l'arrivée des Espagnols. Plantée ailleurs, l'orchidée fleurissait sans donner de fruits, faute de l'insecte qui la pollinise. En 1841, sur l'île Bourbon, l'actuelle Réunion, un garçon esclave de douze ans, Edmond Albius, mit au point un geste simple pour féconder chaque fleur à la main avec une fine baguette.\n\nLa technique gagna ensuite Madagascar. Le nom « bourbon » rappelle cette histoire : il désigne aujourd'hui la vanille de l'océan Indien. L'essentiel de la récolte malgache vient de la région SAVA, au nord-est, autour de Sambava, Antalaha, Vohémar et Andapa.",
    choisir:
      "Une belle gousse est noire et brillante, assez souple pour s'enrouler autour d'un doigt sans casser. Un fin givre blanc à sa surface n'est pas un défaut : c'est de la vanilline cristallisée, signe d'une gousse riche. Des taches grises et duveteuses, en revanche, trahissent une moisissure.\n\nC'est le seul produit franchement sucré parmi les épices de la boutique. Elle partage avec le [poivre sauvage voatsiperifery](/produit/poivre-sauvage-voatsiperifery) son origine malgache, et les deux s'accordent très bien sur un fruit rôti. Elle parfume aussi volontiers une boisson à base de [fleurs de bissap](/produit/fleurs-de-bissap).",
    conserver:
      "Le froid humide du réfrigérateur favorise les moisissures et durcit les gousses. Gardez-les plutôt dans leur tube ou dans un bocal en verre bien fermé, dans un placard à température stable, et ouvrez-le de temps en temps pour vérifier leur souplesse. Une gousse un peu sèche se réhydrate en quelques minutes dans du lait tiède.",
    remplacer:
      "L'extrait de vanille pure est le meilleur remplaçant : une cuillère à café correspond à peu près à une gousse dans une crème. L'arôme ou le sucre vanilliné, souvent à base de vanilline de synthèse, donne un goût plus plat. Pour un dessert de mil ou de riz, une pincée de muscade ou de cannelle change l'accent sans décevoir.",
    enCuisine:
      "Le [dégué](/recette/degue) burkinabè, mil et lait caillé, en demande un peu, tout comme son cousin sénégalais, le [thiakry](/recette/thiakry), qui la supporte très bien. Quelques graines grattées dans le [jus de bissap](/recette/jus-de-bissap) remplacent la fleur d'oranger, une variante courante au Sénégal. Pour découvrir la cuisine de son île, voyez la page [Madagascar](/pays/madagascar).",
    faq: [
      {
        question: "Pourquoi la vanille demande-t-elle autant de travail ?",
        reponse:
          "Chaque fleur ne s'ouvre qu'un jour et doit être fécondée à la main ce jour-là. Les gousses demandent ensuite plusieurs mois de préparation avant d'être prêtes.",
      },
      {
        question: "Vanille bourbon et vanille de Tahiti, quelle différence ?",
        reponse:
          "Ce sont deux espèces différentes. La bourbon (Vanilla planifolia) est ronde et chaude ; la tahitensis, plus florale, évoque l'anis et les fruits.",
      },
    ],
  },
  "sauce-peri-peri": {
    origine:
      "Le nom vient du petit piment africain, appelé piri-piri par les Portugais. Ce sont eux qui, dans leurs anciennes colonies d'Afrique australe, ont associé ce piment à l'ail, au citron et au vinaigre pour mariner le poulet. L'Angola revendique aussi la sauce, mais c'est au Mozambique que le poulet grillé au piri-piri est devenu un classique.\n\nAprès l'indépendance du Mozambique, en 1975, de nombreux Portugais du pays se sont installés en Afrique du Sud avec leurs recettes. L'orthographe peri-peri vient de là, et des chaînes de restaurants sud-africaines ont ensuite fait connaître la sauce dans le monde entier.",
    choisir:
      "Les sauces vendues sous ce nom vont du doux au très fort : repérez le niveau de piquant indiqué sur l'étiquette avant d'en napper tout un plat. Une sauce où le piment figure en tête de liste sera plus franche.\n\nElle est la version prête à l'emploi du [piment pili-pili](/produit/piment-pili-pili), qui donne la chaleur sans l'acidité. La [harissa artisanale](/produit/harissa-artisanale), pâte de piment d'Afrique du Nord parfumée au carvi et à la coriandre, est plus épaisse et sans citron : elle convient mieux à un couscous qu'à une grillade acidulée.",
    conserver:
      "Fermée, la bouteille se garde dans un placard jusqu'à la date indiquée. Ouverte, elle passe au réfrigérateur, goulot essuyé et bouchon bien vissé. Ne trempez jamais dans la bouteille le pinceau qui a touché le poulet cru : versez d'abord la quantité utile dans un bol à part.",
    remplacer:
      "Pour une version express, écrasez un ou deux piments pili-pili avec une gousse d'ail et du sel, puis détendez avec du jus de citron et un filet d'huile d'olive. Laissez reposer une demi-heure pour que le piment infuse. Ce n'est pas tout à fait la sauce en bouteille, mais l'esprit y est.",
    enCuisine:
      "Elle est à son aise sur le gril : badigeonnez-en les brochettes du [nyama choma](/recette/nyama-choma) kényan ou du [suya](/recette/suya) nigérian en fin de cuisson. Elle relève aussi le [chakalaka](/recette/chakalaka), la sauce de légumes épicée d'Afrique du Sud. Pour éviter qu'elle ne brûle au four, lisez [Comment griller des brochettes suya au four ?](/conseils/griller-des-brochettes-suya-au-four), et pour le pays qui l'a rendue célèbre, la page [Afrique du Sud](/pays/afrique-du-sud).",
    faq: [
      {
        question: "Peri-peri, piri-piri, pili-pili : quelle différence ?",
        reponse:
          "Aucune sur le fond : ce sont trois façons d'écrire le nom du même petit piment. Peri-peri est la graphie sud-africaine, piri-piri la portugaise.",
      },
      {
        question: "La sauce peri-peri est-elle très forte ?",
        reponse:
          "Elle pique franchement, mais le citron et le vinaigre font passer la chaleur. Mélangée à de la crème fraîche, elle devient accessible à toute la table.",
      },
    ],
  },
  "poivre-sauvage-voatsiperifery": {
    origine:
      "Son nom malgache associe voa, « fruit », à tsiperifery, le nom de la liane qui le porte. Cette cousine du poivrier grimpe sur les grands arbres des forêts humides de l'est et du sud de Madagascar et peut atteindre une quinzaine de mètres. Les baies poussent surtout sur les jeunes rameaux, souvent à dix mètres du sol ou plus.\n\nLa cueillette est donc acrobatique et la récolte reste très modeste. Certains cueilleurs coupent la liane au lieu de grimper, ce qui menace la plante : la fondation Slow Food l'a inscrite à son Arche du goût, qui recense les produits en danger de disparition.",
    choisir:
      "Les baies entières, brun foncé, portent encore leur petite queue, qui vaut à ce poivre le surnom de poivre à queue. Un sachet très parfumé, aux notes d'agrume et de bois, est récent.\n\nIl se place à l'opposé du [poivre de Penja](/produit/poivre-de-penja) : le Penja est net et franc, le voatsiperifery plus doux et plus aromatique. La [maniguette](/produit/maniguette) partage ses notes citronnées, avec un piquant plus vif. Le [poivre de Selim](/produit/poivre-de-selim), enfin, s'infuse dans les bouillons au lieu de se moudre sur l'assiette.",
    conserver:
      "Comme tous les poivres, il se garde en grains entiers, dans un bocal fermé, loin de la lumière et de la chaleur. Ne remplissez pas tout le moulin d'un coup : des baies laissées dans un moulin transparent, près d'une fenêtre, perdent leur parfum frais bien plus vite. Moulu, il s'évente en peu de temps.",
    remplacer:
      "Un mélange de poivre noir et de quelques baies roses s'approche de son côté fruité. Le poivre de Penja convient pour la force, mais il lui manque la fraîcheur d'agrume ; un zeste de citron vert râpé au même moment compense en partie.",
    enCuisine:
      "Moulu au dernier moment, il réveille un [romazava](/recette/romazava), le bouillon de viande et de brèdes de Madagascar, ou le poisson du [caldou](/recette/caldou) sénégalais. Il s'accorde aussi au poulet du [kedjenou](/recette/kedjenou) et aux bananes du [matoke](/recette/matoke) ougandais. Sur une salade de mangue ou d'ananas, avec un peu de [vanille bourbon](/produit/vanille-bourbon-de-madagascar), il fait un dessert tout simple. Voyez aussi la page [Madagascar](/pays/madagascar).",
    faq: [
      {
        question: "Pourquoi les baies ont-elles une queue ?",
        reponse:
          "C'est le petit pédoncule qui les reliait à l'épi. Il se broie avec le grain et ne change rien au goût.",
      },
      {
        question: "Le voatsiperifery est-il un vrai poivre ?",
        reponse:
          "Oui, il appartient au même genre que le poivre noir, Piper. Il pousse simplement à l'état sauvage, sur une liane propre à l'océan Indien.",
      },
    ],
  },
  "feuilles-de-ndole": {
    origine:
      "Le ndolé est d'abord le plat des Sawa, les peuples de la côte camerounaise autour de Douala, avant de devenir un symbole de tout le pays, souvent présenté comme plat national. Ses feuilles viennent de plusieurs espèces de vernonia, des arbustes de la famille des marguerites : Vernonia amygdalina, très amère, appelée bitterleaf en anglais, et des espèces plus douces comme Vernonia hymenolepis.\n\nFraîches, les feuilles se lavent et se pressent longuement avant la cuisson. Séchées, elles voyagent et se gardent des mois, ce qui permet de cuisiner le ndolé loin du Cameroun.",
    choisir:
      "Les feuilles séchées doivent être vertes, pas brunes, et sans poussière. Lisez l'emballage : certaines ont déjà perdu une partie de leur amertume, d'autres demandent plusieurs rinçages.\n\nParmi les feuilles de la boutique, le ndolé est la plus amère. Les [feuilles de manioc](/produit/feuilles-de-manioc) pilées donnent une sauce plus douce et plus verte, cuite à l'huile de palme ; les [feuilles de moringa](/produit/feuilles-de-moringa) ont un goût herbacé léger et cuisent en quelques minutes. Le ndolé, lui, appelle la [pâte d'arachide](/produit/pate-d-arachide) ou des arachides fraîches pour équilibrer son caractère.",
    conserver:
      "Fermé, le sachet se range dans un placard sec. Une fois ouvert, transvasez les feuilles dans une boîte hermétique : elles reprennent vite l'humidité de la cuisine. Réhydratées et pressées, elles se gardent deux jours au réfrigérateur ou se congèlent en portions. Plus de détails dans [Comment conserver les feuilles séchées ?](/conseils/conserver-feuilles-sechees).",
    remplacer:
      "Des épinards associés à une poignée de roquette ou de feuilles de pissenlit reproduisent l'équilibre entre douceur et amertume. Le plat sera moins typé, mais la sauce d'arachide fera le reste. Notre article [Par quoi remplacer les feuilles de ndolé ?](/conseils/par-quoi-remplacer-les-feuilles-de-ndole) passe en revue les options.",
    enCuisine:
      "Notre [ndolé aux crevettes](/recette/ndole) en donne la version classique, avec arachides, viande et [crevettes séchées](/produit/crevettes-sechees). Au Cameroun, on le sert avec du plantain frit, du miondo ou du riz. Avant de commencer, lisez [Comment enlever l'amertume du ndolé ?](/conseils/enlever-amertume-du-ndole) : c'est l'étape qui fait la différence. Pour aller plus loin, voyez la page [Cameroun](/pays/cameroun).",
    faq: [
      {
        question: "Les feuilles de ndolé sont-elles toujours amères ?",
        reponse:
          "Oui, c'est leur caractère. Le lavage et la cuisson en retirent une grande partie, et la sauce aux arachides arrondit ce qui reste.",
      },
      {
        question: "Peut-on préparer le ndolé à l'avance ?",
        reponse:
          "Oui, il est même souvent meilleur le lendemain, une fois les saveurs fondues. Réchauffez-le doucement avec un peu d'eau.",
      },
    ],
  },
  "feuilles-de-manioc": {
    origine:
      "Le manioc est arrivé d'Amérique du Sud avec les navires portugais au XVIe siècle, et l'Afrique centrale a appris à en manger aussi les feuilles. Pilées au mortier, elles donnent le pondu de RD Congo, appelé saka-saka au Congo-Brazzaville, le ravitoto de Madagascar et bien d'autres sauces vertes, de la Sierra Leone à la Tanzanie.\n\nCrues, les feuilles contiennent des composés qui libèrent de l'acide cyanhydrique. C'est pourquoi on les cuit toujours longuement, dans une marmite découverte, avant de les manger.",
    choisir:
      "En conserve ou en bocal, les feuilles sont déjà pilées et souvent précuites : vérifiez sur l'étiquette le temps de cuisson conseillé, qui varie beaucoup d'une marque à l'autre. On en trouve aussi surgelées dans les épiceries africaines.\n\nComparées au [ndolé](/produit/feuilles-de-ndole), elles sont douces, sans amertume. Les [feuilles de moringa](/produit/feuilles-de-moringa) cuisent bien plus vite mais donnent moins de corps. Le pondu réclame de l'[huile de palme rouge](/produit/huile-de-palme-rouge), et un [mortier en bois](/produit/mortier-et-pilon-en-bois) reste utile pour piler l'ail, l'oignon et le piment qu'on y ajoute.",
    conserver:
      "Une boîte entamée ne se garde pas dans son métal : transvasez le reste dans un récipient en verre fermé, au réfrigérateur, et cuisinez-le dans les deux jours. Le pondu cuit, lui, se congèle très bien en portions et se réchauffe à feu doux avec un peu d'eau.",
    remplacer:
      "Des épinards hachés finement, cuits avec un peu d'oseille ou de feuilles de patate douce, s'en rapprochent par la couleur et la texture. Le goût sera plus léger. Avec l'huile de palme et le poisson fumé, le plat garde pourtant son caractère.",
    enCuisine:
      "Notre [pondu au poisson fumé](/recette/pondu) mijote longuement à l'huile de palme. Le [ravitoto sy henakisoa](/recette/ravitoto) malgache associe les mêmes feuilles à la viande de porc et se sert avec du riz. Le pondu accompagne volontiers la [chikwangue](/produit/chikwangue) ou un foufou ; pour la bonne marmite, lisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Faut-il recuire les feuilles en conserve ?",
        reponse:
          "Oui, suivez le temps indiqué sur l'emballage. Même précuites, elles gagnent à mijoter avec les aromates pour prendre le goût de la sauce.",
      },
      {
        question: "Pondu et saka-saka, est-ce le même plat ?",
        reponse:
          "Oui : pondu est le nom courant en RD Congo, saka-saka celui du Congo-Brazzaville. Les recettes varient surtout d'une famille à l'autre.",
      },
    ],
  },
  "fleurs-de-bissap": {
    origine:
      "Ce que l'on appelle fleurs de bissap sont en réalité les calices charnus qui entourent le fruit de l'Hibiscus sabdariffa, aussi nommé oseille de Guinée. Chaque pays leur donne son nom : bissap au Sénégal, au Burkina Faso et en Côte d'Ivoire, wonjo en Gambie, foléré au Cameroun, zobo au Nigeria, sobolo au Ghana, karkadé en Égypte et au Soudan.\n\nLa boisson a voyagé bien au-delà du continent. On la boit sous le nom de sorrel dans les Caraïbes, où elle accompagne les fêtes de Noël, et sous celui d'agua de Jamaica au Mexique.",
    choisir:
      "Choisissez des calices entiers, d'un rouge sombre presque violet, secs et cassants, sans poussière ni brindilles. Les calices brisés colorent plus vite mais donnent une boisson plus trouble.\n\nPour d'autres boissons fraîches, la boutique propose l'[infusion de gingembre](/produit/infusion-de-gingembre), plus piquante, et l'[infusion de tamarin](/produit/infusion-de-tamarin), au goût acidulé. La [poudre de baobab](/produit/poudre-de-baobab) sert à une autre boisson sénégalaise, le bouye, plus épaisse et lactée. Le bissap reste la plus colorée et la plus simple à préparer.",
    conserver:
      "Les calices séchés se gardent de longs mois dans un bocal bien fermé, à l'abri de la lumière qui ternit leur couleur. Le jus préparé se conserve deux à trois jours au réfrigérateur, en bouteille fermée ; au-delà, il commence à fermenter et prend un goût piquant.",
    remplacer:
      "Les fleurs d'hibiscus vendues en herboristerie pour les infusions sont souvent la même plante : vérifiez le nom latin, Hibiscus sabdariffa, sur l'emballage. Pour une boisson rouge acidulée sans hibiscus, un mélange de jus de cranberry et de grenade, parfumé à la menthe, rappelle la couleur, pas le goût.",
    enCuisine:
      "Notre [jus de bissap](/recette/jus-de-bissap) donne les proportions pour une carafe, avec menthe et sucre. Il accompagne parfaitement un [thiéboudienne](/recette/thieboudienne) ou un [poulet yassa](/recette/poulet-yassa). Toutes les astuces sont dans [Comment préparer le bissap ?](/conseils/comment-preparer-le-bissap), et l'article [Par quelle recette africaine commencer quand on débute ?](/conseils/par-quelle-recette-commencer) le cite parmi les premiers essais.",
    faq: [
      {
        question: "Infusion chaude ou froide : laquelle choisir ?",
        reponse:
          "À froid, une nuit au réfrigérateur, le goût est plus doux et moins âpre. À chaud, la boisson est prête bien plus vite, avec une couleur plus intense.",
      },
      {
        question: "Peut-on réutiliser les calices ?",
        reponse:
          "Oui, une seconde infusion donne une boisson plus légère. Les calices épuisés peuvent ensuite servir pour une confiture ou une sauce.",
      },
    ],
  },
  "gombo-seche": {
    origine:
      "Le gombo est une plante de la famille des mauves, cultivée depuis des siècles en Afrique ; son berceau se situerait du côté de l'Éthiopie, même si les botanistes en débattent encore. Il a traversé l'Atlantique avec la traite, et ses noms en gardent la trace : okra viendrait de l'igbo ókùrù, gombo d'une langue bantoue d'Angola, le kimbundu. Le gumbo de Louisiane lui doit aussi son nom.\n\nSéché puis moulu, il permet de préparer la sauce gombo quand les fruits frais manquent, par exemple pendant la saison sèche au Sahel.",
    choisir:
      "La poudre doit être vert pâle à vert olive, fine et sèche. Une teinte brune signale un gombo vieilli, qui filera moins. Le gombo frais ou surgelé donne des rondelles croquantes ; la poudre offre une sauce lisse et homogène.\n\nPour lier une sauce, il joue un autre rôle que l'[egusi](/produit/graines-d-egusi), qui épaissit en formant des flocons, ou que la [pâte d'arachide](/produit/pate-d-arachide), qui donne une sauce grasse. Le gombo rend la sauce filante, une texture recherchée au Sahel. Il s'associe souvent au [soumbala](/produit/soumbala), qui lui apporte de la profondeur.",
    conserver:
      "Rangez la poudre dans un bocal parfaitement sec : au contact de l'humidité, elle devient collante et forme des grumeaux, exactement comme dans la sauce. Utilisez une cuillère sèche et ouvrez le bocal loin de la vapeur de la marmite. Ainsi protégée, elle se garde plusieurs mois.",
    remplacer:
      "Du gombo frais ou surgelé, coupé en fines rondelles, fait évidemment l'affaire, avec une cuisson un peu plus longue. Des feuilles de corète, appelées ademe au Togo ou ewedu au Nigeria, filent elles aussi. D'autres pistes figurent dans [Par quoi remplacer le gombo ?](/conseils/par-quoi-remplacer-le-gombo).",
    enCuisine:
      "Il donne sa texture à la [sauce gombo du tô](/recette/to-sauce-gombo), servie au Burkina Faso avec une pâte de mil ou de maïs ; pour le tô, prenez de la [farine de maïs blanc](/produit/farine-de-mais-blanc). Notre article [Comment réussir une sauce gombo qui file ?](/conseils/sauce-gombo-qui-file) explique comment obtenir la bonne consistance. Une cuillère de poudre peut aussi lier une [fufu light soup](/recette/fufu-light-soup) trop liquide.",
    faq: [
      {
        question: "Pourquoi la sauce gombo file-t-elle ?",
        reponse:
          "Le gombo contient un mucilage, une substance qui gonfle dans le liquide chaud et le rend visqueux. C'est voulu : cette texture aide à saisir la sauce avec la boule de tô.",
      },
      {
        question: "Comment éviter les grumeaux ?",
        reponse:
          "Délayez d'abord la poudre dans un peu de bouillon tiède, puis versez ce mélange dans la marmite en remuant sans cesse.",
      },
    ],
  },
  "feuilles-de-moringa": {
    origine:
      "Le moringa (Moringa oleifera) est originaire des contreforts de l'Himalaya, dans le nord de l'Inde. Il s'est répandu dans toute la zone tropicale, et l'Afrique de l'Ouest l'a adopté pour sa robustesse : coupé ou brûlé par le soleil, il repart aux premières pluies.\n\nAu Sénégal, on l'appelle nébédaye. Selon une explication souvent citée, ce nom viendrait de l'anglais never die, « qui ne meurt jamais », mais l'étymologie reste discutée. En Inde, on cuisine surtout ses longues gousses, les drumsticks ; en Afrique de l'Ouest, plutôt ses petites feuilles.",
    choisir:
      "Des feuilles séchées d'un vert franc, entières ou en brisures, gardent leur goût ; une couleur jaunie trahit un produit ancien. La poudre fine convient aux sauces, les feuilles entières aux couscous où on aime les voir.\n\nParmi les feuilles de la boutique, c'est la plus rapide à cuire et la plus douce. Le [ndolé](/produit/feuilles-de-ndole) est franchement amer et demande des rinçages ; les [feuilles de manioc](/produit/feuilles-de-manioc) exigent une longue cuisson. Le moringa, lui, se contente de quelques minutes en fin de préparation.",
    conserver:
      "Le moringa séché craint la lumière autant que l'humidité : elle fait virer sa couleur au jaune. Un bocal opaque ou une boîte métallique bien fermée, rangée dans un placard, lui convient parfaitement. Voyez aussi nos conseils dans [Comment conserver les feuilles séchées ?](/conseils/conserver-feuilles-sechees).",
    remplacer:
      "Des épinards frais hachés finement, ajoutés en fin de cuisson, donnent une couleur et une douceur proches. Pour le thiéré mbuum, quelques feuilles de persil plat et de blettes conviennent aussi. Le goût herbacé du moringa, légèrement poivré comme le cresson, sera simplement moins présent.",
    enCuisine:
      "Le [thiéré mbuum](/recette/thiere-mbuum) sénégalais associe ses feuilles à l'arachide et au [couscous de mil](/produit/couscous-de-mil) ; pour réussir la graine, lisez [Comment cuire le couscous de mil ?](/conseils/cuire-le-couscous-de-mil). Une poignée de feuilles réhydratées enrichit aussi une [sauce gombo](/recette/to-sauce-gombo) ou un [pondu](/recette/pondu) en fin de cuisson. D'autres idées de feuilles figurent dans [Par quoi remplacer les feuilles de ndolé ?](/conseils/par-quoi-remplacer-les-feuilles-de-ndole).",
    faq: [
      {
        question: "Faut-il faire tremper les feuilles de moringa ?",
        reponse:
          "Pour les feuilles entières, un court bain d'eau tiède suffit. La poudre, elle, se verse directement dans la sauce.",
      },
      {
        question: "Le moringa a-t-il un goût fort ?",
        reponse:
          "Non. Il est herbacé, avec une pointe poivrée qui rappelle le cresson, et se marie très bien à l'arachide.",
      },
    ],
  },
  "feuilles-de-sorgho": {
    origine:
      "Le waakye est né dans le nord du Ghana et s'est répandu avec les communautés haoussa installées dans les quartiers zongo du sud du pays. C'est aujourd'hui l'un des plats de rue les plus populaires du Ghana, d'Accra à Tamale.\n\nSa couleur vient des feuilles séchées d'une variété de sorgho rouge, la céréale que l'on cultive aussi pour ses grains dans tout le Sahel. Bouillies avec les haricots puis le riz, elles libèrent un pigment brun-rouge qui teinte les grains. Elles ne se mangent pas et servent uniquement à colorer et parfumer.",
    choisir:
      "Les feuilles doivent être sèches, d'un rouge brun profond, sans moisissure. Plus elles sont foncées, plus elles colorent. Une petite poignée suffit pour une grande marmite : le paquet dure longtemps.\n\nElles n'ont rien de commun avec les autres feuilles de la boutique. Le [ndolé](/produit/feuilles-de-ndole), le [moringa](/produit/feuilles-de-moringa) ou le [manioc](/produit/feuilles-de-manioc) sont des légumes ; le sorgho est un colorant, un peu comme un sachet de thé. Les [fleurs de bissap](/produit/fleurs-de-bissap) teintent aussi, mais en rouge vif et avec leur acidité.",
    conserver:
      "Gardez-les dans un sac fermé ou une boîte, dans un placard sec et loin de la vapeur. Elles ne craignent presque rien d'autre que l'humidité, qui les ferait moisir, et se conservent ainsi très longtemps. Pour plus de conseils, lisez [Comment conserver les feuilles séchées ?](/conseils/conserver-feuilles-sechees).",
    remplacer:
      "Sans feuilles, beaucoup de cuisiniers ajoutent une pointe de bicarbonate de soude à l'eau de cuisson : il fonce les haricots et donne une teinte proche. Le parfum sera absent et la nuance moins rouge. Quelques calices de bissap colorent davantage, mais leur acidité change le goût du plat.",
    enCuisine:
      "Notre [waakye](/recette/waakye) détaille la cuisson du riz et des haricots avec les feuilles. Pour un repas ghanéen complet, ajoutez des [kelewele](/recette/kelewele), bananes plantains frites et épicées, ou préparez une [groundnut soup](/recette/groundnut-soup) un autre jour. Pour comparer avec un autre riz coloré d'Afrique de l'Ouest, essayez le [riz jollof](/recette/riz-jollof), et pour la cuisine dont il vient, voyez la page [Ghana](/pays/ghana).",
    faq: [
      {
        question: "Les feuilles de sorgho donnent-elles du goût ?",
        reponse:
          "Un peu : un léger parfum végétal, presque de thé. Leur rôle principal reste la couleur.",
      },
      {
        question: "Quand ajouter les feuilles ?",
        reponse:
          "Dès le début, avec les haricots, pour qu'elles aient le temps de teinter l'eau avant l'arrivée du riz.",
      },
    ],
  },
  "huile-de-palme-rouge": {
    origine:
      "Le palmier à huile, Elaeis guineensis, est originaire d'Afrique de l'Ouest, où son huile est utilisée depuis des temps très anciens. L'huile rouge est extraite de la pulpe orangée des fruits ; il ne faut pas la confondre avec l'huile de palmiste, tirée de l'amande. Sa couleur vient de sa richesse en caroténoïdes, les pigments de la carotte.\n\nLe raffinage industriel retire ces pigments et le goût : c'est l'huile de palme pâle de l'industrie alimentaire. L'huile rouge, non raffinée, garde au contraire son parfum fruité et sa couleur, qui teinte les sauces de toute l'Afrique de l'Ouest et centrale.",
    choisir:
      "Une bonne huile rouge est d'un orange profond, au parfum de fruit et de noisette. Elle devient pâteuse dès que la cuisine se rafraîchit, ce qui ne dit rien de sa qualité.\n\nElle ne fait pas double emploi avec la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) ni avec la [base de soupe de noix de palme](/produit/base-soupe-noix-de-palme). Ces deux-là sont des concentrés de fruit, qui épaississent la sauce graine ou la palm nut soup ; l'huile est une matière grasse de cuisson, pour faire revenir et parfumer. L'article [Quelle différence entre huile de palme rouge et raffinée ?](/conseils/huile-de-palme-rouge-ou-raffinee) détaille le reste.",
    conserver:
      "Inutile de la mettre au réfrigérateur, où elle durcirait comme du beurre. Gardez le pot bien fermé, dans un placard sombre, car la lumière fait pâlir sa couleur et rancir son goût. Si elle s'est solidifiée, posez le récipient quelques minutes dans de l'eau chaude.",
    remplacer:
      "Aucune huile ne l'imite vraiment. Une huile neutre dans laquelle on a fait infuser des graines de roucou, ou teintée d'un peu de paprika doux, donne la couleur ; la pulpe de noix de palme apporte en plus le goût du fruit. Notre article [Par quoi remplacer l'huile de palme rouge ?](/conseils/remplacer-huile-de-palme-rouge) compare les solutions.",
    enCuisine:
      "Elle est la base du [pondu au poisson fumé](/recette/pondu), de l'[eru](/recette/eru) et du [koki](/recette/koki) camerounais, ce gâteau de haricots cuit à la vapeur. Elle colore aussi la [soupe egusi](/recette/soupe-egusi), le [poulet à l'odika](/recette/poulet-odika) du Gabon et le [mbongo tchobi](/recette/mbongo-tchobi). Pour les sauces les plus longues, lisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces).",
    faq: [
      {
        question: "Pourquoi mon huile de palme est-elle solide ?",
        reponse:
          "Parce qu'elle contient beaucoup de graisses qui se figent dès qu'il fait frais. Elle redevient liquide en chauffant, sans rien perdre.",
      },
      {
        question: "Huile de palme rouge et huile de palmiste, quelle différence ?",
        reponse:
          "La première vient de la pulpe du fruit, la seconde de son amande. L'huile de palmiste, plus claire, n'a pas le même goût et ne remplace pas l'huile rouge dans les sauces.",
      },
    ],
  },
  "pate-d-arachide": {
    origine:
      "L'arachide vient d'Amérique du Sud, du pied des Andes orientales. Les Portugais l'ont introduite sur la côte occidentale de l'Afrique au XVIe siècle, et elle s'y est cultivée très tôt. Au XIXe siècle, le Sénégal en a fait une grande culture d'exportation, dans le bassin arachidier du centre-ouest du pays, autour de Kaolack, Diourbel et Thiès.\n\nGrillée puis broyée, la graine est devenue la base d'innombrables sauces : mafé au Mali et au Sénégal, groundnut soup au Ghana, luwombo en Ouganda. Elle entre même dans certains desserts, comme le ngalakh des Pâques sénégalaises.",
    choisir:
      "Lisez la composition : la meilleure pâte ne contient que des arachides grillées, éventuellement un peu de sel. Les beurres de cacahuète faits pour la tartine renferment souvent du sucre et des huiles ajoutées, qui donnent un mafé trop doux. Une pâte bien torréfiée est brun foncé et sent la cacahuète grillée.\n\nElle ne joue pas le même rôle que la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme), autre base de sauce, plus fruitée et plus orangée. L'[egusi](/produit/graines-d-egusi) et l'[akpi](/produit/akpi-djansang) épaississent aussi, mais avec un autre goût : l'arachide donne la sauce la plus ronde et la plus onctueuse.",
    conserver:
      "Fermé, le pot se garde à température ambiante jusqu'à sa date. Ouvert, il reste dans un placard frais s'il est vite utilisé ; pour un usage espacé, le réfrigérateur ralentit le rancissement, au prix d'une pâte plus ferme. Les durées exactes sont dans [Combien de temps se garde la pâte d'arachide ouverte ?](/conseils/combien-de-temps-se-garde-la-pate-d-arachide).",
    remplacer:
      "Un beurre de cacahuète nature, dont l'étiquette ne mentionne que des arachides, fait un très bon remplaçant. À défaut, des arachides grillées non salées, mixées longuement avec un filet d'huile, donnent une pâte maison. Pour une personne allergique, une purée de graines de tournesol ou de sésame garde une sauce onctueuse, avec un autre goût.",
    enCuisine:
      "Elle fait le [mafé de bœuf](/recette/mafe), la [groundnut soup](/recette/groundnut-soup) ghanéenne et le [luwombo de poulet](/recette/luwombo) ougandais. On la retrouve dans le [thiéré mbuum](/recette/thiere-mbuum), le [fonio aux légumes et sauce arachide](/recette/fonio-aux-legumes), le [poulet à la moambé](/recette/moambe) et le [ngalakh](/recette/ngalakh). Si la sauce reste trop liquide, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide).",
    faq: [
      {
        question: "Pourquoi ma sauce arachide accroche-t-elle au fond ?",
        reponse:
          "La pâte brûle facilement. Baissez le feu et remuez régulièrement, surtout en fin de cuisson, quand la sauce épaissit.",
      },
      {
        question: "Pourquoi de l'huile remonte-t-elle à la surface de la sauce ?",
        reponse:
          "C'est le signe que l'arachide est cuite : sa matière grasse se sépare et vient napper la sauce. On peut en retirer une partie à la cuillère si on la trouve trop riche.",
      },
    ],
  },
  "pulpe-de-noix-de-palme": {
    origine:
      "Les noix de palme sont les fruits du palmier à huile, de petites drupes rouge orangé groupées en lourds régimes. Pour en tirer la pulpe, on les fait bouillir, on les pile au mortier, puis on les malaxe dans l'eau chaude pour séparer la chair des noyaux et des fibres. Le jus épais obtenu forme la base de la sauce.\n\nCette préparation change de nom avec les pays : sauce graine en Côte d'Ivoire, où « graine » désigne la noix de palme, abenkwan chez les Akan du Ghana, banga chez les Urhobo du delta du Niger, mbanga au Cameroun, nyembwe au Gabon.",
    choisir:
      "Une bonne pulpe est épaisse, d'un orange vif, et sent le fruit. Vérifiez l'étiquette : certaines contiennent un peu de sel ou d'eau ajoutée. Le grand format convient à ceux qui cuisinent souvent la sauce graine ; pour une seule marmite, la petite [base de soupe de noix de palme](/produit/base-soupe-noix-de-palme), plus fluide, est plus pratique.\n\nÀ ne pas confondre avec l'[huile de palme rouge](/produit/huile-de-palme-rouge) : l'huile sert à cuire, alors que la pulpe constitue la sauce elle-même. En réduisant, elle libère sa propre matière grasse, si bien qu'on n'ajoute en général aucune huile.",
    conserver:
      "Une grande boîte entamée ne se finit pas toujours en une fois. Répartissez le reste dans de petites boîtes ou un bac à glaçons et congelez-le : chaque portion suffira pour une sauce. Au réfrigérateur, dans un récipient en verre fermé, elle ne tient que quelques jours.",
    remplacer:
      "Sans pulpe, on peut revenir à la méthode d'origine avec des noix de palme fraîches ou surgelées, bouillies puis pilées : comptez une bonne heure de travail en plus. En dernier recours, de l'huile de palme rouge liée d'un peu de pâte d'arachide donne une sauce colorée, mais bien différente. Voyez aussi [Par quoi remplacer l'huile de palme rouge ?](/conseils/remplacer-huile-de-palme-rouge).",
    enCuisine:
      "Elle fait la [sauce graine au poulet](/recette/sauce-graine) ivoirienne, le [poulet nyembwe](/recette/poulet-nyembwe) du Gabon et le [poulet à la moambé](/recette/moambe) congolais. Ces sauces mijotent longtemps : lisez [Quelle marmite pour mijoter les sauces africaines ?](/conseils/quelle-marmite-pour-les-sauces) avant de vous lancer, et [Quelle différence entre huile de palme rouge et raffinée ?](/conseils/huile-de-palme-rouge-ou-raffinee) pour bien distinguer les produits du palmier.",
    faq: [
      {
        question: "Comment savoir si la sauce graine est cuite ?",
        reponse:
          "Quand une fine couche d'huile rouge recouvre la surface et que la sauce nappe la cuillère. Il faut en général plus d'une heure de mijotage.",
      },
      {
        question: "Faut-il ajouter de l'huile à la pulpe ?",
        reponse:
          "Non. La pulpe contient déjà sa matière grasse, qui se libère pendant la cuisson et suffit largement.",
      },
    ],
  },
  "base-soupe-noix-de-palme": {
    origine:
      "Au Ghana, la soupe de noix de palme s'appelle abenkwan chez les Akan et dedetsi dans la région de la Volta. On la sert avec un foufou ou avec l'omo tuo, des boules de riz écrasé, garnie de poisson fumé, de crabe ou de viande de chèvre.\n\nAu Nigeria voisin, la même base donne le banga des Urhobo, dans le delta du Niger, et l'ofe akwu des Igbo, servi sur du riz. Préparée à la maison, la pulpe demande de faire bouillir, piler et presser les fruits du palmier : la conserve épargne ce travail sans changer la nature de la soupe.",
    choisir:
      "Lisez la composition : une base ghanéenne contient le plus souvent la seule pulpe de noix de palme, parfois avec du sel. Le petit format correspond à une marmite familiale, sans reste à conserver.\n\nPar rapport à la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) en grande boîte, plus concentrée, elle est plus liquide et se délaye plus vite. Elle ne remplace pas l'[huile de palme rouge](/produit/huile-de-palme-rouge), matière grasse de cuisson des sauces de feuilles. Pour une soupe au goût fumé, associez-la à du poisson fumé ou à des [crevettes séchées](/produit/crevettes-sechees).",
    conserver:
      "Rangez les boîtes fermées dans un placard sec et vérifiez la date avant usage ; une boîte bombée ou rouillée ne s'utilise pas. Une fois ouverte, versez le reste dans un récipient en verre au réfrigérateur et cuisinez-le dans les deux jours, ou congelez-le en portions.",
    remplacer:
      "La grande boîte de pulpe de noix de palme convient parfaitement, allongée d'un peu plus d'eau. Des noix fraîches, bouillies, pilées puis pressées dans l'eau chaude, donnent la version d'origine au prix d'un long travail. L'huile de palme seule, en revanche, ne suffit pas à faire une palm nut soup.",
    enCuisine:
      "Elle se cuisine comme la pulpe de la [sauce graine au poulet](/recette/sauce-graine) ou du [poulet nyembwe](/recette/poulet-nyembwe), avec moins de réduction. Servez la soupe avec un foufou de [farine de foufou](/produit/farine-de-foufou), comme la [fufu light soup](/recette/fufu-light-soup) ghanéenne, et lisez [Comment faire un foufou sans grumeaux ?](/conseils/foufou-sans-grumeaux). La page [Ghana](/pays/ghana) présente le reste de cette cuisine.",
    faq: [
      {
        question: "Base de soupe et pulpe de noix de palme, quelle différence ?",
        reponse:
          "C'est le même fruit. La base ghanéenne est plus fluide et vendue en petit format ; la pulpe, plus épaisse, se dilue davantage.",
      },
      {
        question: "Faut-il écumer la soupe ?",
        reponse:
          "Oui, en partie : l'huile rouge qui remonte en fin de cuisson peut être retirée à la louche si la soupe vous paraît trop riche.",
      },
    ],
  },
  "crevettes-sechees": {
    origine:
      "Le Cameroun leur doit presque son nom. En 1472, le navigateur portugais Fernão do Pó entra dans l'estuaire du Wouri et y trouva tant de crevettes qu'il l'appela Rio dos Camarões, la rivière des crevettes ; le mot a fini par désigner tout le pays.\n\nDans toute l'Afrique de l'Ouest et centrale, les petites crevettes pêchées en estuaire sont séchées au soleil ou fumées pour se conserver sans froid. Au Nigeria, on les appelle crayfish en anglais, même s'il s'agit de crevettes et non d'écrevisses.",
    choisir:
      "Les crevettes doivent être sèches, d'un rose orangé, avec une odeur marine franche mais jamais ammoniaquée. Les petites se pilent facilement ; les plus grosses, entières, restent visibles dans le plat. Une version fumée a une couleur plus sombre et un goût plus marqué.\n\nElles jouent un rôle proche du [soumbala](/produit/soumbala) : donner de la profondeur à une sauce. Le soumbala apporte un goût fermenté et terrien, les crevettes une note iodée, et les deux s'associent volontiers dans une sauce feuille. Avec le [ndolé](/produit/feuilles-de-ndole), elles forment un couple classique de la cuisine camerounaise.",
    conserver:
      "Leur odeur gagne vite tout un placard : un bocal en verre bien fermé s'impose. Pour une longue conservation, le congélateur les garde parfaitement, sans changer leur texture. Si elles ont ramolli avec l'humidité, quelques minutes à sec dans une poêle leur rendent leur croquant.",
    remplacer:
      "Un peu de poisson fumé émietté, comme le hareng fumé, apporte une profondeur comparable. Une cuillère de pâte de crevettes d'épicerie asiatique, ou quelques gouttes de sauce poisson, dépanne aussi, à condition de réduire le sel. Pour d'autres idées, lisez [Par quoi remplacer le poisson fumé dans une sauce ?](/conseils/remplacer-le-poisson-fume).",
    enCuisine:
      "Elles garnissent le [ndolé aux crevettes](/recette/ndole), relèvent la [soupe egusi](/recette/soupe-egusi) nigériane et l'[eru](/recette/eru), plat de feuilles du sud-ouest du Cameroun. Pour le ndolé, voyez aussi [Comment enlever l'amertume du ndolé ?](/conseils/enlever-amertume-du-ndole) ; pour leur stockage, les conseils de [Comment conserver le poisson fumé ?](/conseils/comment-conserver-le-poisson-fume) valent aussi pour elles.",
    faq: [
      {
        question: "Faut-il décortiquer les crevettes séchées ?",
        reponse:
          "Pas les petites : on les pile ou on les utilise entières avec leur carapace. Les plus grosses peuvent être décortiquées si l'on préfère une texture plus fine.",
      },
      {
        question: "Les crevettes séchées sont-elles salées ?",
        reponse:
          "Souvent un peu, selon le séchage. Goûtez la sauce avant de saler et rincez-les brièvement si besoin.",
      },
    ],
  },
  "chips-de-plantain": {
    origine:
      "La banane plantain, venue d'Asie du Sud-Est il y a très longtemps, est devenue un aliment de base en Afrique centrale et de l'Ouest, où l'on en cultive une grande diversité. On la mange bouillie, frite, braisée ou pilée, à tous les stades de maturité.\n\nLes chips se font avec le plantain vert, encore ferme et peu sucré, coupé en tranches très fines puis frit. Au Cameroun, au Nigeria ou au Ghana, des vendeurs les proposent en petits sachets aux carrefours et aux arrêts de bus, à côté des arachides grillées.",
    choisir:
      "Lisez la liste d'ingrédients : plantain, huile et sel suffisent. Certaines versions sont sucrées, faites avec du plantain mûr, ou relevées au piment. Des chips dorées et régulières ont été frites à bonne température.\n\nElles ne remplacent pas un plat de plantain : l'[alloco](/recette/alloco) ivoirien et le [kelewele](/recette/kelewele) ghanéen se préparent avec du plantain mûr, frit en morceaux. Pour l'apéritif, les chips voisinent bien avec le [biltong](/produit/biltong) sud-africain et le [souchet](/produit/souchet), deux autres en-cas de la boutique, l'un salé, l'autre sucré.",
    conserver:
      "Une fois le sachet ouvert, l'air humide ramollit les chips assez vite. Refermez-le avec une pince ou transvasez-les dans une boîte hermétique. Gardez-les loin de la chaleur et de la lumière, qui font rancir l'huile de friture et donnent un goût de vieux.",
    remplacer:
      "Pour les faire soi-même, choisissez un plantain bien vert, coupez-le en tranches très fines à la mandoline et faites-les frire dans une huile bien chaude jusqu'à ce qu'elles dorent ; une [araignée à friture](/produit/araignee-a-friture) aide à les sortir sans casse. Salez à la sortie. À défaut de plantain, des chips de manioc ou de patate douce donnent un en-cas voisin.",
    enCuisine:
      "Elles complètent un plateau de [puff-puff](/recette/puff-puff) et d'[akara](/recette/akara), les beignets du Nigeria, servis avec un [jus de bissap](/recette/jus-de-bissap). Concassées, elles ajoutent du croquant à un [garba](/recette/garba) ivoirien. Pour la boisson, l'article [Comment faire un jus de gingembre maison ?](/conseils/faire-un-jus-de-gingembre-maison) donne une autre idée bien fraîche.",
    faq: [
      {
        question: "Chips de plantain et alloco, quelle différence ?",
        reponse:
          "L'alloco se fait avec du plantain mûr coupé en morceaux et se mange chaud, en plat. Les chips viennent du plantain vert, tranché finement, et se grignotent froides.",
      },
      {
        question: "Les chips de plantain sont-elles sucrées ?",
        reponse:
          "Non, le plantain vert contient peu de sucre : elles ont un goût proche de la pomme de terre, avec une note de banane. Il existe toutefois des versions au plantain mûr.",
      },
    ],
  },
  biltong: {
    origine:
      "Le mot vient du néerlandais, devenu l'afrikaans : bil désigne la croupe, d'où l'on tirait la viande, et tong la languette ou la bande. Il apparaît dans les textes au début du XIXe siècle, mais l'habitude de sécher la viande au vent est bien plus ancienne en Afrique australe.\n\nLe biltong se distingue du jerky américain par sa fabrication : la viande est marinée dans le vinaigre et les épices, puis séchée à l'air libre, sans cuisson ni fumage. Coriandre, poivre noir, sel et souvent un peu de sucre roux forment la recette classique.",
    choisir:
      "Un bon biltong est rouge sombre à l'intérieur, sec en surface mais encore souple, parfois bordé d'une fine couche de gras. On le trouve en bâtons entiers ou déjà tranché ; les bâtons se gardent mieux et se coupent à la demande. Son cousin, le droëwors, est une saucisse séchée de la même façon.\n\nC'est le seul en-cas de viande de la boutique. Les [chips de plantain](/produit/chips-de-plantain) apportent le croquant et le [souchet](/produit/souchet) la douceur : réunis sur une planche, ils forment un apéritif varié. La [sauce peri-peri](/produit/sauce-peri-peri), autre saveur d'Afrique australe, fait une trempette relevée.",
    conserver:
      "Évitez le sac plastique fermé pour un biltong entamé : l'humidité y reste prisonnière et favorise les moisissures. Un sac en papier, au réfrigérateur, le garde mieux, et il continue même à sécher doucement. S'il devient trop dur, tranchez-le simplement plus finement.",
    remplacer:
      "La viande des Grisons ou un jambon cru très sec s'en approchent par la texture, sans les notes de coriandre et de vinaigre. Pour retrouver ces parfums, saupoudrez les tranches d'un peu de coriandre moulue et de poivre concassé. Le kilishi, viande séchée et épicée du Nigeria et du Niger, est un cousin ouest-africain.",
    enCuisine:
      "Pour un repas sud-africain, servez-le à l'apéritif avant le [bobotie](/recette/bobotie), hachis de bœuf au curry gratiné sous une crème à l'œuf, accompagné du [chakalaka](/recette/chakalaka). Côté boisson, un [rooibos glacé](/recette/rooibos-glace) lui va bien. La page [Afrique du Sud](/pays/afrique-du-sud) présente le reste de cette cuisine, du braai aux plats mijotés en [marmite potjie](/produit/marmite-potjie).",
    faq: [
      {
        question: "Le biltong est-il cuit ?",
        reponse:
          "Non. Le vinaigre, le sel et un long séchage à l'air le transforment et assurent sa conservation, sans passage au feu.",
      },
      {
        question: "Biltong et jerky, quelle différence ?",
        reponse:
          "Le jerky est cuit ou fumé, souvent en fines lamelles ; le biltong est mariné au vinaigre puis séché à l'air, en morceaux épais.",
      },
    ],
  },
  souchet: {
    origine:
      "Le souchet est le petit tubercule d'une plante cousine du papyrus, Cyperus esculentus. Il compte parmi les plus anciennes plantes consommées : les Égyptiens le connaissaient dès la période prédynastique, et une peinture de tombe du XVe siècle avant notre ère montre la préparation de gâteaux de souchet.\n\nEn Afrique de l'Ouest, il se cultive au Sahel ; en haoussa, on l'appelle aya, d'où le nom du kunun aya nigérian. En Espagne, introduit par les Arabes au Moyen Âge, il est devenu la chufa, qui sert à préparer l'horchata de Valence.",
    choisir:
      "Les tubercules secs sont ridés et durs comme des noisettes : c'est normal, ils regonflent au trempage. Choisissez-les entiers, propres, sans odeur de moisi. On trouve des variétés brunes et d'autres jaunes, plus grosses et plus tendres.\n\nDans la boutique, il se rapproche de la [poudre de baobab](/produit/poudre-de-baobab) : deux produits secs qui donnent des boissons épaisses et sucrées. Les [chips de plantain](/produit/chips-de-plantain) et le [biltong](/produit/biltong) font des en-cas salés ; le souchet, lui, est l'en-cas doux, à croquer après trempage.",
    conserver:
      "Secs, les tubercules se gardent très longtemps dans un bocal fermé, à l'abri de l'humidité. Une fois trempés, ils se gardent au réfrigérateur dans un peu d'eau et doivent être mangés ou mixés dans les deux jours. Gardez quelques poignées sèches d'avance pour pouvoir lancer un trempage à tout moment.",
    remplacer:
      "Pour le goût de noisette, des noisettes ou des noix de cajou trempées puis mixées font une boisson voisine. Une horchata de chufa en bouteille, d'origine espagnole, est déjà prête : c'est le même tubercule, souvent plus sucré. Pour le grignotage, des amandes grillées le remplacent sans peine.",
    enCuisine:
      "Le kunun aya se boit bien frais, comme le [jus de bouye](/recette/jus-de-bouye) ou le [jus de gingembre](/recette/jus-de-gingembre). Quelques souchets trempés et concassés ajoutent du croquant à un [dégué](/recette/degue) ou à un [thiakry](/recette/thiakry). Pour une autre boisson à base de produit sec, lisez [Que faire avec la poudre de baobab ?](/conseils/que-faire-avec-la-poudre-de-baobab).",
    faq: [
      {
        question: "Le souchet est-il une noix ?",
        reponse:
          "Non, malgré son nom anglais de tiger nut, c'est un tubercule. Il ne vient pas d'un arbre mais d'une petite plante herbacée.",
      },
      {
        question: "Faut-il éplucher le souchet ?",
        reponse:
          "Non, la peau se mange et se mixe avec la chair. Un bon rinçage après le trempage suffit.",
      },
    ],
  },
  "ras-el-hanout": {
    origine:
      "Le ras el hanout appartient surtout à la cuisine marocaine, mais l'Algérie et la Tunisie en utilisent des versions voisines. Il n'existe aucune recette officielle : les formules les plus simples réunissent une dizaine d'épices, d'autres en comptent plusieurs dizaines, avec parfois des boutons de rose, de la cardamome, du macis ou du poivre long.\n\nDeux pots venus de deux marchands ne se ressemblent donc jamais tout à fait. Cette liberté fait son intérêt : le mélange reflète le goût de celui qui le compose, et chaque cuisinier finit par trouver la formule qu'il préfère.",
    choisir:
      "Un bon ras el hanout est d'un brun doré, très odorant, avec des notes à la fois sucrées et poivrées. Une poudre terne a perdu l'essentiel de son parfum. Lisez l'étiquette : certaines formules contiennent du sel ou du piment.\n\nIl ne se confond pas avec le [tabel karouia](/produit/epices-tunisiennes) tunisien, plus simple et plus franc, centré sur la coriandre et le carvi. Le [berbéré](/produit/berbere) éthiopien est lui aussi un mélange complexe, mais rouge et piquant. Le ras el hanout est plus chaud que fort : il parfume sans brûler.",
    conserver:
      "Un mélange aussi riche s'évente vite, car ses épices n'ont pas toutes la même tenue. Mieux vaut un petit pot renouvelé souvent qu'un grand sachet qui traîne. Gardez-le dans un bocal bien fermé, à l'abri de la lumière, et sentez-le avant usage : s'il ne sent plus grand-chose, augmentez légèrement la dose.",
    remplacer:
      "Un mélange de quatre-épices et de cumin, relevé d'une pointe de curcuma, donne une impression proche dans un tajine. Un curry doux dépanne aussi, avec une note plus indienne. Le [tabel karouia](/produit/epices-tunisiennes) convient pour un couscous, mais il apporte l'anis du carvi au lieu de la chaleur de la cannelle.",
    enCuisine:
      "Il est fait pour la cuisson lente du [tajine en argile](/produit/tajine-en-argile), avec de l'agneau, du poulet, des pruneaux ou des [citrons beldi confits](/produit/citrons-beldi-confits). Dans un couscous cuit au [couscoussier](/produit/couscoussier), il parfume le bouillon de légumes. Plus au sud, une pincée peut remplacer une partie des épices du [pilau de Zanzibar](/recette/pilau), déjà parfumé à la cannelle et à la cardamome.",
    faq: [
      {
        question: "Le ras el hanout est-il piquant ?",
        reponse:
          "Rarement. Il est chaud et parfumé, mais contient peu ou pas de piment selon les marques : vérifiez la composition.",
      },
      {
        question: "Peut-on l'utiliser sans cuisson ?",
        reponse:
          "Oui, en petite quantité, dans une vinaigrette ou sur des légumes rôtis. Il reste toutefois plus aromatique après un bref passage dans un corps gras chaud.",
      },
    ],
  },
  "epices-tunisiennes": {
    origine:
      "En arabe tunisien, tabel signifie « assaisonnement », et le mot désignait autrefois la seule coriandre. Karouia est le nom du carvi, une graine anisée de la même famille que le cumin. Avec l'ail et le piment, ils forment le mélange de base de la cuisine tunisienne, que l'on retrouve aussi en Algérie.\n\nLa Tunisie aime les saveurs nettes et relevées : à côté du tabel, elle a donné au monde la harissa, inscrite en 2022 au patrimoine culturel immatériel de l'humanité par l'UNESCO.",
    choisir:
      "Regardez la couleur : un tabel bien rouge contient une part généreuse de piment, un mélange plus beige sera plus doux. Le parfum doit être vif, avec l'anis du carvi bien reconnaissable. Certains se vendent en graines entières, à moudre soi-même.\n\nIl n'a pas la complexité du [ras el hanout](/produit/ras-el-hanout) marocain, plus sucré et plus chaud. Associé à la [harissa artisanale](/produit/harissa-artisanale), qui apporte la force du piment pilé, il compose l'assaisonnement typique d'un couscous tunisien. Le [berbéré](/produit/berbere), autre mélange rouge, est bien plus piquant et chargé en fenugrec.",
    conserver:
      "Le carvi et la coriandre moulus perdent vite leur fraîcheur. Préférez de petites quantités, ou gardez des graines entières que vous moudrez au mortier au fil des besoins. Le mélange se range dans un bocal hermétique, loin de la cuisinière : l'ail en poudre qu'il contient craint particulièrement l'humidité.",
    remplacer:
      "Un mélange maison se prépare en quelques minutes : deux parts de coriandre en graines pour une part de carvi, torréfiées puis moulues, avec de l'ail et du piment en poudre. Sans carvi, un peu de cumin donne un résultat plus terrien. Le ras el hanout, lui, changerait l'accent du plat, qui deviendrait marocain.",
    enCuisine:
      "Il assaisonne le bouillon d'un couscous cuit au [couscoussier](/produit/couscoussier), une chakchouka de poivrons et d'œufs ou une marinade de poisson grillé. Hors de Tunisie, une pincée relève le [chakalaka](/recette/chakalaka) sud-africain, à la place d'une partie du piment. Pour choisir le bon ustensile de cuisson à la vapeur, lisez [Faut-il un couscoussier pour cuire le fonio ou l'attiéké ?](/conseils/couscoussier-fonio-attieke).",
    faq: [
      {
        question: "Tabel et harissa, quelle différence ?",
        reponse:
          "Le tabel est un mélange sec d'épices en poudre ; la harissa est une pâte de piment pilé couverte d'huile. On utilise souvent les deux dans le même plat.",
      },
      {
        question: "Le tabel karouia est-il piquant ?",
        reponse:
          "Un peu, selon la part de piment. Pour un plat doux, utilisez-le en petite quantité et laissez la harissa sur la table.",
      },
    ],
  },
  dukkah: {
    origine:
      "Le nom vient d'un verbe arabe qui signifie « piler » ou « écraser » : le dukkah est d'abord une affaire de mortier. En Égypte, on le prépare à la maison depuis longtemps, en concassant ensemble fruits à coque grillés, sésame, coriandre et cumin, avec du sel et du poivre. Selon les familles, d'autres noix ou des herbes séchées s'y ajoutent.\n\nOn le pose sur la table avec du pain et de l'huile d'olive, au petit-déjeuner comme à l'heure de l'en-cas. Il a depuis gagné les cuisines du monde entier, où il sert surtout à donner du croquant aux plats.",
    choisir:
      "Un bon dukkah reste grossier : on y distingue des morceaux de noisette et des graines entières. Une poudre trop fine a perdu son intérêt. Lisez l'étiquette, surtout en cas d'allergie : selon les marques, il contient noisettes, amandes, pistaches ou arachides.\n\nIl ressemble peu aux autres mélanges de la boutique, qui sont des épices de cuisson : le [ras el hanout](/produit/ras-el-hanout) ou le [tabel karouia](/produit/epices-tunisiennes) parfument les sauces, alors que le dukkah se sert en fin de préparation. Son équivalent ouest-africain serait plutôt le yaji, mélange d'arachide et d'épices qui enrobe le suya.",
    conserver:
      "Riche en fruits à coque, il peut rancir. Gardez-le dans un bocal hermétique, au frais, et consommez-le dans les semaines qui suivent l'ouverture. Par temps chaud, le réfrigérateur prolonge sa fraîcheur ; laissez-le simplement revenir à température ambiante avant de servir.",
    remplacer:
      "Sans dukkah, un mélange de sésame grillé et de za'atar donne une trempette voisine, plus herbacée. Des noisettes concassées avec du sel et une pincée de cumin font aussi l'affaire. Pour une version africaine, mêlez arachides grillées, sel et piment, à la manière du yaji.",
    enCuisine:
      "Il apporte du croquant aux plats de légumineuses : une cuillère sur le [shiro](/recette/shiro) éthiopien ou le [misir wat](/recette/misir-wat) au moment de servir. Il se parsème aussi sur une salade de [fonio](/produit/fonio) ou sur l'[alloco](/recette/alloco) encore chaud. Pour découvrir le yaji, son cousin d'Afrique de l'Ouest, lisez [Qu'est-ce que le yaji (épice à suya) ?](/conseils/quest-ce-que-le-yaji).",
    faq: [
      {
        question: "Le dukkah se cuit-il ?",
        reponse:
          "Non, il se sert tel quel, en fin de préparation. On peut seulement le réchauffer à sec un instant pour raviver son parfum.",
      },
      {
        question: "Le dukkah contient-il des arachides ?",
        reponse:
          "Cela dépend de la recette : la plupart utilisent des noisettes ou des amandes, mais certaines y mettent des arachides. Vérifiez la composition en cas d'allergie.",
      },
    ],
  },
  "harissa-artisanale": {
    origine:
      "Le mot vient de l'arabe harasa, « piler » : la harissa naît au mortier, où l'on écrase les piments séchés avec l'ail et les épices. Le piment, venu d'Amérique, s'est implanté en Tunisie au XVIe siècle, et la pâte est devenue le condiment national.\n\nLe 1er décembre 2022, l'UNESCO a inscrit la harissa tunisienne au patrimoine culturel immatériel de l'humanité, pour les savoirs et les pratiques familiales liés à sa préparation. La région de Nabeul, au cap Bon, réputée pour ses piments, lui consacre même un festival.",
    choisir:
      "Une harissa artisanale a une texture un peu granuleuse, une couleur rouge sombre et une odeur de piment séché et d'ail. Les versions industrielles en tube sont souvent plus lisses. Lisez la composition : piment, ail, épices, sel et huile suffisent.\n\nElle est le pendant nord-africain de la [sauce peri-peri](/produit/sauce-peri-peri), plus liquide et acidulée au citron, et du [piment pili-pili](/produit/piment-pili-pili) séché, qui ne donne que la chaleur. Le [tabel karouia](/produit/epices-tunisiennes) en reprend les épices sous forme sèche.",
    conserver:
      "La couche d'huile à la surface la protège de l'air : après chaque usage, lissez la pâte et reversez un peu d'huile d'olive pour la recouvrir. Elle se garde ainsi plusieurs semaines au réfrigérateur. Si une moisissure apparaît, jetez le pot entier plutôt que de retirer la partie abîmée.",
    remplacer:
      "Un piment pili-pili réhydraté, mixé avec une gousse d'ail, une pincée de tabel et un filet d'huile d'olive, donne une harissa express. Un sambal oelek ou une autre pâte de piment d'épicerie asiatique dépanne aussi, sans le parfum du carvi. Du paprika fort détendu à l'huile fonctionne en dernier recours.",
    enCuisine:
      "Elle relève le bouillon du couscous et la chakchouka, mais voyage bien au-delà du Maghreb. Une cuillère dans la marinade du [suya](/recette/suya) ou du [nyama choma](/recette/nyama-choma) change agréablement le goût des brochettes, et elle peut remplacer le piment du [chakalaka](/recette/chakalaka) sud-africain. Pour régler la force de tous ces plats, lisez [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment).",
    faq: [
      {
        question: "La harissa se mange-t-elle crue ?",
        reponse:
          "Oui, c'est d'abord un condiment. Ajoutée à une sauce, elle cuit quelques minutes et perd un peu de son mordant.",
      },
      {
        question: "Pourquoi la harissa est-elle inscrite à l'UNESCO ?",
        reponse:
          "Pour les savoir-faire qui l'entourent : séchage des piments, préparation en famille, place dans les repas tunisiens. C'est une tradition vivante, transmise de génération en génération.",
      },
    ],
  },
  "huile-d-argan": {
    origine:
      "L'arganier (Argania spinosa) ne pousse naturellement que dans le sud-ouest du Maroc, autour d'Essaouira et d'Agadir. Cet arbre épineux, adapté à la sécheresse, couvre une vaste région classée par l'UNESCO en 1998 comme réserve de biosphère de l'Arganeraie.\n\nLe travail de l'argan revient traditionnellement aux femmes : récolter les fruits, retirer la pulpe, casser la coque très dure entre deux pierres, torréfier les amandons puis les moudre. Une grande partie de l'huile est aujourd'hui produite dans des coopératives féminines, et les savoir-faire liés à l'arganier sont inscrits au patrimoine culturel immatériel de l'UNESCO depuis 2014.",
    choisir:
      "Vérifiez que l'étiquette indique bien l'usage alimentaire, et préférez une bouteille en verre teinté. Le nom est protégé au Maroc par une indication géographique, dont la mention peut figurer sur l'emballage. Une petite bouteille suffit : on l'emploie par filets.\n\nAu rayon des huiles, elle n'a rien de commun avec l'[huile de palme rouge](/produit/huile-de-palme-rouge), faite pour cuire les sauces : l'argan est une huile d'assaisonnement, comme une huile de noix. Elle s'accorde avec les [dattes Deglet Nour](/produit/dattes-deglet-nour) et le pain chaud au petit-déjeuner.",
    conserver:
      "Comme toutes les huiles vierges grillées, elle rancit à la lumière et à la chaleur. Gardez-la dans un placard frais, loin du four, et utilisez-la dans les mois qui suivent l'ouverture. Une odeur de vieux beurre ou une amertume inhabituelle signale qu'elle a tourné.",
    remplacer:
      "Elle n'a pas de vrai équivalent. Pour l'amlou, une huile de noix ou d'amande grillée donne tout de même un résultat honnête. En assaisonnement, quelques gouttes d'huile de sésame grillé mêlées à de l'huile d'olive rappellent son côté torréfié, avec un accent plus asiatique.",
    enCuisine:
      "Versez-en un filet sur un couscous de légumes au sortir du [couscoussier](/produit/couscoussier), ou sur un tajine cuit dans un [tajine en argile](/produit/tajine-en-argile), juste avant de servir. Elle relève aussi une salade de [fonio](/produit/fonio) ou une purée de pois chiches. Au goûter, elle accompagne pain et miel, avec un thé à la menthe préparé comme dans [Comment préparer l'ataya ?](/conseils/comment-preparer-l-ataya).",
    faq: [
      {
        question: "Huile d'argan alimentaire et cosmétique, peut-on les échanger ?",
        reponse:
          "Non. L'huile cosmétique n'est pas torréfiée et n'est pas prévue pour la cuisine ; seule l'huile alimentaire est faite pour être consommée.",
      },
      {
        question: "Qu'est-ce que l'amlou ?",
        reponse:
          "Une pâte marocaine d'amandes grillées, de miel et d'huile d'argan, que l'on tartine sur du pain au petit-déjeuner.",
      },
    ],
  },
  "citrons-beldi-confits": {
    origine:
      "Beldi signifie « du pays », « traditionnel », en arabe marocain : le mot désigne les variétés locales, par opposition à celles venues d'ailleurs. Petit, rond et à peau fine, le citron beldi est celui que l'on préfère pour le confisage.\n\nLes citrons sont fendus en croix, garnis de gros sel, puis tassés dans un bocal avec leur jus. Après au moins un mois de macération, l'écorce devient tendre et translucide, perd son amertume et prend un goût concentré, salé et très parfumé.",
    choisir:
      "En bocal, les citrons doivent être entiers, jaunes à légèrement brunis, baignant dans leur saumure. Une écorce tendre sous le doigt indique un confisage abouti. Lisez la composition : citron, sel et eau suffisent.\n\nIls forment avec le [ras el hanout](/produit/ras-el-hanout) le duo du tajine marocain. Les [dattes Deglet Nour](/produit/dattes-deglet-nour) apportent la douceur des tajines sucrés-salés, les citrons la note salée et parfumée. Pour la cuisson, le [tajine en argile](/produit/tajine-en-argile) reste l'outil naturel.",
    conserver:
      "Tant que les citrons restent immergés, ils se conservent très longtemps. Si le niveau baisse, ajoutez un peu d'eau salée pour les recouvrir. Un voile blanc à la surface de la saumure est fréquent et part au rinçage ; une odeur désagréable ou une moisissure colorée, en revanche, impose de jeter le bocal.",
    remplacer:
      "Une version rapide se prépare en quelques jours : coupez un citron non traité en fines rondelles, couvrez-les de sel et de jus de citron et laissez-les au réfrigérateur. Le goût sera plus acide et moins fondu qu'un vrai confit, mais il dépannera pour un tajine.",
    enCuisine:
      "Ils parfument le tajine de poulet aux olives, cuit doucement dans un [tajine en argile](/produit/tajine-en-argile). Hors du Maghreb, quelques dés d'écorce relèvent la marinade du [poulet yassa](/recette/poulet-yassa), déjà riche en citron et en oignon, ou un [poisson braisé et attiéké](/recette/poisson-braise-attieke). Réduisez alors le sel prévu, et lisez [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa) si vous tentez l'essai.",
    faq: [
      {
        question: "Faut-il rincer les citrons confits ?",
        reponse:
          "Oui, sous l'eau froide, pour retirer l'excès de sel. Un rinçage rapide suffit à garder leur parfum.",
      },
      {
        question: "Combien de temps faut-il pour confire des citrons ?",
        reponse:
          "Au moins un mois dans le sel. Plus ils attendent, plus leur écorce devient tendre et douce.",
      },
    ],
  },
  "dattes-deglet-nour": {
    origine:
      "La Deglet Nour vient des oasis du Sahara algérien, dans la vallée de l'oued Righ, et s'est répandue jusqu'au Djérid tunisien. L'Algérie et la Tunisie produisent presque toute la récolte mondiale de cette variété. Son nom associe un mot maghrébin désignant la datte ou le doigt au mot arabe nour, la lumière.\n\nTenue face au soleil, la datte laisse voir une chair ambrée et translucide où se dessine l'ombre du noyau. La cueillette se fait à la main, d'octobre à décembre selon les régions, en plusieurs passages pour cueillir chaque datte à point.",
    choisir:
      "Les dattes en branches, encore attachées à leur tige, ont été moins manipulées que celles vendues en vrac. Une Deglet Nour doit être dorée et mi-molle, ni collante ni sèche.\n\nPlus ferme et moins sucrée que la Medjool, elle se coupe facilement en cuisine. Elle accompagne bien les [citrons beldi confits](/produit/citrons-beldi-confits) et le [ras el hanout](/produit/ras-el-hanout) dans un tajine sucré-salé. Le [souchet](/produit/souchet), autre en-cas sucré de la boutique, se mixe avec elle pour préparer le kunun aya nigérian.",
    conserver:
      "À température ambiante, elles se gardent quelques semaines dans une boîte fermée ; au réfrigérateur, plusieurs mois. Elles se congèlent aussi très bien, et leur chair reste tendre à la sortie du congélateur. Éloignez-les des aliments odorants, dont elles prennent facilement le goût.",
    remplacer:
      "Pour une pâtisserie, des figues sèches mixées ou des raisins secs réhydratés offrent une douceur comparable. Dans un tajine, des pruneaux ou des abricots secs prennent volontiers leur place. Pour grignoter, la Mech Degla, une variété algérienne plus sèche, se garde encore plus longtemps.",
    enCuisine:
      "Au Maghreb, on rompt souvent le jeûne du ramadan avec une datte et un verre de lait. Elles accompagnent aussi le thé : servez-les avec un [ataya](/recette/ataya) versé dans des [verres à thé](/produit/verres-a-the), en suivant [Comment préparer l'ataya ?](/conseils/comment-preparer-l-ataya). Hachées, elles sucrent un [thiakry](/recette/thiakry) ou un [dégué](/recette/degue).",
    faq: [
      {
        question: "Pourquoi les dattes Deglet Nour sont-elles translucides ?",
        reponse:
          "Leur chair fine laisse passer la lumière, surtout à maturité. C'est cette particularité qui leur a valu leur nom.",
      },
      {
        question: "Faut-il laver les dattes ?",
        reponse:
          "Un rapide passage sous l'eau, suivi d'un séchage, suffit pour les dattes en vrac. Celles en barquette se mangent telles quelles.",
      },
    ],
  },
};
