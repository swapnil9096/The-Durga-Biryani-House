import type { MenuItem, MenuCategory } from "@/types";

/**
 * MENU DATA
 * ----------
 * Edit items here to change the live menu. UI reads from this file only.
 *
 * ⚠️  IMAGES live in /public/images/menu (served locally so they always load).
 *     Replace each file with your own restaurant photography, keeping the
 *     same filename — or point `image` at a new path.
 *     Set `available: false` to hide an item without deleting it.
 *
 * Only categories that have at least one item are shown in the UI.
 */

/** Display order for category tabs/sections. */
export const categoryOrder: MenuCategory[] = ["Biryani"];

export const menu: MenuItem[] = [
  // ── Biryani ──────────────────────────────────────────────
  {
    id: "biryani-hyderabadi-chicken",
    name: "Hyderabadi Chicken Dum Biryani",
    description:
      "Long-grain basmati layered with marinated chicken, slow-cooked on dum with saffron, mint and fried onions — Hyderabadi style.",
    price: 189,
    category: "Biryani",
    image: "/images/menu/hyderabadi-chicken-biryani.jpg",
    vegetarian: false,
    bestseller: true,
    available: true,
  },
  {
    id: "biryani-tandoori",
    name: "Tandoori Biryani",
    description:
      "Smoky char-grilled tandoori chicken layered with fragrant basmati and dum-cooked to seal in the flavour.",
    price: 189,
    category: "Biryani",
    image: "/images/menu/tandoori-biryani.jpg",
    vegetarian: false,
    bestseller: true,
    available: true,
  },
  {
    id: "biryani-veg",
    name: "Veg Dum Biryani",
    description:
      "Garden vegetables, fried onions and herbs layered with basmati and cooked on slow dum.",
    price: 165,
    category: "Biryani",
    image: "/images/menu/veg-biryani.jpg",
    vegetarian: true,
    bestseller: true,
    available: true,
  },
  {
    id: "biryani-egg",
    name: "Egg Biryani",
    description:
      "Spiced basmati with boiled eggs, caramelised onions and a hint of green chilli.",
    price: 175,
    category: "Biryani",
    image: "/images/menu/egg-biryani.jpg",
    vegetarian: false,
    bestseller: false,
    available: true,
  },
  {
    id: "biryani-paneer",
    name: "Paneer Dum Biryani",
    description:
      "Soft paneer cubes and rice infused with mint, saffron and warm spices — a vegetarian favourite.",
    price: 189,
    category: "Biryani",
    image: "/images/menu/paneer-biryani.jpg",
    vegetarian: true,
    bestseller: false,
    available: true,
  },
];

/** IDs of the signature biryanis featured on the homepage. */
export const signatureIds = [
  "biryani-hyderabadi-chicken",
  "biryani-tandoori",
  "biryani-veg",
  "biryani-egg",
  "biryani-paneer",
];

export const signatureBiryanis = signatureIds
  .map((id) => menu.find((m) => m.id === id))
  .filter((m): m is MenuItem => Boolean(m));

/** Categories that actually have at least one item, in display order. */
export function getActiveCategories(): MenuCategory[] {
  return categoryOrder.filter((c) => menu.some((m) => m.category === c));
}
