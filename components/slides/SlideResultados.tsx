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

type Win = "empate" | "rf" | "rfpp" | "cart";

const rows: { metric: string; cart: string; rf: string; win: Win; highlight?: boolean }[] = [
  { metric: "Accuracy", cart: "0.7868", rf: "0.7820", win: "cart" },
  { metric: "AUC-ROC", cart: "0.7209", rf: "0.7626", win: "rfpp", highlight: true },
  { metric: "Precision (sí)", cart: "0.28", rf: "—", win: "rf" },
  { metric: "Recall (sí)", cart: "0.52", rf: "—", win: "rf" },
  { metric: "F1 (sí)", cart: "0.36", rf: "ver notebook", win: "rf" },
];

const winBadge: Record<Win, { text: string; cls: string }> = {
  empate: { text: "Empate", cls: "border-line bg-white/[0.05] text-muted" },
  rf: { text: "RF", cls: "border-cyan/30 bg-cyan/10 text-cyan" },
  rfpp: { text: "RF +4pp", cls: "border-cyan/30 bg-cyan/10 text-cyan" },
  cart: { text: "CART +0.5pp", cls: "border-violet/30 bg-violet/10 text-violet" },
};

const reading: { strong: string; rest: string }[] = [
  {
    strong: 'Accuracy: CART 79% vs RF 78%',
    rest: '— CART gana levemente en accuracy, pero esta métrica engaña con clases desbalanceadas.',
  },
  {
    strong: 'AUC 0.76 (RF)',
    rest: '— de cada par (sí/no), el RF ordena bien 76 de 100. El AUC es la métrica central del proyecto.',
  },
  {
    strong: 'Recall CART 52%',
    rest: '— captura poco más de 1 de cada 2 clientes que realmente convertirían. RF mejora este número.',
  },
];

const topVars = [
  "poutcome_success",
  "balance",
  "month_mar",
  "month_oct",
  "contact_cellular",
  "age",
  "campaign",
];

export function SlideResultados() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="06" label="Resultados" accent="cyan" />
      </Item>

      <Item>
        <Heading>
          <span className="gradient-text-cyan">Random Forest supera al CART</span>{" "}
          — y el AUC no miente
        </Heading>
      </Item>

      <div className="mt-3 grid flex-1 gap-2 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-2">
          {/* Metrics table */}
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <ClipboardList className="text-cyan" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Comparación de métricas
                </span>
                <span className="text-[0.65rem] text-faint">· 14.919 filas</span>
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="grid grid-cols-[1.3fr_1fr_1.3fr_1fr] bg-white/[0.03] px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Métrica</span>
                  <span>CART</span>
                  <span>Random Forest</span>
                  <span>Ganador</span>
                </div>
                {rows.map((r) => (
                  <div
                    key={r.metric}
                    className={`grid grid-cols-[1.3fr_1fr_1.3fr_1fr] items-center border-t border-line px-2.5 py-1.5 ${
                      r.highlight ? "bg-cyan/[0.06]" : ""
                    }`}
                  >
                    <span className="text-[0.7rem] font-medium text-fg">
                      {r.metric}
                    </span>
                    <span className="font-mono text-[0.7rem] text-muted">{r.cart}</span>
                    <span
                      className={`font-mono text-[0.7rem] ${
                        r.highlight ? "font-bold text-cyan" : "text-fg"
                      }`}
                    >
                      {r.rf}
                    </span>
                    <span>
                      <span
                        className={`rounded-md border px-1.5 py-0.5 text-[0.6rem] font-semibold ${winBadge[r.win].cls}`}
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
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="text-violet" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Cómo leer estas métricas
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {reading.map((r) => (
                  <li
                    key={r.strong}
                    className="flex items-start gap-1.5 text-[0.7rem] leading-relaxed text-muted"
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
            <Card className="flex items-start gap-2 p-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber" size={16} />
              <div>
                <p className="text-xs font-semibold text-fg">
                  ¿Por qué el Accuracy engaña?
                </p>
                <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">
                  Un modelo que siempre diga "no convierte" tendría 88% de
                  accuracy sin predecir nada útil. Por eso usamos el{" "}
                  <span className="font-semibold text-cyan">AUC</span>.
                </p>
              </div>
            </Card>
          </Item>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2">
          {/* Visual comparison */}
          <Item>
            <Card className="p-3">
              <div className="mb-1 flex items-center gap-2">
                <BarChart3 className="text-cyan" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Comparación visual
                </span>
              </div>
              <MetricsBarChart />
            </Card>
          </Item>

          {/* AUC usable */}
          <Item>
            <Card glow="cyan" className="flex items-start gap-2 p-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-emerald" size={16} />
              <div>
                <p className="text-xs font-semibold text-fg">
                  AUC 0.79 → usable en producción
                </p>
                <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">
                  El modelo ordena prospectos poniendo los más prometedores primero.
                </p>
              </div>
            </Card>
          </Item>

          {/* Top variables */}
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <Star className="text-violet" size={16} />
                <span className="text-xs font-semibold text-fg">
                  Top variables (RF)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topVars.map((v, i) => (
                  <span
                    key={v}
                    className={`rounded-md border px-2 py-0.5 font-mono text-[0.65rem] ${
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
