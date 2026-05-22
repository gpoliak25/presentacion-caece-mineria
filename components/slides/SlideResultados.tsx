"use client";

import {
  ClipboardList,
  BookOpen,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  Star,
} from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card } from "../ui";
import { MetricsBarChart } from "../charts";

type Win = "empate" | "rf" | "rfpp";

const rows: { metric: string; cart: string; rf: string; win: Win; highlight?: boolean }[] = [
  { metric: "Accuracy", cart: "0.7300", rf: "0.7300", win: "empate" },
  { metric: "AUC-ROC", cart: "0.7600", rf: "0.7900", win: "rfpp", highlight: true },
  { metric: "Precision (sí)", cart: "~34%", rf: "~36%", win: "rf" },
  { metric: "Recall (sí)", cart: "~60%", rf: "~62%", win: "rf" },
  { metric: "F1 (sí)", cart: "~43%", rf: "~46%", win: "rf" },
];

const winBadge: Record<Win, { text: string; cls: string }> = {
  empate: { text: "Empate", cls: "border-line bg-white/[0.05] text-muted" },
  rf: { text: "RF", cls: "border-cyan/30 bg-cyan/10 text-cyan" },
  rfpp: { text: "RF +3pp", cls: "border-cyan/30 bg-cyan/10 text-cyan" },
};

const reading: { strong: string; rest: string }[] = [
  {
    strong: "Accuracy 73%",
    rest: "— empate, pero ambos superan el baseline (88% diciendo “no” siempre en la clase negativa).",
  },
  {
    strong: "AUC 0.79",
    rest: "— de cada par (sí/no), el RF ordena bien 79 de 100. Suficiente para priorizar campañas.",
  },
  {
    strong: "Recall 62%",
    rest: "— captura 6 de cada 10 clientes que realmente convertirían.",
  },
];

const topVars = [
  "poutcome_success",
  "age",
  "balance",
  "pdays",
  "previous",
  "campaign",
  "month",
  "contact",
];

export function SlideResultados() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="05" label="Resultados" accent="cyan" />
      </Item>

      <Item>
        <Heading>
          <span className="gradient-text-cyan">Random Forest supera al CART</span>{" "}
          — y el AUC no miente
        </Heading>
      </Item>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {/* Metrics table */}
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <ClipboardList className="text-cyan" size={18} />
                <span className="text-sm font-semibold text-fg">
                  Comparación de métricas en el conjunto de prueba
                </span>
                <span className="text-xs text-faint">· 14.919 filas</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[1.3fr_1fr_1.3fr_1fr] bg-white/[0.03] px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Métrica</span>
                  <span>CART</span>
                  <span>Random Forest</span>
                  <span>Ganador</span>
                </div>
                {rows.map((r) => (
                  <div
                    key={r.metric}
                    className={`grid grid-cols-[1.3fr_1fr_1.3fr_1fr] items-center border-t border-line px-3.5 py-2 ${
                      r.highlight ? "bg-cyan/[0.06]" : ""
                    }`}
                  >
                    <span className="text-xs font-medium text-fg">
                      {r.metric}
                    </span>
                    <span className="font-mono text-xs text-muted">{r.cart}</span>
                    <span
                      className={`font-mono text-xs ${
                        r.highlight ? "font-bold text-cyan" : "text-fg"
                      }`}
                    >
                      {r.rf}
                    </span>
                    <span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold ${winBadge[r.win].cls}`}
                      >
                        {winBadge[r.win].text}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Item>

          {/* How to read */}
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <BookOpen className="text-violet" size={18} />
                <span className="text-sm font-semibold text-fg">
                  Cómo leer estas métricas
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {reading.map((r) => (
                  <li
                    key={r.strong}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    <span>
                      <span className="font-semibold text-fg">{r.strong}</span>{" "}
                      {r.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Item>

          {/* Accuracy warning */}
          <Item>
            <Card className="flex items-start gap-3 p-4">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber" size={18} />
              <div>
                <p className="text-sm font-semibold text-fg">
                  ¿Por qué el Accuracy engaña?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Un modelo que siempre diga “no convierte” tendría 88% de
                  accuracy sin predecir nada útil. Por eso usamos el{" "}
                  <span className="font-semibold text-cyan">AUC</span> como
                  métrica central del proyecto.
                </p>
              </div>
            </Card>
          </Item>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          {/* Visual comparison */}
          <Item>
            <Card className="p-5">
              <div className="mb-2 flex items-center gap-2.5">
                <BarChart3 className="text-cyan" size={18} />
                <span className="text-sm font-semibold text-fg">
                  Comparación visual de métricas
                </span>
              </div>
              <MetricsBarChart />
            </Card>
          </Item>

          {/* AUC usable */}
          <Item>
            <Card glow="cyan" className="flex items-start gap-3 p-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-emerald" size={18} />
              <div>
                <p className="text-sm font-semibold text-fg">
                  AUC 0.79 → usable en producción
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Un modelo con AUC 0.79 puede ordenar una lista de 1.000
                  prospectos y poner los más prometedores primero — exactamente
                  lo que necesita el call center.
                </p>
              </div>
            </Card>
          </Item>

          {/* Top variables */}
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <Star className="text-violet" size={18} />
                <span className="text-sm font-semibold text-fg">
                  Top variables más importantes (RF)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topVars.map((v, i) => (
                  <span
                    key={v}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-xs ${
                      i === 0
                        ? "border-cyan/40 bg-cyan/10 font-semibold text-cyan"
                        : "border-line bg-white/[0.03] text-muted"
                    }`}
                  >
                    {i + 1}. {v}
                  </span>
                ))}
              </div>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
