"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSql, isDbConfigured, isUuid, pgError } from "@/lib/db/client";
import { getMaintenance } from "@/lib/data/settings";

export interface CommunityState {
  error?: string;
  success?: string;
}

const UNAVAILABLE = "Cette fonction n'est pas encore disponible. Réessayez bientôt.";

// ------------------------------------------------------------------ Avis

const reviewSchema = z.object({
  recipeId: z.string().refine(isUuid, "Recette introuvable."),
  authorName: z.string().trim().min(2, "Indiquez votre prénom.").max(60),
  rating: z.coerce.number().int().min(1, "Choisissez une note.").max(5),
  comment: z.string().trim().max(1500, "Votre avis est trop long (1 500 caractères maximum)."),
});

/** Dépôt d'un avis : enregistré « en attente », publié après validation dans l'admin. */
export async function submitReviewAction(_prev: CommunityState, formData: FormData): Promise<CommunityState> {
  // Champ piège invisible : rempli uniquement par les robots.
  if (String(formData.get("site") ?? "")) return { success: "Merci ! Votre avis sera publié après relecture." };
  if (!isDbConfigured || (await getMaintenance()).enabled) return { error: UNAVAILABLE };
  const parsed = reviewSchema.safeParse({
    recipeId: formData.get("recipeId"),
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    comment: formData.get("comment") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  const r = parsed.data;
  const sql = getSql();
  const [recipe] = await sql.query("select id from recipes where id = $1 and is_published", [r.recipeId]);
  if (!recipe) return { error: "Recette introuvable." };
  await sql.query("insert into recipe_reviews (recipe_id, author_name, rating, comment) values ($1, $2, $3, $4)", [
    r.recipeId,
    r.authorName,
    r.rating,
    r.comment,
  ]);
  revalidatePath("/admin", "layout");
  return { success: "Merci ! Votre avis sera publié après relecture." };
}

// ------------------------------------------------------------ Newsletter

const newsletterSchema = z.object({
  email: z.email("Adresse e-mail invalide.").max(200),
  consent: z.literal("on", { error: "Cochez la case pour accepter de recevoir la newsletter." }),
});

export async function subscribeNewsletterAction(_prev: CommunityState, formData: FormData): Promise<CommunityState> {
  if (String(formData.get("site") ?? "")) return { success: "C'est noté, à très vite dans votre boîte mail !" };
  if (!isDbConfigured) return { error: UNAVAILABLE };
  const parsed = newsletterSchema.safeParse({ email: String(formData.get("email") ?? "").trim(), consent: formData.get("consent") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  try {
    await getSql().query(
      `insert into newsletter_subscribers (email) values ($1)
       on conflict (lower(email)) do update set unsubscribed_at = null, consent_at = now()`,
      [parsed.data.email],
    );
  } catch (e) {
    return { error: pgError(e).message };
  }
  revalidatePath("/admin", "layout");
  return { success: "C'est noté, à très vite dans votre boîte mail !" };
}
