import type { NextConfig } from "next";

/**
 * Site 100 % statique (dossier out/), publié sur Cloudflare Pages par
 * .github/workflows/deploy.yml. Les en-têtes de sécurité et les redirections
 * sont servis par Cloudflare : voir public/_headers et public/_redirects.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Photos servies en plusieurs largeurs, créées au build (scripts/images-responsives.mjs, src/lib/image-loader.ts).
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts", deviceSizes: [640, 960, 1280, 1800], imageSizes: [384] },
  poweredByHeader: false,
};

export default nextConfig;
