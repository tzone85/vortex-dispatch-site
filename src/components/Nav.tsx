import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { brandAssets, company, navigation, primaryCta } from "@/core";

/** Fixed nav that gains a hairline + blur once you leave the hero. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu overlay: lock page scroll while open, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const hrefFor = (href: string) => (isHomePage ? href : `/${href}`);

  /**
   * Close the overlay, then jump. The overlay locks body scroll, so a plain
   * anchor click fires while scrolling is still disabled and the jump is
   * silently swallowed — scroll only after the unlock has been applied.
   */
  const jumpFromMenu = (e: React.MouseEvent, href: string) => {
    if (!isHomePage) return; // legal pages navigate to /#section normally
    e.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document
          .getElementById(href.replace("#", ""))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }),
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-void/72 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${company.name} — home`}
        >
          <img
            src={brandAssets.logo64}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-[7px] shadow-[0_0_0_1px_rgba(236,229,216,0.08)] transition-transform duration-300 group-hover:scale-[1.04]"
            decoding="async"
          />
          <span className="hidden font-display text-[0.98rem] font-bold tracking-tight text-bone sm:inline">
            Vortex<span className="text-accent">·</span>Dispatch
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={hrefFor(item.href)}
              className="mono-meta text-bone-muted transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:block">
            <a
              href={hrefFor(primaryCta.href)}
              className="btn-primary text-[0.82rem]"
            >
              {primaryCta.label}
            </a>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="btn-ghost"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {menuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            className="menu-overlay md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-[0.98rem] font-bold tracking-tight text-panel">
                Vortex<span className="text-brass">·</span>Dispatch
              </span>
              <button
                type="button"
                className="menu-close"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </div>
            <nav
              className="flex flex-col gap-1 px-5 pt-10"
              aria-label="Sections"
            >
              {navigation.map((item, i) => (
                <a
                  key={item.id}
                  href={hrefFor(item.href)}
                  className="menu-link"
                  onClick={(e) => jumpFromMenu(e, item.href)}
                >
                  <span className="menu-index">0{i + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto px-5 pb-10">
              <a
                href={hrefFor(primaryCta.href)}
                className="menu-cta"
                onClick={(e) => jumpFromMenu(e, primaryCta.href)}
              >
                {primaryCta.label}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="mono-meta mt-5 block text-center !text-[0.72rem] text-panel/60"
              >
                {company.email}
              </a>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
