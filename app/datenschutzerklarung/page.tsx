import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Datenschutzerklärung – Haarzentrum Mainz",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf haarzentrum-mainz.de.",
  path: "/datenschutzerklarung/",
});

/*
 * Describes the data processing of THIS website implementation:
 * no cookies, no analytics, self-hosted fonts, contact form via e-mail,
 * external booking via Planity. Must be reviewed by the business / legal counsel
 * before go-live (see README) – especially hosting and e-mail provider details.
 */
export default function DatenschutzPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Datenschutzerklärung">
      <h2>1. Verantwortliche Stelle</h2>
      <p>
        {site.name}, Inhaberin {site.owner}
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}, Deutschland
        <br />
        Telefon: <a href={site.phoneHref}>{site.phone}</a> · E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>2. Aufruf der Website</h2>
      <p>
        Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit des
        Abrufs, aufgerufene Seite, Browsertyp), um die Website sicher und stabil auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Diese
        Protokolldaten werden nicht mit anderen Daten zusammengeführt.
      </p>

      <h2>3. Cookies, Tracking und Schriftarten</h2>
      <p>
        Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken und verwendet keine Tracking-Dienste. Die Schriftarten sind
        lokal eingebunden; beim Seitenaufruf wird keine Verbindung zu Servern von Google oder anderen Schriftanbietern aufgebaut.
      </p>

      <h2>4. Kontakt- und Terminanfrageformular</h2>
      <p>
        Wenn Sie uns über das <Link href="/contact/">Kontaktformular</Link> eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen
        Daten (gewünschte Leistung, Name, E-Mail-Adresse sowie optional Telefonnummer, Wunschtermin und Nachricht) ausschließlich zur
        Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO bzw. Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO). Die Angaben werden
        per E-Mail an uns übermittelt und gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
        Aufbewahrungspflichten bestehen.
      </p>
      <p>Auch bei einer Kontaktaufnahme per Telefon oder E-Mail verarbeiten wir Ihre Angaben nur zur Bearbeitung Ihres Anliegens.</p>

      <h2>5. Online-Terminbuchung über Planity</h2>
      <p>
        Für die Online-Terminbuchung verlinken wir auf den externen Dienst Planity. Erst wenn Sie den Link anklicken, gelangen Sie auf die
        Website von Planity; dort gelten deren Datenschutzbestimmungen. Beim bloßen Besuch unserer Website werden keine Daten an Planity
        übertragen.
      </p>

      <h2>6. Externe Links</h2>
      <p>
        Unsere Website enthält Links zu externen Angeboten (z. B. Google Maps für die Routenplanung). Beim Anklicken gelten die
        Datenschutzbestimmungen des jeweiligen Anbieters.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
        gegen die Verarbeitung Ihrer personenbezogenen Daten. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
        widerrufen. Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
      </p>

      <h2>8. Kontakt zum Datenschutz</h2>
      <p>
        Bei Fragen zum Datenschutz wenden Sie sich bitte an <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
