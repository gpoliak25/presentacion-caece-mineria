"use client";

import {
  Ban,
  Database,
  X,
  Scissors,
  Hash,
  CheckCircle2,
  ChevronRight,
  Grid3x3,
  Key,
} from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card, IconBadge, type Accent } from "../ui";

const pipeline: {
  icon: typeof Database;
  title: string;
  sub: string;
  accent: Accent;
}[] = [
  { icon: Database, title: "Dataset original", sub: "49.732 filas · 17 vars", accent: "cyan" },
  { icon: X, title: "Eliminar duration", sub: "Data leakage", accent: "red" },
  { icon: Scissors, title: "División 70/30", sub: "Stratify por clase", accent: "violet" },
  { icon: Hash, title: "One-Hot Encoding", sub: "Variables categóricas", accent: "violet" },
  { icon: CheckCircle2, title: "Modelo listo", sub: "Honesto y usable", accent: "emerald" },
];

const stats: { value: string; label: string; caption: string; color: string }[] = [
  {
    value: "34.812",
    label: "Filas de entrenamiento",
    caption: "70% · Stratify para preservar la proporción de clases",
    color: "#34d399",
  },
  {
    value: "14.919",
    label: "Filas de prueba",
    caption: "30% · Nunca visto durante el entrenamiento",
    color: "#22d3ee",
  },
  {
    value: "+40",
    label: "Variables tras One-Hot",
    caption: "De 15 a +40 columnas: categóricas → dummies",
    color: "#fbbf24",
  },
];

const oneHot = [
  "LabelEncoder asigna enteros a las categorías (admin=0, blue-collar=1, entrepreneur=2…), introduciendo un orden falso entre profesiones.",
  "One-Hot crea una columna binaria por cada categoría — sin jerarquía artificial.",
  "Es la técnica correcta cuando las categorías son nominales (sin orden natural).",
];

export function SlideTrampa() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="03" label="La Trampa y la Preparación" accent="red" />
      </Item>

      <Item>
        <Heading>
          <span className="text-red">Data leakage</span> detectado — pipeline
          ejecutado
        </Heading>
      </Item>

      {/* Warning */}
      <Item className="mt-3">
        <Card glow="red" className="flex items-start gap-2.5 p-3">
          <IconBadge icon={Ban} accent="red" size="sm" />
          <div>
            <p className="text-xs font-semibold text-fg">
              Variable <span className="font-mono text-red">duration</span> — ELIMINADA por data leakage
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">
              Solo se conoce después de hacer la llamada. Usarla sería predecir el futuro con información del futuro.
            </p>
          </div>
        </Card>
      </Item>

      {/* Pipeline */}
      <Item className="mt-2">
        <Card className="p-3">
          <p className="mb-2 text-center text-xs font-semibold text-fg">
            Pipeline de preparación de datos
          </p>
          <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
            {pipeline.map((step, i) => (
              <div key={step.title} className="flex items-center gap-1.5 sm:flex-1">
                <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-line bg-white/[0.02] px-1.5 py-2 text-center">
                  <IconBadge icon={step.icon} accent={step.accent} size="sm" />
                  <div>
                    <p className="text-[0.65rem] font-semibold text-fg">{step.title}</p>
                    <p className="text-[0.55rem] text-faint">{step.sub}</p>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <ChevronRight
                    className="hidden shrink-0 text-faint sm:block"
                    size={12}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      </Item>

      {/* Split stats */}
      <Item className="mt-2 grid gap-2 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} hover className="p-3">
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-fg">{s.label}</p>
            <p className="mt-0.5 text-[0.6rem] leading-relaxed text-faint">
              {s.caption}
            </p>
          </Card>
        ))}
      </Item>

      {/* Two explanatory panels */}
      <div className="mt-2 grid flex-1 gap-2 lg:grid-cols-2">
        <Item>
          <Card className="h-full p-3">
            <div className="mb-2 flex items-center gap-2">
              <Grid3x3 className="text-violet" size={14} />
              <span className="text-xs font-semibold text-fg">
                ¿Por qué One-Hot y no LabelEncoder?
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {oneHot.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-muted"
                >
                  <span className="mt-1 h-0.5 w-0.5 shrink-0 rounded-full bg-violet" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Item>

        <Item>
          <Card glow="cyan" className="h-full p-3">
            <div className="mb-2 flex items-center gap-2">
              <Key className="text-cyan" size={14} />
              <span className="text-xs font-semibold text-fg">
                ¿Por qué importa detectar el leakage?
              </span>
            </div>
            <div className="mb-2 flex gap-2">
              <div className="flex-1 rounded-lg border border-red/25 bg-red/[0.07] px-2 py-1.5">
                <p className="text-xl font-bold text-red">0.93</p>
                <p className="text-[0.6rem] text-faint">AUC con duration</p>
              </div>
              <div className="flex-1 rounded-lg border border-cyan/25 bg-cyan/[0.07] px-2 py-1.5">
                <p className="gradient-text-cyan text-xl font-bold">0.76</p>
                <p className="text-[0.6rem] text-faint">AUC sin duration (RF)</p>
              </div>
            </div>
            <p className="text-[0.65rem] leading-relaxed text-muted">
              Sin <span className="font-mono text-cyan">duration</span> el AUC es honesto y{" "}
              <span className="font-semibold text-fg">desplegable en producción</span>.
            </p>
          </Card>
        </Item>
      </div>
    </SlideShell>
  );
}
