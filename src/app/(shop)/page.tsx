import { HomeCarousel, type Slide } from "@/components/nuage/HomeCarousel";
import { toMini } from "@/components/nuage/mini";
import { TLink } from "@/components/nuage/PageTransition";
import { siteConfig } from "@/lib/config";
import { getCatalog } from "@/lib/data/catalog";

export const revalidate = 300;

const anton = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 } as const;
const WORDS = ["Fleur", "Résine", "Huile", "Infusion"];

export default async function HomePage() {
  const { products } = await getCatalog();
  const of = (slug: string) => products.filter((p) => p.category.slug === slug).map(toMini).slice(0, 2);
  const featured = products.filter((p) => p.featured && p.category.kind === "cbd").map(toMini).slice(0, 2);

  const slides: Slide[] = [
    {
      eyebrow: "CBD FRANÇAIS", title: "Une plante.", title2: "Mille formes.", form: "Fleur", mix: 0,
      desc: "Fleur, résine, huile : le même chanvre français, transformé par des producteurs de nos régions. THC ≤ 0,3 %, certificat pour chaque produit.",
      href: "/boutique", cta: "Toute la boutique", items: featured,
    },
    { eyebrow: "FORME 01", title: "La", title2: "fleur", form: "Fleur", mix: 0, desc: "Fleurs de chanvre françaises, séchées et affinées lentement.", href: "/categorie/fleurs", cta: "Voir les fleurs", items: of("fleurs") },
    { eyebrow: "FORME 02", title: "La", title2: "résine", form: "Résine", mix: 1, desc: "Résines obtenues par tamisage à sec ou pression, selon des méthodes artisanales.", href: "/categorie/resines", cta: "Voir les résines", items: of("resines") },
    { eyebrow: "FORME 03", title: "L'", title2: "huile", form: "Huile", mix: 2, desc: "Huiles de chanvre à spectre complet ou large, en flacon compte-gouttes.", href: "/categorie/huiles", cta: "Voir les huiles", items: of("huiles") },
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

      <section className="bg-[#140a07] px-[clamp(20px,4vw,56px)] py-24">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-8">
          <h2 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,7vw,120px)" }}>
            Toute la récolte,
            <br />
            <span className="text-[#ff7a3d]">sous toutes ses formes.</span>
          </h2>
          <TLink href="/boutique" label="La boutique" className="rounded-full bg-[#ff7a3d] px-8 py-5 text-base font-bold text-[#140a07] transition hover:bg-[#ffc46b]">
            Entrer dans la boutique →
          </TLink>
        </div>
      </section>
    </>
  );
}
