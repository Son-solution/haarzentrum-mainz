import Image from "next/image";
import { marqueeWords } from "@/lib/content";
import { logo } from "@/lib/images";

/** Endless italic service band beneath the hero. */
export function Marquee() {
  const row = marqueeWords.flatMap((w) => [w, "✦"]);
  return (
    <div aria-hidden="true" className="overflow-hidden border-t border-white/8 bg-charcoal py-[26px] text-silver">
      <div className="marquee serif gap-14 whitespace-nowrap text-[clamp(26px,3vw,40px)] italic">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={w === "✦" ? "not-italic text-white/50" : ""}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/** Rotating "Kostenlose Beratung" badge with the gold brand icon at its centre. */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-[132px] w-[132px] ${className}`} aria-hidden="true">
      <svg className="spin h-full w-full text-charcoal" viewBox="0 0 200 200">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="#F7F7F5" />
        <text fontSize="13.5" letterSpacing="4.6" fill="currentColor" style={{ textTransform: "uppercase", fontFamily: "var(--font-hanken)" }}>
          <textPath href="#badge-circle">Kostenlose Beratung · Diskret · Persönlich ·</textPath>
        </text>
      </svg>
      <Image src={logo.icon} alt="" className="absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2" sizes="60px" />
    </div>
  );
}
