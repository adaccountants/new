import { getCards, isHomeServiceCard } from "@/lib/cards-data";
import type { CmsSnapshot } from "@/lib/cms-context";
import { LEGAL_SEO_FALLBACK, type LegalPage } from "@/lib/legal-page-content";
import {
  contentMap,
  getAllContentBlocks,
  seoMetaFromContent,
  seoTagsFromMeta,
  type ContentPage,
} from "@/lib/page-content-data";
import { interpolateSettings, getSettings, SITE_URL } from "@/lib/site-settings-data";

export async function loadCmsSnapshot(): Promise<CmsSnapshot> {
  try {
    const [settings, blocks, services, testimonials, partners] = await Promise.all([
      getSettings(),
      getAllContentBlocks(),
      getCards("services"),
      getCards("testimonials"),
      getCards("partnership"),
    ]);
    return {
      settings,
      content: contentMap(blocks),
      homeServices: services.filter((card) => card.published && isHomeServiceCard(card)),
      testimonials: testimonials.filter((card) => card.published),
      partners: partners.filter((card) => card.published),
    };
  } catch (error) {
    console.error("[cms] failed to load snapshot", error);
    return {
      settings: {
        firmName: "",
        phone: "",
        email: "",
        address: "",
        hours: "",
        socials: [],
        footerText: "",
      },
      content: {},
      homeServices: [],
      testimonials: [],
      partners: [],
    };
  }
}

export function rootCms(matches: Array<{ loaderData?: unknown }>): CmsSnapshot {
  for (const match of matches) {
    const data = match.loaderData as CmsSnapshot | undefined;
    if (data && data.content && data.settings) return data;
  }
  throw new Error("CMS snapshot missing from the root loader");
}

export function pageSeoHead(page: ContentPage, matches: Array<{ loaderData?: unknown }>) {
  const cms = rootCms(matches);
  return seoTagsFromMeta(seoMetaFromContent(page, cms.content, cms.settings));
}

export function legalPageHead(
  page: LegalPage,
  path: `/${string}`,
  matches: Array<{ loaderData?: unknown }>,
) {
  const cms = rootCms(matches);
  const seo = seoMetaFromContent(page, cms.content, cms.settings);
  const fallback = LEGAL_SEO_FALLBACK[page];
  const title = seo.title || fallback.title;
  const description = seo.description || interpolateSettings(fallback.description, cms.settings);
  const ogTitle = seo.ogTitle || fallback.ogTitle || title;
  const ogDescription =
    seo.ogDescription || interpolateSettings(fallback.ogDescription, cms.settings) || description;
  return {
    meta: seoTagsFromMeta({ title, description, ogTitle, ogDescription }),
    links: [{ rel: "canonical" as const, href: `${SITE_URL}${path}` }],
  };
}
