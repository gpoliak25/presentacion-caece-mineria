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
    lines: ["CART · Random Forest", "AUC · Curva ROC"],
  },
  {
    label: "Dataset",
    lines: ["49.732 registros bancarios", "16 variables predictoras"],
  },
];


export function SlideCover() {
  return (
    <SlideShell>
      {/* ── Forest image — background right ── */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 w-[55%] z-0"
        style={{
          maskImage: "radial-gradient(ellipse 90% 85% at 80% 70%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 80% 70%, black 20%, transparent 75%)",
          opacity: 0.85,
        }}
      >
        <Image
          src="/forest.jpg"
          alt=""
          width={800}
          height={540}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* ── Content — centered, above image ── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <Item>
          <div className="mb-8 overflow-hidden rounded-xl border border-line-strong shadow-lg shadow-black/40">
            <Image
              src="/caece-logo.png"
              alt="Universidad CAECE"
              width={293}
              height={105}
              priority
              className="h-[70px] w-auto"
            />
          </div>
        </Item>

        <Item>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Minería de Datos Empresariales · 1er Cuatrimestre 2026
          </div>
        </Item>

        <Item>
          <h1 className="text-6xl font-bold leading-[1] tracking-tight sm:text-7xl lg:text-[7.5rem]">
            <span className="text-fg">¿A quién </span>
            <span className="gradient-text">llamar?</span>
          </h1>
        </Item>

        <Item>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Un modelo predictivo para la captación de clientes bancarios basado
            en CART y Random Forest
          </p>
        </Item>

        <Item>
          <div className="mx-auto mt-8 h-0.5 w-16 rounded-full bg-gradient-to-r from-violet to-cyan" />
        </Item>

        <Item>
          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white/[0.025] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {columns.map((c) => (
              <div key={c.label} className="px-6 py-5">
                <p className="section-label mb-2.5 text-faint">{c.label}</p>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm font-semibold text-fg sm:text-[0.95rem]">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Item>
      </div>
    </SlideShell>
  );
}
