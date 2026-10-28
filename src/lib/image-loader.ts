/**
 * Adresse d'une photo à la bonne largeur (srcset), pour next/image et les balises <img> du site.
 * Les photos de public/recipes, public/products et public/conseils existent en 384, 640, 960 et 1280 px
 * (scripts/images-responsives.mjs) ; au-delà, ou pour toute autre image, l'original est servi.
 */
export const IMG_WIDTHS = [384, 640, 960, 1280] as const;

const RESPONSIVE = /^\/(recipes|products|conseils)\/[^/]+\.webp$/;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  if (!RESPONSIVE.test(src)) return src;
  const w = IMG_WIDTHS.find((x) => x >= width);
  return w ? `/img/${w}${src}` : src;
}

/** srcset complet d'une photo du site (balises <img> écrites à la main), ou undefined si elle n'a pas de versions réduites. */
export function photoSrcSet(src: string | null | undefined): string | undefined {
  if (!src || !RESPONSIVE.test(src)) return undefined;
  return [...IMG_WIDTHS.map((w) => `/img/${w}${src} ${w}w`), `${src} 1800w`].join(", ");
}
