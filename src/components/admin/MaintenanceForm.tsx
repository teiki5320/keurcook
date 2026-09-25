"use client";

import { useActionState } from "react";
import { setMaintenanceAction, type ActionState } from "@/app/admin/actions";
import type { MaintenanceSettings } from "@/lib/data/settings";

/** Interrupteur du mode maintenance (tableau de bord admin). */
export function MaintenanceForm({ current }: { current: MaintenanceSettings }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(setMaintenanceAction, {});
  return (
    <form action={action} className={`card mt-8 space-y-4 p-5 ${current.enabled ? "border-terracotta" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Mode maintenance</h2>
          <p className="text-sm text-muted">
            {current.enabled
              ? "Actif : les visiteurs voient l'écran de maintenance et les commandes sont suspendues."
              : "Inactif : la boutique est ouverte."}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="enabled" defaultChecked={current.enabled} className="h-5 w-5 accent-[#2f4a37]" />
          Mettre le site en pause
        </label>
      </div>
      <div>
        <label className="label" htmlFor="maintenance-message">Message affiché aux visiteurs</label>
        <textarea id="maintenance-message" name="message" rows={3} maxLength={500} defaultValue={current.message} className="input" />
        <p className="mt-1 text-xs text-muted">L&apos;espace admin reste accessible pendant la maintenance.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {state.error && <p role="alert" className="text-sm text-terracotta">{state.error}</p>}
        {state.success && <p role="status" className="text-sm text-forest-700">{state.success}</p>}
      </div>
    </form>
  );
}
