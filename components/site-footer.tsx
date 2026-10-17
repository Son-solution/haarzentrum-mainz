import Image from "next/image";
import Link from "next/link";
import { logo } from "@/lib/images";
import { districtCities, districts, mainNav, site } from "@/lib/site";
import { Drift } from "./motion";
import { ButtonLink } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-ivory">
      <div className="wrap flex flex-col gap-[72px] pb-10 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-8 overflow-hidden max-lg:flex-col max-lg:items-stretch border-b border-white/12 pb-14">
          <Drift className="serif m-0 whitespace-nowrap text-[clamp(40px,11vw,176px)] leading-[0.9] tracking-[-0.03em]">
            Gönn dir <em className="text-silver">was.</em>
          </Drift>
          <ButtonLink href={site.bookingUrl} variant="silver">Termin buchen</ButtonLink>
        </div>

        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
          <div className="flex flex-col gap-2.5">
            <Image src={logo.light} alt="Haarzentrum Mainz" className="mb-2.5 h-[42px] w-auto self-start" sizes="300px" />
            <address className="not-italic text-ivory/78">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
          </div>
          <div className="flex flex-col gap-2.5">
            <h2 className="eyebrow m-0 text-silver">Öffnungszeiten</h2>
            <p className="m-0 text-ivory/78">
              {site.hours.label}
              <br />
              {site.hours.closed}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <h2 className="eyebrow m-0 text-silver">Kontakt</h2>
            <a className="dist text-ivory/78" href={site.phoneHref}>{site.phone}</a>
            <a className="dist text-ivory/78" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="dist text-ivory/78" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
              Online-Termin (Planity) ↗
            </a>
          </div>
          <nav aria-label="Seiten" className="flex flex-col gap-1.5">
            <h2 className="eyebrow m-0 mb-1 text-silver">Seiten</h2>
            {mainNav.map((n) => (
              <Link key={n.href} className="dist text-ivory/78" href={n.href}>{n.label}</Link>
            ))}
          </nav>
        </div>

        <nav
          aria-label="Stadtteile"
          className="grid gap-8 border-t border-white/12 pt-10 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]"
        >
          {districtCities.map((city) => (
            <div key={city}>
              <h2 className="eyebrow m-0 text-ivory/55">{city}</h2>
              <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[13px]">
                {districts
                  .filter((d) => d.city === city)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link className="dist text-ivory/70" href={`/${d.slug}/`}>{d.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-wrap justify-between gap-4 text-xs max-sm:flex-col max-sm:items-center max-sm:text-center tracking-[0.06em] text-ivory/55">
          <span>© {site.name}. Alle Rechte vorbehalten {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <Link className="dist" href="/impressum/">Impressum</Link>
            <Link className="dist" href="/datenschutzerklarung/">Datenschutzerklärung</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
