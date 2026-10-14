import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://www.eliaspfeffer.de/",
    lastModified: "2026-10-14",
    changeFrequency: "monthly",
    priority: 1,
  }];
}
