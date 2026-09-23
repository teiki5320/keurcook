# Alohash — boutique de CBD français

Site e-commerce en français pour vendre du CBD français (fleurs, résines, huiles, infusions, cosmétiques) et des accessoires (grinders, vaporisateurs, feuilles, boîtes de conservation).

**Stack** : Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase (base de données, authentification admin, stockage des images et certificats) · Nodemailer (SMTP).

---

## Fonctionnalités

| Côté boutique | Côté admin (`/admin`) |
| --- | --- |
| Accueil, catégories, fiche produit | Connexion Supabase Auth, accès réservé aux comptes de la table `admins` |
| Filtres (univers, catégorie, région, prix, taux de CBD, stock) + tri | Produits : création / édition, variantes, photos, certificat PDF, mise en avant |
| Recherche plein texte (insensible aux accents) | Stocks : édition en masse, filtre « stock bas » |
| Panier (stockage local), commande, page de confirmation | Commandes : filtres par statut, détail, changement de statut, n° de suivi, email au client |
| Paiement par virement via une couche `PaymentProvider` | Annulation → remise en stock automatique |
| Emails de confirmation (client + notification admin) | Tableau de bord (à encaisser, à expédier, stocks bas) |

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

Ouvrez http://localhost:3000. **Sans configuration Supabase, le site tourne en mode démo** : les 16 produits de démonstration (10 CBD + 6 accessoires) sont chargés depuis `src/lib/demo/catalog.ts`, les commandes et les stocks sont gardés en mémoire (perdus au redémarrage) et les emails sont affichés dans la console. L'admin n'est pas disponible dans ce mode.

---

## Installation complète avec Supabase

### 1. Créer le projet

1. Créez un projet sur [supabase.com](https://supabase.com) (région **UE**, ex. Paris `eu-west-3` ou Francfort, pour le RGPD).
2. Dans **SQL Editor**, exécutez dans l'ordre :
   - `supabase/migrations/0001_schema.sql` — tables, RLS, fonctions `place_order` / `cancel_order`, buckets de stockage ;
   - `supabase/seed.sql` — les données de démo (facultatif).

   Avec la CLI Supabase : `supabase link --project-ref <ref>` puis `supabase db push` et `psql … -f supabase/seed.sql`.

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Renseignez au minimum `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API).

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, liens des emails) |
| `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` | Nom de la boutique, email de contact |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Accès public Supabase (catalogue, auth admin) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret serveur** : création des commandes, lecture de la page de confirmation |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM` | Envoi des emails |
| `ADMIN_NOTIFICATION_EMAIL` | Reçoit chaque nouvelle commande |
| `PAYMENT_PROVIDERS` | Moyens de paiement actifs (`bank_transfer` par défaut) |
| `PAYMENT_BANK_*` | Coordonnées bancaires affichées au client |
| `SHIPPING_FLAT_RATE_CENTS`, `SHIPPING_FREE_THRESHOLD_CENTS` | Frais de port et seuil de gratuité |
| `NEXT_PUBLIC_LEGAL_*` | Informations des mentions légales et CGV |

### 3. Créer un administrateur

1. **Authentication → Users → Add user** : créez un compte email + mot de passe (cochez *Auto confirm*).
2. Dans le SQL Editor :

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'vous@votre-domaine.fr';
   ```

3. Connectez-vous sur `/admin/login`.

Désactivez les inscriptions publiques (**Authentication → Sign In / Providers → Allow new users to sign up** : off) : seul l'admin a besoin d'un compte.

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

### Vercel (recommandé)

1. Poussez le dépôt sur GitHub, puis **Add New → Project** sur [vercel.com](https://vercel.com) et importez-le (framework détecté automatiquement).
2. Ajoutez toutes les variables de `.env.example` dans **Settings → Environment Variables** (avec `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr`).
3. Déployez.

### Netlify

1. **Add new site → Import an existing project**, choisissez le dépôt. `netlify.toml` est fourni (le runtime Next.js est installé automatiquement).
2. Ajoutez les variables d'environnement (**Site configuration → Environment variables**), dont `NEXT_PUBLIC_LEGAL_HOST` avec les coordonnées de Netlify.
3. Déployez.

> Vérifiez les conditions d'utilisation de l'hébergeur concernant les produits à base de CBD avant la mise en ligne.

### Nom de domaine IONOS

Dans Vercel (**Settings → Domains**) ou Netlify (**Domain management**), ajoutez `votre-domaine.fr` et `www.votre-domaine.fr`, puis dans IONOS (**Domaines & SSL → votre domaine → DNS**) :

| Type | Nom d'hôte | Valeur Vercel | Valeur Netlify |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | `75.2.60.5` |
| CNAME | `www` | `cname.vercel-dns.com` | `<votre-site>.netlify.app` |

Supprimez au préalable les enregistrements A / AAAA / CNAME par défaut d'IONOS sur `@` et `www` (conservez les MX si vous utilisez la messagerie IONOS). Les valeurs exactes sont affichées par l'hébergeur lors de l'ajout du domaine : elles font foi. Le certificat HTTPS est généré automatiquement après propagation (de quelques minutes à 24 h).

Enfin, mettez `NEXT_PUBLIC_SITE_URL` à jour avec le domaine définitif et, dans Supabase, **Authentication → URL Configuration → Site URL**.

---

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run demo:assets` | Régénère les visuels SVG et certificats PDF de démo (`public/demo`, `public/coa`) |
| `npm run db:seed-sql` | Régénère `supabase/seed.sql` depuis `src/lib/demo/catalog.ts` |

## Structure

```
src/
  app/(shop)/          boutique : accueil, boutique, catégorie, produit, panier, commande, pages légales
  app/admin/           espace admin (login + (panel) protégé)
  app/api/payments/    webhooks des prestataires de paiement
  components/          UI (compliance/, layout/, product/, shop/, admin/)
  lib/data/            accès aux données (catalogue, commandes, admin) — Supabase ou démo
  lib/payments/        couche PaymentProvider
  lib/email/           envoi SMTP + gabarits
  lib/compliance.ts    détection des allégations de santé
  proxy.ts             protection de /admin (session Supabase)
supabase/
  migrations/          schéma SQL, RLS, fonctions
  seed.sql             données de démo
```

### Sécurité

- Les prix et les stocks sont **toujours recalculés en base** (`place_order`, transaction avec verrouillage des lignes) : le navigateur n'envoie que des identifiants de variantes et des quantités.
- RLS activée sur toutes les tables : catalogue public en lecture, commandes invisibles hors admin ; écriture réservée à `is_admin()`.
- La page de confirmation n'est accessible qu'avec le numéro de commande **et** un jeton aléatoire.
- Les producteurs, certificats et visuels de démo sont **fictifs** : remplacez-les avant la mise en production.
