import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Curtain, FadeIn, ImageReveal, KenBurns, LineReveal, Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui";
import { img } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { districts, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return districts.map((d) => ({ stadtteil: d.slug }));
}

const find = (slug: string) => districts.find((d) => d.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ stadtteil: string }> }): Promise<Metadata> {
  const { stadtteil } = await params;
  const d = find(stadtteil);
  if (!d) return {};
  const where = d.city === "Mainz" ? d.name : `für ${d.label}`;
  return pageMeta({
    title: `Haarzentrum Mainz ${where} – Friseur für Haarschnitt & Haarverlängerung`,
    description: `Perücken, Haarteile, Zweithaar, Toupets, Haarschnitt und Haarverlängerung für Kundinnen und Kunden aus ${d.label} – im Haarzentrum Mainz, Langenbeckstraße 2. Kostenlose, diskrete Beratung.`,
    path: `/${d.slug}/`,
  });
}

const zweithaarPreise = [
  ["Rebonding", "160 €"],
  ["Weaving hochsetzen", "180 €"],
  ["Waschen + Stylen Kunsthaar", "60 €"],
  ["Waschen + Föhnen Echthaar", "75 €"],
];

export default async function DistrictPage({ params }: { params: Promise<{ stadtteil: string }> }) {
  const { stadtteil } = await params;
  const d = find(stadtteil);
  if (!d) notFound();
  const nearby = districts.filter((x) => x.city === d.city && x.slug !== d.slug);

  return (
    <>
      <section aria-label="Einleitung" className="relative flex min-h-[780px] overflow-hidden bg-charcoal text-ivory">
        <div className="frame absolute inset-0">
          <KenBurns className="absolute inset-0 opacity-55">
            <Image src={img.heroBlonde.src} alt="" fill preload sizes="100vw" className="mono object-cover object-[60%_28%]" placeholder="blur" />
          </KenBurns>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#17191C_5%,rgba(23,25,28,.35)_70%)]" />
          <Curtain />
        </div>
        <div className="wrap relative z-[3] flex w-full flex-col justify-end gap-7 pb-[72px] pt-[200px]">
          <FadeIn delay={0.35}><p className="eyebrow m-0 text-silver">Perückenstudio &amp; Friseur · {d.label}</p></FadeIn>
          <h1 className="serif m-0 text-[clamp(50px,8.4vw,136px)] font-normal leading-[0.94] tracking-[-0.025em]">
            <LineReveal lines={["Haarzentrum", <>für <em className="sheen">{d.label}</em></>]} />
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-7">
            <FadeIn as="p" delay={0.95} className="m-0 max-w-[500px] text-ivory/80">
              Perücken, Haarteile, Zweithaar, Haarschnitt &amp; Haarverlängerung – für Kundinnen und Kunden aus {d.label}, in unserem Studio in der {site.address.street}, {site.address.postalCode} {site.address.city}.
            </FadeIn>
            <FadeIn delay={1.15}><ButtonLink href="/contact/" variant="silver">Kostenlose Beratung</ButtonLink></FadeIn>
          </div>
        </div>
      </section>

      <section aria-labelledby="w-h" className="mx-auto flex max-w-[1240px] flex-col gap-[30px] px-[var(--gutter)] py-[clamp(96px,11vw,160px)]">
        <Reveal as="p" className="eyebrow m-0 text-graphite">Willkommen</Reveal>
        <Reveal as="h2" className="serif m-0 text-[clamp(36px,4.2vw,64px)] font-normal leading-[1.08] tracking-[-0.01em] [text-wrap:balance]">
          <span id="w-h">Spezialisiert auf individuelle Lösungen bei Haarausfall – <em className="text-graphite">krankheitsbedingt, hormonell oder genetisch.</em></span>
        </Reveal>
        <Reveal as="p" delay={0.1} className="m-0 max-w-[760px] text-lg text-ink-1">
          Wir begleiten Sie persönlich – von der ersten Beratung über die Auswahl bis hin zur optimalen Anpassung. Selbstverständlich unterstützen wir Sie auch bei der Abrechnung mit Ihrer Krankenkasse.
        </Reveal>
      </section>

      <section aria-label="Leistungen" className="bg-mist">
        <div className="wrap section-y grid gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          {[
            { n: "01", t: <>Medizinische Perücken &amp; Zweithaar</>, d: "Individuell angepasste medizinische Perücken und Haarteile für Damen und Herren.", photo: img.perueckenberatung, pos: "50% 25%" },
            { n: "02", t: <>Haarteile &amp; Haarsysteme für Herren</>, d: "Moderne Haarsysteme und Toupets – diskret und professionell.", photo: img.kundeVorherNachher, pos: "50% 40%" },
          ].map((c, i) => (
            <Link key={c.n} href="/" className="card flex flex-col gap-[22px] no-underline">
              <ImageReveal className="aspect-[4/3]">
                <div className="zoom absolute inset-0">
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(max-width: 900px) 100vw, 45vw" className="object-cover" style={{ objectPosition: c.pos }} placeholder="blur" />
                </div>
              </ImageReveal>
              <Reveal as="span" delay={i * 0.1} className="serif italic text-graphite">{c.n}</Reveal>
              <Reveal as="h3" delay={i * 0.1} className="serif m-0 text-[clamp(30px,3vw,46px)] font-normal leading-[1.06]">{c.t}</Reveal>
              <Reveal as="p" delay={i * 0.1 + 0.05} className="m-0 text-ink-2">{c.d}</Reveal>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="p-h" className="wrap section-y grid gap-x-[120px] gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
        <div className="flex flex-col gap-[26px]">
          <Reveal as="h2" className="serif m-0 text-[clamp(44px,5.4vw,88px)] font-normal leading-[0.98] tracking-[-0.02em]">
            <span id="p-h">Zweithaar<br /><em>Preisliste</em></span>
          </Reveal>
          <Reveal delay={0.1}><ButtonLink href="/preislist/" variant="dark">Alle Preise</ButtonLink></Reveal>
        </div>
        <Reveal delay={0.1}>
          <dl className="m-0">
            {zweithaarPreise.map(([n, p]) => (
              <div key={n} className="price-row flex items-baseline gap-4 border-b border-charcoal/16 py-[22px]">
                <dt className="serif flex-1 text-2xl">{n}</dt>
                <dd className="serif m-0 text-[26px]">{p}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {nearby.length > 0 && (
        <nav aria-label={`Weitere Stadtteile in ${d.city}`} className="border-t border-charcoal/12">
          <div className="wrap py-14">
            <p className="eyebrow m-0 mb-4 text-graphite">Auch für {d.city}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
              {nearby.map((x) => (
                <li key={x.slug}><Link href={`/${x.slug}/`} className="dist text-ink-3">{x.label}</Link></li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
