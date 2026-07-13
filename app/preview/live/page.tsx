import Link from "next/link";

const demos = [
  {
    id: "vortex",
    name: "Vortex Field",
    href: "/preview/live/vortex",
    blurb:
      "Lightweight particle field that swirls toward the cursor — quiet depth without heavy 3D.",
  },
  {
    id: "constellation",
    name: "Dispatch Graph",
    href: "/preview/live/constellation",
    blurb:
      "Interactive node graph: services as stars, lines light up as you move — orchestration metaphor.",
  },
  {
    id: "orbit",
    name: "Capability Orbit",
    href: "/preview/live/orbit",
    blurb:
      "Solar-system style rings: capabilities orbit a brand core; mouse tilts the system in 3D-ish CSS.",
  },
] as const;

export default function LiveDemosIndexPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-ink">
      <p className="section-kicker">Interactive previews</p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">
        Live motion — still lightweight
      </h1>
      <p className="mt-4 text-ink-muted leading-relaxed">
        Three Chrome-ready experiments for the Void Orbit site. Pure canvas/CSS —
        no WebGL libraries, no heavy bundles. Open each and move the mouse.
      </p>
      <ul className="mt-10 space-y-4">
        {demos.map((d) => (
          <li key={d.id}>
            <Link
              href={d.href}
              className="glass-panel block rounded-2xl p-6 transition hover:border-cyan/40"
            >
              <span className="font-mono text-xs text-cyan">{d.id}</span>
              <h2 className="font-display mt-2 text-2xl font-semibold">{d.name}</h2>
              <p className="mt-2 text-sm text-ink-muted">{d.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-ink-faint">
        <Link href="/" className="text-cyan hover:underline">
          ← Back to production home
        </Link>
      </p>
    </main>
  );
}
