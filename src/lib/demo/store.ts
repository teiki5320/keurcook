import "server-only";
import { demoProducts } from "./catalog";
import type { Order } from "../types";

/**
 * Stockage en mémoire utilisé en mode démo (sans Supabase).
 * Les données sont perdues au redémarrage du serveur : c'est volontaire.
 */
const globalStore = globalThis as unknown as {
  __alohashDemoOrders?: Map<string, Order>;
  __alohashDemoSeq?: number;
};

export const demoOrders = (globalStore.__alohashDemoOrders ??= new Map<string, Order>());

export function nextDemoOrderNumber() {
  globalStore.__alohashDemoSeq = (globalStore.__alohashDemoSeq ?? 1000) + 1;
  return `AH-${new Date().getFullYear()}-${String(globalStore.__alohashDemoSeq).padStart(6, "0")}`;
}

export function findDemoVariant(variantId: string) {
  for (const product of demoProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}
