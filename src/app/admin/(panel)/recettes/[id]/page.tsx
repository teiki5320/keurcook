import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteRecipeAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { RecipeForm } from "@/components/admin/RecipeForm";
import { anton } from "@/components/nuage/typography";
import { COUNTRIES } from "@/lib/countries";
import { adminGetRecipe, adminListProducts } from "@/lib/data/admin";

export const metadata = { title: "Modifier la recette" };

export default async function EditRecipePage({ params, searchParams }: PageProps<"/admin/recettes/[id]">) {
  const { id } = await params;
  const { cree } = await searchParams;
  const [recipe, products] = await Promise.all([adminGetRecipe(id), adminListProducts()]);
  if (!recipe) notFound();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(36px,4.5vw,56px)" }}>
          {recipe.name}
          <span className="text-[#ff7a3d]">.</span>
        </h1>
        <div className="flex gap-2">
          {recipe.isPublished && (
            <Link href={`/recette/${recipe.slug}`} target="_blank" className="btn-secondary">
              Voir sur le site
            </Link>
          )}
          <form action={deleteRecipeAction}>
            <input type="hidden" name="id" value={recipe.id} />
            <ConfirmButton message="Supprimer définitivement cette recette et ses avis ? (Vous pouvez aussi la dépublier.)">Supprimer</ConfirmButton>
          </form>
        </div>
      </div>
      {cree && <p className="mt-4 rounded-xl bg-[#ffc46b]/15 p-3 text-sm text-[#ffc46b]">Recette créée.</p>}
      <RecipeForm recipe={recipe} countries={COUNTRIES} products={products.map((p) => ({ slug: p.slug, name: p.name }))} />
    </div>
  );
}
