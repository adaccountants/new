import { MotionButton } from "@/components/motion/MotionButton";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink">
      <ScrollAnimate className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-surface">
              Let's build something <span className="text-brand">lasting</span>.
            </p>
            <p className="mt-2 max-w-md text-sm text-surface/60">
              Tell us about your project and our team will get back to you within one working day.
            </p>
          </div>
          <MotionButton size="lg">Get in touch</MotionButton>
        </div>
        <p className="mt-12 text-xs text-surface/40">
          © {new Date().getFullYear()} C&amp;A Construction. All rights reserved.
        </p>
      </ScrollAnimate>
    </footer>
  );
}
