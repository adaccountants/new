import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Careers", to: "/careers" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-surface">
              Looking to help your business <span className="text-brand">grow</span>?
            </p>
            <p className="mt-2 max-w-md text-sm text-surface/60">
              Get a free consultation today. Call 020 3916 5680 or email info@adaaccountants.uk —
              Mon–Fri, 9AM–5PM.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-surface/70">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-13 items-center justify-center rounded-full bg-brand px-8 text-base font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
          >
            Contact Us
          </Link>
        </div>
        <p className="mt-12 text-xs text-surface/40">
          © {new Date().getFullYear()} Alpha Digi AI Accountants. ICAEW Chartered Accountants.
        </p>
      </div>
    </footer>
  );
}
