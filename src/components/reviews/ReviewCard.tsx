import type { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
      <StarRating value={review.rating} />
      <blockquote className="mt-4 flex-1 text-charcoal-700">
        <p className="leading-relaxed">“{review.review}”</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-charcoal-100 pt-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-100 font-display font-bold text-maroon-700"
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-charcoal-900">{review.name}</p>
          <p className="text-xs text-charcoal-400">{formatDate(review.date)}</p>
        </div>
      </figcaption>
    </figure>
  );
}
