import Link from "next/link";

const options = [
  {
    id: "A",
    name: "Void Orbit (current)",
    href: "/",
    blurb: "Dark precision studio — cyan/violet, grid atmosphere, product-engineering energy.",
    tone: "In production on /",
  },
  {
    id: "B",
    name: "Atelier Light",
    href: "/preview/atelier",
    blurb: "Warm paper editorial — serif display, gold rules, boardroom-ready trust for SA buyers.",
    tone: "Preview",
  },
  {
    id: "C",
    name: "Signal Mono",
    href: "/preview/signal",
    blurb: "High-contrast mono + acid lime — brutalist clarity, fast scan for technical buyers.",
    tone: "Preview",
  },
  {
    id: "LIVE",
    name: "Interactive motion demos",
    href: "/preview/live",
    blurb: "Lightweight mouse-reactive fields: vortex particles, dispatch graph, capability orbit.",
    tone: "Live canvas/CSS",
  },
] as const;

export default function PreviewIndexPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-ink">
      <p className="section-kicker">Design options</p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">
        Vortex Dispatch — three UI directions
      </h1>
      <p className="mt-4 text-ink-muted">
        Option A is live. B and C are full preview pages with the same content model —
        pick a direction and we promote it to production.
      </p>
      <ul className="mt-10 space-y-4">
        {options.map((opt) => (
          <li key={opt.id}>
            <Link
              href={opt.href}
              className="glass-panel block rounded-2xl p-6 transition hover:border-cyan/40"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-cyan">Option {opt.id}</span>
                <span className="rounded-full border border-line px-2 py-0.5 text-xs text-ink-faint">
                  {opt.tone}
                </span>
              </div>
              <h2 className="font-display mt-2 text-2xl font-semibold">{opt.name}</h2>
              <p className="mt-2 text-sm text-ink-muted">{opt.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
