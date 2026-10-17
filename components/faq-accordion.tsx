"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { faqs } from "@/lib/content";
import { EASE_LUX } from "./motion";

export function FaqAccordion() {
  const [open, setOpen] = useState<number>(0);
  const base = useId();
  return (
    <div className="border-t border-charcoal/20">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;
        return (
          <div key={f.q} className="border-b border-charcoal/20">
            <h2 className="m-0 font-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent py-6 sm:gap-6 sm:py-[30px] text-left text-charcoal"
              >
                <span className="serif min-w-7 text-base italic text-graphite">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif flex-1 text-[clamp(21px,2.1vw,30px)] leading-[1.25] transition-[transform,color] duration-700 [transition-timing-function:var(--ease-lux)] group-hover:translate-x-2.5 group-hover:text-graphite">
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 flex-none sm:h-12 sm:w-12 items-center justify-center rounded-full border border-charcoal/30 text-[22px] transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:bg-charcoal group-hover:text-ivory"
                  style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                >
                  +
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_LUX }}
                >
                  <p className="m-0 max-w-[820px] pb-8 pl-11 pr-2 text-base sm:pl-[52px] sm:text-[17px] text-ink-1 sm:pr-[72px]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
