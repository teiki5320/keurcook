"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { LayoutGrid, Search, X } from "lucide-react";
import { Coverflow } from "@/components/nuage/Coverflow";
import { anton } from "@/components/nuage/shared";
import { recipeWord } from "@/lib/gamme-words";
import { DIFFICULTY_LABELS, filterRecipes, RECIPE_COURSES } from "@/lib/recipe-utils";
import type { Country, Recipe } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  countries: Country[];
}

/**
 * Page Recettes : carrousel des types de plats ; dessous, les recettes du type au centre.
 * Paramètres d'URL : ?type=…, ?pays=SN, ?difficulte=1, ?q=… (plat, pays ou ingrédient), ?type=tout.
 */
const ALL = "tout";
const chip = "inline-flex items-center gap-1.5 rounded-full border border-[#fbeee2]/20 px-4 py-2 text-sm hover:border-[#ff7a3d]";
const select = "rounded-full border border-[#fbeee2]/20 bg-[#140a07] px-4 py-2 text-sm text-[#fbeee2] hover:border-[#ff7a3d]";

export function RecipesBrowser(props: Props) {
  return (
    <Suspense fallback={<RecipesView {...props} params={new URLSearchParams()} />}>
      <RecipesWithParams {...props} />
    </Suspense>
  );
}

function RecipesWithParams(props: Props) {
  const params = useSearchParams();
  // La clé réinitialise le champ de recherche quand la recherche change depuis l'en-tête.
  return <RecipesView key={params.get("q") ?? ""} {...props} params={new URLSearchParams(params.toString())} />;
}

function RecipesView({ recipes, countries, params }: Props & { params: URLSearchParams }) {
  const router = useRouter();
  const query = params.get("q")?.trim() ?? "";
  const country = params.get("pays");
  const difficulty = Number(params.get("difficulte")) || null;
  const typeKey = params.get("type");
  const [draft, setDraft] = useState(query);

  const courses = RECIPE_COURSES.filter((c) => recipes.some((r) => r.course === c.key));
  const filtering = Boolean(query || country || difficulty);
  const showAll = typeKey === ALL || filtering;
  const index = Math.max(0, courses.findIndex((c) => c.key === typeKey));
  const course = courses[index];

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const qs = next.toString();
    router.replace(qs ? `/recettes?${qs}` : "/recettes", { scroll: false });
  };
  const chooseCourse = (i: number) => update({ type: courses[i].key, q: null, pays: null, difficulte: null });

  const countryName = (code: string) => countries.find((c) => c.code === code)?.name ?? code;
  const list = filterRecipes(recipes, { q: query, country, difficulty, course: showAll ? null : course?.key }, countryName);
  const title = query ? `« ${query} »` : filtering ? "Votre sélection" : showAll ? "Toutes les recettes" : course?.name;

  const cards = courses.map((c) => {
    const items = recipes.filter((r) => r.course === c.key);
    return {
      key: c.key,
      title: c.name,
      eyebrow: recipeWord(items.length),
      image: (items.find((r) => r.featured) ?? items[0])?.image ?? null,
      href: `/recettes?type=${c.key}`,
      cloudMix: 3,
    };
  });

  return (
    <>
      <section className="pt-24 pb-6 sm:pt-28">
        <div className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,56px)]">
          <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
            Les recettes<span className="text-[#ff7a3d]">.</span>
          </h1>
        </div>
        <div className="mt-4">
          <Coverflow
            items={cards}
            cloud
            activeIndex={index}
            onActiveChange={chooseCourse}
            onOpen={() => {
              if (showAll) chooseCourse(index);
              document.getElementById("liste")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            hint="Glissez pour choisir un type de plat · ses recettes s'affichent dessous"
            hintMouse="Cliquez ou glissez pour choisir un type de plat · ses recettes s'affichent dessous"
          />
        </div>
      </section>

      <section id="liste" aria-live="polite" className="container-page relative scroll-mt-24 pb-16">
        <form
          role="search"
          className="relative mb-6 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: draft.trim() || null });
          }}
        >
          <label htmlFor="recherche-recette" className="sr-only">
            Chercher une recette, un pays ou un ingrédient
          </label>
          <input
            id="recherche-recette"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="J'ai du fonio, de l'arachide… que cuisiner ?"
            className="w-full rounded-full border border-[#fbeee2]/15 bg-[#140a07]/80 py-3 pr-4 pl-11 text-sm text-[#fbeee2] placeholder:text-[#fbeee2]/45 focus:border-[#ff7a3d] focus:outline-none"
          />
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#fbeee2]/50" aria-hidden />
        </form>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">{recipeWord(list.length)}</p>
            <h2 className="mt-1 text-4xl leading-none uppercase" style={anton}>
              {title}
            </h2>
            {!showAll && course && <p className="mt-2 max-w-2xl text-sm text-muted">{course.description}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="filtre-pays">
              Pays
            </label>
            <select id="filtre-pays" value={country ?? ""} onChange={(e) => update({ pays: e.target.value || null })} className={select}>
              <option value="">Tous les pays</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="filtre-difficulte">
              Difficulté
            </label>
            <select id="filtre-difficulte" value={difficulty ?? ""} onChange={(e) => update({ difficulte: e.target.value || null })} className={select}>
              <option value="">Toutes difficultés</option>
              {([1, 2, 3] as const).map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_LABELS[d]}
                </option>
              ))}
            </select>
            {filtering ? (
              <button
                type="button"
                onClick={() => {
                  setDraft("");
                  update({ q: null, pays: null, difficulte: null });
                }}
                className={chip}
              >
                <X className="h-4 w-4" aria-hidden /> Effacer les filtres
              </button>
            ) : showAll ? (
              <button type="button" onClick={() => chooseCourse(index)} className={chip}>
                <X className="h-4 w-4" aria-hidden /> Par type de plat
              </button>
            ) : (
              <button type="button" onClick={() => update({ type: ALL })} className={chip}>
                <LayoutGrid className="h-4 w-4" aria-hidden /> Tout voir ({recipes.length})
              </button>
            )}
          </div>
        </div>

        {list.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((r, i) => (
              <li key={r.id}>
                <RecipeCard recipe={r} priority={i < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="card p-8 text-center text-muted">Aucune recette ne correspond à cette recherche.</p>
        )}
      </section>
    </>
  );
}
