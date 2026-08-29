import type { Review } from "@/types";

/**
 * REVIEWS
 * --------
 * ⚠️  ALL entries below are DEMO / SAMPLE content (`demo: true`) created for
 *     development preview only. They are NOT real customer reviews.
 *     Replace with genuine reviews (e.g. imported from Google) before launch,
 *     and remove the `demo` flag once they are real.
 */

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Sample Reviewer",
    rating: 5,
    review:
      "Placeholder review text — the biryani was fragrant and the portions generous. Replace this with a real customer review before going live.",
    date: "2026-07-22",
    demo: true,
  },
  {
    id: "r2",
    name: "Sample Reviewer",
    rating: 5,
    review:
      "Placeholder review text — loved the dum-cooked flavour and quick service. Replace with a genuine review.",
    date: "2026-07-15",
    demo: true,
  },
  {
    id: "r3",
    name: "Sample Reviewer",
    rating: 4,
    review:
      "Placeholder review text — great value for money, will order again. Replace with a genuine review.",
    date: "2026-07-09",
    demo: true,
  },
  {
    id: "r4",
    name: "Sample Reviewer",
    rating: 5,
    review:
      "Placeholder review text — the paneer biryani is a must-try for vegetarians. Replace with a genuine review.",
    date: "2026-06-30",
    demo: true,
  },
  {
    id: "r5",
    name: "Sample Reviewer",
    rating: 5,
    review:
      "Placeholder review text — packaging kept everything hot on delivery. Replace with a genuine review.",
    date: "2026-06-21",
    demo: true,
  },
  {
    id: "r6",
    name: "Sample Reviewer",
    rating: 4,
    review:
      "Placeholder review text — authentic taste, reminded me of home. Replace with a genuine review.",
    date: "2026-06-12",
    demo: true,
  },
];

/** Reviews highlighted on the homepage. */
export const featuredReviews = reviews.slice(0, 3);

export const averageRating =
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
