import { ProductForm } from "@/components/admin/ProductForm";
import { adminListCategories } from "@/lib/data/admin";

export const metadata = { title: "Nouveau produit" };

export default async function NewProductPage() {
  const categories = await adminListCategories();
  return (
    <div>
      <h1 className="font-display text-3xl text-forest-900">Nouveau produit</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
