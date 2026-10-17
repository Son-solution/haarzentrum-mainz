import Image from "next/image";
import Link from "next/link";
import { Curtain, FadeIn, ImageReveal, KenBurns, LineReveal, Reveal } from "@/components/motion";
import { ButtonLink, TextLink } from "@/components/ui";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Haarzentrum Mainz – Friseur für Haarschnitt & Haarverlängerung",
  description:
    "Ihr Spezialist für professionelle Haarschnitte in Mainz: Damen-, Herren- und Kinderhaarschnitte, Farbe, Balayage, Styling, Pflege und Haarverlängerungen. 10 % Rabatt mit Studentenausweis.",
  path: "/haarschnitt/",
});

const heroTrio = [
  { photo: img.foehnen, pos: "42% 40%" },
  { photo: img.herrenFade, pos: "35% 40%" },
  { photo: img.flechtfrisur, pos: "40% 50%" },
];

const types = [
  { n: "01", t: "Damen Haarschnitte", d: "Schnitt & Styling, Farbe & Strähnen, Balayage und moderne Techniken wie AirTouch.", href: "/preislist/", cta: "Preise ansehen" },
  { n: "02", t: "Herren Haarschnitte", d: "Waschen, Schneiden, Styling – vom Trockenschnitt bis zum Maschinenhaarschnitt, inklusive Bart- & Konturenpflege.", href: "/preislist/", cta: "Preise ansehen" },
  { n: "03", t: "Kinder Haarschnitte", d: "Individuelle Haarschnitte für die Kleinen – mit Zeit, Geduld und persönlicher Beratung.", href: "/contact/", cta: "Termin vereinbaren" },
];

const specialties = [
  ["Haarverlängerungen & Extensions", "Aus Echthaar oder Kunsthaar – mit kostenloser Beratung und auf Wunsch diskret."],
  ["Styling", "Für Alltag und besondere Anlässe."],
  ["Pflegebehandlungen", "Intensivpflege für gesundes, glänzendes Haar."],
  ["Bart- & Konturenpflege", "Präzise Konturen für einen gepflegten Look."],
];

const damenPrices = [
  ["Waschen | Schneiden | Föhnen", "52 €", "65 €", "78 €"],
  ["Waschen | Föhnen", "34 €", "40 €", "55 €"],
  ["Cut & Go (ohne Föhnen)", "40 €", "–", "–"],
];

export default function HaarschnittPage() {
  return (
    <>
      <section aria-label="Einleitung" className="relative overflow-hidden bg-charcoal text-ivory">
        <div className="wrap flex flex-col gap-8 pt-[clamp(128px,18vw,190px)]">
          <FadeIn delay={0.35}>
            <h1 className="eyebrow m-0 text-silver">Ihr Spezialist für professionelle Haarschnitte in Mainz</h1>
          </FadeIn>
          <p className="serif m-0 text-[clamp(44px,11vw,160px)] font-normal leading-[0.92] tracking-[-0.025em]">
            <LineReveal lines={["Schnitt.", <em key="s" className="sheen">Farbe. Styling.</em>]} />
          </p>
          <div className="flex flex-wrap items-end justify-between gap-7 pb-14">
            <FadeIn as="p" delay={0.95} className="m-0 max-w-[500px] text-[17px] text-ivory/80">
              Individuelle Haarschnitte und modernes Styling für Damen, Herren und Kinder – abgestimmt auf Haarstruktur, Gesichtsform und Ihren persönlichen Stil.
            </FadeIn>
            <FadeIn delay={1.15} className="cta-row">
              <ButtonLink href="/contact/" variant="silver">Termin vereinbaren</ButtonLink>
            </FadeIn>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 px-1 pb-1 min-[600px]:grid-cols-3">
          {heroTrio.map((h, i) => (
            <div key={i} className="frame relative aspect-[4/3] max-h-[560px] min-[600px]:aspect-[3/4]">
              <KenBurns>
                <Image src={h.photo.src} alt={h.photo.alt} fill preload={i === 0} sizes="(max-width: 599px) 100vw, 33vw" className="object-cover" style={{ objectPosition: h.pos }} placeholder="blur" />
              </KenBurns>
              <Curtain delay={0.15 + i * 0.15} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fuer-h" className="wrap section-y">
        <Reveal as="h2" className="serif m-0 mb-[clamp(48px,6vw,88px)] text-[clamp(38px,6vw,96px)] font-normal leading-[0.98] tracking-[-0.02em]">
          <span id="fuer-h">Für jeden <em className="text-graphite">Typ.</em></span>
        </Reveal>
        <div className="grid gap-x-12 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
          {types.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1}>
              <Link href={t.href} className="card flex flex-col gap-[18px] border-t border-charcoal/18 pb-10 pt-8 no-underline">
                <span className="serif text-lg italic text-graphite">{t.n}</span>
                <h3 className="serif m-0 text-[clamp(30px,3vw,44px)] font-normal leading-[1.05]">{t.t}</h3>
                <p className="m-0 text-ink-2">{t.d}</p>
                <div className="reveal-line h-px bg-charcoal" />
                <span className="tlink self-start">{t.cta} <span className="arr" aria-hidden="true">→</span></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="spez-h" className="bg-mist">
        <div className="wrap section-y grid items-center gap-x-[110px] gap-y-16 [grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]">
          <ImageReveal parallax className="aspect-[4/5]">
            <Image src={img.straehne.src} alt={img.straehne.alt} fill sizes="(max-width: 900px) 100vw, 45vw" className="object-cover object-[50%_40%]" placeholder="blur" />
          </ImageReveal>
          <div className="flex flex-col gap-[26px]">
            <Reveal as="p" className="eyebrow m-0 text-graphite">Unsere Spezialitäten</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(34px,4.8vw,76px)] font-normal leading-[1.02] tracking-[-0.015em]">
              <span id="spez-h">Styling <em>&amp;</em> Pflege</span>
            </Reveal>
            <ul className="m-0 list-none p-0">
              {specialties.map(([h, d], i) => (
                <Reveal as="li" key={h} delay={i * 0.06} className={`border-t border-charcoal/16 py-[22px] ${i === specialties.length - 1 ? "border-b" : ""}`}>
                  <span className="serif block text-[26px]">{h}</span>
                  <span className="text-ink-2">{d}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="inline-flex items-center gap-3.5 self-start rounded-full border border-charcoal/25 max-sm:rounded-3xl px-[22px] py-3.5 text-sm">
              <span className="serif whitespace-nowrap text-[22px] italic text-graphite">10 %</span>auf alle Leistungen mit gültigem Studentenausweis
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="hp-h" className="wrap section-y grid gap-x-[120px] gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
        <div className="flex flex-col gap-[26px]">
          <Reveal as="p" className="eyebrow m-0 text-graphite">Damen – Schnitt &amp; Styling</Reveal>
          <Reveal as="h2" className="serif m-0 text-[clamp(38px,5.4vw,88px)] font-normal leading-[0.98] tracking-[-0.02em]">
            <span id="hp-h">Ausgewählte<br /><em>Preise</em></span>
          </Reveal>
          <Reveal delay={0.1}><TextLink href="/preislist/">Vollständige Preisliste</TextLink></Reveal>
        </div>
        <Reveal delay={0.1} className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="eyebrow border-b border-charcoal/30 text-graphite max-sm:tracking-[0.08em]">
                <th className="pb-3 text-left font-medium"><span className="sr-only-focusable">Leistung</span></th>
                <th className="w-[52px] pb-3 sm:w-[72px] text-right font-medium">Kurz</th>
                <th className="w-[52px] pb-3 sm:w-[72px] text-right font-medium">Mittel</th>
                <th className="w-[52px] pb-3 sm:w-[72px] text-right font-medium">Lang</th>
              </tr>
            </thead>
            <tbody>
              {damenPrices.map(([n, ...p]) => (
                <tr key={n} className="price-row serif border-b border-charcoal/16 text-[18px] sm:text-[22px]">
                  <th scope="row" className="py-[22px] text-left font-normal">{n}</th>
                  {p.map((v, i) => <td key={i} className="py-[22px] text-right">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section aria-labelledby="besuch-h" className="bg-charcoal text-ivory">
        <div className="wrap section-y grid items-center gap-x-[110px] gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <div className="flex flex-col gap-7">
            <Reveal as="p" className="eyebrow m-0 text-silver">Besuchen Sie uns</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(28px,8.5vw,64px)] font-normal leading-[1.02] lg:text-[clamp(36px,3.6vw,72px)]">
              <span id="besuch-h"><span className="whitespace-nowrap">{site.address.street}</span><br /><em className="text-silver">{site.address.postalCode} {site.address.city}</em></span>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-6 text-ivory/78 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
              <div>
                <div className="eyebrow mb-2 text-silver">Öffnungszeiten</div>
                {site.hours.label}<br />{site.hours.closed}
              </div>
              <div>
                <div className="eyebrow mb-2 text-silver">Telefon</div>
                <a className="dist" href={site.phoneHref}>{site.phone}</a>
              </div>
            </Reveal>
            <Reveal delay={0.15}><ButtonLink href="/contact/" variant="silver">Jetzt beraten lassen</ButtonLink></Reveal>
          </div>
          <ImageReveal parallax className="aspect-[4/3]">
            <Image src={img.stylingWellen.src} alt={img.stylingWellen.alt} fill sizes="(max-width: 900px) 100vw, 45vw" className="object-cover object-[55%_40%]" placeholder="blur" />
          </ImageReveal>
        </div>
      </section>
    </>
  );
}
