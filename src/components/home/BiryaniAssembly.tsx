"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

/* ────────────────────────────────────────────────────────────
   BiryaniAssembly — a FIXED, full-viewport live background that
   spans the ENTIRE home page. The whole-page scroll progress
   (0 at the top, 1 near the bottom) is scrubbed to the animation:
   the ingredient bands of the supplied "exploded biryani" photo
   descend, under gravity and stagger, DOWN into the fixed clay
   handi and settle — bottom layers first, saffron last. By the end
   of the page the dish is fully assembled.

   ONE photo, sliced into horizontal bands with clip-path. Every band
   is the SAME image in the SAME stage box (object-cover), so with no
   transform they reassemble the source composition pixel-for-pixel —
   the fully-assembled dish IS the intact reference photograph.

   Movement is purely vertical: horizontal strips fall straight down,
   so each band's dark regions tile with its neighbours' and no hard
   rectangular edges are ever exposed. Scrolling up reverses it. No
   autoplay. Reduced-motion / no-JS fall back to the finished still.
   ──────────────────────────────────────────────────────────── */

const IMAGE = "/images/menu/biryani-handi-assembly.png";
const SIZES = "100vw";

/* Horizontal slice of the source (fractions of height, top = 0), with a small
   bleed so neighbouring bands overlap rather than gap — the overlap is
   invisible because the pixels are identical. */
const band = (f0: number, f1: number) => {
  const top = Math.max(0, f0 - 0.014) * 100;
  const bottom = (1 - Math.min(1, f1 + 0.014)) * 100;
  return `inset(${top.toFixed(2)}% 0% ${bottom.toFixed(2)}% 0%)`;
};

/* Each falling ingredient. `lift` = FRACTION OF THE STAGE-BOX HEIGHT it hovers
   ABOVE its natural spot at p=0. Motion runs from -lift (scattered high) → 0
   (natural position); at rest the bands carry NO transform, so they reassemble
   the source photo. Higher ingredients start higher and land later, so the
   dish gathers from the bottom up. */
type Ingredient = {
  id: string;
  clip: string;
  lift: number; // frac of box height, upward at p=0
  scaleFrom: number; // scale at p=0 (settles to 1)
  spread: number; // extra scaleX while falling (looser, less rigid)
  start: number;
  end: number;
};

const INGREDIENTS: Ingredient[] = [
  // rice — lands first, spreads a little so it never reads as a rigid strip
  { id: "rice", clip: band(0.54, 0.79), lift: 0.07, scaleFrom: 1.05, spread: 0.04, start: 0.02, end: 0.42 },
  // chicken — the hero pieces
  { id: "chicken", clip: band(0.38, 0.58), lift: 0.15, scaleFrom: 1.06, spread: 0, start: 0.1, end: 0.55 },
  // fried onions (birista)
  { id: "birista", clip: band(0.27, 0.41), lift: 0.23, scaleFrom: 1.05, spread: 0.03, start: 0.2, end: 0.68 },
  // mint & coriander — lightest, drifts down late
  { id: "herbs", clip: band(0.19, 0.3), lift: 0.31, scaleFrom: 1.04, spread: 0.05, start: 0.3, end: 0.78 },
  // onion rings + whole spices
  { id: "rings", clip: band(0.1, 0.22), lift: 0.39, scaleFrom: 1.04, spread: 0, start: 0.4, end: 0.86 },
  // saffron — the finishing flourish, lands last
  { id: "saffron", clip: band(0.0, 0.13), lift: 0.46, scaleFrom: 1.03, spread: 0, start: 0.5, end: 0.94 },
];

const HANDI_CLIP = band(0.74, 1.0);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
// Fall then settle: accelerate under gravity, decelerate into the pot.
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Deterministic steam column (no Math.random → no hydration mismatch). The
   first 5 always render; the rest carry `.assembly-steam-extra` and are hidden
   on small screens via CSS, keeping the mobile particle count low. */
const GLYPHS = ["✦", "✧", "◦", "❈", "✷"];
const STEAM = Array.from({ length: 10 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: 40 + Math.round(r(1) * 20), // tight column over the pot mouth
    size: 8 + Math.round(r(2) * 16),
    duration: 9 + r(3) * 8,
    delay: -(r(4) * 14),
    travel: -(300 + Math.round(r(5) * 220)),
    drift: Math.round((r(6) - 0.5) * 80),
    spin: Math.round((r(7) - 0.5) * 360),
    opacity: 0.18 + r(8) * 0.35,
    glyph: GLYPHS[i % GLYPHS.length],
  };
});

export function BiryaniAssembly() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const steamRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stage = stageRef.current;
    if (!stage) return;
    stage.dataset.active = "on"; // hides the fallback still; JS now drives bands

    const mqMobile = window.matchMedia("(max-width: 640px)");
    let mobile = mqMobile.matches;
    const onMq = (e: MediaQueryListEvent) => {
      mobile = e.matches;
    };
    mqMobile.addEventListener("change", onMq);

    let raf = 0;
    const apply = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      // Finish plating by 90% of the page so the assembled dish is enjoyed
      // through the closing sections rather than only at the very last pixel.
      const progress = clamp01(window.scrollY / scrollable / 0.9);
      // Mobile keeps ingredients on-screen: shorter drops.
      const travel = mobile ? 0.8 : 1;

      INGREDIENTS.forEach((ing, i) => {
        const el = bandRefs.current[i];
        if (!el) return;
        const local = clamp01((progress - ing.start) / Math.max(0.0001, ing.end - ing.start));
        const e = easeInOut(local);
        const inv = 1 - e;
        // Falls from -lift (scattered high) to 0 (natural resting spot).
        let pos = -ing.lift * inv * travel;
        // Tiny settle: a small dip past the resting point then back, only in the
        // last stretch of the fall — reads as the layer compacting into the pot.
        if (local > 0.82) pos += Math.sin(((local - 0.82) / 0.18) * Math.PI) * 0.01 * travel;
        const scaleY = 1 + (ing.scaleFrom - 1) * inv;
        const scaleX = scaleY + ing.spread * inv;
        el.style.transform =
          `translate3d(0, ${(pos * 100).toFixed(2)}%, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
        // Suspended ingredients read clearly from the start, then reach full
        // opacity as they engage (black-over-charcoal areas stay invisible).
        el.style.opacity = clamp01(0.5 + local * 2).toFixed(3);
      });

      // Steam and pot glow build as the dish cooks (subtle even when empty).
      if (steamRef.current) steamRef.current.style.opacity = (0.1 + 0.9 * easeOut(progress)).toFixed(3);
      if (glowRef.current) glowRef.current.style.opacity = (0.35 + 0.65 * easeOut(progress)).toFixed(3);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mqMobile.removeEventListener("change", onMq);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden bg-charcoal-950"
      aria-hidden="true"
    >
      {/* Warm heat glow low-centre, behind the pot. */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[62%] h-[64vh] w-[64vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,171,53,0.24)_0%,rgba(122,31,29,0.18)_45%,transparent_72%)] blur-2xl"
        style={{ opacity: 0.35 }}
      />

      {/* The stage fills the whole viewport. Every band is the same image with
          the same object-cover mapping in this same box, so they crop
          identically and reassemble seamlessly at any screen size / aspect. */}
      <div
        ref={stageRef}
        data-active="off"
        className="assembly-stage absolute inset-0 h-full w-full"
      >
        {/* Fixed clay handi — the anchor. Always visible, never transformed. */}
        <div className="assembly-base absolute inset-0" style={{ clipPath: HANDI_CLIP } as CSSProperties}>
          <SmartImage src={IMAGE} alt="" fill priority sizes={SIZES} className="object-cover" />
        </div>

        {/* Falling ingredient bands. */}
        {INGREDIENTS.map((ing, i) => (
          <div
            key={ing.id}
            ref={(el) => {
              bandRefs.current[i] = el;
            }}
            className="assembly-band absolute inset-0"
            style={{ clipPath: ing.clip } as CSSProperties}
          >
            <SmartImage src={IMAGE} alt="" fill priority sizes={SIZES} className="object-cover" />
          </div>
        ))}

        {/* Full image — the pre-JS / reduced-motion finished still. */}
        <div className="assembly-final absolute inset-0">
          <SmartImage src={IMAGE} alt="" fill priority sizes={SIZES} className="object-cover" />
        </div>
      </div>

      {/* Readability veil — keeps foreground content legible over the scene. */}
      <div className="absolute inset-0 bg-charcoal-950/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-transparent to-charcoal-950/82" />

      {/* Rising steam over the pot mouth. */}
      <div ref={steamRef} className="absolute inset-0" style={{ opacity: 0.1 }}>
        {STEAM.map((p, i) => (
          <span
            key={i}
            className={`hero-particle absolute bottom-[16%] select-none text-cream-100/70 [animation:particle-rise_var(--p-dur)_linear_infinite]${
              i >= 5 ? " assembly-steam-extra" : ""
            }`}
            style={
              {
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                "--p-dur": `${p.duration}s`,
                "--p-travel": `${p.travel}px`,
                "--p-drift": `${p.drift}px`,
                "--p-spin": `${p.spin}deg`,
                "--p-opacity": p.opacity,
                "--p-scale": 1,
              } as CSSProperties
            }
          >
            {p.glyph}
          </span>
        ))}
      </div>
    </div>
  );
}
