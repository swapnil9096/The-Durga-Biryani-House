import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: restaurant.name,
    short_name: "Durga Biryani",
    description: restaurant.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e6",
    theme_color: "#7a1f1d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
