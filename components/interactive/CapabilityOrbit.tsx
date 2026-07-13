"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/core";

const BODIES = services.slice(0, 6).map((s, i) => ({
  id: s.id,
  label: s.title,
  ring: 90 + i * 38,
  size: 10 + (i % 3) * 3,
  speed: 0.25 + i * 0.08,
  phase: (i / 6) * Math.PI * 2,
  hue: i % 2 === 0 ? "cyan" : "violet",
}));

/**
 * Solar-system style orbit: CSS 3D tilt follows pointer; bodies circle a brand core.
 * No WebGL — transform + rAF only.
 */
export function CapabilityOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 12, y: -16 });
  const angles = useRef(BODIES.map((b) => b.phase));
  const [, setTick] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      for (let i = 0; i < BODIES.length; i++) {
        angles.current[i] += BODIES[i].speed * 0.012;
      }
      setTick((t) => t + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: 12 + ny * -28,
        y: -16 + nx * 32,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-ink">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
      <header className="relative z-20 flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
            Interactive demo · CSS 3D
          </p>
          <h1 className="font-display mt-1 text-xl font-semibold sm:text-2xl">
            Capability Orbit
          </h1>
          <p className="mt-1 max-w-md text-sm text-ink-muted">
            Move the mouse to tilt the system — capabilities orbit the brand core.
          </p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/preview/live" className="text-ink-muted hover:text-ink">
            All demos
          </Link>
          <Link href="/" className="text-cyan hover:underline">
            Home
          </Link>
        </nav>
      </header>

      <div
        ref={stageRef}
        className="relative z-10 mx-auto flex h-[min(70vh,560px)] max-w-4xl items-center justify-center px-4"
        style={{ perspective: "900px" }}
      >
        <div
          className="relative h-[420px] w-[420px] max-w-full"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.12s ease-out",
          }}
        >
          {/* orbital rings */}
          {BODIES.map((b) => (
            <div
              key={`ring-${b.id}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-line/80"
              style={{
                width: b.ring * 2,
                height: b.ring * 2,
                marginLeft: -b.ring,
                marginTop: -b.ring,
                transform: "rotateX(72deg)",
                boxShadow: "0 0 24px rgba(45, 226, 230, 0.04)",
              }}
            />
          ))}

          {/* core */}
          <div
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #2de2e6, #7c6cff 55%, #0a0e18 100%)",
              boxShadow:
                "0 0 40px rgba(45, 226, 230, 0.45), 0 0 80px rgba(124, 108, 255, 0.25)",
              transform: "translateZ(20px)",
            }}
          >
            <span className="font-display text-[0.65rem] font-bold tracking-wide text-void">
              VD
            </span>
          </div>

          {/* bodies */}
          {BODIES.map((b, i) => {
            const ang = angles.current[i];
            const x = Math.cos(ang) * b.ring;
            const y = Math.sin(ang) * b.ring * 0.35;
            const z = Math.sin(ang) * 40;
            const color = b.hue === "cyan" ? "#2de2e6" : "#a78bfa";
            return (
              <div
                key={b.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px)`,
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: b.size,
                    height: b.size,
                    background: color,
                    boxShadow: `0 0 16px ${color}`,
                  }}
                  title={b.label}
                />
                <span
                  className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-wider text-ink-muted"
                  style={{ textShadow: "0 1px 4px #05070d" }}
                >
                  {b.label.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="relative z-10 px-5 pb-10 text-center text-sm text-ink-faint sm:px-8">
        Solar-system metaphor for delivery capabilities — still under  a few KB of
        logic, no Three.js.
      </p>
    </div>
  );
}
