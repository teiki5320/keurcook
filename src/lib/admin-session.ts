import { createHmac, createHash, timingSafeEqual } from "node:crypto";

/**
 * Connexion admin par mot de passe unique (variable ADMIN_PASSWORD).
 * La session est un cookie signé (HMAC) contenant sa date d'expiration :
 * changer le mot de passe déconnecte automatiquement toutes les sessions.
 */
export const ADMIN_COOKIE = "alohash_admin";
export const ADMIN_SESSION_SECONDS = 7 * 24 * 60 * 60;

const password = () => process.env.ADMIN_PASSWORD ?? "";

/** Vrai si un mot de passe admin est défini (sinon l'admin est fermé). */
export const isAdminPasswordConfigured = () => password().length > 0;

const sign = (payload: string) => createHmac("sha256", `alohash-admin:${password()}`).update(payload).digest("hex");

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkAdminPassword(candidate: string): boolean {
  return isAdminPasswordConfigured() && safeEqual(candidate, password());
}

export function createAdminToken(): string {
  const exp = String(Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS);
  return `${exp}.${sign(exp)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !isAdminPasswordConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now() / 1000;
}
