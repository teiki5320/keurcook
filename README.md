# Alohash — recettes africaines & produits rares

Site en français de **recettes de plats africains** (vitrine principale) et **épicerie en ligne de produits africains rares** : épices, céréales anciennes, feuilles séchées, poissons fumés, huiles et pâtes.

**Stack** : Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Neon (base de données PostgreSQL) · Nodemailer (SMTP) · Stripe.

---

## Voir le site en ligne

- **Site complet** : https://www.alohash.fr (actuellement en maintenance).
- **Vitrine de démonstration statique** : 👉 **https://teiki5320.github.io/alohash/**, publiée automatiquement sur GitHub Pages à chaque push sur `main` (workflow `.github/workflows/pages.yml`). Recettes, pays, favoris, boutique, panier et bannière cookies fonctionnent ; GitHub Pages n'ayant pas de serveur, **la commande, les avis, la newsletter et l'admin y sont désactivés**.

Pour reproduire le build de la vitrine en local : `npm run build:pages` (sortie dans `out/`, servie sous `/alohash/`).

---

## Fonctionnalités

| Côté site | Côté admin (`/admin`) |
| --- | --- |
| Accueil : carte de l'Afrique en particules (un point par pays), carrousels de recettes par type de plat, produits rares, newsletter | Connexion par mot de passe unique (`ADMIN_PASSWORD`), session par cookie signé valable 7 jours |
| Recettes : carrousel des types de plats, filtres (pays, difficulté), **recherche par plat, pays ou ingrédient** | Tableau de bord : recettes, avis à valider, inscrits, commandes, stocks bas |
| Fiche recette : histoire du plat, portions ajustables (quantités recalculées), étapes, astuces, **version imprimable**, **partage WhatsApp**, favori | Recettes : création / édition (ingrédients liés aux produits, étapes réordonnables, photo), publication, mise en avant |
| Ingrédients vendus sur le site signalés « Produit rare » + **« Tout ajouter au panier »** | Avis : à valider / publiés / refusés |
| **Avis** (note + commentaire), publiés après validation | Newsletter : liste des inscrits, **export CSV** |
| Pages pays, **favoris sans compte** (stockés dans le navigateur) | Produits (étiquetage : origine, ingrédients, allergènes, conservation), stocks, commandes |
| Épicerie par gammes, fiche produit avec « Utilisé dans ces recettes » | Maintenance : met le site en pause (écran « On prépare la marmite », commandes suspendues) |
| Panier, commande, paiement (Stripe Checkout et/ou virement), e-mails | Annulation de commande → remise en stock automatique |

### Conformité

- **Aucune allégation de santé** : l'admin bloque l'enregistrement d'une recette ou d'un produit contenant des termes à risque (« soigne », « bienfaits », « digestion »… — voir `src/lib/compliance.ts`). Cette liste ne remplace pas une relecture humaine.
- **Étiquetage alimentaire** (règlement INCO) : ingrédients, allergènes et conservation sur chaque fiche produit ; un produit ne peut pas être publié sans liste d'ingrédients.
- Avis modérés avant publication ; newsletter avec **consentement explicite**.
- Pages **mentions légales**, **CGV**, **politique de confidentialité** ; **bannière cookies RGPD**.
- Données structurées Google **Recipe** et **Product**, sitemap avec toutes les recettes.

> ⚠️ Les textes légaux sont des **modèles** à faire valider. Vente de denrées alimentaires : déclaration auprès de la DDPP du département et étiquetage conforme sur les emballages.

---

## Démarrage rapide (mode démo)

Prérequis : Node.js ≥ 20.9.

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000. **Sans `DATABASE_URL`, le site tourne en mode démo** : les 46 recettes et 26 produits de démonstration sont chargés depuis `src/lib/demo/` (`recipes*.ts`, `catalog.ts`), les commandes et les stocks sont gardés en mémoire (perdus au redémarrage) et les emails sont affichés dans la console. L'admin, les avis et la newsletter ne sont pas disponibles dans ce mode.

---

## Installation complète (Vercel + Neon + Vercel Blob)

### 1. Créer le projet Vercel, la base et le stockage

1. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt GitHub (framework détecté automatiquement). Chaque push sur `main` redéploie le site.
2. Dans le projet : **Storage → Create Database → Neon** (région **Francfort `eu-central-1`**, pour le RGPD), puis **Connect** au projet. La variable `DATABASE_URL` est ajoutée automatiquement.
3. Toujours dans **Storage** : **Create → Blob** en accès **Public** (les photos doivent être visibles de tous), puis **Connect**. Les variables `BLOB_STORE_ID` et `BLOB_WEBHOOK_PUBLIC_KEY` sont ajoutées automatiquement ; sur Vercel, l'accès au stockage se fait ensuite sans clé secrète (OIDC).
4. Installez le schéma de la base, au choix :
   - depuis Vercel : **Storage → la base Neon → Open in Neon → SQL Editor**, collez `db/schema.sql` puis (facultatif) `db/seed.sql` et exécutez ;
   - en local : `npx vercel link`, `npx vercel env pull .env.local`, puis `npm run db:setup` (schéma seul) ou `npm run db:setup -- --seed` (schéma + recettes et produits de démo).

   Les deux scripts sont rejouables sans perte de données.

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Sur Vercel, ajoutez les autres variables dans **Settings → Environment Variables**. En local, `npx vercel env pull .env.local` récupère `DATABASE_URL` et les variables Blob.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, liens des emails) |
| `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` | Nom de la boutique, email de contact |
| `DATABASE_URL` | **Secret serveur** : connexion à la base Neon (catalogue, commandes, admin) |
| `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY` | Stockage Vercel Blob (envoi de photos depuis l'admin), ajoutées par Vercel ; hors Vercel, utiliser `BLOB_READ_WRITE_TOKEN` |
| `ADMIN_PASSWORD` | **Secret** : mot de passe de l'espace admin |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM` | Envoi des emails |
| `ADMIN_NOTIFICATION_EMAIL` | Reçoit chaque nouvelle commande |
| `PAYMENT_PROVIDERS` | Moyens de paiement actifs (`bank_transfer` par défaut) |
| `PAYMENT_BANK_*` | Coordonnées bancaires affichées au client |
| `SHIPPING_FLAT_RATE_CENTS`, `SHIPPING_FREE_THRESHOLD_CENTS` | Frais de port et seuil de gratuité |
| `NEXT_PUBLIC_LEGAL_*` | Informations des mentions légales et CGV |

### 3. Accès administrateur

1. Définissez `ADMIN_PASSWORD` (mot de passe long et unique) dans les variables d'environnement.
2. Connectez-vous sur `/admin/login` avec ce mot de passe.

Les opérations admin passent uniquement par le serveur : la base n'est jamais accessible depuis le navigateur. Les photos partent directement du navigateur vers Vercel Blob, avec une URL d'envoi présignée (10 minutes, un seul fichier) délivrée par `/admin/upload` à l'admin connecté. Changer `ADMIN_PASSWORD` déconnecte toutes les sessions.

### 4. Emails

N'importe quel serveur SMTP convient. Avec une boîte mail **IONOS** : `SMTP_HOST=smtp.ionos.fr`, `SMTP_PORT=587`, `SMTP_SECURE=false`, identifiants de la boîte, et `EMAIL_FROM` sur la même adresse. Pensez à configurer SPF / DKIM dans la zone DNS pour éviter les spams.

---

## Paiement par carte (Stripe)

`src/lib/payments/providers/stripe.ts` : Stripe Checkout (page hébergée par Stripe : carte, Apple Pay, Google Pay…). Le client est redirigé vers Stripe, puis revient sur la page de confirmation ; la commande passe en « Payée » automatiquement (webhook, et vérification au retour du client). Une session expirée (1 h) ou un paiement refusé annule la commande et remet le stock en vente. Les emails de commande partent une fois le paiement confirmé.

1. Stripe (mode test d'abord) → **Développeurs → Clés API** : clé secrète → variable `STRIPE_SECRET_KEY` (Vercel, type Secret).
2. **Développeurs → Webhooks → Ajouter une destination** : URL `https://www.alohash.fr/api/payments/stripe/webhook`, événements `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired` ; secret de signature → `STRIPE_WEBHOOK_SECRET`.
3. `PAYMENT_PROVIDERS=stripe,bank_transfer`, puis redéployer.
4. Moyens proposés : **Paramètres → Moyens de paiement** dans Stripe.

⚠️ Le compte Stripe ouvert pour l'ancienne activité CBD a été fermé : ouvrir (ou faire réactiver) un compte en déclarant l'activité d'épicerie alimentaire avant de passer en clés réelles (`sk_live_…`).

## Paiement : ajouter un prestataire

Le paiement passe par l'interface `PaymentProvider` (`src/lib/payments/types.ts`). Le seul prestataire actif est `BankTransferProvider` (virement / paiement à la commande) : la commande est créée « en attente de paiement », l'admin la passe en « Payée » à réception du virement.

Pour brancher un autre prestataire :

1. Copiez `src/lib/payments/providers/_template.ts` et implémentez `initiatePayment` (création de la session de paiement → `{ status: "redirect", redirectUrl }`) et `handleWebhook` (vérification de signature → `{ orderNumber, status: "paid" }`).
2. Ajoutez l'instance dans `src/lib/payments/registry.ts` et son id dans `PAYMENT_PROVIDERS`.
3. Déclarez chez le prestataire l'URL de notification `https://votre-domaine.fr/api/payments/<id>/webhook`.

Le tunnel de commande, la redirection et le passage automatique en « Payée » sont déjà gérés.

---

## Déploiement

### GitHub Pages (vitrine statique)

Automatique à chaque push sur `main`. Réglage unique : **Settings → Pages → Source : « GitHub Actions »**. Le script `scripts/build-pages.mjs` active `output: "export"` + `basePath`, met temporairement de côté les parties serveur (admin, API, confirmation de commande) et remplace les formulaires de commande, d'avis et de newsletter par un message.

### Vercel (boutique réelle)

Voir « Installation complète » ci-dessus. Pensez à `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr` dans les variables d'environnement.

### Nom de domaine IONOS

Dans Vercel (**Settings → Domains**), ajoutez `votre-domaine.fr` et `www.votre-domaine.fr`, puis dans IONOS (**Domaines & SSL → votre domaine → DNS**) :

| Type | Nom d'hôte | Valeur |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Supprimez au préalable les enregistrements A / AAAA / CNAME par défaut d'IONOS sur `@` et `www` (conservez les MX si vous utilisez la messagerie IONOS). Les valeurs exactes sont affichées par Vercel lors de l'ajout du domaine : elles font foi. Le certificat HTTPS est généré automatiquement après propagation (de quelques minutes à 24 h).

Enfin, mettez `NEXT_PUBLIC_SITE_URL` à jour avec le domaine définitif.

---

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run build:pages` | Build de la vitrine statique GitHub Pages (dossier `out/`, sous-dossier `/alohash/`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run db:setup` | Installe le schéma (`db/schema.sql`) sur la base `DATABASE_URL` ; `-- --seed` ajoute les recettes et produits de démo |
| `npm run db:seed-sql` | Régénère `db/seed.sql` depuis `src/lib/demo/` (produits et recettes) |

## Structure

```
src/
  app/(shop)/          site : accueil, recettes (?type= / ?pays= / ?q=), recette/, pays/, favoris,
                       boutique (?gamme= / ?q=), produit, panier, commande, pages légales
                       communaute-actions.ts : dépôt d'avis et inscription à la newsletter
  app/admin/           espace admin (login + (panel) protégé, upload/ = jetons d'envoi Vercel Blob)
  app/api/payments/    webhooks des prestataires de paiement
  components/          UI (recipe/, community/, nuage/ = thème, carte et carrousels, product/, shop/, admin/)
  lib/data/            accès aux données (recettes, catalogue, commandes, admin) — base Neon ou démo
  lib/countries.ts     pays (nom, « de … », position sur la carte)
  lib/recipe-utils.ts  types de plats, durées, quantités, recherche
  lib/db/              client SQL Neon, requêtes communes, conversion des lignes
  lib/payments/        couche PaymentProvider
  lib/email/           envoi SMTP + gabarits
  lib/compliance.ts    détection des allégations de santé
  proxy.ts             protection de /admin (cookie de session admin)
db/
  schema.sql           schéma SQL (recettes, avis, newsletter, catalogue, commandes), fonctions place_order / cancel_order
  seed.sql             recettes et produits de démo
```

### Sécurité

- Les prix et les stocks sont **toujours recalculés en base** (`place_order`, transaction avec verrouillage des lignes) : le navigateur n'envoie que des identifiants de variantes et des quantités.
- La base n'est jamais exposée au navigateur : toutes les requêtes passent par le serveur (`DATABASE_URL` est un secret serveur), et les écritures admin exigent la session admin.
- La page de confirmation n'est accessible qu'avec le numéro de commande **et** un jeton aléatoire.
- Les producteurs de démo sont **fictifs**, et les photos (`public/recipes/*.webp`, `public/products/*.webp`) sont **générées par IA** : remplacez-les par les vrais produits et de vraies photos avant l'ouverture.
