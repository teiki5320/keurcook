import type { Metadata } from "next";
import Link from "next/link";
import { BlocActus } from "@/components/actus/BlocActus";
import { getArticles, getSlugsConstruits } from "@/lib/data/articles";
import { getRecipes } from "@/lib/data/recipes";
import { countryByCode } from "@/lib/countries";
import { estActuMaghreb } from "@/lib/veille-articles";
import { anton } from "@/components/nuage/typography";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, JsonLdScript } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Actus de la cuisine africaine",
  description:
    "Plats, chefs, produits, fêtes et festivals : l'actualité de la cuisine africaine en articles complets, deux fois par jour, avec leurs sources.",
  path: "/actus",
});

const datePublication = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });

/** Page « Actus » : les 20 dernières actus de la cuisine africaine, lues en direct depuis la veille. */
export default async function ActusPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const articles = getArticles().filter((a) => !estActuMaghreb(a));
  // Pays cités par les articles qui ont des recettes sur le site : liens internes vers leur page.
  const recipes = await getRecipes();
  const codes = [...new Set(articles.flatMap((a) => a.pays ?? []))].filter((code) => recipes.some((r) => r.countryCode === code));
  const paysCites = codes.map((code) => countryByCode(code)).filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <div className="container-page">
      <JsonLdScript
        data={[breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Actus", url: `${siteConfig.url}/actus` }])]}
      />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <span className="text-ink">Actus</span>
      </nav>
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(48px,8vw,120px)" }}>
        Actus de la cuisine africaine<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-4 mb-8 max-w-3xl text-lg leading-relaxed text-[#fbeee2]/80">
        Plats et traditions, chefs et restaurants, produits du continent, fêtes, festivals et livres de cuisine : l&apos;actualité de la cuisine
        africaine et de sa diaspora. Touchez une actu pour lire l&apos;article complet, rédigé par nos soins, avec un lien vers chacune de ses sources.
        Mise à jour deux fois par jour.
      </p>
      <BlocActus construits={getSlugsConstruits()} limite={20} avecMiseAJour siVide="Les actus arrivent bientôt : revenez dans quelques heures." />
      {/* Tous les articles publiés, écrits dans la page : lisibles par Google même sans la mise à jour en direct. */}
      {articles.length > 0 && (
        <section aria-labelledby="tous-les-articles" className="mt-14 max-w-3xl">
          <h2 id="tous-les-articles" className="font-display text-3xl">
            Tous nos articles<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="mt-4 divide-y divide-[#fbeee2]/10">
            {articles.map((a) => (
              <li key={a.slug} className="py-4">
                <Link href={`/actus/${a.slug}`} className="text-lg font-bold hover:text-[#ff7a3d]">
                  {a.titre}
                </Link>
                <p className="mt-1 text-sm text-[#fbeee2]/55">
                  <time dateTime={a.publie_le}>{datePublication(a.publie_le)}</time> · {a.lecture_min} min de lecture
                </p>
                <p className="mt-1 leading-relaxed text-[#fbeee2]/75">{a.chapo}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section aria-labelledby="aller-plus-loin" className="mt-14 max-w-3xl">
        <h2 id="aller-plus-loin" className="font-display text-3xl">
          Passer en cuisine<span className="text-[#ff7a3d]">.</span>
        </h2>
        <p className="mt-4 leading-relaxed text-[#fbeee2]/80">
          Une actu vous a donné envie de cuisiner ? Retrouvez nos <Link href="/recettes" className="font-bold text-[#ff7a3d] hover:underline">recettes africaines</Link>,
          la <Link href="/pays" className="font-bold text-[#ff7a3d] hover:underline">cuisine pays par pays</Link> et
          nos <Link href="/conseils" className="font-bold text-[#ff7a3d] hover:underline">conseils pour bien cuisiner</Link>.
        </p>
        {paysCites.length > 0 && (
          <>
            <h3 className="mt-6 text-lg font-bold">Les pays de ces actus</h3>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {paysCites.map((c) => (
                <li key={c.code}>
                  <Link href={`/pays/${c.slug}`} className="text-[#ff7a3d] hover:underline">
                    La cuisine {c.of}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
