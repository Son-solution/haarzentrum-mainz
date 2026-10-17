import type { Metadata } from "next";
import { site } from "./site";

const ogImage = { url: "/images/og-haarzentrum-mainz.jpg", width: 1200, height: 630, alt: "Haarzentrum Mainz – Perückenstudio & Friseur" };

/** Builds unique per-page metadata with canonical URL and Open Graph tags. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/** Structured data built only from facts published on the existing website. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: "Friseur & Perückenstudio in Mainz – Perücken, Haarteile, Zweithaar, Toupets, Haarschnitt und Extensions.",
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/og-haarzentrum-mainz.jpg`,
    logo: `${site.url}/logos/haarzentrum-mainz-logo-dunkel.png`,
    sameAs: [site.social.instagram, site.social.facebook],
    vatID: site.vatId,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:00",
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: site.bookingUrl,
      name: "Termin buchen",
    },
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" to prevent injection). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
