"use client";

import Image from "next/image";
import { SlideShell, Item } from "../slide-shell";

const columns = [
  {
    label: "Integrantes",
    lines: ["Lic. Lorena López", "Lic. Gisela Poliak"],
  },
  {
    label: "Técnicas",
    lines: ["CART · Random Forest", "AUC · Curva de Ganancia"],
  },
  {
    label: "Dataset",
    lines: ["49.732 registros bancarios", "16 variables predictoras"],
  },
];

function RandomForestSVG() {
  const glow = "drop-shadow(0 0 6px #2dd4bf) drop-shadow(0 0 14px #2dd4bf88)";
  const glowSm = "drop-shadow(0 0 4px #2dd4bf) drop-shadow(0 0 8px #2dd4bf66)";

  // Tree 1 — large, center
  const t1: [number,number][] = [[250,52],[160,150],[340,150],[110,248],[210,248],[290,248],[390,248],[80,336],[140,336],[185,336],[238,336]];
  const t1edges: [[number,number],[number,number]][] = [
    [t1[0],t1[1]],[t1[0],t1[2]],
    [t1[1],t1[3]],[t1[1],t1[4]],
    [t1[2],t1[5]],[t1[2],t1[6]],
    [t1[3],t1[7]],[t1[3],t1[8]],
    [t1[4],t1[9]],[t1[4],t1[10]],
  ];

  // Tree 2 — small, left
  const t2: [number,number][] = [[80,100],[40,190],[120,190],[20,275],[65,275],[100,275]];
  const t2edges: [[number,number],[number,number]][] = [
    [t2[0],t2[1]],[t2[0],t2[2]],
    [t2[1],t2[3]],[t2[1],t2[4]],
    [t2[2],t2[5]],
  ];

  // Tree 3 — medium, right
  const t3: [number,number][] = [[420,80],[370,175],[465,175],[345,265],[395,265],[445,265]];
  const t3edges: [[number,number],[number,number]][] = [
    [t3[0],t3[1]],[t3[0],t3[2]],
    [t3[1],t3[3]],[t3[1],t3[4]],
    [t3[2],t3[5]],
  ];

  const dots: [number,number,number][] = [
    [30,50,1.5],[480,40,2],[60,320,1.5],[490,290,2],[150,20,1],[460,350,1.5],
    [310,380,1.5],[20,200,1],[500,180,1.5],[380,30,1],[130,380,1],
  ];

  return (
    <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowlg" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Floating particles */}
      {dots.map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#2dd4bf" opacity="0.35" filter="url(#glow)"/>
      ))}

      {/* Tree edges */}
      {[...t1edges,...t2edges,...t3edges].map(([[x1,y1],[x2,y2]],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.35"
          filter="url(#glow)"
        />
      ))}

      {/* Tree 1 nodes — large root highlight */}
      {t1.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i===0?9:i<3?6:5}
          fill={i===0?"#2dd4bf":"none"}
          stroke="#2dd4bf" strokeWidth={i===0?0:1.5}
          opacity={i===0?0.95:0.75}
          filter="url(#glowlg)"
        />
      ))}

      {/* Tree 2 nodes */}
      {t2.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i===0?6:4}
          fill="none" stroke="#2dd4bf" strokeWidth="1.2"
          opacity="0.6" filter="url(#glow)"
        />
      ))}

      {/* Tree 3 nodes */}
      {t3.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i===0?7:5}
          fill={i===0?"rgba(45,212,191,0.25)":"none"}
          stroke="#2dd4bf" strokeWidth="1.4"
          opacity="0.7" filter="url(#glow)"
        />
      ))}

      {/* Ground baseline */}
      <line x1="20" y1="375" x2="500" y2="375" stroke="#2dd4bf" strokeWidth="0.5" strokeOpacity="0.2"/>
    </svg>
  );
}

export function SlideCover() {
  return (
    <SlideShell>
      <div className="flex items-center gap-10 lg:gap-16">

        {/* ── LEFT: content ── */}
        <div className="flex flex-1 flex-col">
          <Item>
            <div className="mb-6 overflow-hidden rounded-xl border border-line-strong shadow-lg shadow-black/40 w-fit">
              <Image
                src="/caece-logo.png"
                alt="Universidad CAECE"
                width={293}
                height={105}
                priority
                className="h-[58px] w-auto"
              />
            </div>
          </Item>

          <Item>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Minería de Datos Empresariales · 1er Cuatrimestre 2026
            </div>
          </Item>

          <Item>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-fg">¿A quién </span>
              <span className="gradient-text">llamar?</span>
            </h1>
          </Item>

          <Item>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Un modelo predictivo para la captación de clientes bancarios
              basado en CART y Random Forest
            </p>
          </Item>

          <Item>
            <div className="mt-6 h-0.5 w-14 rounded-full bg-gradient-to-r from-violet to-cyan" />
          </Item>

          <Item>
            <div className="mt-6 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-white/[0.025]">
              {columns.map((c) => (
                <div key={c.label} className="px-5 py-4">
                  <p className="section-label mb-2 text-faint">{c.label}</p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-xs font-semibold text-fg sm:text-sm">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Item>
        </div>

        {/* ── RIGHT: Random Forest illustration ── */}
        <Item className="hidden lg:flex w-[420px] shrink-0 items-center justify-center">
          <div className="relative w-full" style={{filter: "drop-shadow(0 0 40px rgba(45,212,191,0.15))"}}>
            <RandomForestSVG />
          </div>
        </Item>

      </div>
    </SlideShell>
  );
}
