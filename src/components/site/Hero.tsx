import { motion } from "framer-motion";
import heroImage from "@/assets/acc-hero.jpg";
import { MotionButton } from "@/components/motion/MotionButton";
import { Parallax } from "@/components/motion/Parallax";
import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-12 pb-8 lg:px-12">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.35fr]">
        <ScrollAnimate y={24} className="max-w-xs">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Based in <span className="font-semibold text-foreground">London</span>, we are an ICAEW
            chartered accountancy practice built for modern business owners.
          </p>
        </ScrollAnimate>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="font-display text-[2.75rem] leading-[0.95] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            <span className="text-brand">Chartered</span> Accountants for
            <br />
            Individuals and <span className="text-brand">Business Owners</span>
          </motion.h1>

          <ScrollAnimate
            delay={0.15}
            y={24}
            className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3">
              <MotionButton>See Our Services</MotionButton>
              <MotionButton variant="ghost">Contact Us</MotionButton>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Welcome to Alpha Digi AI Accountants — combining chartered expertise with AI-driven
              insight so you can make smarter financial decisions every day.
            </p>
          </ScrollAnimate>
        </div>
      </div>

      <ScrollAnimate delay={0.1} className="mt-10">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
          <Parallax offset={40}>
            <img
              src={heroImage}
              alt="Canary Wharf financial district skyline at golden hour"
              width={1600}
              height={1000}
              className="h-[320px] w-full scale-110 object-cover sm:h-[460px] lg:h-[560px]"
            />
          </Parallax>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/20 bg-ink/70 px-4 py-2 backdrop-blur-md">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-6 w-6 rounded-full border border-ink bg-brand/80"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-surface">12 Years of expertise</span>
          </div>

          <div className="pointer-events-none absolute right-5 bottom-5 rounded-full border border-white/20 bg-ink/70 px-4 py-2 text-xs font-medium text-surface backdrop-blur-md">
            ICAEW Chartered Members
          </div>
        </div>
      </ScrollAnimate>
    </section>
  );
}
