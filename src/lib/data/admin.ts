import "server-only";
import { redirect } from "next/navigation";
import { createSessionClient } from "../supabase/server";
import { mapCategory, mapOrder, mapProduct } from "../supabase/mappers";
import type { OrderStatus } from "../types";

/**
 * Vérifie que l'utilisateur connecté est administrateur.
 * Toutes les requêtes admin passent par le client de session : la RLS
 * (fonction is_admin()) protège les données même en cas d'oubli applicatif.
 */
export async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login?erreur=acces");
  return { supabase, user };
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
