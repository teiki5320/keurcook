"use client";

/** Bouton d'envoi qui demande confirmation (suppressions). */
export function ConfirmButton({ message, children, small }: { message: string; children: React.ReactNode; small?: boolean }) {
  return (
    <button
      type="submit"
      className={`btn border border-[#ff7a3d]/40 bg-transparent text-[#ff7a3d] hover:bg-[#ff7a3d]/10 ${small ? "px-3 py-1.5 text-xs" : ""}`}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
