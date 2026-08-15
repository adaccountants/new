import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";

const partners = [
  {
    name: "Xero",
    logo: "/partners/xero.svg",
    description:
      "Cloud accounting software that simplifies bookkeeping, invoicing, bank reconciliation, reporting, and financial management.",
  },
  {
    name: "SmartSearch",
    logo: "/partners/smartsearch.svg",
    description:
      "Digital identity verification, AML compliance, and Know Your Customer (KYC) solutions for secure client onboarding.",
  },
  {
    name: "AccountsIQ",
    logo: "/partners/accountsiq.svg",
    description:
      "Advanced cloud financial management software providing automation, reporting, consolidation, and business insights.",
  },
  {
    name: "Sage",
    logo: "/partners/sage.svg",
    description:
      "Business accounting, payroll, and financial management software designed for growing businesses.",
  },
] as const;

export function TechnologyPartners() {
  useCms();
  const eyebrow = getContentValue("services.partners.eyebrow") || "Integrations";
  const heading = getContentValue("services.partners.heading") || "Accounting Technology Partners";
  const intro =
    getContentValue("services.partners.intro") ||
    "We work with trusted cloud accounting and compliance platforms to deliver secure, efficient, and digital-first accounting services for businesses, charities, and individuals.";
  const cta = getContentValue("services.card.cta") || "Learn More";

  return (
    <section id="partners" className="scroll-mt-28 bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <article
              key={partner.name}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              <div className="mb-6 flex h-16 w-full items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={176}
                  height={40}
                  className="h-10 w-auto max-w-[11rem] object-contain object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
              <p className="mt-2 mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {partner.description}
              </p>
              <Link
                to="/contact"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground"
              >
                {cta}
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
