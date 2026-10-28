import { ageActu, type Actu } from "@/lib/veille";

/**
 * « Source : RFI · il y a 3 h » : le nom de la source, toujours visible sur la carte.
 * En texte quand la carte ouvre l'article du site (le lien vers la source est dans l'article) ;
 * avec « ↗ » quand la carte ouvre directement la source (actu sans article).
 */
export function LienSource({ actu, versSource = false }: { actu: Actu; versSource?: boolean }) {
  const age = ageActu(actu.publie_le);
  return (
    <p className="text-[13px]">
      <span className="font-bold text-[#ff7a3d]">
        Source : {actu.source_nom}
        {versSource && <span aria-hidden> ↗</span>}
      </span>
      {age && (
        <time dateTime={actu.publie_le} className="text-[#fbeee2]/55">
          {" "}
          · {age}
        </time>
      )}
    </p>
  );
}
