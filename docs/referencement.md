# Journal du référencement

Une page travaillée n'est pas retouchée avant 28 jours (le temps que Google réagisse).
Chiffres : Search Console, 28 derniers jours (21/09 → 18/10/2026), via le Studio.

## 20 octobre 2026

### Pages améliorées (gains rapides)

| Page | Recherches visées | Place et vues au moment du travail | Ancien titre → nouveau titre |
| --- | --- | --- | --- |
| /recette/degue | degue, dégué, dèguè, degué, dègue | 15,1 en moyenne, 168 vues (« degue » : 12,9, 84 vues) | « Dégué — recette du Burkina Faso \| Keur Cook » → « Dégué (dèguè) : recette du dessert au mil du Burkina » |
| /recette/sauce-graine | sauce graine, poulet sauce graine, recette sauce graine poulet | 6,7, 93 vues (« recette sauce graine poulet » : 13,3) | « Sauce graine au poulet — recette de Côte d'Ivoire » → « Recette sauce graine au poulet (Côte d'Ivoire) \| Keur Cook » |
| /recette/poulet-dg | poulet dg, recette poulet dg cameroun | 12, 82 vues (« poulet dg » : 12,6, 32 vues) | « Poulet DG — recette du Cameroun \| Keur Cook » → « Poulet DG : recette du Cameroun au plantain \| Keur Cook » |
| /conseils/comment-preparer-l-ataya | ataya sénégal, the senegal, thé ataya | 10,3, 76 vues | « Comment préparer l'ataya, le thé sénégalais ? \| Keur Cook » → « Ataya : préparer le thé sénégalais en 3 services \| Keur Cook » |
| /recette/alloco | alloco recette, alloco | 11,5, 61 vues (« alloco » : 27,2) | « Alloco — recette de Côte d'Ivoire \| Keur Cook » → « Alloco : recette du plantain frit de Côte d'Ivoire » |

Pour les quatre recettes : nouvelle méta-description et une FAQ visible de trois questions (« Questions fréquentes », avec données FAQPage), écrite uniquement avec des faits déjà présents dans la recette. Le h1 reprenait déjà le nom du plat : inchangé.

Liens internes ajoutés ou précisés :
- dégué : « Cuire le couscous de mil » (texte « dégué (ou dèguè) ») et « Couscoussier » (texte « recette du dégué ») ;
- sauce graine : « Huile de palme rouge ou raffinée » (texte « sauce graine au poulet ») ;
- poulet DG : « Par quelle recette commencer » et « Ingrédients du placard » (texte « poulet DG camerounais ») ;
- alloco : « Par quelle recette commencer » (texte « recette de l'alloco ») ;
- ataya : « Qu'est-ce que le café Touba » (texte « thé ataya »).

### Page « plat gabonais »

« plat gabonais » (21 vues) montre surtout le poulet nyembwe (place 4,3), alors que le site a déjà la vraie page : /pays/gabon. Pas de nouvelle page : titre « Recettes du Gabon » → « Plats gabonais : recettes et cuisine du Gabon », nouvelle méta-description, lien « plats gabonais » depuis l'article sur la pulpe de noix de palme (en ligne le 25/11).

### Fiches enrichies vérifiées le 20/10/2026

- Recettes : Recipe complet (nom, image, description, ingrédients, étapes, temps, portions, cuisine, catégorie, valeurs nutritionnelles), pas de note inventée. BreadcrumbList présent.
- Conseils : Article + BreadcrumbList. Fiches produit : BreadcrumbList. Top 10 : FAQPage sur la FAQ visible.
- Accueil : WebSite présent, Organization ajouté (nom, adresse, logo).
- Vérifié dans les pages construites (dégué, sauce graine, accueil, Gabon, ataya) : JSON valide.

### Socle vérifié le 20/10/2026

- IndexNow : en place (scripts/indexnow.mjs, clé public/1966e925dc52073a412c1203dc2860be.txt).
- Discover : « max-image-preview:large » sur toutes les pages (gabarit commun), images de partage 1200 × 630.
- Vitesse sur téléphone : PageSpeed refuse aujourd'hui (quota du jour dépassé). À refaire au prochain passage : accueil, /recette/degue, /conseils/comment-preparer-l-ataya.

### À revoir à partir du 17 novembre 2026

Les 5 pages ci-dessus et /pays/gabon : noter leur nouvelle place.
Prochaines candidates (non travaillées) : koki (« koki » 47 vues, place 9), puff-puff (36 vues, 14,3), akara (34 vues, 7,7), garba (30 vues, 19,1), suya, waakye, poulet nyembwe, fonio, soumbala.

## 22 octobre 2026

### Pages presque en première page

Pages déjà montrées par Google entre la 4e et la 20e place (Search Console, 30 derniers jours, via le Studio). Pour chaque page : titre et description pour Google qui reprennent la recherche principale ; pour les 22 recettes, une FAQ visible « Questions fréquentes » (avec données FAQPage) écrite uniquement avec des faits déjà présents dans la recette ou sur le site. Le h1 des recettes est le nom du plat, qui contient déjà la recherche : inchangé. Données Recipe inchangées (nom, ingrédients, étapes, temps) et vérifiées dans les pages construites.

Nouveauté : les réponses de FAQ des recettes peuvent contenir des liens internes (`[texte](/recette/…)`), affichés comme liens et retirés du texte FAQPage. `npm test` vérifie leurs adresses (recette publiée, produit actif, pays, conseil déjà paru), la longueur des titres (60) et des descriptions (155), et l'absence d'allégation de santé.

| Page | Recherches visées | Place et vues au moment du travail | Ancien titre → nouveau titre |
| --- | --- | --- | --- |
| /recette/koki | koki, koki cameroun, le koki, gâteau de cornille | 15,1, 64 vues (« koki » : 9, 49 vues) | « Koki — recette du Cameroun \| Keur Cook » → « Koki : recette camerounaise du gâteau de cornille » |
| /recette/ndole | ndolé recette, plat camerounais | 7,4, 61 vues (« plat camerounais » : 2,6) | « Ndolé aux crevettes — recette du Cameroun \| Keur Cook » → « Recette du ndolé camerounais aux crevettes \| Keur Cook » |
| /recette/poulet-nyembwe | plat gabonais, poulet nyembwe, nyembwe | 9,6, 50 vues (« poulet nyembwe » : 15,1) | « Poulet nyembwe — recette du Gabon \| Keur Cook » → « Poulet nyembwe : le plat national gabonais \| Keur Cook » |
| /recette/poulet-odika | odika, chocolat indigène gabon, sauce odika | 9, 50 vues (« odika » : 17,4) | « Poulet à l'odika — recette du Gabon \| Keur Cook » → « Poulet à l'odika : sauce au chocolat indigène du Gabon » |
| /recette/puff-puff | puff puff, puff puff nigeria | 14, 48 vues (« puff puff » : 14,3, 36 vues) | « Puff-puff — recette du Nigeria \| Keur Cook » → « Puff-puff : recette des beignets du Nigeria \| Keur Cook » |
| /recette/fufu-light-soup | ghana fufu and light soup, fufu light soup | 6,7, 45 vues (« ghana fufu and light soup » : 9,3) | « Fufu et light soup — recette du Ghana \| Keur Cook » → « Fufu and light soup (Ghana) : recette du foufou \| Keur Cook » |
| /recette/waakye | waakye, waakye ghana | 8,4, 43 vues (« waakye » : 10,5, 30 vues) | « Waakye — recette du Ghana \| Keur Cook » → « Waakye : recette ghanéenne du riz aux haricots \| Keur Cook » |
| /recette/romazava | romazava, recette romazava | 12,2, 43 vues (« recette romazava » : 12,6) | « Romazava — recette de Madagascar \| Keur Cook » → « Romazava : recette du plat national malgache \| Keur Cook » |
| /recette/akara | akara, recette akara | 11,1, 41 vues (« akara » : 7,8, 37 vues) | « Akara — recette du Nigeria \| Keur Cook » → « Akara : recette des beignets de niébé du Nigeria \| Keur Cook » |
| /recette/pondu | pondu, pondu congo, le poundou | 10,2, 40 vues (« pondu » : 30,6) | « Pondu au poisson fumé — recette de la RD Congo \| Keur Cook » → « Pondu (saka-saka) : recette congolaise au poisson fumé » |
| /recette/ravitoto | ravitoto recette, ravitoto | 14,9, 40 vues (« ravitoto recette » : 17,9) | « Ravitoto sy henakisoa — recette de Madagascar \| Keur Cook » → « Ravitoto : recette malgache au porc (henakisoa) \| Keur Cook » |
| /recette/suya | suya | 8,5, 32 vues | « Suya de bœuf — recette du Nigeria \| Keur Cook » → « Suya : recette des brochettes de bœuf du Nigeria \| Keur Cook » |
| /recette/poisson-braise-attieke | poisson braisé cameroun, attiéké alloco poisson braisé, poisson braisé au four | 13,6, 27 vues | « Poisson braisé et attiéké — recette de Côte d'Ivoire » → « Poisson braisé et attiéké : recette ivoirienne au four » |
| /recette/to-sauce-gombo | tô sauce gombo, to plat burkina, le tô | 6, 26 vues | « Tô et sauce gombo — recette du Burkina Faso \| Keur Cook » → « Tô sauce gombo : recette du plat du Burkina Faso \| Keur Cook » |
| /recette/liboke-de-poisson | liboké de poisson, maboké de poisson | 19,2, 19 vues | « Liboké de poisson — recette du Congo \| Keur Cook » → « Liboké de poisson : recette congolaise en papillote » |
| /recette/kedjenou | kedjenou, poulet kedjenou | 15,9, 18 vues (« kedjenou » : 17) | « Kedjenou de poulet — recette de Côte d'Ivoire \| Keur Cook » → « Kedjenou de poulet : recette ivoirienne à l'étouffée » |
| /recette/shiro | shiro éthiopie, recette shiro éthiopie | 13, 17 vues | « Shiro — recette d'Éthiopie \| Keur Cook » → « Shiro : recette éthiopienne aux pois chiches \| Keur Cook » |
| /recette/jus-de-bouye | jus de baobab, jus de bouye | 5,7, 16 vues | « Jus de bouye — recette du Sénégal \| Keur Cook » → « Jus de bouye : recette du jus de baobab sénégalais » |
| /recette/fonio-aux-legumes | fonio sauce arachide, recette de fonio | 7,8, 14 vues | « Fonio aux légumes et sauce arachide \| Keur Cook » → « Fonio sauce arachide et légumes : recette du Burkina » |
| /recette/ngalakh | ngalakh, ngalar, lakh sankhal | 18, 14 vues (« ngalakh » : 47,5) | « Ngalakh — recette du Sénégal \| Keur Cook » → « Ngalakh : recette du dessert de Pâques du Sénégal » |
| /conseils/quest-ce-que-le-guedj | guedj poisson, guedji, guédji | 9,6, 9 vues | « Le guedj, qu'est-ce que c'est et comment l'utiliser ? » → « Guedj (guedji) : le poisson séché sénégalais, mode d'emploi » |
| /recette/luwombo | luwombo, luwombo recipe | 8,9, 8 vues | « Luwombo de poulet — recette d'Ouganda \| Keur Cook » → « Luwombo : poulet en feuilles de bananier d'Ouganda » |
| /conseils/enlever-amertume-du-ndole | comment enlever l'amertume d'un plat | 17, 5 vues | « Comment enlever l'amertume du ndolé ? \| Keur Cook » → « Comment enlever l'amertume du ndolé (ou d'un plat) ? » |
| /conseils/par-quoi-remplacer-le-soumbala | par quoi remplacer le nététou | 7,2, 5 vues | « Par quoi remplacer le soumbala ? \| Keur Cook » → « Par quoi remplacer le soumbala (nététou) ? \| Keur Cook » |
| /produit/fonio | fonio | 7, 3 vues | « Fonio précuit \| Keur Cook » → « Fonio précuit : la petite céréale d'Afrique de l'Ouest » |
| /recette/ugali-sukuma-wiki | ugali recette, l'ugali | 17,3, 3 vues | « Ugali et sukuma wiki — recette du Kenya \| Keur Cook » → « Recette de l'ugali et du sukuma wiki (Kenya) \| Keur Cook » |

Réponses ajoutées aux recherches sans vraie réponse (FAQ ou paragraphe, faits déjà sur le site) :
- variantes d'orthographe : pondu / poundou / saka-saka, liboké / maboké, ngalakh / ngalax, puff-puff / bofrot, jus de bouye / jus de baobab, guedj / guedji / guédji (phrase dans l'article) ;
- « plat gabonais » : FAQ du poulet nyembwe avec lien « plats gabonais » vers /pays/gabon (page travaillée le 20/10, non retouchée) ;
- « poisson braisé cameroun » : FAQ du poisson braisé (le poivre de Penja relève le poisson braisé au Cameroun, fait déjà sur la fiche du poivre) ; « poisson braisé au four » : 220 °C, 10 à 12 minutes par face ;
- « chocolat indigène » : FAQ de l'odika ; « comment enlever l'amertume d'un plat » : partie « Et pour un autre plat amer ? » dans l'article ;
- le h1 des conseils guedj (« Le guedj (guedji), quel est ce poisson séché et comment l'utiliser ? ») et soumbala (« Par quoi remplacer le soumbala (nététou) ? ») reprend désormais la recherche.
- Non traité : « jus de néré » (tô), « degue mali » (fonio), « shiro rezept », « suyq » : pas de réponse sûre à ajouter, ou recherche hors sujet.

Liens internes ajoutés ou précisés (texte du lien = la recherche) :
- entre recettes, dans les FAQ : koki ↔ akara, koki → ndolé, koki ↔ luwombo, ndolé → koki, nyembwe ↔ odika, puff-puff ↔ akara, fufu ↔ waakye, romazava ↔ ravitoto, pondu ↔ liboké, poisson braisé ↔ kedjenou, poisson braisé → alloco, tô ↔ ugali, jus de bouye ↔ ngalakh, shiro → injera ;
- depuis les FAQ vers les conseils : ndolé → « comment enlever l'amertume du ndolé », tô → « par quoi remplacer le soumbala (nététou) », fufu → foufou sans grumeaux, suya → yaji, shiro → berbéré, ngalakh → couscous de mil, fonio aux légumes → « fonio » (/produit/fonio) et « qu'est-ce que le fonio » ;
- depuis les conseils : « koki camerounais » et « pondu congolais » (remplacer l'huile de palme rouge) ; « ravitoto malgache », « waakye du Ghana », « recette du ndolé » (conserver les feuilles séchées) ; « puff-puff du Nigeria », « akara », « fonio aux légumes et sauce arachide », « shiro éthiopien », « guedj » (plats végétariens) ; « fufu and light soup » (foufou sans grumeaux, mortier bois ou pierre) ; « suya nigérian » (yaji) ; « poisson braisé à l'attiéké » (gari, attiéké, tapioca) ; « poisson braisé ou grillé » et « kedjenou de poulet » (réussir l'attiéké) ; « tô sauce gombo » et « par quoi remplacer le soumbala » (sauce gombo qui file) ; « shiro éthiopien » (berbéré) ; « jus de bouye (jus de baobab) » (jus de gingembre) ; « guedj, ou guedji » et « par quoi remplacer le soumbala » (remplacer le poisson fumé) ; « guedj » (riz rouge du thiéboudienne) ; « akara » (petit-déjeuner, en ligne le 23/12).
- Peu de liens possibles vers le romazava, l'odika et le nyembwe : aucun conseil déjà paru ne parle de Madagascar ou du Gabon (liens seulement depuis les FAQ voisines et la page pays).

### À revoir à partir du 19 novembre 2026

Les 26 pages ci-dessus : noter leur nouvelle place et leurs clics.

## 27 octobre 2026

Chiffres : Search Console, 28 derniers jours (27/09 → 25/10/2026), via le Studio.

### Pages améliorées

Presque toutes les pages de la liste « 2e page » ont été travaillées le 20 ou le 22/10 : non retouchées. Travaillées aujourd'hui : les pages encore jamais travaillées qui ont une recherche fréquente, y compris celles que Google montre au-delà de la 20e place alors que le site a déjà la vraie page (pas de page nouvelle, voir plus bas).

| Page | Recherches visées | Place et vues au moment du travail | Ancien titre → nouveau titre |
| --- | --- | --- | --- |
| /recette/garba | garba | 21,6, 33 vues | « Garba — recette de Côte d'Ivoire \| Keur Cook » → « Garba : recette de l'attiéké au thon frit d'Abidjan » |
| /recette/doro-wat | doro wat, recette doro wat | 66,1, 24 vues (« recette doro wat » : 1, 6 vues) | « Doro wat — recette d'Éthiopie \| Keur Cook » → « Doro wat : recette du ragoût de poulet éthiopien \| Keur Cook » |
| /produit/cafe-du-burundi | cafe en grain burundi | 57,9, 19 vues | « Café en grains du Burundi \| Keur Cook » → « Café en grains du Burundi, sucré et fruité \| Keur Cook » |
| /conseils/quest-ce-que-le-soumbala | soumbala | 21,8, 12 vues (17 vues avec la fiche produit, place 67,6) | « Qu'est-ce que le soumbala et comment l'utiliser ? » → « Soumbala (nététou, dawadawa) : qu'est-ce que c'est ? » |
| /conseils/quest-ce-que-le-fonio | le fonio, fonio | 9,8, 16 vues (« fonio » : 18,1, 19 vues) | « Qu'est-ce que le fonio et comment le cuire ? \| Keur Cook » → « Le fonio : qu'est-ce que c'est et comment le cuire ? » |
| /recette/mbongo-tchobi | mbongo tchobi, mbongo tchobi recette | 18, 7 vues (« mbongo tchobi » : 59) | « Mbongo tchobi — recette du Cameroun \| Keur Cook » → « Mbongo tchobi : recette camerounaise du poisson sauce noire » |

Pour les trois recettes : nouvelle méta-description et une FAQ visible de trois questions (avec données FAQPage), écrite uniquement avec des faits déjà présents dans la recette ou sur le site (garba : garbadromes, thon frit, attiéké ; doro wat : plat de fête après le jeûne, berbéré, niter kibbeh, injera ; mbongo tchobi : épices grillées, poissons, accompagnements). Le h1 (nom du plat) contient déjà la recherche : inchangé. Conseils soumbala et fonio : titre pour Google et description ; le h1 contient déjà la recherche. Café du Burundi : titre et description pour Google (les fiches des nouveautés acceptent désormais seoTitle et seoDescription).

Liens internes ajoutés (texte du lien = la recherche) :
- garba : depuis « Par quelle recette commencer » (« garba ») ; liens déjà présents depuis « Réussir l'attiéké maison » et « Gari, attiéké, tapioca » ;
- doro wat : depuis « Plats africains végétariens » (« doro wat », fin du jeûne) et depuis l'injera (FAQ « Avec quoi servir l'injera ? », seul changement sur cette page) ; liens déjà présents depuis le berbéré et la cérémonie du café ;
- café du Burundi : depuis « Cafés d'Éthiopie, du Kenya et du Rwanda » et « Café en grains ou moulu » (« café en grains du Burundi ») ;
- mbongo tchobi : depuis « Remplacer l'huile de palme rouge » ; peu d'autres pages proches qui n'aient pas été travaillées il y a moins de 28 jours (koki, ndolé : non retouchés) ;
- soumbala et fonio : déjà trois et deux liens depuis des conseils proches, rien ajouté.

### Pages travaillées il y a 28 jours ou plus

Aucune : les premières pages ont été travaillées le 20/10. Premier bilan à partir du 17 novembre 2026. Chiffres d'aujourd'hui pour mémoire (période 27/09 → 25/10, encore surtout avant le travail) : dégué 13,4 (282 vues), sauce graine 5,6 (151), ataya 10,2 (117), poulet DG 11,9 (96), alloco 11,3 (77).

### Page nouvelle

Aucune créée : chaque recherche fréquente (15 vues et plus) a déjà sa vraie page sur le site. Les plus mal placées (doro wat 66, café du Burundi 58, soumbala 22, garba 22) sont traitées ci-dessus. Aucune recherche ne demande une recette absente du site.

### Fiches enrichies

Vérifiées le 20/10/2026 (moins de 28 jours) : pas refait. Contrôlé dans les pages construites aujourd'hui : garba, doro wat, mbongo tchobi et injera ont Recipe + BreadcrumbList + FAQPage (FAQ visible), conseils soumbala et fonio Article + BreadcrumbList, JSON valide.

### Socle

Vérifié le 20/10/2026 (moins de 28 jours) : pas refait. Vitesse sur téléphone : PageSpeed refuse encore aujourd'hui (quota du jour dépassé) pour l'accueil, /recette/degue et /conseils/comment-preparer-l-ataya. À réessayer au prochain passage.

### À revoir à partir du 24 novembre 2026

Les 6 pages ci-dessus (et l'injera) : noter leur nouvelle place.
