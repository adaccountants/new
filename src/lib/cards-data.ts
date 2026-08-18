import { getCmsDb } from "@/lib/cms-db";
import { supabase } from "@/lib/supabase-client";

export type CardSection =
  | "services"
  | "testimonials"
  | "blog"
  | "team"
  | "careers"
  | "knowledge"
  | "partnership";

export type KnowledgeCategory =
  | "Guides"
  | "Checklists & Templates"
  | "Deadline Calendars"
  | "Industry Insights";

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  "Guides",
  "Checklists & Templates",
  "Deadline Calendars",
  "Industry Insights",
];

export type Card = {
  id: string;
  section: CardSection;
  slug?: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl: string;
  fileUrl?: string;
  fileName?: string;
  category?: string;
  linkUrl?: string;
  sortOrder: number;
  published: boolean;
};

export const CARD_SECTIONS: CardSection[] = [
  "services",
  "testimonials",
  "blog",
  "knowledge",
  "partnership",
  "team",
  "careers",
];

export const HOME_SERVICE_SLUG_PREFIX = "home-";

export function isCardSection(value: string): value is CardSection {
  return (CARD_SECTIONS as string[]).includes(value);
}

export function isHomeServiceCard(card: Card): boolean {
  return card.section === "services" && (card.slug?.startsWith(HOME_SERVICE_SLUG_PREFIX) ?? false);
}

export function parseCareerBody(body = ""): { paragraphs: string[]; ideals: string[] } {
  const [main = "", idealPart] = body.split("\n---\n");
  const paragraphs = main.split("\n\n").filter(Boolean);
  const ideals = idealPart ? idealPart.split("\n").filter(Boolean) : [];
  return { paragraphs, ideals };
}

type CardRow = {
  id: string;
  section: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  file_url: string | null;
  file_name: string | null;
  category: string | null;
  link_url: string | null;
  sort_order: number;
  published: boolean;
};

function throwIfError(error: { message: string } | null, action: string) {
  if (error) throw new Error(`${action}: ${error.message}`);
}

function logIfError(error: { message: string } | null, action: string) {
  if (error) console.error(`[supabase] ${action}:`, error.message);
  return Boolean(error);
}

export function cardFromRow(row: CardRow): Card {
  const card: Card = {
    id: row.id,
    section: row.section as CardSection,
    title: row.title,
    imageUrl: row.image_url ?? "",
    sortOrder: row.sort_order,
    published: row.published,
  };
  if (row.slug) card.slug = row.slug;
  if (row.subtitle) card.subtitle = row.subtitle;
  if (row.body) card.body = row.body;
  if (row.file_url) card.fileUrl = row.file_url;
  if (row.file_name) card.fileName = row.file_name;
  if (row.category) card.category = row.category;
  if (row.link_url) card.linkUrl = row.link_url;
  return card;
}

export function cardToRow(card: Omit<Card, "id"> & { id?: string }) {
  return {
    ...(card.id ? { id: card.id } : {}),
    section: card.section,
    slug: card.slug || null,
    title: card.title,
    subtitle: card.subtitle || null,
    body: card.body || null,
    image_url: card.imageUrl,
    file_url: card.fileUrl || null,
    file_name: card.fileName || null,
    category: card.category || null,
    link_url: card.linkUrl || null,
    sort_order: card.sortOrder,
    published: card.published,
  };
}

export async function getCards(section: string, opts?: { includeUnpublished?: boolean }): Promise<Card[]> {
  const db = await getCmsDb();
  let query = db.from("cards").select("*").eq("section", section).order("sort_order", { ascending: true });
  // Defense-in-depth: RLS already hides unpublished rows from anon. Keep the
  // filter on public SSR so a policy gap fails closed (empty) instead of leaking.
  if (import.meta.env.SSR && !opts?.includeUnpublished) {
    query = query.eq("published", true);
  }
  const { data, error } = await query;
  if (logIfError(error, "getCards")) return [];
  return ((data ?? []) as CardRow[]).map(cardFromRow);
}

export async function getCardBySlug(section: string, slug: string): Promise<Card | undefined> {
  const db = await getCmsDb();
  let query = db.from("cards").select("*").eq("section", section).eq("slug", slug);
  if (import.meta.env.SSR) query = query.eq("published", true);
  const { data, error } = await query.maybeSingle();
  if (logIfError(error, "getCardBySlug")) return undefined;
  return data ? cardFromRow(data as CardRow) : undefined;
}

export async function getCardById(id: string): Promise<Card | undefined> {
  const db = await getCmsDb();
  const { data, error } = await db.from("cards").select("*").eq("id", id).maybeSingle();
  if (logIfError(error, "getCardById")) return undefined;
  return data ? cardFromRow(data as CardRow) : undefined;
}

export async function addCard(card: Omit<Card, "id">): Promise<Card> {
  const { data, error } = await supabase.from("cards").insert(cardToRow(card)).select("*").single();
  throwIfError(error, "addCard");
  return cardFromRow(data as CardRow);
}

export async function updateCard(id: string, patch: Partial<Card>): Promise<Card> {
  const current = await getCardById(id);
  if (!current) throw new Error(`Card not found: ${id}`);
  const updated: Card = {
    id: current.id,
    section: patch.section ?? current.section,
    title: patch.title ?? current.title,
    imageUrl: patch.imageUrl ?? current.imageUrl,
    sortOrder: patch.sortOrder ?? current.sortOrder,
    published: patch.published ?? current.published,
  };
  const slug = "slug" in patch ? patch.slug : current.slug;
  const subtitle = "subtitle" in patch ? patch.subtitle : current.subtitle;
  const body = "body" in patch ? patch.body : current.body;
  const fileUrl = "fileUrl" in patch ? patch.fileUrl : current.fileUrl;
  const fileName = "fileName" in patch ? patch.fileName : current.fileName;
  const category = "category" in patch ? patch.category : current.category;
  const linkUrl = "linkUrl" in patch ? patch.linkUrl : current.linkUrl;
  if (slug) updated.slug = slug;
  if (subtitle) updated.subtitle = subtitle;
  if (body) updated.body = body;
  if (fileUrl) updated.fileUrl = fileUrl;
  if (fileName) updated.fileName = fileName;
  if (category) updated.category = category;
  if (linkUrl) updated.linkUrl = linkUrl;

  const { data, error } = await supabase.from("cards").update(cardToRow(updated)).eq("id", id).select("*").single();
  throwIfError(error, "updateCard");
  return cardFromRow(data as CardRow);
}

export async function deleteCard(id: string): Promise<void> {
  const { error } = await supabase.from("cards").delete().eq("id", id);
  throwIfError(error, "deleteCard");
}

export async function reorderCards(section: string, orderedIds: string[]): Promise<void> {
  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("cards").update({ sort_order: index }).eq("id", id).eq("section", section),
    ),
  );
  for (const result of results) throwIfError(result.error, "reorderCards");
}
