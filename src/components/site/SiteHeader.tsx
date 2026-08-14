import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";
import { getMailHref, getPhoneHref, getSettings } from "@/lib/site-settings-data";

const navKeys = [
  { key: "home.nav.home", to: "/" as const },
  { key: "home.nav.about", to: "/about" as const },
  { key: "home.nav.services", to: "/services" as const },
  { key: "home.nav.blog", to: "/blog" as const },
  { key: "home.nav.careers", to: "/careers" as const },
  { key: "home.nav.contact", to: "/contact" as const },
];

export function SiteHeader() {
  useCms();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const settings = getSettings();
  const brandPrefix = getContentValue("home.header.brandPrefix");
  const brandAccent = getContentValue("home.header.brandAccent");
  const brandSuffix = getContentValue("home.header.brandSuffix");
  const contactCta = getContentValue("home.header.contactCta");
  const links = navKeys.map((link) => ({ ...link, label: getContentValue(link.key) }));

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="hidden border-b border-border/50 md:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 text-xs text-muted-foreground lg:px-12">
          <div className="flex items-center gap-4">
            <a href={getPhoneHref(settings.phone)} className="hover:text-foreground">
              {settings.phone}
            </a>
            <a href={getMailHref(settings.email)} className="hover:text-foreground">
              {settings.email}
            </a>
          </div>
          <span>{settings.hours}</span>
        </div>
      </div>

      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {brandPrefix}
          <span className="text-brand">{brandAccent}</span>
          {brandSuffix}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.to;
            return (
              <li key={link.to}>
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
            {contactCta}
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
              <li key={link.to}>
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
