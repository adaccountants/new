import { Link } from "@tanstack/react-router";
import { LineChart, Award, HeartHandshake } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";
import { getSettings } from "@/lib/site-settings-data";

export function WhyChoose() {
  useCms();
  const settings = getSettings();
  const eyebrow = getContentValue("home.why.eyebrow");
  const headingPrefix = getContentValue("home.why.headingPrefix");
  const headingBrand = getContentValue("home.why.headingBrand");
  const headingSuffix = getContentValue("home.why.headingSuffix");
  const intro = getContentValue("home.why.intro");
  const cta = getContentValue("home.why.cta");
  const callPrefix = getContentValue("home.why.callPrefix");
  const features = [
    {
      icon: LineChart,
      title: getContentValue("home.why.feature1.title"),
      body: getContentValue("home.why.feature1.body"),
    },
    {
      icon: Award,
      title: getContentValue("home.why.feature2.title"),
      body: getContentValue("home.why.feature2.body"),
    },
    {
      icon: HeartHandshake,
      title: getContentValue("home.why.feature3.title"),
      body: getContentValue("home.why.feature3.body"),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <Parallax offset={28}>
        <ScrollAnimate>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 shadow-soft sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-surface sm:text-4xl">
                {headingPrefix}
                <span className="text-brand">{headingBrand}</span>
                {headingSuffix}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-surface/70">{intro}</p>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {features.map((feature, index) => (
                <ScrollAnimate
                  key={feature.title}
                  delay={index * 0.15}
                  y={32}
                  className={index === 1 ? "md:mt-8" : index === 2 ? "md:mt-16" : undefined}
                >
                  <feature.icon className="h-8 w-8 text-brand" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-base font-semibold text-surface">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-surface/65">{feature.body}</p>
                </ScrollAnimate>
              ))}
            </div>

            <ScrollAnimate
              delay={0.2}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
              >
                {cta}
              </Link>
              <p className="text-sm text-surface/60">
                {callPrefix} <span className="text-surface">{settings.phone}</span> — {settings.hours}.
              </p>
            </ScrollAnimate>
          </div>
        </ScrollAnimate>
      </Parallax>
    </section>
  );
}
