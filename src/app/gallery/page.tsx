import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = pageMetadata({
  title: "Gallery — Our Biryani & Kitchen",
  description:
    "A look at the biryani, food, kitchen and restaurant at The Durga Biryani House in Kharadi, Pune.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="A taste of what to expect — from steaming biryani to our kitchen and packaging."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <div className="container-px mx-auto max-w-7xl py-10">
        <GalleryGrid />
      </div>
    </>
  );
}
