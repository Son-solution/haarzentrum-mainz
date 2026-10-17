import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/before-after";
import { Marquee, RotatingBadge } from "@/components/decor";
import { Curtain, DrawLine, FadeIn, ImageReveal, KenBurns, LineReveal, Parallax, Reveal } from "@/components/motion";
import { Partners } from "@/components/partners";
import { Testimonials } from "@/components/testimonials";
import { ButtonLink, TextLink } from "@/components/ui";
import { specials } from "@/lib/content";
import { certificate, img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Friseur Mainz – Perückenstudio & Haarschnitt & Extensions | Haarzentrum Mainz",
  description:
    "Haarzentrum Mainz: Ihr Experte für Perücken, Haarteile & Zweithaar. Medizinische Perücken, Toupets & Haarsysteme für Herren, Haarschnitt und Extensions – kostenlose, diskrete Beratung in der Langenbeckstraße 2.",
  path: "/",
});

const services = [
  {
    n: "01",
    title: <>Medizinische Perücken &amp; Zweithaar</>,
    text: "Individuell angepasste medizinische Perücken und Haarteile in Mainz für Damen und Herren – bei Haarausfall durch Krankheit, Therapie oder genetische Ursachen.",
    cta: "Kostenlose Beratung",
    href: "/contact/",
    photo: img.perueckenberatung,
    pos: "50% 22%",
    aspect: "aspect-[5/4]",
    flip: false,
  },
  {
    n: "02",
    title: <>Haarteile &amp; Haarsysteme für Herren <em>(Toupets)</em></>,
    text: "Moderne Haarsysteme und Toupets für Herren in Mainz – maßgefertigt bei erblich bedingtem Haarausfall, Geheimratsecken oder lichtem Haar.",
    cta: "Diskret beraten lassen",
    href: "/contact/",
    photo: img.herrenComposite,
    pos: "50% 40%",
    aspect: "aspect-[4/5] max-h-[640px]",
    flip: true,
  },
  {
    n: "03",
    title: <>Haarschnitt, Styling &amp; Extensions</>,
    text: "Individuelle Haarschnitte und modernes Styling für Damen, Herren und Kinder – abgestimmt auf Haarstruktur, Gesichtsform und Ihren persönlichen Stil.",
    cta: "Zum Friseur-Angebot",
    href: "/haarschnitt/",
    photo: img.haarschnitt,
    pos: "45% 50%",
    aspect: "aspect-[16/10]",
    flip: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───── Hero ───── */}
      <section aria-label="Einleitung" className="relative flex min-h-[900px] flex-col bg-charcoal text-ivory max-md:min-h-[100svh]">
        <div className="frame absolute inset-y-0 right-0 w-full md:w-[58%] md:max-w-[860px]">
          <KenBurns>
            <Image
              src={img.heroBlonde.src}
              alt={img.heroBlonde.alt}
              fill
              preload
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-[68%_30%]"
              placeholder="blur"
            />
          </KenBurns>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(0deg,#17191C_8%,rgba(23,25,28,.72)_45%,rgba(23,25,28,.25)_100%)] md:bg-[linear-gradient(90deg,#17191C_0%,rgba(23,25,28,.55)_38%,rgba(23,25,28,0)_70%)]"
          />
          <Curtain />
        </div>
        <div className="wrap relative z-[3] flex w-full flex-1 flex-col justify-end gap-9 pb-16 pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.25} className="self-start">
            <Image
              src={certificate.src}
              alt={certificate.alt}
              sizes="150px"
              loading="eager"
              className="block h-[54px] w-auto rounded-lg bg-white px-2.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,.28)] sm:h-[66px]"
            />
          </FadeIn>
          <FadeIn as="div" delay={0.35}>
            <h1 className="eyebrow m-0 text-silver">Haarzentrum Mainz – Ihr Friseur &amp; Perückenstudio in Mainz</h1>
          </FadeIn>
          <p className="serif m-0 text-[clamp(40px,9.4vw,148px)] font-normal leading-[0.94] tracking-[-0.02em]">
            <LineReveal lines={["Hochwertige", "Perücken –", <em key="s" className="sheen">natürlich schön</em>]} />
          </p>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <FadeIn as="p" delay={0.95} className="m-0 max-w-[440px] text-[17px] leading-[1.7] text-ivory/80">
              Ob Echthaar oder Kunsthaar: Wir finden gemeinsam mit Ihnen die passende Lösung – mit Erfahrung, Diskretion und Liebe zum Detail.
            </FadeIn>
            <FadeIn delay={1.15} className="cta-row">
              <ButtonLink href="/contact/" variant="silver">Kostenlose Beratung</ButtonLink>
              <ButtonLink href="#leistungen" variant="ghost-light" arrow={false}>Perücken entdecken</ButtonLink>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={1.4} y={0} className="relative z-[3] border-t border-white/14">
          <div className="wrap flex flex-wrap items-center gap-x-12 gap-y-3 py-5 text-[13px] tracking-[0.04em] text-ivory/70">
            <span>{site.address.street}, {site.address.postalCode} {site.address.city}</span>
            <span>{site.hours.label} · {site.hours.closed}</span>
            <span aria-hidden="true" className="hidden items-center gap-3.5 text-[10px] uppercase tracking-[0.32em] text-silver sm:inline-flex">
              <span className="scrollcue" />Scroll
            </span>
            <a href={site.phoneHref} className="no-underline sm:ml-auto">{site.phone}</a>
          </div>
        </FadeIn>
      </section>

      <Marquee />

      {/* ───── Willkommen ───── */}
      <section aria-labelledby="willkommen" className="wrap section-y">
        <div className="grid items-center gap-[clamp(56px,7vw,120px)] [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <div className="relative pb-[90px]">
            <ImageReveal parallax className="aspect-[4/5] w-[82%]">
              <Image src={img.studioDamen.src} alt={img.studioDamen.alt} fill sizes="(max-width: 900px) 82vw, 40vw" className="object-cover object-[40%_60%]" placeholder="blur" />
            </ImageReveal>
            <Reveal delay={0.2} className="frame absolute bottom-0 right-0 aspect-square w-[46%] rounded-full border-[10px] border-ivory">
              <Image src={img.topper.src} alt={img.topper.alt} fill sizes="(max-width: 900px) 46vw, 20vw" className="object-cover" placeholder="blur" />
            </Reveal>
            <RotatingBadge className="bottom-[46%] right-[30%] max-sm:scale-[0.72]" />
          </div>
          <div className="flex flex-col gap-7">
            <Reveal as="p" className="eyebrow m-0 text-graphite">Willkommen im Haarzentrum Mainz</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(34px,4.6vw,72px)] font-normal leading-[1.04] tracking-[-0.015em] [text-wrap:balance]">
              <span id="willkommen">Ihr Experte für Perücken, Haarteile <em className="text-graphite">&amp; Zweithaar</em></span>
            </Reveal>
            <DrawLine />
            <Reveal as="p" delay={0.1} className="m-0 text-lg text-ink-1">
              Das Haarzentrum Mainz ist Ihr professioneller Ansprechpartner für Perücken, Haarteile und moderne Zweithaarlösungen. Wir sind spezialisiert auf individuelle Lösungen bei Haarausfall, egal ob krankheitsbedingt, hormonell oder genetisch.
            </Reveal>
            <Reveal as="p" delay={0.15} className="m-0 text-ink-3">
              Wir begleiten Sie persönlich – von der ersten Beratung über die Auswahl bis hin zur optimalen Anpassung. Selbstverständlich unterstützen wir Sie auch bei der Abrechnung mit Ihrer Krankenkasse.
            </Reveal>
            <Reveal delay={0.2} className="cta-row mt-2">
              <ButtonLink href="/contact/" variant="dark">Termin vereinbaren</ButtonLink>
              <TextLink href="/about/" className="py-4">Über uns</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── Leistungen ───── */}
      <section id="leistungen" aria-labelledby="leistungen-h" className="scroll-mt-20 bg-mist">
        <div className="wrap section-y">
          <div className="mb-[clamp(56px,7vw,96px)] flex flex-wrap items-end justify-between gap-6">
            <Reveal as="h2" className="serif m-0 text-[clamp(38px,6vw,96px)] font-normal leading-[0.98] tracking-[-0.02em]">
              <span id="leistungen-h">Unsere<br /><em>Leistungen</em></span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="m-0 max-w-[380px] text-ink-3">
              Natürliche Optik, hoher Tragekomfort &amp; sicherer Halt – individuell für Damen und Herren.
            </Reveal>
          </div>
          {services.map((s, i) => (
            <Link
              key={s.n}
              href={s.href}
              className={`card grid items-center gap-[clamp(32px,5vw,88px)] no-underline [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))] ${
                i < services.length - 1 ? "pb-[clamp(64px,8vw,120px)]" : ""
              }`}
            >
              <ImageReveal className={`${s.aspect} ${s.flip ? "md:order-2" : ""}`}>
                <div className="zoom absolute inset-0">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(max-width: 900px) 100vw, 45vw" className="object-cover" style={{ objectPosition: s.pos }} placeholder="blur" />
                </div>
              </ImageReveal>
              <div className="flex flex-col gap-[22px]">
                <Reveal as="span" className="serif text-lg italic text-graphite">{s.n}</Reveal>
                <Reveal as="h3" className="serif m-0 text-[clamp(32px,3.4vw,52px)] font-normal leading-[1.06]">{s.title}</Reveal>
                <Reveal as="p" delay={0.1} className="m-0 max-w-[480px] text-ink-2">{s.text}</Reveal>
                <div className="reveal-line h-px w-full bg-charcoal" />
                <Reveal delay={0.15}>
                  <span className="tlink self-start">
                    {s.cta} <span className="arr" aria-hidden="true">→</span>
                  </span>
                </Reveal>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── Spezialgebiete ───── */}
      <section aria-labelledby="spezial-h" className="relative overflow-hidden bg-charcoal text-ivory">
        <div className="wrap section-y grid items-start gap-x-24 gap-y-12 [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]">
          <div className="flex flex-col gap-7">
            <Reveal as="p" className="eyebrow m-0 text-silver">Unsere Spezialgebiete</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(34px,5vw,80px)] font-normal leading-[1.02] tracking-[-0.015em]">
              <span id="spezial-h">Erfahrung, Diskretion <em className="text-silver">und Liebe zum Detail.</em></span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="m-0 max-w-[420px] text-ivory/72">
              Kostenlose Beratung in geschützter Atmosphäre – auf Wunsch ganz diskret.
            </Reveal>
          </div>
          <ol className="m-0 grid list-none gap-x-10 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {specials.map((t, i) => (
              <Reveal as="li" key={t} delay={(i % 2) * 0.08} className="flex gap-[18px] border-t border-white/14 py-[22px]">
                <span className="serif min-w-[26px] italic text-silver">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-[1.55] text-ivory/88">{t}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── Für Herren ───── */}
      <section aria-labelledby="herren-h" className="grid bg-ivory [grid-template-columns:repeat(auto-fit,minmax(min(520px,100%),1fr))]">
        <div className="frame relative min-h-[clamp(380px,90vw,520px)] md:min-h-[680px]">
          <Parallax>
            <Image src={img.studioHerren.src} alt={img.studioHerren.alt} fill sizes="(max-width: 1040px) 100vw, 50vw" className="object-cover object-[48%_55%]" placeholder="blur" />
          </Parallax>
        </div>
        <div className="flex flex-col justify-center gap-[30px] px-[clamp(20px,6vw,110px)] py-[clamp(72px,9vw,140px)]">
          <Reveal as="p" className="eyebrow m-0 text-graphite">Für Herren</Reveal>
          <Reveal as="h2" className="serif m-0 text-[clamp(34px,4.8vw,76px)] font-normal leading-[1.02] tracking-[-0.015em]">
            <span id="herren-h">Diskret <em>&amp;</em> Professionell</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="m-0 text-lg text-ink-1">Professionelle Lösungen bei Haarausfall für Männer.</Reveal>
          <ul className="m-0 flex list-none flex-col p-0">
            {[
              ["Skin Bonding", "Professionelles Anbringen direkt auf der Kopfhaut."],
              ["Echthaar", "Maßgefertigte Haarteile aus Echthaar – individuell angepasst an Farbe, Textur und Haarlinie."],
              ["Betreuung", "Persönliche Beratung und professionelle Pflege."],
            ].map(([k, v], i) => (
              <Reveal
                as="li"
                key={k}
                delay={i * 0.08}
                className={`grid gap-5 border-t border-charcoal/16 py-[22px] [grid-template-columns:150px_1fr] max-sm:[grid-template-columns:1fr] ${i === 2 ? "border-b" : ""}`}
              >
                <span className="eyebrow pt-1 text-graphite">{k}</span>
                <span className="text-ink-1">{v}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <ButtonLink href="/contact/" variant="dark">Termin vereinbaren</ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ───── Vorher & Nachher ───── */}
      <section aria-labelledby="ba-h" className="wrap section-y">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="serif m-0 text-[clamp(38px,6vw,96px)] font-normal leading-[0.98] tracking-[-0.02em]">
            <span id="ba-h">Vorher <em className="text-graphite">&amp;</em> Nachher</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="m-0 max-w-[360px] text-ink-3">
            Perücken und Hair Bonding – ziehen Sie den Regler, um das Ergebnis zu vergleichen.
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <BeforeAfter />
        </Reveal>
      </section>

      {/* ───── Preise ───── */}
      <section aria-labelledby="preise-h" className="bg-mist">
        <div className="wrap section-y grid gap-x-[120px] gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <div className="flex flex-col gap-7">
            <Reveal as="p" className="eyebrow m-0 text-graphite">Transparent &amp; fair</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(38px,5.4vw,88px)] font-normal leading-[0.98] tracking-[-0.02em]">
              <span id="preise-h">Zweithaar<br /><em>Preisliste</em></span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="m-0 max-w-[380px] text-ink-3">Direkte Abrechnung mit gesetzlichen und privaten Krankenkassen.</Reveal>
            <Reveal delay={0.15}><TextLink href="/preislist/">Vollständige Preisliste</TextLink></Reveal>
          </div>
          <div className="flex flex-col gap-12">
            {[
              {
                h: "Toupet / Haarteil Service",
                rows: [
                  ["Rebonding", "inkl. Reinigung & neu verkleben", "160 €"],
                  ["Weaving hochsetzen", "inklusive Reinigung + Styling", "180 €"],
                ],
              },
              {
                h: "Perücken Service",
                rows: [
                  ["Waschen + Stylen Kunsthaar", "", "60 €"],
                  ["Waschen + Föhnen Echthaar", "", "75 €"],
                  ["Frizz entfernen Kunsthaar", "", "Kostenlos"],
                ],
              },
            ].map((g, gi) => (
              <Reveal key={g.h} delay={gi * 0.1}>
                <h3 className="eyebrow m-0 mb-2 text-graphite">{g.h}</h3>
                <dl className="m-0">
                  {g.rows.map(([n, d, p]) => (
                    <div key={n} className="price-row flex items-baseline gap-4 border-b border-charcoal/16 py-[22px]">
                      <dt className="flex-1">
                        <span className="serif block text-[22px] leading-tight sm:text-[26px]">{n}</span>
                        {d && <span className="text-sm text-graphite">{d}</span>}
                      </dt>
                      <dd className={p === "Kostenlos" ? "eyebrow m-0 text-graphite" : "serif m-0 whitespace-nowrap text-[24px] sm:text-[28px]"}>{p}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Referenzen ───── */}
      <section aria-labelledby="ref-h" className="wrap section-y flex flex-col items-center gap-9 text-center">
        <Reveal as="h2" className="eyebrow m-0 font-medium text-graphite">
          <span id="ref-h">Referenzen · Das sagen unsere Kunden</span>
        </Reveal>
        <Testimonials />
      </section>

      {/* ───── Partner ───── */}
      <Partners />

      {/* ───── Abschluss-CTA ───── */}
      <section aria-labelledby="cta-h" className="relative overflow-hidden bg-charcoal text-ivory">
        <div className="frame absolute inset-0 opacity-[0.38]">
          <Parallax>
            <Image src={img.salonStyling.src} alt="" fill sizes="100vw" className="mono object-cover object-[50%_35%]" />
          </Parallax>
        </div>
        <div className="wrap relative flex flex-col items-start gap-9 py-[clamp(88px,13vw,200px)]">
          <Reveal as="p" className="eyebrow m-0 text-silver">Schönheit, die begeistert</Reveal>
          <Reveal as="h2" className="serif m-0 max-w-[1100px] text-[clamp(48px,7.6vw,124px)] font-normal leading-[0.96] tracking-[-0.02em]">
            <span id="cta-h">Erstklassige Haarkunst <em className="text-silver">auf höchstem Niveau.</em></span>
          </Reveal>
          <Reveal delay={0.1} className="cta-row">
            <ButtonLink href={site.bookingUrl} variant="silver">Termin buchen</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost-light" arrow={false}>{site.phone}</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
