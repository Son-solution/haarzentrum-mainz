"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { logo } from "@/lib/images";
import { mainNav, site } from "@/lib/site";
import { EASE_CURTAIN, EASE_LUX } from "./motion";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = openBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#inhalt" className="sr-only-focusable fixed left-4 top-4 z-[80] rounded-full bg-ivory px-5 py-3 text-sm text-charcoal">
        Zum Inhalt springen
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-ivory"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE_LUX, delay: 1.0 }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-charcoal/85 backdrop-blur-md transition-opacity duration-700"
          style={{ opacity: solid ? 1 : 0, borderBottom: "1px solid rgba(255,255,255,.08)" }}
        />
        <div
          className="wrap flex items-center justify-between gap-6 transition-[padding] duration-700"
          style={{ paddingBlock: solid ? 14 : 26, transitionTimingFunction: "var(--ease-lux)" }}
        >
          <Link href="/" aria-label="Haarzentrum Mainz – Startseite" className="block shrink-0">
            <Image
              src={logo.light}
              alt="Haarzentrum Mainz – Perückenstudio & Friseur"
              className="h-[clamp(34px,3.4vw,48px)] w-auto"
              sizes="320px"
              loading="eager"
            />
          </Link>
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-[34px] min-[1061px]:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3.5">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light btn-keep hidden min-[621px]:inline-flex"
              style={{ minHeight: 46, padding: "0 24px" }}
            >
              Termin buchen
            </a>
            <button
              ref={openBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menü öffnen"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-transparent text-ivory transition-colors duration-500 hover:bg-white/10 min-[1061px]:hidden"
            >
              <Menu size={20} strokeWidth={1.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-charcoal text-ivory"
            style={{ padding: "26px var(--gutter) 40px" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE_CURTAIN }}
          >
            <div className="flex items-center justify-between">
              <Image src={logo.light} alt="Haarzentrum Mainz" className="h-[38px] w-auto" sizes="260px" />
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-transparent text-ivory"
              >
                <X size={18} strokeWidth={1.2} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile Navigation" className="mt-10 flex flex-col gap-1.5 sm:mt-14">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
                  transition={{ duration: 1, ease: EASE_LUX, delay: 0.3 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`serif block text-[clamp(38px,9vw,64px)] leading-[1.15] no-underline ${
                      i === mainNav.length - 1 ? "italic text-silver" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-6 pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-silver self-start">
                Termin online buchen <span className="arr" aria-hidden="true">↗</span>
              </a>
              <div className="flex flex-wrap gap-x-12 gap-y-5 text-sm text-ivory/75 max-sm:flex-col max-sm:items-center max-sm:gap-y-2 max-sm:text-center">
                <a href={site.phoneHref} className="no-underline">{site.phone}</a>
                <span>{site.address.street}, {site.address.postalCode} {site.address.city}</span>
                <span>{site.hours.label}</span>
              </div>
              <div className="flex gap-8 text-sm text-ivory/75 max-sm:justify-center">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="no-underline">Instagram ↗</a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="no-underline">Facebook ↗</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
