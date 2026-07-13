import { useEffect } from "react";
import { buildOrganizationJsonLd, buildSeoMeta, company, work } from "@/core";

/**
 * Injects Organization JSON-LD and syncs <title>/meta description from the pure
 * SEO builders. Kept out of index.html so the domain stays the single source.
 */
export function JsonLd() {
  useEffect(() => {
    const meta = buildSeoMeta(company);
    document.title = meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(buildOrganizationJsonLd(company, work));
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
