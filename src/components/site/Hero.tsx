import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { EASE_OUT, ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useContentValue } from "@/lib/cms-context";

export function Hero() {
  const getContentValue = useContentValue();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const eyebrow = getContentValue("home.hero.eyebrow");
  const headingBrand = getContentValue("home.hero.headingBrand");
  const headingRest = getContentValue("home.hero.headingRest");
  const intro = getContentValue("home.hero.intro");
  const ctaPrimary = getContentValue("home.hero.ctaPrimary");
  const ctaSecondary = getContentValue("home.hero.ctaSecondary");
  const videoUrl = getContentValue("home.hero.videoUrl");

  // Autoplay + iOS fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    video.muted = true;

    const tryPlay = () => {
      if (!document.hidden) void video.play().catch(() => {});
    };

    tryPlay();

    const onFirstGesture = () => void video.play().catch(() => {});
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
    <section
      className="relative overflow-hidden"
      style={{ background: "oklch(0.985 0.005 95)" }}
      aria-label="Hero"
    >
      {/* Subtle warm gradient wash at the top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--brand) 6%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 pt-0 pb-14 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:pt-5 lg:pb-16">

        {/* ── LEFT: Text content ── */}
        <div className="relative z-10 order-last w-full lg:order-first lg:w-[47%] xl:w-[46%]">

          <ScrollAnimate y={20} duration={0.5}>
            <span className="inline-flex items-center rounded-full bg-brand/15 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.2em] text-brand-strong uppercase sm:px-5 sm:text-xs">
              {eyebrow}
            </span>
          </ScrollAnimate>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="mt-6 font-display font-bold tracking-tight"
            style={{ lineHeight: 1.05 }}
          >
            <span
              className="block text-brand uppercase"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}
            >
              {headingBrand}
            </span>
            <span
              className="block text-foreground"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}
            >
              {headingRest}
            </span>
          </motion.h1>

          <ScrollAnimate delay={0.2} y={24} className="mt-7 max-w-lg">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro}
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

        {/* ── RIGHT: Video container ── */}
        <div
          className="relative order-first -mx-6 w-[calc(100%+3rem)] lg:mx-0 lg:order-last lg:w-[50%] xl:w-[51%]"
          style={{ flexShrink: 0 }}
        >
          {/* 16:9 aspect ratio wrapper */}
          <div
            className="relative w-full overflow-hidden rounded-none lg:rounded-[18px]"
            style={{
              aspectRatio: "16 / 9",
              boxShadow:
                "0 32px 80px -20px oklch(0.2 0.02 80 / 0.35), 0 0 0 1px oklch(0.88 0.015 85 / 0.6)",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop={!reduced}
              playsInline
              preload="auto"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Decorative subtle glow behind the video */}
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[30px] opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, color-mix(in oklab, var(--brand) 30%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
