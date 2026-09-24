import Link from "next/link";

export function DatabaseRequired() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="card p-8">
        <h1 className="font-display text-2xl text-forest-900">Espace admin non configuré</h1>
        <p className="mt-3 text-sm text-muted">
          L&apos;administration (produits, stocks, commandes) nécessite une base de données et un mot de passe administrateur.
          Renseignez <code>DATABASE_URL</code> (base Neon), <code>BLOB_READ_WRITE_TOKEN</code> (Vercel Blob) et{" "}
          <code>ADMIN_PASSWORD</code>, dans Vercel ou dans <code>.env.local</code>, puis suivez la section « Base de données » du README.
        </p>
        <Link href="/" className="btn-secondary mt-6">Retour au site</Link>
      </div>
    </div>
  );
}
