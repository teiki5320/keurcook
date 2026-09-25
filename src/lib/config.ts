/**
 * Configuration générale de la boutique.
 * Les valeurs sensibles ou propres à l'entreprise se règlent via les
 * variables d'environnement (voir .env.example).
 */
import { isStaticExport } from "./paths";

/** Hébergeur par défaut : GitHub Pages pour la démo statique, Vercel sinon. */
const defaultHost = isStaticExport
  ? { name: "GitHub Pages", full: "GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis — pages.github.com" }
  : { name: "Vercel", full: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com" };
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Alohash",
  tagline: "Recettes africaines & produits rares",
  description:
    "Recettes de plats africains expliquées pas à pas (ndolé, mafé, thiéboudienne, poulet yassa…) et épicerie en ligne de produits africains rares : épices, céréales anciennes, feuilles séchées, poissons fumés.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "fr_FR",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@alohash.fr",
};

/** Informations légales de l'éditeur (annuaire-entreprises.data.gouv.fr), affichées dans les mentions légales / CGV. */
export const legalConfig = {
  companyName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME || "ALOHASH",
  legalForm: process.env.NEXT_PUBLIC_LEGAL_FORM || "SAS (société par actions simplifiée) au capital de 200 €",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "587 La Petite Sigonnière, 85190 Maché, France",
  siret: process.env.NEXT_PUBLIC_LEGAL_SIRET || "938 522 596 00015",
  rcs: process.env.NEXT_PUBLIC_LEGAL_RCS || "RCS La Roche-sur-Yon 938 522 596",
  vat: process.env.NEXT_PUBLIC_LEGAL_VAT || "FR16 938 522 596",
  director: process.env.NEXT_PUBLIC_LEGAL_DIRECTOR || "",
  phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || "",
  mediator: process.env.NEXT_PUBLIC_LEGAL_MEDIATOR || "CM2C (Centre de la Médiation de la Consommation de Conciliateurs de Justice), 49 rue de Ponthieu, 75008 Paris — saisine en ligne : https://www.cm2c.net/declarer-un-litige.php",
  host: process.env.NEXT_PUBLIC_LEGAL_HOST || defaultHost.full,
  hostName: process.env.NEXT_PUBLIC_LEGAL_HOST_NAME || defaultHost.name,
};

/** Règles de livraison (France métropolitaine). */
export const shippingConfig = {
  flatRateCents: Number(process.env.SHIPPING_FLAT_RATE_CENTS ?? 490),
  freeThresholdCents: Number(process.env.SHIPPING_FREE_THRESHOLD_CENTS ?? 5000),
  countries: [{ code: "FR", label: "France métropolitaine" }],
};

export function computeShipping(subtotalCents: number): number {
  if (subtotalCents <= 0) return 0;
  return subtotalCents >= shippingConfig.freeThresholdCents ? 0 : shippingConfig.flatRateCents;
}
