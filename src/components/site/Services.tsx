import { Link } from "@tanstack/react-router";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { StaggerCards, type StaggerCardItem } from "@/components/motion/StaggerCards";
import accountancy from "@/assets/acc-accountancy.jpg";
import tax from "@/assets/acc-tax.jpg";
import startup from "@/assets/acc-startup.jpg";
import other from "@/assets/acc-other.jpg";
import bridge from "@/assets/acc-bridge.jpg";

const services: StaggerCardItem[] = [
  {
    id: "accountancy",
    label: "Chartered Accountancy",
    image: accountancy,
    caption: "Annual accounts that tell your story",
  },
  {
    id: "tax",
    label: "Taxation Services",
    image: tax,
    caption: "Minimise tax, stay compliant",
  },
  {
    id: "startup",
    label: "Business Start Up",
    image: startup,
    caption: "The right structure from day one",
  },
  {
    id: "other",
    label: "Other Services",
    image: other,
    caption: "Payroll, VAT & cloud bookkeeping",
  },
  {
    id: "advisory",
    label: "Business Advisory",
    image: bridge,
    caption: "Personal & corporate tax planning",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Our Services</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to run <span className="text-brand">smarter finances</span>.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          From annual accounts and tax planning to payroll bureau, auto-enrolment, VAT, cloud
          bookkeeping and specialist work such as R&amp;D tax — we cover every stage of your
          financial year.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-brand hover:bg-brand-strong"
        >
          View all services
        </Link>
      </ScrollAnimate>

      <div className="mt-12">
        <StaggerCards items={services} />
      </div>
    </section>
  );
}
