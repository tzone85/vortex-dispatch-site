const SIGNALS = [
  "Marketplaces",
  "Booking platforms",
  "Compliance tooling",
  "AI-assisted delivery",
  "Payment orchestration",
  "Document engines",
  "PWAs",
  "Rules engines",
];

/** A thin, seamless marquee of what the studio ships. Pure texture between acts. */
export function SignalStrip() {
  const row = [...SIGNALS, ...SIGNALS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-void-2/60 py-4">
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
        style={{ animation: "ticker 38s linear infinite" }}
        aria-hidden="true"
      >
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="mono-meta text-bone-muted">{s}</span>
            <span className="h-1 w-1 rounded-full bg-copper/70" />
          </span>
        ))}
      </div>
      {/* edge fades so the loop dissolves rather than cuts */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
