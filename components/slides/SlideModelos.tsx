"use client";

import { Zap, TreeDeciduous, Trees, BarChart3, Scale } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card, IconBadge, type Accent } from "../ui";

type Model = {
  icon: typeof Trees;
  accent: Accent;
  tag: string;
  name: string;
  subtitle: string;
  bullets: string[];
  hyper: string[];
  resultLabel: string;
  stats: { label: string; value: string }[];
};

const models: Model[] = [
  {
    icon: TreeDeciduous,
    accent: "violet",
    tag: "Modelo 1",
    name: "CART — Árbol de decisión",
    subtitle: "Clasificador único con restricciones de regularización",
    bullets: [
      "En cada nodo hace una pregunta binaria (ej. ¿age > 35?)",
      "max_depth=5 — limita la profundidad para no memorizar",
      "min_samples_leaf=20 — cada hoja necesita al menos 20 clientes reales",
      "class_weight='balanced' — da más peso al 12% positivo para que el modelo no lo ignore",
      "Ventaja: interpretable — se puede ver el árbol y entender cada decisión",
    ],
    hyper: [
      "max_depth=5",
      "min_samples_leaf=20",
      "class_weight='balanced'",
      "random_state=42",
    ],
    resultLabel: "Resultado CART",
    stats: [
      { label: "Accuracy", value: "0.79" },
      { label: "AUC", value: "0.72" },
      { label: 'Recall "sí"', value: "~52%" },
    ],
  },
  {
    icon: Trees,
    accent: "cyan",
    tag: "Modelo 2",
    name: "Random Forest — Ensemble",
    subtitle: "100 árboles independientes con votación mayoritaria",
    bullets: [
      "100 árboles distintos, cada uno con una submuestra aleatoria de datos y variables",
      "La predicción final es el promedio de probabilidades de los 100 árboles — reduce el ruido",
      "Mismos hiperparámetros que CART para una comparación justa",
      "Reduce el overfitting al promediar árboles con distintas submuestras",
      "Desventaja: menos interpretable que un árbol único, pero más robusto",
    ],
    hyper: [
      "n_estimators=100",
      "max_depth=5",
      "min_samples_leaf=20",
      "class_weight='balanced'",
    ],
    resultLabel: "Resultado Random Forest",
    stats: [
      { label: "Accuracy", value: "0.78" },
      { label: "AUC", value: "0.76" },
      { label: 'Recall "sí"', value: "~62%" },
    ],
  },
];

function ModelCard({ m }: { m: Model }) {
  const hex = m.accent === "cyan" ? "#22d3ee" : "#a78bfa";
  return (
    <Card className="flex h-full flex-col p-3">
      <div className="flex items-center gap-2.5">
        <IconBadge icon={m.icon} accent={m.accent} size="sm" />
        <div>
          <p
            className="text-[0.6rem] font-bold uppercase tracking-widest"
            style={{ color: hex }}
          >
            {m.tag}
          </p>
          <h3 className="text-sm font-bold text-fg">{m.name}</h3>
        </div>
      </div>
      <p className="mt-1.5 text-[0.65rem] text-faint">{m.subtitle}</p>

      <ul className="mt-2 flex flex-col gap-1">
        {m.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-muted"
          >
            <span
              className="mt-1 h-0.5 w-0.5 shrink-0 rounded-full"
              style={{ background: hex }}
            />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-wrap gap-1">
        {m.hyper.map((h) => (
          <span
            key={h}
            className="rounded-md border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.6rem] text-muted"
          >
            {h}
          </span>
        ))}
      </div>

      <div className="flex-1" />

      <div
        className="mt-2 rounded-lg p-2"
        style={{ background: `${hex}12`, border: `1px solid ${hex}33` }}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <BarChart3 size={12} style={{ color: hex }} />
          <span className="text-[0.65rem] font-semibold text-fg">
            {m.resultLabel}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {m.stats.map((s) => (
            <div key={s.label}>
              <p className="text-lg font-bold" style={{ color: hex }}>
                {s.value}
              </p>
              <p className="text-[0.6rem] text-faint">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function SlideModelos() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="05" label="Los Modelos" accent="violet" />
      </Item>

      <Item>
        <Heading>
          Del overfitting al <span className="gradient-text">ensemble</span> —
          dos estrategias comparadas
        </Heading>
      </Item>

      <Item className="mt-3">
        <Card className="flex items-start gap-3 p-3">
          <IconBadge icon={Zap} accent="amber" size="sm" />
          <div>
            <p className="text-xs font-semibold text-fg">
              El primer modelo nos engañó: 100% de accuracy
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">
              Un árbol sin restricciones memorizó cada cliente (overfitting). En datos nuevos, fallaba.
            </p>
          </div>
        </Card>
      </Item>

      <div className="mt-2 grid flex-1 gap-2 lg:grid-cols-2">
        <Item>
          <ModelCard m={models[0]} />
        </Item>
        <Item>
          <ModelCard m={models[1]} />
        </Item>
      </div>

      <Item className="mt-2">
        <Card glow="cyan" className="flex items-start gap-3 p-3">
          <IconBadge icon={Scale} accent="cyan" size="sm" />
          <div>
            <p className="text-xs font-semibold text-fg">
              ¿Por qué <span className="font-mono text-cyan">class_weight=&apos;balanced&apos;</span>{" "}
              es crucial?
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">
              Con 12% de positivos, un modelo sin peso aprende a decir "no" siempre. El balance hace que cada cliente que SÍ convierte valga 7× más.
            </p>
          </div>
        </Card>
      </Item>
    </SlideShell>
  );
}
