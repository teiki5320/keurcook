import type { NextConfig } from "next";

/**
 * Deux modes de build :
 *  - par défaut : application complète (Vercel + base Neon + Vercel Blob) ;
 *  - STATIC_EXPORT=1 : vitrine statique pour GitHub Pages (dossier out/),
 *    servie sous NEXT_PUBLIC_BASE_PATH (ex. /alohash). Voir scripts/build-pages.mjs.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/**
 * Politique de sécurité du contenu : scripts et styles du site uniquement (Next.js
 * a besoin de scripts en ligne), images du site et de Vercel Blob, envoi de photos
 * depuis l'admin vers Vercel Blob, pas d'inclusion dans un cadre tiers.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  // data: et blob: : textures du nuage de particules chargées par fetch (Three.js).
  "connect-src 'self' data: blob: https://vercel.com https://*.vercel-storage.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: basePath || undefined,
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_STATIC_EXPORT: "1", NEXT_PUBLIC_BASE_PATH: basePath },
      turbopack: {
        resolveAlias: {
          // Pas de Server Actions en statique : avis et newsletter sont remplacés par un message.
          "@/components/community/ReviewForm": "./src/components/community/StaticReviewForm.tsx",
          "@/components/community/NewsletterForm": "./src/components/community/StaticNewsletterForm.tsx",
        },
      },
    }
  : {
      poweredByHeader: false,
      // Articles « Conseils » lus sur le disque à chaque revalidation : à embarquer dans les fonctions serveur.
      outputFileTracingIncludes: { "/**": ["./content/conseils/**/*"] },
      images: {
        // Photos envoyées depuis l'admin (Vercel Blob).
        remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
      },
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
      async redirects() {
        // Les anciennes CGV sont remplacées par les conditions d'utilisation.
        return [{ source: "/cgv", destination: "/conditions", permanent: true }];
      },
    };

export default nextConfig;
