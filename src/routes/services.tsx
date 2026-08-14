import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ChevronUp, Phone } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import s1 from "@/assets/s1.jpg";
import s2 from "@/assets/s2.jpg";
import s3 from "@/assets/s3.jpg";
import s4 from "@/assets/s4.jpg";
import s5 from "@/assets/s5.jpg";
import s6 from "@/assets/s6.jpg";
import s7 from "@/assets/s7.jpg";
import s8 from "@/assets/s8.jpg";
import s9 from "@/assets/s9.jpg";
import s10 from "@/assets/s10.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Accounting & Compliance Services | Alpha Digi" },
      {
        name: "description",
        content:
          "Company formation, payroll, tax and VAT returns, audit, management accounts, charity and trust accounting, plus outsourced bookkeeping to India.",
      },
      { property: "og:title", content: "Accounting & Compliance Services" },
      {
        property: "og:description",
        content:
          "Ten core cloud accounting services for businesses, charities, trusts and individuals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", href: s1, as: "image" },
      { rel: "preload", href: s2, as: "image" },
      { rel: "preload", href: s3, as: "image" },
    ],
  }),
  component: ServicesPage,
});

const highlights = [
  "Listed and Non-Listed Company: Setup, Accounting & Governance",
  "Payroll & Payments",
  "Tax Return for Company and Individual",
  "VAT Return Filing",
  "Corporate Secretarial and Governance",
  "Non-Statutory Audit",
  "Management Accounts",
  "Independent Examination of Charity Accounts",
  "Trust / Charity Account: Setup, Accounting and Governance",
  "Outsourcing Accounts and Bookkeeping to India",
];

const services = [
  {
    title: "Listed & Non-Listed Companies",
    desc: "Company formation, bookkeeping, accounting, compliance and governance services.",
    img: s1,
  },
  {
    title: "Payroll & Payments",
    desc: "Payroll processing, employee payments, pension management and payroll compliance.",
    img: s2,
  },
  {
    title: "Tax Returns",
    desc: "Preparation and submission of company and personal tax returns.",
    img: s3,
  },
  {
    title: "VAT Return Filing",
    desc: "Preparation, review and submission of VAT returns with full compliance.",
    img: s4,
  },
  {
    title: "Corporate Secretarial & Governance",
    desc: "Companies House filings, statutory records, governance and compliance support.",
    img: s5,
  },
  {
    title: "Non-Statutory Audit",
    desc: "Independent financial review and reporting for organizations requiring non-statutory audits.",
    img: s6,
  },
  {
    title: "Management Accounts",
    desc: "Monthly and quarterly financial reporting to support informed business decisions.",
    img: s7,
  },
  {
    title: "Independent Examination of Charity Accounts",
    desc: "Professional examination and reporting of charity accounts in line with regulations.",
    img: s8,
  },
  {
    title: "Trust & Charity Accounting",
    desc: "Accounting, bookkeeping and governance support for trusts and charitable organizations.",
    img: s9,
  },
  {
    title: "Outsourcing Accounts & Bookkeeping to India",
    desc: "Secure, cloud-based accounting outsourcing that reduces costs while maintaining quality and compliance.",
    img: s10,
  },
];

function ServicesPage() {
  const [open, setOpen] = useState(true);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            Our Services
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Digital-First Cloud
            <br />
            <span className="text-brand">Accounting & Bookkeeping</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We help businesses, charities and individuals simplify accounting through cloud-based
            bookkeeping, taxation, payroll, governance and advisory services.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-strong hover:shadow-glow"
            >
              <Phone className="size-4" />
              Get in Touch
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#core-services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              Explore 10 Core Services
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
                Everything your finances need, in one place
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Cloud accounting and bookkeeping services designed for businesses, charities, trusts
                and individuals.
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
            View all services
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section id="core-services" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-10 pt-8">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          Our Services
        </span>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          10 Core <span className="text-brand">Services</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Cloud accounting and bookkeeping designed for businesses, charities, trusts and
          individuals.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={s.img}
                  alt={s.title}
                  width={800}
                  height={600}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index < 3 ? "high" : "low"}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-lg leading-snug font-bold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
                >
                  Learn More
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
