import Link from "next/link";
import { StockForm } from "@/components/admin/StockForm";
import { adminListProducts } from "@/lib/data/admin";

export const metadata = { title: "Stocks" };

export default async function StocksPage({ searchParams }: PageProps<"/admin/stocks">) {
  const { bas } = await searchParams;
  const lowOnly = bas === "1";
  const products = await adminListProducts();
  const rows = products
    .flatMap((p) => p.variants.map((v) => ({ productId: p.id, productName: p.name, isActive: p.isActive, variant: v })))
    .filter((r) => !lowOnly || r.variant.stock <= 5)
    .sort((a, b) => a.productName.localeCompare(b.productName, "fr") || a.variant.position - b.variant.position);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest-900">Stocks</h1>
        <div className="flex gap-2 text-sm">
          <Link href="/admin/stocks" className={`rounded-full px-3 py-1 ${!lowOnly ? "bg-forest-700 text-cream" : "bg-white"}`}>Tout</Link>
          <Link href="/admin/stocks?bas=1" className={`rounded-full px-3 py-1 ${lowOnly ? "bg-forest-700 text-cream" : "bg-white"}`}>Stock bas (≤ 5)</Link>
        </div>
      </div>
      <StockForm rows={rows} />
    </div>
  );
}
