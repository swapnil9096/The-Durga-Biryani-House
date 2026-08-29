import type { Offer } from "@/types";

/**
 * OFFERS
 * -------
 * Configure promotions here. UI never hardcodes promo logic.
 * The `featured` offer drives the homepage banner.
 * ⚠️  Offers are not permanent — update validity/terms as needed.
 */

export const offers: Offer[] = [
  {
    id: "opening-99",
    title: "Opening Offer",
    description:
      "Celebrate our launch in Kharadi — enjoy any biryani on our menu at a special introductory price.",
    highlight: "Any Biryani @ ₹99",
    validity: "Limited-time opening offer",
    terms: [
      "Valid for a limited period during our opening promotion.",
      "Applicable on select biryani varieties, dine-in and takeaway.",
      "Cannot be combined with other offers.",
      "The restaurant reserves the right to modify or withdraw this offer at any time.",
    ],
    ctaHref: "/menu?category=Biryani",
    ctaLabel: "Order a Biryani",
    featured: true,
  },
];

export const featuredOffer = offers.find((o) => o.featured) ?? offers[0];
