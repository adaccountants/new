import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-secondary/60 px-6 py-12 text-center shadow-soft">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Any questions? Speak to our team today.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:02039165680"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
          >
            <Phone className="size-4" />
            020 3916 5680
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
