import { company, navigation, primaryCta } from "@/core";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-void/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group" aria-label={`${company.brandName} home`}>
          <Logo />
        </a>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href={primaryCta.href} className="btn-primary !px-4 !py-2 text-sm">
          {primaryCta.label}
        </a>
      </div>
    </header>
  );
}
