export type MenuCategory = "Biryani";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in INR (integer rupees). */
  price: number;
  category: MenuCategory;
  /** Remote or local image URL. Leave empty string to render a styled fallback. */
  image: string;
  vegetarian: boolean;
  bestseller: boolean;
  available: boolean;
}

/** Customer-selectable heat level for a biryani. */
export type SpiceLevel = "Medium" | "Spicy";

export const SPICE_LEVELS: SpiceLevel[] = ["Medium", "Spicy"];

export interface CartItem {
  /** Unique cart-line key: `${id}__${spiceLevel}` so each spice level is its own line. */
  key: string;
  id: string;
  name: string;
  price: number;
  image: string;
  vegetarian: boolean;
  spiceLevel: SpiceLevel;
  quantity: number;
}

/** Optional add-on a customer can attach to an order (e.g. raita, salad). */
export interface ExtraOption {
  id: string;
  name: string;
  /** Price in INR (integer rupees) per unit. */
  price: number;
  /** Short unit label shown next to the name, e.g. "per bowl". */
  unit: string;
  vegetarian: boolean;
}

/** Chosen extras: extra id → quantity (>0). */
export type CartExtras = Record<string, number>;

export interface Review {
  id: string;
  name: string;
  rating: number; // 1–5
  review: string;
  /** ISO date string, e.g. "2026-07-14". */
  date: string;
  photo?: string;
  /** True for demo/sample content shown during development. */
  demo?: boolean;
}

export type GalleryCategory =
  | "Biryani"
  | "Food"
  | "Restaurant"
  | "Kitchen"
  | "Packaging";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Grid span hint for masonry layout. */
  wide?: boolean;
  tall?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  /** e.g. "@ ₹99" or "20% OFF" */
  highlight: string;
  validity: string;
  terms: string[];
  /** Where the CTA points, e.g. "/menu". */
  ctaHref: string;
  ctaLabel: string;
  featured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type OrderType = "pickup" | "delivery";

export interface OrderDetails {
  name: string;
  mobile: string;
  orderType: OrderType;
  address?: string;
  instructions?: string;
}
