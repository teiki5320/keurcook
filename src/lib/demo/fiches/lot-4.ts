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
};
