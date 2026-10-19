import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { RichText as RichTextValue } from "@/lib/selections/types";

/** Données d'un produit de sélection transmises au navigateur (filtres, tri, comparaison). */
export interface SelectionCard {
  rank: number;
  slug: string;
  name: string;
  image: string | null;
  amazon: string;
  geste: string;
  gesteLabel: string;
  pourquoi: string;
  onAime: string[];
  aSavoir: string[];
  idealPour: string;
  matiere: string;
  taille: string | null;
  entretien: string;
  recettes: Array<{ slug: string; name: string }>;
}

/** Texte avec liens internes. */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link key={i} href={part.href} className="font-semibold text-[#ffc46b] underline underline-offset-2 hover:text-[#ff7a3d]">
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}

/** Bouton vers la fiche Amazon, toujours suivi de la mention « Lien partenaire ». */
export function AmazonLink({ href, name, className = "", compact = false }: { href: string; name: string; className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={`Voir ${name} sur Amazon, lien partenaire (nouvel onglet)`}
        className={compact ? "inline-flex items-center gap-1 text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]" : "btn-primary px-6"}
      >
        Voir sur Amazon <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
      <span className="text-xs text-muted">Lien partenaire</span>
    </span>
  );
}
