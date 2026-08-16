import { createContext, createElement, useContext, type ReactNode } from "react";

import type { Card } from "@/lib/cards-data";
import type { SiteSettings } from "@/lib/site-settings-data";

export type CmsSnapshot = {
  settings: SiteSettings;
  content: Record<string, string>;
  homeServices: Card[];
  testimonials: Card[];
  partners: Card[];
};

const CmsContext = createContext<CmsSnapshot | null>(null);

export function CmsProvider({ data, children }: { data: CmsSnapshot; children: ReactNode }) {
  return createElement(CmsContext.Provider, { value: data }, children);
}

export function useCmsSnapshot(): CmsSnapshot {
  const value = useContext(CmsContext);
  if (!value) {
    throw new Error("useCmsSnapshot must be used within CmsProvider");
  }
  return value;
}

export function useContentValue() {
  const { content } = useCmsSnapshot();
  return (key: string) => content[key] ?? "";
}

export function useSettings(): SiteSettings {
  return useCmsSnapshot().settings;
}
