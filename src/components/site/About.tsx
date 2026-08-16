import { Link } from "@tanstack/react-router";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useContentValue } from "@/lib/cms-context";

export function About() {
  const getContentValue = useContentValue();
  const imageUrl = getContentValue("home.about.imageUrl") || "/cms/acc-bridge.jpg";
  const imageAlt = getContentValue("home.about.imageAlt") || "Tower Bridge over the River Thames at dusk";
  const yearsValue = getContentValue("home.about.yearsValue");
  const yearsLabel = getContentValue("home.about.yearsLabel");
  const eyebrow = getContentValue("home.about.eyebrow");
  const headingPrefix = getContentValue("home.about.headingPrefix");
  const headingBrand = getContentValue("home.about.headingBrand");
  const headingSuffix = getContentValue("home.about.headingSuffix");
  const p1 = getContentValue("home.about.p1");
  const p2 = getContentValue("home.about.p2");
  const ctaPrimary = getContentValue("home.about.ctaPrimary");
  const ctaSecondary = getContentValue("home.about.ctaSecondary");

  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ScrollAnimate>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
            <Parallax offset={30}>
              <img
                src={imageUrl}
                alt={imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-[320px] w-full scale-110 object-cover sm:h-[420px]"
              />
            </Parallax>
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-3xl border border-white/20 bg-ink/70 px-5 py-3 backdrop-blur-md">
              <p className="font-display text-3xl font-semibold text-brand">{yearsValue}</p>
              <p className="text-xs text-surface/70">{yearsLabel}</p>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {headingPrefix}
            <span className="text-brand">{headingBrand}</span>
            {headingSuffix}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p1}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p2}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/about"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
            >
              {ctaPrimary}
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground"
            >
              {ctaSecondary}
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
