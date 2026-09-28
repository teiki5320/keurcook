/** Programme Partenaires Amazon : liens d'achat vers Amazon.fr avec l'identifiant du site. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "kultiva-21";

/** Lien vers la fiche Amazon.fr d'un produit (ASIN), avec le tag partenaire. */
export function amazonUrl(asin: string): string {
  return `https://www.amazon.fr/dp/${encodeURIComponent(asin)}?tag=${AMAZON_TAG}`;
}

/** Mention obligatoire du programme Partenaires Amazon. */
export const AMAZON_DISCLOSURE =
  "En tant que Partenaire Amazon, Alohash réalise un bénéfice sur les achats remplissant les conditions requises.";

/** Date du dernier relevé des prix Amazon affichés à titre indicatif sur le site. */
export const AMAZON_PRICES_CHECKED_ON = "27 septembre 2026";
