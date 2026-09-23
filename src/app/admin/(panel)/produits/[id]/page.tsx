import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { adminGetProduct, adminListCategories } from "@/lib/data/admin";

export const metadata = { title: "Modifier le produit" };

export default async function EditProductPage({ params, searchParams }: PageProps<"/admin/produits/[id]">) {
  const { id } = await params;
  const { cree } = await searchParams;
  const [product, categories] = await Promise.all([adminGetProduct(id), adminListCategories()]);
  if (!product) notFound();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest-900">{product.name}</h1>
        <div className="flex gap-2">
          {product.isActive && (
            <Link href={`/produit/${product.slug}`} target="_blank" className="btn-secondary">
              Voir sur le site
            </Link>
          )}
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <ConfirmButton message="Supprimer définitivement ce produit ? (Préférez « masquer » s'il figure dans des commandes.)">
              Supprimer
            </ConfirmButton>
          </form>
        </div>
      </div>
      {cree && <p className="mt-4 rounded-xl bg-sage-200 p-3 text-sm text-forest-800">Produit créé.</p>}
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
