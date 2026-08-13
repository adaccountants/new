import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Alpha Digi AI Accountants" },
      {
        name: "description",
        content:
          "Join a chartered accountancy firm built on AI-assisted workflows. Roles for experienced ACA/ACCA/CTA professionals, graduates and apprentices across the UK.",
      },
      { property: "og:title", content: "Join Our Team | Alpha Digi Careers" },
      {
        property: "og:description",
        content:
          "Work at the intersection of chartered accountancy and AI — flexible working, modern tools and funded ICAEW pathways.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const culture = [
  {
    title: "Flexible Working",
    desc: "Hybrid and remote-first setup that supports a healthy work-life balance.",
  },
  {
    title: "Modern Tools",
    desc: "Work with advanced cloud platforms, automated workflows, and AI assistants.",
  },
  {
    title: "Growth Path",
    desc: "Defined professional growth plans, funded training, and ICAEW pathways.",
  },
  {
    title: "Inclusive Value",
    desc: "A warm, diverse team environment where every voice is heard and valued.",
  },
];

const values = [
  "Trust & Confidentiality at the core.",
  "AI-assisted efficiency, human-centric advisory.",
  "Commitment to continuous training and compliance.",
  "Responsive, direct client communication.",
];

const roles = [
  {
    title: "Experienced Professionals",
    meta: "UK / Hybrid · Full-time",
    body: [
      "Are you a qualified Chartered Accountant, Tax Advisor, or Client Manager looking for a modern firm? Bring your expertise to Alpha Digi.",
      "You will lead client portfolios, architect AI integrations for custom ledgers, and provide high-value financial advisory services with absolute autonomy.",
    ],
    ideal: [
      "ACA / ACCA / CTA qualified professionals",
      "Senior Tax & VAT specialists",
      "Charity & Trust audit leaders",
    ],
  },
  {
    title: "Early Entry & Graduates",
    meta: "UK / Hybrid · Full-time / Apprenticeship",
    body: [
      "Kickstart your accounting career in a digital-first environment. If you are an apprentice, student, or recent graduate, we offer practical experience combined with support for your ACA/ACCA credentials.",
      "Learn modern cloud accounting methods alongside Big 4-trained mentors.",
    ],
    ideal: [
      "Graduates & apprentices",
      "AAT students / early trainees",
      "Aspiring fintech & tax specialists",
    ],
  },
];

function CareersPage() {
  return (
    <SiteShell>
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            Join Our Team
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Careers at <span className="text-brand">Alpha Digi</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Work at the intersection of chartered accountancy and AI. Help us shape the future of
            financial services for businesses across the UK.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">Our Culture</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Life at Alpha Digi AI Accountants
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            We believe in a culture of continuous learning, technology empowerment, and deep client
            support. At Alpha Digi, you won't just grind through spreadsheets — you will work with
            intelligent workflows that automate repetitive tasks, allowing you to focus on strategic
            client advisory and financial analysis.
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
                Our Values
              </h2>
              <p className="mt-4 text-muted-foreground">
                We are building an accounting firm where people thrive. By combining chartered rigour
                with digital speed, we ensure accuracy, clarity, and success.
              </p>
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
                Digital “WE” Philosophy
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                At Alpha Digi AI Accountants, we define Digital “WE” as the harmonious integration of
                human capability and digital intelligence. We do not use technology to replace human
                insight; instead, we use AI to enhance your output, streamline decision-making, and
                reduce repetitive administrative tasks. This allows our professionals to spend more
                time building meaningful client relationships and offering top-tier chartered advice.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">Career Pathways</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Find Your Place in Our Firm
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {roles.map((r) => (
              <article
                key={r.title}
                className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
              >
                <h3 className="text-xl font-bold text-foreground">{r.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand">{r.meta}</p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {r.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-foreground">Ideal for:</p>
                <ul className="mt-2 space-y-2">
                  {r.ideal.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
                >
                  Apply
                </Link>
              </article>
            ))}
          </div>
        </section>

        <ContactCta />
      </main>
    </SiteShell>
  );
}
