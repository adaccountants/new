import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { getCards, KNOWLEDGE_CATEGORIES } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getContentValue, seoHeadTags } from "@/lib/page-content-data";

function publishedKnowledge() {
  return getCards("knowledge").filter((card) => card.published);
}

export const Route = createFileRoute("/knowledge")({
  head: () => {
    const preload = publishedKnowledge()
      .slice(0, 3)
      .filter((card) => card.imageUrl)
      .map((card) => ({ rel: "preload" as const, href: card.imageUrl, as: "image" as const }));
    return {
      meta: seoHeadTags("knowledge"),
      links: preload,
    };
  },
  component: KnowledgePage,
});

function KnowledgePage() {
  useCms();
  const cards = publishedKnowledge();
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
            {group.items.map((item, index) => (
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
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      download={item.fileName || true}
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
                    >
                      <Download className="size-4" />
                      {getContentValue("knowledge.card.cta")}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <ContactCta />
    </main>
  );
}
