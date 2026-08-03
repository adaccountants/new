import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionButtonProps extends HTMLMotionProps<"button"> {
  variant?: "brand" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<MotionButtonProps["variant"]>, string> = {
  brand: "bg-brand text-brand-foreground shadow-brand hover:bg-brand-strong",
  outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground",
};

const sizeClasses: Record<NonNullable<MotionButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/** Button with hover / tap physics used across the site. */
export function MotionButton({
  variant = "brand",
  size = "md",
  className,
  ...rest
}: MotionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    />
  );
}
