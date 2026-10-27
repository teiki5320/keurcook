/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import { anton } from "@/components/nuage/typography";
import type { Actu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienSource } from "./LienSource";

/**
 * Actu à la une : image 16:9, titre, résumé, source et crédit.
 * « horizontal » : image à gauche du texte sur grand écran (page /actus).
 * « colonne » : à côté des vignettes sur grand écran ; l'image remplit la hauteur laissée par le texte,
 * pour que le bandeau finisse pile à la hauteur de la colonne de vignettes.
 */
export function ActuBandeau({ actu, prioritaire = false, Titre = "h3", colonne = false, horizontal = false }: { actu: Actu; prioritaire?: boolean; Titre?: "h2" | "h3"; colonne?: boolean; horizontal?: boolean }) {
  const image = (
    <img
      src={actu.image.url}
      alt={actu.image.alt}
      width={actu.image.largeur}
      height={actu.image.hauteur}
      loading={prioritaire ? "eager" : "lazy"}
      decoding="async"
      className={`aspect-video w-full bg-[#281610] object-cover ${horizontal ? "lg:w-[58%] lg:shrink-0 lg:self-start" : ""} ${colonne ? "lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" : ""}`}
    />
  );
  return (
    <article className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#fbeee2]/12 bg-[#211209] ${horizontal ? "lg:flex-row" : ""}`}>
      {colonne ? <div className="relative lg:min-h-[190px] lg:flex-1">{image}</div> : image}
      <div className={`flex flex-col gap-2 p-5 sm:p-6 ${colonne ? "lg:flex-none" : "flex-1"}`}>
        <Titre className={`text-[26px] leading-[1.02] break-words uppercase sm:text-[32px] ${colonne ? "lg:line-clamp-3 lg:text-[30px]" : ""}`} style={anton}>
          {actu.titre}
        </Titre>
        <p className={`text-[15px] leading-relaxed text-[#fbeee2]/75 ${colonne ? "lg:line-clamp-3" : ""}`}>{actu.resume}</p>
        <div className="mt-auto pt-1">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-1" />
        </div>
      </div>
    </article>
  );
}
