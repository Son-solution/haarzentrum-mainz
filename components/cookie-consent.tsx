"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

const GA_ID = "G-YH6EG37HCL";
const STORAGE_KEY = "hzm-consent";
const OPEN_EVENT = "hzm-consent-open";

type Consent = "granted" | "denied";

/*
 * Google Analytics is only loaded after explicit opt-in (DSGVO / §25 TDDDG).
 * The choice lives in localStorage; the footer button re-opens the banner.
 */
const listeners = new Set<() => void>();
let bannerOpen = false;

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onOpen = () => {
    bannerOpen = true;
    emit();
  };
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(OPEN_EVENT, onOpen);
  };
}

/** Snapshot: "unknown" on the server, otherwise the stored choice plus whether the banner was re-opened. */
function getSnapshot() {
  return `${readConsent() ?? "none"}|${bannerOpen ? "open" : "closed"}`;
}

function setConsent(value: Consent) {
  const previous = readConsent();
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage blocked – choice applies to this page view only */
  }
  bannerOpen = false;
  if (previous === "granted" && value === "denied") {
    // Remove GA cookies and reload so the already-loaded script is gone.
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name.startsWith("_ga")) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname.replace(/^www\./, ".")}`;
        document.cookie = `${name}=; Max-Age=0; path=/`;
      }
    });
    location.reload();
    return;
  }
  emit();
}

export function CookieConsent() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "unknown");
  if (snapshot === "unknown") return null;
  const [consent, open] = snapshot.split("|");
  const showBanner = consent === "none" || open === "open";

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-Einstellungen"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[640px] rounded-3xl bg-deep p-6 text-ivory shadow-2xl sm:p-8"
        >
          <p className="m-0 text-sm leading-relaxed text-ivory/85">
            Wir möchten mit Google Analytics auswerten, wie unsere Website genutzt wird. Dabei werden Cookies gesetzt und Daten an Google
            (auch in die USA) übertragen – nur mit Ihrer Einwilligung, die Sie jederzeit unter „Cookie-Einstellungen“ widerrufen können.
            Mehr in der{" "}
            <Link className="underline" href="/datenschutzerklarung/">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="cta-row mt-6">
            <button type="button" className="btn btn-silver" onClick={() => setConsent("granted")}>
              Akzeptieren
            </button>
            <button type="button" className="btn btn-ghost-light" onClick={() => setConsent("denied")}>
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link to change the choice later. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`cursor-pointer border-0 bg-transparent p-0 font-[inherit] tracking-[inherit] text-inherit ${className}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie-Einstellungen
    </button>
  );
}
