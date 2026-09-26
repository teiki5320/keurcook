import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import type { Conseil } from "@/lib/conseils/article";
import { CONSEIL_THEMES } from "@/lib/conseils/themes";
import { withBasePath } from "@/lib/paths";
import { formatConseilDate } from "./format";

/** Carte d'article : photo (ou icône du thème), date de parution, question, description et « Lire l'article ». */
export function ConseilCard({ conseil, headingLevel = 2 }: { conseil: Conseil; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const theme = CONSEIL_THEMES[conseil.theme];
  const Icon = theme.icon;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#fbeee2]/12 bg-[#211209] transition hover:border-[#ff7a3d]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#281610]">
        {conseil.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(conseil.image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(60%_70%_at_50%_45%,rgba(255,122,61,.28),transparent_70%)]">
            <Icon className="h-14 w-14 text-[#ff7a3d]" strokeWidth={1.5} />
          </span>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#140a07]/85 px-2.5 py-1 text-[11px] font-bold text-[#ffc46b]">
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {theme.short}
        </span>
        <time dateTime={conseil.date} className="absolute top-3 right-3 rounded-full bg-[#140a07]/85 px-2.5 py-1 text-[11px] font-semibold text-[#fbeee2]/85">
          {formatConseilDate(conseil.date)}
        </time>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-[24px] leading-[1] uppercase" style={anton}>
          <TLink href={`/conseils/${conseil.slug}`} label={conseil.title} className="after:absolute after:inset-0 hover:text-[#ffc46b]">
            {conseil.title}
          </TLink>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-[#fbeee2]/70">{conseil.description}</p>
        <span className="mt-auto pt-4 text-sm font-bold text-[#ff7a3d] group-hover:text-[#ffc46b]">Lire l&apos;article →</span>
      </div>
    </article>
  );
}
