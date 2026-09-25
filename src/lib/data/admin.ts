import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "../admin-session";
import { getSql, isUuid, ORDER_SELECT, PRODUCT_SELECT } from "../db/client";
import { mapCategory, mapOrder, mapProduct, mapRecipe, mapReview, mapSubscriber } from "../db/mappers";
import type { OrderStatus, ReviewStatus } from "../types";

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
        (select count(*) from product_variants where stock <= 5)::int as low_stock,
        (select count(*) from recipes where is_published)::int as recipes,
        (select count(*) from recipe_reviews where status = 'pending')::int as reviews,
        (select count(*) from newsletter_subscribers where unsubscribed_at is null)::int as subscribers`),
    sql.query(`${ORDER_SELECT} order by o.created_at desc limit 5`),
  ]);
  const c = counts[0];
  return {
    pendingPayment: c.pending,
    toShip: c.to_ship,
    activeProducts: c.products,
    lowStock: c.low_stock,
    publishedRecipes: c.recipes,
    pendingReviews: c.reviews,
    subscribers: c.subscribers,
    recentOrders: recent.map(mapOrder),
  };
}

/** Compteurs affichés dans le menu de l'admin. */
export async function adminNavCounts() {
  const { sql } = await requireAdmin();
  try {
    const [c] = await sql.query(`
      select
        (select count(*) from recipe_reviews where status = 'pending')::int as reviews,
        (select count(*) from orders where status in ('paid', 'preparing'))::int as orders`);
    return { reviews: c.reviews as number, orders: c.orders as number };
  } catch {
    // Schéma pas encore à jour : le menu s'affiche sans compteurs.
    return { reviews: 0, orders: 0 };
  }
}

// ------------------------------------------------------------- Recettes

export async function adminListRecipes() {
  const { sql } = await requireAdmin();
  const rows = await sql.query(`
    select r.*,
      (select count(*) from recipe_reviews v where v.recipe_id = r.id and v.status = 'approved')::int as review_count,
      (select round(avg(rating), 1) from recipe_reviews v where v.recipe_id = r.id and v.status = 'approved') as review_avg
    from recipes r order by r.created_at desc`);
  return rows.map((r) => ({ ...mapRecipe(r), reviewCount: r.review_count as number, reviewAvg: r.review_avg === null ? null : Number(r.review_avg) }));
}

export async function adminGetRecipe(id: string) {
  const { sql } = await requireAdmin();
  if (!isUuid(id)) return null;
  const rows = await sql.query("select * from recipes where id = $1", [id]);
  return rows[0] ? mapRecipe(rows[0]) : null;
}

// ------------------------------------------------------------------ Avis

export async function adminListReviews(status: ReviewStatus) {
  const { sql } = await requireAdmin();
  const rows = await sql.query(
    `select v.*, r.name as recipe_name, r.slug as recipe_slug
       from recipe_reviews v join recipes r on r.id = v.recipe_id
      where v.status = $1 order by v.created_at desc limit 300`,
    [status],
  );
  return rows.map((r) => ({ ...mapReview(r), recipeName: r.recipe_name as string, recipeSlug: r.recipe_slug as string }));
}

export async function adminReviewCounts() {
  const { sql } = await requireAdmin();
  const rows = await sql.query("select status, count(*)::int as n from recipe_reviews group by status");
  const counts: Record<ReviewStatus, number> = { pending: 0, approved: 0, rejected: 0 };
  for (const r of rows) counts[r.status as ReviewStatus] = r.n;
  return counts;
}

// ------------------------------------------------------------ Newsletter

export async function adminListSubscribers() {
  const { sql } = await requireAdmin();
  const rows = await sql.query("select * from newsletter_subscribers order by created_at desc");
  return rows.map(mapSubscriber);
}
