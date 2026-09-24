import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "../admin-session";
import { getSql, isUuid, ORDER_SELECT, PRODUCT_SELECT } from "../db/client";
import { mapCategory, mapOrder, mapProduct } from "../db/mappers";
import type { OrderStatus } from "../types";

/**
 * Vérifie que la session admin (cookie signé) est valide, puis renvoie le
 * client SQL : les écritures admin passent côté serveur uniquement.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return { sql: getSql() };
}

export async function adminListCategories() {
  const { sql } = await requireAdmin();
  const rows = await sql.query("select * from categories order by position");
  return rows.map(mapCategory);
}

export async function adminListProducts() {
  const { sql } = await requireAdmin();
  const rows = await sql.query(`${PRODUCT_SELECT} order by p.created_at desc`);
  return rows.map(mapProduct);
}

export async function adminGetProduct(id: string) {
  const { sql } = await requireAdmin();
  if (!isUuid(id)) return null;
  const rows = await sql.query(`${PRODUCT_SELECT} where p.id = $1`, [id]);
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function adminListOrders(status?: OrderStatus) {
  const { sql } = await requireAdmin();
  const rows = status
    ? await sql.query(`${ORDER_SELECT} where o.status = $1 order by o.created_at desc limit 200`, [status])
    : await sql.query(`${ORDER_SELECT} order by o.created_at desc limit 200`);
  return rows.map(mapOrder);
}

export async function adminGetOrder(id: string) {
  const { sql } = await requireAdmin();
  if (!isUuid(id)) return null;
  const rows = await sql.query(`${ORDER_SELECT} where o.id = $1`, [id]);
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function adminDashboardStats() {
  const { sql } = await requireAdmin();
  const [counts, recent] = await Promise.all([
    sql.query(`
      select
        (select count(*) from orders where status = 'pending_payment')::int as pending,
        (select count(*) from orders where status in ('paid', 'preparing'))::int as to_ship,
        (select count(*) from products where is_active)::int as products,
        (select count(*) from product_variants where stock <= 5)::int as low_stock`),
    sql.query(`${ORDER_SELECT} order by o.created_at desc limit 5`),
  ]);
  const c = counts[0];
  return {
    pendingPayment: c.pending,
    toShip: c.to_ship,
    activeProducts: c.products,
    lowStock: c.low_stock,
    recentOrders: recent.map(mapOrder),
  };
}
