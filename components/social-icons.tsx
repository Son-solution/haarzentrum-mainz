import type { SVGProps } from "react";
import { site } from "@/lib/site";

/* Outline brand icons in the same stroke style as the Lucide icons used elsewhere
   (Lucide v1 no longer ships brand logos). */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const links = [
  { href: site.social.instagram, label: "Haarzentrum Mainz auf Instagram", Icon: InstagramIcon },
  { href: site.social.facebook, label: "Haarzentrum Mainz auf Facebook", Icon: FacebookIcon },
];

/** Round icon links to Instagram and Facebook (open in a new tab). */
export function SocialLinks({ className = "", itemClassName = "" }: { className?: string; itemClassName?: string }) {
  return (
    <ul className={`m-0 flex list-none items-center p-0 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (öffnet in neuem Tab)`}
            title={label}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${itemClassName}`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
