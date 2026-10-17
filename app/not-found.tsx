import { FadeIn, LineReveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Seite nicht gefunden", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-end bg-charcoal text-ivory">
      <div className="wrap flex flex-col gap-8 pb-24 pt-[clamp(128px,18vw,200px)]">
        <FadeIn delay={0.2}><p className="eyebrow m-0 text-silver">Fehler 404</p></FadeIn>
        <h1 className="serif m-0 text-[clamp(40px,9vw,128px)] font-normal leading-[0.94]">
          <LineReveal lines={["Diese Seite", <em key="s" className="sheen">gibt es nicht.</em>]} />
        </h1>
        <FadeIn delay={0.9} className="cta-row">
          <ButtonLink href="/" variant="silver">Zur Startseite</ButtonLink>
          <ButtonLink href="/contact/" variant="ghost-light" arrow={false}>Kontakt</ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}
