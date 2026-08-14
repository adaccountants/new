import { Link } from "@tanstack/react-router";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";
import { getSettings } from "@/lib/site-settings-data";

const footerNav = [
  { key: "home.nav.home", to: "/" as const },
  { key: "home.nav.about", to: "/about" as const },
  { key: "home.nav.services", to: "/services" as const },
  { key: "home.nav.blog", to: "/blog" as const },
  { key: "home.nav.knowledge", to: "/knowledge" as const },
  { key: "home.nav.careers", to: "/careers" as const },
  { key: "home.nav.contact", to: "/contact" as const },
];

function interpolateSettings(template: string, settings: ReturnType<typeof getSettings>) {
  return template
    .replaceAll("{phone}", settings.phone)
    .replaceAll("{email}", settings.email)
    .replaceAll("{hours}", settings.hours);
}

export function SiteFooter() {
  useCms();
  const settings = getSettings();
  const headingPrefix = getContentValue("home.footer.headingPrefix");
  const headingBrand = getContentValue("home.footer.headingBrand");
  const headingSuffix = getContentValue("home.footer.headingSuffix");
  const intro = interpolateSettings(getContentValue("home.footer.intro"), settings);
  const cta = getContentValue("home.footer.cta");
  const links = footerNav.map((link) => ({ ...link, label: getContentValue(link.key) }));

  return (
    <footer className="border-t border-border/60 bg-ink">
      <ScrollAnimate className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-surface">
              {headingPrefix}
              <span className="text-brand">{headingBrand}</span>
              {headingSuffix}
            </p>
            <p className="mt-2 max-w-md text-sm text-surface/60">{intro}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-surface/70">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
              {settings.socials
                .filter((social) => social.url)
                .map((social) => (
                  <li key={`${social.platform}-${social.url}`}>
                    <a
                      href={social.url}
                      className="hover:text-brand"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.platform || social.url}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-13 items-center justify-center rounded-full bg-brand px-8 text-base font-medium tracking-tight text-brand-foreground shadow-brand hover:bg-brand-strong"
          >
            {cta}
          </Link>
        </div>
        <p className="mt-12 text-xs text-surface/40">
          © {new Date().getFullYear()} {settings.footerText}
        </p>
      </ScrollAnimate>
    </footer>
  );
}
