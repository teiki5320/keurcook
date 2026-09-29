# Keurcook — recettes africaines & produits rares

Site en français de **recettes de plats africains** (46 recettes, 16 pays), avec une rubrique **Conseils** (un article chaque lundi) et une **boutique de 91 produits africains rares** en 8 gammes. Le site ne vend rien lui-même : les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires).

**Stack** : Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Neon (base de données PostgreSQL) · Marked (articles Markdown).

---

## Voir le site en ligne

> Le site s'appelle désormais **Keurcook** (domaine **keurcook.com**, contact **contact@keurcook.com**, renvoyé vers contact@alohash.fr). La société éditrice reste **ALOHASH** (SAS). Migration de l'hébergement vers Cloudflare en cours : les adresses ci-dessous sont encore celles d'aujourd'hui.

- **Site de référence** : https://www.alohash.fr (Vercel + Neon ; actuellement en maintenance).
- **Vitrine de démonstration** : 👉 **https://teiki5320.github.io/alohash/**, copie statique en `noindex` publiée sur GitHub Pages à chaque push sur `main` et chaque lundi (workflow `.github/workflows/pages.yml`). GitHub Pages n'ayant pas de serveur, **la newsletter et l'admin y sont désactivés**.

Pour reproduire le build de la vitrine en local : `npm run build:pages` (sortie dans `out/`, servie sous `/alohash/`).

---

## Fonctionnalités

**Côté site**

- Accueil : carte de l'Afrique en particules (un point par pays), carrousels de recettes par type de plat, produits rares, newsletter.
- Recettes : carrousel des types de plats, filtres (pays, difficulté), **recherche par plat, pays ou ingrédient**.
- Fiche recette : histoire du plat, portions ajustables (quantités recalculées), étapes, astuces, **version imprimable**, **partage WhatsApp**, favori ; ingrédients disponibles en boutique signalés « Produit rare », avec bouton d'achat Amazon.
- Pages pays, **favoris sans compte** (stockés dans le navigateur).
- **Conseils** : articles Markdown (`content/conseils/`), un article chaque lundi, publication programmée (voir `docs/CONSEILS.md`).
- Boutique par gammes, fiche produit avec « Utilisé dans ces recettes », bouton « Acheter · prix » vers Amazon.fr.

**Côté admin (`/admin`)** : une seule fonction, **mettre le site en maintenance** (écran « On prépare la marmite », message modifiable). Connexion par mot de passe unique (`ADMIN_PASSWORD`), session par cookie signé valable 7 jours.

Recettes et produits se modifient dans le code (`src/lib/demo/`), puis sont recopiés dans la base.

### Boutique et Amazon Partenaires

- 91 produits en 8 gammes : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles. Produits retenus : plus de 3,5 étoiles sur Amazon.
- Liens construits par `src/lib/amazon.ts` à partir du champ `amazon_asin` et du tag partenaire `kultiva-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- Prix **indicatifs**, relevés le 27/09/2026 : le prix affiché par Amazon fait foi.
- Le site n'encaisse rien et ne gère aucun stock : achat, paiement et livraison se font sur Amazon.

### Conformité

- **Aucune allégation de santé** : liste de termes à risque (« soigne », « bienfaits », « digestion »… — voir `src/lib/compliance.ts`). Cette liste ne remplace pas une relecture humaine.
- **Étiquetage alimentaire** : ingrédients, allergènes et conservation sur chaque fiche produit .
- Newsletter avec **consentement explicite**.
- Pages **conditions d'utilisation** (`/conditions`, CGU ; `/cgv` y redirige), **mentions légales**, **politique de confidentialité** ; **bannière cookies d'information** (cookies nécessaires seulement).
- Données structurées Google **Recipe** et **Product**, sitemap avec les recettes, les pays et les articles publiés.

> ⚠️ Les textes légaux sont des **modèles** à faire valider.

---

## Démarrage rapide (mode démo)

Prérequis : Node.js ≥ 20.9.

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000. **Sans `DATABASE_URL`, le site tourne en mode démo** : les recettes et les produits sont chargés depuis `src/lib/demo/` (`recipes*.ts`, `catalog*.ts`). L'admin et la newsletter ne sont pas disponibles dans ce mode.

---

## Installation complète (Vercel + Neon)

### 1. Créer le projet Vercel et la base

1. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt GitHub (framework détecté automatiquement). Chaque push sur `main` redéploie le site.
2. Dans le projet : **Storage → Create Database → Neon** (région **Francfort `eu-central-1`**, pour le RGPD), puis **Connect** au projet. La variable `DATABASE_URL` est ajoutée automatiquement.
3. Installez le schéma de la base, au choix :
   - depuis Vercel : **Storage → la base Neon → Open in Neon → SQL Editor**, collez `db/schema.sql` puis (facultatif) `db/seed.sql` et exécutez ;
   - en local : `npx vercel link`, `npx vercel env pull .env.local`, puis `npm run db:setup` (schéma seul) ou `npm run db:setup -- --seed` (schéma + recettes et produits de démo).

   Les deux scripts sont rejouables sans perte de données.

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Sur Vercel, ajoutez les autres variables dans **Settings → Environment Variables**. En local, `npx vercel env pull .env.local` récupère `DATABASE_URL`.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, liens canoniques) |
| `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` | Nom du site, e-mail de contact |
| `DATABASE_URL` | **Secret serveur** : connexion à la base Neon (recettes, catalogue, newsletter, réglages) |
| `ADMIN_PASSWORD` | **Secret** : mot de passe de l'espace admin (maintenance) |
| `NEXT_PUBLIC_AMAZON_TAG` | Tag Amazon Partenaires (par défaut `kultiva-21`) |
| `NEXT_PUBLIC_LEGAL_*` | Informations des mentions légales et des conditions d'utilisation |

### 3. Accès administrateur

1. Définissez `ADMIN_PASSWORD` (mot de passe long et unique) dans les variables d'environnement.
2. Connectez-vous sur `/admin/login` avec ce mot de passe.

L'admin ne sert qu'à activer ou couper le mode maintenance. Les opérations passent uniquement par le serveur : la base n'est jamais accessible depuis le navigateur. Changer `ADMIN_PASSWORD` déconnecte toutes les sessions.

---

## Déploiement

### GitHub Pages (vitrine de démonstration)

Automatique à chaque push sur `main` et chaque lundi à 0 h 15 (cron, pour publier les articles programmés). Réglage unique : **Settings → Pages → Source : « GitHub Actions »**. Le script `scripts/build-pages.mjs` active `output: "export"` + `basePath`, met temporairement de côté les parties serveur (admin, proxy), utilise toujours les données de démo et remplace le formulaire de newsletter par un message. Toutes les pages sont en `noindex` : `www.alohash.fr` reste le site de référence.

### Vercel (site de référence)

Voir « Installation complète » ci-dessus. Pensez à `NEXT_PUBLIC_SITE_URL=https://www.alohash.fr` dans les variables d'environnement.

### Nom de domaine IONOS

Dans Vercel (**Settings → Domains**), ajoutez `votre-domaine.fr` et `www.votre-domaine.fr`, puis dans IONOS (**Domaines & SSL → votre domaine → DNS**) :

| Type | Nom d'hôte | Valeur |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Supprimez au préalable les enregistrements A / AAAA / CNAME par défaut d'IONOS sur `@` et `www` (conservez les MX si vous utilisez la messagerie IONOS). Les valeurs exactes sont affichées par Vercel lors de l'ajout du domaine : elles font foi. Le certificat HTTPS est généré automatiquement après propagation (de quelques minutes à 24 h).

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run build:pages` | Build de la vitrine statique GitHub Pages (dossier `out/`, sous-dossier `/alohash/`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests (`tests/*.test.ts`) |
| `npm run db:setup` | Installe le schéma (`db/schema.sql`) sur la base `DATABASE_URL` ; `-- --seed` ajoute les recettes et produits de démo |
| `npm run db:seed-sql` | Régénère `db/seed.sql` depuis `src/lib/demo/` (produits et recettes) |

**Avant chaque envoi** : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run build:pages`.

## Structure

```
content/conseils/      articles « Conseils » en Markdown (date de publication dans l'en-tête)
src/
  app/(shop)/          site : accueil, recettes (?type= / ?pays= / ?q=), recette/, pays/, favoris,
                       boutique (?gamme= / ?q=), categorie/, produit/, conseils/, pages légales
                       communaute-actions.ts : inscription à la newsletter
  app/admin/           espace admin (login + (panel) protégé : mode maintenance)
  components/          UI (recipe/, community/, conseils/, nuage/ = thème, carte et carrousels, product/, shop/, admin/)
  lib/data/            accès aux données (recettes, catalogue, conseils, admin, réglages) — base Neon ou démo
  lib/amazon.ts        liens « Acheter » vers Amazon.fr (tag partenaire)
  lib/conseils/        lecture des articles et thèmes
  lib/countries.ts     pays (nom, « de … », position sur la carte)
  lib/recipe-utils.ts  types de plats, durées, quantités, recherche
  lib/db/              client SQL Neon, conversion des lignes
  lib/rate-limit.ts    limitation des tentatives (table rate_limits)
  lib/compliance.ts    détection des allégations de santé
  proxy.ts             protection de /admin (cookie de session admin)
db/
  schema.sql           schéma SQL (catalogue, recettes, newsletter, réglages, rate_limits)
  seed.sql             recettes et produits de démo
docs/                  INFRA, MARKETING, PUBLICATION, CONSEILS, CONSEILS-CALENDRIER
tests/                 tests (articles « Conseils »)
```

### Sécurité

- La base n'est jamais exposée au navigateur : toutes les requêtes passent par le serveur (`DATABASE_URL` est un secret serveur), et les écritures admin exigent la session admin (mot de passe + cookie signé).
- **Limitation des tentatives** (table `rate_limits`, adresse IP hachée) : connexion admin 5 par 15 minutes, newsletter 5 par heure.
- En-têtes de sécurité dans `next.config.ts` : politique de sécurité du contenu (CSP), HSTS, `X-Frame-Options`, `nosniff`.
- En maintenance, les pages sont en `noindex` et le sitemap est vide.
- Les photos (`public/recipes/*.webp`, `public/products/*.webp`, `public/conseils/`) sont **générées par IA** (OpenArt).
