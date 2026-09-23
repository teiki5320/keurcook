import Link from "next/link";

export function SupabaseRequired() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="card p-8">
        <h1 className="font-display text-2xl text-forest-900">Espace admin indisponible en mode démo</h1>
        <p className="mt-3 text-sm text-muted">
          L&apos;administration (produits, stocks, commandes) nécessite Supabase. Renseignez{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> et{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> dans <code>.env.local</code>, puis suivez la section « Supabase » du README.
        </p>
        <Link href="/" className="btn-secondary mt-6">Retour au site</Link>
      </div>
    </div>
  );
}
