import { ExternalLink } from "lucide-react";
import { amazonUrl, LIGNE_PARTENAIRE, type EmplacementAmazon } from "@/lib/amazon";

/**
 * Bouton « Voir sur Amazon » : ouvre la fiche Amazon.fr (lien partenaire) dans un nouvel onglet.
 * Toujours avec son texte et au moins 44 px de haut (facile à toucher sur téléphone).
 * Aucun prix affiché : seul celui d'Amazon fait foi, et le site ne vend rien (même libellé que les autres sites Keur).
 */
export function AmazonButton({
  asin,
  name,
  emplacement,
  className = "btn-primary",
}: {
  asin: string;
  name: string;
  /** Type de page, pour le code de suivi (src/lib/amazon.ts). */
  emplacement: EmplacementAmazon;
  className?: string;
}) {
  return (
    <a
      href={amazonUrl(asin, emplacement)}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={`Voir sur Amazon : ${name}, lien partenaire (nouvel onglet)`}
      className={`min-h-11 ${className}`}
    >
      Voir sur Amazon <ExternalLink className="h-4 w-4" aria-hidden />
    </a>
  );
}

/** Ligne « Lien partenaire Amazon… », à placer juste sous un bouton « Voir sur Amazon ». */
export function LignePartenaire({ className = "" }: { className?: string }) {
  return <p className={`text-[11px] leading-snug text-muted ${className}`}>{LIGNE_PARTENAIRE}</p>;
}
