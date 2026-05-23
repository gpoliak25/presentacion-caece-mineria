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
    lines: ["49.732 registros bancarios", "16 variables predictoras (15 tras eliminar duration)"],
  },
];

export function SlideCover() {
  return (
    <SlideShell>
      {/* Random Forest background image - clip-path removes the decorative border lines */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[45%] w-[50%] overflow-hidden opacity-25">
        <Image
          src="/images/random-forest.png"
          alt=""
          fill
          className="object-cover object-bottom"
          style={{ clipPath: "inset(12% 8% 5% 8%)" }}
          priority
        />
        {/* Gradients to blend into background */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-bg" />
      </div>

      <div className="relative z-10 flex flex-col items-start text-left">
        <Item>
          <div className="mb-4 overflow-hidden rounded-xl border border-line-strong shadow-lg shadow-black/40">
            <Image
              src="/caece-logo.png"
              alt="Universidad CAECE"
              width={293}
              height={105}
              priority
              className="h-[50px] w-auto sm:h-[60px]"
            />
          </div>
        </Item>

        <Item>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Minería de Datos Empresariales · 1er Cuatrimestre 2026
          </div>
        </Item>

        <Item>
          <h1 className="text-4xl font-bold leading-[1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-fg">¿A quién </span>
            <span className="gradient-text">llamar?</span>
          </h1>
        </Item>

        <Item>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            Un modelo predictivo para la captación de clientes bancarios basado
            en CART y Random Forest
          </p>
        </Item>

        <Item>
          <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-violet to-cyan" />
        </Item>

        <Item>
          <div className="mr-auto mt-4 grid w-full max-w-2xl grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-bg/90 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {columns.map((c) => (
              <div key={c.label} className="px-4 py-3 sm:px-5 sm:py-4">
                <p className="section-label mb-1.5 text-faint">{c.label}</p>
                {c.lines.map((l) => (
                  <p key={l} className="text-xs font-semibold text-fg sm:text-sm">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Item>

        <Item>
          <div className="mt-6 flex h-7 w-5 items-start justify-center rounded-full border border-line-strong pt-1.5">
            <span className="scroll-dot h-1 w-1 rounded-full bg-violet" />
          </div>
        </Item>
      </div>
    </SlideShell>
  );
}
