/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import Link from "next/link";
import { anton } from "@/components/nuage/typography";
import { siteConfig } from "@/lib/config";
import type { Actu } from "@/lib/veille";
import { dateLongue, nomDuSite, type ArticleActu, type FicheLiee, type LienCarte } from "@/lib/veille-articles";
import { ActuVignette } from "./ActuVignette";
import { CreditImage } from "./CreditImage";

interface Props {
  article: ArticleActu;
  /** Fiches du site liées (recettes, conseils, fiche produit et Top 10 du sujet, pays) : liens internes seulement. */
  fiches?: FicheLiee[];
  /** Trois autres actus, avec le lien que chaque carte ouvre. */
  autres?: Array<{ actu: Actu; lien: LienCarte }>;
  /** Emplacement publicitaire (page construite seulement), placé avant « Autres actus ». */
  pub?: React.ReactNode;
}

/**
 * Article complet d'une actu, dans le style du site : fil d'Ariane, titre, chapô, date et durée de lecture,
 * image 16:9 et son crédit, intertitres et paragraphes, encadré « Sources », fiches liées, puis « Autres actus ».
 * Commun à la page construite (/actus/<slug>) et à la page de secours (/actus/article?id=…).
 * Aucun lien Amazon, bouton d'achat ni produit de la boutique ici.
 */
export function ArticleVue({ article, fiches = [], autres = [], pub }: Props) {
  const date = dateLongue(article.publie_le);
  const sources = [
    { url: article.source_url, nom: article.source_nom },
    ...(article.autres_sources ?? []).filter((u) => u !== article.source_url).map((u) => ({ url: u, nom: nomDuSite(u) })),
  ];
  return (
    <article className="container-page pb-10">
      <div className="mx-auto max-w-[680px] min-w-0">
        <nav aria-label="Fil d'Ariane" className="mb-5 text-sm break-words text-muted">
          <Link href="/" className="hover:underline">Accueil</Link> › <Link href="/actus" className="hover:underline">Actus</Link> ›{" "}
          <span className="text-ink">{article.titre}</span>
        </nav>

        <header>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
            <span>Actu</span>
            {date && (
              <>
                <span aria-hidden className="text-[#fbeee2]/40">·</span>
                <time dateTime={article.publie_le} className="text-[#fbeee2]/60">{date}</time>
              </>
            )}
            <span aria-hidden className="text-[#fbeee2]/40">·</span>
            <span className="text-[#fbeee2]/60">{article.lecture_min} min de lecture</span>
          </p>
          <h1 className="mt-3 break-words uppercase leading-[.98] text-balance" style={{ ...anton, fontSize: "clamp(34px,6vw,60px)" }}>
            {article.titre}
          </h1>
          <p className="mt-5 border-l-4 border-[#ff7a3d] pl-4 text-lg leading-relaxed font-semibold text-[#fbeee2] sm:text-xl">{article.chapo}</p>
        </header>

        <figure className="mt-8">
          <img
            src={article.image.url}
            alt={article.image.alt}
            width={article.image.largeur}
            height={article.image.hauteur}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="aspect-video w-full rounded-[24px] border border-[#fbeee2]/10 bg-[#281610] object-cover"
          />
          <figcaption className="mt-2">
            <CreditImage image={article.image} />
          </figcaption>
        </figure>

        <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-[#fbeee2]/85">
          {article.blocs.map((b, i) => (
            <section key={i} className="space-y-4">
              {b.intertitre && <h2 className="pt-4 font-display text-2xl text-[#fbeee2] sm:text-3xl">{b.intertitre}</h2>}
              {b.paragraphes.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <aside aria-labelledby="sources" className="mt-10 rounded-[22px] border border-[#fbeee2]/12 bg-[#211209] p-5 sm:p-6">
          <h2 id="sources" className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Sources</h2>
          <p className="mt-2 text-[15px] leading-relaxed break-words text-[#fbeee2]/80">
            Article rédigé par {siteConfig.name} à partir de :{" "}
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a href={s.url} target="_blank" rel="noopener nofollow" className="font-bold text-[#ff7a3d] underline-offset-2 hover:text-[#ffc46b] hover:underline">
                  {s.nom} <span aria-hidden>↗</span>
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </span>
            ))}
            .
          </p>
        </aside>

        {fiches.length > 0 && (
          <nav aria-labelledby="fiches-liees" className="mt-8">
            <h2 id="fiches-liees" className="font-display text-2xl">
              Pour aller plus loin<span className="text-[#ff7a3d]">.</span>
            </h2>
            <ul className="mt-3 space-y-2 text-[16px]">
              {fiches.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="font-semibold text-[#ffc46b] underline underline-offset-2 hover:text-[#ff7a3d]">
                    {f.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {pub}

      {autres.length > 0 && (
        <section aria-labelledby="autres-actus" className="mt-16">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 id="autres-actus" className="font-display text-3xl">
              Autres actus<span className="text-[#ff7a3d]">.</span>
            </h2>
            <Link href="/actus" className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              Toutes les actus →
            </Link>
          </div>
          <ul className="grid gap-4 lg:grid-cols-3">
            {autres.map(({ actu, lien }) => (
              <li key={actu.id} className="flex min-w-0">
                <ActuVignette actu={actu} lien={lien} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
