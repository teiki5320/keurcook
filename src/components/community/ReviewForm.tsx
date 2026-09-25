"use client";

import { useActionState, useState } from "react";
import { Star } from "lucide-react";
import { submitReviewAction, type CommunityState } from "@/app/(shop)/communaute-actions";

/** Formulaire d'avis (note 1 à 5, prénom, commentaire) ; publication après validation. */
export function ReviewForm({ recipeId }: { recipeId: string }) {
  const [state, action, pending] = useActionState<CommunityState, FormData>(submitReviewAction, {});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (state.success) return <p role="status" className="card p-5 text-sm">{state.success}</p>;

  return (
    <form action={action} className="card space-y-4 p-5">
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="rating" value={rating || ""} />
      <div className="hidden" aria-hidden>
        <label>
          Site web <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset>
        <legend className="label">Votre note</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} étoile${n > 1 ? "s" : ""} sur 5`}
              aria-pressed={rating === n}
              className="p-0.5"
            >
              <Star className={`h-7 w-7 ${(hover || rating) >= n ? "fill-[#ffc46b] text-[#ffc46b]" : "text-[#fbeee2]/30"}`} aria-hidden />
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="label" htmlFor="review-name">Prénom</label>
        <input id="review-name" name="authorName" required minLength={2} maxLength={60} autoComplete="given-name" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="review-comment">Votre avis (facultatif)</label>
        <textarea id="review-comment" name="comment" rows={4} maxLength={1500} className="input" placeholder="Réussie du premier coup ? Une astuce à partager ?" />
      </div>
      {state.error && <p role="alert" className="text-sm text-[#ff7a3d]">{state.error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">Votre avis est relu avant publication. Seul votre prénom est affiché.</p>
        <button type="submit" disabled={pending || !rating} className="btn-primary">
          {pending ? "Envoi…" : "Publier mon avis"}
        </button>
      </div>
    </form>
  );
}
