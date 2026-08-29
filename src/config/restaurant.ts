/**
 * CENTRAL RESTAURANT CONFIGURATION
 * ---------------------------------
 * This is the single source of truth for all business information.
 * A non-technical owner can update everything here without touching UI code.
 *
 * ⚠️  PLACEHOLDERS: Values wrapped with "REPLACE_" or containing X's are
 *     intentionally fake. Replace them with real details before going live.
 *     See README "Remaining placeholders" for the full checklist.
 */

export interface OpeningHour {
  /** Short day label, e.g. "Mon" */
  day: string;
  /** Full day name used for schema.org, e.g. "Monday" */
  schemaDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  /** Human readable hours, e.g. "11:00 AM – 11:00 PM" */
  hours: string;
  /** 24h opens time for schema, e.g. "11:00" (omit if closed) */
  opens?: string;
  /** 24h closes time for schema, e.g. "23:00" (omit if closed) */
  closes?: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "google";
  label: string;
  /** Set to a real URL to enable the icon. Leave null to hide it. */
  url: string | null;
}

export const restaurant = {
  name: "The Durga Biryani House",
  shortName: "Durga Biryani House",
  tagline: "Authentic Taste. Dum-Packed Love.",
  description:
    "Freshly prepared biryani crafted with aromatic spices, premium rice and authentic dum cooking.",
  cuisine: ["Biryani", "Indian", "Mughlai"],
  priceRange: "₹₹",

  address: {
    line1: "Shop No. 12A, Gera World of Joy",
    line2: "Near Dhole Patil College",
    locality: "Kharadi",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411014",
    country: "IN",
  },

  /**
   * Contact details.
   * ⚠️  These are PLACEHOLDERS. Replace with real numbers before launch.
   * Phone must be in E.164-ish form for links (no spaces): +9199XXXXXXXX
   * WhatsApp number is digits only with country code (used in wa.me links).
   */
  contact: {
    phone: "+917028960827",
    phoneDisplay: "+91 70289 60827",
    whatsapp: "917028960827", // digits only, incl. country code
    email: "durgabiryani01@gmail.com",
    /** Are the contact placeholders still in use? Drives the site-wide notice. */
    usingPlaceholders: false,
  },

  openingHours: [
    { day: "Mon", schemaDay: "Monday", hours: "11:00 AM – 11:00 PM", opens: "11:00", closes: "23:00" },
    { day: "Tue", schemaDay: "Tuesday", hours: "11:00 AM – 11:00 PM", opens: "11:00", closes: "23:00" },
    { day: "Wed", schemaDay: "Wednesday", hours: "11:00 AM – 11:00 PM", opens: "11:00", closes: "23:00" },
    { day: "Thu", schemaDay: "Thursday", hours: "11:00 AM – 11:00 PM", opens: "11:00", closes: "23:00" },
    { day: "Fri", schemaDay: "Friday", hours: "11:00 AM – 11:30 PM", opens: "11:00", closes: "23:30" },
    { day: "Sat", schemaDay: "Saturday", hours: "11:00 AM – 11:30 PM", opens: "11:00", closes: "23:30" },
    { day: "Sun", schemaDay: "Sunday", hours: "11:00 AM – 11:30 PM", opens: "11:00", closes: "23:30" },
  ] as OpeningHour[],

  /**
   * Google Maps.
   * mapEmbedUrl — the src of an <iframe> embed (Google Maps > Share > Embed a map).
   * mapDirectionsUrl — opens directions in the user's maps app.
   * ⚠️  Currently a place-name search. Replace with your verified business link.
   */
  maps: {
    embedQuery:
      "The Durga Biryani House, Gera World of Joy, Kharadi, Pune 411014",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("Gera World of Joy, Kharadi, Pune 411014"),
  },

  socials: [
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/the_durga_biryani_house" },
    { platform: "facebook", label: "Facebook", url: null }, // ⚠️ Add real URL to show
    { platform: "google", label: "Google", url: null }, // ⚠️ Add real URL to show
  ] as SocialLink[],

  /** Optional flat delivery fee (₹). Set to 0 to hide the line entirely. */
  deliveryFee: 30,
  /** Free-delivery threshold (₹). Set to 0 to disable. */
  freeDeliveryOver: 499,

  /** Canonical site URL — used for metadata, sitemap, OG tags. */
  siteUrl: "https://durgabiryanihouse.example", // ⚠️ Replace with real domain
} as const;

/** One-line, comma-joined full address. */
export const fullAddress = [
  restaurant.address.line1,
  restaurant.address.line2,
  restaurant.address.locality,
  `${restaurant.address.city} - ${restaurant.address.postalCode}`,
].join(", ");

/** Google Maps embed iframe src built from the place query. */
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  restaurant.maps.embedQuery
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export type Restaurant = typeof restaurant;
