export type AnalyticsConsent = "granted" | "denied";

export const ANALYTICS_CONSENT_KEY = "vortex_analytics_consent_v1";
export const OPEN_CONSENT_EVENT = "vortex-open-consent-preferences";

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // Consent state still updates for this page even if storage is unavailable.
  }

  const gtag = (window as ConsentWindow).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      analytics_storage: consent,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}
