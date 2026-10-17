import Image from "next/image";
import { partners } from "@/lib/images";
import { Reveal } from "./motion";

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-row m-0 flex list-none items-center p-0" aria-hidden={hidden || undefined}>
      {partners.map((p) => (
        <li key={p.name} className="flex h-[72px] w-[150px] flex-none items-center justify-center px-4 sm:w-[200px] sm:px-6">
          <Image
            src={p.src}
            alt={hidden ? "" : p.name}
            sizes="200px"
            className="partner-logo w-auto max-w-full object-contain"
            style={{ height: p.h }}
          />
        </li>
      ))}
    </ul>
  );
}

/** Endless, monochrome partner-logo slider (pauses on hover, static grid with reduced motion). */
export function Partners() {
  return (
    <section aria-labelledby="partner-h" className="border-t border-charcoal/12 py-[clamp(64px,8vw,112px)]">
      <div className="wrap mb-[clamp(36px,5vw,64px)] flex flex-col items-center gap-4 text-center">
        <Reveal as="p" className="eyebrow m-0 text-graphite">Unsere Partner</Reveal>
        <Reveal as="h2" className="serif m-0 text-[clamp(32px,4.4vw,64px)] font-normal leading-[1.04] tracking-[-0.015em]">
          <span id="partner-h">Marken, denen wir <em className="text-graphite">vertrauen.</em></span>
        </Reveal>
      </div>
      <Reveal delay={0.1} y={24} className="logo-slider">
        <div className="logo-track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </Reveal>
    </section>
  );
}
