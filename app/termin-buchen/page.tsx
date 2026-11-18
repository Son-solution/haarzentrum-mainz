import { FadeIn, LineReveal } from "@/components/motion";
import { PlanityBooking } from "@/components/planity-booking";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Termin online buchen – Haarzentrum Mainz",
  description:
    "Termin im Haarzentrum Mainz online buchen: freie Termine für Perückenberatung, Haarschnitt und Extensions direkt über unseren Buchungspartner Planity – oder telefonisch unter +49 172 9394433.",
  path: "/termin-buchen/",
});

export default function TerminBuchenPage() {
  return (
    <>
      <section aria-label="Einleitung" className="bg-charcoal text-ivory">
        <div className="wrap flex flex-col gap-7 pb-[clamp(48px,7vw,72px)] pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.35}><h1 className="eyebrow m-0 text-silver">Online-Terminbuchung</h1></FadeIn>
          <p className="serif m-0 text-[clamp(42px,11vw,144px)] leading-[0.94] tracking-[-0.025em]">
            <LineReveal lines={["Termin", <em key="b" className="sheen">buchen.</em>]} />
          </p>
          <FadeIn delay={1.1}>
            <p className="m-0 max-w-[620px] text-ivory/82">
              Wählen Sie Ihre Leistung und einen freien Termin. Sie erreichen uns auch telefonisch unter{" "}
              <a className="dist" href={site.phoneHref}>{site.phone}</a> ({site.hours.label}).
            </p>
          </FadeIn>
        </div>
      </section>

      <section aria-label="Buchungsmodul" className="wrap py-[clamp(56px,8vw,110px)]">
        <PlanityBooking />
      </section>
    </>
  );
}
