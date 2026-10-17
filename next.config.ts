import type { NextConfig } from "next";

/**
 * Old WordPress/BookingPress URLs that no longer exist get permanent redirects
 * so existing links and search results keep working.
 */
const legacyToContact = [
  "/book-appointment",
  "/my-bookings",
  "/thank-you",
  "/cancel-appointment",
  "/cancel-payment",
  "/appointment-cancellation-confirmation",
  "/appointment-reschedule",
  "/bookingpress-complete-payment",
  "/reservation-page",
];

const nextConfig: NextConfig = {
  // The existing site uses trailing slashes (WordPress) – keep identical URLs.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      ...legacyToContact.map((source) => ({ source: `${source}/`, destination: "/contact/", permanent: true })),
      { source: "/preisliste/", destination: "/preislist/", permanent: true },
      { source: "/kontakt/", destination: "/contact/", permanent: true },
      { source: "/ueber-uns/", destination: "/about/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
