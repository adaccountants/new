/**
 * TEMP in-memory store — replace each function body with a Supabase query against a single-row
 * `site_settings` table. Keep these exact function signatures.
 *
 * Supabase mapping
 * ----------------
 * Table: `site_settings` (one row)
 * Columns:
 *   id           uuid / int  -- singleton row
 *   firm_name    text        -- maps to firmName
 *   phone        text
 *   email        text
 *   address      text
 *   hours        text
 *   socials      jsonb       -- [{ platform, url }]
 *   footer_text  text        -- maps to footerText
 *
 * RLS:
 *   Public-read: SELECT on the singleton row (header, footer, contact details).
 *   Admin-only:  UPDATE (and INSERT if the row is missing). Authenticated admin role.
 *
 * Seed notes: header/footer used info@adaaccountants.uk; the contact page previously showed
 * hello@alphadigi.co.uk. One email is stored here so the whole site stays in sync.
 */

import { emitCmsChange } from "@/lib/cms-sync";

export type SiteSettings = {
  firmName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  socials: { platform: string; url: string }[];
  footerText: string;
};

let settings: SiteSettings = {
  firmName: "Alpha Digi AI Accountants",
  phone: "020 3916 5680",
  email: "info@adaaccountants.uk",
  address: "London, United Kingdom",
  hours: "Mon – Fri, 9AM – 5PM",
  socials: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "X", url: "https://x.com/ADAiaccountants" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/alpha-digiai-accountants-ltd/about/?viewAsMember=true" },
    { platform: "YouTube", url: "https://youtube.com" },
    { platform: "Facebook", url: "https://facebook.com" },
  ],
  footerText: "Alpha Digi AI Accountants. ICAEW Chartered Accountants.",
};

export function getSettings(): SiteSettings {
  return {
    ...settings,
    socials: settings.socials.map((item) => ({ ...item })),
  };
}

export function updateSettings(patch: Partial<SiteSettings>): void {
  settings = {
    ...settings,
    ...patch,
    socials: patch.socials ? patch.socials.map((item) => ({ ...item })) : settings.socials,
  };
  emitCmsChange();
}

export function getPhoneHref(phone = settings.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getMailHref(email = settings.email): string {
  return `mailto:${email}`;
}

export function interpolateSettings(template: string, current = getSettings()): string {
  return template
    .replaceAll("{phone}", current.phone)
    .replaceAll("{email}", current.email)
    .replaceAll("{hours}", current.hours)
    .replaceAll("{firmName}", current.firmName);
}
