import Image from "next/image";
import { FaqAccordion } from "@/components/faq-accordion";
import { FadeIn, ImageReveal, LineReveal, Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { faqs } from "@/lib/content";
import { img } from "@/lib/images";
import { jsonLdString, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ – Häufige Fragen | Haarzentrum Mainz",
  description:
    "Antworten auf häufige Fragen an das Haarzentrum Mainz: Leistungen, Haarverlängerungen, Haltbarkeit von Extensions, Terminvereinbarung, Dauer und persönliche Beratung.",
  path: "/faq/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <section aria-label="Einleitung" className="bg-charcoal text-ivory">
        <div className="wrap flex flex-col gap-7 pb-[clamp(56px,8vw,88px)] pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.35}><h1 className="eyebrow m-0 text-silver">FAQ · Häufige Fragen</h1></FadeIn>
          <p className="serif m-0 text-[clamp(48px,11vw,144px)] leading-[0.94] tracking-[-0.025em]">
            <LineReveal lines={["Gut zu", <em key="s" className="sheen">wissen.</em>]} />
          </p>
        </div>
      </section>

      <section aria-label="Fragen und Antworten" className="wrap flex flex-wrap items-start gap-x-24 gap-y-14 py-[clamp(72px,9vw,130px)]">
        <div className="flex flex-[1_1_300px] flex-col gap-6">
          <ImageReveal parallax className="aspect-[4/5]">
            <Image src={img.extensions.src} alt={img.extensions.alt} fill sizes="(max-width: 900px) 100vw, 30vw" className="object-cover object-[45%_50%]" placeholder="blur" />
          </ImageReveal>
          <Reveal as="p" className="m-0 text-ink-3">Ihre Frage ist nicht dabei? Wir beraten Sie gern persönlich.</Reveal>
          <Reveal delay={0.1}><ButtonLink href="/contact/" variant="dark">Kontakt aufnehmen</ButtonLink></Reveal>
        </div>
        <div className="min-w-0 flex-[999_1_560px]">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
