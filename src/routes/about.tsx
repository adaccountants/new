import { createFileRoute } from "@tanstack/react-router";
import { Check, Quote } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Alpha Digi AI Accountants" },
      {
        name: "description",
        content:
          "Chartered accountants for over 12 years — ICAEW registered, HMRC agent, AI-driven solutions and personable service for listed, non-listed and charity clients.",
      },
      { property: "og:title", content: "About Alpha Digi AI Accountants" },
      {
        property: "og:description",
        content:
          "Modern accountancy, human at heart. Big 4 experienced ICAEW members supporting UK businesses, charities and trusts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const badges = [
  "ICAEW registered Firm",
  "HMRC registered agent",
  "AI driven solution",
  "Payroll and HMRC support",
  "Service with Care",
  "VAT and HMRC support",
];

const differences = [
  {
    title: "Bringing The Numbers To Life",
    desc: "Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.",
  },
  {
    title: "Expertise",
    desc: "Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.",
  },
  {
    title: "Personable Service",
    desc: "Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.",
  },
];

const testimonials = [
  {
    quote:
      "The team are brilliant. So welcoming and helpful, and they really took the time to understand what I needed. Everything was explained clearly.",
    name: "Louise N.",
    role: "",
  },
  {
    quote:
      "Their knowledge around arts and construction based industries has been an asset — along with brilliant tax and VAT advice.",
    name: "Antonia S.",
    role: "Artist, Curator and Facilitator",
  },
  {
    quote:
      "A safe pair of hands for all my statutory needs. Professional with a personal touch that makes them a pleasure to deal with.",
    name: "Phillip R.",
    role: "Databoss Ltd",
  },
];

function AboutPage() {
  return (
    <SiteShell>
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            About Us
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Modern accountancy, <span className="text-brand">human at heart.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-foreground">
            Chartered accountants for over 12 years.
          </p>
          <div className="mt-5 max-w-3xl space-y-4 text-muted-foreground">
            <p>
              As experienced chartered accountants, we've been proudly supporting businesses for over
              12 years. Whether you're launching a new venture or managing an established company, our
              expert team is here to guide you every step of the way.
            </p>
            <p>
              We take pride in building strong relationships with every client. By truly understanding
              your business and goals, we offer tailored support and proactive advice that helps you
              succeed. It's not just about numbers — it's about knowing your business inside out and
              helping it grow.
            </p>
            <p>
              New firm with 12 years of Big 4 experience; ICAEW members with experience handling
              listed, non-listed and charity clients.
            </p>
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
              Bringing The Numbers To Life
            </h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              From accountancy to start-up, our dedicated team helps you navigate financial and
              business processes with ease. Every annual account tells a story of your business, and
              we take pleasure in explaining that journey.
            </p>
            <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">Expertise</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The team's vast wealth of experience, knowledge and expertise has helped many
                  businesses. Our clients span the country — from West Yorkshire, across the North of
                  England, up to Scotland and down to London.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Personable Service</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Our friendly team is on hand to guide you through a range of accounting services.
                  Nurturing client relationships and getting to know you is an integral part of how we
                  work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
            What Makes Us Different?
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Expertise you can trust, technology you'll love.
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
          <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">Testimonials</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What our clients say.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col justify-between rounded-3xl border border-border bg-secondary/50 p-6"
              >
                <Quote className="size-7 text-brand" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">
                  {t.name}
                  {t.role ? ` · ${t.role}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
            We are ICAEW members, which means we have access to world-leading information resources,
            technical guidance, advisory services and local member networks.
          </p>
        </section>

        <ContactCta />
      </main>
    </SiteShell>
  );
}
