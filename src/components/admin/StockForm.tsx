"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateStockAction, type ActionState } from "@/app/admin/actions";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/lib/types";

interface Row {
  productId: string;
  productName: string;
  isActive: boolean;
  variant: Variant;
}

export function StockForm({ rows }: { rows: Row[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateStockAction, {});
  return (
    <form action={action} className="mt-6">
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-sage-200 text-xs text-muted uppercase">
            <tr>
              <th className="p-3">Produit</th>
              <th className="p-3">Variante</th>
              <th className="p-3">Réf.</th>
              <th className="p-3">Prix</th>
              <th className="w-32 p-3">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-200">
            {rows.map((r) => (
              <tr key={r.variant.id} className={r.isActive ? "" : "opacity-60"}>
                <td className="p-3">
                  <Link href={`/admin/produits/${r.productId}`} className="hover:underline">{r.productName}</Link>
                </td>
                <td className="p-3">{r.variant.label}</td>
                <td className="p-3 font-mono text-xs text-muted">{r.variant.sku ?? "—"}</td>
                <td className="p-3">{formatPrice(r.variant.priceCents)}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    name={`stock:${r.variant.id}`}
                    defaultValue={r.variant.stock}
                    aria-label={`Stock ${r.productName} ${r.variant.label}`}
                    className={`input py-1.5 ${r.variant.stock <= 5 ? "border-terracotta" : ""}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn-primary">{pending ? "Enregistrement…" : "Enregistrer les stocks"}</button>
        {state.error && <p className="text-sm text-terracotta-dark">{state.error}</p>}
        {state.success && <p className="text-sm text-forest-700">{state.success}</p>}
      </div>
    </form>
  );
}
