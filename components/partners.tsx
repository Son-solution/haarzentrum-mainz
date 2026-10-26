import Image from "next/image";
import { partners } from "@/lib/images";
import { MarqueeTrack, Reveal } from "./motion";

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-row m-0 flex list-none items-center p-0" aria-hidden={hidden || undefined}>
      {partners.map((p) => (
        <li key={p.name} className="flex-none">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            aria-label={`${p.name} – Website öffnen (neuer Tab)`}
            title={p.name}
            className="flex h-[72px] w-[150px] items-center justify-center px-4 sm:w-[200px] sm:px-6"
          >
            <Image
              src={p.src}
              alt=""
              sizes="200px"
              className="partner-logo w-auto max-w-full object-contain"
              style={{ height: p.h }}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Endless, monochrome partner-logo slider (pauses on hover, static grid with reduced motion). */
export function Partners() {
  return (
    <section aria-label="Unsere Partner" className="border-b border-charcoal/12 py-[clamp(20px,2.5vw,32px)]">
      <Reveal delay={0.1} y={24} className="logo-slider">
        <MarqueeTrack className="logo-track">
          <LogoRow />
          <LogoRow hidden />
        </MarqueeTrack>
      </Reveal>
    </section>
  );
}
