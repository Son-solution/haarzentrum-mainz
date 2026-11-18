"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/*
 * Planity White Label module – 2-click solution.
 *
 * Nothing is requested from Planity until the visitor clicks "Buchungsmodul laden".
 * The consent is NOT persisted (no cookie / storage): it only lives in memory for the current page session.
 *
 * Integration as documented (https://planity.gitbook.io/planity-white-label-modul/):
 * set `window.planity = { key, primaryColor, options: { countryCode: "DE" }, container }`, then load
 * polyfills.latest.js and app.latest.js after the container exists.
 *
 * Next.js route changes: app.latest.js reads `window.planity` exactly once when it is evaluated and renders
 * into the container with its own React. It offers no documented re-init/unmount API, so we never evaluate it
 * twice and never delete its globals or script tags. Instead the container node is created once per document
 * and moved into / out of this component, so the running module survives client-side navigation.
 */

const SCRIPTS = [
  "https://d2skjte8udjqxw.cloudfront.net/widget/production/2/polyfills.latest.js",
  "https://d2skjte8udjqxw.cloudfront.net/widget/production/2/app.latest.js",
];

/** After this time without visible module content a hint with the external link is shown. */
const SLOW_MS = 12000;

type Status = "idle" | "loading" | "slow" | "ready" | "error";

declare global {
  interface Window {
    planity?: {
      key: string;
      primaryColor?: string;
      container?: HTMLElement;
      options?: Record<string, unknown>;
    };
  }
}

// Per document (memory only): the node Planity renders into, and the loading promise.
let planityNode: HTMLDivElement | null = null;
let loading: Promise<void> | null = null;

function injectScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.onload = () => resolve();
    el.onerror = () => {
      el.remove(); // a failed tag never executed – safe to remove so a retry starts clean
      reject(new Error(`Planity script failed: ${src}`));
    };
    document.body.appendChild(el);
  });
}

/** Scroll back to the top of the module after a service was chosen (fixed header is taken into account). */
function scrollToModule() {
  if (!planityNode) return;
  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + 16;
  const top = planityNode.getBoundingClientRect().top + window.scrollY - offset;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}

function loadPlanity(): Promise<void> {
  if (loading) return loading;
  const node = planityNode!;
  window.planity = {
    key: site.planity.apiKey,
    primaryColor: site.planity.primaryColor,
    options: { countryCode: "DE", onServiceAdd: scrollToModule },
    container: node,
  };
  loading = SCRIPTS.reduce<Promise<void>>((p, src) => p.then(() => injectScript(src)), Promise.resolve()).catch((err) => {
    // Only reached if a script could not be fetched (app.latest.js then never ran) – allow a clean retry.
    loading = null;
    throw err;
  });
  return loading;
}

const hasContent = () => !!planityNode && planityNode.childElementCount > 0;

export function PlanityBooking() {
  const hostRef = useRef<HTMLDivElement>(null);
  // Module already running in this document (e.g. back after a client-side route change)? Then show it again.
  const [status, setStatus] = useState<Status>(() => (loading && hasContent() ? "ready" : "idle"));

  // Re-attach an already running module when this page is mounted again; detach it (without destroying) on leave.
  useEffect(() => {
    const host = hostRef.current;
    if (host && planityNode && loading) host.appendChild(planityNode);
    return () => {
      if (planityNode && planityNode.parentNode === host) host?.removeChild(planityNode);
    };
  }, []);

  // While loading: watch for module content, show a hint when it takes too long.
  useEffect(() => {
    if (status !== "loading" && status !== "slow") return;
    const node = planityNode;
    if (!node) return;
    const done = () => {
      if (hasContent()) setStatus("ready");
    };
    const observer = new MutationObserver(done);
    observer.observe(node, { childList: true });
    done();
    const timer = window.setTimeout(() => setStatus((s) => (s === "loading" ? "slow" : s)), SLOW_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [status]);

  const start = () => {
    const host = hostRef.current;
    if (!host) return;
    if (!planityNode) {
      planityNode = document.createElement("div");
      planityNode.className = "planity-module";
    }
    host.appendChild(planityNode);
    setStatus("loading");
    loadPlanity().catch(() => setStatus("error"));
  };

  const external = (
    <a href={site.bookingExternalUrl} target="_blank" rel="noopener noreferrer" className="tlink self-start">
      Direkt bei Planity buchen <span className="arr" aria-hidden="true">↗</span>
    </a>
  );

  return (
    <div className="flex flex-col gap-8">
      {status === "idle" && (
        <div className="flex max-w-[720px] flex-col gap-6 border-y border-charcoal/16 py-8">
          <span className="eyebrow text-graphite">Buchungsmodul von Planity</span>
          <p className="m-0 text-ink-2">
            Unsere Online-Terminbuchung wird von unserem Buchungspartner Planity bereitgestellt. Das Buchungsmodul wird erst geladen, wenn
            Sie auf „Buchungsmodul laden“ klicken. Dabei werden Daten wie Ihre IP-Adresse an Planity und weitere Dienstleister übertragen,
            und Planity speichert Informationen in Ihrem Browser. Mehr dazu in unserer{" "}
            <Link href="/datenschutzerklarung/" className="underline underline-offset-4">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="cta-row items-center">
            <button type="button" className="btn btn-dark" onClick={start}>
              Buchungsmodul laden <span className="arr" aria-hidden="true">→</span>
            </button>
            {external}
          </div>
          <p className="m-0 text-sm text-ink-3">
            Lieber telefonisch? <a className="dist" href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
      )}

      {(status === "loading" || status === "slow") && (
        <p className="m-0 text-ink-2" role="status" aria-live="polite">
          Das Buchungsmodul wird geladen …
        </p>
      )}

      {(status === "slow" || status === "error") && (
        <div role="alert" className="flex max-w-[720px] flex-col gap-4 border-y border-charcoal/16 py-6">
          <p className="m-0 text-ink-2">
            {status === "slow"
              ? "Das Laden dauert länger als gewohnt. Sie können weiter warten oder Ihren Termin direkt auf der Website von Planity buchen."
              : "Das Buchungsmodul konnte leider nicht geladen werden. Bitte buchen Sie Ihren Termin direkt auf der Website von Planity oder rufen Sie uns an."}
          </p>
          <div className="cta-row items-center">
            <a href={site.bookingExternalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Termin bei Planity buchen <span className="arr" aria-hidden="true">↗</span>
            </a>
            {status === "error" && (
              <button type="button" className="tlink cursor-pointer border-0 bg-transparent p-0 font-[inherit]" onClick={start}>
                Erneut versuchen <span className="arr" aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Planity renders into a node that is moved in here (see above). */}
      <div ref={hostRef} className={status === "idle" || status === "error" ? "hidden" : "min-h-[480px]"} />

      {status === "ready" && (
        <p className="m-0 text-sm text-ink-3">
          Probleme mit dem Buchungsmodul?{" "}
          <a href={site.bookingExternalUrl} target="_blank" rel="noopener noreferrer" className="dist">
            Direkt bei Planity buchen ↗
          </a>
        </p>
      )}

      <noscript>
        <p className="m-0 text-ink-2">
          Für das Buchungsmodul wird JavaScript benötigt.{" "}
          <a href={site.bookingExternalUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Termin direkt bei Planity buchen ↗
          </a>
        </p>
      </noscript>
    </div>
  );
}
