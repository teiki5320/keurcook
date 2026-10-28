import Link from "next/link";
import { Trophy } from "lucide-react";
import type { LienTop10 } from "@/lib/data/top10";

/** Liens internes vers les Top 10 liés à la page (recette, conseil) : simples liens, sans bouton Amazon. */
export function LiensTop10({ liens, className = "" }: { liens: LienTop10[]; className?: string }) {
  if (liens.length === 0) return null;
  return (
    <nav aria-label="Nos Top 10" className={`print:hidden ${className}`}>
      <ul className="space-y-1.5 text-[15px]">
        {liens.map((l) => (
          <li key={l.href} className="flex items-start gap-2">
            <Trophy className="mt-1 h-4 w-4 shrink-0 text-[#ff7a3d]" aria-hidden />
            <Link href={l.href} className="font-semibold text-[#ffc46b] underline underline-offset-2 hover:text-[#ff7a3d]">
              Voir notre {l.title.replace(/^Top 10/, "top 10")} →
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
