import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { reviews, averageRating } from "@/data/reviews";

export const metadata: Metadata = pageMetadata({
  title: "Reviews — What Our Guests Say",
  description:
    "Read reviews from guests of The Durga Biryani House in Kharadi, Pune.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const hasReviews = reviews.length > 0;

  return (
    <>
      <PageHeader
        title="Customer Reviews"
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
      />
      <div className="container-px mx-auto max-w-7xl py-12">
        {hasReviews ? (
          <>
            <div className="flex flex-col items-center gap-3 text-center">
              <StarRating value={averageRating} size={24} />
              <p className="text-charcoal-600">
                <span className="font-display text-2xl font-bold text-charcoal-900">
                  {averageRating.toFixed(1)}
                </span>{" "}
                average from {reviews.length} reviews
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={(i % 3) * 70}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <p className="mx-auto max-w-2xl text-center text-charcoal-600">
            We&apos;re just getting started — customer reviews will appear here soon.
            Enjoyed your meal? We&apos;d love to hear from you.
          </p>
        )}

        <div className="mt-12 text-center">
          <Button href="/menu" size="lg">
            Order Now
          </Button>
        </div>
      </div>
    </>
  );
}
