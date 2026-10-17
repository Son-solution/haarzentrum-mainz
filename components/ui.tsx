import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "silver" | "ghost-light" | "dark";

const variantClass: Record<Variant, string> = {
  silver: "btn btn-silver",
  "ghost-light": "btn btn-ghost-light",
  dark: "btn btn-dark",
};

/** Luxury pill button with fill-sweep hover. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "dark",
  children,
  arrow = true,
  className = "",
  style,
  ariaLabel,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const special = /^(tel:|mailto:)/.test(href);
  const content = (
    <>
      {children}
      {arrow && (
        <span className="arr" aria-hidden="true">
          {external ? "↗" : "→"}
        </span>
      )}
    </>
  );
  const cls = `${variantClass[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (special) {
    return (
      <a href={href} className={cls} style={style} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Underlined uppercase text link. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`tlink ${className}`}>
      {children} <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}

export function Eyebrow({ children, className = "", as: Tag = "p" }: { children: ReactNode; className?: string; as?: "p" | "span" | "h1" | "h2" }) {
  return <Tag className={`eyebrow m-0 ${className}`}>{children}</Tag>;
}
