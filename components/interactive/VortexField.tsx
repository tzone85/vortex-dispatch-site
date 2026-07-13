"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

/** Lightweight canvas field: particles gently swirl toward the pointer. */
export function VortexField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const COUNT = 90;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1 + Math.random() * 2.2,
          a: 0.25 + Math.random() * 0.55,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    const tick = () => {
      ctx.fillStyle = "rgba(5, 7, 13, 0.22)";
      ctx.fillRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const active = mouse.current.active;

      for (const p of particles) {
        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          // swirl: tangential force + soft pull
          const pull = 0.012;
          const swirl = 0.028;
          p.vx += (dx / dist) * pull + (-dy / dist) * swirl;
          p.vy += (dy / dist) * pull + (dx / dist) * swirl;
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(45, 226, 230, ${p.a})`);
        g.addColorStop(0.5, `rgba(124, 108, 255, ${p.a * 0.45})`);
        g.addColorStop(1, "rgba(45, 226, 230, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (active) {
        ctx.strokeStyle = "rgba(45, 226, 230, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 48, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    seed();
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, 0, w, h);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-ink">
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" aria-hidden />
      <Shell
        title="Vortex Field"
        subtitle="Particles spiral toward your pointer — soft pull + swirl, ~90 dots."
      />
    </div>
  );
}

function Shell({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
      <header className="pointer-events-auto flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
            Interactive demo · canvas
          </p>
          <h1 className="font-display mt-1 text-xl font-semibold sm:text-2xl">{title}</h1>
          <p className="mt-1 max-w-md text-sm text-ink-muted">{subtitle}</p>
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
      <div className="pointer-events-none flex flex-1 items-center justify-center px-5 pb-20">
        <div className="max-w-lg text-center">
          <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            We build commercial software
          </p>
          <p className="mt-4 text-ink-muted">
            The field is live — move the mouse and watch the vortex form.
          </p>
        </div>
      </div>
    </div>
  );
}
