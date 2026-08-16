import { interpolateSettings, getSettings, type SiteSettings } from "@/lib/site-settings-data";
import { supabase } from "@/lib/supabase-client";

export type ContentPage = "home" | "about" | "services" | "careers" | "contact" | "blog" | "knowledge";

export type ContentBlock = {
  key: string;
  page: ContentPage;
  label: string;
  value: string;
  type: "text" | "richtext";
};

export const CONTENT_PAGES: { id: ContentPage; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
  { id: "knowledge", label: "Knowledge" },
];

type ContentRow = {
  key: string;
  page: string;
  label: string;
  value: string;
  type: string;
};

function throwIfError(error: { message: string } | null, action: string) {
  if (error) throw new Error(`${action}: ${error.message}`);
}

function logIfError(error: { message: string } | null, action: string) {
  if (error) console.error(`[supabase] ${action}:`, error.message);
  return Boolean(error);
}

export function contentFromRow(row: ContentRow): ContentBlock {
  return {
    key: row.key,
    page: row.page as ContentPage,
    label: row.label,
    value: row.value,
    type: row.type === "richtext" ? "richtext" : "text",
  };
}

export function contentToRow(block: ContentBlock): ContentRow {
  return {
    key: block.key,
    page: block.page,
    label: block.label,
    value: block.value,
    type: block.type,
  };
}

export async function getContentByPage(page: string): Promise<ContentBlock[]> {
  const { data, error } = await supabase.from("page_content").select("*").eq("page", page);
  if (logIfError(error, "getContentByPage")) return [];
  return ((data ?? []) as ContentRow[]).map(contentFromRow);
}

export async function getAllContentBlocks(): Promise<ContentBlock[]> {
  const { data, error } = await supabase.from("page_content").select("*");
  if (logIfError(error, "getAllContentBlocks")) return [];
  return ((data ?? []) as ContentRow[]).map(contentFromRow);
}

export async function getContentValue(key: string): Promise<string> {
  const { data, error } = await supabase.from("page_content").select("value").eq("key", key).maybeSingle();
  if (logIfError(error, "getContentValue")) return "";
  return data?.value ?? "";
}

export function contentMap(blocks: ContentBlock[]): Record<string, string> {
  return Object.fromEntries(blocks.map((block) => [block.key, block.value]));
}

export function contentValue(content: Record<string, string>, key: string): string {
  return content[key] ?? "";
}

export type SeoMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export function seoMetaFromContent(page: ContentPage, content: Record<string, string>, settings: SiteSettings): SeoMeta {
  const title = contentValue(content, `${page}.seo.title`);
  const description = interpolateSettings(contentValue(content, `${page}.seo.description`), settings);
  const ogTitle = contentValue(content, `${page}.seo.ogTitle`) || title;
  const ogDescription = interpolateSettings(contentValue(content, `${page}.seo.ogDescription`), settings) || description;
  return { title, description, ogTitle, ogDescription };
}

export async function getSeoMeta(page: ContentPage): Promise<SeoMeta> {
  const [settings, blocks] = await Promise.all([getSettings(), getContentByPage(page)]);
  return seoMetaFromContent(page, contentMap(blocks), settings);
}

export function seoTagsFromMeta(seo: SeoMeta) {
  return [
    { title: seo.title },
    { name: "description" as const, content: seo.description },
    { property: "og:title" as const, content: seo.ogTitle },
    { property: "og:description" as const, content: seo.ogDescription },
    { property: "og:type" as const, content: "website" },
    { name: "twitter:card" as const, content: "summary_large_image" },
  ];
}

export async function seoHeadTags(page: ContentPage) {
  return seoTagsFromMeta(await getSeoMeta(page));
}

export async function updateContent(key: string, value: string): Promise<void> {
  const { error } = await supabase.from("page_content").update({ value }).eq("key", key);
  throwIfError(error, "updateContent");
}
