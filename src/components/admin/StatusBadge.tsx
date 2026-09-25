import { ORDER_STATUS_LABELS } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

const styles: Record<OrderStatus, string> = {
  pending_payment: "bg-[#ffc46b]/15 text-[#ffc46b]",
  paid: "bg-[#ff7a3d]/20 text-[#ff7a3d]",
  preparing: "bg-sky-400/15 text-sky-300",
  shipped: "bg-indigo-400/15 text-indigo-300",
  delivered: "bg-emerald-400/15 text-emerald-300",
  cancelled: "bg-[#fbeee2]/10 text-[#fbeee2]/60",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${styles[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
