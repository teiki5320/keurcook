export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Vrai si Supabase est configuré ; sinon le site tourne en mode démo. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
