"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import type { GalleryCategory } from "@/types";
import { galleryImages, galleryCategories } from "@/data/gallery";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      filter === "All"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter]
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === cat
                ? "bg-maroon-700 text-cream-50"
                : "bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns */}
      <div className="mt-8 [column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label={`View image: ${image.alt}`}
          >
            <span className="relative block">
              <SmartImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={image.tall ? 1000 : image.wide ? 500 : 700}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-charcoal-950/0 transition-colors group-hover:bg-charcoal-950/10" />
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal-950/90 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-50 hover:bg-white/20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-50 hover:bg-white/20 sm:left-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure className="max-h-[85vh] max-w-4xl">
            <SmartImage
              src={active.src}
              alt={active.alt}
              width={1200}
              height={900}
              className="max-h-[78vh] w-auto rounded-xl object-contain"
              priority
            />
            <figcaption className="mt-3 text-center text-sm text-cream-100/80">
              {active.alt}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-50 hover:bg-white/20 sm:right-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
