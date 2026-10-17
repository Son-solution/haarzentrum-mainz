# Haarzentrum Mainz – Website (Next.js)

Production website for **Haarzentrum Mainz – Perückenstudio & Friseur**, implemented from the approved
“Haarzentrum Mainz – Luxury Redesign” design.

- **Stack:** Next.js 16.3 (App Router, Turbopack) · React 19.2 · TypeScript 5 · Tailwind CSS 4 · Motion for React 14 · Lucide React · Zod · Nodemailer
- **Fonts:** Bodoni Moda + Hanken Grotesk, self-hosted through `next/font/local` (no request to Google, GDPR-friendly)
- **Images:** 24 original photos + logo variants in `public/`, served through `next/image` (AVIF/WebP, responsive, lazy, blur placeholders)

---

## 1. Local development

Requirements: **Node.js ≥ 20.9** (tested with Node 22) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (eslint-config-next)
npx tsc --noEmit   # type check
```

### Contact form (optional for local dev)

Copy `.env.example` to `.env.local` and enter your SMTP credentials:

```bash
cp .env.example .env.local
```

| Variable | Meaning |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | SMTP server of your e-mail provider (e.g. IONOS, Strato, Google Workspace, Microsoft 365) |
| `SMTP_USER`, `SMTP_PASS` | Mailbox login (ideally a dedicated mailbox / app password) |
| `CONTACT_TO` | Recipient of requests (default `info@haarzentrum-mainz.de`) |
| `CONTACT_FROM` | Sender address allowed by the SMTP provider (default `SMTP_USER`) |

Without these variables the form **does not pretend to succeed**: the API returns `503 not_configured`
and visitors see “Das Online-Formular ist derzeit nicht verfügbar … bitte rufen Sie uns an” with phone and e-mail.

**Online booking** (“Termin buchen” buttons) links to the existing Planity booking page:
`https://www.planity.com/de-DE/haarzentrum-mainz-55131` (configured in `lib/site.ts`).

---

## 2. Deploy to Vercel (via GitHub)

1. Create an empty GitHub repository, then in this folder:
   ```bash
   git init
   git add .
   git commit -m "Haarzentrum Mainz website"
   git branch -M main
   git remote add origin https://github.com/<user>/haarzentrum-mainz.git
   git push -u origin main
   ```
2. On <https://vercel.com/new> import the repository. Framework preset **Next.js** is detected automatically
   (build command `next build`, no extra settings needed).
3. In *Project → Settings → Environment Variables* add the SMTP variables from `.env.example` (Production + Preview).
4. Deploy. Then in *Settings → Domains* add `haarzentrum-mainz.de` and `www.haarzentrum-mainz.de`
   and update the DNS records at your domain provider as Vercel shows (A record `76.76.21.21` / CNAME `cname.vercel-dns.com`).
5. After the domain is live, submit `https://haarzentrum-mainz.de/sitemap.xml` in Google Search Console.

> The canonical domain is set in `lib/site.ts` (`url`). Change it there if the site should run under another domain.

---

## 3. Pages & URLs (existing URLs preserved)

| Page | URL | File |
|---|---|---|
| Startseite / Perücken | `/` | `app/page.tsx` |
| Haarschnitt | `/haarschnitt/` | `app/haarschnitt/page.tsx` |
| Preisliste | `/preislist/` (original spelling kept) | `app/preislist/page.tsx` |
| Über uns | `/about/` | `app/about/page.tsx` |
| FAQ | `/faq/` | `app/faq/page.tsx` |
| Kontakt & Termin | `/contact/` | `app/contact/page.tsx` |
| 35 Stadtteil-Seiten | `/mainz-altstadt/` … `/wiesbaden-rambach/` … `/frankfurt-bergen-enkheim/` | `app/[stadtteil]/page.tsx` (one template, statically generated) |
| Impressum | `/impressum/` | `app/impressum/page.tsx` |
| Datenschutzerklärung | `/datenschutzerklarung/` | `app/datenschutzerklarung/page.tsx` |

`trailingSlash: true` keeps the WordPress URL format. Permanent (308) redirects in `next.config.ts`:

| Old URL (WordPress / BookingPress) | New URL |
|---|---|
| `/book-appointment/`, `/reservation-page/`, `/my-bookings/`, `/thank-you/`, `/cancel-appointment/`, `/cancel-payment/`, `/appointment-cancellation-confirmation/`, `/appointment-reschedule/`, `/bookingpress-complete-payment/` | `/contact/` |
| `/preisliste/` | `/preislist/` |
| `/kontakt/`, `/ueber-uns/`, `/home/` | `/contact/`, `/about/`, `/` |

---

## 4. Project structure

```
app/
  layout.tsx              root layout: fonts, metadata, JSON-LD, header/footer, MotionProvider
  globals.css             design tokens (palette) + component styles + reduced-motion rules
  page.tsx                Startseite
  haarschnitt/ preislist/ about/ faq/ contact/ impressum/ datenschutzerklarung/
  [stadtteil]/page.tsx    35 district landing pages (generateStaticParams)
  api/contact/route.ts    contact form endpoint (Zod validation, rate limit, SMTP via Nodemailer)
  sitemap.ts robots.ts    sitemap.xml / robots.txt
  not-found.tsx           404 page
  icon.png apple-icon.png favicon.ico
  fonts/                  self-hosted variable fonts (+ OFL licences)
components/
  motion.tsx              Reveal, FadeIn, LineReveal, Curtain, KenBurns, ImageReveal, Parallax, DrawLine, Drift, ScrollBrighten
  site-header.tsx         fixed header, scroll state, animated mobile menu
  site-footer.tsx         footer with district index
  before-after.tsx        interactive before/after slider (3 examples)
  testimonials.tsx faq-accordion.tsx price-list.tsx contact-form.tsx
  decor.tsx               marquee band, rotating badge
  ui.tsx legal-page.tsx
lib/
  site.ts                 business facts, navigation, districts
  content.ts              German copy: prices, FAQ, testimonials, specialities
  images.ts               image registry (static imports → sizes + blur placeholders)
  seo.ts                  metadata helper, HairSalon JSON-LD
  contact-schema.ts       shared form validation
public/
  images/                 original photos (WebP) + og-haarzentrum-mainz.jpg
  images/vorher-nachher/  before/after pairs
  logos/                  logo light (transparent), logo dark, gold icon, original black version
```

### Editing content

- Prices, FAQ, testimonials, specialities: `lib/content.ts`
- Address, phone, opening hours, booking link: `lib/site.ts`
- Replace a photo: overwrite the file in `public/images/` with the same name (or update `lib/images.ts`).

---

## 5. Animations

All motion uses **Motion for React** (plus CSS for continuous effects). `MotionConfig reducedMotion="user"` and a
`prefers-reduced-motion` CSS block turn transforms into instant changes for users who request reduced motion.

- Hero: masked line-by-line headline reveal, curtain unveil + slow Ken Burns zoom, staggered copy & header entrance, silver light sweep on italic words
- Scroll: fade-and-rise reveals, clip-path image reveals, parallax images, self-drawing rules, drifting footer type, statement text brightening on scroll (Über uns)
- Interaction: fill-sweep buttons, underline nav links, image zoom on hover, animated FAQ accordion, cross-fading testimonials, animated price filter (layout animation), before/after slider (drag, touch, keyboard), full-screen mobile menu with clip-path reveal and staggered links, header turning solid on scroll
- Continuous: service marquee, rotating “Kostenlose Beratung” badge with the brand icon, scroll cue

GSAP was not needed – every effect of the design is covered by Motion for React and CSS.

---

## 6. SEO

Metadata API with unique titles/descriptions per page (original titles reused where known), canonical URLs,
Open Graph + Twitter cards (`/images/og-haarzentrum-mainz.jpg`), `sitemap.xml` (43 URLs), `robots.txt`,
`HairSalon` JSON-LD (only facts published on the current site) and `FAQPage` JSON-LD on `/faq/`.
Semantic HTML with one `<h1>` per page, `lang="de"`, skip link, labelled controls.

---

## 7. Open items before go-live (need the business owner)

1. **SMTP credentials** for the contact form (see section 1). Until set, the form shows the honest fallback message.
2. **Impressum:** contains exactly the data from the current site (owner, address, contact, USt-IdNr.). Please have it checked –
   depending on the business, further details may be required (e.g. Handwerkskammer/Berufsbezeichnung, Verbraucherstreitbeilegung).
3. **Datenschutzerklärung:** rewritten to describe what this website actually does (no cookies/tracking, local fonts, contact form via e-mail,
   Planity link). Please add the hosting provider (e.g. Vercel Inc.) and e-mail provider and have it legally reviewed.
4. **Testimonials** are the three reviews from the current website – please confirm they are genuine customer statements.
5. Google Search Console: verify the domain again after the move and submit the sitemap.
