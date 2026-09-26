import { ShoppingBasket } from "lucide-react";
import { amazonUrl } from "@/lib/amazon";
import { formatPrice } from "@/lib/format";

/** Bouton « Acheter · prix » : ouvre la fiche Amazon.fr (lien partenaire) dans un nouvel onglet. */
export function AmazonBuyButton({
  asin,
  priceCents,
  name,
  icon = false,
  className = "btn-primary",
}: {
  asin: string;
  priceCents: number;
  name: string;
  /** Version compacte (recettes) : icône panier seule, prix dans l'infobulle. */
  icon?: boolean;
  className?: string;
}) {
  return (
    <a
      href={amazonUrl(asin)}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={`Acheter ${name} sur Amazon, ${formatPrice(priceCents)} (nouvel onglet)`}
      title={icon ? `Acheter · ${formatPrice(priceCents)}` : undefined}
      className={className}
    >
      {icon ? (
        <ShoppingBasket className="h-4 w-4" aria-hidden />
      ) : (
        <>Acheter · {formatPrice(priceCents)}</>
      )}
    </a>
  );
}
