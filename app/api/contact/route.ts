import nodemailer from "nodemailer";
import { buildContactEmail } from "@/lib/contact-email";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/** Best-effort in-memory rate limit (per server instance). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_HITS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return Response.json({ ok: false, error: "validation", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  // Honeypot filled → silently accept without sending (bot).
  if (data.website) return Response.json({ ok: true });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured – set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const { subject, text, html } = buildContactEmail(data);

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || (SMTP_USER.includes("@") ? SMTP_USER : site.email),
      to: CONTACT_TO || site.email,
      replyTo: { name: data.name, address: data.email },
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] sending failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
