import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Clock3,
  Facebook,
  Instagram,
  Mail,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { useContentValue, useSettings } from "@/lib/cms-context";
import { getMailHref, getPhoneHref } from "@/lib/site-settings-data";

const navKeys = [
  { key: "home.nav.home", to: "/" as const },
  { key: "home.nav.about", to: "/about" as const },
  { key: "home.nav.services", to: "/services" as const },
  { key: "home.nav.blog", to: "/blog" as const },
  { key: "home.nav.knowledge", to: "/knowledge" as const },
  { key: "home.nav.careers", to: "/careers" as const },
  { key: "home.nav.contact", to: "/contact" as const },
];

function socialIcon(platform: string): ReactNode {
  const name = platform.trim().toLowerCase();
  const iconClass = "h-3.5 w-3.5";
  if (name.includes("linkedin")) return null;
  if (name.includes("facebook")) return <Facebook className={iconClass} aria-hidden />;
  if (name.includes("instagram")) return <Instagram className={iconClass} aria-hidden />;
  if (name.includes("youtube")) return <Youtube className={iconClass} aria-hidden />;
  if (name === "x" || name.includes("twitter")) return <Twitter className={iconClass} aria-hidden />;
  return null;
}

function TopInfoBar() {
  const settings = useSettings();
  const orderedSocials = settings.socials.filter((social) => social.url && !social.platform.toLowerCase().includes("linkedin"));

  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-3 overflow-hidden px-4 sm:h-[42px] sm:gap-6 sm:px-6 lg:px-12">
        <ul className="flex min-w-0 flex-nowrap items-center gap-3 text-[11px] leading-none font-medium tracking-[0.01em] sm:gap-5 sm:text-xs lg:gap-8">
          <li className="shrink-0">
            <a
              href={getPhoneHref(settings.phone)}
              className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-white/70" aria-hidden />
              <span>{settings.phone}</span>
            </a>
          </li>
          <li className="min-w-0">
            <a
              href={getMailHref(settings.email)}
              className="inline-flex max-w-[46vw] items-center gap-1.5 text-white/90 transition-colors hover:text-white sm:max-w-none"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-white/70" aria-hidden />
              <span className="truncate">{settings.email}</span>
            </a>
          </li>
          <li className="hidden shrink-0 sm:block">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <Clock3 className="h-3.5 w-3.5 text-white/70" aria-hidden />
              <span>{settings.hours}</span>
            </span>
          </li>
        </ul>

      </div>
    </div>
  );
}

export function SiteHeader() {
  const getContentValue = useContentValue();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const logoUrl = getContentValue("home.header.logoUrl") || "/cms/adai-logo.jpeg";
  const logoAlt = getContentValue("home.header.logoAlt") || "ADAi Chartered Accountants";
  const links = navKeys.map((link) => ({ ...link, label: getContentValue(link.key) }));

  return (
    <header className="sticky top-0 z-50">
      <TopInfoBar />
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            to="/"
            className="flex shrink-0 items-center focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="ADAi Chartered Accountants Home"
          >
            <img
              src={logoUrl}
              alt={logoAlt}
              height={56}
              className="h-14 w-auto max-w-[min(100%,12rem)] object-contain select-none"
            />
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
      </div>
    </header>
  );
}
