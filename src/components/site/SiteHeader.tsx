import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Services", to: "/services" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Careers", to: "/careers" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="hidden border-b border-border/50 md:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 text-xs text-muted-foreground lg:px-12">
          <div className="flex items-center gap-4">
            <a href="tel:02039165680" className="hover:text-foreground">
              020 3916 5680
            </a>
            <a href="mailto:info@adaaccountants.uk" className="hover:text-foreground">
              info@adaaccountants.uk
            </a>
          </div>
          <span>Mon – Fri, 9AM – 5PM</span>
        </div>
      </div>

      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Alpha<span className="text-brand">Digi</span>AI
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.to;
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-sm transition-colors hover:text-foreground ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden h-9 items-center justify-center rounded-full bg-brand px-4 text-sm font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong sm:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-3">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
