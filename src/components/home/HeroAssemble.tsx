import { createElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "span" | "p" | "h1" | "ul";

/**
 * Product-assembly entrance: the piece starts offset (x/y/scale/rotation) and
 * flies into place, staggered by `delay`.
 *
 * Driven by a CSS animation rather than a JS-toggled class so the copy is
 * never gated on hydration — on a slow connection the hero would otherwise
 * sit invisible until the bundle lands. Reduced motion is handled by the
 * `.assemble` override in globals.css.
 */
export function HeroAssemble({
  as = "div",
  children,
  className,
  x = "0px",
  y = "0px",
  scale = 1,
  rot = "0deg",
  delay = 0,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  x?: string;
  y?: string;
  scale?: number;
  rot?: string;
  delay?: number;
}) {
  return createElement(
    as,
    {
      className: cn("assemble", className),
      style: {
        "--a-x": x,
        "--a-y": y,
        "--a-scale": scale,
        "--a-rot": rot,
        animationDelay: `${delay}ms`,
      } as CSSProperties,
    },
    children
  );
}
