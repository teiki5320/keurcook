import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { siteConfig } from "@/lib/config";
import { DEFAULT_SHARE_IMAGE } from "@/lib/metadata";
import "./globals.css";
import "./nuage.css";

// Polices du thème « Braise », servies par le site (next/font, aucune requête vers Google Fonts), 2 fichiers en tout :
// - titres : Anton, une seule graisse (400) ;
// - texte : Manrope en police variable, un seul fichier (environ 24 Ko) pour toutes les graisses utilisées
//   (normal, medium, semibold, bold) : plus léger que deux fichiers à graisse fixe.
// Inter et Fraunces (ancien thème clair) ont été retirées le 28 octobre 2026 : le thème Braise les remplaçait partout.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Grande image autorisée dans Google Discover et les résultats (« max-image-preview:large »).
  robots: { "max-image-preview": "large" },
  // Revendication du site sur les comptes Pinterest et AdSense de Keur Cook.
  other: { "p:domain_verify": "8622238bb1aaaf67660719f4e4c1273a", "google-adsense-account": ADSENSE_CLIENT },
};

export const viewport: Viewport = {
  themeColor: "#140a07",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* AdSense : annonces et message de consentement de Google (Confidentialité et messages). */}
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-white focus:p-2">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
