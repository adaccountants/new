import { getCmsDb } from "@/lib/cms-db";
import { isSafeExternalUrl, isSafeRelativeUrl } from "@/lib/safe-url";
import { supabase } from "@/lib/supabase-client";

/** Canonical public origin (www). Apex adaaccountants.uk redirects here. */
export const SITE_URL = "https://www.adaaccountants.uk";

export type SiteSettings = {
  firmName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  socials: { platform: string; url: string }[];
  footerText: string;
  founderName: string;
  founderRole: string;
  founderCredentials: string;
  founderBio: string;
  founderPhotoUrl: string;
};

export const EMPTY_SETTINGS: SiteSettings = {
  firmName: "",
  phone: "",
  email: "",
  address: "",
  hours: "",
  socials: [],
  footerText: "",
  founderName: "",
  founderRole: "",
  founderCredentials: "",
  founderBio: "",
  founderPhotoUrl: "",
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
  founder_name?: string | null;
  founder_role?: string | null;
  founder_credentials?: string | null;
  founder_bio?: string | null;
  founder_photo_url?: string | null;
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
    founderName: row.founder_name?.trim() ?? "",
    founderRole: row.founder_role?.trim() ?? "",
    founderCredentials: row.founder_credentials?.trim() ?? "",
    founderBio: row.founder_bio?.trim() ?? "",
    founderPhotoUrl: row.founder_photo_url?.trim() ?? "",
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
    founder_name: current.founderName,
    founder_role: current.founderRole,
    founder_credentials: current.founderCredentials,
    founder_bio: current.founderBio,
    founder_photo_url: current.founderPhotoUrl,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await getCmsDb();
  const { data, error } = await db.from("site_settings").select("*").eq("id", 1).maybeSingle();
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
    .replaceAll("{firmName}", current.firmName)
    .replaceAll("{address}", current.address);
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

function founderPhotoAbsoluteUrl(current: SiteSettings): string | undefined {
  const photo = current.founderPhotoUrl.trim();
  if (!photo) return undefined;
  if (isSafeRelativeUrl(photo)) return `${SITE_URL}${photo}`;
  if (isSafeExternalUrl(photo)) return photo;
  return undefined;
}

export function getFounderPersonJsonLd(current: SiteSettings) {
  const name = current.founderName.trim();
  if (!name) return undefined;

  const jsonLd: {
    "@context": string;
    "@type": string;
    name: string;
    jobTitle?: string;
    honorificSuffix?: string;
    hasCredential?: {
      "@type": "EducationalOccupationalCredential";
      credentialCategory: string;
      name: string;
    };
    worksFor: { "@type": string; name: string; url: string };
    image?: string;
  } = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    worksFor: {
      "@type": "AccountingService",
      name: current.firmName,
      url: SITE_URL,
    },
  };

  const role = current.founderRole.trim();
  if (role) jsonLd.jobTitle = role;

  const credentials = current.founderCredentials.trim();
  if (credentials) {
    jsonLd.honorificSuffix = credentials;
    jsonLd.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional qualification",
      name: credentials,
    };
  }

  const image = founderPhotoAbsoluteUrl(current);
  if (image) jsonLd.image = image;

  return jsonLd;
}
