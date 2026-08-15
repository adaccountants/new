import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";
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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

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
        <ScrollAnimate className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
        </ScrollAnimate>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {partners.map((partner) => (
            <motion.article
              key={partner.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="group flex h-full flex-col rounded-[2rem] border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:border-brand/50 hover:shadow-brand/15 sm:p-8"
            >
              <div className="mb-6 flex h-16 w-full items-center justify-center overflow-hidden">
                <motion.img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={176}
                  height={40}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="h-10 w-auto max-w-[11rem] object-contain object-center transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                {partner.name}
              </h3>
              <p className="mt-2 mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {partner.description}
              </p>
              <Link
                to="/contact"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-all duration-300 group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-brand"
              >
                {cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
