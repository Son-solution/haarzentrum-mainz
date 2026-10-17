"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { priceCategories, priceGroups } from "@/lib/content";
import { EASE_LUX, Reveal } from "./motion";

export function PriceList() {
  const [cat, setCat] = useState<(typeof priceCategories)[number]>("Alle");
  const groups = priceGroups.filter((g) => cat === "Alle" || g.cat === cat);
  return (
    <div>
      <div role="group" aria-label="Kategorie filtern" className="mb-[clamp(48px,6vw,80px)] flex flex-wrap gap-2.5 max-lg:justify-center">
        {priceCategories.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setCat(c)}
              className={`min-h-[46px] cursor-pointer rounded-full border px-[22px] text-xs uppercase tracking-[0.18em] transition-colors duration-500 ${
                on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-[clamp(56px,7vw,96px)]">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g) => (
            <motion.section
              key={g.title}
              layout
              aria-label={g.title}
              className="flex flex-wrap gap-x-16 gap-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
              transition={{ duration: 0.9, ease: EASE_LUX }}
            >
              <Reveal className="flex flex-[1_1_260px] flex-col gap-2.5">
                <span className="eyebrow text-graphite">{g.cat}</span>
                <h2 className="serif m-0 text-[clamp(32px,3.4vw,50px)] font-normal leading-[1.04]">{g.title}</h2>
                {g.note && <span className="text-sm text-graphite">{g.note}</span>}
              </Reveal>
              <Reveal delay={0.08} className="min-w-0 flex-[999_1_520px]">
              <dl className="m-0">
                {g.items.map((it) => (
                  <div key={it.n} className="price-row flex items-baseline gap-5 border-b border-charcoal/16 py-5">
                    <dt className="min-w-0 flex-1">
                      <span className="serif block text-[20px] leading-[1.25] sm:text-[23px]">{it.n}</span>
                      {it.d && <span className="text-sm text-graphite">{it.d}</span>}
                    </dt>
                    <dd className="serif m-0 whitespace-nowrap text-right text-[20px] sm:text-[23px]">{it.p}</dd>
                  </div>
                ))}
              </dl>
              </Reveal>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
