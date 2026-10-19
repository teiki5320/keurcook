import type { Metadata } from "next";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { ProductImage } from "@/components/product/ProductImage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { getSelections, resolveSelection } from "@/lib/data/selections";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Nos sélections",
  description: "Nos sélections de produits de la boutique, classés par usage et reliés aux recettes africaines du site où ils servent.",
  path: "/selections",
});

export default async function SelectionsPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const selections = await Promise.all(getSelections().map(async (s) => ({ ...s, resolved: await resolveSelection(s.slug) })));
  return (
    <div className="container-page">
      <JsonLdScript
        data={[
          breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Nos sélections", url: `${siteConfig.url}/selections` }]),
          itemListLd("Nos sélections", selections.map((s) => ({ name: s.title, url: `${siteConfig.url}/selections/${s.slug}` }))),
        ]}
      />
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(48px,8vw,120px)" }}>
        Nos sélections<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Des produits de la boutique réunis par thème, avec pour chacun ce qu&apos;il apporte et les recettes du site où il sert.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {selections.map((s) => (
          <li key={s.slug}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#fbeee2]/12 bg-[#211209] transition hover:border-[#ff7a3d]">
              {/* Vignettes des trois premiers produits de la sélection. */}
              <div className="grid grid-cols-3 gap-px bg-[#fbeee2]/10">
                {s.resolved.slice(0, 3).map((it) => (
                  <div key={it.product} className="relative aspect-square overflow-hidden bg-[#281610]">
                    <ProductImage src={it.productData.images[0]} alt="" sizes="(min-width: 1024px) 140px, 33vw" className="transition duration-700 group-hover:scale-105" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
                  {s.items.length} {s.unite}
                </p>
                <h2 className="mt-2 text-[24px] leading-[1] uppercase" style={anton}>
                  <TLink href={`/selections/${s.slug}`} label={s.title} className="after:absolute after:inset-0 hover:text-[#ffc46b]">
                    {s.title}
                  </TLink>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#fbeee2]/70">{s.description}</p>
                <span className="mt-auto pt-4 text-sm font-bold text-[#ff7a3d] group-hover:text-[#ffc46b]">Voir la sélection →</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-xs text-muted">{AMAZON_DISCLOSURE}</p>
    </div>
  );
}
