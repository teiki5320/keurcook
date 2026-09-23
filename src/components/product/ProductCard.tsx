import Link from "next/link";
import { MapPin } from "lucide-react";
import { minPriceCents, totalStock } from "@/lib/data/catalog";
import { formatPrice } from "@/lib/format";
import type { ProductWithCategory } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { RateBadges } from "./RateBadges";

export function ProductCard({ product, priority }: { product: ProductWithCategory; priority?: boolean }) {
  const outOfStock = totalStock(product) <= 0;
  const multiple = product.variants.length > 1;
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-sage-100">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800">
          {product.category.name}
        </span>
        {outOfStock && (
          <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            Rupture
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <h3 className="font-display text-base leading-snug text-forest-900 sm:text-lg">{product.name}</h3>
        {product.originRegion && (
          <p className="flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {product.originRegion}
          </p>
        )}
        <RateBadges product={product} />
        <p className="mt-auto pt-1 text-sm font-semibold text-forest-800">
          {multiple && <span className="font-normal text-muted">dès </span>}
          {formatPrice(minPriceCents(product))}
        </p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: ProductWithCategory[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
