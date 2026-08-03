import bridge from "@/assets/acc-bridge.jpg";
import { MotionButton } from "@/components/motion/MotionButton";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ScrollAnimate>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
            <Parallax offset={30}>
              <img
                src={bridge}
                alt="Tower Bridge over the River Thames at dusk"
                width={1200}
                height={900}
                loading="lazy"
                className="h-[320px] w-full scale-110 object-cover sm:h-[420px]"
              />
            </Parallax>
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-3xl border border-white/20 bg-ink/70 px-5 py-3 backdrop-blur-md">
              <p className="font-display text-3xl font-semibold text-brand">12</p>
              <p className="text-xs text-surface/70">Years of expertise</p>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            We are Alpha Digi AI
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A new firm led by a Big 4 experienced <span className="text-brand">ICAEW member</span>.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Looking for a reliable, forward-thinking accountant? With 12 years of experience handling
            listed, non-listed and charity clients, we proudly support new businesses, charity trusts
            and individuals through ongoing change. Whether you're launching a new venture or managing
            an established company, our team guides you every step of the way.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            It's not just about numbers — it's about knowing your business inside out and helping it
            grow.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <MotionButton>More about us</MotionButton>
            <MotionButton variant="ghost">Make an appointment</MotionButton>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
