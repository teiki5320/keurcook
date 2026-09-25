# Alohash — boutique de CBD français

Site e-commerce en français pour vendre du CBD français (fleurs, résines, huiles, infusions, cosmétiques) et des accessoires (grinders, vaporisateurs, feuilles, boîtes de conservation).

**Stack** : Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Neon (base de données PostgreSQL) · Vercel Blob (images et certificats) · Nodemailer (SMTP).

---

## Voir le site en ligne

👉 **https://teiki5320.github.io/alohash/**

C'est une **vitrine de démonstration statique**, publiée automatiquement sur GitHub Pages à chaque push sur `main` (workflow `.github/workflows/pages.yml`). Boutique par gammes, tri, recherche, fiches produit, certificats PDF, panier, vérification d'âge et bannière cookies fonctionnent ; les produits sont ceux de démo. GitHub Pages n'ayant pas de serveur, **la commande en ligne, les emails et l'espace admin y sont désactivés** : ils fonctionnent sur la version complète (Vercel + Neon + Vercel Blob, voir « Installation complète »).

Pour reproduire le build de la vitrine en local : `npm run build:pages` (sortie dans `out/`, servie sous `/alohash/`).

---

## Fonctionnalités

| Côté boutique | Côté admin (`/admin`) |
| --- | --- |
| Accueil vitrine (gammes), boutique en une page : carrousel des gammes, produits de la gamme au centre, « Tout voir » | Connexion par mot de passe unique (`ADMIN_PASSWORD`), session par cookie signé valable 7 jours |
| Tri (mis en avant, prix, taux de CBD), badge « Coup de cœur », prix au gramme | Produits : création / édition, variantes, photos, certificat PDF, mise en avant |
| Recherche plein texte (insensible aux accents) | Stocks : édition en masse, filtre « stock bas » |
| Mini-panier latéral après ajout, panier (stockage local), commande, page de confirmation | Commandes : filtres par statut, détail, changement de statut, n° de suivi, email au client |
| Paiement par virement via une couche `PaymentProvider` | Annulation → remise en stock automatique |
| Emails de confirmation (client + notification admin) | Tableau de bord (à encaisser, à expédier, stocks bas) |
|  | Mode maintenance : un interrupteur met la boutique en pause (écran « Maintenance » avec la feuille animée, commandes suspendues) |

### Conformité France

- **Vérification d'âge 18+** à l'entrée du site (cookie 30 jours, sans clignotement) + attestation de majorité obligatoire à la commande.
- **THC ≤ 0,3 %** : affiché sur chaque produit, imposé par une contrainte SQL (`check thc_rate <= 0.3`) et par la validation admin.
- **Certificat d'analyse PDF** téléchargeable sur chaque fiche produit ; un produit CBD ne peut pas être publié sans certificat, taux de CBD/THC, région et producteur.
- **Aucune allégation de santé** : l'admin bloque l'enregistrement d'un texte contenant des termes à risque (« apaise », « sommeil », « stress », « soigne »… — voir `src/lib/compliance.ts`). Cette liste ne remplace pas une relecture humaine.
- Pages **mentions légales**, **CGV**, **politique de confidentialité**, **conformité & avertissements**.
- **Bannière cookies RGPD** (accepter / refuser / personnaliser, choix conservé 6 mois, réouvrable depuis le pied de page).
- Mention **« interdit aux mineurs »** dans le bandeau, le pied de page, les emails ; avertissements d'usage sur les fiches CBD.

> ⚠️ Les textes légaux sont des **modèles** : complétez les informations de l'entreprise (variables `NEXT_PUBLIC_LEGAL_*`) et faites-les valider par un juriste. Points de vigilance à étudier avec lui : statut *Novel Food* des produits ingérables (huiles, infusions), notification CPNP des cosmétiques, étiquetage.

---

## Démarrage rapide (mode démo)

Prérequis : Node.js ≥ 20.9.

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000. **Sans `DATABASE_URL`, le site tourne en mode démo** : les 16 produits de démonstration (10 CBD + 6 accessoires) sont chargés depuis `src/lib/demo/catalog.ts`, les commandes et les stocks sont gardés en mémoire (perdus au redémarrage) et les emails sont affichés dans la console. L'admin n'est pas disponible dans ce mode.

---

## Installation complète (Vercel + Neon + Vercel Blob)

### 1. Créer le projet Vercel, la base et le stockage

1. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt GitHub (framework détecté automatiquement). Chaque push sur `main` redéploie le site.
2. Dans le projet : **Storage → Create Database → Neon** (région **Francfort `eu-central-1`**, pour le RGPD), puis **Connect** au projet. La variable `DATABASE_URL` est ajoutée automatiquement.
3. Toujours dans **Storage** : **Create → Blob** en accès **Public** (les photos doivent être visibles de tous), puis **Connect**. Les variables `BLOB_STORE_ID` et `BLOB_WEBHOOK_PUBLIC_KEY` sont ajoutées automatiquement ; sur Vercel, l'accès au stockage se fait ensuite sans clé secrète (OIDC).
4. Installez le schéma de la base, au choix :
   - depuis Vercel : **Storage → la base Neon → Open in Neon → SQL Editor**, collez `db/schema.sql` puis (facultatif) `db/seed.sql` et exécutez ;
   - en local : `npx vercel link`, `npx vercel env pull .env.local`, puis `npm run db:setup` (schéma seul) ou `npm run db:setup -- --seed` (schéma + produits de démo).

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
| `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY` | Stockage Vercel Blob (photos et certificats), ajoutées par Vercel ; hors Vercel, utiliser `BLOB_READ_WRITE_TOKEN` |
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

Les opérations admin passent uniquement par le serveur : la base n'est jamais accessible depuis le navigateur. Les photos et certificats partent directement du navigateur vers Vercel Blob, avec une URL d'envoi présignée (10 minutes, un seul fichier) délivrée par `/admin/upload` à l'admin connecté. Changer `ADMIN_PASSWORD` déconnecte toutes les sessions.

### 4. Emails

N'importe quel serveur SMTP convient. Avec une boîte mail **IONOS** : `SMTP_HOST=smtp.ionos.fr`, `SMTP_PORT=587`, `SMTP_SECURE=false`, identifiants de la boîte, et `EMAIL_FROM` sur la même adresse. Pensez à configurer SPF / DKIM dans la zone DNS pour éviter les spams.

---

## Paiement : ajouter un prestataire

Le paiement passe par l'interface `PaymentProvider` (`src/lib/payments/types.ts`). Le seul prestataire actif est `BankTransferProvider` (virement / paiement à la commande) : la commande est créée « en attente de paiement », l'admin la passe en « Payée » à réception du virement.

Pour brancher un prestataire acceptant le CBD :

1. Copiez `src/lib/payments/providers/_template.ts` et implémentez `initiatePayment` (création de la session de paiement → `{ status: "redirect", redirectUrl }`) et `handleWebhook` (vérification de signature → `{ orderNumber, status: "paid" }`).
2. Ajoutez l'instance dans `src/lib/payments/registry.ts` et son id dans `PAYMENT_PROVIDERS`.
3. Déclarez chez le prestataire l'URL de notification `https://votre-domaine.fr/api/payments/<id>/webhook`.

Le tunnel de commande, la redirection et le passage automatique en « Payée » sont déjà gérés.

---

## Déploiement

### GitHub Pages (vitrine statique)

Automatique à chaque push sur `main`. Réglage unique : **Settings → Pages → Source : « GitHub Actions »**. Le script `scripts/build-pages.mjs` active `output: "export"` + `basePath`, met temporairement de côté les parties serveur (admin, API, confirmation de commande) et remplace le formulaire de commande par un avis.

### Vercel (boutique réelle)

Voir « Installation complète » ci-dessus. Pensez à `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr` dans les variables d'environnement.

> Vérifiez les conditions d'utilisation de l'hébergeur concernant les produits à base de CBD avant la mise en ligne.

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
| `npm run demo:assets` | Régénère les certificats PDF de démo (`public/coa`) |
| `npm run db:setup` | Installe le schéma (`db/schema.sql`) sur la base `DATABASE_URL` ; `-- --seed` ajoute les produits de démo |
| `npm run db:seed-sql` | Régénère `db/seed.sql` depuis `src/lib/demo/catalog.ts` |

## Structure

```
src/
  app/(shop)/          boutique : accueil, boutique (?gamme= / ?q=), produit, panier, commande, pages légales
                       (categorie/ et accessoires/ : redirections des anciennes adresses)
  app/admin/           espace admin (login + (panel) protégé, upload/ = jetons d'envoi Vercel Blob)
  app/api/payments/    webhooks des prestataires de paiement
  components/          UI (compliance/, layout/, nuage/ = thème et carrousels, product/, shop/, admin/)
  lib/data/            accès aux données (catalogue, commandes, admin) — base Neon ou démo
  lib/db/              client SQL Neon, requêtes communes, conversion des lignes
  lib/payments/        couche PaymentProvider
  lib/email/           envoi SMTP + gabarits
  lib/compliance.ts    détection des allégations de santé
  proxy.ts             protection de /admin (cookie de session admin)
db/
  schema.sql           schéma SQL, fonctions place_order / cancel_order
  seed.sql             données de démo
```

### Sécurité

- Les prix et les stocks sont **toujours recalculés en base** (`place_order`, transaction avec verrouillage des lignes) : le navigateur n'envoie que des identifiants de variantes et des quantités.
- La base n'est jamais exposée au navigateur : toutes les requêtes passent par le serveur (`DATABASE_URL` est un secret serveur), et les écritures admin exigent la session admin.
- La page de confirmation n'est accessible qu'avec le numéro de commande **et** un jeton aléatoire.
- Les producteurs et certificats de démo sont **fictifs**, et les photos produit (`public/products/*.webp`, une vue principale + un gros plan `-2` par produit) sont **générées par IA** : remplacez-les par les vrais produits et leurs photos avant la mise en production.
