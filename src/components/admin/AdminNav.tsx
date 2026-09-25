"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ChefHat, ClipboardList, ExternalLink, LayoutDashboard, LogOut, Mail, MessageSquareText, Package, PauseCircle } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { anton } from "@/components/nuage/typography";

const groups = [
  {
    title: "Contenu",
    links: [
      { href: "/admin/recettes", label: "Recettes", icon: ChefHat },
      { href: "/admin/avis", label: "Avis", icon: MessageSquareText, badge: "reviews" as const },
      { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    ],
  },
  {
    title: "Boutique",
    links: [
      { href: "/admin/produits", label: "Produits", icon: Package },
      { href: "/admin/stocks", label: "Stocks", icon: Boxes },
      { href: "/admin/commandes", label: "Commandes", icon: ClipboardList, badge: "orders" as const },
    ],
  },
  {
    title: "Site",
    links: [{ href: "/admin/maintenance", label: "Maintenance", icon: PauseCircle, badge: "maintenance" as const }],
  },
];

export interface NavCounts {
  reviews: number;
  orders: number;
  maintenance: boolean;
}

export function AdminNav({ counts }: { counts: NavCounts }) {
  const pathname = usePathname();
  const item = (href: string, active: boolean) =>
    `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition ${
      active ? "bg-[#ff7a3d] text-[#140a07]" : "text-[#fbeee2]/80 hover:bg-[#fbeee2]/8 hover:text-[#fbeee2]"
    }`;
  const badge = (key?: "reviews" | "orders" | "maintenance") => {
    if (key === "maintenance") return counts.maintenance ? <span className="ml-auto rounded-full bg-[#ffc46b] px-2 text-[10px] font-bold text-[#140a07]">ACTIF</span> : null;
    const n = key ? counts[key] : 0;
    return n > 0 ? <span className="ml-auto rounded-full bg-[#ffc46b] px-2 text-[11px] font-bold text-[#140a07]">{n}</span> : null;
  };

  return (
    <aside className="border-b border-[#fbeee2]/10 bg-[#0d0604] lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
      <Link href="/admin" className="block px-5 pt-5 pb-3 lg:pt-7">
        <span className="text-[26px] tracking-[.02em]" style={anton}>
          ALOHASH<span className="text-[#ff7a3d]">.</span>
        </span>
        <span className="block text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">Administration</span>
      </Link>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-0 lg:overflow-y-auto">
        <Link href="/admin" className={item("/admin", pathname === "/admin")}>
          <LayoutDashboard className="h-4 w-4" aria-hidden /> Tableau de bord
        </Link>
        {groups.map((g) => (
          <div key={g.title} className="flex gap-1 lg:mt-5 lg:flex-col">
            <p className="hidden px-3 pb-1 text-[10px] font-bold tracking-[.16em] text-[#fbeee2]/40 uppercase lg:block">{g.title}</p>
            {g.links.map(({ href, label, icon: Icon, badge: b }) => (
              <Link key={href} href={href} className={item(href, pathname.startsWith(href))}>
                <Icon className="h-4 w-4" aria-hidden /> {label}
                {badge(b)}
              </Link>
            ))}
          </div>
        ))}
        <div className="flex gap-1 lg:mt-auto lg:flex-col lg:border-t lg:border-[#fbeee2]/10 lg:pt-3">
          <Link href="/" target="_blank" className={item("/", false)}>
            <ExternalLink className="h-4 w-4" aria-hidden /> Voir le site
          </Link>
          <form action={logoutAction} className="shrink-0">
            <button className={`${item("", false)} w-full`}>
              <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
