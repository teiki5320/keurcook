import type { Metadata } from "next";
import { withBasePath } from "@/lib/paths";
import { TLink } from "@/components/nuage/PageTransition";
import { siteConfig } from "@/lib/config";
import { getGammes } from "@/lib/data/gammes";

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: "/" } };

const PROMISES = [
  { title: "Origine France", text: "Région de culture et producteur indiqués sur chaque fiche." },
  { title: "Analysé en laboratoire", text: "Certificat d'analyse PDF téléchargeable pour chaque produit CBD." },
  { title: "THC ≤ 0,3 %", text: "Conforme à la réglementation française (arrêté du 30 décembre 2021)." },
  { title: "Interdit aux mineurs", text: "Vente réservée aux personnes de 18 ans et plus." },
];

const anton = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 } as const;
const WORDS = ["Fleur", "Résine", "Huile", "Infusion"];

export default async function HomePage() {
  const gammes = await getGammes();
  const jsonLd = { "@context": "https://schema.org", "@type": "OnlineStore", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Vitrine : message + nuage 3D ; l'achat se fait dans la boutique. */}
      <section className="flex min-h-[88dvh] items-center pt-24 pb-10">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-6 px-[clamp(20px,4vw,56px)] lg:grid-cols-2">
          <div>
            <h1 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,8vw,120px)" }}>
              Une plante<span className="text-[#ff7a3d]">.</span>
              <br />
              <span className="text-[#ff7a3d]">Mille nuances.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#fbeee2]/75">
              Fleurs, résines, huiles, infusions et cosmétiques issus de chanvre cultivé en France. THC ≤ 0,3 %, certificat
              d&apos;analyse pour chaque produit.
            </p>
            <TLink href="/boutique" label="La boutique" className="mt-8 inline-flex rounded-full bg-[#ff7a3d] px-8 py-4 text-base font-bold text-[#140a07] transition hover:bg-[#ffc46b]">
              Entrer dans la boutique →
            </TLink>
          </div>
          <div data-cloud="" data-mix="0" aria-hidden className="relative mx-auto aspect-square w-full max-w-[min(260px,32vh)] sm:max-w-[min(520px,60vh)]">
            <div className="absolute inset-[4%] rounded-full border border-dashed border-[#ffc46b]/30 [animation:nuage-spin_60s_linear_infinite]" />
          </div>
        </div>
      </section>

      {/* Aperçu des gammes : chaque vignette ouvre la boutique sur la bonne gamme. */}
      <section aria-labelledby="gammes" className="px-[clamp(20px,4vw,56px)] pb-16">
        <div className="mx-auto max-w-[1320px]">
          <h2 id="gammes" className="mb-5 uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
            Nos gammes<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {gammes.map((g) => (
              <li key={g.key}>
                <TLink href={g.href} label={g.name} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-[#fbeee2]/10 bg-[#211209]">
                  {g.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBasePath(g.image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#140a07]/95 p-4 pt-14">
                    <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">
                      {g.products.length} {g.key === "accessoires" ? "article" : "variété"}
                      {g.products.length > 1 ? "s" : ""}
                    </span>
                    <span className="mt-1 block text-2xl leading-none uppercase" style={anton}>{g.name}</span>
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="overflow-hidden border-y border-[#fbeee2]/8 bg-[#140a07] py-6">
        <div className="flex w-max gap-12 whitespace-nowrap uppercase [animation:nuage-marq_36s_linear_infinite]" style={{ ...anton, fontSize: "clamp(40px,6vw,88px)" }}>
          {[0, 1].map((k) =>
            WORDS.map((w, i) => (
              <span key={`${k}-${w}`} className="flex gap-12">
                <span>{w}</span>
                <span className={i % 2 ? "text-[#ffc46b]" : "text-[#ff7a3d]"}>✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      <section aria-labelledby="engagements" className="bg-[#140a07] px-[clamp(20px,4vw,56px)] pt-20">
        <div className="mx-auto max-w-[1320px]">
          <h2 id="engagements" className="sr-only">Nos engagements</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <li key={p.title} className="rounded-3xl border border-[#fbeee2]/10 bg-[#211209] p-6">
                <p className="text-2xl uppercase text-[#ffc46b]" style={anton}>{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#fbeee2]/70">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#fbeee2]/55">
            Nos produits ne sont pas des médicaments. Déconseillés aux femmes enceintes ou allaitantes. Le THC, même à
            faible dose, peut être détecté lors d&apos;un dépistage salivaire : ne prenez pas le volant après
            consommation.{" "}
            <TLink href="/avertissements" label="Conformité" className="underline underline-offset-2 hover:text-[#ff7a3d]">
              Notre démarche de conformité
            </TLink>
          </p>
        </div>
      </section>

      <section className="bg-[#140a07] px-[clamp(20px,4vw,56px)] py-24">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-8">
          <h2 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,7vw,120px)" }}>
            Toute la récolte,
            <br />
            <span className="text-[#ff7a3d]">du champ au bocal.</span>
          </h2>
          <TLink href="/boutique" label="La boutique" className="rounded-full bg-[#ff7a3d] px-8 py-5 text-base font-bold text-[#140a07] transition hover:bg-[#ffc46b]">
            Entrer dans la boutique →
          </TLink>
        </div>
      </section>
    </>
  );
}
