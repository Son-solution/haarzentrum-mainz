"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contactServices } from "@/lib/content";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";
import { EASE_LUX } from "./motion";

type Status = "idle" | "sending" | "sent" | "error";

const serverMessages: Record<string, string> = {
  not_configured:
    "Das Online-Formular ist derzeit nicht verfügbar. Bitte rufen Sie uns an oder schreiben Sie uns eine E-Mail – wir melden uns umgehend.",
  send_failed: "Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
  rate_limited: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.",
  network: "Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.",
};

export function ContactForm() {
  const [service, setService] = useState<(typeof contactServices)[number]>(contactServices[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [sentService, setSentService] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      service,
      name: String(fd.get("name") ?? ""),
      tel: String(fd.get("tel") ?? ""),
      email: String(fd.get("email") ?? ""),
      date: String(fd.get("date") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) fe[String(issue.path[0])] ??= issue.message;
      setErrors(fe);
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(fe)[0]}"]`);
      first?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (res.ok && json.ok) {
        setSentService(service);
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setServerError(serverMessages[json.error ?? ""] ?? serverMessages.send_failed);
      setStatus("error");
    } catch {
      setServerError(serverMessages.network);
      setStatus("error");
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <span id={`err-${k}`} role="alert" className="text-[13px] text-[#9b2c2c]">
        {errors[k]}
      </span>
    ) : null;

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          className="flex flex-col gap-6 border-t border-charcoal/20 py-16"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_LUX }}
          role="status"
        >
          <span className="serif text-[72px] italic leading-none text-graphite">Danke.</span>
          <p className="serif m-0 text-[30px] leading-[1.2]">Ihre Anfrage für „{sentService}“ ist bei uns eingegangen.</p>
          <p className="m-0 text-ink-2">Wir melden uns schnellstmöglich bei Ihnen, um Ihren Termin zu bestätigen.</p>
          <button type="button" className="btn btn-dark self-start" onClick={() => setStatus("idle")}>
            Neue Anfrage
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
            <legend className="eyebrow mb-4 p-0 text-graphite">01 · Leistung wählen</legend>
            <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Leistung">
              {contactServices.map((s) => {
                const on = s === service;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setService(s)}
                    className={`min-h-[46px] cursor-pointer rounded-full border px-5 text-sm transition-colors duration-500 ${
                      on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="m-0 grid gap-x-9 gap-y-7 border-0 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            <legend className="eyebrow mb-4 p-0 text-graphite">02 · Ihre Angaben</legend>
            <div className="field">
              <label htmlFor="k-name" className="eyebrow text-ink-3">Name *</label>
              <input id="k-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              <span className="bar" />
              {err("name")}
            </div>
            <div className="field">
              <label htmlFor="k-tel" className="eyebrow text-ink-3">Telefon</label>
              <input id="k-tel" name="tel" type="tel" autoComplete="tel" aria-invalid={!!errors.tel} aria-describedby={errors.tel ? "err-tel" : undefined} />
              <span className="bar" />
              {err("tel")}
            </div>
            <div className="field">
              <label htmlFor="k-mail" className="eyebrow text-ink-3">E-Mail *</label>
              <input id="k-mail" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              <span className="bar" />
              {err("email")}
            </div>
            <div className="field">
              <label htmlFor="k-date" className="eyebrow text-ink-3">Wunschtermin</label>
              <input id="k-date" name="date" type="date" aria-invalid={!!errors.date} />
              <span className="bar" />
              {err("date")}
            </div>
            <div className="field col-span-full">
              <label htmlFor="k-msg" className="eyebrow text-ink-3">Nachricht</label>
              <textarea id="k-msg" name="message" rows={3} className="resize-y" aria-invalid={!!errors.message} />
              <span className="bar" />
              {err("message")}
            </div>
            {/* Honeypot for bots – hidden from people and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="k-web">Website</label>
              <input id="k-web" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-start gap-3.5 text-sm text-ink-2">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-5 w-5 flex-none accent-charcoal"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "err-consent" : undefined}
              />
              <span>
                Ich habe die{" "}
                <Link href="/datenschutzerklarung/" className="underline underline-offset-4">Datenschutzerklärung</Link>{" "}
                gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu. *
              </span>
            </label>
            {err("consent")}
          </div>

          <AnimatePresence>
            {status === "error" && serverError && (
              <motion.div
                role="alert"
                className="border-l-2 border-charcoal bg-mist px-5 py-4 text-sm text-ink-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {serverError}{" "}
                <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a> ·{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-4">
            <button className="btn btn-dark" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Wird gesendet …" : "Anfrage senden"} <span className="arr" aria-hidden="true">→</span>
            </button>
            <span className="text-xs text-graphite">* Pflichtfelder</span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
