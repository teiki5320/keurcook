# Keur Cook — recettes africaines & produits rares

Site en français de **recettes de plats africains** (46 recettes, 16 pays), avec une rubrique **Conseils** (un article chaque lundi) et une **boutique de 91 produits africains rares** en 8 gammes. Le site ne vend rien lui-même : les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires).

- **Site** : https://keurcook.com (`www.keurcook.com` y redirige).
- **Éditeur** : ALOHASH (SAS). Contact : contact@keurcook.com.
- **Dépôt** : https://github.com/teiki5320/keurcook.

**Stack** : Next.js 16 (App Router, export statique) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Marked (articles Markdown). Hébergement : Cloudflare Pages.

Le site est **100 % statique** : pas de serveur, pas de base de données. Recettes, produits et articles sont dans le code (`src/lib/demo/`, `content/conseils/`) ; le build produit le dossier `out/`, publié tel quel.

---

## Fonctionnalités

- Accueil : carte de l'Afrique en particules (un point par pays), carrousels de recettes par type de plat, produits rares.
- Recettes : carrousel des types de plats, filtres (pays, difficulté), **recherche par plat, pays ou ingrédient**.
- Fiche recette : histoire du plat, portions ajustables (quantités recalculées), étapes, astuces, **version imprimable**, **partage WhatsApp**, favori ; ingrédients disponibles en boutique signalés « Produit rare », avec bouton d'achat Amazon.
- Pages pays, **favoris sans compte** (stockés dans le navigateur).
- **Conseils** : articles Markdown (`content/conseils/`), un article chaque lundi, publication programmée (voir `docs/CONSEILS.md`).
- Boutique par gammes, fiche produit avec « Utilisé dans ces recettes », bouton « Acheter · prix » vers Amazon.fr.
- **Mode maintenance** : écran « On prépare la marmite », activé ou coupé depuis GitHub (voir « Maintenance » ci-dessous).

Recettes et produits se modifient dans le code (`src/lib/demo/`), articles dans `content/conseils/` ; chaque modification envoyée sur `main` republie le site.

Pas de newsletter pour l'instant : le formulaire a été retiré en attendant le choix d'un outil d'envoi.

### Boutique et Amazon Partenaires

- 91 produits en 8 gammes : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles. Produits retenus : plus de 3,5 étoiles sur Amazon.
- Liens construits par `src/lib/amazon.ts` à partir du champ `amazon_asin` et du tag partenaire `kultiva-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- Prix **indicatifs**, relevés le 27/09/2026 : le prix affiché par Amazon fait foi.
- Le site n'encaisse rien et ne gère aucun stock : achat, paiement et livraison se font sur Amazon.

### Conformité

- **Aucune allégation de santé** : liste de termes à risque (« soigne », « bienfaits », « digestion »… — voir `src/lib/compliance.ts`). Cette liste ne remplace pas une relecture humaine.
- **Étiquetage alimentaire** : ingrédients, allergènes et conservation sur chaque fiche produit.
- Pages **conditions d'utilisation** (`/conditions`, CGU ; `/cgv` y redirige), **mentions légales**, **politique de confidentialité** ; **bannière cookies d'information** (cookies nécessaires seulement). Hébergeur indiqué : Cloudflare, Inc.
- Données structurées Google **Recipe** et **Product**, sitemap avec les recettes, les pays et les articles publiés.

> ⚠️ Les textes légaux sont des **modèles** à faire valider.

### Logos

Fichiers d'origine dans `assets/logo/` (fond noir, fond blanc, transparent). Versions du site dans `public/brand/` : `keurcook-embleme.webp` (marmite, en-tête et pied de page), `keurcook-logo.webp` (logo complet), `keurcook-partage.jpg` (image de partage 1200 × 630) ; icônes d'onglet `src/app/icon.png` et `src/app/apple-icon.png`.

---

## Démarrage

Prérequis : Node.js ≥ 20.9.

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000. Aucune variable n'est obligatoire ; pour les régler en local : `cp .env.example .env.local`.

### Variables d'environnement

Toutes publiques (aucun secret dans le site). Liste complète : `.env.example`.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, liens canoniques) ; `https://keurcook.com` au build de production |
| `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` | Nom du site (Keur Cook), e-mail de contact (contact@keurcook.com) |
| `NEXT_PUBLIC_AMAZON_TAG` | Tag Amazon Partenaires (par défaut `kultiva-21`) |
| `NEXT_PUBLIC_LEGAL_*` | Informations des mentions légales et des conditions d'utilisation (hébergeur par défaut : Cloudflare) |

---

## Publication

Workflow GitHub Actions `.github/workflows/deploy.yml` (« Publier le site »), lancé :

- à chaque push sur `main` ;
- chaque lundi à 0 h 15 (cron), pour publier les articles « Conseils » programmés ;
- à la main (onglet **Actions → Publier le site → Run workflow**) ;
- après le bouton « Maintenance ».

Étapes : lint, types, tests, build (`out/`), puis `wrangler pages deploy out --project-name=keurcook` vers Cloudflare Pages. La publication n'a lieu que si les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` sont présents (**Settings → Secrets and variables → Actions**) ; sinon le workflow affiche un avertissement et ne publie rien.

Mise en route restante : voir `docs/PUBLICATION.md`.

### Maintenance

Onglet **Actions → Maintenance → Run workflow** : choisir « Oui, mettre en pause » ou « Non, rouvrir le site », avec un message facultatif. Le workflow `.github/workflows/maintenance.yml` modifie `content/maintenance.json`, l'enregistre sur `main` et republie le site.

Pendant la maintenance : écran « On prépare la marmite », pages en `noindex`, sitemap vide. Les pages légales (`/mentions-legales`, `/confidentialite`, `/conditions`) restent accessibles (groupe de routes `src/app/(legal)`).

### En-têtes et redirections

Servis par Cloudflare Pages :

- `public/_headers` : politique de sécurité du contenu (CSP), HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, cache long des fichiers `/_next/static/`.
- `public/_redirects` : `/cgv` → `/conditions`, `/categorie/:slug` → `/boutique?gamme=:slug`, anciennes pages (`/panier`, `/commande`, `/accessoires`, `/avertissements`, `/admin`…) vers la boutique, les conditions ou l'accueil.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build statique (dossier `out/`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests (`tests/*.test.ts`) |

**Avant chaque envoi** : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## Structure

```
.github/workflows/
  deploy.yml           publication sur Cloudflare Pages (push, lundi, à la main, après maintenance)
  maintenance.yml      bouton « Maintenance » (modifie content/maintenance.json et republie)
content/
  conseils/            articles « Conseils » en Markdown (date de publication dans l'en-tête)
  maintenance.json     mode maintenance (activé ou non, message affiché)
public/
  _headers             en-têtes de sécurité (Cloudflare Pages)
  _redirects           redirections (Cloudflare Pages)
  recipes/, products/, conseils/   photos (WebP)
src/
  app/(shop)/          site : accueil, recettes (?type= / ?pays= / ?q=), recette/, pays/, favoris,
                       boutique (?gamme= / ?q=), produit/, conseils/
  app/(legal)/         pages légales, accessibles même en maintenance
  components/          UI (recipe/, conseils/, nuage/ = thème, carte et carrousels, product/, shop/, layout/, compliance/)
  lib/data/            accès aux données (recettes, catalogue, gammes, conseils, réglages de maintenance)
  lib/demo/            recettes et produits
  lib/amazon.ts        liens « Acheter » vers Amazon.fr (tag partenaire)
  lib/conseils/        lecture des articles et thèmes
  lib/countries.ts     pays (nom, « de … », position sur la carte)
  lib/recipe-utils.ts  types de plats, durées, quantités, recherche
  lib/compliance.ts    détection des allégations de santé
docs/                  INFRA, MARKETING, PUBLICATION, CONSEILS, CONSEILS-CALENDRIER
tests/                 tests (articles « Conseils », contenus)
```

Photos (`public/recipes/*.webp`, `public/products/*.webp`, `public/conseils/`) : photos OpenArt.
