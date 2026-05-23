"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Stagger container — replays every time a slide mounts */
export const containerV: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

/* Each direct child rises into place */
export const itemV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* Full-viewport slide frame with consistent padding + centering — no scroll */
export function SlideShell({ children }: { children: ReactNode }) {
  return (
    <motion.section
      variants={containerV}
      initial="hidden"
      animate="show"
      className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden"
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
        {children}
      </div>
    </motion.section>
  );
}

/* A single staggered reveal block */
export function Item({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemV} className={className}>
      {children}
    </motion.div>
  );
}
