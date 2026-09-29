import type { Metadata } from "next";
import { siteConfig } from "./config";

/** Image de partage par défaut (logo Keur Cook), pour les pages sans photo propre. */
export const DEFAULT_SHARE_IMAGE = { url: "/brand/keurcook-partage.jpg", width: 1200, height: 630, alt: "Keur Cook, la cuisine de demain" };

/**
 * Photo du site → version JPEG 1200 × 630 créée au build par scripts/og-images.mjs
 * (/recipes/x.webp → /og/recipes/x.jpg), mieux affichée par les réseaux que le WebP.
 */
function shareImage(image: string, alt: string) {
  const m = image.match(/^\/(recipes|products|conseils)\/([^/]+)\.webp$/);
  return m ? { url: `/og/${m[1]}/${m[2]}.jpg`, width: 1200, height: 630, alt } : { url: image, alt };
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
  // Titre complet limité à ~65 caractères (au-delà, Google le coupe) : sans le suffixe s'il est trop long.
  const suffixed = `${title} | ${siteConfig.name}`;
  const absolute = absoluteTitle || suffixed.length > 65;
  const fullTitle = absolute ? title : suffixed;
  const images = image ? [shareImage(image, imageAlt ?? title)] : [DEFAULT_SHARE_IMAGE];
  return {
    title: absolute ? { absolute: title } : title,
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
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
