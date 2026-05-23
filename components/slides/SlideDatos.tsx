"use client";

import { Database, HelpCircle, Scale, Lightbulb } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card } from "../ui";

type VarType = "num" | "cat" | "bin" | "leak";

const typeStyle: Record<VarType, { color: string; bg: string }> = {
  num: { color: "#22d3ee", bg: "rgba(34,211,238,0.12)" },
  cat: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  bin: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  leak: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

const variables: { name: string; type: VarType; desc: string }[] = [
  { name: "age", type: "num", desc: "Edad del cliente" },
  { name: "job", type: "cat", desc: "Ocupación (12 categorías)" },
  { name: "marital", type: "cat", desc: "Estado civil" },
  { name: "education", type: "cat", desc: "Nivel educativo" },
  { name: "default / housing / loan", type: "bin", desc: "Historial crediticio" },
  { name: "balance", type: "num", desc: "Saldo promedio anual (puede ser negativo)" },
  { name: "contact / day / month", type: "cat", desc: "Medio y momento de contacto" },
  { name: "campaign / pdays / previous", type: "num", desc: "Intensidad de campañas anteriores" },
  { name: "poutcome", type: "cat", desc: "Resultado de campaña anterior" },
  { name: "duration", type: "leak", desc: "Duración llamada — eliminada (data leakage)" },
];

const missing: { v: string; n: string; pct: string; care: string; color: string }[] = [
  { v: "poutcome", n: "3.705", pct: "82.0%", care: "Mantener (informa: cliente nuevo)", color: "#ef4444" },
  { v: "contact", n: "1.324", pct: "29.3%", care: "Mantener + analizar patrón", color: "#fbbf24" },
  { v: "education", n: "187", pct: "4.1%", care: "Imputación condicionada por job (moda educativa por ocupación)", color: "#22d3ee" },
  { v: "job", n: "38", pct: "0.8%", care: "Imputación condicionada por edad (retired/student/moda etaria)", color: "#34d399" },
];

function TypeBadge({ type }: { type: VarType }) {
  const s = typeStyle[type];
  return (
    <span
      className="rounded-md px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase"
      style={{ color: s.color, background: s.bg }}
    >
      {type}
    </span>
  );
}

export function SlideDatos() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="02" label="Los Datos" accent="cyan" />
      </Item>

      <Item>
        <Heading>
          16 variables, una variable objetivo y{" "}
          <span className="gradient-text-cyan">datos ocultos</span>
        </Heading>
      </Item>

      <div className="mt-3 grid flex-1 gap-2 lg:grid-cols-2">
        {/* Variables table */}
        <Item>
          <Card className="h-full p-3">
            <div className="mb-2 flex items-center gap-2">
              <Database className="text-cyan" size={16} />
              <span className="text-xs font-semibold text-fg">
                Variables del dataset
              </span>
              <span className="text-[0.6rem] text-faint">
                · 16 predictoras + 1 objetivo
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border border-line">
              <div className="grid grid-cols-[1fr_48px_1.3fr] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-wide text-faint">
                <span>Variable</span>
                <span>Tipo</span>
                <span>Descripción</span>
              </div>
              {variables.map((v) => (
                <div
                  key={v.name}
                  className="grid grid-cols-[1fr_48px_1.3fr] items-center border-t border-line px-2.5 py-[0.3rem]"
                >
                  <span
                    className={`font-mono text-[0.65rem] ${
                      v.type === "leak" ? "text-red line-through" : "text-fg"
                    }`}
                  >
                    {v.name}
                  </span>
                  <TypeBadge type={v.type} />
                  <span className="text-[0.65rem] leading-tight text-muted">
                    {v.desc}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Item>

        {/* Right column */}
        <div className="flex flex-col gap-2">
          {/* Missing values */}
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle className="text-amber" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Faltantes codificados como "unknown"
                </span>
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="grid grid-cols-[1fr_56px_48px_1.4fr] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Variable</span>
                  <span className="text-right">Cant.</span>
                  <span className="text-center">%</span>
                  <span className="pl-2">Tratamiento</span>
                </div>
                {missing.map((m) => (
                  <div
                    key={m.v}
                    className="grid grid-cols-[1fr_56px_48px_1.4fr] items-center border-t border-line px-2.5 py-1.5"
                  >
                    <span className="font-mono text-[0.65rem] text-fg">{m.v}</span>
                    <span className="text-right font-mono text-[0.65rem] text-muted">{m.n}</span>
                    <span className="flex justify-center">
                      <span
                        className="rounded-md px-1 py-0.5 text-center text-[0.6rem] font-bold"
                        style={{ color: m.color, background: `${m.color}1f` }}
                      >
                        {m.pct}
                      </span>
                    </span>
                    <span className="pl-2 text-[0.6rem] leading-tight text-muted">
                      {m.care}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Item>

          {/* Class imbalance */}
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="text-violet" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Desbalance de clases — el gran desafío
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="mb-1 flex justify-between text-[0.7rem]">
                    <span className="text-muted">No convierte</span>
                    <span className="font-semibold text-fg">88%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[88%] rounded-full bg-white/20" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-[0.7rem]">
                    <span className="text-muted">Sí convierte</span>
                    <span className="font-semibold text-fg">12%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-violet to-cyan" />
                  </div>
                </div>
              </div>
            </Card>
          </Item>

          {/* Key takeaway */}
          <Item>
            <Card glow="cyan" className="flex items-start gap-2 p-3">
              <Lightbulb className="mt-0.5 shrink-0 text-cyan" size={16} />
              <div>
                <p className="mb-0.5 text-xs font-semibold text-fg">Conclusión clave</p>
                <p className="text-[0.7rem] leading-relaxed text-muted">
                  Con 88/12 de desbalance, un modelo que diga "nadie convierte"
                  tiene 88% de accuracy pero es inútil. Usamos{" "}
                  <span className="font-semibold text-cyan">AUC-ROC</span>.
                </p>
              </div>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
