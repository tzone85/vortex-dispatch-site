export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
};

const STORAGE_KEY = "vortex_first_touch_attribution_v1";

function clean(value: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, 500) : undefined;
}

export function captureFirstTouchAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as LeadAttribution;
  } catch {
    // Storage can be unavailable in strict privacy modes. Attribution is optional.
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: LeadAttribution = {
    utm_source: clean(params.get("utm_source")),
    utm_medium: clean(params.get("utm_medium")),
    utm_campaign: clean(params.get("utm_campaign")),
    utm_content: clean(params.get("utm_content")),
    utm_term: clean(params.get("utm_term")),
    referrer: clean(document.referrer),
    landing_page: clean(window.location.href),
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Non-essential. The form still works without session storage.
  }

  return attribution;
}

export function getFirstTouchAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as LeadAttribution;
  } catch {
    // Fall through and capture from the current page.
  }

  return captureFirstTouchAttribution();
}
