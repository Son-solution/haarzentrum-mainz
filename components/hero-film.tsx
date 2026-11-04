"use client";

/**
 * Hero studio film: a muted, looping background video plus a "Studio-Film" control that opens
 * the full film with sound in a native <dialog> (Escape, focus trap and backdrop for free).
 * The loop only plays while visible and never autoplays for `prefers-reduced-motion` users.
 */
import { Pause, Play, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { KenBurns } from "@/components/motion";

const LOOP = "/videos/studio-loop.mp4";
const FILM = "/videos/studio-film.mp4";
const POSTER = "/videos/studio-poster.webp";

export function HeroFilm() {
  const loopRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  // null = no explicit choice yet: reduced-motion users start paused, everyone else playing.
  const [paused, setPaused] = useState<boolean | null>(null);
  const stopped = paused ?? !!reduce;
  const [open, setOpen] = useState(false);

  // Start/stop the loop with visibility; respects the user's pause choice and reduced motion.
  useEffect(() => {
    const v = loopRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !stopped && !open) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [stopped, open]);

  const openFilm = () => {
    setOpen(true);
    dialogRef.current?.showModal();
    filmRef.current?.play().catch(() => {});
  };
  const closeFilm = () => dialogRef.current?.close();

  return (
    <>
      <KenBurns>
        <video
          ref={loopRef}
          src={LOOP}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
        />
      </KenBurns>

      {/* Controls sit above the hero copy layer (z-3) so they stay clickable. */}
      <div className="absolute right-[clamp(16px,4vw,56px)] top-[clamp(108px,11vw,150px)] z-[4] flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPaused(!stopped)}
          aria-label={stopped ? "Hintergrundvideo abspielen" : "Hintergrundvideo pausieren"}
          className="grid size-10 place-items-center rounded-full border border-white/25 bg-charcoal/30 text-ivory/80 backdrop-blur-md transition-colors hover:border-white/60 hover:text-ivory"
        >
          {stopped ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
        </button>
        <button
          type="button"
          onClick={openFilm}
          aria-haspopup="dialog"
          className="group flex items-center gap-4 rounded-full border border-white/25 bg-charcoal/30 py-1.5 pl-1.5 pr-6 text-ivory backdrop-blur-md transition-colors hover:border-white/60"
        >
          <span className="relative grid size-12 place-items-center rounded-full bg-ivory text-charcoal transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover:scale-110">
            <span aria-hidden="true" className="film-pulse absolute inset-0 rounded-full border border-ivory/60" />
            <Play size={16} strokeWidth={1.5} className="translate-x-px fill-charcoal" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="eyebrow text-[10px] text-silver">Studio-Film</span>
            <span className="serif text-lg italic">Einblick · 0:30</span>
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Studio-Film Haarzentrum Mainz"
        onClose={() => {
          setOpen(false);
          filmRef.current?.pause();
        }}
        onClick={(e) => e.target === e.currentTarget && closeFilm()}
        className="film-dialog m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-deep/90 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-[9/16] w-[min(92vw,calc(min(88svh,1100px)*9/16))]">
          <video
            ref={filmRef}
            src={FILM}
            poster={POSTER}
            controls
            playsInline
            preload="none"
            className="h-full w-full rounded-[18px] bg-deep object-contain shadow-[0_40px_120px_rgba(0,0,0,.6)]"
          />
          <button
            type="button"
            onClick={closeFilm}
            aria-label="Film schließen"
            className="absolute -right-3 -top-3 grid size-11 place-items-center rounded-full bg-ivory text-charcoal shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform hover:scale-105 sm:-right-14 sm:top-0"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </dialog>
    </>
  );
}
