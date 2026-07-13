import type { MetadataRoute } from "next";
import { company } from "@/core";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl.replace(/\/+$/, "");

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
