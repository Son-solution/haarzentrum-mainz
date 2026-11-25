
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { CookieConsent } from "@/components/cookie-consent";
import { MotionProvider } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { businessJsonLd, jsonLdString } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const bodoni = localFont({
  src: [
    { path: "./fonts/BodoniModa-Variable.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/BodoniModa-Italic-Variable.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Didot", "Georgia", "serif"],
});

const hanken = localFont({
  src: "./fonts/HankenGrotesk-Variable.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Friseur Mainz – Perückenstudio & Haarschnitt & Extensions",
    template: "%s | Haarzentrum Mainz",
  },
  description:
    "Haarzentrum Mainz – Ihr Friseur & Perückenstudio in Mainz: Perücken, Haarteile, Zweithaar und Toupets, Haarschnitt und Extensions. Kostenlose, diskrete Beratung.",
  applicationName: site.name,
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#17191C",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${bodoni.variable} ${hanken.variable}`}>
      <body>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function() {
              window.dataLayer.push(arguments);
            };

            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });

            try {
              if (localStorage.getItem('hzm-consent') === 'granted') {
                window.gtag('consent', 'update', {
                  analytics_storage: 'granted',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied'
                });
              }
            } catch (e) {}
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(businessJsonLd()),
          }}
        />

        <MotionProvider>
          <SiteHeader />
          <main id="inhalt">{children}</main>
          <SiteFooter />
        </MotionProvider>

        <CookieConsent />
      </body>
    </html>
  );
}
