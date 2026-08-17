import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";

import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCmsSnapshot, useContentValue } from "@/lib/cms-context";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Testimonials() {
  const getContentValue = useContentValue();
  const { testimonials } = useCmsSnapshot();
  const listRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const inView = useInView(listRef, { once: true, amount: 0.2 });
  const listAnimate = !hydrated || inView ? "visible" : "hidden";
  const eyebrow = getContentValue("home.testimonials.eyebrow");
  const headingPrefix = getContentValue("home.testimonials.headingPrefix");
  const headingBrand = getContentValue("home.testimonials.headingBrand");
  const headingSuffix = getContentValue("home.testimonials.headingSuffix");
  const cta = getContentValue("home.testimonials.cta");

  return (
    <section id="testimonials" className="overflow-x-hidden py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingPrefix}
          <span className="text-brand">{headingBrand}</span>
          {headingSuffix}
        </h2>
      </ScrollAnimate>

      <motion.div
        ref={listRef}
        variants={container}
        initial={false}
        animate={listAnimate}
        className="mx-auto mt-12 grid w-full max-w-7xl gap-6 px-6 md:grid-cols-3 lg:px-12"
      >
        {testimonials.map((t) => (
          <motion.figure
            key={t.id}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-soft"
          >
            <Quote className="h-7 w-7 text-brand" strokeWidth={1.5} />
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
              “{t.body}”
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display text-sm font-semibold">{t.title}</p>
              {t.subtitle ? <p className="text-xs text-muted-foreground">{t.subtitle}</p> : null}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <ScrollAnimate
        delay={0.1}
        className="mt-10 flex flex-col items-center gap-3 px-6 text-center"
      >
        <Link
          to="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
        >
          {cta}
        </Link>
      </ScrollAnimate>
    </section>
  );
}
