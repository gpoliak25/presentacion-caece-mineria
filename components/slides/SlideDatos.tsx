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
  { v: "education", n: "187", pct: "4.1%", care: "Imputar con la moda", color: "#22d3ee" },
  { v: "job", n: "38", pct: "0.8%", care: "Imputar con la moda", color: "#34d399" },
];

function TypeBadge({ type }: { type: VarType }) {
  const s = typeStyle[type];
  return (
    <span
      className="rounded-md px-2 py-0.5 font-mono text-[0.68rem] font-bold uppercase"
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
          15 variables, una variable objetivo y{" "}
          <span className="gradient-text-cyan">datos ocultos</span>
        </Heading>
      </Item>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Variables table */}
        <Item>
          <Card className="h-full p-5">
            <div className="mb-3 flex items-center gap-2.5">
              <Database className="text-cyan" size={19} />
              <span className="font-semibold text-fg">
                Variables del dataset
              </span>
              <span className="text-xs text-faint">
                · 15 predictoras + 1 objetivo (y)
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="grid grid-cols-[1fr_52px_1.3fr] bg-white/[0.03] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-faint">
                <span>Variable</span>
                <span>Tipo</span>
                <span>Descripción</span>
              </div>
              {variables.map((v) => (
                <div
                  key={v.name}
                  className="grid grid-cols-[1fr_52px_1.3fr] items-center border-t border-line px-3.5 py-[0.42rem]"
                >
                  <span
                    className={`font-mono text-xs ${
                      v.type === "leak" ? "text-red line-through" : "text-fg"
                    }`}
                  >
                    {v.name}
                  </span>
                  <TypeBadge type={v.type} />
                  <span className="text-xs leading-tight text-muted">
                    {v.desc}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Item>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Missing values */}
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <HelpCircle className="text-amber" size={19} />
                <span className="font-semibold text-fg">
                  Faltantes codificados como “unknown”
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[1fr_auto_56px_1.5fr] gap-2 bg-white/[0.03] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Variable</span>
                  <span>Cant.</span>
                  <span>%</span>
                  <span>Tratamiento</span>
                </div>
                {missing.map((m) => (
                  <div
                    key={m.v}
                    className="grid grid-cols-[1fr_auto_56px_1.5fr] items-center gap-2 border-t border-line px-3.5 py-2"
                  >
                    <span className="font-mono text-xs text-fg">{m.v}</span>
                    <span className="font-mono text-xs text-muted">{m.n}</span>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-center text-[0.68rem] font-bold"
                      style={{ color: m.color, background: `${m.color}1f` }}
                    >
                      {m.pct}
                    </span>
                    <span className="text-xs leading-tight text-muted">
                      {m.care}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Item>

          {/* Class imbalance */}
          <Item>
            <Card className="p-5">
              <div className="mb-3.5 flex items-center gap-2.5">
                <Scale className="text-violet" size={19} />
                <span className="font-semibold text-fg">
                  Desbalance de clases — el gran desafío
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted">No convierte</span>
                    <span className="font-semibold text-fg">88%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[88%] rounded-full bg-white/20" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted">Sí convierte</span>
                    <span className="font-semibold text-fg">12%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-violet to-cyan" />
                  </div>
                </div>
              </div>
            </Card>
          </Item>

          {/* Key takeaway */}
          <Item>
            <Card glow="cyan" className="flex items-start gap-3 p-5">
              <Lightbulb className="mt-0.5 shrink-0 text-cyan" size={19} />
              <div>
                <p className="mb-1 font-semibold text-fg">Conclusión clave</p>
                <p className="text-sm leading-relaxed text-muted">
                  Con 88/12 de desbalance, un modelo que diga “nadie convierte”
                  tiene 88% de accuracy… pero es completamente inútil. La métrica
                  correcta es el{" "}
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
