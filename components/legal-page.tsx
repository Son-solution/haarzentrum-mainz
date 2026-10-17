import type { ReactNode } from "react";
import { FadeIn, LineReveal } from "./motion";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <>
      <section aria-label="Einleitung" className="bg-charcoal text-ivory">
        <div className="wrap flex flex-col gap-7 pb-[clamp(48px,7vw,72px)] pt-[clamp(128px,18vw,200px)]">
          <FadeIn delay={0.35}><p className="eyebrow m-0 text-silver">{eyebrow}</p></FadeIn>
          <h1 className="serif m-0 text-[clamp(34px,8vw,112px)] [hyphens:auto] font-normal leading-[0.96] tracking-[-0.02em]">
            <LineReveal lines={[title]} />
          </h1>
        </div>
      </section>
      <article className="mx-auto max-w-[860px] px-[var(--gutter)] py-[clamp(72px,9vw,120px)] text-ink-1 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-serif [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-[24px] sm:[&_h2]:text-[30px] [&_h2]:font-normal [&_h2]:text-charcoal [&_p]:my-3">
        {children}
      </article>
    </>
  );
}
