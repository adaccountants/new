import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "./ScrollAnimate";
import { cn } from "@/lib/utils";

export interface StaggerCardItem {
  id: string;
  label: string;
  image: string;
  caption?: string;
}

export interface StaggerCardsProps {
  items: StaggerCardItem[];
  /** Delay in seconds between each card. */
  stagger?: number;
  className?: string;
  cardClassName?: string;
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

/** Horizontally scrollable row of cards that enter in sequence. */
export function StaggerCards({
  items,
  stagger = 0.15,
  className,
  cardClassName,
}: StaggerCardsProps) {
  return (
    <motion.ul
      variants={{
        ...containerVariants,
        show: { transition: { staggerChildren: stagger } },
      }}
      initial="show"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-12",
        className,
      )}
    >
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          variants={cardVariants}
          className={cn(
            "group relative aspect-[3/4] w-[240px] shrink-0 snap-start overflow-hidden rounded-[2rem] sm:w-[280px]",
            index % 2 === 1 && "lg:mt-14",
            cardClassName,
          )}
        >
          <motion.img
            src={item.image}
            alt={item.label}
            loading="lazy"
            decoding="async"
            width={900}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-full border border-white/25 bg-ink/70 px-4 py-2 backdrop-blur-md">
            <p className="truncate text-sm font-medium text-surface">{item.label}</p>
            {item.caption ? (
              <p className="truncate text-xs text-surface/70">{item.caption}</p>
            ) : null}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
