import "server-only";
import { cache } from "react";
import { getSql, isDbConfigured } from "../db/client";

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
}

export const DEFAULT_MAINTENANCE_MESSAGE =
  "La boutique fait une courte pause pour préparer la suite. Revenez très bientôt.";

/**
 * Mode maintenance : quand il est actif, toutes les pages de la boutique
 * affichent l'écran de maintenance et les commandes sont refusées.
 * En mode démo (sans base), le site n'est jamais en maintenance.
 */
export const getMaintenance = cache(async (): Promise<MaintenanceSettings> => {
  const off = { enabled: false, message: DEFAULT_MAINTENANCE_MESSAGE };
  if (!isDbConfigured) return off;
  try {
    const rows = await getSql().query("select value from settings where key = 'maintenance'");
    const v = rows[0]?.value as Partial<MaintenanceSettings> | undefined;
    return { enabled: Boolean(v?.enabled), message: v?.message?.trim() || DEFAULT_MAINTENANCE_MESSAGE };
  } catch {
    // Table absente (schéma pas encore mis à jour) : le site reste ouvert.
    return off;
  }
});
