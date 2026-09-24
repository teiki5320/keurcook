import "server-only";
import { neon } from "@neondatabase/serverless";

/** Vrai si la base de données (Neon / PostgreSQL) est configurée ; sinon le site tourne en mode démo. */
export const isDbConfigured = Boolean(process.env.DATABASE_URL);

/**
 * Client SQL Neon (HTTP). À n'utiliser QUE côté serveur : la chaîne de
 * connexion DATABASE_URL donne un accès complet à la base.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL manquante : base de données non configurée.");
  return neon(url);
}

/** Code d'erreur PostgreSQL (ex. 23505 = contrainte d'unicité) et contrainte en cause. */
export function pgError(e: unknown): { code?: string; constraint?: string; message: string } {
  const err = e as { code?: string; constraint?: string; message?: string };
  return { code: err?.code, constraint: err?.constraint, message: err?.message ?? String(e) };
}

/** Produit avec ses variantes (colonne JSON `product_variants`). */
export const PRODUCT_SELECT = `
  select p.*,
    coalesce((select json_agg(v order by v.position) from product_variants v where v.product_id = p.id), '[]') as product_variants
  from products p`;

/** Commande avec ses lignes (colonne JSON `order_items`). */
export const ORDER_SELECT = `
  select o.*,
    coalesce((select json_agg(i) from order_items i where i.order_id = o.id), '[]') as order_items
  from orders o`;

/** Évite une erreur SQL quand un identifiant reçu dans l'URL n'est pas un UUID. */
export const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
