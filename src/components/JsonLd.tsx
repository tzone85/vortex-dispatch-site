import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildOrganizationJsonLd, buildSeoMeta, company, work } from "@/core";

/**
 * Injects Organization JSON-LD, syncs <title>/meta description, and manages
 * canonical links and Open Graph tags for all pages.
 */
export function JsonLd() {
  const location = useLocation();

  useEffect(() => {
    const meta = buildSeoMeta(company);
    document.title = meta.title;

    // Update description
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description);

    // Update canonical link based on current page
    let canonical = meta.canonical;
    if (location.pathname !== "/") {
      canonical = `${meta.canonical}${location.pathname}`;
    }
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      (link as HTMLLinkElement).rel = "canonical";
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // Update OG:URL based on current page
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonical);

    // Inject Organization JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(buildOrganizationJsonLd(company, work));
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [location.pathname]);

  return null;
}
