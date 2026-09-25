"use client";

import { useActionState, useState } from "react";
import { setMaintenanceAction, type ActionState } from "@/app/admin/actions";
import type { MaintenanceSettings } from "@/lib/data/settings";

/** Interrupteur du mode maintenance, avec aperçu du message. */
export function MaintenanceForm({ current }: { current: MaintenanceSettings }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(setMaintenanceAction, {});
  const [enabled, setEnabled] = useState(current.enabled);
  const [message, setMessage] = useState(current.message);
  return (
    <form action={action} className={`card mt-6 space-y-5 p-6 ${current.enabled ? "border-[#ffc46b]/60" : ""}`}>
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span>
          <span className="block font-semibold">Mettre le site en pause</span>
          <span className="text-sm text-muted">
            {current.enabled ? "Actif : les visiteurs voient l'écran de maintenance." : "Inactif : le site est ouvert."}
          </span>
        </span>
        <input type="checkbox" name="enabled" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="peer sr-only" />
        <span
          aria-hidden
          className={`relative h-8 w-14 shrink-0 rounded-full transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffc46b] ${enabled ? "bg-[#ff7a3d]" : "bg-[#fbeee2]/15"}`}
        >
          <span className={`absolute top-1 h-6 w-6 rounded-full bg-[#fbeee2] transition-all ${enabled ? "left-7" : "left-1"}`} />
        </span>
      </label>
      <div>
        <label className="label" htmlFor="maintenance-message">Message affiché aux visiteurs</label>
        <textarea
          id="maintenance-message"
          name="message"
          rows={3}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input"
        />
      </div>
      <div className="rounded-2xl border border-[#fbeee2]/10 bg-[#140a07] p-5 text-center">
        <p className="text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">Aperçu</p>
        <p className="mt-2 text-3xl uppercase" style={{ fontFamily: "var(--font-anton), sans-serif" }}>
          On prépare la marmite<span className="text-[#ff7a3d]">.</span>
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm whitespace-pre-line text-[#fbeee2]/75">{message}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {state.error && <p role="alert" className="text-sm text-[#ff7a3d]">{state.error}</p>}
        {state.success && <p role="status" className="text-sm text-[#ffc46b]">{state.success}</p>}
      </div>
    </form>
  );
}
