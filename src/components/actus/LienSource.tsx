import { ageActu, type Actu } from "@/lib/veille";

/** « Source : RFI ↗ · il y a 3 h » : lien vers l'article d'origine, toujours visible. */
export function LienSource({ actu }: { actu: Actu }) {
  const age = ageActu(actu.publie_le);
  return (
    <p className="text-[13px]">
      <a href={actu.source_url} target="_blank" rel="noopener nofollow" className="font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
        Source : {actu.source_nom} <span aria-hidden>↗</span>
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
      {age && (
        <time dateTime={actu.publie_le} className="text-[#fbeee2]/55">
          {" "}
          · {age}
        </time>
      )}
    </p>
  );
}
