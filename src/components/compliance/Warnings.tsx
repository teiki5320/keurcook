import { AlertTriangle } from "lucide-react";

/** Avertissements d'usage, réutilisés sur les fiches produit et dans le pied de page. */
export const USAGE_WARNINGS = [
  "Vente interdite aux mineurs (moins de 18 ans).",
  "Taux de THC inférieur ou égal à 0,3 %, conformément à la réglementation française.",
  "Ces produits ne sont pas des médicaments et ne peuvent se substituer à un traitement.",
  "Déconseillé aux femmes enceintes ou allaitantes.",
  "Ne pas conduire ni utiliser de machine après consommation : un dépistage salivaire de stupéfiants peut s'avérer positif, même avec un produit conforme.",
  "Fumer nuit gravement à la santé. La combustion est déconseillée.",
  "Tenir hors de portée des enfants et des animaux.",
];

export function UsageWarnings({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-amber-soft bg-amber-soft/40 p-4 text-sm text-ink/85">
      <p className="mb-2 flex items-center gap-2 font-semibold text-terracotta-dark">
        <AlertTriangle className="h-4 w-4" aria-hidden /> Avertissements
      </p>
      <ul className={compact ? "space-y-1" : "list-disc space-y-1 pl-5"}>
        {(compact ? USAGE_WARNINGS.slice(0, 4) : USAGE_WARNINGS).map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}
