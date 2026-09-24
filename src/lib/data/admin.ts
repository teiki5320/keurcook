import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "../admin-session";
import { createServiceClient } from "../supabase/admin";
import { mapCategory, mapOrder, mapProduct } from "../supabase/mappers";
import type { OrderStatus } from "../types";

/**
 * Vérifie que la session admin (cookie signé) est valide, puis renvoie le
 * client "service_role" : les écritures admin passent côté serveur uniquement.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return { supabase: createServiceClient() };
}

export async function adminListCategories() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("categories").select("*").order("position");
  if (error) throw error;
  return data.map(mapCategory);
}

export async function adminListProducts() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(mapProduct);
}

export async function adminGetProduct(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("products").select("*, product_variants(*)").eq("id", id).maybeSingle();
  return data ? mapProduct(data) : null;
}

export async function adminListOrders(status?: OrderStatus) {
  const { supabase } = await requireAdmin();
  let query = supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }).limit(200);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(mapOrder);
}

export async function adminGetOrder(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("orders").select("*, order_items(*)").eq("id", id).maybeSingle();
  return data ? mapOrder(data) : null;
}

export async function adminDashboardStats() {
  const { supabase } = await requireAdmin();
  const [pending, toShip, products, lowStock, recent] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending_payment"),
    supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["paid", "preparing"]),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("product_variants").select("id", { count: "exact", head: true }).lte("stock", 5),
    supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }).limit(5),
  ]);
  return {
    pendingPayment: pending.count ?? 0,
    toShip: toShip.count ?? 0,
    activeProducts: products.count ?? 0,
    lowStock: lowStock.count ?? 0,
    recentOrders: (recent.data ?? []).map(mapOrder),
  };
}
