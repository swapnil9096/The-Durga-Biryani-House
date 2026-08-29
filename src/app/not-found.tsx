import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-maroon-700 sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-charcoal-900 sm:text-4xl">
        Looks like this biryani went missing.
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-charcoal-600">
        The page you were looking for isn&apos;t on the menu. Let&apos;s get you
        back to something delicious.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" size="lg">
          Back to Home
        </Button>
        <Button href="/menu" variant="outline" size="lg">
          View Menu
        </Button>
      </div>
    </div>
  );
}
