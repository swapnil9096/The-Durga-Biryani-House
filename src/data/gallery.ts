import type { GalleryImage } from "@/types";

/**
 * GALLERY
 * --------
 * ⚠️  Biryani photos are served locally from /public/images/menu so they
 *     always load. Restaurant/kitchen/packaging shots are placeholder photos
 *     from Unsplash (free to use). Replace each `src` with your own
 *     photography and update the `alt` text.
 */

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/menu/chicken-biryani.jpg",
    alt: "Chicken dum biryani served with raita and salan",
    category: "Biryani",
    tall: true,
  },
  {
    id: "g2",
    src: "/images/menu/egg-biryani.jpg",
    alt: "Egg biryani with boiled eggs and caramelised onions",
    category: "Biryani",
  },
  {
    id: "g3",
    src: "/images/menu/veg-biryani.jpg",
    alt: "Veg dum biryani with garden vegetables and fried onions",
    category: "Biryani",
    wide: true,
  },
  {
    id: "g4",
    src: "/images/menu/paneer-biryani.jpg",
    alt: "Paneer biryani with soft paneer and saffron rice",
    category: "Biryani",
  },
  {
    id: "g5",
    src: img("photo-1552566626-52f8b828add9", 1000),
    alt: "Warm interior of the restaurant dining area",
    category: "Restaurant",
    tall: true,
  },
  {
    id: "g6",
    src: img("photo-1517248135467-4c7edcad34c4"),
    alt: "Guests dining at a table in the restaurant",
    category: "Restaurant",
  },
  {
    id: "g7",
    src: img("photo-1556910103-1c02745aae4d"),
    alt: "Chef preparing biryani in the kitchen",
    category: "Kitchen",
    wide: true,
  },
  {
    id: "g8",
    src: img("photo-1466637574441-749b8f19452f"),
    alt: "Fresh whole spices used in the kitchen",
    category: "Kitchen",
  },
  {
    id: "g9",
    src: "/images/menu/paneer-biryani.jpg",
    alt: "Paneer biryani plated and ready to serve",
    category: "Food",
  },
  {
    id: "g11",
    src: "/images/menu/chicken-biryani.jpg",
    alt: "Chicken biryani close-up showing layered saffron rice",
    category: "Biryani",
  },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryImages.map((g) => g.category))),
] as const;
