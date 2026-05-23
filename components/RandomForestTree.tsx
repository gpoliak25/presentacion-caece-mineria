"use client";

import { motion } from "framer-motion";

// Mini árbol de decisión individual
function MiniTree({ 
  x, 
  y, 
  scale = 1, 
  delay = 0,
  color = "violet" 
}: { 
  x: number; 
  y: number; 
  scale?: number; 
  delay?: number;
  color?: "violet" | "cyan" | "mixed";
}) {
  const colors = {
    violet: { stroke: "#a78bfa", fill: "#8b5cf6" },
    cyan: { stroke: "#22d3ee", fill: "#06b6d4" },
    mixed: { stroke: "#a78bfa", fill: "#22d3ee" },
  };
  
  const { stroke, fill } = colors[color];
  
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      {/* Ramas */}
      <line x1="0" y1="0" x2="-20" y2="-25" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
      <line x1="0" y1="0" x2="20" y2="-25" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
      <line x1="-20" y1="-25" x2="-32" y2="-45" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="-20" y1="-25" x2="-8" y2="-45" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="-25" x2="8" y2="-45" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="-25" x2="32" y2="-45" stroke={stroke} strokeWidth="1" opacity="0.5" />
      
      {/* Nodo raíz */}
      <circle cx="0" cy="0" r="5" fill={fill} opacity="0.8" />
      
      {/* Nodos intermedios */}
      <circle cx="-20" cy="-25" r="4" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.7" />
      <circle cx="20" cy="-25" r="4" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.7" />
      
      {/* Nodos hoja */}
      <circle cx="-32" cy="-45" r="3" fill={fill} opacity="0.6" />
      <circle cx="-8" cy="-45" r="3" fill={fill} opacity="0.6" />
      <circle cx="8" cy="-45" r="3" fill={fill} opacity="0.6" />
      <circle cx="32" cy="-45" r="3" fill={fill} opacity="0.6" />
    </motion.g>
  );
}

export function RandomForestBackground() {
  // Posiciones distribuidas en las esquinas y bordes, evitando el centro
  const trees = [
    // Esquina superior izquierda
    { x: 80, y: 120, scale: 0.7, delay: 0.1, color: "violet" as const },
    { x: 180, y: 80, scale: 0.5, delay: 0.3, color: "cyan" as const },
    
    // Esquina superior derecha
    { x: 1150, y: 100, scale: 0.8, delay: 0.2, color: "mixed" as const },
    { x: 1280, y: 150, scale: 0.6, delay: 0.4, color: "violet" as const },
    
    // Esquina inferior izquierda
    { x: 100, y: 580, scale: 0.6, delay: 0.5, color: "cyan" as const },
    { x: 200, y: 650, scale: 0.8, delay: 0.2, color: "violet" as const },
    
    // Esquina inferior derecha
    { x: 1200, y: 600, scale: 0.9, delay: 0.1, color: "mixed" as const },
    { x: 1320, y: 520, scale: 0.5, delay: 0.6, color: "cyan" as const },
    { x: 1100, y: 680, scale: 0.7, delay: 0.3, color: "violet" as const },
    
    // Bordes laterales
    { x: 50, y: 350, scale: 0.5, delay: 0.4, color: "violet" as const },
    { x: 1350, y: 320, scale: 0.6, delay: 0.5, color: "cyan" as const },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1400 750"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="glow-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glows sutiles en las esquinas */}
        <circle cx="100" cy="600" r="150" fill="url(#glow-violet)" opacity="0.4" />
        <circle cx="1250" cy="150" r="120" fill="url(#glow-cyan)" opacity="0.3" />
        <circle cx="1200" cy="620" r="180" fill="url(#glow-violet)" opacity="0.3" />
        
        {/* Mini árboles */}
        <g opacity="0.5">
          {trees.map((tree, i) => (
            <MiniTree key={i} {...tree} />
          ))}
        </g>
      </svg>
    </div>
  );
}
