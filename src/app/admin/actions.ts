"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteConfig, LEGAL_THC_MAX } from "@/lib/config";
import { findHealthClaims } from "@/lib/compliance";
import { adminGetOrder, requireAdmin } from "@/lib/data/admin";
import { isUuid, pgError } from "@/lib/db/client";
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
  const { sql } = await requireAdmin();

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
  const [category] = await sql.query("select kind from categories where id = $1", [p.categoryId]);
  if (!category) return { error: "Catégorie introuvable." };
  if (category.kind === "cbd" && p.isActive) {
    if (p.thcRate === null) return { error: "Le taux de THC est obligatoire pour publier un produit CBD." };
    if (p.cbdRate === null) return { error: "Le taux de CBD est obligatoire pour publier un produit CBD." };
    if (!p.coaUrl) return { error: "Le certificat d'analyse (PDF) est obligatoire pour publier un produit CBD." };
    if (!p.originRegion || !p.producer) return { error: "La région d'origine et le producteur sont obligatoires pour un produit CBD." };
  }

  const productId = p.id && isUuid(p.id) ? p.id : crypto.randomUUID();
  const keptIds = p.variants.map((v) => v.id).filter((id): id is string => Boolean(id && isUuid(id)));

  // Produit + variantes enregistrés en une seule transaction : tout ou rien.
  try {
    await sql.transaction([
      sql.query(
        `insert into products (id, name, slug, category_id, short_description, description, cbd_rate, thc_rate,
           origin_region, producer, images, coa_url, tags, is_active, featured)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         on conflict (id) do update set
           name = excluded.name, slug = excluded.slug, category_id = excluded.category_id,
           short_description = excluded.short_description, description = excluded.description,
           cbd_rate = excluded.cbd_rate, thc_rate = excluded.thc_rate, origin_region = excluded.origin_region,
           producer = excluded.producer, images = excluded.images, coa_url = excluded.coa_url, tags = excluded.tags,
           is_active = excluded.is_active, featured = excluded.featured`,
        [
          productId, p.name, slugify(p.slug || p.name), p.categoryId, p.shortDescription, p.description,
          p.cbdRate, p.thcRate, p.originRegion, p.producer, p.images, p.coaUrl, p.tags, p.isActive, p.featured,
        ],
      ),
      // Variantes retirées du formulaire.
      sql.query("delete from product_variants where product_id = $1 and not (id = any($2::uuid[]))", [productId, keptIds]),
      ...p.variants.map((v, position) =>
        v.id && isUuid(v.id)
          ? sql.query(
              "update product_variants set label = $3, price_cents = $4, stock = $5, sku = $6, position = $7 where id = $1 and product_id = $2",
              [v.id, productId, v.label, v.priceCents, v.stock, v.sku || null, position],
            )
          : sql.query(
              "insert into product_variants (product_id, label, price_cents, stock, sku, position) values ($1, $2, $3, $4, $5, $6)",
              [productId, v.label, v.priceCents, v.stock, v.sku || null, position],
            ),
      ),
    ]);
  } catch (e) {
    const err = pgError(e);
    if (err.code === "23505") {
      return { error: err.constraint?.includes("sku") ? "Une référence (SKU) est déjà utilisée par un autre produit." : "Ce slug est déjà utilisé." };
    }
    return { error: err.message };
  }

  revalidatePath("/", "layout");
  if (!p.id) redirect(`/admin/produits/${productId}?cree=1`);
  return { success: "Produit enregistré." };
}

export async function deleteProductAction(formData: FormData) {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (isUuid(id)) await sql.query("delete from products where id = $1", [id]);
  revalidatePath("/", "layout");
  redirect("/admin/produits");
}

// ---------------------------------------------------------------- Stocks

export async function updateStockAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { sql } = await requireAdmin();
  const updates: Array<{ id: string; stock: number }> = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("stock:")) continue;
    const stock = Number(value);
    if (!Number.isInteger(stock) || stock < 0) return { error: "Les stocks doivent être des entiers positifs." };
    const id = key.slice(6);
    if (isUuid(id)) updates.push({ id, stock });
  }
  if (updates.length) {
    await sql.transaction(updates.map((u) => sql.query("update product_variants set stock = $2 where id = $1", [u.id, u.stock])));
  }
  revalidatePath("/", "layout");
  return { success: `${updates.length} stock(s) mis à jour.` };
}

// ------------------------------------------------------------- Commandes

const STATUSES: OrderStatus[] = ["pending_payment", "paid", "preparing", "shipped", "delivered", "cancelled"];

export async function updateOrderAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  const tracking = String(formData.get("trackingNumber") ?? "").trim() || null;
  const notify = formData.get("notify") === "on";
  if (!STATUSES.includes(status)) return { error: "Statut invalide." };

  const before = await adminGetOrder(id);
  if (!before) return { error: "Commande introuvable." };

  if (status === "cancelled" && before.status !== "cancelled") {
    // Annulation + remise en stock (fonction SQL cancel_order), dans la même transaction.
    await sql.transaction([
      sql.query("select cancel_order($1)", [id]),
      sql.query("update orders set tracking_number = $2 where id = $1", [id, tracking]),
    ]);
  } else {
    if (before.status === "cancelled" && status !== "cancelled") {
      return { error: "Une commande annulée ne peut pas être réactivée (le stock a été remis en vente)." };
    }
    await sql.query("update orders set status = $2, tracking_number = $3 where id = $1", [id, status, tracking]);
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
