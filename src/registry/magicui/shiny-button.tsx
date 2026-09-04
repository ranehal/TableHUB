"use client";

import { cn } from "@/lib/utils";
import { motion, AnimationProps } from "motion/react";
import React from "react";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, shimmerColor = "#ffffff", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20",
          className
        )}
        initial={{ "--x": "100%" } as any}
        animate={{ "--x": "-100%" } as any}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
          },
        } as AnimationProps["transition"]}
        {...props as any}
      >
        <span
          className="relative block h-full w-full text-sm tracking-wide uppercase"
          style={{
            maskImage: `linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))`,
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,color-mix(in_srgb,var(--primary),transparent_90%)_calc(var(--x)+20%),color-mix(in_srgb,var(--primary),transparent_50%)_calc(var(--x)+25%),color-mix(in_srgb,var(--primary),transparent_90%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
