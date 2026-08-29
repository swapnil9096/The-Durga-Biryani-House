import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  /** "dark" recolours the text for placement over a dark background. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            dark ? "text-gold-300" : "text-gold-600"
          )}
        >
          <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "mt-3 text-3xl text-balance sm:text-4xl",
          dark ? "text-cream-50" : "text-charcoal-900",
          Tag === "h1" && "text-4xl sm:text-5xl"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            dark ? "text-cream-100/80" : "text-charcoal-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
