/**
 * Fiches détaillées des produits, lot 4 : Céréales et farines, cafés et thés, livres (43 fiches).
 * Règles de rédaction : docs/FICHES.md. Un rédacteur ne modifie QUE ce fichier.
 * Contrôle : npm test (tests/fiches.test.ts), puis npm run build.
 *
 * Fiches de ce lot :
 *   - fonio — Fonio précuit
 *   - attieke-sec — Attiéké déshydraté
 *   - couscous-de-mil — Couscous de mil (thiéré)
 *   - farine-de-teff — Farine de teff
 *   - poudre-de-baobab — Pain de singe (poudre de baobab)
 *   - farine-de-foufou — Farine de manioc pour foufou
 *   - farine-d-igname — Farine d'igname (amala / elubo)
 *   - gari-jaune — Gari jaune (semoule de manioc)
 *   - chikwangue — Chikwangue (bâton de manioc)
 *   - tapioca-de-manioc — Tapioca de manioc granulé
 *   - farine-de-mais-blanc — Farine de maïs blanc (Iwisa Super Maize Meal)
 *   - farine-de-pois-chiches — Farine de pois chiches bio
 *   - infusion-de-tamarin — Infusion de tamarin
 *   - infusion-de-gingembre — Infusion de gingembre
 *   - cafe-du-kivu — Café moulu du Kivu (RD Congo)
 *   - cafe-vert-du-cameroun — Café vert du Cameroun à torréfier
 *   - cafe-moka-sidamo — Café moulu Moka Sidamo
 *   - cafe-du-kenya — Café en grains du Kenya
 *   - cafe-harrar — Café en grains Éthiopie Harrar
 *   - cafe-yirgacheffe — Café en grains Yirgacheffe
 *   - cafe-du-cameroun — Café en grains du Cameroun (Bamoun)
 *   - cafe-du-rwanda — Café en grains du Rwanda
 *   - cafe-de-tanzanie — Café en grains de Tanzanie
 *   - cafe-du-burundi — Café en grains du Burundi
 *   - rooibos-vert — Rooibos vert bio
 *   - the-vert-gunpowder — Thé vert gunpowder pour ataya
 *   - kinkeliba — Feuilles de kinkeliba
 *   - rooibos — Rooibos bio en vrac
 *   - honeybush — Honeybush bio
 *   - citronnelle-sechee — Citronnelle séchée
 *   - the-noir-du-kenya — Thé noir du Kenya
 *   - the-noir-du-kenya-cardamome — Thé noir à la cardamome
 *   - livre-200-recettes-camerounaises — 200 recettes de cuisine camerounaise (Estelle Tiani)
 *   - livre-la-cuisine-congolaise — La cuisine congolaise (Fidèle Mialoundama et Isabelle Goma Mouyokani)
 *   - livre-senegal-cuisine-intime-et-gourmande — Sénégal, cuisine intime et gourmande (Youssou N'Dour)
 *   - livre-dans-ma-cuisine-congolaise — Dans ma cuisine congolaise, du Kivu à Kinshasa (Gisèle Mbeku Andjelani)
 *   - livre-plats-express-saveurs-d-afrique — Plats express aux saveurs d'Afrique (Cheikh Niang, @niangcook)
 *   - livre-le-meilleur-de-la-cuisine-congolaise — Le meilleur de la cuisine congolaise (Lukusa Jessica)
 *   - livre-cuisine-d-afrique-et-d-ailleurs — Cuisine d'Afrique et d'ailleurs (Cheikh Niang, @niangcook)
 *   - livre-grain-d-afrique — Grain d'Afrique, 60 recettes (Aïssatou Mbaye)
 *   - livre-cuisine-du-senegal-81-recettes — Cuisine du Sénégal, 81 recettes traditionnelles (Kaya N'Dor)
 *   - livre-afro-vegan — Afro Vegan, 50 recettes (Aurélie Payet et Blandine Mayissa)
 *   - tajine-en-argile — Tajine touareg en argile 30 cm (Afrique du Nord, page en noindex)
 */
import type { ProductDetail } from "../../types";

export const SLUGS = [
  "fonio",
  "attieke-sec",
  "couscous-de-mil",
  "farine-de-teff",
  "poudre-de-baobab",
  "farine-de-foufou",
  "farine-d-igname",
  "gari-jaune",
  "chikwangue",
  "tapioca-de-manioc",
  "farine-de-mais-blanc",
  "farine-de-pois-chiches",
  "infusion-de-tamarin",
  "infusion-de-gingembre",
  "cafe-du-kivu",
  "cafe-vert-du-cameroun",
  "cafe-moka-sidamo",
  "cafe-du-kenya",
  "cafe-harrar",
  "cafe-yirgacheffe",
  "cafe-du-cameroun",
  "cafe-du-rwanda",
  "cafe-de-tanzanie",
  "cafe-du-burundi",
  "rooibos-vert",
  "the-vert-gunpowder",
  "kinkeliba",
  "rooibos",
  "honeybush",
  "citronnelle-sechee",
  "the-noir-du-kenya",
  "the-noir-du-kenya-cardamome",
  "livre-200-recettes-camerounaises",
  "livre-la-cuisine-congolaise",
  "livre-senegal-cuisine-intime-et-gourmande",
  "livre-dans-ma-cuisine-congolaise",
  "livre-plats-express-saveurs-d-afrique",
  "livre-le-meilleur-de-la-cuisine-congolaise",
  "livre-cuisine-d-afrique-et-d-ailleurs",
  "livre-grain-d-afrique",
  "livre-cuisine-du-senegal-81-recettes",
  "livre-afro-vegan",
  "tajine-en-argile",
] as const;

export const fiches: Partial<Record<(typeof SLUGS)[number], ProductDetail>> = {
  fonio: {
    origine:
      "Le fonio blanc, Digitaria exilis, compte parmi les plus anciennes céréales domestiquées d'Afrique de l'Ouest. On le sème du Sénégal jusqu'aux abords du lac Tchad, mais son grand foyer reste le plateau du Fouta-Djalon, en Guinée, qui en est le premier pays producteur. Une espèce cousine, le fonio noir (Digitaria iburua), se cultive surtout plus à l'est, notamment au Nigeria.\n\nLe grain est minuscule et enveloppé de balles. Le décortiquer au pilon puis le laver demandait des heures de travail. La version précuite a déjà franchi ces étapes : décortiquée, nettoyée, passée à la vapeur puis séchée, elle se prépare en un temps record.",
    choisir:
      "Le fonio se distingue des autres semoules de la boutique par sa nature : c'est un grain entier, pas une farine roulée. Le [couscous de mil](/produit/couscous-de-mil), ou thiéré, est fabriqué à partir de farine façonnée en granules ; il a plus de mâche et un goût plus rustique. L'[attiéké déshydraté](/produit/attieke-sec), tiré du manioc fermenté, apporte une pointe acidulée que le fonio n'a pas.\n\nSur l'emballage, vérifiez la mention « précuit » si vous voulez gagner du temps : le fonio brut doit être lavé plusieurs fois avant cuisson. Un fonio bien trié ne crisse pas sous la dent.",
    conserver:
      "Grain sec et fin, il craint surtout l'humidité et les mites alimentaires. Versez le sachet entamé dans un bocal à couvercle hermétique, rangé dans un placard frais. Une fois cuit, il se garde deux jours au réfrigérateur, dans une boîte fermée ; un passage à la vapeur ou une cuillère d'eau au micro-ondes lui rend sa légèreté.",
    remplacer:
      "La semoule de blé fine se prépare presque de la même façon et accompagne aussi bien les sauces, avec un goût plus neutre. Le quinoa ou le boulgour fin font également l'affaire dans une salade. Pour rester en Afrique de l'Ouest, le thiéré convient aux plats en sauce, à condition de prévoir une cuisson plus longue.",
    enCuisine:
      "Il fait la base du [fonio aux légumes et sauce arachide](/recette/fonio-aux-legumes), un plat complet sans viande. Pour le cuire à la vapeur dans les règles, lisez [Qu'est-ce que le fonio et comment le cuire ?](/conseils/quest-ce-que-le-fonio) et [Faut-il un couscoussier pour cuire le fonio ou l'attiéké ?](/conseils/couscoussier-fonio-attieke) ; le [couscoussier](/produit/couscoussier) s'y prête bien.",
    faq: [
      {
        question: "Le fonio et le mil, est-ce la même chose ?",
        reponse:
          "Non. Ce sont deux plantes différentes : le fonio appartient au genre Digitaria, le mil le plus courant au Sénégal est le mil à chandelle. Le grain de fonio est aussi bien plus petit.",
      },
      {
        question: "Faut-il rincer le fonio précuit ?",
        reponse:
          "En général non : suivez l'emballage. En cas d'impuretés, un rinçage rapide dans une passoire fine suffit.",
      },
    ],
  },
  "attieke-sec": {
    origine:
      "L'attiéké est né chez les peuples lagunaires du sud de la Côte d'Ivoire, Ébrié, Adjoukrou ou Avikam, autour d'Abidjan, de Dabou, de Jacqueville et de Grand-Lahou. Le manioc y est épluché, râpé, mélangé à un ferment, puis pressé, émietté, tamisé et cuit à la vapeur. La fermentation lui donne son goût acidulé si particulier.\n\nCe savoir-faire est reconnu bien au-delà du pays : en décembre 2024, l'UNESCO a inscrit les savoir-faire liés à la fabrication de l'attiéké au patrimoine culturel immatériel de l'humanité. La Côte d'Ivoire a aussi fait protéger l'« attiéké des lagunes » auprès de l'Organisation africaine de la propriété intellectuelle. La version déshydratée permet d'en garder chez soi plusieurs mois.",
    choisir:
      "L'attiéké sec se compare d'abord aux autres semoules de manioc de la boutique. Le [gari jaune](/produit/gari-jaune) est torréfié, donc croquant et plus sec, et sert surtout à l'eba ; le [tapioca de manioc](/produit/tapioca-de-manioc) est un amidon qui devient translucide et se prête aux desserts. Le [fonio](/produit/fonio) ou le [couscous de mil](/produit/couscous-de-mil) offrent une texture proche, sans l'acidité de la fermentation.\n\nPréférez un grain régulier, ni poussiéreux ni collé en blocs. Une fois réhydraté, l'attiéké doit rester léger et se détacher grain par grain.",
    conserver:
      "Sec, il se garde longtemps à condition de rester à l'abri de l'humidité : refermez bien le sachet ou versez-le dans une boîte hermétique. Réhydraté, il se consomme dans la journée, ou le lendemain s'il a passé la nuit au réfrigérateur, réchauffé quelques minutes à la vapeur pour retrouver sa souplesse.",
    remplacer:
      "Sans attiéké, une semoule de couscous moyenne réhydratée puis arrosée d'un filet de jus de citron vert imite assez bien son petit goût acide. Le fonio précuit est une autre piste, plus fine. Le gari, lui, donne une texture différente : mieux vaut le réserver aux recettes qui le demandent.",
    enCuisine:
      "Il accompagne le [poisson braisé et attiéké](/recette/poisson-braise-attieke), grand classique des maquis d'Abidjan, et le [garba](/recette/garba), au thon frit et au piment. Pour le préparer comme là-bas, suivez [Comment réussir un attiéké maison ?](/conseils/reussir-attieke-maison), puis faites la part des choses avec [Quelle différence entre gari, attiéké et tapioca ?](/conseils/difference-gari-attieke-tapioca).",
    faq: [
      {
        question: "Pourquoi l'attiéké a-t-il un goût acide ?",
        reponse:
          "Parce que la pâte de manioc fermente avant d'être pressée et cuite. Cette fermentation, propre à sa fabrication, lui donne sa saveur légèrement aigre.",
      },
      {
        question: "Faut-il un couscoussier pour réchauffer l'attiéké sec ?",
        reponse:
          "Ce n'est pas obligatoire. Un [couscoussier](/produit/couscoussier) donne le meilleur résultat, mais une passoire posée sur une casserole d'eau frémissante et couverte fonctionne aussi.",
      },
    ],
  },
  "couscous-de-mil": {
    origine:
      "Au Sénégal, le mil à chandelle est la céréale des terroirs secs du centre et du nord. Pour obtenir le couscous, la farine est légèrement humidifiée puis roulée à la main dans une grande calebasse, jusqu'à former de petits grains réguliers ; ils sont ensuite cuits à la vapeur.\n\nLe thiéré tient une place à part dans le calendrier : pour la Tamkharit, nom local de l'Achoura, de nombreuses familles préparent un grand plat de couscous de mil à partager, servi avec une sauce à la viande et aux légumes. On y incorpore souvent du lalo, une poudre de feuilles de baobab qui lie et assouplit les grains.",
    choisir:
      "Le thiéré se distingue du [fonio](/produit/fonio), grain entier très fin et presque neutre, par sa mâche et son goût de céréale grillée. Il est aussi plus ferme que l'[attiéké déshydraté](/produit/attieke-sec), qui reste acidulé et moelleux.\n\nRegardez la taille des grains : un calibre fin convient au thiakry et au dégué, un calibre plus gros aux plats en sauce. Un couscous de mil de qualité sent la céréale, sans odeur de rance, et ne laisse pas de poussière au fond du sachet.",
    conserver:
      "Le mil contient un peu de matière grasse qui finit par rancir : gardez le sachet entamé bien fermé, dans un endroit frais, et utilisez-le dans les mois qui suivent. Le couscous cuit se conserve deux jours au réfrigérateur et se réchauffe à la vapeur, en l'aérant à la fourchette.",
    remplacer:
      "La semoule de blé moyenne ou grosse remplace le thiéré dans un plat en sauce, avec un goût plus doux et une cuisson plus rapide. Pour le thiakry, une semoule fine de blé dur donne un dessert proche, moins rustique. Le fonio est une autre option, mais ses grains minuscules donnent une texture beaucoup plus légère.",
    enCuisine:
      "Il fait le [thiéré mbuum](/recette/thiere-mbuum), aux feuilles de moringa et au niébé, ainsi que trois desserts : le [thiakry](/recette/thiakry), le [dégué](/recette/degue) et le [ngalakh](/recette/ngalakh) au pain de singe. Pour la double cuisson à la vapeur, reportez-vous à [Comment cuire le couscous de mil (thiéré) ?](/conseils/cuire-le-couscous-de-mil) ; la [passoire à couscous](/produit/passoire-a-couscous) ou le [couscoussier](/produit/couscoussier) y sont utiles.",
    faq: [
      {
        question: "Quelle différence entre thiéré et thiakry ?",
        reponse:
          "Le thiéré désigne le couscous de mil lui-même, servi salé avec une sauce. Le thiakry est un dessert préparé avec ce couscous, mélangé à du lait caillé sucré.",
      },
      {
        question: "Qu'est-ce que le lalo ajouté au thiéré ?",
        reponse:
          "C'est une poudre de feuilles de baobab séchées. Mélangée au couscous, elle lie légèrement les grains et leur donne une texture plus souple.",
      },
    ],
  },
  "farine-de-teff": {
    origine:
      "Le teff, Eragrostis tef, est une graminée domestiquée sur les hauts plateaux d'Éthiopie et d'Érythrée, où il reste la céréale reine. Son grain mesure à peine un millimètre. On en cultive des variétés claires, au goût plus doux, et des variétés brunes ou rougeâtres, plus marquées.\n\nEn Éthiopie, la farine est mélangée à l'eau puis laissée fermenter quelques jours. On garde souvent un peu du liquide jaunâtre qui remonte à la surface, l'ersho, pour lancer la fournée suivante. La pâte est ensuite versée en spirale sur une grande plaque, le mitad, où se forment les petits trous qui font la signature de l'injera.",
    choisir:
      "Pour l'injera, une farine de teff pure donne la galette la plus authentique, souple et acidulée. Certains mélanges ajoutent de la farine de blé ou d'orge pour faciliter la cuisson : lisez la composition si vous voulez du teff seul. La farine claire produit des galettes pâles et douces, la brune des galettes plus sombres au goût de noisette.\n\nC'est la seule farine de la boutique prévue pour une pâte fermentée. La [farine de pois chiches](/produit/farine-de-pois-chiches) l'accompagne naturellement, puisqu'elle sert au shiro que l'on sert sur l'injera.",
    conserver:
      "Moulue à partir du grain entier, la farine de teff garde son germe et peut rancir à la longue. Rangez-la dans un bocal fermé, au frais et à l'abri de la lumière ; en été, le réfrigérateur prolonge sa fraîcheur. La pâte qui fermente se couvre d'un linge propre et attend à température ambiante, loin d'une source de chaleur.",
    remplacer:
      "Hors d'Éthiopie, beaucoup de cuisiniers préparent une injera mixte avec une part de farine de sarrasin, de blé ou d'orge : la galette est moins acide et moins alvéolée, mais reste agréable. Pour les gâteaux et les crêpes, la farine de sarrasin ou de châtaigne apporte une note rustique comparable.",
    enCuisine:
      "Elle donne l'[injera au teff](/recette/injera), qui accompagne le [doro wat](/recette/doro-wat), le [misir wat](/recette/misir-wat) et le [shiro](/recette/shiro). La [plaque à injera](/produit/plaque-a-injera) facilite la cuisson à la maison. Pour d'autres usages, lisez [Qu'est-ce que la farine de teff et que peut-on en faire ?](/conseils/que-faire-avec-la-farine-de-teff), et pour l'épice des wats, [Qu'est-ce que le berbéré et avec quoi le cuisiner ?](/conseils/quest-ce-que-le-berbere).",
    faq: [
      {
        question: "Pourquoi mon injera n'a-t-elle pas de trous ?",
        reponse:
          "Le plus souvent, la pâte n'a pas assez fermenté ou elle est trop épaisse. Laissez-la travailler plus longtemps, allongez-la un peu d'eau et couvrez la plaque pendant la cuisson.",
      },
      {
        question: "Peut-on faire du pain avec la farine de teff ?",
        reponse:
          "Elle lève mal seule. Mélangée à une farine de blé, elle donne en revanche des pains, des crêpes ou des biscuits au goût légèrement noisetté.",
      },
    ],
  },
  "poudre-de-baobab": {
    origine:
      "Le baobab africain, Adansonia digitata, se reconnaît de loin à son tronc énorme et à ses branches nues pendant la saison sèche. Certains spécimens vivent plusieurs siècles, et l'arbre figure sur les armoiries du Sénégal. Son fruit, une longue capsule veloutée, renferme des graines prises dans une pulpe blanche, sèche et farineuse : c'est le pain de singe, appelé bouye en wolof.\n\nLa pulpe sèche naturellement sur l'arbre. Après la récolte, on casse la coque, on sépare la pulpe des graines et des fibres, puis on la tamise en poudre. En Europe, elle est autorisée comme ingrédient alimentaire depuis une décision de la Commission européenne de juin 2008.",
    choisir:
      "Une bonne poudre est blanc cassé à beige clair, fine et sans grumeaux durs, avec une odeur légèrement acidulée. Une couleur grise ou une odeur de renfermé signalent un produit vieilli. Ne la confondez pas avec le lalo, poudre verte de feuilles de baobab, qui sert à lier le couscous de mil.\n\nDans la boutique, elle partage son côté acidulé avec les [fleurs de bissap](/produit/fleurs-de-bissap) et l'[infusion de tamarin](/produit/infusion-de-tamarin), mais c'est la seule à donner une boisson crémeuse et opaque. Pour le ngalakh, elle s'associe au [couscous de mil](/produit/couscous-de-mil) et à la [pâte d'arachide](/produit/pate-d-arachide).",
    conserver:
      "La poudre attire l'humidité de l'air et durcit en blocs si elle reste ouverte. Gardez-la dans un bocal bien sec, refermé aussitôt, avec une cuillère propre et sèche. Le jus de bouye préparé se garde au réfrigérateur et se boit dans les deux jours ; secouez-le avant de servir, car la pulpe se dépose au fond.",
    remplacer:
      "Rien n'a tout à fait son goût. Pour une boisson acidulée, un jus de bissap ou de tamarin prend le relais. Dans un dessert, un yaourt nature légèrement citronné rappelle son acidité ; pour la texture crémeuse du ngalakh, la pâte d'arachide détendue au lait fait une base acceptable.",
    enCuisine:
      "Elle sert au [jus de bouye](/recette/jus-de-bouye), boisson des fêtes sénégalaises, et au [ngalakh](/recette/ngalakh), dessert du vendredi saint partagé entre voisins. D'autres idées sont réunies dans [Que faire avec la poudre de baobab (pain de singe) ?](/conseils/que-faire-avec-la-poudre-de-baobab). Pour une table de boissons complète, ajoutez le [jus de bissap](/recette/jus-de-bissap) et le [jus de gingembre](/recette/jus-de-gingembre).",
    faq: [
      {
        question: "Pourquoi l'appelle-t-on pain de singe ?",
        reponse:
          "Parce que les singes, comme d'autres animaux de la savane, raffolent de la pulpe du fruit. Le nom est passé dans le français d'Afrique de l'Ouest.",
      },
      {
        question: "Faut-il filtrer le jus de bouye ?",
        reponse:
          "Avec une poudre fine, ce n'est pas indispensable. Si vous voulez une boisson très lisse, passez-la au tamis après l'avoir bien délayée.",
      },
    ],
  },
  "farine-de-foufou": {
    origine:
      "Le manioc vient d'Amérique du Sud. Des navigateurs portugais l'ont introduit sur les côtes d'Afrique centrale au XVIe siècle, et il s'est imposé au point de devenir l'aliment de base de régions entières, du Congo au Nigeria. Le foufou, pâte ferme que l'on mange à la main, était à l'origine obtenu en pilant longuement au mortier des racines cuites, parfois avec de la banane plantain.\n\nLa farine change la donne : les racines, rouies puis séchées et moulues, se transforment en une poudre qui se travaille directement dans l'eau chaude. On obtient la même pâte élastique en quelques minutes, sans pilon ni mortier.",
    choisir:
      "Plusieurs farines de la boutique donnent une pâte à manger avec les sauces. La [farine d'igname](/produit/farine-d-igname) produit l'amala, brune et au goût plus prononcé. La [farine de maïs blanc](/produit/farine-de-mais-blanc) donne le tô ou l'ugali, plus granuleux. Le [gari jaune](/produit/gari-jaune) fait l'eba, au goût acidulé. La farine de manioc pour foufou reste la plus neutre et la plus élastique.\n\nChoisissez une farine très fine et blanche, sans odeur aigre trop forte. Si elle forme des boulettes dans le sachet, c'est qu'elle a pris l'humidité.",
    conserver:
      "Un pot hermétique dans un placard sec suffit. Évitez de plonger dans le sachet une cuillère mouillée, qui ferait des grumeaux. Le foufou préparé se garde un jour au réfrigérateur, bien emballé dans un film ; il se réchauffe à la vapeur ou au micro-ondes avec une goutte d'eau, puis se retravaille à la spatule.",
    remplacer:
      "L'amala ou l'ugali remplacent le foufou à table, avec un goût différent. En dépannage, une purée de pommes de terre très ferme, travaillée avec un peu de fécule, accompagne correctement une soupe. Le riz blanc reste la solution la plus simple pour servir une sauce africaine.",
    enCuisine:
      "Il accompagne le [fufu et light soup](/recette/fufu-light-soup) ghanéen, la [soupe egusi](/recette/soupe-egusi), la [sauce graine au poulet](/recette/sauce-graine) ou le [pondu au poisson fumé](/recette/pondu). Pour une pâte bien lisse, suivez [Comment préparer un foufou sans qu'il fasse de grumeaux ?](/conseils/foufou-sans-grumeaux) ; une [spatule en bois](/produit/spatules-en-bois) solide facilite le travail.",
    faq: [
      {
        question: "Comment mange-t-on le foufou ?",
        reponse:
          "Avec la main droite : on détache une petite boule, on la creuse légèrement du pouce et on s'en sert pour saisir la sauce. On l'avale souvent sans mâcher.",
      },
      {
        question: "Le foufou ghanéen est-il fait de la même farine ?",
        reponse:
          "Au Ghana, le fufu traditionnel associe souvent manioc et banane plantain. La farine de manioc seule donne une pâte un peu plus blanche et plus neutre.",
      },
    ],
  },
  "farine-d-igname": {
    origine:
      "L'igname est l'un des piliers de l'Afrique de l'Ouest, et le Nigeria en est de loin le premier producteur mondial. Chez les Yoruba, au sud-ouest du pays, une partie de la récolte est transformée en elubo : les tubercules sont lavés, épluchés, coupés en tranches, blanchis dans l'eau chaude, puis séchés au soleil jusqu'à devenir cassants, avant d'être moulus.\n\nC'est ce séchage qui change tout. L'igname fraîche est blanche, mais les tranches brunissent en séchant, et la farine garde cette teinte. Travaillée à l'eau bouillante, elle donne l'amala, une pâte qui va du brun clair au presque noir et dont le goût légèrement fumé et terreux ne ressemble à aucun autre.",
    choisir:
      "Comparée à la [farine de manioc pour foufou](/produit/farine-de-foufou), elle est plus colorée et plus parfumée, et donne une pâte moins élastique, plus fondante. La [farine de maïs blanc](/produit/farine-de-mais-blanc) produit une pâte claire et granuleuse ; le [gari jaune](/produit/gari-jaune) une boule acidulée. L'amala se reconnaît tout de suite à sa couleur.\n\nUne bonne farine est très fine et uniforme. Des points noirs ou une odeur de moisi indiquent un séchage mal conduit. Ne la confondez pas avec la poudre pour « poundo yam », plus claire, qui imite l'igname pilée.",
    conserver:
      "Refermez bien le sachet avec une pince ou transvasez la farine dans un bocal sec : l'humidité lui fait vite perdre sa finesse. Elle se garde plusieurs mois dans un placard frais. L'amala préparée se conserve un jour au réfrigérateur, emballée, et se réchauffe à la vapeur avant d'être retravaillée.",
    remplacer:
      "La farine de manioc ou une farine de plantain donnent une pâte du même usage, plus claire et plus neutre. Sans aucune de ces farines, servez la sauce avec du riz blanc ou de l'igname fraîche bouillie, écrasée à la fourchette : on perd la couleur, pas le principe.",
    enCuisine:
      "L'amala se mange avec les soupes épaisses, comme la [soupe egusi](/recette/soupe-egusi), et avec les ragoûts rouges du Nigeria. Elle accompagne aussi bien la [groundnut soup](/recette/groundnut-soup) ou la [pepper soup de chèvre](/recette/pepper-soup). Le geste pour éviter les grumeaux est le même que pour le foufou : relisez [Comment préparer un foufou sans qu'il fasse de grumeaux ?](/conseils/foufou-sans-grumeaux).",
    faq: [
      {
        question: "Pourquoi l'amala est-elle brune ?",
        reponse:
          "Parce que les tranches d'igname brunissent pendant leur séchage au soleil. La farine, puis la pâte, gardent cette couleur.",
      },
      {
        question: "Amala et poundo yam, quelle différence ?",
        reponse:
          "L'amala vient d'igname séchée puis moulue, d'où sa couleur sombre. Le poundo yam imite l'igname fraîche pilée et reste blanc.",
      },
    ],
  },
  "gari-jaune": {
    origine:
      "Le gari est un produit du golfe de Guinée, au Bénin, au Togo, au Nigeria et au Ghana. Les racines de manioc sont épluchées, râpées, puis la pulpe est laissée à fermenter quelques jours dans des sacs que l'on presse pour en chasser le jus. On la tamise ensuite avant de la torréfier dans de grandes bassines chauffées au bois, en remuant sans cesse.\n\nC'est cette cuisson à sec qui donne au gari ses grains croquants et sa longue conservation. Pour le gari jaune, de l'huile de palme rouge est ajoutée pendant la préparation : elle colore les grains et adoucit un peu leur goût acidulé.",
    choisir:
      "Le gari ressemble à l'[attiéké déshydraté](/produit/attieke-sec), mais ce dernier est cuit à la vapeur, alors que le gari est torréfié : plus sec, plus croquant, il absorbe davantage d'eau. Le [tapioca de manioc](/produit/tapioca-de-manioc) est un amidon pur qui devient translucide. La [farine de manioc pour foufou](/produit/farine-de-foufou) donne une pâte plus lisse que l'eba.\n\nLe gari jaune convient à l'eba et aux plats où sa couleur se voit. Préférez un grain régulier, ni trop fin ni poussiéreux, sans petits morceaux de fibre.",
    conserver:
      "Grâce à sa torréfaction, le gari se garde longtemps dans un récipient bien fermé, à l'abri de l'humidité. Une odeur rance trahit l'huile de palme qui a vieilli : mieux vaut alors s'en séparer. L'eba se prépare au dernier moment et se mange chaud.",
    remplacer:
      "Pour l'eba, la farine de manioc pour foufou donne une pâte comparable, plus lisse et plus blanche. Pour l'accompagnement du waakye, quelques cuillères de chapelure grillée à la poêle avec un peu d'huile rappellent le croquant du gari. À boire, il n'a pas d'équivalent véritable.",
    enCuisine:
      "Il se saupoudre sur le [waakye](/recette/waakye), le riz aux haricots du Ghana. En eba, il accompagne la [soupe egusi](/recette/soupe-egusi) ou la [groundnut soup](/recette/groundnut-soup). Pour ne plus confondre les semoules de manioc, lisez [Quelle différence entre gari, attiéké et tapioca ?](/conseils/difference-gari-attieke-tapioca).",
    faq: [
      {
        question: "Gari blanc ou gari jaune ?",
        reponse:
          "Le gari jaune contient de l'huile de palme, qui lui donne sa couleur et un goût plus rond. Le blanc, sans huile, est plus acidulé. Les deux s'utilisent de la même façon.",
      },
      {
        question: "Comment boit-on le gari ?",
        reponse:
          "On le verse dans de l'eau froide avec du sucre, parfois du lait concentré et des arachides grillées. Il gonfle en quelques minutes et se mange à la cuillère.",
      },
    ],
  },
  chikwangue: {
    origine:
      "La chikwangue, ou kwanga en lingala, est le pain de manioc des deux rives du fleuve Congo. Sa fabrication commence par le rouissage : les racines trempent plusieurs jours dans l'eau, ce qui les ramollit et lance la fermentation. On les débarrasse ensuite de leurs fibres, on les pile, on cuit une première fois la pâte, puis on la pétrit longuement.\n\nLa pâte est alors façonnée en bâtons ou en boules, enveloppée dans de grandes feuilles et ficelée, avant une dernière cuisson à la vapeur. Des pains cousins existent ailleurs en Afrique centrale, comme le bobolo et le miondo au Cameroun, plus fins.",
    choisir:
      "Elle se mange telle quelle, en tranches : c'est ce qui la distingue de la [farine de manioc pour foufou](/produit/farine-de-foufou), qu'il faut travailler à l'eau bouillante. Le foufou est plus souple et plus neutre ; la chikwangue, ferme et un peu acide, se tient comme un pain. L'[attiéké déshydraté](/produit/attieke-sec) offre une autre façon de servir le manioc fermenté, en semoule.\n\nVérifiez que les feuilles sont intactes et la pâte bien blanche ou grisée de façon uniforme, sans taches. Une odeur un peu aigre est normale, une odeur forte ne l'est pas.",
    conserver:
      "Suivez la date indiquée sur l'emballage. Une fois ouverte, gardez-la dans ses feuilles ou dans un film, au réfrigérateur, et consommez-la dans les jours qui suivent. Si elle a durci, quelques minutes à la vapeur lui rendent son élasticité ; évitez l'eau bouillante, qui la délite.",
    remplacer:
      "Le foufou de manioc est la solution la plus proche, surtout avec le pondu ou la moambé. Le riz blanc convient aussi à toutes les sauces congolaises. Pour accompagner un poisson braisé, des tranches de banane plantain bouillie ou de manioc frais cuit à l'eau font un bon substitut.",
    enCuisine:
      "Elle accompagne le [pondu au poisson fumé](/recette/pondu), le [liboké de poisson](/recette/liboke-de-poisson) cuit en papillote et le [poulet à la moambé](/recette/moambe). Pour réussir les sauces aux feuilles qui vont avec, lisez [Comment conserver les feuilles séchées (ndolé, manioc, sorgho) ?](/conseils/conserver-feuilles-sechees) et [Comment conserver le poisson fumé ?](/conseils/comment-conserver-le-poisson-fume).",
    faq: [
      {
        question: "Faut-il cuire la chikwangue avant de la manger ?",
        reponse:
          "Non, elle est déjà cuite. On peut la servir froide, en tranches, ou la réchauffer brièvement à la vapeur.",
      },
      {
        question: "Quelle différence entre chikwangue et bobolo ?",
        reponse:
          "Ce sont deux pains de manioc fermenté cuits dans des feuilles. Le bobolo camerounais est généralement plus fin et plus allongé, mais le principe est le même.",
      },
    ],
  },
  "tapioca-de-manioc": {
    origine:
      "Le mot tapioca vient du tupi, une langue des peuples autochtones du Brésil, berceau du manioc. Il désigne l'amidon extrait de la racine : on râpe le manioc, on le lave à grande eau, puis on laisse l'amidon se déposer au fond des bacs. Humidifiée, cette fécule est roulée en petits grains, puis chauffée pour les fixer.\n\nArrivé en Afrique avec le manioc, le tapioca s'est fait une place dans les cuisines d'Afrique de l'Ouest et centrale, surtout pour les préparations sucrées et rafraîchissantes. Contrairement au gari ou à l'attiéké, il n'est pas fermenté : son goût est presque neutre.",
    choisir:
      "Le tapioca n'a ni l'acidité du [gari jaune](/produit/gari-jaune) ni celle de l'[attiéké déshydraté](/produit/attieke-sec). Dans l'eau, il gonfle et devient translucide, alors que les deux autres restent opaques. C'est l'ingrédient des desserts, là où le gari se boit plutôt nature avec du sucre.\n\nLa taille des granules compte : les petits gonflent vite dans l'eau froide, les gros demandent une cuisson à feu doux. Choisissez des grains d'un blanc franc, sans odeur.",
    conserver:
      "Sec, il se garde très longtemps dans un bocal fermé, loin de l'humidité. Préparé, il épaissit encore en refroidissant : une bouillie se garde un jour ou deux au frais et se détend avec un peu de lait au moment de servir.",
    remplacer:
      "Les perles du japon, autre forme de fécule de manioc, donnent un dessert très proche. Pour épaissir une bouillie, la fécule de maïs fait le même travail, sans les petits grains. Pour une boisson façon gari, le gari blanc remplace le tapioca, avec une note acidulée.",
    enCuisine:
      "Il se prépare en dessert, comme le [thiakry](/recette/thiakry) ou le [dégué](/recette/degue), dont il reprend l'esprit avec lait et sucre ; parfumez-le à la [vanille bourbon de Madagascar](/produit/vanille-bourbon-de-madagascar). Pour bien distinguer les produits du manioc, lisez [Quelle différence entre gari, attiéké et tapioca ?](/conseils/difference-gari-attieke-tapioca).",
    faq: [
      {
        question: "Faut-il cuire le tapioca granulé ?",
        reponse:
          "Les petits grains gonflent dans l'eau ou le lait froid en quelques minutes. Pour une texture plus fondante, chauffez-les doucement en remuant jusqu'à ce qu'ils deviennent transparents.",
      },
      {
        question: "Le tapioca est-il la même chose que le gari ?",
        reponse:
          "Non. Le tapioca est de l'amidon de manioc roulé en grains, sans fermentation. Le gari est de la pulpe de manioc fermentée et torréfiée.",
      },
    ],
  },
  "farine-de-mais-blanc": {
    origine:
      "Le maïs vient du Mexique. Les Portugais l'ont introduit en Afrique au XVIe siècle, et il s'est répandu jusqu'à devenir l'aliment de base de nombreux pays, surtout en Afrique de l'Est et australe. Partout, la même préparation s'est imposée : une farine cuite dans l'eau jusqu'à former une pâte ferme, qui porte un nom différent selon les pays, ugali au Kenya et en Tanzanie, nshima en Zambie et au Malawi, sadza au Zimbabwe, pap en Afrique du Sud.\n\nIwisa est une marque sud-africaine de farine de maïs, aujourd'hui exploitée par le groupe alimentaire Premier. En Afrique du Sud, l'appellation « super maize meal » désigne la farine la plus raffinée, très blanche et très fine.",
    choisir:
      "Une farine « super » donne une pâte lisse et claire. Les farines moins raffinées, dites « special » ou « sifted » en Afrique du Sud, sont plus granuleuses et plus parfumées. Comparée à la [farine de manioc pour foufou](/produit/farine-de-foufou), la pâte de maïs est moins élastique et se coupe plus facilement ; la [farine d'igname](/produit/farine-d-igname) donne une amala brune au goût fumé.\n\nNe la confondez pas avec la polenta, faite de maïs jaune moulu plus gros, ni avec la fécule de maïs, qui n'est que de l'amidon.",
    conserver:
      "Ce lot comprend deux sachets d'un kilo : gardez le second fermé jusqu'à l'ouverture. Le sachet entamé se replie et se range dans une boîte hermétique, à l'abri des mites alimentaires. La pâte cuite se conserve un jour au frais.",
    remplacer:
      "Une semoule de maïs blanc ou une polenta fine donnent une pâte proche, plus jaune et un peu plus granuleuse. La farine de manioc pour foufou convient aussi aux sauces gluantes. Pour un dépannage, le riz blanc accompagne le sukuma wiki ou la sauce gombo sans difficulté.",
    enCuisine:
      "Elle fait le tô du [tô et sauce gombo](/recette/to-sauce-gombo) burkinabè et l'ugali de l'[ugali et sukuma wiki](/recette/ugali-sukuma-wiki) kényan. En Afrique du Sud, le pap accompagne volontiers le [chakalaka](/recette/chakalaka) et les grillades. Pour la sauce gombo, lisez [Comment réussir une sauce gombo qui file ?](/conseils/sauce-gombo-qui-file) ; une [spatule en bois](/produit/spatules-en-bois) robuste aide à tourner la pâte.",
    faq: [
      {
        question: "Tô, ugali et pap, est-ce le même plat ?",
        reponse:
          "Presque. Tous trois sont des pâtes de farine de maïs cuite à l'eau. Seuls changent le nom, la fermeté et les sauces qui les accompagnent selon les pays.",
      },
      {
        question: "Pourquoi ma pâte de maïs fait-elle des grumeaux ?",
        reponse:
          "La farine a sans doute été versée trop vite. Ajoutez-la en pluie fine dans l'eau frémissante en tournant sans arrêt, puis écrasez les grumeaux contre la paroi.",
      },
    ],
  },
  "farine-de-pois-chiches": {
    origine:
      "Le pois chiche est cultivé depuis l'Antiquité autour de la Méditerranée et au Proche-Orient, et l'Éthiopie en est aujourd'hui un grand producteur africain. Moulu, il donne une farine jaune pâle qui sert de base à des préparations très différentes selon les pays : la socca niçoise, la panisse marseillaise, les pakoras indiens ou le shiro éthiopien.\n\nEn Éthiopie et en Érythrée, le shiro est un plat de tous les jours. Il tient une grande place les jours de jeûne de l'Église orthodoxe, notamment le mercredi et le vendredi, où l'on se passe de viande et de laitages. Sur les marchés, la farine se vend souvent déjà mélangée aux épices ; on peut aussi la préparer soi-même avec du berbéré.",
    choisir:
      "Cette farine est issue de l'agriculture biologique et ne contient que des pois chiches moulus. Une farine fine se délaye sans grumeaux ; une farine trop grossière laisse une texture sableuse dans le shiro. Pour retrouver le goût éthiopien, associez-la au [berbéré d'Éthiopie](/produit/berbere), qui apporte piment et épices.\n\nDans la boutique, elle se différencie de la [farine de teff](/produit/farine-de-teff), qui sert à l'injera, et des farines de pâte comme la [farine de manioc pour foufou](/produit/farine-de-foufou) : elle épaissit les sauces plutôt qu'elle ne forme une boule.",
    conserver:
      "Comme toutes les farines de légumineuses, elle supporte mal la chaleur et l'humidité. Gardez-la dans un bocal fermé, au frais, et utilisez-la dans les mois qui suivent l'ouverture. Le shiro cuit se conserve deux jours au réfrigérateur et se réchauffe avec un peu d'eau.",
    remplacer:
      "Une farine de lentilles corail ou de fèves donne un shiro proche ; en Éthiopie, certaines versions associent d'ailleurs pois chiches et fèves. Pour un plat aux lentilles sans farine, le misir wat reprend les mêmes épices avec des lentilles entières.",
    enCuisine:
      "Elle fait le [shiro](/recette/shiro), servi sur l'[injera au teff](/recette/injera), avec le [misir wat](/recette/misir-wat) pour un repas sans viande. Pour comprendre l'épice qui les relève, lisez [Qu'est-ce que le berbéré et avec quoi le cuisiner ?](/conseils/quest-ce-que-le-berbere), et pour d'autres idées végétales, [Quels plats africains sont naturellement végétariens ?](/conseils/plats-africains-vegetariens).",
    faq: [
      {
        question: "Faut-il griller la farine de pois chiches pour le shiro ?",
        reponse:
          "Ce n'est pas obligatoire, mais quelques minutes à sec dans une poêle, en remuant, développent un goût de noisette grillée et atténuent la saveur crue de la légumineuse.",
      },
      {
        question: "Le shiro se mange-t-il chaud ?",
        reponse:
          "Oui, on le sert bien chaud, souvent dans un petit pot en terre, et on le saisit avec des morceaux d'injera.",
      },
    ],
  },
  "infusion-de-tamarin": {
    origine:
      "Le tamarinier, Tamarindus indica, est un grand arbre des savanes d'Afrique tropicale, d'où il a gagné l'Asie et l'Amérique. Son nom français vient de l'arabe tamr hindi, « datte de l'Inde », car les Arabes le tenaient pour un fruit venu d'Inde. Au Sénégal, on l'appelle dakhar en wolof.\n\nSes gousses brunes renferment une pulpe collante, à la fois sucrée et franchement acide. En Afrique de l'Ouest, elle sert à préparer des boissons de fête et apporte aussi de l'acidité à certaines sauces, à la manière d'un jus de citron. Le tamarin séché en sachets permet de retrouver ce goût sans avoir à dénoyauter ni à filtrer la pulpe.",
    choisir:
      "Parmi les boissons de la boutique, le tamarin se place du côté acidulé et fruité, comme les [fleurs de bissap](/produit/fleurs-de-bissap), qui donnent une boisson rouge plus florale, et le [pain de singe](/produit/poudre-de-baobab), dont on tire un jus crémeux. Le [kinkeliba](/produit/kinkeliba) et la [citronnelle séchée](/produit/citronnelle-sechee) sont plus herbacés, l'[infusion de gingembre](/produit/infusion-de-gingembre) plus piquante.\n\nLes sachets offrent un dosage régulier et une préparation sans résidus. Pour un goût plus intense et une boisson épaisse, la pulpe de tamarin en bloc, que l'on trouve dans les épiceries asiatiques, reste une alternative.",
    conserver:
      "Les sachets craignent l'humidité, qui ramollit le tamarin et lui fait perdre son parfum. Refermez la boîte après usage et rangez-la loin de la bouilloire ou de l'évier. Une carafe préparée se garde au réfrigérateur, couverte, et se boit de préférence le jour même, car son goût s'affadit ensuite.",
    remplacer:
      "La pulpe de tamarin en bloc, délayée dans l'eau chaude puis filtrée, donne une boisson plus dense. À défaut de tamarin, un jus de bissap légèrement sucré ou une citronnade au citron vert apportent une acidité comparable, sans le goût de fruit sec. En cuisine, un trait de citron remplace l'eau de tamarin dans les sauces.",
    enCuisine:
      "Au Burkina Faso, l'eau de tamarin peut acidifier la sauce du [tô et sauce gombo](/recette/to-sauce-gombo), à la place du citron. Pour une table de boissons, servez-la à côté du [jus de bissap](/recette/jus-de-bissap), du [jus de gingembre](/recette/jus-de-gingembre) et du [jus de bouye](/recette/jus-de-bouye). Le secret de la sauce qui file est expliqué dans [Comment réussir une sauce gombo qui file ?](/conseils/sauce-gombo-qui-file).",
    faq: [
      {
        question: "Le tamarin est-il sucré ou acide ?",
        reponse:
          "Les deux à la fois. Sa pulpe mêle une note de fruit sec et une acidité marquée ; l'infusion s'adoucit avec un peu de sucre ou de miel.",
      },
      {
        question: "Que signifie dakhar ?",
        reponse:
          "C'est le nom wolof du tamarinier et de son fruit. Au Sénégal, on parle aussi de jus de dakhar pour la boisson au tamarin.",
      },
    ],
  },
  "infusion-de-gingembre": {
    origine:
      "Le gingembre, Zingiber officinale, est originaire d'Asie du Sud-Est. Il a gagné l'Afrique par les routes commerciales anciennes et s'y cultive aujourd'hui largement : le Nigeria compte parmi les premiers producteurs mondiaux, avec une grande zone de culture dans le sud de l'État de Kaduna. On utilise le rhizome, cette tige souterraine noueuse que l'on appelle souvent racine.\n\nEn Afrique de l'Ouest, le gingembre se boit plus qu'il ne se mange. En Côte d'Ivoire, le gnamankoudji est un jus de gingembre frais râpé, pressé et sucré, souvent relevé d'ananas ou de citron. Séché et coupé en sachets, il se prête à une préparation plus rapide.",
    choisir:
      "Cette infusion est la plus piquante des boissons de la boutique. Le [bissap](/produit/fleurs-de-bissap) et le [tamarin](/produit/infusion-de-tamarin) misent sur l'acidité, la [citronnelle séchée](/produit/citronnelle-sechee) sur la fraîcheur ; le [thé noir à la cardamome](/produit/the-noir-du-kenya-cardamome) associe épice et théine.\n\nLe gingembre séché a un goût plus chaud et moins citronné que le frais. Pour un jus de fête bien relevé, le rhizome frais reste irremplaçable ; pour une tasse chaude en quelques minutes, les sachets sont plus pratiques.",
    conserver:
      "Comme toutes les plantes séchées, il perd son piquant à la lumière et à l'air. Gardez la boîte fermée dans un placard sec. Une infusion préparée se conserve au réfrigérateur dans une bouteille en verre bien bouchée ; consommez-la dans les deux jours pour garder son mordant.",
    remplacer:
      "Quelques rondelles de gingembre frais, frémies dix minutes dans l'eau, font une infusion plus vive. Le gingembre en poudre dépanne, mais il trouble la boisson. Pour une boisson chaude épicée sans gingembre, la cannelle et le clou de girofle donnent une chaleur différente, plus douce.",
    enCuisine:
      "Elle reprend la saveur du [jus de gingembre (gnamankoudji)](/recette/jus-de-gingembre), dont la recette complète est détaillée dans [Comment faire un jus de gingembre maison ?](/conseils/faire-un-jus-de-gingembre-maison). Le gingembre relève aussi le [chai kényan](/recette/chai-kenyan) et le [kahawa chungu](/recette/kahawa-chungu), le café épicé de la côte swahilie.",
    faq: [
      {
        question: "Gingembre séché ou frais pour une boisson ?",
        reponse:
          "Le frais donne un goût plus vif et citronné, idéal pour les jus. Le séché, plus chaud et plus rond, convient bien aux infusions chaudes.",
      },
      {
        question: "Qu'est-ce que le gnamankoudji ?",
        reponse:
          "C'est le jus de gingembre ivoirien, préparé avec du gingembre frais râpé, de l'eau et du sucre, souvent avec de l'ananas, du citron ou de la menthe.",
      },
    ],
  },
  "cafe-du-kivu": {
    origine:
      "Le lac Kivu s'étire entre la RD Congo et le Rwanda, à près de 1 500 mètres d'altitude, au pied de volcans actifs comme le Nyiragongo. Les caféiers arabica y ont été plantés à l'époque coloniale belge, sur les collines du Nord et du Sud-Kivu et sur l'île d'Idjwi. Les terres volcaniques, l'altitude et les pluies régulières conviennent particulièrement à cette espèce.\n\nLes guerres qui ont frappé l'est du pays ont longtemps désorganisé la filière. Depuis les années 2010, des coopératives ont relancé la culture et le lavage du café, et les cafés du Kivu reviennent dans les dégustations spécialisées.",
    choisir:
      "Le café du Kivu se rapproche de ses voisins des Grands Lacs, le [café du Rwanda](/produit/cafe-du-rwanda) et le [café du Burundi](/produit/cafe-du-burundi), avec qui il partage les mêmes paysages de collines. Il est plus rond et moins acide qu'un [café du Kenya](/produit/cafe-du-kenya), plus doux qu'un [Harrar](/produit/cafe-harrar) d'Éthiopie.\n\nC'est l'un des rares cafés moulus de la boutique, avec le [Moka Sidamo](/produit/cafe-moka-sidamo) : un choix pratique si vous n'avez pas de moulin. Les autres origines sont proposées en grains, plus longues à garder fraîches une fois le paquet ouvert.",
    conserver:
      "Le café moulu s'évente vite, car sa surface au contact de l'air est immense. Une fois le paquet entamé, chassez l'air avant de le refermer avec une pince, ou transvasez la mouture dans une boîte opaque et étanche. Évitez le réfrigérateur : les allers-retours créent de la condensation qui altère l'arôme.",
    remplacer:
      "Un café moulu du Rwanda ou du Burundi offre un profil très proche. À défaut, choisissez un arabica d'Amérique centrale, doux et peu acide. Si vous préparez un café éthiopien à la place, attendez-vous à une tasse plus florale et plus légère.",
    enCuisine:
      "Pour situer son goût parmi les grandes origines africaines, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda). Pour choisir entre grains et mouture, [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu) répond à l'essentiel. La [bouilloire émaillée](/produit/bouilloire-emaillee) chauffe l'eau d'un café filtre.",
    faq: [
      {
        question: "Le café du Kivu vient-il du Congo ou du Rwanda ?",
        reponse:
          "Le lac Kivu borde les deux pays. Ce café vient de la rive congolaise, dans l'est de la RD Congo ; le Rwanda produit lui aussi des cafés sur l'autre rive.",
      },
      {
        question: "Peut-on préparer ce café moulu en expresso ?",
        reponse:
          "Sa mouture est prévue pour le filtre et la cafetière italienne. Pour l'expresso, il faudrait une mouture plus fine, donc plutôt des grains moulus sur place.",
      },
    ],
  },
  "cafe-vert-du-cameroun": {
    origine:
      "Le Cameroun cultive les deux grandes espèces de caféier : le robusta dans les régions de basse altitude, et l'arabica sur les hauts plateaux de l'Ouest et du Nord-Ouest. Le café vert est le grain tel qu'il sort de la plantation, débarrassé de sa pulpe et de sa parche puis séché, mais pas encore grillé. Il est dur, gris-vert et sent la céréale plus que le café.\n\nDans de nombreux foyers camerounais, on le torréfie encore à la poêle ou dans une marmite, en remuant longuement au-dessus du feu. Le grain vert sert aussi au café Touba sénégalais : il est grillé avec du poivre de Selim, le djar, avant d'être moulu.",
    choisir:
      "Le grain vert s'adresse à ceux qui veulent torréfier eux-mêmes et choisir la couleur de leur café. Pour un café prêt à moudre, le [café en grains du Cameroun (Bamoun)](/produit/cafe-du-cameroun) a déjà été torréfié. Pour le café Touba, associez-le au [poivre de Selim](/produit/poivre-de-selim), qui donne son parfum fumé.\n\nUn bon lot présente des grains de taille régulière, sans grains noirs, cassés ou piqués d'insectes. Ils doivent être bien secs et sans odeur de moisi.",
    conserver:
      "C'est la grande force du café vert : non torréfié, il se garde bien plus longtemps qu'un café grillé, à condition de rester au sec, au frais et à l'abri de la lumière, dans un sac en toile ou un bocal. Une fois torréfié, il redevient fragile : laissez-le dégazer quelques heures, puis gardez-le dans un contenant hermétique et consommez-le dans les semaines qui suivent.",
    remplacer:
      "Sans grains verts, un café torréfié clair, moulu au dernier moment, donne une tasse comparable. Pour le café Touba, on trouve aussi le mélange déjà grillé et moulu ; à défaut, un café robusta corsé mélangé à une pincée de poivre de Selim pilé s'en approche.",
    enCuisine:
      "Il sert à préparer le [café Touba](/recette/cafe-touba), dont l'histoire est racontée dans [Qu'est-ce que le café Touba et comment le préparer ?](/conseils/quest-ce-que-le-cafe-touba). La méthode à la poêle ou au four est détaillée dans [Comment torréfier du café vert à la maison ?](/conseils/torrefier-cafe-vert-maison), et le [mortier en granit](/produit/mortier-en-granit) peut concasser les grains grillés.",
    faq: [
      {
        question: "Peut-on boire du café vert sans le torréfier ?",
        reponse:
          "On peut l'infuser, mais il n'a pas le goût du café : la torréfaction développe les arômes et la couleur. Pour un vrai café, il faut le griller.",
      },
      {
        question: "Comment savoir quand la torréfaction est terminée ?",
        reponse:
          "Les grains craquent une première fois en gonflant, puis prennent une couleur brune. Arrêtez quand la teinte vous convient : plus le grain est foncé, plus le café est amer.",
      },
    ],
  },
  "cafe-moka-sidamo": {
    origine:
      "L'Éthiopie est le pays d'origine de l'arabica : le caféier y pousse encore à l'état sauvage dans les forêts du sud-ouest. C'est aussi le premier producteur de café du continent. Sidamo, au sud de la vallée du Rift, est l'une de ses grandes régions caféières ; elle tire son nom du peuple sidama, qui a obtenu en 2020 son propre État régional au sein de la fédération.\n\nLe mot « moka » rappelle le port de Mocha, au Yémen, par lequel les cafés de la mer Rouge ont été exportés pendant des siècles. Il désigne encore aujourd'hui, en France, les cafés d'Éthiopie et du Yémen. La plupart des caféiers de Sidamo sont cultivés par de petits paysans, à l'ombre d'autres arbres.",
    choisir:
      "Le Sidamo offre une tasse florale et fruitée, un peu plus ronde que le [Yirgacheffe](/produit/cafe-yirgacheffe), sa région voisine, plus léger et plus citronné. Le [Harrar](/produit/cafe-harrar), séché dans son fruit, est plus corsé et chocolaté. Parmi les cafés des autres pays, le [café du Kenya](/produit/cafe-du-kenya) se montre plus acide.\n\nCe Sidamo est vendu moulu, comme le [café du Kivu](/produit/cafe-du-kivu) : c'est la solution la plus simple si vous n'avez pas de moulin. Les autres cafés éthiopiens de la boutique sont en grains.",
    conserver:
      "La mouture d'un café floral perd ses notes délicates en premier. Gardez le paquet dans un placard sombre et tempéré, refermé aussitôt après usage, et prévoyez de le finir en deux à trois semaines après ouverture. Une boîte à café munie d'une valve ou d'un couvercle étanche fait très bien l'affaire.",
    remplacer:
      "Un autre café d'Éthiopie, Yirgacheffe ou Guji, garde l'esprit floral. Si vous préférez un café d'un autre pays, un arabica lavé du Rwanda donne une tasse douce et fruitée, moins parfumée. Évitez les robustas, trop amers pour remplacer un moka.",
    enCuisine:
      "Il convient à une cérémonie du café préparée à la maison, décrite dans [Comment se déroule la cérémonie du café éthiopienne ?](/conseils/ceremonie-du-cafe-ethiopienne) ; la recette du [buna, le café éthiopien](/recette/buna-cafe-ethiopien), en donne les étapes. Pour comparer les grandes origines, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda).",
    faq: [
      {
        question: "Moka, est-ce une variété de café ?",
        reponse:
          "Non. Le mot vient du port yéménite de Mocha et désigne, par tradition, des cafés d'Éthiopie ou du Yémen. Il ne correspond ni à une variété ni à une cafetière.",
      },
      {
        question: "Sidamo et Sidama, quelle différence ?",
        reponse:
          "C'est la même région. Sidama est le nom du peuple et de l'État régional ; Sidamo est la forme utilisée depuis longtemps dans le commerce du café.",
      },
    ],
  },
  "cafe-du-kenya": {
    origine:
      "Au Kenya, le café pousse sur les hauts plateaux volcaniques autour du mont Kenya, dans les comtés de Nyeri, Kirinyaga ou Murang'a, souvent entre 1 400 et 2 000 mètres. Les variétés les plus réputées, SL28 et SL34, ont été sélectionnées dans les années 1930 par les Scott Agricultural Laboratories, d'où leurs initiales.\n\nLe café kényan est presque toujours lavé : la pulpe est retirée, les grains fermentent dans l'eau, puis sèchent sur de grandes tables surélevées. Il est ensuite classé selon la taille des grains : AA pour les plus gros, AB pour les suivants, PB pour les caracolis, ces grains ronds nés seuls dans la cerise. Une bonne partie se vend chaque semaine aux enchères de Nairobi.",
    choisir:
      "C'est le plus vif des cafés de la boutique. Il partage l'altitude et le lavage avec le [café de Tanzanie](/produit/cafe-de-tanzanie), son voisin, plus équilibré. Le [café du Rwanda](/produit/cafe-du-rwanda) et le [café du Burundi](/produit/cafe-du-burundi) sont plus doux et plus sucrés ; les cafés d'Éthiopie, comme le [Yirgacheffe](/produit/cafe-yirgacheffe), plus floraux.\n\nSur un paquet kényan, la mention AA renseigne sur la taille, pas directement sur le goût. L'indication d'une région ou d'une coopérative est souvent un meilleur repère.",
    conserver:
      "En grains, il garde son acidité éclatante si vous le protégez de l'air. Choisissez un bocal opaque fermant bien, dans un placard loin du four. Ne moulez que pour une ou deux préparations : la mouture perd en quelques jours ce que le grain garde plusieurs semaines.",
    remplacer:
      "Un café de Tanzanie lavé est la solution la plus proche, un peu plus doux. Pour retrouver des notes de fruits rouges, un café du Burundi convient aussi. Le kahawa chungu, très épicé, se prépare sans difficulté avec un autre arabica corsé.",
    enCuisine:
      "Il sert au [kahawa chungu](/recette/kahawa-chungu), le café amer à la cardamome et au gingembre de la côte swahilie. Pour comprendre ce qui le distingue des cafés éthiopiens et rwandais, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda), puis [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu).",
    faq: [
      {
        question: "Que signifie AA sur un café du Kenya ?",
        reponse:
          "C'est une catégorie de taille : les grains AA sont les plus gros du tri kényan. La note ne garantit pas à elle seule la qualité de la tasse.",
      },
      {
        question: "Pourquoi le café du Kenya est-il si acide ?",
        reponse:
          "L'altitude, les sols volcaniques, les variétés SL28 et SL34 et un lavage minutieux concourent à cette acidité vive, souvent comparée au cassis ou aux agrumes.",
      },
    ],
  },
  "cafe-harrar": {
    origine:
      "Harrar est le nom d'une région de café des hautes terres de l'est éthiopien, autour de la vieille ville fortifiée de Harar, inscrite au patrimoine mondial de l'UNESCO en 2006. Le café y est cultivé de longue date par de petits paysans, souvent sur des terrasses sèches. Il est presque toujours préparé « nature » : les cerises sèchent entières au soleil, et le grain s'imprègne du fruit.\n\nLe nom est protégé avec soin par l'Éthiopie. À partir de 2005, le pays a déposé les marques Harrar, Sidamo et Yirgacheffe dans de nombreux pays ; un accord signé en 2007 avec Starbucks a reconnu que ces noms appartiennent à l'Éthiopie.",
    choisir:
      "Le Harrar est le plus corsé des cafés éthiopiens de la boutique. Le [Yirgacheffe](/produit/cafe-yirgacheffe), lavé, est léger et floral ; le [Moka Sidamo](/produit/cafe-moka-sidamo) se situe entre les deux. Si vous aimez les cafés chocolatés, le [café du Cameroun (Bamoun)](/produit/cafe-du-cameroun) offre une autre voie, plus ronde et moins fruitée.\n\nLe séchage nature donne parfois des grains de couleur un peu irrégulière après torréfaction : c'est normal pour ce type de café et cela n'indique pas un défaut.",
    conserver:
      "Gardez les grains dans leur sachet à valve, bien roulé, ou dans un bocal opaque. Un café nature conserve longtemps ses notes de fruits secs, mais il craint lui aussi la chaleur et l'humidité. Ne le stockez pas près des épices : le grain capte facilement les odeurs voisines.",
    remplacer:
      "Un autre café éthiopien nature, comme un Guji ou un Sidamo nature, donne un profil fruité comparable, avec la même impression de confiture de fruits rouges. Pour retrouver le corps et le chocolat, un café du Cameroun ou du Brésil peut convenir, avec moins de fruit.",
    enCuisine:
      "Il s'accorde avec la [cérémonie du café éthiopienne](/conseils/ceremonie-du-cafe-ethiopienne), où l'on torréfie et moud les grains devant les invités ; la recette du [buna, le café éthiopien](/recette/buna-cafe-ethiopien) en donne la marche à suivre. Pour comparer avec d'autres origines, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda).",
    faq: [
      {
        question: "Que veut dire café « nature » ?",
        reponse:
          "Les cerises de café sèchent entières, avec leur pulpe, avant qu'on en retire le grain. Ce séchage donne des notes plus fruitées et plus corsées qu'un café lavé.",
      },
      {
        question: "Harrar ou Harar ?",
        reponse:
          "Harar est la ville, Harrar l'orthographe la plus courante sur les paquets de café de la région. Les deux renvoient au même terroir de l'est éthiopien.",
      },
    ],
  },
  "cafe-yirgacheffe": {
    origine:
      "Yirgacheffe est une petite ville du sud de l'Éthiopie, dans la zone Gedeo, entourée de collines couvertes de caféiers. Les paysans y cultivent de vieilles variétés locales, regroupées sous le nom d'« heirloom », sur des parcelles minuscules, souvent à l'ombre de faux bananiers et d'autres arbres. Les cerises sont portées à des stations de lavage qui traitent la récolte de centaines de familles.\n\nLe café de Yirgacheffe est surtout connu en version lavée, ce qui lui donne une tasse claire et précise. Son nom, comme ceux de Harrar et de Sidamo, fait partie des appellations que l'Éthiopie a fait enregistrer comme marques dans les années 2000.",
    choisir:
      "C'est le plus léger et le plus floral des cafés de la boutique. Le [Moka Sidamo](/produit/cafe-moka-sidamo) est plus rond, le [Harrar](/produit/cafe-harrar) plus corsé et chocolaté. Hors d'Éthiopie, le [café du Rwanda](/produit/cafe-du-rwanda) partage sa douceur, avec moins de parfum de fleur ; le [café du Kenya](/produit/cafe-du-kenya) est plus acide.\n\nPour le découvrir, préférez une torréfaction claire à moyenne : une torréfaction trop poussée efface les notes de jasmin et d'agrumes qui font sa réputation.",
    conserver:
      "Ses arômes délicats sont les premiers à disparaître. Prenez-le en petite quantité, gardez les grains dans un contenant opaque et étanche, et prévoyez de les utiliser dans le mois qui suit l'ouverture. Un placard tempéré vaut mieux que le dessus du réfrigérateur, souvent chaud.",
    remplacer:
      "Un autre café lavé du sud éthiopien, Sidamo ou Guji, est le remplacement naturel. À défaut, un café lavé du Rwanda ou du Burundi donne une tasse douce et fruitée. Pour le buna, n'importe quel arabica éthiopien convient, puisque la recette compte surtout sur la torréfaction faite à la maison.",
    enCuisine:
      "C'est le café de la recette du [buna, le café éthiopien](/recette/buna-cafe-ethiopien), servi en trois tournées lors de la [cérémonie du café](/conseils/ceremonie-du-cafe-ethiopienne). Pour comprendre son profil, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda). L'eau peut chauffer dans la [bouilloire émaillée](/produit/bouilloire-emaillee).",
    faq: [
      {
        question: "Que signifie « heirloom » sur un café éthiopien ?",
        reponse:
          "Le mot regroupe les nombreuses variétés locales d'arabica cultivées en Éthiopie, souvent mêlées dans une même parcelle et difficiles à distinguer.",
      },
      {
        question: "Quelle méthode convient le mieux au Yirgacheffe ?",
        reponse:
          "Les méthodes douces, filtre ou cafetière à piston, mettent en valeur ses notes florales. En expresso, il donne une tasse vive, parfois surprenante.",
      },
    ],
  },
  "cafe-du-cameroun": {
    origine:
      "Le pays Bamoun, dont la capitale historique est Foumban, s'étend sur les hauts plateaux de l'Ouest camerounais. L'arabica y a été développé pendant la période coloniale française, autour de Foumbot, Koutaba et Kouti, sur des terres volcaniques fertiles. L'administration y créa une coopérative des planteurs de « café d'Arabie » du pays Bamoun, et un moulin hydraulique installé près de Foumban servit à décortiquer les premières récoltes.\n\nAujourd'hui, l'arabica ne représente qu'une petite part du café camerounais, dominé par le robusta des basses terres. Celui de l'Ouest, cultivé en altitude par de petits producteurs, est le plus recherché pour la tasse.",
    choisir:
      "Ce café en grains donne une tasse ronde et chocolatée, plus proche du [Harrar](/produit/cafe-harrar) que des cafés floraux d'Éthiopie, mais moins fruitée. Comparé au [café du Kenya](/produit/cafe-du-kenya), il est bien moins acide. Pour torréfier vous-même, le [café vert du Cameroun](/produit/cafe-vert-du-cameroun) existe en grains non grillés.\n\nSi vous buvez surtout du café au lait, c'est l'un des choix les plus sûrs de la boutique : son corps tient bien face au lait.",
    conserver:
      "Les grains se gardent mieux dans un bocal opaque que dans un pot en verre exposé à la lumière. Refermez le sachet en chassant l'air et tenez-le loin des sources de chaleur. Si vous en avez beaucoup, divisez-les en petites portions et n'ouvrez qu'une portion à la fois.",
    remplacer:
      "Un café du Brésil ou un autre arabica d'altitude au profil chocolaté remplace bien ce café. Pour rester en Afrique, le Harrar éthiopien apporte du corps avec davantage de fruit. Un robusta camerounais, plus amer et plus corsé, convient aux amateurs de café très fort.",
    enCuisine:
      "Il se prête à toutes les méthodes, de l'expresso à la cafetière à piston. Pour savoir s'il vaut mieux le garder en grains, lisez [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu). Pour griller vos propres grains à la camerounaise, voyez [Comment torréfier du café vert à la maison ?](/conseils/torrefier-cafe-vert-maison).",
    faq: [
      {
        question: "Le Cameroun produit-il surtout de l'arabica ?",
        reponse:
          "Non, le robusta y domine largement. L'arabica pousse surtout sur les hauts plateaux de l'Ouest et du Nord-Ouest, dont le pays Bamoun.",
      },
      {
        question: "Où se trouve le pays Bamoun ?",
        reponse:
          "Dans la région de l'Ouest du Cameroun, autour de Foumban, ancienne capitale du royaume bamoun, à quelques heures de route de Douala.",
      },
    ],
  },
  "cafe-du-rwanda": {
    origine:
      "Le café serait arrivé au Rwanda au début du XXe siècle avec des missionnaires allemands, à Mibirizi, près du lac Kivu. Il a longtemps été une culture imposée et exportée sans distinction de qualité. Les choses ont changé dans les années 2000, avec la construction de nombreuses stations de lavage qui permettent aux petits producteurs de traiter leurs cerises le jour même de la cueillette.\n\nLa grande majorité des caféiers rwandais appartiennent à la famille Bourbon, une lignée d'arabica réputée pour sa douceur. Ils poussent sur les collines du pays, souvent entre 1 500 et 2 000 mètres, où les nuits fraîches ralentissent la maturation des cerises.",
    choisir:
      "Le café du Rwanda est doux, sucré et fruité. Il ressemble beaucoup au [café du Burundi](/produit/cafe-du-burundi), son voisin, et au [café du Kivu](/produit/cafe-du-kivu), cultivé sur l'autre rive du lac. Il est moins acide que le [café du Kenya](/produit/cafe-du-kenya) et moins floral que le [Yirgacheffe](/produit/cafe-yirgacheffe).\n\nC'est un bon café pour commencer si vous découvrez les origines africaines : il plaît aussi bien nature qu'avec un peu de lait.",
    conserver:
      "Comme tout café torréfié en grains, il donne le meilleur de lui-même dans les semaines qui suivent sa torréfaction. Rangez-le dans un pot hermétique à l'abri de la lumière, et évitez le congélateur si vous devez l'ouvrir souvent. Ne moulez que la dose du jour.",
    remplacer:
      "Le café du Burundi est son remplaçant naturel, avec un profil très proche. Le café du Kivu, moulu, convient si vous n'avez pas de moulin. Un arabica d'Amérique centrale, doux et sucré, peut aussi faire l'affaire si vous ne trouvez aucun café des Grands Lacs.",
    enCuisine:
      "Pour comprendre ce qui le distingue des cafés d'Éthiopie et du Kenya, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda). Le choix entre grains et mouture est expliqué dans [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu). Il accompagne volontiers les [puff-puff](/recette/puff-puff) du goûter.",
    faq: [
      {
        question: "Qu'est-ce qu'une station de lavage ?",
        reponse:
          "C'est un atelier où les cerises fraîches sont dépulpées, fermentées, lavées puis séchées. Au Rwanda, elles ont permis aux petits producteurs de mieux valoriser leur récolte.",
      },
      {
        question: "Le café du Rwanda est-il un arabica ?",
        reponse:
          "Oui, la quasi-totalité du café rwandais est de l'arabica, surtout de la famille Bourbon.",
      },
    ],
  },
  "cafe-de-tanzanie": {
    origine:
      "En Tanzanie, l'arabica représente environ les deux tiers de la production. Il pousse surtout sur les pentes du Kilimandjaro et du mont Meru, dans le nord, où les Chagga ont fait du café leur grande culture dès la fin du XIXe siècle ; ils fondèrent en 1925 l'une des premières coopératives de planteurs africains. D'autres régions caféières se trouvent au sud, autour de Mbeya.\n\nLe robusta, lui, est chez lui dans la région de Kagera, à l'ouest du lac Victoria. Les Haya y cultivaient le caféier bien avant l'époque coloniale : les cerises bouillies puis fumées s'offraient en cadeau et servaient même de monnaie d'échange.",
    choisir:
      "Le café de Tanzanie est vif mais équilibré, à mi-chemin entre le [café du Kenya](/produit/cafe-du-kenya), plus acide, et les cafés doux du [Rwanda](/produit/cafe-du-rwanda) ou du [Burundi](/produit/cafe-du-burundi). Il a moins de notes florales que le [Yirgacheffe](/produit/cafe-yirgacheffe).\n\nLa Tanzanie est aussi connue pour ses caracolis, appelés peaberry en anglais : des grains ronds, nés seuls dans la cerise, triés à part. Un paquet portant la mention « PB » en contient.",
    conserver:
      "Gardez les grains au sec et au frais, dans leur sachet bien refermé ou dans une boîte hermétique. Évitez de les laisser dans un moulin à trémie pendant plusieurs jours : exposés à l'air et à la lumière, ils perdent vite leur vivacité et leurs notes de fruits.",
    remplacer:
      "Un café du Kenya donne un profil proche, en plus acide et plus marqué. Pour une tasse plus douce, choisissez un café du Burundi ou du Rwanda. Hors d'Afrique, un arabica lavé de Colombie présente le même équilibre entre vivacité et rondeur.",
    enCuisine:
      "Il convient au [kahawa chungu](/recette/kahawa-chungu), le café épicé de la côte swahilie, que l'on boit aussi à Zanzibar. Pour situer son goût, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda), et pour bien le garder, [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu).",
    faq: [
      {
        question: "Qu'est-ce qu'un caracoli ?",
        reponse:
          "Un grain de café rond, formé seul dans la cerise au lieu des deux grains habituels. On le trie à part ; la Tanzanie en exporte régulièrement.",
      },
      {
        question: "Le café de Tanzanie pousse-t-il sur le Kilimandjaro ?",
        reponse:
          "En partie : les pentes du Kilimandjaro et du mont Meru sont les régions d'arabica les plus connues, mais le pays produit aussi du café au sud et à l'ouest.",
      },
    ],
  },
  "cafe-du-burundi": {
    origine:
      "Petit pays sans accès à la mer, au cœur de l'Afrique des Grands Lacs, le Burundi a vu le café s'implanter sous l'administration belge, dans les années 1930, comme culture obligatoire. Il est devenu l'une de ses principales sources de devises. Les caféiers, en grande majorité de la famille Bourbon, sont cultivés par des centaines de milliers de petites exploitations sur les collines.\n\nLes cerises sont livrées à des stations de lavage, longtemps regroupées en sociétés de gestion, où l'on dépulpe, fermente et sèche le café sur des claies. Depuis les réformes des années 2000, certaines stations séparent leurs lots, ce qui a permis aux cafés burundais de se faire connaître pour leur qualité.",
    choisir:
      "Le café du Burundi est sucré, fruité, avec une acidité douce. Il partage beaucoup avec le [café du Rwanda](/produit/cafe-du-rwanda), son voisin du nord, et le [café du Kivu](/produit/cafe-du-kivu). Plus doux que le [café du Kenya](/produit/cafe-du-kenya), il est moins corsé que le [café du Cameroun (Bamoun)](/produit/cafe-du-cameroun).\n\nUn bon point de départ pour ceux qui trouvent les cafés éthiopiens trop floraux ou les kényans trop acides.",
    conserver:
      "Gardez les grains dans un récipient opaque, au sec, et refermez-le aussitôt. Le café absorbe les odeurs : ne le rangez pas à côté des épices ou de l'ail. Si vous en avez beaucoup, congelez des portions bien emballées et sortez-les une à une.",
    remplacer:
      "Le café du Rwanda est le remplaçant le plus proche. Le café du Kivu, déjà moulu, dépanne si vous n'avez pas de moulin. Pour un goût sucré et fruité venu d'ailleurs, un arabica lavé du Guatemala ou du Costa Rica fait un bon substitut.",
    enCuisine:
      "Pour le comparer aux autres origines du continent, lisez [Quelle différence entre les cafés d'Éthiopie, du Kenya et du Rwanda ?](/conseils/cafes-ethiopie-kenya-rwanda) ; ses arômes sont proches de ceux du Rwanda. Pour la conservation, [Café en grains ou moulu : que choisir et comment le conserver ?](/conseils/cafe-en-grains-ou-moulu) donne les bons réflexes.",
    faq: [
      {
        question: "Le Burundi et le Rwanda produisent-ils le même café ?",
        reponse:
          "Ils sont très proches : mêmes collines d'altitude, mêmes variétés Bourbon, même lavage. Les différences tiennent surtout à chaque station et à chaque récolte.",
      },
      {
        question: "Ce café convient-il à l'expresso ?",
        reponse:
          "Oui. Torréfié un peu plus foncé, il donne un expresso doux et sucré, qui se marie aussi avec le lait.",
      },
    ],
  },
  "rooibos-vert": {
    origine:
      "Le rooibos, Aspalathus linearis, est un arbuste aux feuilles en aiguilles de la famille des légumineuses, qui ne pousse guère ailleurs que dans les montagnes du Cederberg et les environs de Clanwilliam, au nord du Cap. Son nom signifie « buisson rouge » en afrikaans, à cause de la couleur que prennent ses feuilles une fois fermentées.\n\nLe rooibos vert suit une autre voie. Aussitôt coupées, les feuilles sont séchées rapidement, sans passer par l'étape d'oxydation qui les ferait rougir. Elles restent vert olive et gardent un goût végétal, proche du foin frais, avec une légère note de miel. Cette version, plus récente que le rooibos rouge, reste moins répandue.",
    choisir:
      "La différence avec le [rooibos bio en vrac](/produit/rooibos), qui est fermenté, se voit et se goûte : infusion jaune doré d'un côté, rouge ambré de l'autre ; goût herbacé et vif d'un côté, rond et vanillé de l'autre. Le [honeybush](/produit/honeybush), autre plante du Cap, est plus mielleux. Si vous aimez le thé vert sans son amertume, le rooibos vert est un bon compromis.\n\nIssu de l'agriculture biologique, il doit présenter des brins verts uniformes, sans trop de poussière ni de bouts de tige.",
    conserver:
      "Le rooibos vert est plus fragile que le rouge : sa couleur et son parfum végétal s'estompent à la lumière. Une boîte métallique opaque, bien fermée, rangée loin des épices et du café, le protège le mieux. Prévoyez de le terminer dans l'année qui suit l'ouverture.",
    remplacer:
      "Le rooibos rouge le remplace sans difficulté, avec un goût plus doux et plus boisé. Pour garder une note herbacée, un thé vert japonais léger, infusé brièvement à basse température, s'en rapproche, mais il contient de la théine. Le honeybush donne une boisson plus sucrée.",
    enCuisine:
      "Il se prête au [rooibos glacé au citron](/recette/rooibos-glace), pour une version plus claire et plus fraîche que l'originale. Pour tout savoir sur la plante et son infusion, lisez [Qu'est-ce que le rooibos et comment l'infuser ?](/conseils/quest-ce-que-le-rooibos). L'eau peut chauffer dans la [bouilloire émaillée](/produit/bouilloire-emaillee), sans attendre l'ébullition franche.",
    faq: [
      {
        question: "Le rooibos vert est-il un thé vert ?",
        reponse:
          "Non. C'est la même plante que le rooibos rouge, simplement séchée sans fermentation. Il n'a rien à voir avec le théier, d'où vient le thé vert.",
      },
      {
        question: "Pourquoi le rooibos vert est-il plus rare ?",
        reponse:
          "Son séchage doit être très rapide pour éviter que les feuilles ne s'oxydent, ce qui demande plus de soin et de matériel que la fabrication du rooibos rouge.",
      },
    ],
  },
  "the-vert-gunpowder": {
    origine:
      "Le gunpowder vient de Chine, et en particulier de la province du Zhejiang. Chaque feuille de thé vert est roulée en une petite perle serrée, qui se déplie dans l'eau chaude. Les marchands anglais lui ont donné ce nom de « poudre à canon » à cause de sa ressemblance avec les grains de poudre noire ; en chinois, on parle plutôt de thé perlé.\n\nCe thé s'est diffusé au Maroc au XIXe siècle par le commerce britannique, puis a traversé le Sahara avec les caravanes jusqu'en Mauritanie, au Mali et au Sénégal. Le mot wolof ataaya vient d'ailleurs de l'arabe atay, « thé ». Aujourd'hui, l'Afrique de l'Ouest et le Maghreb comptent parmi les grands importateurs de thé vert chinois.",
    choisir:
      "Pour l'ataya, choisissez des perles bien serrées, d'un vert sombre et brillant, sans poussière : elles supportent l'ébullition prolongée et les trois tournées. Les perles plus grosses donnent un thé plus doux, les petites un thé plus corsé. Sur les paquets, des numéros de grade distinguent les qualités.\n\nDans la boutique, c'est le seul thé fait pour bouillir. Le [thé noir du Kenya](/produit/the-noir-du-kenya) sert au chai ; le [kinkeliba](/produit/kinkeliba) et le [rooibos](/produit/rooibos) ne sont pas des thés mais des infusions de plantes.",
    conserver:
      "Les perles serrées conservent bien leur arôme, à condition d'être protégées de l'humidité et des odeurs. Gardez-les dans une boîte métallique hermétique, à l'abri de la lumière, loin des épices. Un paquet ouvert garde sa fraîcheur plusieurs mois, surtout si l'on évite d'y plonger une cuillère humide.",
    remplacer:
      "Un thé vert chinois dit chun mee, aux feuilles en fines virgules, est l'autre grand thé de l'ataya et peut le remplacer. Un thé vert ordinaire en vrac fonctionne aussi, mais il supporte moins bien l'ébullition et devient vite très amer. Les thés en sachets conviennent mal à cette préparation.",
    enCuisine:
      "C'est le thé de l'[ataya](/recette/ataya), servi en trois verres de plus en plus sucrés. Le rituel complet, de la première tournée à la mousse, est raconté dans [Comment préparer l'ataya, le thé sénégalais en trois services ?](/conseils/comment-preparer-l-ataya). Pour servir de haut, il faut la [théière à ataya](/produit/theiere-a-ataya) à long bec et des [verres à thé](/produit/verres-a-the) assez épais pour la chaleur.",
    faq: [
      {
        question: "Pourquoi l'ataya se sert-il en trois verres ?",
        reponse:
          "Les feuilles sont réutilisées à chaque tournée en ajoutant du sucre : le premier verre est fort et amer, le troisième doux et sucré. Le rituel laisse le temps de discuter.",
      },
      {
        question: "Gunpowder et thé à la menthe, est-ce le même thé ?",
        reponse:
          "Oui, le thé à la menthe du Maghreb se prépare généralement avec du gunpowder, auquel on ajoute de la menthe fraîche et du sucre.",
      },
    ],
  },
  kinkeliba: {
    origine:
      "Le kinkeliba, Combretum micranthum, est un arbuste des savanes sèches d'Afrique de l'Ouest, que l'on trouve du Sénégal jusqu'au Niger. Ses rameaux portent de petites feuilles ovales qui virent au brun-vert en séchant. On les cueille, on les fait sécher à l'ombre, puis on les vend en bottes ou en vrac sur les marchés.\n\nAu Sénégal, il est indissociable du petit-déjeuner, que l'on appelle ndekki en wolof : on le boit chaud et sucré, avec du pain. Pendant le ramadan, il est aussi l'une des boissons du ndogou, le repas de rupture du jeûne au coucher du soleil, à côté des dattes et du café Touba.",
    choisir:
      "Le kinkeliba a un goût boisé et légèrement amer qui le distingue des autres infusions de la boutique. La [citronnelle séchée](/produit/citronnelle-sechee), qu'on lui associe souvent, apporte une fraîcheur citronnée ; le [rooibos](/produit/rooibos) est plus doux et plus rond ; le [thé vert gunpowder](/produit/the-vert-gunpowder) est un vrai thé, réservé à l'ataya.\n\nUn bon kinkeliba sent le bois sec et le foin. Préférez des feuilles entières aux brisures et à la poussière, qui donnent une infusion trouble et plus amère.",
    conserver:
      "Les feuilles séchées se gardent longtemps si elles restent au sec, dans un sac en papier fermé ou un bocal, loin de la cuisinière. L'infusion préparée se boit chaude le matin ; le reste peut attendre au réfrigérateur dans une bouteille fermée jusqu'au lendemain.",
    remplacer:
      "Rien n'imite vraiment son goût boisé. Pour une boisson chaude du matin, un rooibos nature ou un thé noir léger prennent sa place, avec un goût différent. Une infusion de citronnelle relevée d'une feuille de menthe garde l'esprit sénégalais et se sucre de la même façon.",
    enCuisine:
      "La recette du [kinkeliba du petit-déjeuner](/recette/kinkeliba) en donne la préparation complète. Pour un petit-déjeuner à la sénégalaise, servez-le avec du pain beurré ou des [puff-puff](/recette/puff-puff). Les feuilles se gardent comme les autres plantes séchées : voyez [Comment conserver les feuilles séchées (ndolé, manioc, sorgho) ?](/conseils/conserver-feuilles-sechees).",
    faq: [
      {
        question: "Le kinkeliba contient-il de la théine ?",
        reponse:
          "Ce n'est pas un thé : il provient d'un autre arbuste que le théier. On le boit donc comme une infusion de plantes, à toute heure.",
      },
      {
        question: "Faut-il faire bouillir le kinkeliba ?",
        reponse:
          "Au Sénégal, on le fait généralement frémir quelques minutes plutôt que de l'infuser simplement : ses feuilles épaisses libèrent mieux leur goût.",
      },
    ],
  },
  rooibos: {
    origine:
      "Les Khoïkhoï et les San récoltaient déjà le rooibos sauvage dans les montagnes du Cederberg, au nord du Cap, bien avant l'arrivée des Européens. Son commerce débute en 1904 avec Benjamin Ginsberg, un immigrant russe installé dans la région, qui le vend comme « thé de montagne ». Dans les années 1930, des essais menés autour de Clanwilliam parviennent à le mettre en culture, malgré des graines difficiles à faire germer.\n\nPour le rooibos rouge, les tiges sont coupées, hachées et légèrement écrasées, puis laissées en tas humides : elles fermentent et prennent leur couleur rouge, avant de sécher au soleil. Depuis 2021, le nom « Rooibos » est protégé dans l'Union européenne : c'est le premier produit alimentaire africain à recevoir cette appellation d'origine.",
    choisir:
      "Ce rooibos est fermenté et issu de l'agriculture biologique. Le [rooibos vert](/produit/rooibos-vert), non fermenté, donne une infusion plus claire et plus végétale ; le [honeybush](/produit/honeybush), cousin du Cap, est plus mielleux. Le [kinkeliba](/produit/kinkeliba), autre infusion du matin, est plus boisé et plus amer.\n\nUn bon rooibos en vrac contient surtout de fines aiguilles rouges, avec peu de morceaux de tige. Son parfum doit évoquer le miel, la vanille et le bois doux.",
    conserver:
      "Le rooibos se garde bien, mais il perd peu à peu son parfum à l'air libre. Versez-le dans une boîte hermétique, à l'abri de la lumière, et gardez-la loin des épices dont il pourrait prendre l'odeur. Une carafe de rooibos glacé se conserve deux jours au réfrigérateur.",
    remplacer:
      "Le honeybush est le remplaçant le plus proche, plus sucré. Le rooibos vert convient si vous aimez une boisson plus légère. Une infusion de cosses de cacao ou de fruits secs peut aussi dépanner le soir, mais le goût de bois doux disparaît.",
    enCuisine:
      "Il fait le [rooibos glacé au citron](/recette/rooibos-glace), à servir bien froid. Pour connaître l'histoire de la plante et réussir l'infusion, lisez [Qu'est-ce que le rooibos et comment l'infuser ?](/conseils/quest-ce-que-le-rooibos). En Afrique du Sud, il accompagne volontiers une part de [bobotie](/recette/bobotie) au déjeuner.",
    faq: [
      {
        question: "Que veut dire rooibos ?",
        reponse:
          "C'est un mot afrikaans qui signifie « buisson rouge ». Il fait référence à la couleur des feuilles après fermentation.",
      },
      {
        question: "Le rooibos est-il un thé ?",
        reponse:
          "Non. Il vient d'un arbuste de la famille des légumineuses, sans lien avec le théier. On l'appelle souvent thé rouge par commodité.",
      },
    ],
  },
  honeybush: {
    origine:
      "Le honeybush regroupe plusieurs espèces d'arbustes du genre Cyclopia, qui poussent dans le fynbos, la végétation des montagnes du sud de l'Afrique du Sud, entre la province du Cap-Occidental et celle du Cap-Oriental. Au printemps austral, ils se couvrent de fleurs jaunes au parfum de miel, qui leur ont donné leur nom.\n\nLongtemps, il a été cueilli à l'état sauvage par les habitants de ces montagnes, qui en faisaient leur infusion quotidienne. Sa culture s'est développée plus récemment. Comme le rooibos, les feuilles et les tiges sont coupées, mises à fermenter pour développer leur couleur et leur goût, puis séchées au soleil.",
    choisir:
      "Le honeybush est plus sucré et plus fruité que le [rooibos](/produit/rooibos), dont il est souvent présenté comme le cousin. Le [rooibos vert](/produit/rooibos-vert) est plus végétal. Pour une boisson acidulée, mieux vaut se tourner vers les [fleurs de bissap](/produit/fleurs-de-bissap) ou l'[infusion de tamarin](/produit/infusion-de-tamarin).\n\nCe honeybush est issu de l'agriculture biologique. Il se présente comme un mélange de feuilles et de tiges brunes : c'est normal, les tiges participent au goût.",
    conserver:
      "Gardez-le dans un contenant opaque et hermétique, dans un placard sec. Son parfum de miel est plus volatil que celui du rooibos : refermez la boîte aussitôt après usage. Une infusion préparée à froid se conserve un à deux jours au réfrigérateur.",
    remplacer:
      "Le rooibos rouge est le remplaçant le plus évident, avec un goût moins mielleux ; une cuillère de miel compense en partie. Une infusion de fleurs de tilleul ou de camomille offre une douceur comparable, avec un profil plus floral.",
    enCuisine:
      "Il remplace le rooibos dans le [rooibos glacé au citron](/recette/rooibos-glace), pour une version plus douce qui demande moins de sucre. Pour comparer les deux plantes du Cap, lisez [Qu'est-ce que le rooibos et comment l'infuser ?](/conseils/quest-ce-que-le-rooibos). Il accompagne bien un dessert sud-africain ou une tranche de cake.",
    faq: [
      {
        question: "Honeybush et rooibos, quelle différence ?",
        reponse:
          "Ce sont deux arbustes différents du Cap. Le honeybush a un goût plus sucré et mielleux, le rooibos un goût plus boisé et vanillé.",
      },
      {
        question: "Pourquoi trouve-t-on des tiges dans le honeybush ?",
        reponse:
          "Parce qu'on récolte les rameaux entiers, feuilles et tiges ensemble. Les tiges coupées fin apportent une partie de la douceur de l'infusion.",
      },
    ],
  },
  "citronnelle-sechee": {
    origine:
      "La citronnelle, Cymbopogon citratus, est une grande herbe vivace originaire d'Asie du Sud et du Sud-Est. Elle s'est répandue dans toutes les régions tropicales et pousse aujourd'hui en touffes dans de nombreuses cours d'Afrique de l'Ouest et centrale, où l'on coupe quelques feuilles au besoin pour l'infusion du soir ou le bouillon.\n\nIl ne faut pas la confondre avec la citronnelle de Ceylan ou de Java, Cymbopogon nardus, surtout cultivée pour son huile essentielle. Séchée, la citronnelle culinaire garde l'essentiel de son parfum de citron et de gingembre, ce qui permet d'en avoir toute l'année.",
    choisir:
      "Elle apporte la note fraîche parmi les infusions de la boutique : le [kinkeliba](/produit/kinkeliba) est boisé, le [rooibos](/produit/rooibos) doux et rond, l'[infusion de gingembre](/produit/infusion-de-gingembre) piquante. Mélangée au kinkeliba ou au gingembre, elle donne une boisson plus complexe.\n\nUne citronnelle séchée de qualité est d'un vert pâle, sans parties brunies, et dégage un parfum net quand on froisse les brins. Une odeur faible signale un produit ancien.",
    conserver:
      "Son parfum vient d'huiles volatiles qui s'échappent vite : gardez-la dans un bocal hermétique, à l'abri de la chaleur et de la lumière. Évitez de la laisser dans un sachet ouvert près de la cuisinière. Un brin froissé entre les doigts vous dira si elle a encore du parfum.",
    remplacer:
      "La citronnelle fraîche, plus parfumée, se trouve dans les épiceries asiatiques ; une tige suffit pour une théière. Un zeste de citron vert ou une feuille de combava donnent une note proche dans un bouillon, moins herbacée. La verveine citronnée convient pour une infusion.",
    enCuisine:
      "Quelques brins parfument le bouillon d'un [caldou de poisson](/recette/caldou) ou d'une [pepper soup de chèvre](/recette/pepper-soup). En infusion, elle accompagne la recette du [kinkeliba du petit-déjeuner](/recette/kinkeliba). Pour garder son parfum, suivez les conseils de [Comment conserver les feuilles séchées (ndolé, manioc, sorgho) ?](/conseils/conserver-feuilles-sechees).",
    faq: [
      {
        question: "La citronnelle séchée remplace-t-elle la fraîche ?",
        reponse:
          "Oui pour les infusions et les bouillons, où elle infuse longtemps. Pour une marinade ou une pâte d'épices, la fraîche, hachée fin, reste préférable.",
      },
      {
        question: "La citronnelle de cuisine éloigne-t-elle les moustiques ?",
        reponse:
          "C'est une autre espèce, la citronnelle de Java ou de Ceylan, dont on tire l'huile utilisée contre les moustiques. La citronnelle de cuisine sert surtout à parfumer.",
      },
    ],
  },
  "the-noir-du-kenya": {
    origine:
      "Le thé est arrivé au Kenya en 1903 : un colon, G. W. L. Caine, en planta quelques pieds près de Limuru, au nord-ouest de Nairobi, d'abord comme plante d'ornement. La culture commerciale commença dans les années 1920 autour de Kericho, sur les hauts plateaux de l'ouest. Le pays est aujourd'hui l'un des tout premiers exportateurs de thé noir au monde.\n\nUne grande partie de la récolte vient de petits planteurs, qui livrent leurs feuilles à des usines collectives. La plupart du thé kényan est produit selon la méthode CTC, pour « crush, tear, curl » : les feuilles sont broyées, déchirées et roulées en petits granulés, qui infusent vite et donnent une tasse très colorée. Il se vend en grande partie aux enchères de Mombasa.",
    choisir:
      "Ce thé noir en sachets est fait pour une infusion corsée qui supporte le lait. Le [thé noir à la cardamome](/produit/the-noir-du-kenya-cardamome) est déjà épicé, pratique pour un chai rapide. Le [thé vert gunpowder](/produit/the-vert-gunpowder) répond à un tout autre usage, l'ataya. Si vous cherchez une boisson chaude qui ne soit pas un thé, le [rooibos](/produit/rooibos) est l'alternative la plus proche en couleur.\n\nNature, il peut paraître âpre : c'est un thé pensé pour le lait et le sucre.",
    conserver:
      "Les sachets craignent l'humidité et les odeurs. Gardez-les dans leur boîte fermée ou dans une boîte à thé métallique, loin du café et des épices. Ne les rangez pas au-dessus de la bouilloire ou de la cuisinière, où la vapeur et la chaleur les ramollissent.",
    remplacer:
      "Un thé noir corsé d'une autre origine, comme un assam indien ou un English breakfast, prend sa place dans le chai. Un thé noir en vrac à feuilles brisées convient aussi ; prévoyez simplement une passoire. Les thés noirs très délicats, comme le darjeeling, se perdent dans le lait.",
    enCuisine:
      "C'est le thé du [chai kényan (chai ya maziwa)](/recette/chai-kenyan), bouilli avec le lait, la cardamome et le gingembre. Il accompagne le [puff-puff](/recette/puff-puff), cousin des mandazi d'Afrique de l'Est, ou un petit-déjeuner à base d'[ugali et sukuma wiki](/recette/ugali-sukuma-wiki). Pour l'eau du thé nature, la [bouilloire émaillée](/produit/bouilloire-emaillee) se pose directement sur le feu.",
    faq: [
      {
        question: "Que veut dire chai ya maziwa ?",
        reponse:
          "C'est du swahili : « thé au lait ». Au Kenya, le thé, le lait et le sucre bouillent ensemble dans la même casserole.",
      },
      {
        question: "Qu'est-ce qu'un thé CTC ?",
        reponse:
          "Un thé dont les feuilles ont été broyées, déchirées et roulées en granulés. Il infuse vite et donne une boisson foncée et corsée, idéale avec du lait.",
      },
    ],
  },
  "the-noir-du-kenya-cardamome": {
    origine:
      "La cardamome verte est le fruit d'une plante de la famille du gingembre, originaire du sud de l'Inde. Elle a gagné la côte d'Afrique de l'Est par les routes commerciales de l'océan Indien, qui relient depuis des siècles l'Inde, la péninsule Arabique et les ports swahilis de Mombasa, Lamu ou Zanzibar.\n\nC'est là que le thé épicé s'est imposé, dans le sillage des communautés venues d'Inde, nombreuses en Afrique de l'Est depuis la fin du XIXe siècle. Associer la cardamome au thé noir corsé du Kenya, c'est retrouver le goût des chais de la côte, sans avoir à concasser les gousses soi-même.",
    choisir:
      "Ce thé est déjà aromatisé : pratique pour une tasse rapide, il offre un goût plus régulier qu'un mélange maison. Le [thé noir du Kenya](/produit/the-noir-du-kenya) nature laisse plus de liberté pour doser les épices soi-même. L'[infusion de gingembre](/produit/infusion-de-gingembre) apporte le piquant, sans feuilles de thé.\n\nSi vous aimez les boissons épicées, il se marie avec un morceau de gingembre frais ou un clou de girofle ajouté au moment de faire bouillir le lait.",
    conserver:
      "La cardamome perd son parfum plus vite que le thé. Gardez les sachets dans une boîte bien fermée, à l'abri de la chaleur, et préférez une boîte réservée à ce thé : son parfum se transmet aux autres thés rangés à côté.",
    remplacer:
      "Un thé noir corsé nature, accompagné de deux ou trois gousses de cardamome écrasées au mortier, donne un résultat très proche, plus frais. Un mélange pour chai masala apporte une palette plus large, avec cannelle, gingembre, clou de girofle et poivre.",
    enCuisine:
      "Il simplifie le [chai kényan (chai ya maziwa)](/recette/chai-kenyan), puisque la cardamome est déjà là. Les gousses de cardamome parfument aussi le [kahawa chungu](/recette/kahawa-chungu), le café de la côte swahilie, et le [pilau de Zanzibar](/recette/pilau). Pour concasser d'autres gousses, le [mortier en granit](/produit/mortier-en-granit) est l'outil idéal.",
    faq: [
      {
        question: "Faut-il ajouter de la cardamome à ce thé ?",
        reponse:
          "Ce n'est pas nécessaire : elle est déjà présente. Une gousse supplémentaire, juste écrasée, renforce le parfum pour ceux qui l'aiment très marqué.",
      },
      {
        question: "Peut-on préparer ce thé sans lait ?",
        reponse:
          "Oui, il se boit aussi nature, éventuellement sucré. Le lait adoucit simplement sa puissance et arrondit la cardamome.",
      },
    ],
  },
  "livre-200-recettes-camerounaises": {
    origine:
      "Avec 200 recettes, ce recueil d'Estelle Tiani est le plus copieux des livres de cuisine de la boutique. Il puise dans les différentes régions du Cameroun, un pays souvent surnommé « l'Afrique en miniature » pour la variété de ses paysages et de ses peuples : forêts du Sud, hauts plateaux de l'Ouest, savanes du Nord, côte du Littoral.\n\nÀ côté des plats traditionnels, l'autrice propose des versions revisitées, et chaque recette est détaillée étape par étape, avec des astuces de préparation. Le livre est paru en août 2026 en édition indépendante.",
    choisir:
      "C'est un livre de référence pour qui veut cuisiner camerounais au quotidien et varier les plats sur la durée. Le nombre de recettes en fait un bon choix pour une famille d'origine camerounaise qui cherche à retrouver des plats de toutes les régions, ou pour un cuisinier curieux qui a déjà réussi un ndolé et veut aller plus loin.\n\nPour une première approche plus courte de l'Afrique centrale, les livres consacrés aux deux Congo, comme [Le meilleur de la cuisine congolaise](/produit/livre-le-meilleur-de-la-cuisine-congolaise), offrent une sélection plus resserrée.",
    conserver:
      "Avant de vous lancer, vérifiez les ingrédients du placard : beaucoup de plats camerounais demandent des produits séchés à prévoir. Les [feuilles de ndolé](/produit/feuilles-de-ndole), le [poivre de Penja](/produit/poivre-de-penja), le [pèbè moulu](/produit/pebe-moulu) et les [crevettes séchées](/produit/crevettes-sechees) reviennent souvent et se gardent longtemps. Avoir ces bases sous la main évite de renoncer à une recette faute d'un ingrédient.",
    remplacer:
      "La page [Cameroun](/pays/cameroun) présente les grandes régions culinaires du pays et ses produits typiques. Pour les feuilles amères, lisez [Comment enlever l'amertume du ndolé ?](/conseils/enlever-amertume-du-ndole), et si vous n'en trouvez pas, [Par quoi remplacer les feuilles de ndolé ?](/conseils/par-quoi-remplacer-les-feuilles-de-ndole). Ces lectures aident à adapter les recettes du livre à ce que l'on trouve en France.",
    enCuisine:
      "Plusieurs grands classiques du pays sont déjà sur le site : le [ndolé aux crevettes](/recette/ndole), le [poulet DG](/recette/poulet-dg), l'[eru](/recette/eru), le [koki](/recette/koki) cuit dans les feuilles de bananier et le [mbongo tchobi](/recette/mbongo-tchobi) au poisson. De quoi s'entraîner avant d'ouvrir le livre, puis comparer les tours de main de l'autrice avec les nôtres.",
    faq: [
      {
        question: "Ce livre convient-il aux débutants ?",
        reponse:
          "Les recettes sont expliquées étape par étape, avec des astuces. Un débutant peut s'y retrouver, à condition de commencer par les plats les plus simples.",
      },
      {
        question: "Les recettes viennent-elles de tout le Cameroun ?",
        reponse:
          "Oui, il rassemble des plats traditionnels des différentes régions du pays, ainsi que des versions revisitées.",
      },
    ],
  },
  "livre-la-cuisine-congolaise": {
    origine:
      "Publié aux éditions L'Harmattan en 2001, cet ouvrage est consacré à la cuisine de la République du Congo, celle de Brazzaville. Fidèle Mialoundama et Isabelle Goma Mouyokani, présentée par la Bibliothèque nationale de France comme nutritionniste, y ont recensé les recettes des différentes régions du pays, en ne gardant que celles que l'on prépare le plus souvent.\n\nLeur démarche est celle d'un inventaire : décrire les plats et les aliments traditionnels pour en garder la mémoire. C'est ce qui distingue ce livre des recueils plus récents, davantage tournés vers la cuisine de tous les jours en France.",
    choisir:
      "Ce livre s'adresse à ceux qui s'intéressent à la culture culinaire autant qu'aux recettes : étudiants, familles congolaises soucieuses de transmettre, curieux d'histoire de l'alimentation. Il est plus documentaire que [Dans ma cuisine congolaise](/produit/livre-dans-ma-cuisine-congolaise), qui raconte un parcours personnel en RD Congo, et que [Le meilleur de la cuisine congolaise](/produit/livre-le-meilleur-de-la-cuisine-congolaise), pensé comme un livre de techniques.\n\nAttention à la confusion fréquente entre les deux pays : ici, il s'agit du Congo-Brazzaville.",
    conserver:
      "Les recettes congolaises reposent sur quelques produits de base. La [chikwangue](/produit/chikwangue), les [feuilles de manioc](/produit/feuilles-de-manioc) pour le saka-saka, la [pulpe de noix de palme](/produit/pulpe-de-noix-de-palme) pour la moambé et la [pâte d'arachide](/produit/pate-d-arachide) reviennent d'une région à l'autre. Ce sont aussi ceux que l'on retrouve sur les marchés de Brazzaville et de Pointe-Noire.",
    remplacer:
      "La page [Congo](/pays/congo) présente la cuisine du pays et ses produits du placard ; la page [RD Congo](/pays/rd-congo) permet de comparer avec la rive d'en face. Pour les sauces au poisson fumé, lisez [Par quoi remplacer le poisson fumé dans une sauce ?](/conseils/remplacer-le-poisson-fume).",
    enCuisine:
      "Sur le site, le [poulet à la moambé](/recette/moambe), le [liboké de poisson](/recette/liboke-de-poisson) cuit en papillote de feuilles et le [pondu au poisson fumé](/recette/pondu), appelé saka-saka à Brazzaville, donnent un premier aperçu des plats décrits dans le livre. Ils permettent de se familiariser avec les feuilles, le manioc et la noix de palme.",
    faq: [
      {
        question: "Ce livre parle-t-il du Congo-Brazzaville ou de la RD Congo ?",
        reponse:
          "Il est consacré à la République du Congo, dont la capitale est Brazzaville. Les deux pays partagent cependant de nombreux plats.",
      },
      {
        question: "Est-ce un livre de recettes illustré ?",
        reponse:
          "C'est surtout un ouvrage de recensement, qui décrit les recettes et les aliments traditionnels des régions du pays.",
      },
    ],
  },
  "livre-senegal-cuisine-intime-et-gourmande": {
    origine:
      "Youssou N'Dour, né à Dakar en 1959, est la grande voix du mbalax et l'un des musiciens africains les plus célèbres au monde. Dans ce livre publié en 2014 aux éditions de La Martinière, il ne parle pas de musique mais de table : il raconte le Dakar de son enfance, les marchés, le repas préparé entre femmes et la famille réunie autour du grand plat commun.\n\nLes recettes sont celles qui lui rappellent sa mère. Les photographies d'Isabelle Rozenbaum accompagnent ces souvenirs et montrent les plats comme les scènes de vie.",
    choisir:
      "C'est un beau livre autant qu'un livre de cuisine : à offrir à un amateur de musique africaine, à quelqu'un qui revient du Sénégal ou qui s'apprête à y partir. Ceux qui cherchent un manuel plus exhaustif, avec de nombreuses recettes et des substitutions, se tourneront vers [Cuisine du Sénégal, 81 recettes traditionnelles](/produit/livre-cuisine-du-senegal-81-recettes).\n\nPour une approche plus moderne des saveurs sénégalaises, [Grain d'Afrique](/produit/livre-grain-d-afrique) mêle cuisine du quotidien et ingrédients africains.",
    conserver:
      "La cuisine sénégalaise demande quelques produits de base : gardez au moins du [soumbala](/produit/soumbala), du [poivre de Selim](/produit/poivre-de-selim), de la [pâte d'arachide](/produit/pate-d-arachide) et du [thé vert gunpowder](/produit/the-vert-gunpowder) pour l'ataya d'après le repas. Avec ces produits, la plupart des plats familiaux évoqués par le chanteur deviennent possibles à la maison.",
    remplacer:
      "La page [Sénégal](/pays/senegal) présente les grands plats du pays, du riz au poisson aux douceurs au mil. Pour comprendre le rituel qui clôt le repas, lisez [Comment préparer l'ataya, le thé sénégalais en trois services ?](/conseils/comment-preparer-l-ataya), et pour le plat national, [Comment réussir le riz rouge du thiéboudienne ?](/conseils/reussir-le-riz-rouge-du-thieboudienne).",
    enCuisine:
      "Le [thiéboudienne](/recette/thieboudienne), le [poulet yassa](/recette/poulet-yassa), le [mafé de bœuf](/recette/mafe) et le [thiakry](/recette/thiakry) sont déjà sur le site, ainsi que le [jus de bissap](/recette/jus-de-bissap) et l'[ataya](/recette/ataya) qui accompagnent les repas de famille. Ils permettent de prolonger la lecture en cuisinant, en suivant pas à pas des recettes testées.",
    faq: [
      {
        question: "Qu'est-ce que le grand plat commun dont parle le livre ?",
        reponse:
          "Au Sénégal, la famille mange souvent dans un même grand plat posé au centre. Chacun se sert dans la portion placée devant lui, et l'on partage les meilleurs morceaux avec les invités.",
      },
      {
        question: "Qui a pris les photos du livre ?",
        reponse:
          "La photographe Isabelle Rozenbaum, spécialiste de la photographie culinaire, signe les images du livre.",
      },
    ],
  },
  "livre-dans-ma-cuisine-congolaise": {
    origine:
      "Gisèle Mbeku Andjelani raconte dans ce livre les goûts de son enfance, des rives du lac Kivu, à l'est de la RD Congo, jusqu'à Kinshasa, la capitale, à l'autre bout du pays. Plus de 70 recettes accessibles y sont réunies, chacune précédée d'une petite histoire.\n\nOn y croise le sombe, nom swahili des feuilles de manioc pilées que Kinshasa appelle pondu, le madesu, les haricots en sauce, le liboke, cuit en papillote de feuilles, les sambaza, petits poissons frits du lac Kivu, ou encore les ndazi et les mikate, beignets du goûter. Le livre est paru en avril 2026 en édition indépendante.",
    choisir:
      "C'est le livre idéal pour découvrir la diversité de la RD Congo, avec un regard personnel : l'est swahiliphone et l'ouest lingalaphone n'ont pas tout à fait la même cuisine. Il complète [Le meilleur de la cuisine congolaise](/produit/livre-le-meilleur-de-la-cuisine-congolaise), plus axé sur les techniques, et se distingue de [La cuisine congolaise](/produit/livre-la-cuisine-congolaise), consacrée au Congo-Brazzaville.\n\nLes récits qui accompagnent les recettes en font aussi une lecture agréable pour ceux qui ont grandi au pays.",
    conserver:
      "Les recettes congolaises supposent quelques produits du placard. Les [feuilles de manioc](/produit/feuilles-de-manioc) pour le sombe, l'[huile de palme rouge](/produit/huile-de-palme-rouge), la [chikwangue](/produit/chikwangue) pour accompagner, et le [café moulu du Kivu](/produit/cafe-du-kivu) pour finir le repas sur une note de la région. Tous se gardent bien au placard.",
    remplacer:
      "La page [RD Congo](/pays/rd-congo) présente la cuisine du pays d'une région à l'autre. Pour préparer les feuilles de manioc séchées, lisez [Comment conserver les feuilles séchées (ndolé, manioc, sorgho) ?](/conseils/conserver-feuilles-sechees), et pour le poisson fumé de la sauce, [Comment conserver le poisson fumé ?](/conseils/comment-conserver-le-poisson-fume).",
    enCuisine:
      "Sur le site, le [pondu au poisson fumé](/recette/pondu), le [liboké de poisson](/recette/liboke-de-poisson) et le [poulet à la moambé](/recette/moambe) donnent un avant-goût du livre. Les beignets [puff-puff](/recette/puff-puff), cousins des mikate, se préparent avec la même pâte levée. Une bonne façon de goûter à la cuisine de l'autrice avant d'ouvrir son livre.",
    faq: [
      {
        question: "Qu'est-ce que le sombe ?",
        reponse:
          "C'est le nom swahili, utilisé dans l'est de la RD Congo, du plat de feuilles de manioc pilées que l'on appelle pondu à Kinshasa.",
      },
      {
        question: "Que sont les sambaza ?",
        reponse:
          "De petits poissons du lac Kivu, servis frits et croustillants, très populaires à Goma, à Bukavu et de l'autre côté de la frontière, au Rwanda.",
      },
    ],
  },
  "livre-plats-express-saveurs-d-afrique": {
    origine:
      "Cheikh Niang est né au Sénégal et a grandi en France, où il est arrivé enfant. Sous le nom de @niangcook, il publie sur les réseaux sociaux des vidéos de cuisine suivies par une large communauté, qui mêlent saveurs africaines et influences du monde.\n\nCe deuxième livre, publié chez Solar en 2024 avec des photographies de Laurent Moynat, réunit 60 recettes inédites, toutes prêtes en 30 minutes au plus. On y trouve un riz à la tomate express, des pancakes de plantain ou un afro burger : des plats du quotidien qui gardent le goût de l'Afrique sans y passer l'après-midi.",
    choisir:
      "C'est le livre des soirs de semaine. Il convient aux jeunes actifs, aux étudiants et aux familles pressées qui aiment les saveurs africaines mais n'ont pas le temps de laisser mijoter une sauce pendant deux heures. Ceux qui découvrent l'auteur peuvent commencer par son premier livre, [Cuisine d'Afrique et d'ailleurs](/produit/livre-cuisine-d-afrique-et-d-ailleurs), centré sur ses grands classiques.\n\nPour des plats plus traditionnels et plus longs, les recueils consacrés au Sénégal ou au Cameroun sont plus adaptés.",
    conserver:
      "La cuisine rapide repose sur un placard bien garni. Une [pâte d'arachide](/produit/pate-d-arachide), un [assaisonnement jollof](/produit/assaisonnement-jollof), du [piment pili-pili](/produit/piment-pili-pili) et de la [sauce peri-peri](/produit/sauce-peri-peri) permettent de donner du caractère à un plat en quelques minutes. Ils se gardent longtemps une fois ouverts, ce qui convient bien aux cuisiniers pressés.",
    remplacer:
      "Pour savoir quels produits garder sous la main, lisez [Quels ingrédients avoir toujours dans son placard ?](/conseils/ingredients-placard-cuisine-africaine). Si vous débutez, [Par quelle recette africaine commencer quand on débute ?](/conseils/par-quelle-recette-commencer) propose des plats simples pour prendre confiance. Les deux articles se lisent en quelques minutes.",
    enCuisine:
      "Sur le site, plusieurs recettes se font en peu de temps : l'[alloco](/recette/alloco), le [kelewele](/recette/kelewele) au gingembre, les [akara](/recette/akara) de niébé ou le [riz jollof](/recette/riz-jollof), parfait pour s'entraîner avant la version express du livre. Tous se préparent sans longue cuisson.",
    faq: [
      {
        question: "Les recettes se font-elles vraiment en 30 minutes ?",
        reponse:
          "C'est le principe du livre : toutes les recettes sont annoncées prêtes en 30 minutes maximum.",
      },
      {
        question: "Qui est @niangcook ?",
        reponse:
          "C'est le nom sous lequel Cheikh Niang, cuisinier né au Sénégal et arrivé enfant en France, partage ses recettes en vidéo sur les réseaux sociaux.",
      },
    ],
  },
  "livre-le-meilleur-de-la-cuisine-congolaise": {
    origine:
      "Lukusa Jessica présente dans ce livre publié chez Dashbook en 2025 une sélection de plats emblématiques de la cuisine congolaise. Le parcours va des accompagnements, ces bases sans lesquelles une sauce n'est pas complète, jusqu'à la pâtisserie.\n\nChaque recette est accompagnée d'une histoire, d'anecdotes et de conseils pour maîtriser les techniques essentielles. L'autrice s'adresse aussi bien aux débutants qu'aux cuisiniers qui ont déjà l'habitude des marmites.",
    choisir:
      "C'est le plus pédagogique des livres congolais de la boutique : à conseiller à ceux qui veulent comprendre les gestes, la cuisson des feuilles, la préparation des accompagnements, plutôt que de suivre une liste d'ingrédients. [Dans ma cuisine congolaise](/produit/livre-dans-ma-cuisine-congolaise) est plus personnel, centré sur un parcours du Kivu à Kinshasa ; [La cuisine congolaise](/produit/livre-la-cuisine-congolaise) plus documentaire.\n\nUn bon cadeau pour un jeune de la diaspora qui veut apprendre les plats de famille.",
    conserver:
      "Les accompagnements du livre reposent sur le manioc sous toutes ses formes. La [chikwangue](/produit/chikwangue) se garde quelques jours au frais, la [farine de manioc pour foufou](/produit/farine-de-foufou) des mois au placard. Les [feuilles de manioc](/produit/feuilles-de-manioc) séchées complètent la base. Avec eux, on peut s'exercer aux gestes décrits par l'autrice.",
    remplacer:
      "Pour éviter les grumeaux dans le foufou, lisez [Comment préparer un foufou sans qu'il fasse de grumeaux ?](/conseils/foufou-sans-grumeaux). La page [RD Congo](/pays/rd-congo) présente les spécialités du pays, et la page [Congo](/pays/congo) celles de la rive de Brazzaville, très proches. Les deux pages listent aussi les produits du placard à prévoir.",
    enCuisine:
      "Sur le site, le [pondu au poisson fumé](/recette/pondu), le [poulet à la moambé](/recette/moambe) et le [liboké de poisson](/recette/liboke-de-poisson) sont de bons exercices pour appliquer les techniques du livre. Les [puff-puff](/recette/puff-puff) font un premier pas vers la pâtisserie. Chaque recette du site détaille les quantités et les temps de cuisson.",
    faq: [
      {
        question: "Ce livre convient-il à un débutant ?",
        reponse:
          "Oui, il s'adresse aux débutants comme aux cuisiniers confirmés, avec des conseils pour maîtriser les techniques de base.",
      },
      {
        question: "Y a-t-il des desserts ?",
        reponse:
          "Oui, le livre va des accompagnements jusqu'à la pâtisserie congolaise.",
      },
    ],
  },
  "livre-cuisine-d-afrique-et-d-ailleurs": {
    origine:
      "Premier livre de Cheikh Niang, publié chez Solar en 2022, il reprend les grands classiques des vidéos qui l'ont fait connaître sous le nom de @niangcook. Né au Sénégal et installé en France depuis l'enfance, le cuisinier y défend une cuisine qui mêle les saveurs d'Afrique de l'Ouest et d'Afrique centrale aux influences du monde entier.\n\nLes recettes sont expliquées pas à pas, avec la volonté de rester simples et accessibles, comme dans ses vidéos. Le livre fait le lien entre la cuisine de famille et celle d'une génération qui a grandi entre deux continents.",
    choisir:
      "C'est une bonne porte d'entrée pour ceux qui suivent déjà l'auteur sur les réseaux sociaux, ou pour un jeune qui veut se mettre aux plats africains sans livre trop technique. Son second livre, [Plats express aux saveurs d'Afrique](/produit/livre-plats-express-saveurs-d-afrique), va plus loin dans la rapidité, avec des recettes en 30 minutes.\n\nPour une approche centrée sur un seul pays, les livres consacrés au Sénégal, au Cameroun ou au Congo seront plus complets.",
    conserver:
      "Pour suivre ses recettes, quelques produits reviennent souvent : la [pâte d'arachide](/produit/pate-d-arachide) pour le mafé, l'[huile de palme rouge](/produit/huile-de-palme-rouge) pour les sauces d'Afrique centrale, l'[assaisonnement jollof](/produit/assaisonnement-jollof) et le [poivre de Selim](/produit/poivre-de-selim). Tous se conservent longtemps et suffisent pour la plupart des classiques de l'auteur.",
    remplacer:
      "Si une sauce arachide reste trop liquide, lisez [Comment épaissir une sauce arachide ?](/conseils/comment-epaissir-une-sauce-arachide). Pour doser le piment selon les invités, [Comment doser le piment dans la cuisine africaine ?](/conseils/comment-doser-le-piment) donne des repères utiles. Ces conseils valent pour toutes les sauces du livre.",
    enCuisine:
      "Sur le site, le [mafé de bœuf](/recette/mafe), le [poulet yassa](/recette/poulet-yassa), le [riz jollof](/recette/riz-jollof) et la [sauce graine au poulet](/recette/sauce-graine) couvrent les deux régions dont s'inspire le livre, l'Afrique de l'Ouest et l'Afrique centrale. Chaque recette du site précise les produits utilisés et leurs remplacements.",
    faq: [
      {
        question: "Quel livre de @niangcook choisir en premier ?",
        reponse:
          "Celui-ci, paru en 2022, reprend ses grands classiques. Le second, Plats express aux saveurs d'Afrique, se concentre sur des recettes rapides.",
      },
      {
        question: "Les recettes sont-elles uniquement africaines ?",
        reponse:
          "Non, elles mêlent les saveurs d'Afrique de l'Ouest et centrale à des influences venues d'autres cuisines du monde.",
      },
    ],
  },
  "livre-grain-d-afrique": {
    origine:
      "Aïssatou Mbaye tient depuis 2015 un blog de cuisine consacré aux ingrédients d'Afrique subsaharienne et au patrimoine culinaire sénégalais. Elle a déjà publié Saveurs subsahariennes et Yassa et Pastels. Avec Grain d'Afrique, paru en 2026 aux éditions Marie Claire, elle propose plus de 60 recettes qui glissent une touche africaine dans la cuisine de tous les jours.\n\nLes exemples donnent le ton : pancakes à la farine de mil, houmous de niébé et de cajou, chips de banane plantain, madeleines au manioc ou chocolat chaud épicé.",
    choisir:
      "C'est le livre des curieux qui veulent intégrer les produits africains à leurs habitudes plutôt que de cuisiner des plats traditionnels. Il plaira aussi aux familles qui cherchent des idées de petit-déjeuner, de goûter ou d'apéritif. Pour les grands plats sénégalais, [Cuisine du Sénégal, 81 recettes traditionnelles](/produit/livre-cuisine-du-senegal-81-recettes) est plus adapté ; pour un récit de vie, [Sénégal, cuisine intime et gourmande](/produit/livre-senegal-cuisine-intime-et-gourmande).\n\nSon approche se rapproche de celle d'[Afro Vegan](/produit/livre-afro-vegan), en plus généraliste.",
    conserver:
      "Les recettes font appel à des produits faciles à garder au placard : le [couscous de mil](/produit/couscous-de-mil), les [chips de plantain](/produit/chips-de-plantain), le [tapioca de manioc](/produit/tapioca-de-manioc) ou le [pain de singe](/produit/poudre-de-baobab), qui parfume aussi les desserts. Ces produits secs se gardent plusieurs mois au placard.",
    remplacer:
      "Pour d'autres idées autour du baobab, lisez [Que faire avec la poudre de baobab (pain de singe) ?](/conseils/que-faire-avec-la-poudre-de-baobab). Les plats sans viande du continent sont réunis dans [Quels plats africains sont naturellement végétariens ?](/conseils/plats-africains-vegetariens). On y retrouve plusieurs ingrédients chers à l'autrice, comme le niébé et le mil.",
    enCuisine:
      "Sur le site, l'[alloco](/recette/alloco), les [akara](/recette/akara) de niébé, le [jus de bouye](/recette/jus-de-bouye) et le [thiakry](/recette/thiakry) partagent le même esprit : des préparations simples qui mettent en valeur un produit africain. Elles se glissent facilement dans un repas de tous les jours, comme les recettes du livre.",
    faq: [
      {
        question: "Grain d'Afrique est-il un livre de cuisine traditionnelle ?",
        reponse:
          "Pas vraiment : il associe cuisine du quotidien et saveurs africaines, avec des recettes comme les pancakes au mil ou les madeleines au manioc.",
      },
      {
        question: "L'autrice a-t-elle écrit d'autres livres ?",
        reponse:
          "Oui, Aïssatou Mbaye a publié auparavant Saveurs subsahariennes et Yassa et Pastels, et elle tient un blog de cuisine depuis 2015.",
      },
    ],
  },
  "livre-cuisine-du-senegal-81-recettes": {
    origine:
      "Kaya N'Dor rassemble dans ce livre 81 recettes traditionnelles du Sénégal, de quoi faire le tour des grands plats que l'on sert dans les familles. Chaque recette est expliquée pas à pas, avec des astuces de réussite.\n\nLe livre prête aussi attention à une difficulté bien connue de ceux qui cuisinent loin du pays : il propose des substitutions d'ingrédients, pour réussir le thiéboudienne, le yassa ou le mafé même quand certains ingrédients manquent. Il est paru en juin 2026 en édition indépendante.",
    choisir:
      "C'est un manuel pratique, à conseiller à ceux qui veulent cuisiner sénégalais régulièrement, en France ou ailleurs. Les substitutions proposées le rendent utile aux débutants comme aux familles de la diaspora qui n'ont pas d'épicerie africaine à côté. Pour un récit plus intime, [Sénégal, cuisine intime et gourmande](/produit/livre-senegal-cuisine-intime-et-gourmande) de Youssou N'Dour complète bien la lecture.\n\nSa liste de recettes est plus courte que celle des 200 recettes camerounaises, mais centrée sur un seul pays.",
    conserver:
      "Le placard sénégalais tient en quelques produits : [soumbala](/produit/soumbala), [poivre de Selim](/produit/poivre-de-selim), [pâte d'arachide](/produit/pate-d-arachide), [couscous de mil](/produit/couscous-de-mil) et [fleurs de bissap](/produit/fleurs-de-bissap). Avec eux, la plupart des grands classiques deviennent possibles. Ils se gardent longtemps, ce qui permet de cuisiner sénégalais même loin d'une épicerie africaine.",
    remplacer:
      "Le site propose lui aussi des solutions de remplacement : [Par quoi remplacer le soumbala (nététou) ?](/conseils/par-quoi-remplacer-le-soumbala) et [Le guedj (guedji), quel est ce poisson séché et comment l'utiliser ?](/conseils/quest-ce-que-le-guedj). La page [Sénégal](/pays/senegal) présente la cuisine du pays et ses produits typiques.",
    enCuisine:
      "Le [thiéboudienne](/recette/thieboudienne), le [poulet yassa](/recette/poulet-yassa), le [mafé de bœuf](/recette/mafe) et le [caldou de poisson](/recette/caldou) sont déjà sur le site. Pour le yassa, lisez [Pourquoi faire mariner le poulet yassa une nuit ?](/conseils/mariner-poulet-yassa). Ces pages permettent de comparer les méthodes avec celles du livre.",
    faq: [
      {
        question: "Le livre propose-t-il des alternatives aux ingrédients ?",
        reponse:
          "Oui, il donne des substitutions d'ingrédients pour réussir les recettes même sans certains produits typiques.",
      },
      {
        question: "Y trouve-t-on le thiéboudienne ?",
        reponse:
          "Oui, le plat national figure parmi les grands classiques du livre, avec le yassa et le mafé.",
      },
    ],
  },
  "livre-afro-vegan": {
    origine:
      "Aurélie Payet et Blandine Mayissa proposent dans ce livre, paru en 2023 en édition indépendante, 50 recettes afro véganes : entrées, plats, desserts et boissons. Chaque recette est expliquée pas à pas et illustrée d'une photo en couleur.\n\nLa cuisine africaine se prête bien à cette démarche. Beaucoup de plats du quotidien reposent déjà sur les légumineuses, les céréales, les tubercules et les feuilles, et la viande ou le poisson n'y jouent souvent qu'un rôle d'assaisonnement, facile à remplacer.",
    choisir:
      "C'est le livre à offrir à un proche végétalien qui veut découvrir les saveurs africaines, ou à un amateur de cuisine africaine qui souhaite manger moins de viande. Son format court en fait une bonne introduction. [Grain d'Afrique](/produit/livre-grain-d-afrique) propose une autre approche des produits africains au quotidien, sans être végétalien.\n\nPour les plats de viande ou de poisson traditionnels, les livres consacrés au Sénégal, au Cameroun ou au Congo restent plus complets.",
    conserver:
      "Une cuisine afro végane s'appuie sur les produits secs de la boutique : [fonio](/produit/fonio), [farine de pois chiches](/produit/farine-de-pois-chiches), [graines d'egusi](/produit/graines-d-egusi), [pâte d'arachide](/produit/pate-d-arachide) et [soumbala](/produit/soumbala), qui apporte la profondeur d'un bouillon sans viande. Tous se gardent bien et servent dans de nombreuses recettes.",
    remplacer:
      "Le site réunit les plats sans viande du continent dans [Quels plats africains sont naturellement végétariens ?](/conseils/plats-africains-vegetariens). Pour retrouver le goût fumé sans poisson, lisez [Par quoi remplacer le poisson fumé dans une sauce ?](/conseils/remplacer-le-poisson-fume). Ces deux articles aident à adapter n'importe quelle recette africaine.",
    enCuisine:
      "Sur le site, le [misir wat](/recette/misir-wat), le [shiro](/recette/shiro), les [akara](/recette/akara), le [kelewele](/recette/kelewele) et le [fonio aux légumes et sauce arachide](/recette/fonio-aux-legumes) sont déjà végétaliens ou faciles à adapter. Ils montrent combien la cuisine du continent fait de place aux légumineuses et aux légumes.",
    faq: [
      {
        question: "La cuisine africaine peut-elle être végane ?",
        reponse:
          "Oui, de nombreux plats reposent sur les légumineuses, les céréales et les légumes. Il suffit souvent de remplacer le bouillon ou le poisson séché.",
      },
      {
        question: "Le livre contient-il des desserts ?",
        reponse:
          "Oui, il propose des entrées, des plats, des desserts et des boissons, tous sans produits d'origine animale.",
      },
    ],
  },
};
