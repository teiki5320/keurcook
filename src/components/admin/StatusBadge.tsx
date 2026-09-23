import { ORDER_STATUS_LABELS } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

const styles: Record<OrderStatus, string> = {
  pending_payment: "bg-amber-soft text-terracotta-dark",
  paid: "bg-sage-200 text-forest-800",
  preparing: "bg-sky-100 text-sky-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-forest-700 text-cream",
  cancelled: "bg-zinc-200 text-zinc-600",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${styles[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
