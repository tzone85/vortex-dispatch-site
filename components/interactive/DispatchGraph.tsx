"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services } from "@/core";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
};

/** Network constellation that reacts to the cursor — lightweight 2D canvas. */
export function DispatchGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0 };
    const nodes: Node[] = [];

    const labels = [
      "Core",
      ...services.slice(0, 6).map((s) => s.title.split(" ")[0] ?? s.title),
    ];

    const layout = () => {
      nodes.length = 0;
      const cx = w / 2;
      const cy = h / 2 + 20;
      nodes.push({
        id: "core",
        label: "Core",
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        baseX: cx,
        baseY: cy,
      });
      const n = labels.length - 1;
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(w, h) * 0.28;
        const bx = cx + Math.cos(ang) * radius;
        const by = cy + Math.sin(ang) * radius;
        nodes.push({
          id: `n${i}`,
          label: labels[i + 1] ?? `N${i}`,
          x: bx,
          y: by,
          vx: 0,
          vy: 0,
          baseX: bx,
          baseY: by,
        });
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      ctx.fillStyle = "#05070d";
      ctx.fillRect(0, 0, w, h);

      // soft grid
      ctx.strokeStyle = "rgba(148, 163, 194, 0.06)";
      ctx.lineWidth = 1;
      const step = 64;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - dist / 280);
        // spring back to base + slight repel/attract from cursor
        node.vx += (node.baseX - node.x) * 0.04;
        node.vy += (node.baseY - node.y) * 0.04;
        node.vx -= (dx / dist) * influence * 1.1;
        node.vy -= (dy / dist) * influence * 1.1;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
      }

      const core = nodes[0];
      // edges core → others
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const midDist = Math.hypot(mouse.x - (n.x + core.x) / 2, mouse.y - (n.y + core.y) / 2);
        const glow = Math.max(0.12, 1 - midDist / 400);
        ctx.strokeStyle = `rgba(45, 226, 230, ${0.15 + glow * 0.55})`;
        ctx.lineWidth = 1 + glow;
        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }
      // ring edges
      for (let i = 1; i < nodes.length; i++) {
        const a = nodes[i];
        const b = nodes[i === nodes.length - 1 ? 1 : i + 1];
        ctx.strokeStyle = "rgba(124, 108, 255, 0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const node of nodes) {
        const isCore = node.id === "core";
        const r = isCore ? 14 : 9;
        const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
        g.addColorStop(0, isCore ? "rgba(45, 226, 230, 0.95)" : "rgba(124, 108, 255, 0.9)");
        g.addColorStop(1, "rgba(5, 7, 13, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isCore ? "#2de2e6" : "#c4b5fd";
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(238, 242, 255, 0.85)";
        ctx.font = "500 11px ui-sans-serif, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + r + 16);
      }

      // cursor halo
      ctx.strokeStyle = "rgba(45, 226, 230, 0.25)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 36, 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(tick);
    };

    resize();
    mouse.x = w / 2;
    mouse.y = h / 2;
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-ink">
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" aria-hidden />
      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
        <header className="pointer-events-auto flex items-start justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
              Interactive demo · canvas
            </p>
            <h1 className="font-display mt-1 text-xl font-semibold sm:text-2xl">
              Dispatch Graph
            </h1>
            <p className="mt-1 max-w-md text-sm text-ink-muted">
              Service nodes push away from the cursor; links brighten as you pass.
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
      </div>
    </div>
  );
}
