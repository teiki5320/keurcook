# Fiches détaillées — consignes de rédaction (novembre 2026)

Pourquoi : Google AdSense a refusé keurcook.com (31 octobre, puis 9 novembre 2026) pour « contenu à faible valeur
informative ». Le texte propre d'une fiche produit fait environ 100 mots, celui d'une page pays 200 à 260. On ajoute à
chaque fiche un texte long, utile et écrit par nous (même démarche que Keurbook, voir son `docs/ANALYSES.md`).

## Où écrire

| Fichier | Contenu |
| --- | --- |
| `src/lib/demo/fiches/lot-1.ts` | Ustensiles de cuisson et de pilage (mortiers, marmites, faitouts, cocottes, couscoussier, plaque à injera) |
| `src/lib/demo/fiches/lot-2.ts` | Mixeurs et blenders, petits ustensiles, service, thé |
| `src/lib/demo/fiches/lot-3.ts` | Épices, feuilles, huiles et pâtes, crevettes séchées, snacks (fiches d'Afrique du Nord en fin de liste) |
| `src/lib/demo/fiches/lot-4.ts` | Céréales et farines, cafés et thés, livres (tajine en argile, Afrique du Nord, en fin de liste) |
| `src/lib/demo/fiches/pays.ts` | Les 16 pages pays |

- La liste exacte des fiches de chaque lot est en tête du fichier (`SLUGS`). TypeScript refuse une fiche hors liste.
- Un rédacteur ne modifie **que son fichier**. Rien d'autre (ni les pages, ni le test, ni le catalogue).
- Les données existantes de chaque produit sont dans `src/lib/demo/catalog.ts` et `catalog-nouveautes.ts`
  (description, « En cuisine », conservation), et dans `src/lib/product-guides.ts` (« Bien l'utiliser »). Celles des
  pays dans `src/lib/countries.ts` et `src/lib/country-cuisine.ts`. **Les lire avant d'écrire, pour ne rien répéter.**
- Une fiche pas encore écrite n'affiche rien : on peut publier à tout moment.
- Modèles à suivre pour la forme (pas pour les phrases) : `poivre-de-penja` (lot-3), `mortier-en-granit` (lot-1),
  `cameroun` (pays).

## Forme d'une fiche produit (250 à 450 mots, FAQ comprise)

```ts
"slug-du-produit": {
  origine: "…",    // origine et histoire (épicerie) ; origine, matière, fabrication (ustensile) ; le livre et son auteur
  choisir: "…",    // comment choisir, en comparant aux produits VOISINS de la boutique (liens /produit/…)
  conserver: "…",  // conservation (épicerie) ou entretien et rangement (ustensile) — facultatif pour les livres
  remplacer: "…",  // par quoi le remplacer, ou que faire sans cet ustensile — facultatif pour les livres
  enCuisine: "…",  // recettes et articles « Conseils » du site qui l'utilisent (liens)
  faq: [           // facultatif, 2 ou 3 questions qui finissent par « ? »
    { question: "…?", reponse: "…" },
  ],
},
```

Titres affichés : « Origine et histoire / Comment bien le choisir / Conservation / Par quoi le remplacer / Avec nos
recettes et nos conseils » (épicerie), « Origine et fabrication / … / Entretien et rangement / Si vous n'en avez pas »
(ustensiles), « Le livre et son auteur / À qui le conseiller / … » (livres). Chaque partie présente : 40 mots au moins.

## Forme d'une fiche pays (400 à 700 mots, FAQ comprise)

```ts
senegal: {
  histoire: "…",   // géographie, histoire, influences
  regions: "…",    // facultatif : spécialités d'une région à l'autre
  produits: "…",   // produits du placard, avec liens vers les fiches produits du site
  table: "…",      // repas du quotidien, cuisine de rue, boissons, coutumes
  commencer: "…",  // par où commencer : recettes et conseils du site
  faq: [ … ],      // facultatif, 2 ou 3 questions
},
```

Chaque partie présente : 50 mots au moins. Ne pas redire `country-cuisine.ts` (déjà affiché au-dessus).

## Texte

- Texte simple. Paragraphes séparés par `\n\n`. **Pas de Markdown** (ni gras, ni titres, ni listes).
- Seule syntaxe admise : les liens internes `[texte](/recette/slug)`, `[texte](/produit/slug)`, `[texte](/pays/slug)`,
  `[texte](/conseils/slug)`. Le lien doit mener à une page **en ligne aujourd'hui** : recette publiée, produit actif,
  article « Conseils » dont la date est passée (les articles programmés sont refusés par le test).
- Français soigné : phrases courtes, accents, apostrophes typographiques ou droites mais cohérentes, guillemets « ».
- Ton clair et chaleureux, pour quelqu'un qui découvre la cuisine africaine. On parle du produit, pas du site.

## Règles

1. **Rien d'inventé.** Chaque fait (date, lieu, chiffre, nom de plante, histoire) est vérifié sur le web (sources
   fiables : organismes officiels, encyclopédies, presse). Dans le doute, on ne l'écrit pas.
2. **Produits de marque** (blenders, cocottes, mortiers Cole & Mason, livres…) : s'en tenir à ce que dit la fiche
   Amazon vérifiée du produit (lien `https://www.amazon.fr/dp/<ASIN>`, ASIN dans le catalogue) et à la fiche du site.
   Aucune caractéristique supposée (puissance, matière, garantie, nombre de pages…).
3. **Comparer aux produits voisins** de la boutique, avec des liens `/produit/…` : c'est ce qui rend la fiche utile.
4. **Lier les recettes et conseils existants** qui utilisent le produit (le test vérifie chaque lien).
5. **Aucune allégation de santé** : pas de « bienfaits », « vertus », « digestion », « santé », « soigner »,
   « apaisant »… La liste complète est dans `src/lib/compliance.ts` (attention : « soigneusement » est refusé aussi).
6. **Pas de vocabulaire de vente** : acheter, achat, promo, meilleur prix, pas cher, en stock, livraison… et
   **jamais « disponible sur… »** (le site ne vend rien, aucun prix n'est affiché).
7. **Chaque phrase est unique** : aucune phrase de 8 mots ou plus répétée d'une fiche à l'autre, ni reprise de la
   description, de « En cuisine » ou de « Bien l'utiliser » du produit. Pas de phrase passe-partout.
8. **Ne pas répéter « Bien l'utiliser »** (`product-guides.ts`) : la fiche détaillée apporte autre chose
   (histoire, comparaison, conservation, remplacement).
9. Fiches d'Afrique du Nord (en fin de lot-3 et lot-4) : pages en noindex, à rédiger en dernier.

## Vérifier avant d'envoyer

```bash
npm test          # tests/fiches.test.ts : longueur, santé, vente, liens, slugs, phrases répétées
npm run typecheck # une fiche hors de la liste du lot ou un champ mal nommé est refusé
npm run build     # la page /produit/<slug> (ou /pays/<slug>) affiche « Le produit en détail »
```

Un test en échec dit quelle fiche et pourquoi (nombre de mots, mot interdit, lien absent, phrase répétée).
