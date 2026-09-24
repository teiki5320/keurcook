import type { NextConfig } from "next";

/**
 * Deux modes de build :
 *  - par défaut : application complète (Vercel + base Neon + Vercel Blob) ;
 *  - STATIC_EXPORT=1 : vitrine statique pour GitHub Pages (dossier out/),
 *    servie sous NEXT_PUBLIC_BASE_PATH (ex. /alohash). Voir scripts/build-pages.mjs.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const securityHeaders = [
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
          // Pas de Server Actions en statique : le formulaire de commande est remplacé par un avis.
          "@/components/shop/CheckoutForm": "./src/components/shop/StaticCheckoutNotice.tsx",
        },
      },
    }
  : {
      poweredByHeader: false,
      images: {
        // Photos envoyées depuis l'admin (Vercel Blob).
        remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
      },
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
    };

export default nextConfig;
