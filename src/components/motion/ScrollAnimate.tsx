import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

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
}

/**
 * Reusable scroll reveal wrapper.
 * Fades, lifts and scales its children as they enter the viewport.
 */
export function ScrollAnimate({
  children,
  amount = 0.2,
  delay = 0,
  duration = 0.6,
  y = 40,
  scale = 0.96,
  once = true,
  ...rest
}: ScrollAnimateProps) {
  const reduced = useReducedMotion();
  const reveal = reduced ? undefined : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      initial={false}
      whileInView={reveal}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
