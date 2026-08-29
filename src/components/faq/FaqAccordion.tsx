import { faqs } from "@/data/faq";

/** Native <details> accordion — accessible and works without JS. */
export function FaqAccordion() {
  return (
    <div className="divide-y divide-charcoal-100 rounded-2xl border border-charcoal-100 bg-white">
      {faqs.map((f) => (
        <details key={f.id} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-charcoal-900">
            {f.question}
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon-50 text-maroon-700 transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-charcoal-600">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
