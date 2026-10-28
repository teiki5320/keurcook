"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { anton } from "@/components/nuage/typography";
import { chargerFichier, type Actu } from "@/lib/veille";
import { chargerArticle, lienActu, type ArticleActu } from "@/lib/veille-articles";
import { ArticleVue } from "./ArticleVue";

/**
 * Page de secours : lit l'article dans la veille (articles/keurcook/<id>.json) et l'affiche comme une page construite.
 * Si sa page /actus/<slug> existe déjà, on y va directement. Id inconnu : message simple et lien vers /actus.
 */
export function ArticleSecours({ construits }: { construits: string[] }) {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const [etat, setEtat] = useState<{ id: string | null; article: ArticleActu | null } | null>(null);
  const [autres, setAutres] = useState<Actu[]>([]);

  useEffect(() => {
    let actif = true;
    chargerArticle(id).then((article) => {
      if (!actif) return;
      if (article && construits.includes(article.slug)) {
        router.replace(`/actus/${article.slug}`);
        return;
      }
      setEtat({ id, article });
      if (article) document.title = `${article.titre} | Keur Cook`;
    });
    chargerFichier().then((f) => actif && setAutres((f?.actus ?? []).filter((a) => a.id !== id).slice(0, 3)));
    return () => {
      actif = false;
    };
  }, [id, construits, router]);

  if (!etat || etat.id !== id) {
    return (
      <div aria-busy className="container-page">
        <div className="mx-auto max-w-[680px] animate-pulse space-y-4">
          <div className="h-4 w-1/2 rounded bg-[#fbeee2]/5" />
          <div className="h-24 rounded-2xl bg-[#fbeee2]/5" />
          <div className="aspect-video rounded-[24px] bg-[#fbeee2]/5" />
        </div>
      </div>
    );
  }

  if (!etat.article) {
    return (
      <div className="container-page">
        <div className="mx-auto max-w-[680px] py-10">
          <h1 className="uppercase leading-[.95]" style={{ ...anton, fontSize: "clamp(34px,6vw,60px)" }}>
            Article introuvable<span className="text-[#ff7a3d]">.</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#fbeee2]/80">
            Cet article n&apos;existe pas ou n&apos;est plus disponible. Retrouvez toutes les actus de la cuisine africaine sur la page Actus.
          </p>
          <Link href="/actus" className="mt-6 inline-block font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
            Voir toutes les actus →
          </Link>
        </div>
      </div>
    );
  }

  const dejaConstruits = new Set(construits);
  return <ArticleVue article={etat.article} autres={autres.map((actu) => ({ actu, lien: lienActu(actu, dejaConstruits) }))} />;
}
