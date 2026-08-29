import type { ExtraOption } from "@/types";

/**
 * ORDER EXTRAS
 * ------------
 * Optional add-ons customers can attach to any order. Edit prices here.
 */
export const extras: ExtraOption[] = [
  {
    id: "extra-raita",
    name: "Raita",
    price: 12,
    unit: "per bowl",
    vegetarian: true,
  },
  {
    id: "extra-salad",
    name: "Salad",
    price: 10,
    unit: "per bowl",
    vegetarian: true,
  },
];

export function getExtra(id: string): ExtraOption | undefined {
  return extras.find((e) => e.id === id);
}
