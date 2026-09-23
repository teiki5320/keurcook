"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ClipboardList, ExternalLink, LayoutDashboard, Leaf, LogOut, Package } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/stocks", label: "Stocks", icon: Boxes },
  { href: "/admin/commandes", label: "Commandes", icon: ClipboardList },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <aside className="border-b border-sage-200 bg-forest-900 text-sage-100 lg:sticky lg:top-0 lg:h-dvh lg:w-60 lg:shrink-0 lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5 lg:py-6">
        <Link href="/admin" className="flex items-center gap-2 font-display text-xl text-cream">
          <Leaf className="h-5 w-5" aria-hidden /> Admin
        </Link>
        <p className="hidden truncate text-xs text-sage-200/70 lg:mt-1 lg:block">{email}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-white/15 text-white" : "hover:bg-white/10"}`}
            >
              <Icon className="h-4 w-4" aria-hidden /> {label}
            </Link>
          );
        })}
        <Link href="/" target="_blank" className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
          <ExternalLink className="h-4 w-4" aria-hidden /> Voir le site
        </Link>
        <form action={logoutAction} className="shrink-0">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
          </button>
        </form>
      </nav>
    </aside>
  );
}
