/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import { anton } from "@/components/nuage/typography";
import { imageCarree, type Actu } from "@/lib/veille";
import type { LienCarte as Lien } from "@/lib/veille-articles";
import { CreditImage } from "./CreditImage";
import { LienCarte } from "./LienCarte";
import { LienSource } from "./LienSource";
import { CARTE_CLIQUABLE } from "./styles";

/**
 * Actu en vignette : image carrée (la carte générée est recadrée), puis le texte en plus compact.
 * Toute la carte ouvre l'article du site (ou la source s'il n'y a pas encore d'article), voir LienCarte.
 * Sur grand écran, dans une colonne étroite (moins de 24 rem) : image et titre plus petits, sans résumé.
 */
export function ActuVignette({ actu, lien, Titre = "h3" }: { actu: Actu; lien: Lien; Titre?: "h2" | "h3" }) {
  return (
    <article className={`${CARTE_CLIQUABLE} @container flex w-full min-w-0 gap-4 rounded-[22px] border border-[#fbeee2]/12 bg-[#211209] p-3 sm:p-4`}>
      <img
        src={imageCarree(actu.image)}
        alt={actu.image.alt}
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
        className="aspect-square w-24 shrink-0 self-start rounded-2xl bg-[#281610] object-cover sm:w-28 lg:@max-sm:w-[76px]"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Titre className="text-[20px] leading-[1.05] break-words uppercase lg:@max-sm:text-[17px]" style={anton}>
          <LienCarte lien={lien}>{actu.titre}</LienCarte>
        </Titre>
        <p className="line-clamp-3 text-[13.5px] leading-snug text-[#fbeee2]/65 lg:line-clamp-2 lg:@max-sm:hidden">{actu.resume}</p>
        <div className="mt-auto space-y-1.5">
          <LienSource actu={actu} versSource={!lien.interne} />
          <CreditImage image={actu.image} className="relative z-10" />
        </div>
      </div>
    </article>
  );
}
