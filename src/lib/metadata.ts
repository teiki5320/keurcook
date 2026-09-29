import type { Metadata } from "next";
import { siteConfig } from "./config";

/** Image de partage par défaut (logo Keur Cook), pour les pages sans photo propre. */
export const DEFAULT_SHARE_IMAGE = { url: "/brand/keurcook-partage.jpg", width: 1200, height: 630, alt: "Keur Cook, la cuisine de demain" };

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
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = image ? [{ url: image, alt: imageAlt ?? title }] : [DEFAULT_SHARE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
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
