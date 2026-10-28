import type { Metadata } from "next";
import { siteConfig } from "./config";

/** Image de partage par défaut (logo Keur Cook), pour les pages sans photo propre. */
export const DEFAULT_SHARE_IMAGE = { url: "/brand/keurcook-partage.jpg", width: 1200, height: 630, alt: "Keur Cook, la cuisine de demain" };

/**
 * Photo du site → version JPEG 1200 × 630 créée au build par scripts/og-images.mjs
 * (/recipes/x.webp → /og/recipes/x.jpg), mieux affichée par les réseaux que le WebP.
 * Les images des onglets Top 10 (/top10/x.jpg, scripts/images-top10.ts) sont déjà au bon format.
 */
function shareImage(image: string, alt: string) {
  if (/^\/top10\/[^/]+\.jpg$/.test(image)) return { url: image, width: 1200, height: 630, alt };
  const m = image.match(/^\/(recipes|products|conseils)\/([^/]+)\.webp$/);
  return m ? { url: `/og/${m[1]}/${m[2]}.jpg`, width: 1200, height: 630, alt } : { url: image, alt };
}

/** Longueur maximale d'un titre de page (au-delà, Google le coupe). */
export const TITRE_MAX = 60;

/**
 * Coupe un texte trop long en fin de mot, avec « … » (filet de sécurité : les titres trop longs
 * ont normalement un seoTitle court écrit à la main). Modèle : keurkado/src/lib/metadata.ts.
 */
export function couperTexte(texte: string, max: number): string {
  if (texte.length <= max) return texte;
  const coupe = texte.slice(0, max - 1);
  const espace = coupe.lastIndexOf(" ");
  return `${(espace > max / 2 ? coupe.slice(0, espace) : coupe).replace(/[\s,;:.!?«»–—-]+$/, "")}…`;
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Chemin de la page (« /recettes »), utilisé pour l'adresse canonique et le partage. */
  path: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
  /** Titre utilisé tel quel, sans le suffixe « | Keur Cook » (accueil). */
  absoluteTitle?: boolean;
}

/**
 * Métadonnées d'une page : titre, description, adresse canonique et aperçu de partage
 * (WhatsApp, Facebook…) propres à la page. Next.js remplace entièrement le bloc openGraph
 * du layout dès qu'une page en définit un : on le reconstruit donc au complet ici.
 */
export function pageMetadata({ title, description, path, image, imageAlt, type = "website", publishedTime, noindex, absoluteTitle }: PageMetadataInput): Metadata {
  // Titre complet limité à 60 caractères (au-delà, Google le coupe) : sans le suffixe s'il est trop long.
  const suffixed = `${title} | ${siteConfig.name}`;
  const absolute = absoluteTitle || suffixed.length > TITRE_MAX;
  const fullTitle = absolute ? couperTexte(title, TITRE_MAX) : suffixed;
  const images = image ? [shareImage(image, imageAlt ?? title)] : [DEFAULT_SHARE_IMAGE];
  return {
    title: absolute ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    // Remplace celui du gabarit commun : on garde « max-image-preview:large ».
    ...(noindex ? { robots: { index: false, follow: true, "max-image-preview": "large" } } : {}),
  };
}
