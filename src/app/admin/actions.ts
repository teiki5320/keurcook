"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteConfig } from "@/lib/config";
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
  originCountry: z.string().trim().max(100).nullable(),
  originRegion: z.string().trim().max(100).nullable(),
  producer: z.string().trim().max(200).nullable(),
  images: z.array(z.string().min(1)).max(10),
  composition: z.string().trim().max(2000).nullable(),
  allergens: z.array(z.string().max(60)).max(14),
  usageTips: z.string().trim().max(2000).nullable(),
  conservation: z.string().trim().max(500).nullable(),
  tags: z.array(z.string()),
  amazonAsin: z.string().regex(/^[A-Z0-9]{10}$/, "Code ASIN invalide : 10 lettres majuscules ou chiffres (ex. B0FQQXJ23P).").nullable(),
  isActive: z.boolean(),
  featured: z.boolean(),
  variants: z.array(variantSchema).min(1, "Au moins une variante (poids / contenance) est requise."),
});

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
    originCountry: str("originCountry"),
    originRegion: str("originRegion"),
    producer: str("producer"),
    images,
    composition: str("composition"),
    allergens: String(formData.get("allergens") ?? "")
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    usageTips: str("usageTips"),
    conservation: str("conservation"),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    amazonAsin: str("amazonAsin")?.toUpperCase() ?? null,
    isActive: formData.get("isActive") === "on",
    featured: formData.get("featured") === "on",
    variants,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  const p = parsed.data;

  // --- Règles de conformité
  const claims = findHealthClaims(p.name, p.shortDescription, p.description, p.usageTips);
  if (claims.length) {
    return {
      error: `Allégation de santé interdite détectée (${claims.join(", ")}). Reformulez le texte : aucune promesse thérapeutique ou médicale n'est autorisée.`,
    };
  }
  const [category] = await sql.query("select id from categories where id = $1", [p.categoryId]);
  if (!category) return { error: "Catégorie introuvable." };
  if (p.isActive && !p.composition) return { error: "La liste des ingrédients est obligatoire pour publier un produit alimentaire." };

  const productId = p.id && isUuid(p.id) ? p.id : crypto.randomUUID();
  const keptIds = p.variants.map((v) => v.id).filter((id): id is string => Boolean(id && isUuid(id)));

  // Produit + variantes enregistrés en une seule transaction : tout ou rien.
  try {
    await sql.transaction([
      sql.query(
        `insert into products (id, name, slug, category_id, short_description, description, origin_country,
           origin_region, producer, images, composition, allergens, usage_tips, conservation, tags, is_active, featured, amazon_asin)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
         on conflict (id) do update set
           name = excluded.name, slug = excluded.slug, category_id = excluded.category_id,
           short_description = excluded.short_description, description = excluded.description,
           origin_country = excluded.origin_country, origin_region = excluded.origin_region,
           producer = excluded.producer, images = excluded.images, composition = excluded.composition,
           allergens = excluded.allergens, usage_tips = excluded.usage_tips, conservation = excluded.conservation, tags = excluded.tags,
           is_active = excluded.is_active, featured = excluded.featured, amazon_asin = excluded.amazon_asin`,
        [
          productId, p.name, slugify(p.slug || p.name), p.categoryId, p.shortDescription, p.description,
          p.originCountry, p.originRegion, p.producer, p.images, p.composition, p.allergens, p.usageTips, p.conservation,
          p.tags, p.isActive, p.featured, p.amazonAsin,
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

// ----------------------------------------------------------- Maintenance

export async function setMaintenanceAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { sql } = await requireAdmin();
  const enabled = formData.get("enabled") === "on";
  const message = String(formData.get("message") ?? "").trim().slice(0, 500);
  await sql.query(
    `insert into settings (key, value, updated_at) values ('maintenance', $1::jsonb, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [JSON.stringify({ enabled, message })],
  );
  revalidatePath("/", "layout");
  return { success: enabled ? "Mode maintenance activé : le site affiche l'écran de maintenance." : "Site rouvert." };
}

// -------------------------------------------------------------- Recettes

const COURSES = ["mijotes", "grillades", "riz-cereales", "accompagnements", "douceurs"] as const;

const recipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Nom requis.").max(120),
  slug: z.string().trim().optional(),
  countryCode: z.string().trim().min(2, "Pays requis.").max(3),
  region: z.string().trim().max(120).nullable(),
  course: z.enum(COURSES, { error: "Type de plat invalide." }),
  shortDescription: z.string().trim().max(300),
  story: z.string().trim().max(10000),
  image: z.string().trim().max(500).nullable(),
  prepMinutes: z.number().int().min(0).max(10000),
  cookMinutes: z.number().int().min(0).max(10000),
  servings: z.number().int().min(1, "Au moins une personne.").max(50),
  difficulty: z.number().int().min(1).max(3),
  ingredients: z
    .array(
      z.object({
        quantity: z.number().min(0).nullable(),
        unit: z.string().trim().max(30).nullable(),
        name: z.string().trim().min(1, "Chaque ingrédient doit avoir un nom.").max(200),
        productSlug: z.string().trim().max(200).nullable(),
      }),
    )
    .min(1, "Ajoutez au moins un ingrédient.")
    .max(60),
  steps: z
    .array(z.object({ text: z.string().trim().min(1, "Une étape est vide.").max(3000), image: z.string().trim().max(500).nullable() }))
    .min(1, "Ajoutez au moins une étape.")
    .max(40),
  tips: z.array(z.string().max(1000)).max(20),
  tags: z.array(z.string().max(60)).max(20),
  featured: z.boolean(),
  isPublished: z.boolean(),
});

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

export async function saveRecipeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { sql } = await requireAdmin();
  let ingredients: unknown;
  let steps: unknown;
  try {
    ingredients = JSON.parse(String(formData.get("ingredients") ?? "[]"));
    steps = JSON.parse(String(formData.get("steps") ?? "[]"));
  } catch {
    return { error: "Données du formulaire invalides." };
  }
  const str = (k: string) => String(formData.get(k) ?? "").trim() || null;
  const int = (k: string) => Number.parseInt(String(formData.get(k) ?? ""), 10) || 0;

  const parsed = recipeSchema.safeParse({
    id: str("id") ?? undefined,
    name: formData.get("name"),
    slug: str("slug") ?? undefined,
    countryCode: formData.get("countryCode"),
    region: str("region"),
    course: formData.get("course"),
    shortDescription: formData.get("shortDescription") ?? "",
    story: formData.get("story") ?? "",
    image: str("image"),
    prepMinutes: int("prepMinutes"),
    cookMinutes: int("cookMinutes"),
    servings: int("servings"),
    difficulty: int("difficulty") || 1,
    ingredients,
    steps,
    tips: lines(formData.get("tips")),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    isPublished: formData.get("isPublished") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  const r = parsed.data;

  const claims = findHealthClaims(r.name, r.shortDescription, r.story, ...r.steps.map((s) => s.text), ...r.tips);
  if (claims.length) {
    return { error: `Allégation de santé détectée (${claims.join(", ")}). Reformulez : aucune promesse de santé ou de bienfait n'est autorisée.` };
  }

  const recipeId = r.id && isUuid(r.id) ? r.id : crypto.randomUUID();
  try {
    await sql.query(
      `insert into recipes (id, slug, name, country_code, region, course, short_description, story, image, prep_minutes,
         cook_minutes, servings, difficulty, ingredients, steps, tips, tags, featured, is_published)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb, $15::jsonb, $16, $17, $18, $19)
       on conflict (id) do update set
         slug = excluded.slug, name = excluded.name, country_code = excluded.country_code, region = excluded.region,
         course = excluded.course, short_description = excluded.short_description, story = excluded.story,
         image = excluded.image, prep_minutes = excluded.prep_minutes, cook_minutes = excluded.cook_minutes,
         servings = excluded.servings, difficulty = excluded.difficulty, ingredients = excluded.ingredients,
         steps = excluded.steps, tips = excluded.tips, tags = excluded.tags, featured = excluded.featured,
         is_published = excluded.is_published`,
      [
        recipeId, slugify(r.slug || r.name), r.name, r.countryCode, r.region, r.course, r.shortDescription, r.story, r.image,
        r.prepMinutes, r.cookMinutes, r.servings, r.difficulty, JSON.stringify(r.ingredients), JSON.stringify(r.steps),
        r.tips, r.tags, r.featured, r.isPublished,
      ],
    );
  } catch (e) {
    const err = pgError(e);
    return { error: err.code === "23505" ? "Ce slug (adresse de la recette) est déjà utilisé." : err.message };
  }

  revalidatePath("/", "layout");
  if (!r.id) redirect(`/admin/recettes/${recipeId}?cree=1`);
  return { success: "Recette enregistrée." };
}

export async function deleteRecipeAction(formData: FormData) {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (isUuid(id)) await sql.query("delete from recipes where id = $1", [id]);
  revalidatePath("/", "layout");
  redirect("/admin/recettes");
}

// ------------------------------------------------------------------ Avis

export async function setReviewStatusAction(formData: FormData) {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (isUuid(id) && ["pending", "approved", "rejected"].includes(status)) {
    await sql.query("update recipe_reviews set status = $2 where id = $1", [id, status]);
  }
  revalidatePath("/", "layout");
}

export async function deleteReviewAction(formData: FormData) {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (isUuid(id)) await sql.query("delete from recipe_reviews where id = $1", [id]);
  revalidatePath("/", "layout");
}

// ------------------------------------------------------------ Newsletter

export async function deleteSubscriberAction(formData: FormData) {
  const { sql } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (isUuid(id)) await sql.query("delete from newsletter_subscribers where id = $1", [id]);
  revalidatePath("/admin/newsletter");
}
