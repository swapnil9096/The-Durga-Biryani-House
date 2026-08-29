import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { restaurant } from "@/config/restaurant";

/**
 * Brand logo. Uses the finished lockup image (name + tagline are part of the
 * artwork), so no separate text is rendered. The `variant`/`showTagline` props
 * are accepted for backwards compatibility but no longer change the output.
 */
export function Logo({
  className,
}: {
  className?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${restaurant.name} — home`}
      className={cn("group inline-flex items-center", className)}
    >
      <span className="overflow-hidden rounded-xl ring-1 ring-gold-400/30 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/brand/logo-emblem.png"
          alt={restaurant.name}
          width={1536}
          height={1024}
          priority
          className="block h-12 w-auto sm:h-14"
        />
      </span>
    </Link>
  );
}
