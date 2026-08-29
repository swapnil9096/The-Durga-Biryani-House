import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { featuredReviews, averageRating, reviews } from "@/data/reviews";

export function ReviewsSection() {
  if (featuredReviews.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="py-16 text-cream-50 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
            Loved by locals
          </span>
          <h2 id="reviews-heading" className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            What Our Guests Say
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <StarRating value={averageRating} size={20} />
            <span className="text-sm text-cream-100/80">
              {averageRating.toFixed(1)} average · {reviews.length} reviews
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredReviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 80}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/reviews" variant="gold" size="lg">
            Read All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
