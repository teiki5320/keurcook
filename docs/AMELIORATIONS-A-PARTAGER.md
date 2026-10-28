# Améliorations techniques de Keur Cook, à proposer aux autres sites

Faites sur keurcook.com le 28 octobre 2026 (Next.js en export statique, hébergé sur Cloudflare Pages, mis en ligne par GitHub Actions).
Rien ici ne dépend du contenu de Keur Cook. Pour chaque point : ce qui a été fait, à quoi ça sert, comment savoir si un autre site en a besoin, et où regarder dans ce dépôt (github.com/teiki5320/keurcook).

**Par où commencer :** les points 1, 2 et 3. Ils sont rapides à faire et évitent les deux plus gros problèmes : une mise en ligne ratée sans que personne le voie, et une copie du site indexée par Google.

---

## A. Mise en ligne

### 1. La mise en ligne s'arrête s'il manque un réglage
- **Avant :** si un secret GitHub (clé Cloudflare, identifiant du compte) manquait, la mise en ligne disait « réussi » sans rien publier.
- **Maintenant :** elle s'arrête avec une erreur (`exit 1`).
- **À vérifier ailleurs :** que fait la mise en ligne quand un secret manque ? Une étape `wrangler pages project create … || true` peut aussi cacher une erreur. On l'a retirée.
- **Où regarder :** `.github/workflows/deploy.yml`, étape de vérification des secrets.

### 2. Vérifier que le site en ligne a bien changé
- Chaque mise en ligne écrit `out/version.txt` avec le numéro de commit et de lancement.
- À la fin, la mise en ligne lit `https://<domaine>/version.txt` pendant 3 minutes au plus. Si ce n'est pas la nouvelle version, elle échoue.
- **Pourquoi :** une mise en ligne « verte » ne prouve pas que le vrai domaine sert la nouvelle version.
- **Où regarder :** `.github/workflows/deploy.yml`, étapes « Marquer la version publiée » et « Vérifier que keurcook.com sert la nouvelle version ».

## B. Google

### 3. Cacher à Google la copie technique `*.pages.dev`
- Sur Cloudflare Pages, le site existe aussi en double sur `projet.pages.dev` et sur chaque adresse de prévisualisation.
- On ajoute dans `public/_headers` :
  ```
  https://:project.pages.dev/*
    X-Robots-Tag: noindex

  https://:version.:project.pages.dev/*
    X-Robots-Tag: noindex
  ```
- **À vérifier ailleurs :** `curl -sI https://<projet>.pages.dev/ | grep -i x-robots` doit répondre `noindex`, et le vrai domaine ne doit pas.
- **Où regarder :** `public/_headers`.

### 4. Cacher les fichiers `.txt` de Next.js
- Next.js crée un fichier `.txt` par page, pour sa navigation interne. Google n'en a pas besoin.
- On ajoute `/*.txt` avec `X-Robots-Tag: noindex` dans `public/_headers`.

### 5. Photos en grand dans les résultats Google
- Balise `<meta name="robots" content="max-image-preview:large">` sur toutes les pages. On la garde aussi sur les pages en `noindex` (page 404, maintenance).
- **Où regarder :** `src/app/layout.tsx` (`robots: { "max-image-preview": "large" }`) et `src/lib/metadata.ts` (option `noindex`).

### 6. Pages hors cible : cachées à Google et hors du plan du site
- Les pages qui ne correspondent pas au public visé gardent leur adresse, mais elles passent en `noindex` et sortent du sitemap.
- **Où regarder :** `src/app/sitemap.ts` et l'option `noindex` de `pageMetadata` dans `src/lib/metadata.ts`.

### 7. Un plan du site propre
- Aucune page en `noindex` dans le sitemap.
- Des dates de mise à jour justes, celles des pages légales comprises.
- **Où regarder :** `src/app/sitemap.ts`.

### 8. Titres de page courts et uniques
- Environ 60 caractères au plus, sinon Google les coupe.
- Un titre court propre à chaque fiche quand le nom complet est trop long (champ `seoTitle`).
- Un test vérifie la longueur.

### 9. Descriptions coupées proprement à 155 caractères
- Pour les pages créées automatiquement (articles, actus), la description est coupée sur un mot entier, avec « … ».
- **Où regarder :** `descriptionCourte()` dans `src/lib/veille-articles.ts`.

### 10. Lier les fiches voisines entre elles
- Chaque fiche propose les fiches suivantes de la même gamme, en boucle. Toutes les fiches reçoivent ainsi des liens, et Google les découvre.
- **Où regarder :** `getRelatedProducts()` dans `src/lib/data/catalog.ts`.

### 11. Une liste simple de tous les articles
- Si une page liste ses articles en JavaScript, on ajoute une liste de liens écrite en dur dans le HTML, pour que Google trouve chaque article.
- **Où regarder :** `src/app/(shop)/actus/page.tsx`.

### 12. Données structurées (JSON-LD)
- `ItemList` sur les pages de liste (recettes d'un pays, classements).
- `BreadcrumbList` (fil d'Ariane) pour Google, même quand il n'est pas affiché aux visiteurs.
- **Où regarder :** `src/lib/json-ld.tsx` (`itemListLd`, `breadcrumbLd`, `JsonLdScript`).
- **À vérifier :** avec le test des résultats enrichis de Google (search.google.com/test/rich-results).

### 13. Une image de partage par page de classement
- Un script crée une image de 1200 × 630 avec les 3 premières photos et le titre, au format JPEG.
- Elle sert de `og:image`, l'image affichée quand on partage le lien sur WhatsApp, Facebook ou Pinterest.
- **Où regarder :** `scripts/images-top10.ts`. Il utilise `sharp` et se relance quand un classement change.

## C. Vitesse

### 14. Photos en plusieurs tailles
- Au moment de construire le site, `sharp` crée des copies en 384, 640, 960 et 1280 px dans `public/img/<largeur>/…`. Ce dossier n'est pas enregistré dans git (`.gitignore`).
- Les balises d'image annoncent ces tailles (`srcSet` et `sizes`), et le navigateur choisit la bonne.
- **Résultat :** des pages 40 à 85 % plus légères. Une page conseil est passée de 5,9 Mo à 0,9 Mo, l'accueil de 2,1 Mo à 1,3 Mo.
- **Où regarder :**
  - `scripts/images-responsives.mjs`, lancé dans `prebuild` (`package.json`) ;
  - `src/lib/image-loader.ts` (`photoSrcSet()`) ;
  - `next.config.ts` (`images.loader: "custom"`, `deviceSizes`, `imageSizes`).

### 15. Chargement différé des photos hors écran
- `loading="lazy"` sur toutes les photos qui ne sont pas visibles au premier affichage.

### 16. La photo principale en priorité
- `fetchPriority="high"` sur la grande photo du haut de page.

### 17. Icônes compressées
- `icon.png` et `apple-icon.png` sont réenregistrées avec une palette de couleurs réduite, ce qui les rend bien plus légères.

### 18. Point encore faible, à surveiller ailleurs aussi
- Sur téléphone, le premier affichage reste lent : 4 à 10 secondes avant que le contenu principal apparaisse.
- La cause est le chargement des polices et du JavaScript, pas les photos.
- Ce n'est pas encore réglé sur Keur Cook.

## D. Accessibilité (lecteurs d'écran, téléphone)

### 19. Listes d'informations bien écrites
- Une liste `<dl>` ne doit contenir que des paires `<dt>`/`<dd>`, éventuellement chacune dans un `<div>`. Une icône posée directement dans le `<dl>` la rend invalide.

### 20. Petits boutons faciles à toucher
- Au moins 24 × 24 px, par exemple les points d'un carrousel : on agrandit la zone cliquable, et le point visible reste petit à l'intérieur.

### 21. Nom clair pour chaque bouton de lien partenaire
- Par exemple `aria-label="Voir sur Amazon : <nom>, lien partenaire (nouvel onglet)"`, sinon tous les boutons s'appellent pareil.
- **Où regarder :** `src/components/product/AmazonButton.tsx`.

### 22. Résultat
- 100 sur 100 dans Lighthouse en accessibilité, en référencement et en bonnes pratiques, sur 4 pages types.

## E. Liens Amazon Partenaires

### 23. Un seul bouton « Voir sur Amazon », sans prix
- À notre connaissance, Amazon n'autorise un prix affiché que s'il vient de son service officiel et qu'il est mis à jour au moins toutes les 24 heures. Un prix recopié à la main est donc risqué.
- **À vérifier :** dans le règlement du programme Partenaires d'Amazon.
- Le lien porte `rel="sponsored nofollow noopener"` et `target="_blank"`, et la mention « Lien partenaire » est écrite près du bouton.
- **Où regarder :** `src/components/product/AmazonButton.tsx` et `src/lib/amazon.ts`.

### 24. Plus de tri par prix
- Le tri par prix reposait sur des prix recopiés. Il est remplacé par l'ordre alphabétique.

### 25. Pages légales et bandeau cookies à jour
- Ils parlent du bouton « Voir sur Amazon » et disent que le site n'affiche aucun prix. La date de mise à jour des pages légales a changé.

## F. Méthode d'audit, réutilisable

### 26. Lighthouse sur 4 pages types
- L'accueil, une fiche, un article et une page de liste.
- Commande : `npx lighthouse@12 <url> --preset=desktop` (ou sans le preset, pour un téléphone).
- Le score de vitesse varie beaucoup d'un essai à l'autre. Il faut faire plusieurs essais et regarder surtout le poids des pages.

### 27. Un petit robot qui parcourt tout le site
- Il part du sitemap, ouvre chaque page et signale :
  - les titres de plus de 60 caractères ;
  - les descriptions de plus de 155 caractères ou absentes ;
  - les doublons de titre ;
  - les liens internes cassés ;
  - les pages présentes sur le site mais absentes du sitemap.
