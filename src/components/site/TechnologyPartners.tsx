import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { getCards } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";

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
  const partners = getCards("partnership").filter((card) => card.published);
  const eyebrow = getContentValue("services.partners.eyebrow");
  const heading = getContentValue("services.partners.heading");
  const intro = getContentValue("services.partners.intro");
  const cta = getContentValue("services.card.cta");

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
              key={partner.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="group flex h-full flex-col rounded-[2rem] border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:border-brand/50 hover:shadow-brand/15 sm:p-8"
            >
              <div className="mb-6 flex h-16 w-full items-center justify-center overflow-hidden">
                {partner.imageUrl ? (
                  <motion.img
                    src={partner.imageUrl}
                    alt={`${partner.title} logo`}
                    width={176}
                    height={40}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="h-10 w-auto max-w-[11rem] object-contain object-center transition-transform"
                  />
                ) : null}
              </div>
              <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                {partner.title}
              </h3>
              <p className="mt-2 mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {partner.body}
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
