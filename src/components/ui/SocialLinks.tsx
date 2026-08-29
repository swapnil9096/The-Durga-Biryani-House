import { restaurant } from "@/config/restaurant";

/**
 * Renders social icons only for platforms with a real URL configured.
 * Returns null when none are set — so no fake/empty links ever appear.
 */
export function SocialLinks({
  className,
  heading,
}: {
  className?: string;
  /** Optional call-to-action shown above the icons; hidden with them when no socials are set. */
  heading?: string;
}) {
  const active = restaurant.socials.filter((s) => Boolean(s.url));
  if (active.length === 0) return null;

  return (
    <div className={className}>
      {heading && (
        <p className="mb-3 text-sm text-cream-200/80">{heading}</p>
      )}
      <ul className="flex items-center gap-3">
        {active.map((s) => (
          <li key={s.platform}>
            <a
              href={s.url as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-800 text-cream-100 transition-colors hover:bg-maroon-700"
            >
              <SocialIcon platform={s.platform} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  if (platform === "instagram") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.4.17-.7.37-1 .67-.3.3-.5.6-.67 1-.12.3-.28.8-.32 1.7C3.8 8.5 3.8 8.9 3.8 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.4.37.7.67 1 .3.3.6.5 1 .67.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.4-.17.7-.37 1-.67.3-.3.5-.6.67-1 .12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7-.17-.4-.37-.7-.67-1-.3-.3-.6-.5-1-.67-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3-.04-1.25-.13-2.35-.13-2.32 0-3.9 1.42-3.9 4.02v2.24H8v3.1h2.75V21h2.75Z" />
      </svg>
    );
  }
  // google
  return (
    <svg {...common} fill="currentColor">
      <path d="M12 11v2.8h4c-.17 1-1.2 3-4 3a3.8 3.8 0 0 1 0-7.6c1.1 0 1.9.47 2.35.87l1.6-1.55C14.9 5.6 13.6 5 12 5a5.9 5.9 0 1 0 0 11.8c3.4 0 5.65-2.4 5.65-5.77 0-.4-.04-.7-.1-1.03H12Z" />
    </svg>
  );
}
