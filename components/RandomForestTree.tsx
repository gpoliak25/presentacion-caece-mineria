"use client";

import { motion } from "framer-motion";

export function RandomForestTree() {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="treeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main trunk */}
      <motion.line
        x1="200"
        y1="480"
        x2="200"
        y2="320"
        stroke="url(#treeGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        filter="url(#glow)"
      />

      {/* Level 1 branches */}
      <motion.line
        x1="200"
        y1="320"
        x2="120"
        y2="240"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="200"
        y1="320"
        x2="280"
        y2="240"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        filter="url(#glow)"
      />

      {/* Level 2 branches - Left side */}
      <motion.line
        x1="120"
        y1="240"
        x2="70"
        y2="160"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="120"
        y1="240"
        x2="160"
        y2="160"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        filter="url(#glow)"
      />

      {/* Level 2 branches - Right side */}
      <motion.line
        x1="280"
        y1="240"
        x2="240"
        y2="160"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="280"
        y1="240"
        x2="330"
        y2="160"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        filter="url(#glow)"
      />

      {/* Level 3 - Leaf branches */}
      <motion.line
        x1="70"
        y1="160"
        x2="40"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="70"
        y1="160"
        x2="95"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.6 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="160"
        y1="160"
        x2="140"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.7 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="160"
        y1="160"
        x2="185"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="240"
        y1="160"
        x2="215"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.9 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="240"
        y1="160"
        x2="260"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.0 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="330"
        y1="160"
        x2="305"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.1 }}
        filter="url(#glow)"
      />
      <motion.line
        x1="330"
        y1="160"
        x2="360"
        y2="90"
        stroke="url(#treeGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.2 }}
        filter="url(#glow)"
      />

      {/* Root node */}
      <motion.circle
        cx="200"
        cy="320"
        r="8"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        filter="url(#glow)"
      />

      {/* Level 1 nodes */}
      <motion.circle
        cx="120"
        cy="240"
        r="7"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="280"
        cy="240"
        r="7"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
        filter="url(#glow)"
      />

      {/* Level 2 nodes */}
      <motion.circle
        cx="70"
        cy="160"
        r="6"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.4 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="160"
        cy="160"
        r="6"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.45 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="240"
        cy="160"
        r="6"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.5 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="330"
        cy="160"
        r="6"
        fill="#0d0c14"
        stroke="url(#treeGradient)"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.55 }}
        filter="url(#glow)"
      />

      {/* Leaf nodes (filled) */}
      <motion.circle
        cx="40"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.3 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="95"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.35 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="140"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.4 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="185"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.45 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="215"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.5 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="260"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.55 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="305"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.6 }}
        filter="url(#glow)"
      />
      <motion.circle
        cx="360"
        cy="90"
        r="5"
        fill="url(#treeGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.65 }}
        filter="url(#glow)"
      />
    </svg>
  );
}
