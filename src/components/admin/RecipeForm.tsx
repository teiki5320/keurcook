"use client";

import { startTransition, useActionState, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react";
import { uploadPresigned } from "@vercel/blob/client";
import { saveRecipeAction, type ActionState } from "@/app/admin/actions";
import { ProductImage } from "@/components/product/ProductImage";
import { DIFFICULTY_LABELS, RECIPE_COURSES } from "@/lib/recipe-utils";
import type { Country, Recipe } from "@/lib/types";

interface IngredientDraft {
  quantity: string;
  unit: string;
  name: string;
  productSlug: string;
}

const toDraft = (r?: Recipe): IngredientDraft[] =>
  r?.ingredients.map((i) => ({
    quantity: i.quantity === null ? "" : String(i.quantity).replace(".", ","),
    unit: i.unit ?? "",
    name: i.name,
    productSlug: i.productSlug ?? "",
  })) ?? [{ quantity: "", unit: "", name: "", productSlug: "" }];

/** Déplace l'élément i d'un cran (d = -1 ou 1). */
function move<T>(list: T[], i: number, d: number) {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

async function uploadImage(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "photo";
  const blob = await uploadPresigned(`recipe-images/${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`, file, {
    access: "public",
    handleUploadUrl: "/admin/upload",
    contentType: file.type || undefined,
  });
  return blob.url;
}

export function RecipeForm({
  recipe,
  countries,
  products,
}: {
  recipe?: Recipe;
  countries: Country[];
  products: { slug: string; name: string }[];
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveRecipeAction, {});
  const [image, setImage] = useState(recipe?.image ?? "");
  const [ingredients, setIngredients] = useState<IngredientDraft[]>(toDraft(recipe));
  const [steps, setSteps] = useState<string[]>(recipe?.steps.map((s) => s.text) ?? [""]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const ingredientsJson = JSON.stringify(
    ingredients
      .filter((i) => i.name.trim())
      .map((i) => {
        const q = Number(i.quantity.replace(",", "."));
        return { quantity: i.quantity.trim() && Number.isFinite(q) ? q : null, unit: i.unit.trim() || null, name: i.name.trim(), productSlug: i.productSlug || null };
      }),
  );
  const stepsJson = JSON.stringify(steps.filter((s) => s.trim()).map((text, i) => ({ text: text.trim(), image: recipe?.steps[i]?.image ?? null })));

  const setIng = (i: number, patch: Partial<IngredientDraft>) => setIngredients((prev) => prev.map((x, k) => (k === i ? { ...x, ...patch } : x)));

  async function onImage(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      setImage(await uploadImage(file));
    } catch (e) {
      setUploadError(`Échec de l'envoi : ${(e as Error).message}. Vous pouvez aussi m'envoyer la photo pour l'ajouter au site.`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
      }}
      className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]"
    >
      {recipe && <input type="hidden" name="id" value={recipe.id} />}
      <input type="hidden" name="ingredients" value={ingredientsJson} />
      <input type="hidden" name="steps" value={stepsJson} />
      <input type="hidden" name="image" value={image} />

      <div className="space-y-6">
        <section className="card space-y-4 p-5">
          <h2 className="font-display text-xl">Présentation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="name">Nom du plat</label>
              <input id="name" name="name" defaultValue={recipe?.name} required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="slug">Adresse (slug)</label>
              <input id="slug" name="slug" defaultValue={recipe?.slug} placeholder="générée depuis le nom" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="course">Type de plat</label>
              <select id="course" name="course" defaultValue={recipe?.course ?? "mijotes"} className="input">
                {RECIPE_COURSES.map((c) => (
                  <option key={c.key} value={c.key}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="countryCode">Pays</label>
              <select id="countryCode" name="countryCode" defaultValue={recipe?.countryCode ?? countries[0]?.code} className="input">
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="region">Région / ville (facultatif)</label>
              <input id="region" name="region" defaultValue={recipe?.region ?? ""} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="shortDescription">Accroche</label>
              <input id="shortDescription" name="shortDescription" defaultValue={recipe?.shortDescription} maxLength={300} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="story">Histoire du plat</label>
              <textarea id="story" name="story" defaultValue={recipe?.story} rows={6} className="input" />
              <p className="mt-1 text-xs text-muted">Séparez les paragraphes par une ligne vide.</p>
            </div>
          </div>
        </section>

        <section className="card space-y-3 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Ingrédients</h2>
            <button type="button" onClick={() => setIngredients((p) => [...p, { quantity: "", unit: "", name: "", productSlug: "" }])} className="btn-secondary px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" aria-hidden /> Ajouter
            </button>
          </div>
          <p className="text-xs text-muted">Quantités pour le nombre de personnes indiqué. Liez un ingrédient à un produit de la boutique pour afficher « Produit rare » et le bouton d&apos;ajout au panier.</p>
          <ul className="space-y-2">
            {ingredients.map((ing, i) => (
              <li key={i} className="grid grid-cols-[70px_90px_1fr_auto] gap-2 rounded-xl border border-sage-200 p-2 sm:grid-cols-[70px_110px_1fr_200px_auto]">
                <input aria-label="Quantité" value={ing.quantity} onChange={(e) => setIng(i, { quantity: e.target.value })} placeholder="Qté" inputMode="decimal" className="input px-2" />
                <input aria-label="Unité" value={ing.unit} onChange={(e) => setIng(i, { unit: e.target.value })} placeholder="g, cl…" className="input px-2" />
                <input aria-label="Ingrédient" value={ing.name} onChange={(e) => setIng(i, { name: e.target.value })} placeholder="feuilles de ndolé séchées" className="input px-2" />
                <select aria-label="Produit de la boutique" value={ing.productSlug} onChange={(e) => setIng(i, { productSlug: e.target.value })} className="input col-span-3 px-2 sm:col-span-1">
                  <option value="">— pas de produit —</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
                <div className="row-start-1 flex items-center gap-0.5 sm:row-auto">
                  <button type="button" onClick={() => setIngredients((p) => move(p, i, -1))} aria-label="Monter" className="rounded p-1 hover:bg-sage-100"><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setIngredients((p) => move(p, i, 1))} aria-label="Descendre" className="rounded p-1 hover:bg-sage-100"><ArrowDown className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setIngredients((p) => p.filter((_, k) => k !== i))} aria-label="Supprimer l'ingrédient" className="rounded p-1 text-[#ff7a3d] hover:bg-sage-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card space-y-3 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Étapes</h2>
            <button type="button" onClick={() => setSteps((p) => [...p, ""])} className="btn-secondary px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" aria-hidden /> Ajouter
            </button>
          </div>
          <ol className="space-y-2">
            {steps.map((text, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 w-7 shrink-0 text-2xl leading-none text-[#ff7a3d]" style={{ fontFamily: "var(--font-anton), sans-serif" }}>{i + 1}</span>
                <textarea aria-label={`Étape ${i + 1}`} value={text} onChange={(e) => setSteps((p) => p.map((s, k) => (k === i ? e.target.value : s)))} rows={3} className="input flex-1" />
                <div className="flex flex-col gap-0.5">
                  <button type="button" onClick={() => setSteps((p) => move(p, i, -1))} aria-label="Monter" className="rounded p-1 hover:bg-sage-100"><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setSteps((p) => move(p, i, 1))} aria-label="Descendre" className="rounded p-1 hover:bg-sage-100"><ArrowDown className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setSteps((p) => p.filter((_, k) => k !== i))} aria-label="Supprimer l'étape" className="rounded p-1 text-[#ff7a3d] hover:bg-sage-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="font-display text-xl">Astuces & mots-clés</h2>
          <div>
            <label className="label" htmlFor="tips">Astuces et variantes (une par ligne)</label>
            <textarea id="tips" name="tips" defaultValue={recipe?.tips.join("\n")} rows={3} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="tags">Mots-clés (séparés par des virgules)</label>
            <input id="tags" name="tags" defaultValue={recipe?.tags.join(", ")} placeholder="fête, arachide…" className="input" />
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="card space-y-4 p-5">
          <h2 className="font-display text-xl">Publication</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isPublished" defaultChecked={recipe?.isPublished ?? true} className="h-4 w-4 accent-[#ff7a3d]" />
            Publiée (visible sur le site)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={recipe?.featured ?? false} className="h-4 w-4 accent-[#ff7a3d]" />
            Mise en avant (en tête des carrousels)
          </label>
        </section>

        <section className="card space-y-3 p-5">
          <h2 className="font-display text-xl">Photo</h2>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sage-100">
            <ProductImage src={image || null} alt="" sizes="360px" />
          </div>
          <div>
            <label className="label" htmlFor="image-path">Adresse de la photo</label>
            <input id="image-path" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/recipes/ndole.webp" className="input" />
          </div>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sage-300 p-3 text-sm text-muted hover:border-[#ff7a3d]">
            <Upload className="h-4 w-4" aria-hidden /> {uploading ? "Envoi…" : "Envoyer une photo"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(e) => onImage(e.target.files)} />
          </label>
          {uploadError && <p role="alert" className="text-xs text-[#ff7a3d]">{uploadError}</p>}
        </section>

        <section className="card grid grid-cols-2 gap-3 p-5">
          <h2 className="col-span-2 font-display text-xl">Temps & portions</h2>
          <div>
            <label className="label" htmlFor="prepMinutes">Préparation (min)</label>
            <input id="prepMinutes" name="prepMinutes" type="number" min={0} defaultValue={recipe?.prepMinutes ?? 20} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="cookMinutes">Cuisson (min)</label>
            <input id="cookMinutes" name="cookMinutes" type="number" min={0} defaultValue={recipe?.cookMinutes ?? 30} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="servings">Personnes</label>
            <input id="servings" name="servings" type="number" min={1} max={50} defaultValue={recipe?.servings ?? 4} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="difficulty">Difficulté</label>
            <select id="difficulty" name="difficulty" defaultValue={recipe?.difficulty ?? 1} className="input">
              {([1, 2, 3] as const).map((d) => (
                <option key={d} value={d}>{DIFFICULTY_LABELS[d]}</option>
              ))}
            </select>
          </div>
        </section>

        {state.error && <p role="alert" className="rounded-xl bg-[#ff7a3d]/15 p-3 text-sm text-[#ff7a3d]">{state.error}</p>}
        {state.success && <p role="status" className="rounded-xl bg-[#ffc46b]/15 p-3 text-sm text-[#ffc46b]">{state.success}</p>}
        <button type="submit" disabled={pending || uploading} className="btn-primary w-full py-3">
          {pending ? "Enregistrement…" : "Enregistrer la recette"}
        </button>
      </div>
    </form>
  );
}
