import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { businessJsonLd, jsonLdString } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/* Self-hosted variable fonts (SIL Open Font License) – no request to Google at runtime. */
const bodoni = localFont({
  src: [
    { path: "./fonts/BodoniModa-Variable.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/BodoniModa-Italic-Variable.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  // next/font emits fallback names unquoted – names starting with a digit (e.g. "Bodoni 72") would invalidate the whole stack.
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${bodoni.variable} ${hanken.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(businessJsonLd()) }} />
        <MotionProvider>
          <SiteHeader />
          <main id="inhalt">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
