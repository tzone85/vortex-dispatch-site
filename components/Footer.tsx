import { company, navigation } from "@/core";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-faint">
            {company.tagline}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-ink-muted transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-line pt-6 text-xs text-ink-faint">
        <p>
          © {year} {company.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
