import Image from "next/image";
import { Curtain, FadeIn, ImageReveal, KenBurns, LineReveal, Reveal, ScrollBrighten } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Über das Haarzentrum Mainz – Ihr Friseur-Team in Mainz",
  description:
    "Das Haarzentrum Mainz wurde gegründet, um Menschen mit Haarausfall professionelle und diskrete Lösungen rund um medizinische Perücken und Zweithaar anzubieten – einfühlsam, kompetent und persönlich.",
  path: "/about/",
});

const steps = [
  "Individuelle Perücken, Haarteile und moderne Haarintegrations-Techniken",
  "Unterstützung bei der Abrechnung mit Ihrer Krankenkasse",
  "Zusammenarbeit mit erfahrenen Partnern aus Medizin und Kosmetik",
  "Ergänzend: ausgewählte Friseur- und Stylingleistungen",
];

const advantages = [
  ["I", "Erfahrene Stylisten", "Fachwissen und Gespür für Natürlichkeit – in jedem Detail."],
  ["II", "Personalisierte Behandlungen", "Jede Lösung wird individuell auf Sie abgestimmt."],
  ["III", "Hochwertige Extensions", "Aus erstklassigen Materialien gefertigt."],
];

export default function AboutPage() {
  return (
    <>
      <section aria-label="Einleitung" className="grid bg-charcoal min-[1040px]:min-h-[820px] text-ivory [grid-template-columns:repeat(auto-fit,minmax(min(520px,100%),1fr))]">
        <div className="flex flex-col justify-end gap-[30px] px-[clamp(20px,5vw,80px)] pb-[clamp(48px,7vw,72px)] pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.35}><h1 className="eyebrow m-0 text-silver">Über uns</h1></FadeIn>
          <p className="serif m-0 text-[clamp(34px,9vw,72px)] min-[1040px]:text-[clamp(44px,4.2vw,84px)] leading-[0.96] tracking-[-0.02em]">
            <LineReveal lines={["Ihr professionelles", "Haarzentrum", <em key="s" className="sheen">in Mainz.</em>]} />
          </p>
          <FadeIn as="p" delay={0.95} className="m-0 max-w-[480px] text-ivory/80">
            Gegründet, um Menschen mit Haarausfall professionelle und diskrete Lösungen rund um medizinische Perücken und Zweithaar anzubieten.
          </FadeIn>
        </div>
        <div className="frame relative min-h-[clamp(340px,80vw,520px)]">
          <KenBurns>
            <Image src={img.schaufenster.src} alt={img.schaufenster.alt} fill preload sizes="(max-width: 1040px) 100vw, 50vw" className="object-cover object-[35%_40%]" placeholder="blur" />
          </KenBurns>
          <Curtain origin="left" delay={0.2} />
        </div>
      </section>

      <section aria-label="Unsere Haltung" className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(88px,13vw,200px)]">
        <Reveal as="p" className="eyebrow m-0 mb-9 text-graphite">Unsere Haltung</Reveal>
        <ScrollBrighten className="serif m-0 text-[clamp(30px,3.8vw,58px)] leading-[1.2] tracking-[-0.01em] [text-wrap:pretty]">
          Unser Ziel ist es, die Bedürfnisse jedes Kunden zu verstehen und die passende Lösung zu finden – <em className="text-graphite">einfühlsam, kompetent</em> und auf höchstem fachlichem Niveau. Für Natürlichkeit, Tragekomfort und ein sicheres Gefühl im Alltag.
        </ScrollBrighten>
      </section>

      <section aria-labelledby="weg-h" className="bg-mist">
        <div className="wrap section-y grid items-center gap-x-[110px] gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]">
          <div className="flex flex-col gap-[26px]">
            <Reveal as="p" className="eyebrow m-0 text-graphite">Persönlich begleitet</Reveal>
            <Reveal as="h2" className="serif m-0 text-[clamp(34px,4.8vw,76px)] font-normal leading-[1.02] tracking-[-0.015em]">
              <span id="weg-h">Von der ersten Beratung <em>bis zur Anpassung.</em></span>
            </Reveal>
            <ul className="m-0 list-none p-0">
              {steps.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.06} className={`border-t border-charcoal/16 py-5 text-ink-1 ${i === steps.length - 1 ? "border-b" : ""}`}>{s}</Reveal>
              ))}
            </ul>
          </div>
          <ImageReveal parallax className="aspect-[4/5] max-w-[560px]">
            <Image src={img.anpassung.src} alt={img.anpassung.alt} fill sizes="(max-width: 900px) 100vw, 40vw" className="object-cover object-[50%_30%]" placeholder="blur" />
          </ImageReveal>
        </div>
      </section>

      <section aria-labelledby="vorteile-h" className="wrap section-y">
        <Reveal as="h2" className="serif m-0 mb-[clamp(48px,6vw,80px)] text-[clamp(38px,6vw,96px)] font-normal leading-[0.98] tracking-[-0.02em]">
          <span id="vorteile-h">Unsere einzigartigen <em className="text-graphite">Vorteile</em></span>
        </Reveal>
        <div className="grid border-t border-charcoal/20 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {advantages.map(([n, h, d], i) => (
            <Reveal
              key={n}
              delay={i * 0.1}
              className="group flex flex-col gap-[18px] border-b border-charcoal/20 px-6 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-11 transition-colors duration-[800ms] [transition-timing-function:var(--ease-lux)] hover:bg-charcoal hover:text-ivory"
            >
              <span className="serif text-[64px] italic leading-none text-silver transition-transform duration-1000 [transition-timing-function:var(--ease-lux)] group-hover:-translate-y-2">{n}</span>
              <h3 className="serif m-0 text-[28px] font-normal sm:text-[32px]">{h}</h3>
              <p className="m-0 opacity-80">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="mission-h" className="bg-charcoal text-ivory">
        <div className="wrap flex flex-col items-center gap-9 py-[clamp(88px,13vw,200px)] text-center">
          <Reveal as="p" className="eyebrow m-0 text-silver">Unsere Mission</Reveal>
          <Reveal as="h2" className="serif m-0 max-w-[1150px] text-[clamp(38px,5.4vw,86px)] font-normal leading-[1.04] tracking-[-0.015em] [text-wrap:balance]">
            <span id="mission-h">Menschen jeden Alters zu mehr <em className="text-silver">Selbstbewusstsein, Lebensqualität</em> und einem natürlichen Erscheinungsbild verhelfen.</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="serif m-0 mt-6 text-[22px] italic sm:text-[26px] text-ivory/80">Bereit für einen neuen Look?</Reveal>
          <Reveal delay={0.2} className="cta-row justify-center">
            <ButtonLink href={site.bookingUrl} variant="silver">Termin buchen</ButtonLink>
            <ButtonLink href="/preislist/" variant="ghost-light" arrow={false}>Preisliste</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
