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
};
