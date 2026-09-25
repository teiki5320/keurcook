"use client";

import { useActionState } from "react";
import { updateOrderAction, type ActionState } from "@/app/admin/actions";
import { ORDER_STATUS_LABELS } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

export function OrderStatusForm({ order }: { order: { id: string; status: OrderStatus; trackingNumber: string | null; paymentProvider: string } }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateOrderAction, {});
  return (
    <form action={action} className="card space-y-4 self-start p-5 text-sm">
      <input type="hidden" name="id" value={order.id} />
      <h2 className="font-semibold">Traitement</h2>
      <div>
        <label htmlFor="status" className="label">Statut</label>
        <select id="status" name="status" defaultValue={order.status} className="input" disabled={order.status === "cancelled"}>
          {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {order.status === "pending_payment" && (
          <p className="mt-1 text-xs text-muted">
            {order.paymentProvider === "bank_transfer"
              ? "Passez en « Payée » à réception du virement."
              : "Le paiement en ligne est confirmé automatiquement ; sans paiement dans l'heure, la commande est annulée."}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="trackingNumber" className="label">N° de suivi du colis</label>
        <input id="trackingNumber" name="trackingNumber" defaultValue={order.trackingNumber ?? ""} className="input" />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="notify" defaultChecked className="h-4 w-4 accent-forest-700" />
        Prévenir le client par email si le statut change
      </label>
      <p className="text-xs text-muted">L&apos;annulation remet automatiquement les articles en stock.</p>
      {state.error && <p className="text-terracotta-dark">{state.error}</p>}
      {state.success && <p className="text-forest-700">{state.success}</p>}
      <button type="submit" disabled={pending || order.status === "cancelled"} className="btn-primary w-full">
        {pending ? "Enregistrement…" : "Mettre à jour"}
      </button>
    </form>
  );
}
