import { company, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/core";

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationJsonLd(company), buildWebsiteJsonLd(company)],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
