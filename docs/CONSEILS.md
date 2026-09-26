# Rubrique « Conseils »

Un article = un fichier Markdown dans `content/conseils/<slug>.md` (le nom du fichier donne l'adresse `/conseils/<slug>`).

## En-tête

```
---
title: La question posée, terminée par « ? »
description: 70 à 170 caractères, pour Google.
date: 2026-09-28            # un lundi ; l'article paraît ce jour-là (heure de Paris)
theme: epicerie             # epicerie, cereales, remplacer, sauces, epices, boissons, decouvrir
resume: Réponse courte, affichée en chapeau.
recettes: ndole, mafe       # slugs de recettes liées (facultatif)
produits: fonio             # slugs de produits liés (facultatif)
image: /conseils/<slug>.webp  # à ajouter quand la photo existe (public/conseils/)
imageAlt: Description de la photo.
imagePrompt: Consigne de génération de la photo (OpenArt, Seedream 4.5, 2K, 16:9).
---
```

Le corps est en Markdown ; chaque partie commence par `## Titre` (sommaire automatique dès deux parties). Liens internes : `[texte](/recette/ndole)`, `/produit/…`, `/conseils/…`.

## Publication programmée

- Seuls les articles dont la date est passée apparaissent (liste, page, sitemap).
- Vercel : pages relues toutes les heures (ISR), aucun redéploiement nécessaire.
- GitHub Pages : reconstruction automatique chaque lundi (`.github/workflows/pages.yml`, déclencheur `schedule`).

## Vérifications

`npm test` contrôle l'en-tête de chaque article, l'absence d'allégation de santé, et que chaque lien interne existe à la date de publication de l'article.
