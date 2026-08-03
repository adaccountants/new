import { LineChart, Award, HeartHandshake } from "lucide-react";
import { MotionButton } from "@/components/motion/MotionButton";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";

const features = [
  {
    icon: LineChart,
    title: "Bringing The Numbers To Life",
    body: "Every annual account tells a story of your business. We explain your business journey and help you plan the next steps to achieve your goals.",
  },
  {
    icon: Award,
    title: "Expertise",
    body: "Decades of experience, knowledge and expertise across the UK — a well-established, trusted chartered accountancy firm you can rely on.",
  },
  {
    icon: HeartHandshake,
    title: "Personable Service",
    body: "Friendly, dedicated advisors who take the time to know your business — nurturing client relationships is at the heart of how we work.",
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <Parallax offset={28}>
        <ScrollAnimate>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 shadow-soft sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                What Makes Us Different?
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-surface sm:text-4xl">
                Expertise you can trust, <span className="text-brand">technology</span> you'll love.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-surface/70">
                We take pride in building strong relationships with every client — understanding
                your business and goals so we can offer tailored, proactive advice.
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
              <MotionButton>Speak to our team today</MotionButton>
              <p className="text-sm text-surface/60">
                Call us now on <span className="text-surface">020 3916 5680</span> — Mon–Fri, 9AM–5PM.
              </p>
            </ScrollAnimate>
          </div>
        </ScrollAnimate>
      </Parallax>
    </section>
  );
}
