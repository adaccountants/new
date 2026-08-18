import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { getCards, parseCareerBody } from "@/lib/cards-data";
import { useContentValue } from "@/lib/cms-context";
import { pageSeoHead } from "@/lib/cms-load";

export const Route = createFileRoute("/careers")({
  loader: async () => {
    const roles = (await getCards("careers")).filter((card) => card.published);
    return { roles };
  },
  head: ({ matches }) => ({
    meta: pageSeoHead("careers", matches),
  }),
  component: CareersPage,
});

function CareersPage() {
  const { roles } = Route.useLoaderData();
  const getContentValue = useContentValue();
  const culture = [1, 2, 3, 4].map((n) => ({
    title: getContentValue(`careers.culture.${n}.title`),
    desc: getContentValue(`careers.culture.${n}.body`),
  }));
  const values = [1, 2, 3, 4].map((n) => getContentValue(`careers.values.${n}`));

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("careers.eyebrow")}
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {getContentValue("careers.headingPrefix")}
          <span className="text-brand">{getContentValue("careers.headingBrand")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {getContentValue("careers.intro")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("careers.culture.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {getContentValue("careers.culture.heading")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          {getContentValue("careers.culture.intro")}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {culture.map((c) => (
            <article
              key={c.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="mb-4 block h-1.5 w-12 rounded-full bg-brand" />
              <h3 className="text-base font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
              <span className="inline-block h-7 w-1.5 rounded-full bg-brand" />
              {getContentValue("careers.values.heading")}
            </h2>
            <p className="mt-4 text-muted-foreground">{getContentValue("careers.values.intro")}</p>
            <ul className="mt-6 space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/50 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              {getContentValue("careers.digital.heading")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {getContentValue("careers.digital.body")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("careers.pathways.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {getContentValue("careers.pathways.heading")}
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {roles.map((r) => {
            const { paragraphs, ideals } = parseCareerBody(r.body);
            return (
              <article
                key={r.id}
                className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
              >
                <h3 className="text-xl font-bold text-foreground">{r.title}</h3>
                {r.subtitle ? (
                  <p className="mt-1 text-sm font-semibold text-brand">{r.subtitle}</p>
                ) : null}
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {ideals.length > 0 ? (
                  <>
                    <p className="mt-5 text-sm font-semibold text-foreground">
                      {getContentValue("careers.role.idealLabel")}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {ideals.map((i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <Link
                  to="/contact"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
                >
                  {getContentValue("careers.role.cta")}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
