/** German website content, carried over from haarzentrum-mainz.de. */

export const specials = [
  "Medizinische Perücken & Zweithaarlösungen für Damen und Herren",
  "Zertifiziertes Zweithaarstudio mit fachgerechter Versorgung",
  "Direkte Abrechnung mit gesetzlichen und privaten Krankenkassen",
  "Individuelle, diskrete und professionelle Fachberatung",
  "Maßgeschneiderte Toupees & Haarteile für Herren",
  "Hair Weaving / Haarintegration für natürliches Volumen",
  "Skin Bonding mit modernen Befestigungssystemen",
  "Natürliche Optik, hoher Tragekomfort & sicherer Halt",
];

export const testimonials = [
  { text: "Ich bin begeistert von meinem neuen Look!", name: "Laura Schmidt" },
  {
    text: "Die Haarverlängerungen sind einfach traumhaft! Nie zuvor habe ich so eine tolle Qualität erlebt.",
    name: "Julia Meier",
  },
  { text: "Ein wunderbarer Salon mit einem freundlichen Team.", name: "Markus Becker" },
];

export const faqs = [
  {
    q: "Welche Dienstleistungen bietet Haarzentrum Mainz an?",
    a: "Wir bieten Haarschnitte, Styling, Haarverlängerungen und persönliche Beratung – sowie Perücken, Haarteile und Zweithaarlösungen für Damen und Herren.",
  },
  {
    q: "Sind Haarverlängerungen für alle Haartypen geeignet?",
    a: "In den meisten Fällen ja. In einer Beratung klären wir, welche Methode am besten zu Ihrer Haarstruktur passt.",
  },
  {
    q: "Wie lange halten Haarverlängerungen und wie werden sie gepflegt?",
    a: "Die Haltbarkeit von Extensions liegt in der Regel zwischen 2 und 6 Monaten, abhängig von der Methode und Pflege. Sie erhalten von uns individuelle Pflegehinweise.",
  },
  {
    q: "Brauche ich einen Termin oder kann ich spontan vorbeikommen?",
    a: "Wir empfehlen, vorab einen Termin zu vereinbaren, um Wartezeiten zu vermeiden und eine optimale Betreuung sicherzustellen. Kurzfristige Termine sind je nach Auslastung möglich.",
  },
  {
    q: "Wie lange dauert eine Haarverlängerung oder ein Styling-Termin?",
    a: "Ein Styling dauert etwa 30 bis 90 Minuten, eine Haarverlängerung etwa 2 bis 4 Stunden.",
  },
  {
    q: "Werden individuelle Beratungen vor der Behandlung angeboten?",
    a: "Ja, eine persönliche Beratung gehört selbstverständlich zu unserem Angebot.",
  },
];

export type PriceItem = { n: string; d?: string; p: string };
export type PriceGroup = { cat: "Zweithaar" | "Damen" | "Herren" | "Kosmetik"; title: string; note?: string; items: PriceItem[] };

export const priceGroups: PriceGroup[] = [
  {
    cat: "Zweithaar", title: "Toupet / Haarteil Service", note: "Zweithaar Preisliste",
    items: [
      { n: "Rebonding", d: "inkl. Reinigung & neu verkleben", p: "160 €" },
      { n: "Weaving hochsetzen", d: "inklusive Reinigung + Styling", p: "180 €" },
    ],
  },
  {
    cat: "Zweithaar", title: "Perücken Service", note: "Echthaar & Kunsthaar",
    items: [
      { n: "Waschen + Stylen Kunsthaar", p: "60 €" },
      { n: "Waschen + Föhnen Echthaar", p: "75 €" },
      { n: "Frizz entfernen Kunsthaar", p: "Kostenlos" },
    ],
  },
  {
    cat: "Damen", title: "Schnitt & Styling", note: "Kurzhaar · Mittelhaar · Langhaar",
    items: [
      { n: "Waschen | Schneiden | Föhnen", d: "Kurz · Mittel · Lang", p: "52 · 65 · 78 €" },
      { n: "Waschen | Föhnen", d: "Kurz · Mittel · Lang", p: "34 · 40 · 55 €" },
      { n: "Cut & Go (ohne Föhnen)", d: "Kurz · Mittel · Lang", p: "40 · 48 · 58 €" },
    ],
  },
  {
    cat: "Damen", title: "Farbe & Strähnen",
    items: [
      { n: "Ansatzfarbe bis 2 cm", p: "ab 45 €" },
      { n: "Komplettfarbe", p: "ab 85 €" },
      { n: "Hauben Strähne", d: "nur Kurzhaar", p: "60 €" },
      { n: "Oberkopf", d: "Oberkopf Auffrischung", p: "85 €" },
      { n: "Ganzer Kopf", p: "ab 140 €" },
      { n: "Dauerwelle", d: "zzgl. Schnitt & Styling", p: "68 €" },
    ],
  },
  {
    cat: "Damen", title: "Balayage & Techniken",
    items: [
      { n: "Balayage", p: "ab 220 €" },
      { n: "AirTouch", p: "ab 450 €" },
      { n: "Glossing / Abmattierung", p: "ab 55 €" },
    ],
  },
  { cat: "Damen", title: "Pflege", items: [{ n: "Intensivpflege", p: "12 €" }] },
  {
    cat: "Herren", title: "Herren",
    items: [
      { n: "Waschen | Schneiden | Styling", p: "38 €" },
      { n: "Trocken", p: "28 €" },
      { n: "Maschinenhaarschnitt", p: "20 €" },
    ],
  },
  {
    cat: "Kosmetik", title: "Kosmetik",
    items: [
      { n: "Wimpernfarbe", p: "15 €" },
      { n: "Augenbrauenfarbe", p: "12 €" },
      { n: "Augenbrauen zupfen", p: "12 €" },
    ],
  },
];

export const priceCategories = ["Alle", "Zweithaar", "Damen", "Herren", "Kosmetik"] as const;

export const contactServices = [
  "Perücken-Beratung",
  "Toupet / Haarsystem",
  "Hair Weaving / Skin Bonding",
  "Haarverlängerung",
  "Haarschnitt & Styling",
  "Farbe & Balayage",
] as const;

export const marqueeWords = [
  "Perücken", "Haarteile", "Zweithaar", "Toupets", "Hair Weaving", "Skin Bonding", "Extensions", "Haarschnitt",
];
