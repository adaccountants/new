import { LegalMarkdown } from "@/components/site/LegalMarkdown";
import { useContentValue, useSettings } from "@/lib/cms-context";
import { legalFallbackBody, type LegalPage } from "@/lib/legal-page-content";
import { interpolateSettings } from "@/lib/site-settings-data";

export function LegalDocument({ page }: { page: LegalPage }) {
  const getContentValue = useContentValue();
  const settings = useSettings();
  const raw = getContentValue(`${page}.body`) || legalFallbackBody(page);
  const markdown = interpolateSettings(raw, settings);

  return (
    <main className="bg-background">
      <article className="mx-auto max-w-6xl px-5 pb-20 pt-16">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          Legal
        </span>
        <LegalMarkdown markdown={markdown} />
      </article>
    </main>
  );
}
