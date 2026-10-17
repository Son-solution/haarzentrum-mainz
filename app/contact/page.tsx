import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, ImageReveal, KenBurns, LineReveal, Parallax, Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Kontakt & Termin – Haarzentrum Mainz",
  description:
    "Kontaktieren Sie das Haarzentrum Mainz: Langenbeckstraße 2, 55131 Mainz · Tel. +49 172 9394433 · info@haarzentrum-mainz.de. Kostenlose Beratung in geschützter Atmosphäre – Termin online buchen oder anfragen.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <section aria-label="Einleitung" className="bg-charcoal text-ivory">
        <div className="wrap flex flex-wrap items-end justify-between gap-12 pb-[clamp(56px,8vw,88px)] pt-[clamp(128px,18vw,200px)]">
          <div className="flex flex-col gap-7">
            <FadeIn delay={0.35}><h1 className="eyebrow m-0 text-silver">Kontaktieren Sie uns</h1></FadeIn>
            <p className="serif m-0 text-[clamp(42px,11vw,144px)] leading-[0.94] tracking-[-0.025em]">
              <LineReveal lines={["Termin", <em key="s" className="sheen">vereinbaren.</em>]} />
            </p>
          </div>
          <FadeIn delay={0.95} className="grid flex-[0_1_560px] gap-x-14 gap-y-7 text-[15px] text-ivory/82 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            <div><div className="eyebrow mb-2 text-silver">Telefon</div><a className="dist" href={site.phoneHref}>{site.phone}</a></div>
            <div><div className="eyebrow mb-2 text-silver">E-Mail</div><a className="dist break-all" href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><div className="eyebrow mb-2 text-silver">Adresse</div><address className="not-italic">{site.address.street}<br />{site.address.postalCode} {site.address.city}</address></div>
            <div><div className="eyebrow mb-2 text-silver">Öffnungszeiten</div>{site.hours.label}<br />{site.hours.closed}</div>
          </FadeIn>
        </div>
      </section>

      <section aria-labelledby="anfrage-h" className="wrap flex flex-wrap items-start gap-x-[110px] gap-y-16 py-[clamp(72px,9vw,130px)]">
        <div className="flex flex-[1_1_320px] flex-col gap-[26px]">
          <Reveal as="h2" className="serif m-0 text-[clamp(38px,4.2vw,64px)] font-normal leading-[1.04]">
            <span id="anfrage-h">Kostenlose Beratung <em className="text-graphite">in geschützter Atmosphäre.</em></span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="m-0 text-ink-2">
            Wir empfehlen, vorab einen Termin zu vereinbaren, um Wartezeiten zu vermeiden und eine optimale Betreuung sicherzustellen. Auf Wunsch beraten wir Sie ganz diskret.
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-3 border-y border-charcoal/16 py-6">
            <span className="eyebrow text-graphite">Direkt online buchen</span>
            <p className="m-0 text-ink-2">Freie Termine sehen und sofort buchen – über unseren Buchungspartner Planity.</p>
            <ButtonLink href={site.bookingUrl} variant="dark" className="self-start">Termin online buchen</ButtonLink>
          </Reveal>
          <ImageReveal className="mt-3 aspect-[4/3]">
            <KenBurns>
              <Image src={img.studioHerren.src} alt={img.studioHerren.alt} fill sizes="(max-width: 900px) 100vw, 35vw" className="object-cover object-[50%_55%]" placeholder="blur" />
            </KenBurns>
          </ImageReveal>
        </div>
        <div className="min-w-0 flex-[999_1_560px]">
          <Reveal as="p" className="eyebrow m-0 mb-8 text-graphite">Oder senden Sie uns Ihre Terminanfrage</Reveal>
          <ContactForm />
        </div>
      </section>

      <section aria-labelledby="anfahrt-h" className="px-1 pb-1">
        <div className="frame relative flex min-h-[clamp(420px,70vw,520px)] items-end bg-charcoal">
          <div className="absolute inset-0 opacity-70">
            <Parallax>
              <Image src={img.studioDamen.src} alt="" fill sizes="100vw" className="mono object-cover object-[82%_35%]" />
            </Parallax>
          </div>
          <div className="relative z-[2] flex w-full flex-wrap items-end justify-between gap-8 bg-[linear-gradient(0deg,rgba(23,25,28,.85),rgba(23,25,28,0))] p-[clamp(32px,5vw,72px)] text-white">
            <div>
              <Reveal as="p" className="eyebrow m-0 mb-3.5 text-silver">Anfahrt</Reveal>
              <Reveal as="h2" className="serif m-0 text-[clamp(26px,7.5vw,72px)] font-normal leading-[1.02]">
                <span id="anfahrt-h"><span className="whitespace-nowrap">{site.address.street}</span><br /><em className="text-silver">{site.address.postalCode} {site.address.city}</em></span>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="cta-row"><ButtonLink href={site.mapsUrl} variant="silver">Route planen</ButtonLink></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
