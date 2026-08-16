import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ChevronUp, Phone } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { TechnologyPartners } from "@/components/site/TechnologyPartners";
import { getCards, isHomeServiceCard } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getContentValue, seoHeadTags } from "@/lib/page-content-data";

function coreServiceCards() {
  return getCards("services").filter((card) => card.published && !isHomeServiceCard(card));
}

export const Route = createFileRoute("/services/")({
  head: () => {
    const preload = coreServiceCards()
      .slice(0, 3)
      .filter((card) => card.imageUrl)
      .map((card) => ({ rel: "preload" as const, href: card.imageUrl, as: "image" as const }));
    return {
      meta: seoHeadTags("services"),
      links: preload,
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  useCms();
  const [open, setOpen] = useState(true);
  const highlights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) =>
    getContentValue(`services.highlight.${n}`),
  );
  const services = coreServiceCards();

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            {getContentValue("services.eyebrow")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {getContentValue("services.headingPrefix")}
            <br />
            <span className="text-brand">{getContentValue("services.headingBrand")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {getContentValue("services.intro")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-strong hover:shadow-glow"
            >
              <Phone className="size-4" />
              {getContentValue("services.ctaPrimary")}
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#core-services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {getContentValue("services.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-4">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                <span className="inline-block h-7 w-1.5 rounded-full bg-brand" />
                {getContentValue("services.list.heading")}
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {getContentValue("services.list.intro")}
              </p>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle services list"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <ChevronUp className={`size-5 transition-transform ${open ? "" : "rotate-180"}`} />
            </button>
          </div>

          {open ? (
            <div className="mt-8 grid gap-x-10 gap-y-5 border-t border-border pt-8 sm:grid-cols-2">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-foreground">{h}</span>
                </div>
              ))}
            </div>
          ) : null}

          <a
            href="#core-services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-brand hover:text-brand-foreground"
          >
            {getContentValue("services.list.cta")}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section id="core-services" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-10 pt-8">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("services.core.eyebrow")}
        </span>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {getContentValue("services.core.headingPrefix")}
          <span className="text-brand">{getContentValue("services.core.headingBrand")}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {getContentValue("services.core.intro")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => (
            <article
              key={s.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    width={800}
                    height={600}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 3 ? "high" : "low"}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-lg leading-snug font-bold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                {s.slug ? (
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
                  >
                    {getContentValue("services.card.cta")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <Link
                    to="/contact"
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
                  >
                    {getContentValue("services.card.cta")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <TechnologyPartners />

      <ContactCta />
    </main>
  );
}
