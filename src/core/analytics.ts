type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  gtag?: Gtag;
};

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;

  const gtag = (window as AnalyticsWindow).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", eventName, params);
}

export function trackEngineeringPilotLead(ctaLocation: string): void {
  trackEvent("generate_lead", {
    method: "email",
    lead_type: "engineering_pilot",
    cta_location: ctaLocation,
  });
}
