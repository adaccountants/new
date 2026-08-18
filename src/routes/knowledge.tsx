import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { getCards, KNOWLEDGE_CATEGORIES, type Card } from "@/lib/cards-data";
import { useContentValue } from "@/lib/cms-context";
import { pageSeoHead } from "@/lib/cms-load";
import { knowledgeObjectPath } from "@/lib/knowledge-file-url";
import { signKnowledgeFileUrls } from "@/lib/knowledge-signed-url";
import { toSafeDownloadHref } from "@/lib/safe-url";

export const Route = createFileRoute("/knowledge")({
  loader: async () => {
    const cards = (await getCards("knowledge")).filter((card) => card.published);
    const signedByPath = await signKnowledgeFileUrls({
      data: cards.map((card) => card.fileUrl).filter((url): url is string => Boolean(url)),
    });
    const withSignedFiles: Card[] = cards.map((card) => {
      const path = knowledgeObjectPath(card.fileUrl);
      if (!path) return card;
      const signedUrl = signedByPath[path];
      return signedUrl ? { ...card, fileUrl: signedUrl } : { ...card, fileUrl: undefined };
    });
    return { cards: withSignedFiles };
  },
  head: ({ loaderData, matches }) => {
    const preload = loaderData.cards
      .slice(0, 3)
      .filter((card) => card.imageUrl)
      .map((card) => ({ rel: "preload" as const, href: card.imageUrl, as: "image" as const }));
    return {
      meta: pageSeoHead("knowledge", matches),
      links: preload,
    };
  },
  component: KnowledgePage,
});

function KnowledgePage() {
  const { cards } = Route.useLoaderData();
  const getContentValue = useContentValue();
  const grouped = KNOWLEDGE_CATEGORIES.map((category) => ({
    category,
    items: cards.filter((card) => card.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            {getContentValue("knowledge.eyebrow")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {getContentValue("knowledge.headingPrefix")}
            <span className="text-brand">{getContentValue("knowledge.headingBrand")}</span>
            {getContentValue("knowledge.headingSuffix")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {getContentValue("knowledge.intro")}
          </p>
        </div>
      </section>

      {grouped.map((group) => (
        <section key={group.category} className="mx-auto max-w-6xl px-5 pb-16">
          <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">{group.category}</p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item, index) => {
              const fileHref = toSafeDownloadHref(item.fileUrl);
              return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative h-52 overflow-hidden bg-muted">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width={1024}
                      height={768}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index < 3 ? "high" : "low"}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-lg leading-snug font-bold text-foreground">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  {fileHref ? (
                    <a
                      href={fileHref}
                      download={item.fileName || true}
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
                    >
                      <Download className="size-4" />
                      {getContentValue("knowledge.card.cta")}
                    </a>
                  ) : null}
                </div>
              </article>
              );
            })}
          </div>
        </section>
      ))}

      <ContactCta />
    </main>
  );
}
