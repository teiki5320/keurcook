import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BlocActus } from "@/components/actus/BlocActus";
import { getSlugsConstruits } from "@/lib/data/articles";
import { TLink } from "@/components/nuage/PageTransition";
import { CountryCarousel } from "@/components/recipe/CountryCarousel";
import { CountryMap } from "@/components/recipe/CountryMap";
import { RecipeRow } from "@/components/recipe/RecipeCard";
import { siteConfig } from "@/lib/config";
import { jsonLd } from "@/lib/json-ld";
import { getGammes } from "@/lib/data/gammes";
import { getTop10s } from "@/lib/data/top10";
import { getCountriesWithRecipes, getRecipeGroups } from "@/lib/data/recipes";
import { getMaintenance } from "@/lib/data/settings";
import { getCoupsDeCoeur } from "@/lib/data/catalog";
import { unitWord } from "@/lib/gamme-words";
import { photoSrcSet } from "@/lib/image-loader";


export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const anton = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 } as const;
const WORDS = ["Ndolé", "Mafé", "Yassa", "Thiéboudienne", "Pondu", "Suya", "Doro wat", "Bissap"];

export default async function HomePage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const [groups, countries, gammes, coups] = await Promise.all([getRecipeGroups(), getCountriesWithRecipes(), getGammes(), getCoupsDeCoeur()]);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description },
    { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/keurcook-logo-complet.png` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      {/* Accroche + carte de l'Afrique en particules (un point par pays ayant des recettes). */}
      <section className="flex items-center pt-20 pb-6 lg:min-h-[92dvh] lg:pt-24 lg:pb-10">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-4 px-[clamp(20px,4vw,56px)] lg:grid-cols-2 lg:gap-6">
          {/* Titre au-dessus de la carte (sur téléphone, la carte remonte un peu sous le titre). */}
          <h1 className="relative z-[3] uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(44px,8vw,120px)" }}>
            Tout un continent<span className="text-[#ff7a3d]">.</span>
            <br />
            <span className="text-[#ff7a3d]">Dans l&apos;assiette.</span>
          </h1>
          <CountryMap countries={countries} className="-mt-12 mx-auto max-w-[min(92vw,52vh)] sm:-mt-16 lg:mt-0 lg:max-w-[min(600px,72vh)]" />
        </div>
      </section>

      {/* Carrousel des pays : le nuage prend la forme du pays au centre. */}
      <section aria-labelledby="pays" className="overflow-x-clip px-[clamp(20px,4vw,56px)] pb-16">
        <div className="mx-auto max-w-[1320px]">
          <h2 id="pays" className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
            Cuisiner par pays<span className="text-[#ff7a3d]">.</span>
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">Glissez pour voyager d&apos;un pays à l&apos;autre.</p>
          <div className="mt-2">
            <CountryCarousel countries={countries} />
          </div>
        </div>
      </section>

      {/* Nos coups de cœur : des produits en images dès le haut de page, chacun mène à sa fiche sur le site (aucun lien Amazon sur l'accueil). */}
      <section aria-labelledby="coups-de-coeur" className="overflow-x-clip px-[clamp(20px,4vw,56px)] pb-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="coups-de-coeur" className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
                Nos coups de cœur<span className="text-[#ff7a3d]">.</span>
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">Ustensiles, épices, cafés et thés de nos Top 10.</p>
            </div>
            <TLink href="/top-10" label="Nos Top 10" className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              Tout voir →
            </TLink>
          </div>
          <ul className="-mx-[clamp(20px,4vw,56px)] flex snap-x gap-3 overflow-x-auto px-[clamp(20px,4vw,56px)] pb-2 sm:gap-4">
            {coups.map((p) => (
              <li key={p.slug} className="w-[42vw] max-w-[220px] shrink-0 snap-start">
                <TLink href={`/produit/${p.slug}`} label={p.name} prefetch={false} className="group block overflow-hidden rounded-3xl border border-[#fbeee2]/10 bg-[#211209] hover:border-[#ff7a3d]/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} srcSet={photoSrcSet(p.images[0])} sizes="(min-width: 640px) 220px, 42vw" alt="" width={600} height={600} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="block p-3">
                    <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">{p.category.name}</span>
                    <span className="mt-1 block text-sm leading-snug font-semibold group-hover:text-[#ffc46b]">{p.name}</span>
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nos Top 10 et la boutique : de simples liens vers les pages du site (aucun bouton Amazon sur l'accueil). */}
      <section aria-labelledby="top10-accueil" className="overflow-x-clip px-[clamp(20px,4vw,56px)] pb-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="top10-accueil" className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
                Nos Top 10<span className="text-[#ff7a3d]">.</span>
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">Ustensiles, épices, farines, livres : nos sélections pour bien s&apos;équiper.</p>
            </div>
            <TLink href="/boutique" label="La boutique" className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              Toute la boutique →
            </TLink>
          </div>
          <ul className="-mx-[clamp(20px,4vw,56px)] flex snap-x gap-3 overflow-x-auto px-[clamp(20px,4vw,56px)] pb-2 sm:gap-4">
            {getTop10s().map((t) => (
              <li key={t.slug} className="w-[72vw] max-w-[300px] shrink-0 snap-start">
                <TLink href={`/top-10/${t.slug}`} label={t.title} prefetch={false} className="group block overflow-hidden rounded-3xl border border-[#fbeee2]/10 bg-[#211209] hover:border-[#ff7a3d]/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/top10/${t.slug}.jpg`} alt="" width={1200} height={630} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover" />
                  <span className="block p-4 text-sm leading-snug font-semibold group-hover:text-[#ffc46b]">{t.title}</span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Actus de la cuisine africaine, lues en direct depuis la veille (rien n'est affiché s'il n'y en a pas). */}
      <BlocActus
        construits={getSlugsConstruits()}
        titre="Actus de la cuisine africaine"
        limite={4}
        prioritaire
        lien={{ href: "/actus", label: "Toutes les actus" }}
        className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,56px)] pb-16"
      />

      {/* Un carrousel par type de plat. */}
      <div className="space-y-14 px-[clamp(20px,4vw,56px)] pb-16">
        {groups.map((g) => (
          <section key={g.key} aria-labelledby={`type-${g.key}`} className="mx-auto max-w-[1320px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id={`type-${g.key}`} className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
                  {g.name}
                  <span className="text-[#ff7a3d]">.</span>
                </h2>
                <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">{g.description}</p>
              </div>
              <TLink href={`/recettes?type=${g.key}`} label={g.name} className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
                Tout voir →
              </TLink>
            </div>
            <RecipeRow recipes={g.recipes} />
          </section>
        ))}
      </div>

      <div className="overflow-hidden border-y border-[#fbeee2]/8 bg-[#140a07] py-6">
        <div className="flex w-max gap-12 whitespace-nowrap uppercase [animation:nuage-marq_48s_linear_infinite]" style={{ ...anton, fontSize: "clamp(40px,6vw,88px)" }}>
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

      {/* Produits rares : chaque vignette ouvre la boutique sur la bonne gamme. */}
      <section aria-labelledby="produits" className="bg-[#140a07] px-[clamp(20px,4vw,56px)] py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="produits" className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
                Produits rares<span className="text-[#ff7a3d]">.</span>
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">
                Les ingrédients introuvables en grande surface, sélectionnés sur Amazon pour cuisiner nos recettes.
              </p>
            </div>
            <TLink href="/boutique" label="Produits rares" className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              Toute la boutique →
            </TLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {gammes.map((g) => (
              <li key={g.key}>
                <TLink href={g.href} label={g.name} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-[#fbeee2]/10 bg-[#211209]">
                  {g.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={g.image} srcSet={photoSrcSet(g.image)} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw" loading="lazy" decoding="async" alt={g.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#140a07]/95 p-4 pt-14">
                    <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">{unitWord(g.products.length)}</span>
                    <span className="mt-1 block text-2xl leading-none uppercase" style={anton}>{g.name}</span>
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#140a07] px-[clamp(20px,4vw,56px)] pb-24">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-8">
          <h2 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,7vw,120px)" }}>
            Seize pays,
            <br />
            <span className="text-[#ff7a3d]">une seule table.</span>
          </h2>
          <TLink
            href="/recettes"
            label="Les recettes"
            className="rounded-full border border-[#ff7a3d] px-8 py-5 text-base font-bold text-[#ff7a3d] transition hover:bg-[#ff7a3d] hover:text-[#140a07]"
          >
            Choisir une recette →
          </TLink>
        </div>
      </section>
    </>
  );
}
