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

export function trackPilotCtaClick(ctaLocation: string): void {
  trackEvent("pilot_cta_click", {
    lead_type: "engineering_pilot",
    cta_location: ctaLocation,
  });
}

export function trackEngineeringPilotStart(): void {
  trackEvent("pilot_contact_start", {
    lead_type: "engineering_pilot",
    method: "web_form",
  });
}

export function trackEngineeringPilotLead(): void {
  trackEvent("generate_lead", {
    method: "web_form",
    lead_type: "engineering_pilot",
  });
}

export function trackEngineeringPilotError(code: string): void {
  trackEvent("pilot_form_error", {
    lead_type: "engineering_pilot",
    error_code: code,
  });
}
