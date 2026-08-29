import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Standard inner-page hero with breadcrumbs, title and optional description. */
export function PageHeader({
  title,
  description,
  crumbs,
  className,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <div className={cn("border-b border-charcoal-100 bg-cream-100/50", className)}>
      <div className="container-px mx-auto max-w-7xl py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 font-display text-3xl font-bold text-charcoal-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
