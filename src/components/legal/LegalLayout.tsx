import type { Crumb } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

export interface LegalSection {
  heading: string;
  body: string[];
}

/** Shared, editable template layout for legal pages. */
export function LegalLayout({
  title,
  crumbs,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  crumbs: Crumb[];
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader title={title} crumbs={crumbs} />
      <div className="container-px mx-auto max-w-3xl py-12">
        <div className="rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
          This is an editable template provided for convenience. It has not been
          reviewed by a lawyer — please have it checked and customised before
          relying on it.
        </div>

        <p className="mt-6 text-sm text-charcoal-400">Last updated: {lastUpdated}</p>
        <p className="mt-4 leading-relaxed text-charcoal-600">{intro}</p>

        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-charcoal-900">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-2 leading-relaxed text-charcoal-600">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
