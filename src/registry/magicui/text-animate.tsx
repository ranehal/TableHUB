"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import React from "react";

interface TextAnimateProps extends MotionProps {
  children: string;
  className?: string;
  by?: "word" | "character";
  animation?: "blurIn" | "blurInUp" | "fadeIn" | "fadeInUp" | "slideUp";
  once?: boolean;
}

export function TextAnimate({
  children,
  className,
  by = "word",
  animation = "fadeIn",
  once = false,
  ...props
}: TextAnimateProps) {
  const words = children.split(" ");
  const characters = children.split("");

  const container = {
    hidden: { opacity: 0 },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const childAnimation = {
    blurIn: {
      hidden: { filter: "blur(10px)", opacity: 0 },
      show: { filter: "blur(0px)", opacity: 1 },
    },
    blurInUp: {
      hidden: { filter: "blur(10px)", opacity: 0, y: 15 },
      show: { filter: "blur(0px)", opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0 },
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 },
    },
  };

  const selectedAnimation = childAnimation[animation];

  return (
    <AnimatePresence>
      <motion.h1
        className={cn("drop-shadow-sm", className)}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once }}
        {...props}
      >
        {by === "word"
          ? words.map((word, i) => (
              <motion.span
                key={i}
                variants={selectedAnimation}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))
          : characters.map((char, i) => (
              <motion.span
                key={i}
                variants={selectedAnimation}
                className="inline-block mr-[0.5px]"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
      </motion.h1>
    </AnimatePresence>
  );
}
