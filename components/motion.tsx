"use client";

/**
 * Cinematic motion primitives (Motion for React).
 * All of them respect `prefers-reduced-motion` through <MotionProvider>
 * (reducedMotion="user" turns transform animations into instant changes);
 * the scroll-replay primitives below additionally drop all movement themselves.
 *
 * Scroll replay: Reveal, FadeIn, LineReveal, ImageReveal and DrawLine animate every time
 * they enter the viewport – in both scroll directions. Scrolling down, content rises in from
 * below; scrolling up, it drops in from above. Leaving the viewport hides it again.
 */
import {
  MotionConfig,
  animate as animateEl,
  motion,
  stagger,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export const EASE_LUX = [0.19, 1, 0.22, 1] as const;
export const EASE_CURTAIN = [0.77, 0, 0.18, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* Current scroll direction (1 = down, -1 = up), shared by all replay animations. */
let scrollDir: 1 | -1 = 1;
if (typeof window !== "undefined") {
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y !== lastY) scrollDir = y > lastY ? 1 : -1;
      lastY = y;
    },
    { passive: true },
  );
}

/**
 * Replay bookkeeping kept in a ref per element: `hidden` is true once the leave animation finished
 * (so the next entrance starts from the correct side), `entered` counts entrances (page-load delays
 * only apply to the first one), `token` discards stale leave callbacks.
 */
const replayInit = () => ({ hidden: true, entered: 0, token: 0 });

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

/** Fade + rise into view; replays in both scroll directions. `firstDelayOnly` keeps later entrances snappy. */
function ReplayReveal({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  y = 56,
  id,
  duration,
  firstDelayOnly,
}: RevealProps & { duration: number; firstDelayOnly: boolean }) {
  const Comp = motion[as] as typeof motion.div;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  // Margin instead of a visibility ratio, so very tall blocks (price lists, legal text) still trigger.
  const inView = useInView(scope, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const st = useRef(replayInit());

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const s = st.current;
    const token = ++s.token;
    const dist = reduce ? 0 : y;
    if (inView) {
      const d = firstDelayOnly && s.entered > 0 ? Math.min(delay, 0.15) : delay;
      s.entered++;
      const from = s.hidden ? { opacity: [0, 1], y: [scrollDir * dist, 0] } : { opacity: 1, y: 0 };
      s.hidden = false;
      animate(el, from, { duration: reduce ? 0.3 : duration, ease: EASE_LUX, delay: d });
    } else if (s.entered > 0) {
      animate(el, { opacity: 0, y: -scrollDir * dist * 0.4 }, { duration: 0.45, ease: "easeOut" }).then(() => {
        if (st.current.token === token) st.current.hidden = true;
      });
    }
  }, [inView, animate, scope, st, delay, y, reduce, duration, firstDelayOnly]);

  return (
    <Comp ref={scope} id={id} className={className} style={{ ...style, opacity: 0 }}>
      {children}
    </Comp>
  );
}

/** Fade + rise when the element scrolls into view (staggered via `delay`) – replays on every pass. */
export function Reveal(props: RevealProps) {
  return <ReplayReveal {...props} duration={1.3} firstDelayOnly={false} />;
}

/** Fade + rise for hero copy: delayed on page load, replays when scrolled back into view. */
export function FadeIn({ y = 26, ...props }: RevealProps) {
  return <ReplayReveal {...props} y={y} duration={1.5} firstDelayOnly />;
}

/** Masked line-by-line headline reveal; replays in both scroll directions. */
export function LineReveal({ lines, baseDelay = 0.35, step = 0.15 }: { lines: ReactNode[]; baseDelay?: number; step?: number }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const inView = useInView(scope, { amount: 0.2 });
  const reduce = useReducedMotion();
  const st = useRef(replayInit());

  useEffect(() => {
    if (!scope.current) return;
    const s = st.current;
    const token = ++s.token;
    if (reduce) {
      animate(".lr-line", { y: "0%" }, { duration: 0 });
      return;
    }
    if (inView) {
      const start = s.entered > 0 ? 0.05 : baseDelay;
      s.entered++;
      const from = s.hidden ? { y: [`${scrollDir * 112}%`, "0%"] } : { y: "0%" };
      s.hidden = false;
      animate(".lr-line", from, { duration: 1.6, ease: EASE_LUX, delay: stagger(step, { startDelay: start }) });
    } else if (s.entered > 0) {
      animate(".lr-line", { y: `${-scrollDir * 112}%` }, { duration: 0.5, ease: "easeIn" }).then(() => {
        if (st.current.token === token) st.current.hidden = true;
      });
    }
  }, [inView, animate, scope, st, baseDelay, step, reduce]);

  return (
    <span ref={scope} className="block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span className="lr-line inline-block max-w-full [overflow-wrap:break-word]" style={{ transform: "translateY(112%)" }}>
            {line}
          </span>
        </span>
      ))}
    </span>
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

const CLIP_HIDDEN = "inset(20% 10% 20% 10%)";
const CLIP_SHOWN = "inset(0% 0% 0% 0%)";

/** Clip-path image reveal on every pass through the viewport; optional parallax drift of the image inside. */
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
  const [scope, animate] = useAnimate<HTMLDivElement>();
  // Margin-based: Chrome measures a clipped target by its visible clip area, so a ratio threshold
  // would fire late (or not at all) while the image is still clipped.
  const inView = useInView(scope, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const st = useRef(replayInit());
  const { scrollYProgress } = useScroll({ target: scope, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const s = st.current;
    const token = ++s.token;
    if (reduce) {
      animate(el, { clipPath: CLIP_SHOWN }, { duration: 0 });
      return;
    }
    if (inView) {
      s.entered++;
      s.hidden = false;
      animate(el, { clipPath: CLIP_SHOWN }, { duration: 1.6, ease: EASE_LUX });
    } else if (s.entered > 0) {
      animate(el, { clipPath: CLIP_HIDDEN }, { duration: 0.6, ease: "easeIn" }).then(() => {
        if (st.current.token === token) st.current.hidden = true;
      });
    }
  }, [inView, animate, scope, st, reduce]);

  return (
    <div ref={scope} className={`frame ${hairline ? "hairline" : ""} ${className}`} style={{ ...style, clipPath: CLIP_HIDDEN }}>
      {parallax ? (
        <motion.div className="absolute inset-0" style={{ y, scale: 1.14 }}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </div>
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

/** Hairline rule that draws itself from the left (scrolling down) or right (scrolling up) on every pass. */
export function DrawLine({ className = "", dark = true }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      animateEl(el, { scaleX: 1 }, { duration: 0 });
      return;
    }
    el.style.transformOrigin = scrollDir > 0 ? "left" : "right";
    animateEl(el, { scaleX: inView ? 1 : 0 }, { duration: inView ? 1.4 : 0.5, ease: EASE_LUX });
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`h-px ${dark ? "bg-charcoal/20" : "bg-white/15"} ${className}`}
      style={{ transform: "scaleX(0)", transformOrigin: "left" }}
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
