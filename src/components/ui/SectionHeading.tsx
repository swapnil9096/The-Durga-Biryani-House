import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "mt-3 text-3xl text-charcoal-900 text-balance sm:text-4xl",
          Tag === "h1" && "text-4xl sm:text-5xl"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-charcoal-500">
          {description}
        </p>
      )}
    </div>
  );
}
