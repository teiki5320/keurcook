"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/data/admin";
import { isDbConfigured } from "@/lib/db/client";
import { isRateLimited } from "@/lib/rate-limit";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, checkAdminPassword, createAdminToken } from "@/lib/admin-session";

export interface ActionState {
  error?: string;
  success?: string;
}

// ------------------------------------------------------------------ Auth

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Mot de passe requis." };
  // Sans base, ni maintenance ni limitation des essais : connexion refusée.
  if (!isDbConfigured) return { error: "Espace admin non configuré." };
  // 5 essais par quart d'heure et par adresse IP.
  if (await isRateLimited("admin-login", 5, 15 * 60)) {
    return { error: "Trop de tentatives. Réessayez dans un quart d'heure." };
  }
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
