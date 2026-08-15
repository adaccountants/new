import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";

export function Hero() {
  useCms();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const eyebrow = getContentValue("home.hero.eyebrow");
  const headingBrand = getContentValue("home.hero.headingBrand");
  const headingRest = getContentValue("home.hero.headingRest");
  const intro = getContentValue("home.hero.intro");
  const ctaPrimary = getContentValue("home.hero.ctaPrimary");
  const ctaSecondary = getContentValue("home.hero.ctaSecondary");

  const [playing, setPlaying] = useState(false);

  // Autoplay + iOS fallback: play on first touch/click anywhere on the page
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    video.muted = true;

    const tryPlay = () => {
      if (!document.hidden) void video.play().catch(() => {});
    };

    tryPlay();

    const onFirstGesture = () => {
      void video.play().catch(() => {});
    };
    document.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    document.addEventListener("click", onFirstGesture, { once: true });
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      document.removeEventListener("touchstart", onFirstGesture);
      document.removeEventListener("click", onFirstGesture);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [reduced]);

  return (
    <>
      {/* ── Full-screen looping video ── */}
      <section className="relative w-full bg-black md:h-screen md:overflow-hidden">
        <video
          ref={videoRef}
          className={`w-full h-auto block md:h-full md:w-full md:object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop={!reduced}
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Transparent overlay — prevents any native play button interaction */}
        <div className="absolute inset-0" aria-hidden="true" />
      </section>

      {/* ── Original hero text section ── */}
      <section className="relative overflow-hidden">
        {/* soft cream wash */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-brand/8 via-background to-background" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-8 px-6 pt-10 pb-16 lg:px-12 lg:pt-16 lg:pb-20">
          <div className="relative z-10 max-w-xl lg:max-w-2xl">
            <ScrollAnimate y={20} duration={0.5}>
              <span className="inline-flex rounded-full bg-brand/15 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.2em] text-brand-strong uppercase sm:px-5 sm:text-xs">
                {eyebrow}
              </span>
            </ScrollAnimate>

            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
              className="mt-6 font-display text-[2rem] leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[4.2rem]"
            >
              <span className="text-brand uppercase">{headingBrand}</span>{" "}
              <span className="lg:block">{headingRest}</span>
            </motion.h1>

            <ScrollAnimate delay={0.2} y={24} className="mt-7 max-w-lg">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
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
                {ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-13 items-center justify-center gap-3 px-0 text-base font-medium tracking-tight text-foreground"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card">
                  <Phone className="h-4 w-4 text-brand-strong" />
                </span>
                {ctaSecondary}
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </>
  );
}
