import type { MetadataRoute } from "next";
import { districts, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main = [
    { path: "/", priority: 1 },
    { path: "/haarschnitt/", priority: 0.9 },
    { path: "/preislist/", priority: 0.9 },
    { path: "/contact/", priority: 0.8 },
    { path: "/about/", priority: 0.7 },
    { path: "/faq/", priority: 0.7 },
    { path: "/impressum/", priority: 0.2 },
    { path: "/datenschutzerklarung/", priority: 0.2 },
  ];
  return [
    ...main.map((m) => ({ url: `${site.url}${m.path}`, lastModified: now, changeFrequency: "monthly" as const, priority: m.priority })),
    ...districts.map((d) => ({ url: `${site.url}/${d.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
