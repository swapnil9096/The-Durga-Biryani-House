import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon-700 text-cream-50 hover:bg-maroon-800 shadow-sm hover:shadow-md",
  secondary:
    "bg-charcoal-900 text-cream-50 hover:bg-charcoal-800 shadow-sm",
  gold: "bg-gold-300 text-charcoal-950 hover:bg-gold-400 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-cream-50",
  ghost: "text-charcoal-700 hover:bg-charcoal-100",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5 sm:text-base",
  lg: "text-base px-7 py-3.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "md", className } = props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href !== undefined) {
      const { href, external, children, onClick, ...rest } = props;
      if (external) {
        return (
          <a
            href={href}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            aria-label={rest["aria-label"]}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} onClick={onClick} className={classes} aria-label={rest["aria-label"]}>
          {children}
        </Link>
      );
    }

    const { children, ...rest } = props as ButtonAsButton;
    // Strip our styling props so they neither leak onto the DOM node nor
    // (in className's case) override the computed classes when spread.
    const domProps = { ...rest } as Record<string, unknown>;
    delete domProps.variant;
    delete domProps.size;
    delete domProps.className;
    return (
      <button ref={ref} className={classes} {...domProps}>
        {children}
      </button>
    );
  }
);
