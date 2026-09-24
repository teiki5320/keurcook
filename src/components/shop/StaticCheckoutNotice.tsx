import Link from "next/link";

/**
 * Remplace le formulaire de commande dans la version statique (GitHub Pages),
 * qui n'a pas de serveur pour enregistrer les commandes.
 * Même signature que CheckoutForm (substitution via turbopack.resolveAlias).
 */
export function CheckoutForm(_props: {
  paymentOptions: Array<{ id: string; label: string; description: string }>;
  flatRateCents: number;
  freeThresholdCents: number;
}) {
  void _props;
  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <p className="font-display text-2xl text-forest-900">Commande désactivée dans cette démo</p>
      <p className="mt-3 text-sm text-muted">
        Cette version du site est une vitrine statique hébergée sur GitHub Pages : elle ne peut pas enregistrer de
        commande. La commande en ligne, les emails et l&apos;espace admin fonctionnent sur la version complète
        (hébergée sur Vercel).
      </p>
      <Link href="/panier" className="btn-secondary mt-6">
        Retour au panier
      </Link>
    </div>
  );
}
