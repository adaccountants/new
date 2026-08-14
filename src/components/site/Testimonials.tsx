import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The team are brilliant. So welcoming and helpful, and they really took the time to understand what I needed. Everything was explained clearly.",
    name: "Louise N.",
  },
  {
    id: "t2",
    quote:
      "Their knowledge around arts and construction based industries has been an asset — along with brilliant tax and VAT advice.",
    name: "Antonia S.",
    role: "Artist, Curator and Facilitator",
  },
  {
    id: "t3",
    quote:
      "A safe pair of hands for all my statutory needs. Professional with a personal touch that makes them a pleasure to deal with.",
    name: "Phillip R.",
    role: "Databoss Ltd",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Testimonials</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What our <span className="text-brand">clients say</span>.
        </h2>
      </ScrollAnimate>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display text-sm font-semibold">{t.name}</p>
              {t.role ? <p className="text-xs text-muted-foreground">{t.role}</p> : null}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <ScrollAnimate
        delay={0.1}
        className="mt-10 flex flex-col items-center gap-3 px-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          We are ICAEW members — giving us access to world-leading resources, technical guidance and
          advisory services.
        </p>
        <Link
          to="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
        >
          Get a free consultation
        </Link>
      </ScrollAnimate>
    </section>
  );
}
