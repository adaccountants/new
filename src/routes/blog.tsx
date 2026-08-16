import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { getCards } from "@/lib/cards-data";
import { useContentValue } from "@/lib/cms-context";
import { pageSeoHead } from "@/lib/cms-load";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const posts = (await getCards("blog")).filter((card) => card.published);
    return { posts };
  },
  head: ({ loaderData, matches }) => {
    const preload = loaderData.posts
      .slice(0, 3)
      .filter((card) => card.imageUrl)
      .map((card) => ({ rel: "preload" as const, href: card.imageUrl, as: "image" as const }));
    return {
      meta: pageSeoHead("blog", matches),
      links: preload,
    };
  },
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();
  const getContentValue = useContentValue();

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            {getContentValue("blog.eyebrow")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {getContentValue("blog.headingPrefix")}
            <span className="text-brand">{getContentValue("blog.headingBrand")}</span>
            {getContentValue("blog.headingSuffix")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {getContentValue("blog.intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-52 overflow-hidden bg-muted">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
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
                {post.subtitle ? (
                  <time className="text-xs font-bold tracking-wider text-brand uppercase">
                    {post.subtitle}
                  </time>
                ) : null}
                <h2 className="text-lg leading-snug font-bold text-foreground">{post.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-semibold text-brand transition-colors hover:underline"
                >
                  {getContentValue("blog.card.cta")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
