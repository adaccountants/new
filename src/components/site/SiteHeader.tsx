import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/motion/MotionButton";
import { EASE_OUT } from "@/components/motion/ScrollAnimate";

const links = ["Home", "About Us", "Team", "Projects", "Blog"] as const;

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          C<span className="text-brand">&amp;</span>A
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((label) => (
            <li key={label}>
              <a
                href="#services"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
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
