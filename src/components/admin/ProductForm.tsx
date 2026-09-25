"use client";

import { startTransition, useActionState, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { uploadPresigned } from "@vercel/blob/client";
import { saveProductAction, type ActionState } from "@/app/admin/actions";
import { ProductImage } from "@/components/product/ProductImage";
import type { Category, Product } from "@/lib/types";

interface VariantDraft {
  id?: string;
  label: string;
  price: string;
  stock: string;
  sku: string;
}

/** Envoie le fichier directement vers Vercel Blob (URL présignée délivrée par /admin/upload). */
async function uploadFile(folder: "product-images", file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const base = file.name.replace(/\.[^.]+$/, "").normalize("NFD").replace(/[^\w-]+/g, "-").slice(0, 40) || "fichier";
  // Nom unique (le jeton d'envoi est limité à ce chemin exact).
  const blob = await uploadPresigned(`${folder}/${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`, file, {
    access: "public",
    handleUploadUrl: "/admin/upload",
    contentType: file.type || undefined,
  });
  return blob.url;
}

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveProductAction, {});
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [variants, setVariants] = useState<VariantDraft[]>(
    product?.variants.map((v) => ({
      id: v.id,
      label: v.label,
      price: (v.priceCents / 100).toFixed(2),
      stock: String(v.stock),
      sku: v.sku ?? "",
    })) ?? [{ label: "", price: "", stock: "0", sku: "" }],
  );

  const variantsJson = JSON.stringify(
    variants.map((v) => ({
      id: v.id,
      label: v.label,
      priceCents: Math.round(Number(v.price.replace(",", ".")) * 100) || 0,
      stock: Number.parseInt(v.stock, 10) || 0,
      sku: v.sku || undefined,
    })),
  );

  async function onImages(files: FileList | null) {
    if (!files?.length) return;
    setUploading("images");
    setUploadError(null);
    try {
      const urls = await Promise.all([...files].map((f) => uploadFile("product-images", f)));
      setImages((prev) => [...prev, ...urls]);
    } catch (e) {
      setUploadError(`Échec de l'envoi : ${(e as Error).message}`);
    } finally {
      setUploading(null);
    }
  }

  const updateVariant = (i: number, patch: Partial<VariantDraft>) =>
    setVariants((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));

  return (
    <form
      // Soumission manuelle : évite la réinitialisation automatique du formulaire
      // par React, qui ferait perdre la saisie en cas d'erreur de validation.
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
      }}
      className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]"
    >
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="variants" value={variantsJson} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <div className="space-y-6">
        <section className="card space-y-4 p-5">
          <h2 className="font-semibold">Informations</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="name">Nom</label>
              <input id="name" name="name" defaultValue={product?.name} required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="slug">Slug (URL)</label>
              <input id="slug" name="slug" defaultValue={product?.slug} placeholder="généré depuis le nom" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="categoryId">Catégorie</label>
              <select id="categoryId" name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="shortDescription">Accroche (courte)</label>
              <input id="shortDescription" name="shortDescription" defaultValue={product?.shortDescription} maxLength={300} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="description">Description</label>
              <textarea id="description" name="description" defaultValue={product?.description} rows={8} className="input" />
              <p className="mt-1 text-xs text-muted">
                Aucune allégation thérapeutique, médicale ou de santé (ex. : « apaise », « soulage », « sommeil », « stress »).
                Décrivez l&apos;origine, les arômes, la culture, la composition. Les termes à risque sont bloqués à
                l&apos;enregistrement.
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="tags">Mots-clés (séparés par des virgules)</label>
              <input id="tags" name="tags" defaultValue={product?.tags.join(", ")} className="input" />
            </div>
          </div>
        </section>

        <section className="card space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Variantes (poids / contenance)</h2>
            <button type="button" className="btn-secondary py-1.5" onClick={() => setVariants((v) => [...v, { label: "", price: "", stock: "0", sku: "" }])}>
              <Plus className="h-4 w-4" aria-hidden /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={v.id ?? `new-${i}`} className="grid grid-cols-2 gap-2 rounded-xl bg-sage-50 p-3 sm:grid-cols-[1.2fr_1fr_1fr_1fr_auto] sm:items-end">
                <div>
                  <label className="label text-xs">Libellé</label>
                  <input value={v.label} onChange={(e) => updateVariant(i, { label: e.target.value })} placeholder="5 g, 10 ml…" className="input" required />
                </div>
                <div>
                  <label className="label text-xs">Prix TTC (€)</label>
                  <input value={v.price} onChange={(e) => updateVariant(i, { price: e.target.value })} inputMode="decimal" className="input" required />
                </div>
                <div>
                  <label className="label text-xs">Stock</label>
                  <input value={v.stock} onChange={(e) => updateVariant(i, { stock: e.target.value })} inputMode="numeric" className="input" />
                </div>
                <div>
                  <label className="label text-xs">Réf. (SKU)</label>
                  <input value={v.sku} onChange={(e) => updateVariant(i, { sku: e.target.value })} className="input" />
                </div>
                <button
                  type="button"
                  aria-label="Supprimer la variante"
                  disabled={variants.length === 1}
                  onClick={() => setVariants((prev) => prev.filter((_, idx) => idx !== i))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-white hover:text-terracotta-dark disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="font-semibold">Photos</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {images.map((src, i) => (
              <div key={src} className="group relative aspect-square overflow-hidden rounded-xl bg-sage-100">
                <ProductImage src={src} alt="" sizes="120px" />
                {i === 0 && <span className="absolute top-1 left-1 rounded bg-white/90 px-1.5 text-[10px] font-semibold">Principale</span>}
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((s) => s !== src))}
                  className="absolute top-1 right-1 rounded-full bg-white/90 p-1 text-terracotta-dark"
                  aria-label="Retirer l'image"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => setImages((prev) => [src, ...prev.filter((s) => s !== src)])}
                    className="absolute inset-x-1 bottom-1 rounded bg-white/90 px-1 text-[10px] font-semibold"
                  >
                    Mettre en principale
                  </button>
                )}
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-sage-300 text-xs text-muted hover:border-forest-600">
              <Upload className="h-5 w-5" aria-hidden />
              {uploading === "images" ? "Envoi…" : "Ajouter"}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple className="sr-only" onChange={(e) => onImages(e.target.files)} />
            </label>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="card space-y-4 p-5">
          <h2 className="font-semibold">Publication</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} className="h-4 w-4 accent-forest-700" />
            En ligne (visible sur le site)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="h-4 w-4 accent-forest-700" />
            Mis en avant sur l&apos;accueil
          </label>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="font-semibold">Origine & étiquetage</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="originCountry">Pays d&apos;origine</label>
              <input id="originCountry" name="originCountry" defaultValue={product?.originCountry ?? ""} placeholder="Cameroun, Sénégal…" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="originRegion">Région</label>
              <input id="originRegion" name="originRegion" defaultValue={product?.originRegion ?? ""} className="input" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="producer">Producteur</label>
            <input id="producer" name="producer" defaultValue={product?.producer ?? ""} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="composition">Ingrédients</label>
            <textarea id="composition" name="composition" defaultValue={product?.composition ?? ""} rows={2} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="allergens">Allergènes (séparés par des virgules)</label>
            <input id="allergens" name="allergens" defaultValue={product?.allergens.join(", ") ?? ""} placeholder="arachide, poisson…" className="input" />
            <p className="mt-1 text-xs text-muted">Laisser vide si aucun allergène majeur.</p>
          </div>
          <div>
            <label className="label" htmlFor="usageTips">En cuisine (conseils)</label>
            <textarea id="usageTips" name="usageTips" defaultValue={product?.usageTips ?? ""} rows={2} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="conservation">Conservation</label>
            <input id="conservation" name="conservation" defaultValue={product?.conservation ?? ""} className="input" />
          </div>
        </section>

        {uploadError && <p role="alert" className="rounded-xl bg-terracotta/10 p-3 text-sm text-terracotta-dark">{uploadError}</p>}
        {state.error && <p role="alert" className="rounded-xl bg-terracotta/10 p-3 text-sm text-terracotta-dark">{state.error}</p>}
        {state.success && <p role="status" className="rounded-xl bg-sage-200 p-3 text-sm text-forest-800">{state.success}</p>}

        <button type="submit" disabled={pending || uploading !== null} className="btn-primary w-full py-3">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
