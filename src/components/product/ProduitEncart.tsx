import Link from "next/link";
import { AmazonButton, LignePartenaire } from "@/components/product/AmazonButton";
import { ProductImage } from "@/components/product/ProductImage";
import type { EmplacementAmazon } from "@/lib/amazon";
import type { ProductWithCategory } from "@/lib/types";

/**
 * Encadré sobre de 1 à 3 produits, placé dans le fil d'une page de contenu (recette sur téléphone, conseil, pays) :
 * pour chaque produit, sa vignette, son nom (lien vers la fiche), une ligne « pourquoi », le bouton « Voir sur Amazon »
 * et la ligne « Lien partenaire » dessous. Jamais à côté d'un emplacement publicitaire.
 */
export function ProduitEncart({
  titre,
  produits,
  emplacement,
  id,
  className = "",
}: {
  titre: string;
  produits: ProductWithCategory[];
  emplacement: EmplacementAmazon;
  /** Identifiant du titre (aria-labelledby). */
  id: string;
  className?: string;
}) {
  const liste = produits.filter((p) => p.amazonAsin).slice(0, 3);
  if (liste.length === 0) return null;
  return (
    <section aria-labelledby={id} className={`card p-4 sm:p-5 print:hidden ${className}`}>
      <h2 id={id} className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
        {titre}
      </h2>
      <ul className="mt-3 divide-y divide-[#fbeee2]/10">
        {liste.map((p) => (
          <li key={p.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <Link href={`/produit/${p.slug}`} tabIndex={-1} aria-hidden className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#281610]">
              <ProductImage src={p.images[0]} alt={p.name} sizes="80px" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/produit/${p.slug}`} className="font-semibold leading-snug hover:text-[#ff7a3d]">
                {p.name}
              </Link>
              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-[#fbeee2]/70">{p.shortDescription}</p>
              <AmazonButton asin={p.amazonAsin!} name={p.name} emplacement={emplacement} className="btn-primary mt-2 px-4 py-2" />
              <LignePartenaire className="mt-1" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
