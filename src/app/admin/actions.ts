"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteConfig, LEGAL_THC_MAX } from "@/lib/config";
import { findHealthClaims } from "@/lib/compliance";
import { adminGetOrder, requireAdmin } from "@/lib/data/admin";
import { orderUrl } from "@/lib/data/orders";
import { sendEmailSafe } from "@/lib/email/sender";
import { orderStatusEmail } from "@/lib/email/templates";
import { slugify } from "@/lib/format";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, checkAdminPassword, createAdminToken } from "@/lib/admin-session";
import type { OrderStatus } from "@/lib/types";

export interface ActionState {
  error?: string;
  success?: string;
}

// ------------------------------------------------------------------ Auth

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Mot de passe requis." };
  if (!checkAdminPassword(password)) {
    // Ralentit les essais en série.
    await new Promise((r) => setTimeout(r, 1000));
    return { error: "Mot de passe incorrect." };
  }
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

// -------------------------------------------------------------- Fichiers

/**
 * Prépare l'envoi d'une image ou d'un certificat : le serveur (admin vérifié)
 * délivre une URL signée à usage unique, le navigateur y envoie le fichier.
 */
export async function createUploadUrlAction(bucket: "product-images" | "certificates", fileName: string) {
  const { supabase } = await requireAdmin();
  if (bucket !== "product-images" && bucket !== "certificates") throw new Error("Dossier inconnu.");
  const ext = fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const base = fileName.replace(/\.[^.]+$/, "").normalize("NFD").replace(/[^\w-]+/g, "-").slice(0, 40);
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`;
  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
  if (error || !data) throw new Error(error?.message ?? "Envoi impossible.");
  const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  return { path, token: data.token, publicUrl };
}

// -------------------------------------------------------------- Produits

const variantSchema = z.object({
  id: z.string().optional(),
  label: z.string().trim().min(1, "Libellé de variante requis."),
  priceCents: z.number().int().min(0),
  stock: z.number().int().min(0),
  sku: z.string().trim().optional(),
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Nom requis."),
  slug: z.string().trim().optional(),
  categoryId: z.uuid("Catégorie requise."),
  shortDescription: z.string().trim().max(300),
  description: z.string().trim().max(10000),
  cbdRate: z.number().min(0).max(100).nullable(),
  thcRate: z.number().min(0).max(LEGAL_THC_MAX, `Le taux de THC doit être inférieur ou égal à ${LEGAL_THC_MAX} %.`).nullable(),
  originRegion: z.string().trim().nullable(),
  producer: z.string().trim().nullable(),
  images: z.array(z.string().min(1)).max(10),
  coaUrl: z.string().trim().nullable(),
  tags: z.array(z.string()),
  isActive: z.boolean(),
  featured: z.boolean(),
  variants: z.array(variantSchema).min(1, "Au moins une variante (poids / contenance) est requise."),
});

function numOrNull(v: FormDataEntryValue | null) {
  const s = String(v ?? "").trim().replace(",", ".");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export async function saveProductAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();

  let variants: unknown;
  let images: unknown;
  try {
    variants = JSON.parse(String(formData.get("variants") ?? "[]"));
    images = JSON.parse(String(formData.get("images") ?? "[]"));
  } catch {
    return { error: "Données du formulaire invalides." };
  }

  const str = (k: string) => {
    const v = String(formData.get(k) ?? "").trim();
    return v || null;
  };

  const parsed = productSchema.safeParse({
    id: str("id") ?? undefined,
    name: formData.get("name"),
    slug: str("slug") ?? undefined,
    categoryId: formData.get("categoryId"),
    shortDescription: formData.get("shortDescription") ?? "",
    description: formData.get("description") ?? "",
    cbdRate: numOrNull(formData.get("cbdRate")),
    thcRate: numOrNull(formData.get("thcRate")),
    originRegion: str("originRegion"),
    producer: str("producer"),
    images,
    coaUrl: str("coaUrl"),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    isActive: formData.get("isActive") === "on",
    featured: formData.get("featured") === "on",
    variants,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  const p = parsed.data;

  // --- Règles de conformité
  const claims = findHealthClaims(p.name, p.shortDescription, p.description);
  if (claims.length) {
    return {
      error: `Allégation de santé interdite détectée (${claims.join(", ")}). Reformulez le texte : aucune promesse thérapeutique ou médicale n'est autorisée.`,
    };
  }
  const { data: category } = await supabase.from("categories").select("kind").eq("id", p.categoryId).single();
  if (category?.kind === "cbd" && p.isActive) {
    if (p.thcRate === null) return { error: "Le taux de THC est obligatoire pour publier un produit CBD." };
    if (p.cbdRate === null) return { error: "Le taux de CBD est obligatoire pour publier un produit CBD." };
    if (!p.coaUrl) return { error: "Le certificat d'analyse (PDF) est obligatoire pour publier un produit CBD." };
    if (!p.originRegion || !p.producer) return { error: "La région d'origine et le producteur sont obligatoires pour un produit CBD." };
  }

  const row = {
    name: p.name,
    slug: slugify(p.slug || p.name),
    category_id: p.categoryId,
    short_description: p.shortDescription,
    description: p.description,
    cbd_rate: p.cbdRate,
    thc_rate: p.thcRate,
    origin_region: p.originRegion,
    producer: p.producer,
    images: p.images,
    coa_url: p.coaUrl,
    tags: p.tags,
    is_active: p.isActive,
    featured: p.featured,
  };

  let productId = p.id;
  if (productId) {
    const { error } = await supabase.from("products").update(row).eq("id", productId);
    if (error) return { error: error.code === "23505" ? "Ce slug est déjà utilisé." : error.message };
  } else {
    const { data, error } = await supabase.from("products").insert(row).select("id").single();
    if (error) return { error: error.code === "23505" ? "Ce slug est déjà utilisé." : error.message };
    productId = data.id as string;
  }

  // --- Variantes : mise à jour, création, suppression
  const { data: existing } = await supabase.from("product_variants").select("id").eq("product_id", productId);
  const keptIds = new Set(p.variants.map((v) => v.id).filter(Boolean));
  const toDelete = (existing ?? []).map((v) => v.id as string).filter((id) => !keptIds.has(id));
  if (toDelete.length) {
    const { error } = await supabase.from("product_variants").delete().in("id", toDelete);
    if (error) return { error: error.message };
  }
  for (const [position, v] of p.variants.entries()) {
    const vrow = {
      product_id: productId,
      label: v.label,
      price_cents: v.priceCents,
      stock: v.stock,
      sku: v.sku || null,
      position,
    };
    const { error } = v.id
      ? await supabase.from("product_variants").update(vrow).eq("id", v.id)
      : await supabase.from("product_variants").insert(vrow);
    if (error) return { error: error.code === "23505" ? `Référence (SKU) déjà utilisée : ${v.sku}` : error.message };
  }

  revalidatePath("/", "layout");
  if (!p.id) redirect(`/admin/produits/${productId}?cree=1`);
  return { success: "Produit enregistré." };
}

export async function deleteProductAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/produits");
}

// ---------------------------------------------------------------- Stocks

export async function updateStockAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const updates: Array<{ id: string; stock: number }> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("stock:")) continue;
    const stock = Number(value);
    if (!Number.isInteger(stock) || stock < 0) return { error: "Les stocks doivent être des entiers positifs." };
    updates.push({ id: key.slice(6), stock });
  }
  for (const u of updates) {
    const { error } = await supabase.from("product_variants").update({ stock: u.stock }).eq("id", u.id);
    if (error) return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: `${updates.length} stock(s) mis à jour.` };
}

// ------------------------------------------------------------- Commandes

const STATUSES: OrderStatus[] = ["pending_payment", "paid", "preparing", "shipped", "delivered", "cancelled"];

export async function updateOrderAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  const tracking = String(formData.get("trackingNumber") ?? "").trim() || null;
  const notify = formData.get("notify") === "on";
  if (!STATUSES.includes(status)) return { error: "Statut invalide." };

  const before = await adminGetOrder(id);
  if (!before) return { error: "Commande introuvable." };

  if (status === "cancelled" && before.status !== "cancelled") {
    const { error } = await supabase.rpc("cancel_order", { p_order_id: id });
    if (error) return { error: error.message };
    await supabase.from("orders").update({ tracking_number: tracking }).eq("id", id);
  } else {
    if (before.status === "cancelled" && status !== "cancelled") {
      return { error: "Une commande annulée ne peut pas être réactivée (le stock a été remis en vente)." };
    }
    const { error } = await supabase.from("orders").update({ status, tracking_number: tracking }).eq("id", id);
    if (error) return { error: error.message };
  }

  const after = await adminGetOrder(id);
  if (notify && after && after.status !== before.status) {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const base = host ? `${h.get("x-forwarded-proto") ?? "https"}://${host}` : siteConfig.url;
    await sendEmailSafe({ to: after.email, ...orderStatusEmail(after, orderUrl(after, base)) });
  }

  revalidatePath("/admin", "layout");
  revalidatePath("/", "layout");
  return { success: notify && after?.status !== before.status ? "Commande mise à jour, client notifié." : "Commande mise à jour." };
}
