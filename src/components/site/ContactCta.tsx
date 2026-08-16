import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";
import { getPhoneHref, getSettings } from "@/lib/site-settings-data";

export function ContactCta() {
  useCms();
  const settings = getSettings();
  const heading = getContentValue("home.cta.heading");
  const contactButton = getContentValue("home.cta.contactButton");

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 text-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={getPhoneHref(settings.phone)}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
          >
            <Phone className="size-4" />
            {settings.phone}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            {contactButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
