"use client";

import {
  createElement,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "span" | "p" | "h1" | "ul";

/**
 * Product-assembly entrance: the piece starts offset (x/y/scale/rotation) and
 * flies into place on mount, staggered by `delay`. Uses the `.assemble` /
 * `.is-assembled` CSS pair so reduced-motion users get the settled state
 * immediately.
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
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return createElement(
    as,
    {
      className: cn("assemble", assembled && "is-assembled", className),
      style: {
        "--a-x": x,
        "--a-y": y,
        "--a-scale": scale,
        "--a-rot": rot,
      } as CSSProperties,
    },
    children
  );
}
