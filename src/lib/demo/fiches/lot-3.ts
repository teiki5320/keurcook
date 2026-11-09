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
};
