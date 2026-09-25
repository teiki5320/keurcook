import { RecipeForm } from "@/components/admin/RecipeForm";
import { anton } from "@/components/nuage/typography";
import { COUNTRIES } from "@/lib/countries";
import { adminListProducts } from "@/lib/data/admin";

export const metadata = { title: "Nouvelle recette" };

export default async function NewRecipePage() {
  const products = await adminListProducts();
  return (
    <div>
      <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(36px,4.5vw,56px)" }}>
        Nouvelle recette<span className="text-[#ff7a3d]">.</span>
      </h1>
      <RecipeForm countries={COUNTRIES} products={products.map((p) => ({ slug: p.slug, name: p.name }))} />
    </div>
  );
}
