import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import accountant from "@/assets/accountant.webp";
import accountantMobile from "@/assets/accountant-mobile.webp";
import { Parallax } from "@/components/motion/Parallax";
import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft cream wash */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-brand/8 via-background to-background" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-10 pb-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pt-16">
        <div className="relative z-10 max-w-[62%] sm:max-w-[58%] lg:max-w-none">
          <ScrollAnimate y={20} duration={0.5}>
            <span className="inline-flex rounded-full bg-brand/15 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.2em] text-brand-strong uppercase sm:px-5 sm:text-xs">
              Chartered Accountants · London
            </span>
          </ScrollAnimate>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="mt-6 font-display text-[2rem] leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[4.2rem]"
          >
            <span className="text-brand">Chartered Accountants</span>{" "}
            <span className="lg:block">for Individuals and Business Owners.</span>
          </motion.h1>

          <ScrollAnimate delay={0.2} y={24} className="mt-7 max-w-lg">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Welcome to Alpha Digi AI Accountants — combining chartered expertise with AI-driven
              insight so you can make smarter financial decisions every day.
            </p>
          </ScrollAnimate>

          <ScrollAnimate
            delay={0.3}
            y={24}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
          >
            <Link
              to="/services"
              className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-brand px-8 text-base font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
            >
              See Our Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-13 items-center justify-center gap-3 px-0 text-base font-medium tracking-tight text-foreground"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card">
                <Phone className="h-4 w-4 text-brand-strong" />
              </span>
              Contact Us
            </Link>
          </ScrollAnimate>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 w-[58%] sm:right-0 sm:w-[52%] lg:pointer-events-auto lg:relative lg:inset-auto lg:w-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="pointer-events-none absolute inset-x-0 top-[18%] bottom-[4%] rounded-full bg-brand/20 blur-[2px] sm:inset-x-6 lg:top-[12%] lg:bottom-0"
          />
          <Parallax offset={26}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
            >
              <picture>
                <source media="(min-width: 1024px)" srcSet={accountant} type="image/webp" />
                <img
                  src={accountantMobile}
                  alt="Smiling chartered accountant in a navy suit pointing upwards"
                  width={512}
                  height={768}
                  fetchPriority="high"
                  decoding="async"
                  className="relative mx-auto block h-[380px] w-full max-w-full object-contain object-bottom sm:h-[520px] lg:h-[620px] lg:w-auto"
                />
              </picture>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
