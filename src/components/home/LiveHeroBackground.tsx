"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Deterministic particle field (no Math.random → no hydration mismatch).
 * Each particle rises upward forever with a unique drift, spin and delay,
 * giving the "gravity-defying live wallpaper" feel. Values are hand-tuned
 * pseudo-random so the layout is stable between server and client.
 */
const GLYPHS = ["✦", "✧", "❋", "✺", "·", "❈", "✷", "◦"];

const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  // Cheap deterministic hashing off the index.
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  const left = Math.round(r(1) * 100);
  const size = 8 + Math.round(r(2) * 22);
  const duration = 9 + r(3) * 10;
  const delay = -(r(4) * 14);
  const travel = -(320 + Math.round(r(5) * 260));
  const drift = Math.round((r(6) - 0.5) * 120);
  const spin = Math.round((r(7) - 0.5) * 480);
  const opacity = 0.25 + r(8) * 0.5;
  const glyph = GLYPHS[i % GLYPHS.length];
  return { left, size, duration, delay, travel, drift, spin, opacity, glyph };
});

export function LiveHeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax depth: layers translate at different rates while the hero is on
  // screen. rAF-throttled, transform-only → stays on the compositor.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const root = rootRef.current;
        if (!root) return;
        // How far the hero has scrolled out of view (0 at top, grows downward).
        const y = Math.max(0, -root.getBoundingClientRect().top);
        if (baseRef.current)
          baseRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
        if (midRef.current)
          midRef.current.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
        if (glowRef.current)
          glowRef.current.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 — HD biryani base, slow ambient Ken Burns + scroll parallax. */}
      <div ref={baseRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 [animation:var(--animate-hero-zoom)]">
          <SmartImage
            src="/images/menu/hero-biryani.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </div>
      </div>

      {/* Layer 2 — rising steam / warm glow columns behind the plate. */}
      <div ref={glowRef} className="absolute inset-0 will-change-transform">
        {[18, 46, 72].map((left, i) => (
          <span
            key={left}
            className="absolute bottom-0 h-2/3 w-40 rounded-full bg-gold-400/20 blur-3xl [animation:var(--animate-steam)]"
            style={{
              left: `${left}%`,
              animationDelay: `${i * 2.4}s`,
            }}
          />
        ))}
      </div>

      {/* Readability gradients (kept above imagery, below particles). */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/80 to-charcoal-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

      {/* Layer 3 — gravity-defying particle field, fastest parallax. */}
      <div ref={midRef} className="absolute inset-0 will-change-transform">
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
