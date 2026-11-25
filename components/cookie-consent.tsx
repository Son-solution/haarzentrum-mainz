
"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

const GA_ID = "G-YH6EG37HCL";
const STORAGE_KEY = "hzm-consent";
const OPEN_EVENT = "hzm-consent-open";

type Consent = "granted" | "denied";

type GoogleWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const listeners = new Set<() => void>();

let bannerOpen = false;
let temporaryConsent: Consent | null = null;
let analyticsInitialized = false;

function getGoogleWindow(): GoogleWindow {
  return window as GoogleWindow;
}

function readConsent(): Consent | null {
  if (temporaryConsent !== null) {
    return temporaryConsent;
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY);

    return value === "granted" || value === "denied"
      ? value
      : null;
  } catch {
    return null;
  }
}

function updateGoogleConsent(value: Consent) {
  const w = getGoogleWindow();

  w.dataLayer = w.dataLayer || [];

  if (!w.gtag) {
    w.gtag = function () {
      w.dataLayer!.push(arguments);
    };
  }

  w.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function initializeAnalytics() {
  if (
    analyticsInitialized ||
    readConsent() !== "granted"
  ) {
    return;
  }

  const w = getGoogleWindow();

  updateGoogleConsent("granted");

  w.gtag?.("js", new Date());

  w.gtag?.("config", GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  analyticsInitialized = true;
}

function removeAnalyticsCookies() {
  const hostname = window.location.hostname;
  const rootDomain = "haarzentrum-mainz.de";

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();

    if (name.startsWith("_ga")) {
      document.cookie =
        `${name}=; Max-Age=0; path=/`;

      document.cookie =
        `${name}=; Max-Age=0; path=/; domain=${hostname}`;

      document.cookie =
        `${name}=; Max-Age=0; path=/; domain=.${rootDomain}`;

      document.cookie =
        `${name}=; Max-Age=0; path=/; domain=${rootDomain}`;
    }
  });
}

function emit() {
  listeners.forEach((listener) => listener());
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

function getSnapshot() {
  return `${readConsent() ?? "none"}|${
    bannerOpen ? "open" : "closed"
  }`;
}

function setConsent(value: Consent) {
  const previous = readConsent();

  temporaryConsent = value;

  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Consent applies to the current page only. */
  }

  updateGoogleConsent(value);

  bannerOpen = false;

  if (value === "denied") {
    const w = getGoogleWindow();

    (
      w as unknown as Record<string, unknown>
    )[`ga-disable-${GA_ID}`] = true;

    removeAnalyticsCookies();

    if (previous === "granted") {
      window.location.reload();
      return;
    }
  } else {
    const w = getGoogleWindow();

    (
      w as unknown as Record<string, unknown>
    )[`ga-disable-${GA_ID}`] = false;
  }

  emit();
}

export function CookieConsent() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "unknown"
  );

  if (snapshot === "unknown") {
    return null;
  }

  const [consent, open] = snapshot.split("|");

  const showBanner =
    consent === "none" || open === "open";

  return (
    <>
      {consent === "granted" && (
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          onReady={initializeAnalytics}
        />
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-Einstellungen"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[640px] rounded-3xl bg-deep p-6 text-ivory shadow-2xl sm:p-8"
        >
          <p className="m-0 text-sm leading-relaxed text-ivory/85">
            Wir möchten mit Google Analytics auswerten,
            wie unsere Website genutzt wird. Dabei werden
            Cookies gesetzt und Daten an Google (auch in
            die USA) übertragen – nur mit Ihrer Einwilligung,
            die Sie jederzeit unter „Cookie-Einstellungen“
            widerrufen können. Mehr in der{" "}
            <Link
              className="underline"
              href="/datenschutzerklarung/"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>

          <div className="cta-row mt-6">
            <button
              type="button"
              className="btn btn-silver"
              onClick={() => setConsent("granted")}
            >
              Akzeptieren
            </button>

            <button
              type="button"
              className="btn btn-ghost-light"
              onClick={() => setConsent("denied")}
            >
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`cursor-pointer border-0 bg-transparent p-0 font-[inherit] tracking-[inherit] text-inherit ${className}`}
      onClick={() =>
        window.dispatchEvent(new Event(OPEN_EVENT))
      }
    >
      Cookie-Einstellungen
    </button>
  );
}
