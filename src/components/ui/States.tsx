import { cn } from "@/lib/utils";
import { Button } from "./Button";

/** Generic empty state with optional CTA. */
export function EmptyState({
  icon = "🍽️",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal-200 bg-cream-50 px-6 py-14 text-center",
        className
      )}
    >
      <span className="mb-3 text-4xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-charcoal-500">{description}</p>
      )}
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-5">
          {actionHref ? (
            <Button href={actionHref} size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : (
            <Button size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/** Error state with retry. */
export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  retryLabel = "Try again",
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-maroon-200 bg-maroon-50 px-6 py-12 text-center",
        className
      )}
    >
      <span className="mb-3 text-3xl" aria-hidden="true">
        ⚠️
      </span>
      <h3 className="text-lg font-semibold text-maroon-800">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-maroon-700/80">{description}</p>
      {onRetry && (
        <div className="mt-5">
          <Button size="sm" variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/** Rectangular shimmer skeleton block. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} aria-hidden="true" />;
}

/** Skeleton card matching the MenuCard footprint. */
export function MenuCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-9 w-full rounded-full" />
      </div>
    </div>
  );
}
