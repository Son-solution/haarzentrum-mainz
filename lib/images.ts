/**
 * Every photo used on the website, imported statically so Next.js knows the
 * intrinsic size and can generate blur placeholders and responsive variants.
 * All files are originals supplied by Haarzentrum Mainz (public/images).
 */
import heroBlonde from "@/public/images/hero-blonde-wellen.webp";
import perueckenberatung from "@/public/images/perueckenberatung-echthaar.webp";
import topper from "@/public/images/haarteil-topper.webp";
import herrenComposite from "@/public/images/herren-haarsystem-vorher-nachher.webp";
import haarschnitt from "@/public/images/haarschnitt-praezision.webp";
import studioDamen from "@/public/images/studio-beratung-damen.webp";
import studioHerren from "@/public/images/studio-beratung-herren.webp";
import salonStyling from "@/public/images/salon-styling-wellen.webp";
import stylingWellen from "@/public/images/styling-wellen.webp";
import foehnen from "@/public/images/foehnen-styling.webp";
import herrenFade from "@/public/images/herren-haarschnitt-konturen.webp";
import flechtfrisur from "@/public/images/flechtfrisur.webp";
import straehne from "@/public/images/haarpflege-straehne.webp";
import haarfarben from "@/public/images/extensions-haarfarben.webp";
import extensions from "@/public/images/extensions-echthaar.webp";
import schaufenster from "@/public/images/perueckenstudio-schaufenster.webp";
import anpassung from "@/public/images/perucke-anpassung.webp";
import studioTeam from "@/public/images/haarzentrum-mainz-studio-team.webp";
import kundeVorherNachher from "@/public/images/kunde-vorher-nachher.webp";
import peruckeVorher from "@/public/images/vorher-nachher/perucke-vorher.webp";
import peruckeNachher from "@/public/images/vorher-nachher/perucke-nachher.webp";
import haarsystemVorher from "@/public/images/vorher-nachher/haarsystem-vorher.webp";
import haarsystemNachher from "@/public/images/vorher-nachher/haarsystem-nachher.webp";
import toupetVorher from "@/public/images/vorher-nachher/toupet-vorher.webp";
import toupetNachher from "@/public/images/vorher-nachher/toupet-nachher.webp";
import logoLight from "@/public/logos/haarzentrum-mainz-logo-hell.png";
import logoIcon from "@/public/logos/haarzentrum-mainz-icon.png";
import dizert from "@/public/logos/dizert-zertifikat-126-sgb-v.jpg";
import pDening from "@/public/logos/partner/dening-hair.svg";
import pEllenWille from "@/public/logos/partner/ellen-wille.svg";
import pBergmann from "@/public/logos/partner/bergmann.png";
import pGfh from "@/public/logos/partner/gfh.png";
import pAderans from "@/public/logos/partner/aderans.png";
import pModess from "@/public/logos/partner/modess.png";
import pExen from "@/public/logos/partner/exen-hair.svg";
import pGiselaMayer from "@/public/logos/partner/gisela-mayer.png";
import type { StaticImageData } from "next/image";

export type Photo = { src: StaticImageData; alt: string };

export const img = {
  heroBlonde: { src: heroBlonde, alt: "Frau mit glänzendem, blondem Wellenhaar im Profil" },
  perueckenberatung: { src: perueckenberatung, alt: "Frau ohne Haare hält eine hochwertige Echthaar-Perücke" },
  topper: { src: topper, alt: "Haarteil mit Clips wird am Oberkopf eingesetzt" },
  herrenComposite: { src: herrenComposite, alt: "Herren-Haarsystem: Vorher und Danach" },
  haarschnitt: { src: haarschnitt, alt: "Präziser Haarschnitt mit Kamm und Schere" },
  studioDamen: { src: studioDamen, alt: "Persönliche Perückenberatung im Studio mit Blick auf den Mainzer Dom" },
  studioHerren: { src: studioHerren, alt: "Diskrete Beratung zu Haarsystemen für Herren im Studio" },
  salonStyling: { src: salonStyling, alt: "Stylistin richtet blondes Wellenhaar" },
  stylingWellen: { src: stylingWellen, alt: "Stylistin formt Wellen im blonden Haar" },
  foehnen: { src: foehnen, alt: "Kundin beim Föhnen im Salon" },
  herrenFade: { src: herrenFade, alt: "Präziser Herrenhaarschnitt mit Konturen" },
  flechtfrisur: { src: flechtfrisur, alt: "Flechtfrisur wird gesteckt" },
  straehne: { src: straehne, alt: "Glänzende, gepflegte Haarsträhne" },
  haarfarben: { src: haarfarben, alt: "Extensions in vielen Haarfarben" },
  extensions: { src: extensions, alt: "Echthaar-Extensions in Braun" },
  schaufenster: { src: schaufenster, alt: "Perücken im Schaufenster eines Perückenstudios" },
  anpassung: { src: anpassung, alt: "Perücke wird individuell angepasst" },
  studioTeam: { src: studioTeam, alt: "Haarzentrum Mainz – Perückenstudio & Friseur: Friseur, Extensions, Perücken und Haarteile" },
  kundeVorherNachher: { src: kundeVorherNachher, alt: "Kunde vorher und nachher mit Haarsystem" },
} satisfies Record<string, Photo>;

export const beforeAfterPairs = [
  {
    label: "Perücke",
    before: { src: peruckeVorher, alt: "Vorher: Frau ohne Haare" },
    after: { src: peruckeNachher, alt: "Nachher: mit natürlicher Echthaar-Perücke" },
  },
  {
    label: "Haarsystem",
    before: { src: haarsystemVorher, alt: "Vorher: lichtes Haar am Oberkopf" },
    after: { src: haarsystemNachher, alt: "Nachher: mit Haarsystem für Herren" },
  },
  {
    label: "Toupet",
    before: { src: toupetVorher, alt: "Vorher: Glatze" },
    after: { src: toupetNachher, alt: "Nachher: mit Toupet" },
  },
];

export const logo = { light: logoLight, icon: logoIcon };

/** Quality certificate (DIZert) – required for billing medical wigs with health insurers. */
export const certificate = { src: dizert, alt: "DIZert – zertifiziert gemäß § 126 SGB V" };

/**
 * Partner brands (official logos from the partners' websites). `h` is the display height in px,
 * tuned per logo so wide wordmarks and compact emblems look optically equal.
 */
export const partners = [
  { name: "Dening Hair Company", src: pDening, h: 38, url: "https://www.dening.de/" },
  { name: "Ellen Wille – The Hair Company", src: pEllenWille, h: 26, url: "https://www.ellen-wille.de/" },
  { name: "Bergmann Haare", src: pBergmann, h: 62, url: "https://bergmann.de/" },
  { name: "gfh – Hair for Wear", src: pGfh, h: 50, url: "https://www.gfh-hair.de/" },
  { name: "Aderans", src: pAderans, h: 38, url: "https://www.aderans.de/" },
  { name: "Gisela Mayer", src: pGiselaMayer, h: 50, url: "https://www.gisela-mayer.com/" },
  { name: "Modess", src: pModess, h: 66, url: "https://modess.net/" },
  { name: "Exen Hair", src: pExen, h: 66, url: "https://exenhair.com/" },
];
