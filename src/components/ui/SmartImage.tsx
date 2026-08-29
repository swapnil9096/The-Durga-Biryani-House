"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a graceful fallback. If the src is empty or fails to load,
 * a branded placeholder (spice-toned gradient + icon) is shown instead of a
 * broken image. Keeps alt text for accessibility in all states.
 */
export function SmartImage({
  src,
  alt,
  className,
  fallbackIcon = "🍛",
  ...props
}: Omit<ImageProps, "src"> & {
  src: string;
  alt: string;
  fallbackIcon?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  // Derive failure from the current src so a new src re-attempts the load
  // instead of being stuck on a prior failure (e.g. gallery lightbox next/prev).
  const failed = !src || failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-maroon-100 via-cream-100 to-gold-100 text-4xl",
          props.fill && "absolute inset-0 h-full w-full",
          className
        )}
      >
        <span aria-hidden="true">{fallbackIcon}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  );
}
