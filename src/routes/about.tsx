import { createFileRoute } from "@tanstack/react-router";
import { Check, Quote } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { useCmsSnapshot, useContentValue } from "@/lib/cms-context";
import { pageSeoHead } from "@/lib/cms-load";

export const Route = createFileRoute("/about")({
  head: ({ matches }) => ({
    meta: pageSeoHead("about", matches),
  }),
  component: AboutPage,
});

function AboutPage() {
  const getContentValue = useContentValue();
  const { testimonials } = useCmsSnapshot();
  const badges = [1, 2, 3, 4, 5, 6].map((n) => getContentValue(`about.badge.${n}`));
  const differences = [1, 2, 3].map((n) => ({
    title: getContentValue(`about.different.${n}.title`),
    desc: getContentValue(`about.different.${n}.body`),
  }));

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("about.eyebrow")}
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {getContentValue("about.headingPrefix")}
          <span className="text-brand">{getContentValue("about.headingBrand")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold text-foreground">
          {getContentValue("about.tagline")}
        </p>
        <div className="mt-5 max-w-3xl space-y-4 text-muted-foreground">
          <p>{getContentValue("about.p1")}</p>
          <p>{getContentValue("about.p2")}</p>
          <p>{getContentValue("about.p3")}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft"
            >
              <span className="grid size-5 place-items-center rounded-full bg-brand text-brand-foreground">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {b}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            <span className="inline-block h-7 w-1.5 rounded-full bg-brand" />
            {getContentValue("about.numbers.heading")}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{getContentValue("about.numbers.body")}</p>
          <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {getContentValue("about.numbers.expertise.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {getContentValue("about.numbers.expertise.body")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {getContentValue("about.numbers.personable.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {getContentValue("about.numbers.personable.body")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("about.different.eyebrow")}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {getContentValue("about.different.heading")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {differences.map((d) => (
            <article
              key={d.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="mb-4 block h-1.5 w-12 rounded-full bg-brand" />
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("about.testimonials.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {getContentValue("about.testimonials.heading")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-border bg-secondary/50 p-6"
            >
              <Quote className="size-7 text-brand" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">{t.body}</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">
                {t.title}
                {t.subtitle ? ` · ${t.subtitle}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          {getContentValue("about.testimonials.icaewNote")}
        </p>
      </section>

      <ContactCta />
    </main>
  );
}
