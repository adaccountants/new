import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useMemo, useRef, type ReactNode } from "react";

import { useHydrated } from "@/hooks/use-hydrated";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export interface ScrollAnimateProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Portion of the element that must be visible before animating. */
  amount?: number;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Vertical offset (px) the element travels from. */
  y?: number;
  /** Initial scale the element grows from. */
  scale?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Play the enter animation on first view after hydrate (hero / above-the-fold). */
  replayOnMount?: boolean;
}

/**
 * Reusable scroll reveal wrapper.
 * Fades, lifts and scales its children as they enter the viewport.
 * SSR and the first client paint stay visible so the page cannot render blank.
 */
export function ScrollAnimate({
  children,
  amount = 0.2,
  delay = 0,
  duration = 0.6,
  y = 40,
  scale = 0.96,
  once = true,
  replayOnMount = false,
  ...rest
}: ScrollAnimateProps) {
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const animate = useMemo(() => {
    const visible = { opacity: 1, y: 0, scale: 1 };
    if (reduced || !hydrated) return visible;
    if (!inView) return replayOnMount ? visible : { opacity: 0, y, scale };
    if (replayOnMount) return { opacity: [0, 1], y: [y, 0], scale: [scale, 1] };
    return visible;
  }, [reduced, hydrated, inView, replayOnMount, y, scale]);

  return (
    <motion.div
      {...rest}
      ref={ref}
      initial={false}
      animate={animate}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
