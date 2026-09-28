import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "../admin-session";
import { getSql } from "../db/client";

/**
 * Vérifie que la session admin (cookie signé) est valide, puis renvoie le
 * client SQL : les écritures admin passent côté serveur uniquement.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return { sql: getSql() };
}
