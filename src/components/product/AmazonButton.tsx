import { ExternalLink } from "lucide-react";
import { amazonUrl } from "@/lib/amazon";

/**
 * Bouton « Voir sur Amazon » : ouvre la fiche Amazon.fr (lien partenaire) dans un nouvel onglet.
 * Aucun prix affiché : seul celui d'Amazon fait foi, et le site ne vend rien (même libellé que les autres sites Keur).
 */
export function AmazonButton({
  asin,
  name,
  icon = false,
  className = "btn-primary",
}: {
  asin: string;
  name: string;
  /** Version compacte (recettes) : icône seule, libellé dans l'infobulle. */
  icon?: boolean;
  className?: string;
}) {
  return (
    <a
      href={amazonUrl(asin)}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={`Voir sur Amazon : ${name}, lien partenaire (nouvel onglet)`}
      title={icon ? "Voir sur Amazon" : undefined}
      className={className}
    >
      {icon ? (
        <ExternalLink className="h-4 w-4" aria-hidden />
      ) : (
        <>
          Voir sur Amazon <ExternalLink className="h-4 w-4" aria-hidden />
        </>
      )}
    </a>
  );
}
