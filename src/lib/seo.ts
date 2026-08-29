import type { Metadata } from "next";
import { restaurant } from "@/config/restaurant";

/** Resolved site URL — env var wins, else config, else localhost. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  restaurant.siteUrl ||
  "http://localhost:3000";

interface PageSeoInput {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/menu". */
  path: string;
  /** Optional social share image (absolute or root-relative). */
  image?: string;
}

/** Build per-page Metadata with canonical, Open Graph and Twitter tags.
 *  When `image` is omitted, the app/opengraph-image file convention supplies
 *  the share image automatically. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: restaurant.name,
      title,
      description,
      locale: "en_IN",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: restaurant.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
