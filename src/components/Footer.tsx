import { brandAssets, company, navigation } from "@/core";

/** Footer. Signature credit is deliberately lowercase, per brand. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-void-2/60">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <img
              src={brandAssets.logo64}
              alt=""
              width={40}
              height={40}
              className="mt-0.5 h-10 w-10 rounded-[9px] shadow-[0_0_0_1px_rgba(236,229,216,0.08)]"
              decoding="async"
            />
            <div>
              <span className="font-display text-lg font-bold text-bone">
                Vortex<span className="text-copper">·</span>Dispatch
              </span>
              <p className="mono-meta mt-2">{company.tagline}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="mono-meta transition-colors hover:text-copper-bright"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-meta">
            © {company.foundedYear}–2026 {company.name} · {company.location}
          </p>
          <p className="mono-meta">
            made with <span className="text-copper-bright">❤️</span> by vortex
            dispatch
          </p>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            <a
              href="/privacy"
              className="text-sm text-bone-muted hover:text-copper transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-bone-muted hover:text-copper transition-colors"
            >
              Terms
            </a>
            <a
              href="/cookies"
              className="text-sm text-bone-muted hover:text-copper transition-colors"
            >
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
