import { formatRate } from "@/lib/format";
import type { Product } from "@/lib/types";

export function RateBadges({ product, size = "sm" }: { product: Pick<Product, "cbdRate" | "thcRate">; size?: "sm" | "md" }) {
  if (product.cbdRate === null && product.thcRate === null) return null;
  const cls =
    size === "md"
      ? "rounded-full px-3 py-1 text-sm font-semibold"
      : "rounded-full px-2.5 py-0.5 text-xs font-semibold";
  return (
    <div className="flex flex-wrap gap-1.5">
      {product.cbdRate !== null && <span className={`${cls} bg-forest-700 text-cream`}>CBD {formatRate(product.cbdRate)}</span>}
      {product.thcRate !== null && (
        <span className={`${cls} border border-forest-700/20 bg-white text-forest-800`}>
          THC {formatRate(product.thcRate)} <span className="font-normal text-muted">(≤ 0,3 %)</span>
        </span>
      )}
    </div>
  );
}
