import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  OPEN_CONSENT_EVENT,
  setAnalyticsConsent,
} from "../core/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getAnalyticsConsent() === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: "granted" | "denied") => {
    setAnalyticsConsent(consent);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-line bg-void-2/95 p-5 shadow-2xl backdrop-blur sm:p-6"
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-display text-lg font-bold text-bone">Analytics preferences</p>
          <p className="mt-2 text-sm leading-6 text-bone-muted">
            We use Google Analytics to understand which pages and campaigns are useful. Advertising storage and personalised advertising remain disabled. You can change this choice later from Cookie settings in the footer.
          </p>
          <p className="mt-2 text-xs leading-5 text-bone-dim">
            Read our <a href="/cookies" className="underline hover:text-accent-bright">Cookie Policy</a> and <a href="/privacy" className="underline hover:text-accent-bright">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => choose("denied")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => choose("granted")}
          >
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  );
}
