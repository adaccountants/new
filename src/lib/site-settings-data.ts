import { supabase } from "@/lib/supabase-client";

/** Current Vercel production URL. Update to the real custom domain once one is connected. */
export const SITE_URL = "https://scroll-joy-animate.vercel.app";

export type SiteSettings = {
  firmName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  socials: { platform: string; url: string }[];
  footerText: string;
};

const EMPTY_SETTINGS: SiteSettings = {
  firmName: "",
  phone: "",
  email: "",
  address: "",
  hours: "",
  socials: [],
  footerText: "",
};

type SettingsRow = {
  id: number;
  firm_name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  socials: SiteSettings["socials"];
  footer_text: string;
};

function throwIfError(error: { message: string } | null, action: string) {
  if (error) throw new Error(`${action}: ${error.message}`);
}

function logIfError(error: { message: string } | null, action: string) {
  if (error) console.error(`[supabase] ${action}:`, error.message);
  return Boolean(error);
}

export function settingsFromRow(row: SettingsRow): SiteSettings {
  return {
    firmName: row.firm_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    hours: row.hours,
    socials: Array.isArray(row.socials) ? row.socials.map((item) => ({ ...item })) : [],
    footerText: row.footer_text,
  };
}

export function settingsToRow(current: SiteSettings) {
  return {
    id: 1,
    firm_name: current.firmName,
    phone: current.phone,
    email: current.email,
    address: current.address,
    hours: current.hours,
    socials: current.socials,
    footer_text: current.footerText,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (logIfError(error, "getSettings") || !data) return { ...EMPTY_SETTINGS, socials: [] };
  return settingsFromRow(data as SettingsRow);
}

export async function updateSettings(patch: Partial<SiteSettings>): Promise<void> {
  const current = await getSettings();
  const next: SiteSettings = {
    ...current,
    ...patch,
    socials: patch.socials ? patch.socials.map((item) => ({ ...item })) : current.socials,
  };
  const { error } = await supabase.from("site_settings").upsert(settingsToRow(next));
  throwIfError(error, "updateSettings");
}

export function getPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getMailHref(email: string): string {
  return `mailto:${email}`;
}

export function interpolateSettings(template: string, current: SiteSettings): string {
  return template
    .replaceAll("{phone}", current.phone)
    .replaceAll("{email}", current.email)
    .replaceAll("{hours}", current.hours)
    .replaceAll("{firmName}", current.firmName);
}

export function getAccountingServiceJsonLd(current: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: current.firmName,
    url: SITE_URL,
    telephone: current.phone,
    email: current.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: current.address,
      addressCountry: "GB",
    },
    openingHours: current.hours,
    sameAs: current.socials.map((social) => social.url),
  };
}

export function getServiceJsonLd(
  card: { title: string; body?: string; subtitle?: string },
  current: SiteSettings,
) {
  const jsonLd: {
    "@context": string;
    "@type": string;
    name: string;
    description?: string;
    provider: { "@type": string; name: string };
    areaServed: string;
  } = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: card.title,
    provider: { "@type": "AccountingService", name: current.firmName },
    areaServed: "GB",
  };
  const description = card.body || card.subtitle;
  if (description) jsonLd.description = description;
  return jsonLd;
}
