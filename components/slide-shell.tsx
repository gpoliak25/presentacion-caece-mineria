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

/* Full-viewport slide frame with consistent padding + centering */
export function SlideShell({ children }: { children: ReactNode }) {
  return (
    <motion.section
      variants={containerV}
      initial="hidden"
      animate="show"
      className="deck-scroll no-bar relative z-10 h-[100dvh] w-full overflow-y-auto"
    >
      <div className="mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-7 py-16 sm:px-10 md:px-14">
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
