import { getCards, isHomeServiceCard } from "@/lib/cards-data";
import type { CmsSnapshot } from "@/lib/cms-context";
import { contentMap, getAllContentBlocks, seoMetaFromContent, seoTagsFromMeta, type ContentPage } from "@/lib/page-content-data";
import { getSettings } from "@/lib/site-settings-data";

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
