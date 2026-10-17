/**
 * Business facts taken from the existing website (haarzentrum-mainz.de).
 * Do not add information here that is not verified by the business.
 */
export const site = {
  name: "Haarzentrum Mainz",
  tagline: "Perückenstudio & Friseur",
  url: "https://haarzentrum-mainz.de",
  owner: "Amela Bosnic",
  vatId: "72601964659",
  phone: "+49 172 9394433",
  phoneHref: "tel:+491729394433",
  email: "info@haarzentrum-mainz.de",
  address: {
    street: "Langenbeckstraße 2",
    postalCode: "55131",
    city: "Mainz",
    country: "DE",
  },
  hours: {
    label: "Mo–Fr 09:30–18:00",
    closed: "Sa–So geschlossen",
  },
  /** Online booking used by the existing site ("Termin Buchen" menu item). */
  bookingUrl: "https://www.planity.com/de-DE/haarzentrum-mainz-55131",
  social: {
    instagram: "https://www.instagram.com/haarzentrummainz/",
    facebook: "https://www.facebook.com/share/1ExUtTQDHo/",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Langenbeckstra%C3%9Fe+2+55131+Mainz",
} as const;

export const mainNav = [
  { href: "/", label: "Perücken" },
  { href: "/haarschnitt/", label: "Friseur" },
  { href: "/preislist/", label: "Preisliste" },
  { href: "/about/", label: "Über uns" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Kontakt" },
] as const;

export type District = { slug: string; city: string; name: string; label: string };

const mk = (city: string, prefix: string, entries: [string, string][]): District[] =>
  entries.map(([slug, name]) => ({ slug: `${prefix}-${slug}`, city, name, label: `${city}-${name}` }));

/** All district landing pages that exist on the current website (page-sitemap.xml). */
export const districts: District[] = [
  ...mk("Mainz", "mainz", [
    ["altstadt", "Altstadt"], ["mombach", "Mombach"], ["gonsenheim", "Gonsenheim"],
    ["hechtsheim", "Hechtsheim"], ["bretzenheim", "Bretzenheim"], ["finthen", "Finthen"],
    ["drais", "Drais"], ["marienborn", "Marienborn"], ["lerchenberg", "Lerchenberg"],
    ["hartenberg", "Hartenberg"], ["munchfeld", "Münchfeld"], ["neustadt", "Neustadt"],
    ["oberstadt", "Oberstadt"], ["weisenau", "Weisenau"], ["laubenheim", "Laubenheim"],
    ["zahlbach", "Zahlbach"], ["ebersheim", "Ebersheim"],
  ]),
  ...mk("Wiesbaden", "wiesbaden", [
    ["mitte", "Mitte"], ["biebrich", "Biebrich"], ["erbenheim", "Erbenheim"],
    ["klarenthal", "Klarenthal"], ["nordenstadt", "Nordenstadt"], ["sonnenberg", "Sonnenberg"],
    ["bierstadt", "Bierstadt"], ["dotzheim", "Dotzheim"], ["delkenheim", "Delkenheim"],
    ["kastel", "Kastel"], ["kostheim", "Kostheim"], ["schierstein", "Schierstein"],
    ["igstadt", "Igstadt"], ["auringen", "Auringen"], ["medenbach", "Medenbach"],
    ["rambach", "Rambach"],
  ]),
  ...mk("Frankfurt", "frankfurt", [
    ["seckbach", "Seckbach"], ["bergen-enkheim", "Bergen-Enkheim"],
  ]),
];

export const districtCities = ["Mainz", "Wiesbaden", "Frankfurt"] as const;
