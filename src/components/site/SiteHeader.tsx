import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/motion/MotionButton";
import { EASE_OUT } from "@/components/motion/ScrollAnimate";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
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
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          Alpha<span className="text-brand">Digi</span>AI
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <MotionButton size="sm" aria-label="Contact us">
          Contact
        </MotionButton>
      </nav>
    </motion.header>
  );
}
