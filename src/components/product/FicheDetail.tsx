import Link from "next/link";
import type { PartieFiche } from "@/lib/fiches";
import { jsonLd } from "@/lib/json-ld";
import { faqParts, faqPlainText } from "@/lib/recipe-utils";
import type { FicheQuestion } from "@/lib/types";

/** Texte avec liens internes « [texte](/chemin) », découpé en paragraphes (ligne vide). */
function TexteAvecLiens({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\n{2,}/).map((para, i) => (
        <p key={i}>
          {faqParts(para).map((part, j) =>
            typeof part === "string" ? (
              part
            ) : (
              <Link key={j} href={part.href} className="font-semibold text-[#ffc46b] underline underline-offset-2 hover:text-[#ff7a3d]">
                {part.text}
              </Link>
            ),
          )}
        </p>
      ))}
    </>
  );
}

/**
 * Section « en détail » d'une fiche produit ou pays (src/lib/demo/fiches) : parties titrées, puis questions fréquentes.
 * Les données FAQPage ne sont produites que si la fiche a une FAQ.
 */
export function FicheDetail({
  id,
  titre,
  parties,
  faq,
  className = "",
}: {
  id: string;
  titre: string;
  parties: PartieFiche[];
  faq?: FicheQuestion[];
  className?: string;
}) {
  if (parties.length === 0) return null;
  return (
    <section aria-labelledby={id} className={`max-w-3xl ${className}`}>
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: faqPlainText(q.reponse) },
              })),
            }),
          }}
        />
      )}
      <h2 id={id} className="font-display text-3xl text-forest-900">
        {titre}
        <span className="text-[#ff7a3d]">.</span>
      </h2>
      {parties.map((p) => (
        <div key={p.id} className="mt-8">
          <h3 id={p.id} className="font-display text-xl text-forest-900">
            {p.titre}
          </h3>
          <div className="mt-3 space-y-4 leading-relaxed text-ink/85">
            <TexteAvecLiens texte={p.texte} />
          </div>
        </div>
      ))}
      {faq && faq.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-xl text-forest-900">Questions fréquentes</h3>
          <dl className="mt-4 space-y-5">
            {faq.map((q) => (
              <div key={q.question} className="border-t border-[#fbeee2]/12 pt-4">
                <dt className="text-[17px] font-semibold">{q.question}</dt>
                <dd className="mt-1.5 space-y-3 text-[15px] leading-relaxed text-ink/85">
                  <TexteAvecLiens texte={q.reponse} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
