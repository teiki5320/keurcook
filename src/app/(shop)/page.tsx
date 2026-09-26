import type { Metadata } from "next";
import { withBasePath } from "@/lib/paths";
import { TLink } from "@/components/nuage/PageTransition";
import { NewsletterForm } from "@/components/community/NewsletterForm";
import { CountryCarousel } from "@/components/recipe/CountryCarousel";
import { CountryMap } from "@/components/recipe/CountryMap";
import { RecipeRow } from "@/components/recipe/RecipeCard";
import { siteConfig } from "@/lib/config";
import { getGammes } from "@/lib/data/gammes";
import { getCountriesWithRecipes, getRecipeGroups } from "@/lib/data/recipes";
import { recipeWord, unitWord } from "@/lib/gamme-words";

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: "/" } };

const anton = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 } as const;
const WORDS = ["Ndolé", "Mafé", "Yassa", "Thiéboudienne", "Pondu", "Suya", "Doro wat", "Bissap"];

export default async function HomePage() {
  const [groups, countries, gammes] = await Promise.all([getRecipeGroups(), getCountriesWithRecipes(), getGammes()]);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Accroche + carte de l'Afrique en particules (un point par pays ayant des recettes). */}
      <section className="flex min-h-[92dvh] items-center pt-20 pb-10 lg:pt-24">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-4 px-[clamp(20px,4vw,56px)] lg:grid-cols-2 lg:gap-6">
          {/* Titre au-dessus de la carte (sur téléphone, la carte remonte un peu sous le titre). */}
          <h1 className="relative z-[3] uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(44px,8vw,120px)" }}>
            Tout un continent<span className="text-[#ff7a3d]">.</span>
            <br />
            <span className="text-[#ff7a3d]">Dans l&apos;assiette.</span>
          </h1>
          <CountryMap countries={countries} className="-mt-8 mx-auto max-w-[min(92vw,52vh)] sm:-mt-12 lg:mt-0 lg:max-w-[min(600px,72vh)]" />
        </div>
      </section>

      {/* Carrousel des pays : le nuage prend la forme du pays au centre. */}
      <section aria-labelledby="pays" className="overflow-x-clip px-[clamp(20px,4vw,56px)] pb-16">
        <div className="mx-auto max-w-[1320px]">
          <h2 id="pays" className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
            Cuisiner par pays<span className="text-[#ff7a3d]">.</span>
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[#fbeee2]/65">Glissez pour voyager d&apos;un pays à l&apos;autre.</p>
          <div className="mt-6">
            <CountryCarousel countries={countries} />
          </div>
        </div>
      </section>

      {/* Un carrousel par type de plat. */}
      <div className="space-y-14 px-[clamp(20px,4vw,56px)] pb-16">
        {groups.map((g) => (
          <section key={g.key} aria-labelledby={`type-${g.key}`} className="mx-auto max-w-[1320px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">{recipeWord(g.recipes.length)}</p>
                <h2 id={`type-${g.key}`} className="mt-1 uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
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
                Les ingrédients introuvables en grande surface, choisis à la source pour cuisiner nos recettes.
              </p>
            </div>
            <TLink href="/boutique" label="Produits rares" className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              Toute l&apos;épicerie →
            </TLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {gammes.map((g) => (
              <li key={g.key}>
                <TLink href={g.href} label={g.name} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-[#fbeee2]/10 bg-[#211209]">
                  {g.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBasePath(g.image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
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

      <section aria-labelledby="newsletter" className="bg-[#140a07] px-[clamp(20px,4vw,56px)] pb-20">
        <div className="mx-auto grid max-w-[1320px] items-center gap-8 rounded-[32px] border border-[#ff7a3d]/30 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(255,122,61,.18),transparent_70%)] p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Newsletter</p>
            <h2 id="newsletter" className="mt-1 uppercase leading-[.95]" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
              La recette de la semaine<span className="text-[#ff7a3d]">.</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#fbeee2]/70">
              Chaque semaine, un plat d&apos;un pays différent, son histoire et le produit rare pour le réussir.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="bg-[#140a07] px-[clamp(20px,4vw,56px)] pb-24">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-8">
          <h2 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,7vw,120px)" }}>
            Du marché de Dakar,
            <br />
            <span className="text-[#ff7a3d]">à votre cuisine.</span>
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
