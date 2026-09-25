# PUBLICATION — état de la mise en ligne

> Généré le 25 septembre 2026. Aucun secret ici.

## Vue d'ensemble

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — boutique complète | Oui, en préouverture : mode maintenance activable depuis l'admin, produits de démo, paiement par virement | https://www.alohash.fr (aussi https://alohash.vercel.app) | Vercel (plan Hobby), base Neon, fichiers Vercel Blob |
| Web — vitrine statique | Oui (démo, commande désactivée) | https://teiki5320.github.io/alohash/ | GitHub Pages |

Les deux versions sont republiées automatiquement à chaque push sur `main`.

## Domaine & SSL

- **Domaine** : `www.alohash.fr` (adresse principale), relié au projet Vercel le 25 septembre 2026 ; `alohash.fr` redirige vers `www.alohash.fr` (redirection 308).
- **DNS** : chez IONOS. Enregistrement A de `alohash.fr` et CNAME de `www` vers Vercel ; enregistrements de messagerie IONOS (MX, SPF, DKIM, DMARC) conservés.
- **SSL** : certificat HTTPS généré automatiquement par Vercel.
- `alohash.vercel.app` reste accessible en parallèle (redirection vers le domaine possible plus tard).

## Visibilité

- **Référencement** : sitemap (`/sitemap.xml`), robots.txt (admin, panier et commande exclus), métadonnées Open Graph et données JSON-LD présents dans le code.
  - `NEXT_PUBLIC_SITE_URL` vaut `https://www.alohash.fr` sur Vercel : sitemap, robots.txt et liens canoniques utilisent le domaine.
  - Inscription à Google Search Console : à vérifier dans la console.
- **Analytics** : aucun outil installé. Le consentement « mesure d'audience » est recueilli par la bannière cookies, mais aucun script n'y est branché.
- **Accès** : `www.alohash.fr` et `alohash.vercel.app` sont publiques ; pendant la maintenance, les visiteurs voient l'écran « Maintenance ».

## Ce qui reste, dans l'ordre

1. Remplacer le stockage Blob « Private » par un stockage « Public », puis tester l'envoi d'une photo depuis l'admin.
2. Passer une commande de test de bout en bout, puis l'annuler pour vérifier la remise en stock.
3. Vérifier que le plan Vercel convient à un usage commercial (Hobby réservé au non commercial).
4. Configurer le SMTP (`SMTP_*`, `EMAIL_FROM`) pour les e-mails de commande.
5. Renseigner les coordonnées bancaires (`PAYMENT_BANK_*`).
6. Remplacer les produits de démo par les vrais produits, photos et certificats d'analyse.
7. Désactiver le mode maintenance pour ouvrir la boutique.
8. Déclarer le site dans Google Search Console et choisir un outil de mesure d'audience.
9. Brancher un prestataire de paiement par carte acceptant le CBD.
