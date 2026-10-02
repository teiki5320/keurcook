# Rubrique « Conseils »

Un article = un fichier Markdown dans `content/conseils/<slug>.md` (le nom du fichier donne l'adresse `/conseils/<slug>`).

## En-tête

```
---
title: La question posée, terminée par « ? »
description: 70 à 170 caractères, pour Google.
date: 2026-10-05            # un lundi, mercredi ou vendredi ; l'article paraît ce jour-là (heure de Paris)
theme: epicerie             # epicerie, cereales, remplacer, sauces, epices, boissons, decouvrir, cafe-the, ustensiles
resume: Réponse courte, affichée en chapeau.
recettes: ndole, mafe       # slugs de recettes liées (facultatif)
produits: fonio             # slugs de produits liés (facultatif)
image: /conseils/<slug>.webp  # à ajouter quand la photo existe (public/conseils/)
imageAlt: Description de la photo.
imagePrompt: Consigne de génération de la photo (OpenArt, Seedream 4.5, 2K, 16:9).
---
```

Le corps est en Markdown ; chaque partie commence par `## Titre` (sommaire automatique dès deux parties). Liens internes : `[texte](/recette/ndole)`, `/produit/…`, `/conseils/…`.

Calendrier des prochains articles : `docs/CONSEILS-CALENDRIER.md`.

## Publication programmée

- Seuls les articles dont la date est passée apparaissent (liste, page, sitemap).
- Le site est reconstruit et republié automatiquement chaque lundi, mercredi et vendredi à 0 h 15 en hiver, 1 h 15 en été (`.github/workflows/deploy.yml`, déclencheur `schedule`) : l'article du jour apparaît alors sur keurcook.com.

## Vérifications

`npm test` contrôle l'en-tête de chaque article, l'absence d'allégation de santé, et que chaque lien interne existe à la date de publication de l'article.
