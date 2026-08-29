import { restaurant } from "@/config/restaurant";
import { faqs } from "@/data/faq";
import { siteUrl } from "./seo";

/**
 * Restaurant / LocalBusiness structured data.
 * Only includes fields we can honestly populate. Phone is included even though
 * it's a placeholder value in config; replace the config before launch.
 * Geo coordinates are intentionally omitted (not verified) per requirements.
 */
export function restaurantJsonLd() {
  const openingHoursSpecification = restaurant.openingHours
    .filter((h) => !h.closed && h.opens && h.closes)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schemaDay,
      opens: h.opens,
      closes: h.closes,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: restaurant.name,
    description: restaurant.description,
    url: siteUrl,
    servesCuisine: [...restaurant.cuisine],
    priceRange: restaurant.priceRange,
    menu: `${siteUrl}/menu`,
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${restaurant.address.line1}, ${restaurant.address.line2}`,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    telephone: restaurant.contact.phone,
    openingHoursSpecification,
  };
}

/** Website + SearchAction schema for the homepage. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: restaurant.name,
    url: siteUrl,
  };
}

/** FAQPage schema built from the FAQ data. */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList schema. Pass ordered [{name, path}] crumbs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
