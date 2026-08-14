import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Alpha Digi AI Accountants" },
      {
        name: "description",
        content:
          "Speak to our chartered accountants on 020 3916 5680 or send us a message about accounting, payroll, tax, VAT and charity services.",
      },
      { property: "og:title", content: "Contact Alpha Digi AI Accountants" },
      {
        property: "og:description",
        content: "Get in touch with our UK chartered accountancy team today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
        <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          Contact
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Speak to our <span className="text-brand">team today.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Tell us a little about your business and we'll get back to you with tailored, practical
          advice.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "020 3916 5680", href: "tel:02039165680" },
            {
              icon: Mail,
              label: "Email",
              value: "hello@alphadigi.co.uk",
              href: "mailto:hello@alphadigi.co.uk",
            },
            { icon: MapPin, label: "Office", value: "London, United Kingdom" },
            { icon: Clock, label: "Hours", value: "Mon–Fri, 9:00–17:30" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-brand-foreground">
                <c.icon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-base font-semibold text-foreground hover:text-brand"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-base font-semibold text-foreground">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Send us a message
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-foreground">
              Name
              <input
                required
                name="name"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-normal outline-none focus:border-brand"
              />
            </label>
            <label className="text-sm font-semibold text-foreground">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-normal outline-none focus:border-brand"
              />
            </label>
            <label className="text-sm font-semibold text-foreground sm:col-span-2">
              Phone
              <input
                name="phone"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-normal outline-none focus:border-brand"
              />
            </label>
            <label className="text-sm font-semibold text-foreground sm:col-span-2">
              How can we help?
              <textarea
                required
                name="message"
                rows={5}
                className="mt-1.5 w-full resize-y rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-normal outline-none focus:border-brand"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong"
          >
            Send message
          </button>
          {sent ? (
            <p className="mt-4 text-sm font-semibold text-brand">
              Thanks — we've received your details and will be in touch shortly.
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
