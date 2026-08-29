import type { Review } from "@/types";

/**
 * REVIEWS
 * --------
 * Add genuine customer reviews here (e.g. imported from Google). The homepage
 * reviews section and the /reviews page hide themselves when this list is
 * empty, so it is safe to ship with no reviews until real ones are available.
 */

export const reviews: Review[] = [];

/** Reviews highlighted on the homepage. */
export const featuredReviews = reviews.slice(0, 3);

export const averageRating = reviews.length
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  : 0;
