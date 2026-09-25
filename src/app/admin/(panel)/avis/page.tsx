import Link from "next/link";
import { Check, Star, Trash2, Undo2, X } from "lucide-react";
import { deleteReviewAction, setReviewStatusAction } from "@/app/admin/actions";
import { anton } from "@/components/nuage/typography";
import { adminListReviews, adminReviewCounts } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/format";
import type { ReviewStatus } from "@/lib/types";

export const metadata = { title: "Avis" };

const TABS: { key: ReviewStatus; label: string }[] = [
  { key: "pending", label: "À valider" },
  { key: "approved", label: "Publiés" },
  { key: "rejected", label: "Refusés" },
];

const btn = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition";

export default async function AdminReviewsPage({ searchParams }: PageProps<"/admin/avis">) {
  const { statut } = await searchParams;
  const status: ReviewStatus = TABS.some((t) => t.key === statut) ? (statut as ReviewStatus) : "pending";
  const [reviews, counts] = await Promise.all([adminListReviews(status), adminReviewCounts()]);

  return (
    <div>
      <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,5vw,64px)" }}>
        Avis<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-1 text-sm text-muted">Les avis déposés par les visiteurs ne sont publiés qu&apos;après votre validation.</p>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filtrer les avis">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/avis?statut=${t.key}`}
            aria-current={t.key === status ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${t.key === status ? "bg-[#fbeee2] text-[#140a07]" : "border border-[#fbeee2]/15 hover:border-[#ff7a3d]"}`}
          >
            {t.label} ({counts[t.key]})
          </Link>
        ))}
      </nav>

      {reviews.length === 0 ? (
        <p className="card mt-6 p-8 text-center text-muted">Aucun avis dans cette liste.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex flex-wrap items-center gap-2">
                    <strong>{r.authorName}</strong>
                    <span className="flex" aria-label={`${r.rating} sur 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-[#ffc46b] text-[#ffc46b]" : "text-[#fbeee2]/25"}`} aria-hidden />
                      ))}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    <Link href={`/recette/${r.recipeSlug}`} target="_blank" className="hover:text-[#ff7a3d]">{r.recipeName}</Link> · {formatDateTime(r.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {status !== "approved" && (
                    <form action={setReviewStatusAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="approved" />
                      <button className={`${btn} bg-[#ff7a3d] text-[#140a07] hover:bg-[#ffc46b]`}><Check className="h-3.5 w-3.5" aria-hidden /> Publier</button>
                    </form>
                  )}
                  {status !== "rejected" && (
                    <form action={setReviewStatusAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <button className={`${btn} border border-[#fbeee2]/20 hover:border-[#ff7a3d]`}><X className="h-3.5 w-3.5" aria-hidden /> Refuser</button>
                    </form>
                  )}
                  {status !== "pending" && (
                    <form action={setReviewStatusAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="pending" />
                      <button className={`${btn} border border-[#fbeee2]/20 hover:border-[#ff7a3d]`}><Undo2 className="h-3.5 w-3.5" aria-hidden /> Remettre à valider</button>
                    </form>
                  )}
                  <form action={deleteReviewAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className={`${btn} text-[#ff7a3d] hover:bg-[#ff7a3d]/10`} aria-label="Supprimer l'avis"><Trash2 className="h-3.5 w-3.5" aria-hidden /></button>
                  </form>
                </div>
              </div>
              {r.comment ? <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-line">{r.comment}</p> : <p className="mt-3 text-sm text-muted">(note sans commentaire)</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
