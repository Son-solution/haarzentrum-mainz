"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/lib/content";
import { EASE_LUX } from "./motion";

export function Testimonials() {
  const [q, setQ] = useState(0);
  const n = testimonials.length;
  const t = testimonials[q];
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="grid min-h-[260px] w-full max-w-[1060px] place-items-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={q}
            className="m-0 flex flex-col justify-center gap-[30px]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.9, ease: EASE_LUX }}
          >
            <blockquote className="serif m-0 text-[clamp(32px,4.4vw,66px)] leading-[1.12] tracking-[-0.01em] [text-wrap:balance]">
              <span className="text-silver">„</span>
              {t.text}
              <span className="text-silver">“</span>
            </blockquote>
            <figcaption className="eyebrow text-ink-3">{t.name}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-[18px]">
        <button
          type="button"
          onClick={() => setQ((q + n - 1) % n)}
          aria-label="Vorherige Bewertung"
          className="h-[52px] w-[52px] cursor-pointer rounded-full border border-charcoal/30 bg-transparent text-lg text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-ivory"
        >
          ←
        </button>
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setQ(i)}
            aria-label={`Bewertung ${i + 1}`}
            aria-current={i === q}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent"
          >
            <span
              className="block h-0.5 bg-charcoal transition-all duration-700"
              style={{ width: i === q ? 36 : 14, opacity: i === q ? 1 : 0.35 }}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setQ((q + 1) % n)}
          aria-label="Nächste Bewertung"
          className="h-[52px] w-[52px] cursor-pointer rounded-full border border-charcoal/30 bg-transparent text-lg text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-ivory"
        >
          →
        </button>
      </div>
    </div>
  );
}
