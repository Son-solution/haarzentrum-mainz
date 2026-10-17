import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Impressum – Haarzentrum Mainz Friseur in Mainz",
  description: "Impressum des Haarzentrum Mainz, Langenbeckstraße 2, 55131 Mainz.",
  path: "/impressum/",
});

/* Content taken from the existing Impressum on haarzentrum-mainz.de. */
export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.name}
        <br />
        Inhaberin: {site.owner}
        <br />
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Website: <a href={site.url}>{site.url.replace("https://", "")}</a>
      </p>
      <h2>Umsatzsteuer</h2>
      <p>USt-IdNr.: {site.vatId}</p>
      <h2>Bildnachweise</h2>
      <p>
        Einige Bilder stammen von Unsplash (<a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">unsplash.com</a>).
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten
        Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </LegalPage>
  );
}
