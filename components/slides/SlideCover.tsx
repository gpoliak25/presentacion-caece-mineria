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
        <Item className="hidden lg:flex w-[440px] shrink-0 items-center justify-center">
          <div className="relative overflow-hidden rounded-2xl" style={{width:"100%"}}>
            <Image
              src="/forest.jpg"
              alt="Random Forest"
              width={550}
              height={370}
              className="w-full h-auto object-cover"
              style={{filter:"drop-shadow(0 0 30px rgba(45,212,191,0.25))"}}
            />
          </div>
        </Item>

      </div>
    </SlideShell>
  );
}
