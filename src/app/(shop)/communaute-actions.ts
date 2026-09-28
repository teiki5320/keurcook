"use server";

import { z } from "zod";
import { getSql, isDbConfigured } from "@/lib/db/client";
import { isRateLimited } from "@/lib/rate-limit";

const TOO_MANY = "Trop d'envois depuis votre connexion. Réessayez dans une heure.";

export interface CommunityState {
  error?: string;
  success?: string;
}

const UNAVAILABLE = "Cette fonction n'est pas encore disponible. Réessayez bientôt.";

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
  // 5 inscriptions par heure et par visiteur.
  if (await isRateLimited("newsletter", 5, 3600)) return { error: TOO_MANY };
  try {
    await getSql().query(
      `insert into newsletter_subscribers (email) values ($1)
       on conflict (lower(email)) do update set unsubscribed_at = null, consent_at = now()`,
      [parsed.data.email],
    );
  } catch (e) {
    console.error("Inscription newsletter impossible :", e);
    return { error: "Inscription impossible pour le moment. Réessayez plus tard." };
  }
  return { success: "C'est noté, à très vite dans votre boîte mail !" };
}
