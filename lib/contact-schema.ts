import { z } from "zod";
import { contactServices } from "./content";

/** Shared validation for the contact / appointment request form (client + server). */
export const contactSchema = z.object({
  service: z.enum(contactServices, { message: "Bitte wählen Sie eine Leistung." }),
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
  tel: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\d\s/-]*$/, "Bitte geben Sie eine gültige Telefonnummer an.")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse an.").max(200),
  date: z
    .string()
    .trim()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Ungültiges Datum.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(3000, "Die Nachricht ist zu lang.").optional().or(z.literal("")),
  consent: z.literal(true, { message: "Bitte stimmen Sie der Datenverarbeitung zu." }),
  /** Honeypot – must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
