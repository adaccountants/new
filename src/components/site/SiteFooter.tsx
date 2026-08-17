import { Link } from "@tanstack/react-router";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { useContentValue, useSettings } from "@/lib/cms-context";
import { interpolateSettings } from "@/lib/site-settings-data";
import { getSocialIcon } from "@/lib/social-icons";

const footerNav = [
  { key: "home.nav.home", to: "/" as const },
  { key: "home.nav.about", to: "/about" as const },
  { key: "home.nav.services", to: "/services" as const },
  { key: "home.nav.blog", to: "/blog" as const },
  { key: "home.nav.knowledge", to: "/knowledge" as const },
  { key: "home.nav.careers", to: "/careers" as const },
  { key: "home.nav.contact", to: "/contact" as const },
];

const footerLegal = [
  { to: "/privacy-policy" as const, label: "Privacy Policy" },
  { to: "/terms" as const, label: "Terms of Use" },
  { to: "/cookie-policy" as const, label: "Cookie Policy" },
];

export function SiteFooter() {
  const getContentValue = useContentValue();
  const settings = useSettings();
  const headingPrefix = getContentValue("home.footer.headingPrefix");
  const headingBrand = getContentValue("home.footer.headingBrand");
  const headingSuffix = getContentValue("home.footer.headingSuffix");
  const intro = interpolateSettings(getContentValue("home.footer.intro"), settings);
  const cta = getContentValue("home.footer.cta");
  const icaewHref = getContentValue("home.footer.icaewHref") || "https://www.icaew.com";
  const icaewImageUrl = getContentValue("home.footer.icaewImageUrl") || "/cms/finalicaewlogo.jpeg";
  const icaewImageAlt = getContentValue("home.footer.icaewImageAlt") || "ICAEW Chartered Accountant";
  const icaewNote = getContentValue("home.footer.icaewNote");
  const links = footerNav.map((link) => ({ ...link, label: getContentValue(link.key) }));

  return (
    <footer className="border-t border-border/60 bg-ink">
      <ScrollAnimate className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-12">
        {/* ICAEW Accreditation Logo (Untouched) */}
        <div className="mb-8">
          <a
            href={icaewHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icaewImageAlt}
            className="inline-block focus:outline-none"
          >
            <img
              src={icaewImageUrl}
              alt={icaewImageAlt}
              width={736}
              height={298}
              decoding="async"
              draggable={false}
              className="h-28 sm:h-36 md:h-44 max-w-full w-auto object-contain select-none"
            />
          </a>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-surface/70">
            {icaewNote}
          </p>
        </div>

        {/* Responsive Footer Content Section below Logo */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:justify-between">
          {/* Main Footer Left Content */}
          <div className="flex flex-col gap-4 lg:col-span-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-surface sm:text-3xl">
              {headingPrefix}
              <span className="text-brand">{headingBrand}</span>
              {headingSuffix}
            </h3>

            <p className="max-w-2xl text-sm leading-relaxed text-surface/70 sm:text-base">
              {intro}
            </p>

            <nav aria-label="Footer Navigation" className="mt-2">
              <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-surface/75">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {footerLegal.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {settings.socials.filter((s) => s.url && s.url.trim().length > 0).length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {settings.socials
                  .filter((s) => s.url && s.url.trim().length > 0)
                  .map((social) => (
                    <a
                      key={`${social.platform}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.platform} page`}
                      className="text-surface/75 transition-colors hover:text-brand"
                    >
                      {getSocialIcon(social.platform, "h-5 w-5")}
                    </a>
                  ))}
              </div>
            )}
          </div>

          {/* Right CTA Button */}
          <div className="flex items-start lg:col-span-4 lg:justify-end lg:pt-1">
            <Link
              to="/contact"
              className="inline-flex h-13 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-medium tracking-tight text-brand-foreground shadow-brand transition-colors hover:bg-brand-strong sm:w-auto"
            >
              {cta}
            </Link>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 border-t border-surface/10 pt-8">
          <p className="text-xs text-surface/40">
            © {new Date().getFullYear()} {settings.footerText}
          </p>
        </div>
      </ScrollAnimate>
    </footer>
  );
}
