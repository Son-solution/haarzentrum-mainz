import type { ContactInput } from "./contact-schema";
import { site } from "./site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** "2026-10-19" → "Montag, 19.10.2026" */
function formatDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const weekday = d.toLocaleDateString("de-DE", { weekday: "long", timeZone: "UTC" });
  return `${weekday}, ${m[3]}.${m[2]}.${m[1]}`;
}

/* Email clients ignore <style> and CSS variables, so everything is inlined. */
const C = {
  charcoal: "#17191c",
  ivory: "#f7f7f5",
  mist: "#e9eaec",
  silver: "#b7bcc2",
  graphite: "#5e636a",
  ink: "#2a2d31",
  gold: "#f2b33d", // matches the logo icon
};
const SERIF = "'Bodoni 72', Didot, Georgia, 'Times New Roman', serif";
/* Must be an absolute URL – email clients can't resolve relative paths. */
const LOGO_PATH = "/logos/haarzentrum-mainz-logo-hell.png";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** `origin` = the site the form was sent from, so the logo loads even before the main domain points here. */
export function buildContactEmail(data: ContactInput, origin: string = site.url) {
  const logoUrl = `${origin}${LOGO_PATH}`;
  const date = data.date ? formatDate(data.date) : "";
  const telHref = data.tel ? `tel:${data.tel.replace(/[^\d+]/g, "")}` : "";
  const received = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "long",
    timeStyle: "short",
  });

  const subject = `Terminanfrage: ${data.service} – ${data.name}`;

  const text = [
    "Neue Terminanfrage über haarzentrum-mainz.de",
    "",
    `Leistung:     ${data.service}`,
    `Name:         ${data.name}`,
    `Telefon:      ${data.tel || "–"}`,
    `E-Mail:       ${data.email}`,
    `Wunschtermin: ${date || "–"}`,
    "",
    "Nachricht:",
    data.message || "–",
    "",
    `Eingegangen am ${received}`,
  ].join("\n");

  const row = (label: string, value: string, href?: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${C.mist};width:140px;vertical-align:top;font-family:${SANS};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${C.graphite};">${label}</td>
      <td style="padding:14px 0;border-bottom:1px solid ${C.mist};vertical-align:top;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink};">${
        href ? `<a href="${escape(href)}" style="color:${C.charcoal};text-decoration:underline;">${escape(value)}</a>` : escape(value)
      }</td>
    </tr>`;

  const button = (label: string, href: string, dark: boolean) => `
    <td style="padding:0 8px 8px 0;">
      <a href="${escape(href)}" style="display:inline-block;padding:13px 26px;border:1px solid ${C.charcoal};border-radius:999px;background:${dark ? C.charcoal : "transparent"};color:${dark ? C.ivory : C.charcoal};font-family:${SANS};font-size:14px;text-decoration:none;">${label}</a>
    </td>`;

  const replySubject = encodeURIComponent(`Ihre Terminanfrage beim ${site.name}`);

  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escape(subject)}</title>
<style>
  /* Gentle entrance – only in clients that support CSS animation (Apple Mail, iOS Mail);
     everywhere else the email simply appears static. */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes hz-fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes hz-logo { from { opacity: 0; transform: translateY(6px) scale(.97); } to { opacity: 1; transform: none; } }
    @keyframes hz-line { from { width: 0; } to { width: 56px; } }
    .hz-logo { animation: hz-logo 1.4s cubic-bezier(.19,1,.22,1) both; }
    .hz-line { animation: hz-line 1.2s cubic-bezier(.77,0,.18,1) .5s both; }
    .hz-in { animation: hz-fade 1.1s ease-out both; }
    .hz-d1 { animation-delay: .35s; }
    .hz-d2 { animation-delay: .55s; }
    .hz-d3 { animation-delay: .75s; }
    .hz-d4 { animation-delay: .95s; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.mist};">
  <div style="display:none;max-height:0;overflow:hidden;">${escape(`${data.name} · ${data.service}${date ? ` · ${date}` : ""}`)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mist};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.ivory};">
          <tr>
            <td style="background:${C.charcoal};padding:30px 36px 26px;">
              <a href="${site.url}" style="text-decoration:none;">
                <img class="hz-logo" src="${escape(logoUrl)}" width="260" alt="${site.name} – ${site.tagline}" style="display:block;width:260px;max-width:100%;height:auto;border:0;font-family:${SERIF};font-size:22px;color:${C.ivory};">
              </a>
              <div class="hz-line" style="width:56px;height:1px;background:${C.gold};margin-top:22px;font-size:0;line-height:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="hz-in hz-d1" style="padding:36px 36px 8px;">
              <div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.graphite};">Neue Terminanfrage</div>
              <div style="font-family:${SERIF};font-size:30px;line-height:1.2;color:${C.charcoal};padding-top:10px;">${escape(data.service)}</div>
              <div style="font-family:${SANS};font-size:15px;color:${C.graphite};padding-top:6px;">von ${escape(data.name)}</div>
            </td>
          </tr>
          <tr>
            <td class="hz-in hz-d2" style="padding:20px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", data.name)}
                ${row("Telefon", data.tel || "–", telHref || undefined)}
                ${row("E-Mail", data.email, `mailto:${data.email}`)}
                ${row("Wunschtermin", date || "–")}
              </table>
            </td>
          </tr>
          <tr>
            <td class="hz-in hz-d3" style="padding:28px 36px 0;">
              <div style="font-family:${SANS};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${C.graphite};padding-bottom:10px;">Nachricht</div>
              <div style="border-left:2px solid ${C.charcoal};background:#ffffff;padding:16px 20px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};">${
                data.message ? escape(data.message).replace(/\n/g, "<br>") : `<span style="color:${C.graphite};">Keine Nachricht</span>`
              }</div>
            </td>
          </tr>
          <tr>
            <td class="hz-in hz-d4" style="padding:28px 36px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  ${button("Antworten", `mailto:${data.email}?subject=${replySubject}`, true)}
                  ${telHref ? button("Anrufen", telHref, false) : ""}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid ${C.mist};padding:18px 36px;font-family:${SANS};font-size:12px;line-height:1.5;color:${C.graphite};">
              Eingegangen am ${received} über das Kontaktformular auf haarzentrum-mainz.de.<br>
              „Antworten“ in Ihrem Mailprogramm geht direkt an ${escape(data.name)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
