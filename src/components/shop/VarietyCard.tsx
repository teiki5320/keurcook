import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { AmazonBuyButton } from "@/components/product/AmazonBuyButton";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/format";
import type { ProductWithCategory } from "@/lib/types";

/** Carte produit : photo, origine, format, prix indicatif et bouton « Acheter » (Amazon). */
export function VarietyCard({ product, priority }: { product: ProductWithCategory; priority?: boolean }) {
  const variant = product.variants[0];
  if (!variant) return null;

  return (
    <article className="card flex flex-col overflow-hidden">
      <Link href={`/produit/${product.slug}`} tabIndex={-1} aria-hidden className="group relative block aspect-square overflow-hidden bg-sage-100">
        <ProductImage
          src={product.images[0]}
          alt=""
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800">
          {product.category.name}
        </span>
        {product.featured && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#ff7a3d] px-2.5 py-0.5 text-[11px] font-bold text-[#140a07]">
            <Heart className="h-3 w-3 fill-current" aria-hidden /> Coup de cœur
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <h3 className="font-display text-base leading-snug text-forest-900 sm:text-lg">
          <Link href={`/produit/${product.slug}`} className="hover:text-[#ff7a3d]">
            {product.name}
          </Link>
        </h3>
        {(product.originCountry || product.originRegion) && (
          <p className="flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {[product.originCountry, product.originRegion].filter(Boolean).join(" · ")}
          </p>
        )}


        <p className="mt-auto pt-1">
          <span className="text-base font-bold text-forest-800">{formatPrice(variant.priceCents)}</span>
          <span className="ml-1.5 text-xs text-muted">{variant.label} · prix indicatif</span>
        </p>
        {product.amazonAsin && (
          <AmazonBuyButton asin={product.amazonAsin} priceCents={variant.priceCents} name={product.name} className="btn-primary mt-1 w-full py-2.5" />
        )}
      </div>
    </article>
  );
}
