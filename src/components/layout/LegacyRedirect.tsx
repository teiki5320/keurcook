"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Redirection côté navigateur pour les anciennes adresses (export statique :
 * pas de redirection serveur possible sur GitHub Pages).
 */
export function LegacyRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => router.replace(to), [router, to]);
  return (
    <div className="container-page py-32 text-center">
      <p className="text-muted">Cette page a déménagé.</p>
      <Link href={to} className="btn-primary mt-6">
        Aller à la boutique
      </Link>
    </div>
  );
}
