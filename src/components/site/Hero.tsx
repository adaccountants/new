import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import accountantAsset from "@/assets/accountant.png.asset.json";
import { MotionButton } from "@/components/motion/MotionButton";
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
            <MotionButton size="lg" className="gap-3">
              See Our Services
              <ArrowRight className="h-4 w-4" />
            </MotionButton>
            <MotionButton variant="ghost" size="lg" className="gap-3 px-0 text-foreground">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card">
                <Phone className="h-4 w-4 text-brand-strong" />
              </span>
              Contact Us
            </MotionButton>
          </ScrollAnimate>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] pt-6 pb-2 sm:w-[52%] lg:pointer-events-auto lg:relative lg:inset-auto lg:w-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="pointer-events-none absolute inset-x-0 top-[26%] bottom-[10%] rounded-full bg-brand/20 blur-[2px] sm:inset-x-6 lg:top-[12%] lg:bottom-0"
          />
          <Parallax offset={26}>
            <motion.img
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
              src={accountantAsset.url}
              alt="Smiling chartered accountant in a navy suit pointing upwards"
              width={1024}
              height={1536}
              className="relative mx-auto h-full w-full object-contain object-bottom lg:h-[620px] lg:w-auto"
            />
          </Parallax>
        </div>
      </div>

    </section>
  );
}
