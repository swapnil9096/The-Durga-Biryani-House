import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { MenuCardSkeleton } from "@/components/ui/States";

export const metadata: Metadata = pageMetadata({
  title: "Menu — Our Biryanis",
  description:
    "Browse the menu at The Durga Biryani House in Kharadi — Chicken, Veg, Egg and Paneer dum biryanis. Filter by veg, non-veg and bestsellers.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <PageHeader
        title="Our Menu"
        description="Freshly prepared, dum-cooked and full of flavour. Add your favourites to the cart and order over WhatsApp."
        crumbs={[{ name: "Menu", path: "/menu" }]}
      />
      <div className="container-px mx-auto max-w-7xl py-8">
        <Suspense fallback={<MenuLoading />}>
          <MenuBrowser />
        </Suspense>
      </div>
    </>
  );
}

function MenuLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </div>
  );
}
