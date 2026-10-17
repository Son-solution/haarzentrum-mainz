"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { beforeAfterPairs } from "@/lib/images";
import { EASE_LUX } from "./motion";

/** Interactive before/after comparison: drag, click, touch or use the arrow keys. */
export function BeforeAfter() {
  const [pair, setPair] = useState(0);
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const current = beforeAfterPairs[pair];

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div role="group" aria-label="Beispiel wählen" className="mb-8 flex flex-wrap justify-center gap-2.5">
        {beforeAfterPairs.map((p, i) => {
          const on = i === pair;
          return (
            <button
              key={p.label}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setPair(i);
                setPos(50);
              }}
              className={`min-h-[46px] cursor-pointer rounded-full border px-[22px] text-xs uppercase tracking-[0.18em] transition-colors duration-500 ${
                on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div
        ref={frame}
        className="frame hairline relative mx-auto aspect-[3/4] max-w-[600px] cursor-ew-resize touch-pan-y select-none bg-black"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.label}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUX }}
          >
            <Image src={current.after.src} alt={current.after.alt} fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover object-[50%_30%]" placeholder="blur" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image src={current.before.src} alt={current.before.alt} fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover object-[50%_30%]" placeholder="blur" />
            </div>
          </motion.div>
        </AnimatePresence>

        <span className="eyebrow pointer-events-none absolute left-[22px] top-[22px] z-[4] text-white">Vorher</span>
        <span className="eyebrow pointer-events-none absolute right-[22px] top-[22px] z-[4] text-white">Nachher</span>

        <div className="pointer-events-none absolute inset-y-0 z-[4] w-px bg-ivory" style={{ left: `${pos}%` }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Vorher-Nachher-Vergleich"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)} % Vorher sichtbar`}
            onKeyDown={onKey}
            className="pointer-events-auto absolute left-[-30px] top-1/2 -mt-[30px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ivory text-sm text-charcoal shadow-[0_10px_40px_rgba(0,0,0,.25)] transition-transform duration-500 hover:scale-110"
          >
            <span aria-hidden="true">‹ ›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
