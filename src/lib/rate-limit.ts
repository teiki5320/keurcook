import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getSql, isDbConfigured } from "./db/client";

/** Adresse IP du visiteur, hachée : on ne conserve jamais l'adresse en clair. */
async function clientKey(scope: string): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnue";
  const hash = createHash("sha256").update(`${ip}|${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex").slice(0, 32);
  return `${scope}:${hash}`;
}

/**
 * Limite le nombre d'actions par visiteur (connexion admin, newsletter).
 * Enregistre la tentative et renvoie vrai si `max` tentatives ont déjà eu lieu
 * dans les `windowSeconds` dernières secondes. Sans base (démo) ou en cas
 * d'erreur, ne bloque jamais.
 */
export async function isRateLimited(scope: string, max: number, windowSeconds: number): Promise<boolean> {
  if (!isDbConfigured) return false;
  try {
    const key = await clientKey(scope);
    const [row] = await getSql().query(
      `with purge as (delete from rate_limits where created_at < now() - interval '1 day'),
            ins as (insert into rate_limits (key) values ($1))
       select count(*)::int as n from rate_limits where key = $1 and created_at > now() - make_interval(secs => $2)`,
      [key, windowSeconds],
    );
    return (row?.n ?? 0) >= max;
  } catch {
    return false;
  }
}
