"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

/* ────────────────────────────────────────────────────────────
   AssemblyScene — a FIXED, full-viewport live background. One
   biryani photograph is carved into wedges with clip-paths; the
   whole-page scroll progress (0 at the top of the home page, 1 at
   the bottom) drives those wedges from scattered → assembled, then
   crossfades the untouched photo over the seams at the very end.

   Geometry is identical to ProductAssembly so the union of the
   pieces tiles back into the whole photo pixel-for-pixel. Only the
   driver differs: document scroll, not the hero's own position.
   ──────────────────────────────────────────────────────────── */

const RAD = Math.PI / 180;
const R_OUT = 50;
const STEP = 3;
const WEDGE_OVERLAP_DEG = 4;
const SEAM_OVERLAP = 3.5;
const SPLIT_OVERLAP = 3;

type Point = { x: number; y: number };

const seamRadius = (deg: number) =>
  27 + 3.2 * Math.sin(deg * 3 * RAD) + 1.4 * Math.sin(deg * 5 * RAD + 1.1);

const splitY = (x: number) => 43 + 2.4 * Math.sin((x - 50) * 0.14);

const polar = (deg: number, r: number): Point => ({
  x: 50 + r * Math.cos(deg * RAD),
  y: 50 + r * Math.sin(deg * RAD),
});

const toPolygon = (points: Point[]) =>
  `polygon(${points.map((p) => `${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`).join(", ")})`;

function wedge(a0: number, a1: number) {
  const from = a0 - WEDGE_OVERLAP_DEG;
  const to = a1 + WEDGE_OVERLAP_DEG;
  const points: Point[] = [];
  for (let a = from; a < to; a += STEP) points.push(polar(a, R_OUT));
  points.push(polar(to, R_OUT));
  for (let a = to; a > from; a -= STEP) points.push(polar(a, seamRadius(a) - SEAM_OVERLAP));
  points.push(polar(from, seamRadius(from) - SEAM_OVERLAP));
  return toPolygon(points);
}

function core(half: "top" | "bottom") {
  const points: Point[] = [];
  for (let a = 0; a < 360; a += STEP) {
    const p = polar(a, seamRadius(a) + SEAM_OVERLAP);
    const limit = splitY(p.x);
    points.push({
      x: p.x,
      y:
        half === "bottom"
          ? Math.max(p.y, limit - SPLIT_OVERLAP)
          : Math.min(p.y, limit + SPLIT_OVERLAP),
    });
  }
  return toPolygon(points);
}

/* Each piece: its clip, the scattered offset it flies in FROM (vw/vh units so
   the scatter scales with the viewport), rotation, and the [start,end] window
   of overall scroll progress during which it converges. Windows overlap so the
   dish builds continuously rather than in discrete pops. */
type Piece = {
  id: string;
  clip: string;
  x: number; // vw
  y: number; // vh
  rot: number;
  scale: number;
  start: number;
  end: number;
};

const PIECES: Piece[] = [
  { id: "base", clip: wedge(60, 120), x: 0, y: 42, rot: -8, scale: 0.9, start: 0.0, end: 0.34 },
  { id: "lower-left", clip: wedge(120, 180), x: -46, y: 8, rot: -16, scale: 0.92, start: 0.05, end: 0.44 },
  { id: "lower-right", clip: wedge(0, 60), x: 46, y: 8, rot: 16, scale: 0.92, start: 0.05, end: 0.44 },
  { id: "upper-left", clip: wedge(180, 240), x: -46, y: -12, rot: -16, scale: 0.92, start: 0.12, end: 0.52 },
  { id: "upper-right", clip: wedge(300, 360), x: 46, y: -12, rot: 16, scale: 0.92, start: 0.12, end: 0.52 },
  { id: "top", clip: wedge(240, 300), x: 0, y: -46, rot: 8, scale: 0.92, start: 0.2, end: 0.62 },
  { id: "chicken", clip: core("bottom"), x: 0, y: -30, rot: 0, scale: 1.12, start: 0.34, end: 0.74 },
  { id: "garnish", clip: core("top"), x: 0, y: -40, rot: -10, scale: 0.9, start: 0.46, end: 0.84 },
];

const IMAGE = "/images/menu/hyderabadi-chicken-biryani.jpg";
const SIZES = "(max-width: 640px) 90vw, (max-width: 1023px) 70vh, 70vh";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* Deterministic particle field (no Math.random → no hydration mismatch). */
const GLYPHS = ["✦", "✧", "❋", "✷", "◦", "❈"];
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: Math.round(r(1) * 100),
    size: 8 + Math.round(r(2) * 20),
    duration: 10 + r(3) * 10,
    delay: -(r(4) * 16),
    travel: -(340 + Math.round(r(5) * 260)),
    drift: Math.round((r(6) - 0.5) * 120),
    spin: Math.round((r(7) - 0.5) * 480),
    opacity: 0.22 + r(8) * 0.45,
    glyph: GLYPHS[i % GLYPHS.length],
  };
});

export function AssemblyScene() {
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dish = dishRef.current;
    if (dish) dish.dataset.scroll = "on"; // hands control to JS (see globals.css)

    let raf = 0;
    const apply = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      // Finish the plating by 85% of the page so the completed dish is enjoyed
      // through the closing sections rather than only at the very bottom.
      const progress = clamp01(window.scrollY / scrollable / 0.85);

      PIECES.forEach((piece, i) => {
        const el = pieceRefs.current[i];
        if (!el) return;
        const local = clamp01((progress - piece.start) / Math.max(0.0001, piece.end - piece.start));
        const e = easeOut(local);
        const inv = 1 - e;
        const scale = piece.scale + (1 - piece.scale) * e;
        el.style.transform =
          `translate3d(${(piece.x * inv).toFixed(2)}vw, ${(piece.y * inv).toFixed(2)}vh, 0)` +
          ` rotate(${(piece.rot * inv).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        // Fragments stay visible while scattered so the scene never reads blank.
        el.style.opacity = clamp01(0.32 + local * 3).toFixed(3);
      });

      if (finalRef.current) {
        finalRef.current.style.opacity = easeOut(clamp01((progress - 0.82) / 0.18)).toFixed(3);
      }
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-charcoal-950"
      aria-hidden="true"
    >
      {/* Warm ambient glow behind the plate. */}
      <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,171,53,0.22)_0%,rgba(122,31,29,0.18)_45%,transparent_72%)] blur-2xl" />

      {/* The dish: a viewport-centred square carved into flying wedges. */}
      <div
        ref={dishRef}
        data-scroll="off"
        className="pa-scene absolute left-1/2 top-1/2 aspect-square w-[90vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 sm:w-[70vh] sm:max-w-[70vh]"
      >
        <div className="pa-scene-pieces absolute inset-0">
          {PIECES.map((piece, i) => (
            <div
              key={piece.id}
              ref={(el) => {
                pieceRefs.current[i] = el;
              }}
              className="pa-scene-piece absolute inset-0"
              style={{ clipPath: piece.clip } as CSSProperties}
            >
              <SmartImage src={IMAGE} alt="" fill priority sizes={SIZES} className="object-cover" />
            </div>
          ))}
        </div>

        {/* Untouched photo — the resting state, crossfaded in at the end. */}
        <div ref={finalRef} className="pa-scene-final absolute inset-0">
          <SmartImage src={IMAGE} alt="" fill priority sizes={SIZES} className="object-cover" />
        </div>

        {/* Rim + vignette to seat the dish into the dark scene. */}
        <div className="absolute inset-0 rounded-full ring-1 ring-gold-300/20 [box-shadow:0_40px_120px_-30px_rgba(0,0,0,0.9)]" />
      </div>

      {/* Readability veil — kept dark so foreground content always wins. */}
      <div className="absolute inset-0 bg-charcoal-950/78" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-transparent to-charcoal-950/85" />

      {/* Gravity-defying particles. */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute bottom-[-40px] select-none text-gold-300 [animation:particle-rise_var(--p-dur)_linear_infinite]"
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
