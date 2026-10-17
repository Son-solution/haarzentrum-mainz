import Image from "next/image";
import { Curtain, FadeIn, KenBurns, LineReveal, Reveal } from "@/components/motion";
import { PriceList } from "@/components/price-list";
import { ButtonLink } from "@/components/ui";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Preise im Haarzentrum Mainz – Haarschnitt & Haarverlängerung",
  description:
    "Preisliste Haarzentrum Mainz: Zweithaar- und Perücken-Service, Damen- und Herrenhaarschnitte, Farbe & Strähnen, Balayage, AirTouch, Pflege und Kosmetik – transparent und fair.",
  path: "/preislist/",
});

export default function PreislistePage() {
  return (
    <>
      <section aria-label="Einleitung" className="relative flex min-h-[clamp(520px,80vw,640px)] overflow-hidden bg-charcoal text-ivory">
        <div className="frame absolute inset-0">
          <KenBurns className="absolute inset-0 opacity-50">
            <Image src={img.haarfarben.src} alt="" fill preload sizes="100vw" className="mono object-cover" placeholder="blur" />
          </KenBurns>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#17191C_0%,rgba(23,25,28,.3)_70%)]" />
          <Curtain />
        </div>
        <div className="wrap relative z-[3] flex w-full flex-col justify-end gap-7 pb-[clamp(48px,7vw,72px)] pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.35}>
            <h1 className="eyebrow m-0 text-silver">Preise im Haarzentrum Mainz – Haarschnitt &amp; Haarverlängerung</h1>
          </FadeIn>
          <p className="serif m-0 text-[clamp(48px,13vw,176px)] leading-[0.9] tracking-[-0.03em]">
            <LineReveal lines={[<span key="s">Preis<em className="sheen">liste</em></span>]} />
          </p>
          <FadeIn as="p" delay={0.95} className="m-0 max-w-[520px] text-ivory/80">
            Transparent und fair. Bei Zweithaar unterstützen wir Sie bei der direkten Abrechnung mit gesetzlichen und privaten Krankenkassen.
          </FadeIn>
        </div>
      </section>

      <section aria-label="Preise" className="mx-auto max-w-[1180px] px-[var(--gutter)] pb-[clamp(72px,11vw,160px)] pt-[clamp(72px,9vw,120px)]">
        <PriceList />
        <Reveal className="mt-[clamp(64px,8vw,110px)] flex flex-wrap items-center justify-between gap-6 bg-charcoal px-6 py-8 text-ivory max-lg:flex-col max-lg:justify-center max-lg:text-center sm:px-9">
          <p className="m-0 flex flex-wrap items-baseline gap-x-4 gap-y-1 max-lg:justify-center">
            <span className="serif whitespace-nowrap text-[40px] italic text-silver">10 %</span>
            <span>auf alle Leistungen mit gültigem Studentenausweis</span>
          </p>
          <ButtonLink href={site.bookingUrl} variant="silver">Termin buchen</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
