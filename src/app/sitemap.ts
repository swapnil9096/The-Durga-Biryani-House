import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { primaryNav, footerLegal } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...primaryNav, ...footerLegal].map((l) => l.href);

  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path === "/menu" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/menu" ? 0.9 : 0.6,
  }));
}
