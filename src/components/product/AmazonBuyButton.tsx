import { amazonUrl } from "@/lib/amazon";
import { formatPrice } from "@/lib/format";

/** Bouton « Acheter · prix » : ouvre la fiche Amazon.fr (lien partenaire) dans un nouvel onglet. */
export function AmazonBuyButton({ asin, priceCents, name, className = "btn-primary" }: { asin: string; priceCents: number; name: string; className?: string }) {
  return (
    <a
      href={amazonUrl(asin)}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={`Acheter ${name} sur Amazon, ${formatPrice(priceCents)} (nouvel onglet)`}
      className={className}
    >
      Acheter · {formatPrice(priceCents)}
    </a>
  );
}
