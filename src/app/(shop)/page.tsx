import type { Metadata } from "next";
import { HomeCarousel, type Slide } from "@/components/nuage/HomeCarousel";
import { toMini } from "@/components/nuage/mini";
import { TLink } from "@/components/nuage/PageTransition";
import { siteConfig } from "@/lib/config";
import { getCatalog } from "@/lib/data/catalog";

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
  const { products } = await getCatalog();
  const of = (slug: string) => products.filter((p) => p.category.slug === slug).map(toMini).slice(0, 2);
  const refs = (slug: string) => {
    const n = products.filter((p) => p.category.slug === slug).length;
    return `${n} RÉFÉRENCE${n > 1 ? "S" : ""}`;
  };
  const featured = products.filter((p) => p.featured && p.category.kind === "cbd").map(toMini).slice(0, 2);

  const slides: Slide[] = [
    {
      eyebrow: "CBD FRANÇAIS", title: "Une plante.", title2: "Mille nuances.", mix: 0,
      desc: "Fleur, résine, huile : le même chanvre français, transformé par des producteurs de nos régions. THC ≤ 0,3 %, certificat pour chaque produit.",
      href: "/boutique", cta: "Toute la boutique", items: featured,
    },
    { eyebrow: refs("fleurs"), title: "La", title2: "fleur", mix: 0, desc: "Fleurs de chanvre françaises, séchées et affinées lentement.", href: "/categorie/fleurs", cta: "Voir les fleurs", items: of("fleurs") },
    { eyebrow: refs("resines"), title: "La", title2: "résine", mix: 1, desc: "Résines obtenues par tamisage à sec ou pression, selon des méthodes artisanales.", href: "/categorie/resines", cta: "Voir les résines", items: of("resines") },
    { eyebrow: refs("huiles"), title: "L'", title2: "huile", mix: 2, desc: "Huiles de chanvre à spectre complet ou large, en flacon compte-gouttes.", href: "/categorie/huiles", cta: "Voir les huiles", items: of("huiles") },
  ];

  const jsonLd = { "@context": "https://schema.org", "@type": "OnlineStore", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeCarousel slides={slides} />

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
