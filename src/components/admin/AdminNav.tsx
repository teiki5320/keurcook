import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { anton } from "@/components/nuage/typography";

/** Barre de l'admin : l'espace ne sert qu'à mettre le site en maintenance. */
export function AdminNav() {
  const item = "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#fbeee2]/80 transition hover:bg-[#fbeee2]/8 hover:text-[#fbeee2]";
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#fbeee2]/10 bg-[#0d0604] px-4 py-4 sm:px-8">
      <Link href="/admin">
        <span className="text-[26px] tracking-[.02em]" style={anton}>
          KEURCOOK<span className="text-[#ff7a3d]">.</span>
        </span>
        <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">Administration</span>
      </Link>
      <nav className="flex gap-1">
        <Link href="/" target="_blank" className={item}>
          <ExternalLink className="h-4 w-4" aria-hidden /> Voir le site
        </Link>
        <form action={logoutAction}>
          <button className={item}>
            <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
          </button>
        </form>
      </nav>
    </header>
  );
}
