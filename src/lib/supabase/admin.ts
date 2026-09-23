import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

/**
 * Client "service_role" : contourne la RLS. À n'utiliser QUE côté serveur,
 * pour les opérations qui ne dépendent pas d'un utilisateur connecté
 * (création de commande, lecture d'une commande via son jeton d'accès).
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY manquante : impossible d'enregistrer les commandes.");
  }
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
