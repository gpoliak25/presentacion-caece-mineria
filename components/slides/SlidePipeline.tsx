"use client";

import {
  FolderOpen,
  HelpCircle,
  ShieldOff,
  Code2,
  Scissors,
  Cpu,
} from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card, type Accent } from "../ui";

type Step = {
  num: string;
  icon: typeof Cpu;
  accent: Accent;
  title: string;
  detail: string;
};

const steps: Step[] = [
  {
    num: "01",
    icon: FolderOpen,
    accent: "cyan",
    title: "Carga & Unificación",
    detail:
      "banca_train.csv + banca_test.csv → bancaV1_actualizado.csv · 49.732 filas · 17 variables",
  },
  {
    num: "02",
    icon: HelpCircle,
    accent: "amber",
    title: "Tratamiento Missing",
    detail:
      "poutcome / contact (unknown) → categoría válida informativa · job / education → imputación por moda condicionada",
  },
  {
    num: "03",
    icon: ShieldOff,
    accent: "red",
    title: "Remoción Data Leakage",
    detail:
      "duration eliminada del pipeline — solo disponible post-contacto y no usable en producción",
  },
  {
    num: "04",
    icon: Code2,
    accent: "violet",
    title: "Codificación OHE",
    detail:
      "pd.get_dummies() en variables nominales · Train + Test concatenados → columnas idénticas garantizadas",
  },
  {
    num: "05",
    icon: Scissors,
    accent: "emerald",
    title: "Train / Test Split",
    detail:
      "70 / 30 · random_state=42 · stratify=y · conserva la proporción 88/12 en ambas particiones",
  },
  {
    num: "06",
    icon: Cpu,
    accent: "cyan",
    title: "Entrenamiento Modelos",
    detail:
      "CART: max_depth=5, min_samples_leaf=20 · RF: 100 árboles, mismos hiperparámetros base · class_weight='balanced'",
  },
];

const accentHex: Record<Accent, string> = {
  violet: "#a78bfa",
  cyan: "#22d3ee",
  red: "#ef4444",
  amber: "#fbbf24",
  emerald: "#34d399",
};

function StepCard({ s }: { s: Step }) {
  const hex = accentHex[s.accent];
  const Icon = s.icon;
  return (
    <Card className="flex gap-3.5 p-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${hex}1a`, border: `1px solid ${hex}33` }}
      >
        <Icon size={17} style={{ color: hex }} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono text-[0.65rem] font-bold uppercase tracking-widest"
            style={{ color: hex }}
          >
            {s.num}
          </span>
          <span className="text-xs font-semibold text-fg">{s.title}</span>
        </div>
        <p className="mt-0.5 text-[0.72rem] leading-relaxed text-muted">
          {s.detail}
        </p>
      </div>
    </Card>
  );
}

export function SlidePipeline() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="04" label="Pipeline" accent="emerald" />
      </Item>

      <Item>
        <Heading>
          Seis pasos para pasar de{" "}
          <span className="gradient-text-cyan">datos crudos</span> a modelos
          listos
        </Heading>
      </Item>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <Item key={s.num}>
            <StepCard s={s} />
          </Item>
        ))}
      </div>

      <Item className="mt-4">
        <Card glow="cyan" className="flex items-center gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan">
            <span className="text-xs font-bold text-ink">!</span>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Los pasos{" "}
            <span className="font-semibold text-fg">03 (leakage)</span> y{" "}
            <span className="font-semibold text-fg">04 (OHE unificado)</span>{" "}
            son críticos: cualquier fuga de información o asimetría de columnas
            invalida los resultados aunque las métricas parezcan excelentes.
          </p>
        </Card>
      </Item>
    </SlideShell>
  );
}
