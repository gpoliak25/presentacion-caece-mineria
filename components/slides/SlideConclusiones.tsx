"use client";

import {
  PhoneOff,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Coins,
  Trophy,
} from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { Card, IconBadge, type Accent } from "../ui";
import { ConversionsBarChart } from "../charts";

const roi = [
  {
    scenario: "Llamada al azar",
    conv: "~234",
    income: "$468.000",
    cost: "$100.000",
    roi: "+368%",
    roiColor: "#fbbf24",
    highlight: false,
  },
  {
    scenario: "Con el modelo",
    conv: "~805",
    income: "$1.610.000",
    cost: "$100.000",
    roi: "+1.510%",
    roiColor: "#34d399",
    highlight: true,
  },
];

const panels: {
  icon: typeof Bot;
  accent: Accent;
  title: string;
  points: string[];
}[] = [
  {
    icon: CheckCircle2,
    accent: "emerald",
    title: "Lo que aprendimos",
    points: [
      "Overfitting y data leakage son los primeros enemigos a vencer antes de entrenar",
      "Con datos desbalanceados: AUC > Accuracy siempre como métrica clave",
      "Random Forest supera a CART de forma consistente en todas las métricas de clase minoritaria",
      "class_weight='balanced' es imprescindible cuando la clase de interés es la minoría",
    ],
  },
  {
    icon: AlertTriangle,
    accent: "amber",
    title: "Limitaciones metodológicas",
    points: [
      "Se usó una única partición train/test sin validación cruzada estratificada (Stratified K-Fold) — con desbalance 88/12 puede generar estimaciones inestables.",
      "No se reportó la curva Precision-Recall, más informativa que ROC ante desbalance severo.",
      "No se exploraron técnicas de rebalanceo (SMOTE, undersampling, ajuste de umbral) que podrían mejorar la captura de la clase minoritaria.",
      "El modelo se entrenó con datos históricos — el comportamiento futuro puede variar (data drift).",
    ],
  },
  {
    icon: Lightbulb,
    accent: "violet",
    title: "Trabajo futuro",
    points: [
      "Probar XGBoost / LightGBM con validación cruzada (GridSearchCV)",
      "Ajuste fino de umbrales de clasificación según costo de negocio",
      "Análisis de ROI por segmento (edad, ocupación, saldo)",
      "Reentrenamiento periódico con datos de campañas recientes",
    ],
  },
];

export function SlideConclusiones() {
  return (
    <SlideShell>
      <Item>
        <div className="section-label mb-2 flex items-center justify-center gap-2 text-violet">
          <span>09</span>
          <span className="opacity-40">/</span>
          <span>Impacto y Conclusiones</span>
        </div>
      </Item>

      <Item>
        <h2 className="text-center text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
          <span className="gradient-text">+244%</span>{" "}
          <span className="text-fg">de conversiones con el mismo presupuesto</span>
        </h2>
        <p className="mt-1.5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-amber">
            Escenario hipotético ilustrativo
          </span>
        </p>
      </Item>

      <div className="mt-3 grid flex-1 gap-2 lg:grid-cols-2">
        {/* Left — impact */}
        <div className="flex flex-col gap-2">
          {/* Comparison cards */}
          <Item>
            <div className="flex items-center gap-2">
              <Card className="flex-1 p-3 text-center">
                <IconBadge icon={PhoneOff} accent="red" size="sm" />
                <p className="section-label mt-1.5 text-faint">Llamando al azar</p>
                <p className="mt-0.5 text-2xl font-bold text-fg">~234</p>
                <p className="text-[0.65rem] text-faint">conversiones / 2.000 llamadas</p>
              </Card>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan">
                <ArrowRight className="text-ink" size={14} />
              </div>
              <Card glow="cyan" className="flex-1 p-3 text-center">
                <IconBadge icon={Bot} accent="cyan" size="sm" />
                <p className="section-label mt-1.5 text-faint">Con el modelo RF</p>
                <p className="gradient-text-cyan mt-0.5 text-2xl font-bold">~805</p>
                <p className="text-[0.65rem] text-faint">conversiones / 2.000 llamadas</p>
              </Card>
            </div>
          </Item>

          {/* Conversions chart */}
          <Item>
            <Card className="p-3">
              <div className="mb-1 flex items-center gap-2">
                <BarChart3 className="text-cyan" size={14} />
                <span className="text-xs font-semibold text-fg">
                  Conversiones por cada 2.000 llamadas
                </span>
              </div>
              <ConversionsBarChart />
            </Card>
          </Item>

          {/* ROI table */}
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <Coins className="text-amber" size={14} />
                <span className="text-xs font-semibold text-fg">
                  Análisis de ROI
                </span>
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="grid grid-cols-[1.2fr_0.8fr_1fr_0.95fr_0.85fr] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Escenario</span>
                  <span>Conv.</span>
                  <span>Ingreso</span>
                  <span>Costo</span>
                  <span>ROI</span>
                </div>
                {roi.map((r) => (
                  <div
                    key={r.scenario}
                    className={`grid grid-cols-[1.2fr_0.8fr_1fr_0.95fr_0.85fr] items-center border-t border-line px-2.5 py-1.5 ${
                      r.highlight ? "bg-cyan/[0.06]" : ""
                    }`}
                  >
                    <span className="text-[0.7rem] font-medium text-fg">
                      {r.scenario}
                    </span>
                    <span className="font-mono text-[0.7rem] text-muted">{r.conv}</span>
                    <span className="font-mono text-[0.7rem] text-fg">{r.income}</span>
                    <span className="font-mono text-[0.7rem] text-muted">{r.cost}</span>
                    <span
                      className="text-[0.7rem] font-bold"
                      style={{ color: r.roiColor }}
                    >
                      {r.roi}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Item>
        </div>

        {/* Right — conclusions */}
        <div className="flex flex-col gap-2">
          {panels.map((p) => (
            <Item key={p.title}>
              <Card className="p-3">
                <div className="mb-1.5 flex items-center gap-2">
                  <IconBadge icon={p.icon} accent={p.accent} size="sm" />
                  <span className="text-xs font-semibold text-fg">
                    {p.title}
                  </span>
                </div>
                <ul className="flex flex-col gap-1">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-0.5 w-0.5 shrink-0 rounded-full bg-white/30" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            </Item>
          ))}
        </div>
      </div>

      {/* Final answer */}
      <Item className="mt-2">
        <Card glow="cyan" className="flex items-center gap-3 p-3">
          <IconBadge icon={Trophy} accent="emerald" size="sm" />
          <div>
            <p className="text-sm font-bold text-fg">
              Respuesta:{" "}
              <span className="gradient-text-cyan">
                SÍ podemos — y los números lo prueban
              </span>
            </p>
            <p className="mt-0.5 text-xs text-muted">
              El modelo triplicó los resultados sin agregar una sola llamada adicional.
            </p>
          </div>
        </Card>
      </Item>
    </SlideShell>
  );
}
