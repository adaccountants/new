import { MotionButton } from "@/components/motion/MotionButton";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-ink">
      <ScrollAnimate className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-surface">
              Looking to help your business <span className="text-brand">grow</span>?
            </p>
            <p className="mt-2 max-w-md text-sm text-surface/60">
              Get a free consultation today. Call 020 3916 5680 or email info@adaaccountants.uk —
              Mon–Fri, 9AM–5PM.
            </p>
          </div>
          <MotionButton size="lg">Contact Us</MotionButton>
        </div>
        <p className="mt-12 text-xs text-surface/40">
          © {new Date().getFullYear()} Alpha Digi AI Accountants. ICAEW Chartered Accountants.
        </p>
      </ScrollAnimate>
    </footer>
  );
}
