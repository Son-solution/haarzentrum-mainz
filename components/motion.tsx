"use client";

/**
 * Cinematic motion primitives (Motion for React).
 * All of them respect `prefers-reduced-motion` through <MotionProvider>
 * (reducedMotion="user" turns transform animations into instant changes).
 */
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

export const EASE_LUX = [0.19, 1, 0.22, 1] as const;
export const EASE_CURTAIN = [0.77, 0, 0.18, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type Tag = "div" | "p" | "span" | "h2" | "h3" | "li" | "ul" | "ol" | "section" | "figure";

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  id?: string;
};

/** Fade + rise when the element scrolls into view (staggered via `delay`). */
export function Reveal({ children, as = "div", className, style, delay = 0, y = 56, id }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.3, ease: EASE_LUX, delay }}
    >
      {children}
    </Comp>
  );
}

/** Fade + rise on page load (hero copy, header). */
export function FadeIn({ children, as = "div", className, style, delay = 0, y = 26, id }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: EASE_LUX, delay }}
    >
      {children}
    </Comp>
  );
}

/** Masked line-by-line headline reveal for the hero typography. */
export function LineReveal({ lines, baseDelay = 0.35, step = 0.15 }: { lines: ReactNode[]; baseDelay?: number; step?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="inline-block max-w-full [overflow-wrap:break-word]"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.6, ease: EASE_LUX, delay: baseDelay + i * step }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Dark panel that lifts away to unveil hero imagery. */
export function Curtain({ delay = 0.15, origin = "top" }: { delay?: number; origin?: "top" | "left" }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 z-[2] bg-charcoal"
      style={{ transformOrigin: origin }}
      initial={origin === "top" ? { scaleY: 1 } : { scaleX: 1 }}
      animate={origin === "top" ? { scaleY: 0 } : { scaleX: 0 }}
      transition={{ duration: 1.7, ease: EASE_CURTAIN, delay }}
    />
  );
}

/** Slow cinematic zoom-out on load. */
export function KenBurns({ children, className = "absolute inset-0", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 3.4, ease: EASE_LUX }}
    >
      {children}
    </motion.div>
  );
}

/** Clip-path image reveal when scrolled into view; optional parallax drift of the image inside. */
export function ImageReveal({
  children,
  className = "",
  style,
  parallax = false,
  hairline = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  parallax?: boolean;
  hairline?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={`frame ${hairline ? "hairline" : ""} ${className}`}
      style={style}
      initial={reduce ? false : { clipPath: "inset(20% 10% 20% 10%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.6, ease: EASE_LUX }}
    >
      {parallax ? (
        <motion.div className="absolute inset-0" style={{ y, scale: 1.14 }}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

/** Scroll-linked parallax layer for full-bleed images. */
export function Parallax({ children, className = "absolute inset-0", amount = 6 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.14 }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Hairline rule that draws itself from the left. */
export function DrawLine({ className = "", dark = true }: { className?: string; dark?: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left ${dark ? "bg-charcoal/20" : "bg-white/15"} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, ease: EASE_LUX }}
    />
  );
}

/** Large footer type that drifts horizontally with scroll. */
export function Drift({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  return (
    <motion.p ref={ref} className={className} style={{ x }}>
      {children}
    </motion.p>
  );
}

/** Statement text that brightens as it scrolls through the viewport. */
export function ScrollBrighten({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center 55%"] });
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0.14, 1]);
  return (
    <motion.p ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.p>
  );
}
