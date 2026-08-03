import { HardHat, Building2, Hammer } from "lucide-react";
import { MotionButton } from "@/components/motion/MotionButton";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";

const features = [
  {
    icon: HardHat,
    title: "Dynamic Team of Engineers",
    body: "Partner with a dynamic team of over 1,500 skilled professionals, each contributing their own expertise and innovative ideas to every project.",
  },
  {
    icon: Building2,
    title: "Top Quality Buildings",
    body: "Gain access to a vibrant workforce of dedicated specialists, all of whom bring diverse skills and insights to the table.",
  },
  {
    icon: Hammer,
    title: "Best Tools On the Market",
    body: "Collaborate with a passionate team of committed experts, each offering unique abilities and perspectives that enhance our projects.",
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <Parallax offset={28}>
        <ScrollAnimate>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 shadow-soft sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-surface sm:text-4xl">
                Why choose <span className="text-brand">C&amp;A</span>?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-surface/70">
                We aim to deliver exceptional solutions tailored to our clients' diverse needs, with
                craftsmanship that lasts decades.
              </p>
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
              <MotionButton>Start A Project</MotionButton>
              <p className="text-sm text-surface/60">
                The #1 leading company in the market, providing top-notch services.
              </p>
            </ScrollAnimate>
          </div>
        </ScrollAnimate>
      </Parallax>
    </section>
  );
}
