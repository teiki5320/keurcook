# Pinterest : publication automatique

Même système que Keur Déco : chaque matin, GitHub publie jusqu'à 5 épingles sur le compte Pinterest « Keur Cook » par l'API Pinterest, avec l'application « TOA CORP publication » (accès standard accordé, la même pour tous les sites).

## Ce qui est en place (23 octobre 2026)

- **Images** : une image verticale 1000 × 1500 par recette, `public/pins/<slug>.jpg`, faite par `scripts/pin-images.mjs` (58 images).
- **Manifeste** : `scripts/epingles.ts`, lancé avant chaque build, écrit `https://keurcook.com/epingles.json` : une épingle par recette publiée qui a son image (titre, description tirée de la recette, lien `/recette/<slug>`, tableau).
- **Tableaux** (`config/pinterest.json`) : choisis selon le pays de la recette, puis le type de plat : « Recettes du Sénégal », « Recettes de Côte d'Ivoire », « Recettes du Nigeria et du Ghana », « Recettes du Cameroun et d'Afrique centrale », « Recettes d'Afrique de l'Est et australe », « Mijotés et sauces africaines », « Beignets, douceurs et boissons africaines ». Le `board_id` peut rester vide : le script prend le tableau du compte qui porte exactement ce nom.
- **Publication** : `.github/workflows/pinterest.yml`, chaque jour à 4 h 17 UTC (6 h 17 à Paris en été, 5 h 17 en hiver ; GitHub peut lancer plus tard). `scripts/pinterest-publier.mjs` prend au plus 5 épingles (`max_par_execution`), jamais deux de la même recette le même jour, les publie et note chacune dans `data/pinterest-etat.json`, enregistré sur `main`.
- **État de départ** : les 52 recettes épinglées à la main par la routine Claude `keurcook-epingles-pinterest` (du 2 au 14 octobre 2026) sont déjà notées dans `data/pinterest-etat.json` : elles ne repartiront pas. Restent les 6 boissons du 19 octobre.
- **Sans clé, rien n'est publié** : tant que les secrets Pinterest du dépôt n'existent pas, le passage affiche un avertissement et la liste des épingles qui partiraient.

## Créer la clé du compte Keur Cook (une fois, environ 5 minutes)

Dans le Terminal du Mac :

1. `cd ~/Dev/apps/keurcook && git pull`
2. Copier l'application Pinterest depuis Keur Déco (rien ne s'affiche) : `grep -E '^PINTEREST_APP_(ID|SECRET)=' ~/Dev/apps/keurdeco/.env >> .env`
3. Dans le navigateur, sur https://fr.pinterest.com/ : menu du compte (flèche en haut à droite) › « Vos comptes » › **Keur Cook**.
4. `npm run pinterest:auth`, ouvrir http://localhost:8085/ dans ce même navigateur, cliquer sur « Autoriser Keur Cook sur Pinterest », puis accepter sur la page Pinterest. La page vérifie que le compte a bien les tableaux de Keur Cook ; sinon elle refuse et n'enregistre rien.
5. Ctrl+C dans le Terminal, puis `npm run pinterest:secrets` : envoie `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET` et `PINTEREST_REFRESH_TOKEN` dans les secrets GitHub du dépôt, sans les afficher.
6. Arrêter la routine Claude `keurcook-epingles-pinterest`, qui ferait doublon.

À la main, si besoin : `gh secret set PINTEREST_REFRESH_TOKEN --repo teiki5320/keurcook` puis coller la valeur (même chose pour les deux autres).

## Durée de la clé

Pinterest renvoie un nouveau refresh token à chaque passage, mais l'ancien reste valable jusqu'à son échéance, environ 60 jours après sa création. Le workflow ouvre un seul ticket GitHub « refaire la clé » (pas un par jour) ; avant l'échéance, refaire les étapes 4 et 5.

## Vérifier

- *Actions* › « Publier les épingles Pinterest » › *Run workflow* (case « Mode à blanc » cochée) : le journal liste les épingles qui partiraient.
- Erreur 401 : clé expirée ou révoquée, refaire les étapes 4 et 5. « Tableau introuvable » : créer le tableau sous le nom exact de `config/pinterest.json`.
