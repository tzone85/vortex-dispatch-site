import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { company, navigation, primaryCta } from "@/core";

/** Fixed nav that gains a hairline + blur once you leave the hero. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-void/72 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="group flex items-center gap-2.5" aria-label={`${company.name} — home`}>
          <Mark />
          <span className="font-display text-[0.98rem] font-bold tracking-tight text-bone">
            Vortex<span className="text-copper">·</span>Dispatch
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={isHomePage ? item.href : `/${item.href}`}
              className="mono-meta text-bone-muted transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href={isHomePage ? primaryCta.href : `/${primaryCta.href}`} className="btn-primary text-[0.82rem]">
          {primaryCta.label}
        </a>
      </nav>
    </header>
  );
}

/** Compact spiral glyph — echoes the hero vortex. */
function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(236,229,216,0.14)" strokeWidth="1" />
      <path
        d="M12 12 C 12 8, 16 8, 16 12 C 16 17, 9 17, 9 11 C 9 4, 18 4, 18 12"
        fill="none"
        stroke="#d08a4e"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.6" fill="#fdf1dc" />
    </svg>
  );
}
