"use client";

import Image from "next/image";
import { CheckCircle, XCircle, AlertTriangle, Target } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card } from "../ui";

const metrics = [
  { label: "Accuracy",  value: "78.2%", desc: "Correctamente clasificados",          color: "#22d3ee",  highlight: false },
  { label: "AUC-ROC",   value: "0.763",  desc: "Discriminación real del modelo",      color: "#14B8A6",  highlight: true  },
  { label: "Precision", value: "29.1%", desc: "VP / (VP + FP)",                      color: "#a78bfa",  highlight: false },
  { label: "Recall",    value: "60.1%", desc: "VP / (VP + FN)",                      color: "#a78bfa",  highlight: false },
  { label: "F1-Score",  value: "0.391",  desc: "Media armónica Precision–Recall",     color: "#fbbf24",  highlight: false },
  { label: "Especif.",  value: "80.6%", desc: "VN / (VN + FP) — negativos correctos",color: "#22d3ee",  highlight: false },
];

export function SlideValidacion() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="07" label="Validación del Modelo" accent="cyan" />
      </Item>

      <Item>
        <Heading>
          La matriz dice la verdad:{" "}
          <span className="gradient-text-cyan">dónde falla y dónde acierta</span>
        </Heading>
      </Item>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Left — confusion matrix image */}
        <Item>
          <Card className="flex h-full flex-col p-4">
            <p className="mb-3 text-sm font-semibold text-fg">
              Matriz de Confusión — Random Forest
            </p>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/matriz_confusion_rf.png"
                alt="Matriz de Confusión Random Forest"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-center text-xs text-faint">
              n = 14.920 registros de prueba
            </p>
          </Card>
        </Item>

        {/* Right — error reading + metrics */}
        <div className="flex flex-col gap-3">
          {/* Error types */}
          <Item>
            <Card className="p-5">
              <p className="mb-3 text-sm font-semibold text-fg">
                Lectura de los errores
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3">
                  <XCircle className="mt-0.5 shrink-0 text-red-400" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-red-400">
                      Error Tipo I — Falso Positivo: 2.558 (17.1%)
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Llamamos a clientes que no iban a convertir → costo de llamada innecesaria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-amber/20 bg-amber/[0.06] p-3">
                  <AlertTriangle className="mt-0.5 shrink-0 text-amber" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-amber">
                      Error Tipo II — Falso Negativo: 695 (4.7%)
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      No llamamos a clientes que sí iban a convertir → oportunidad perdida
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-cyan/20 bg-cyan/[0.06] p-3">
                  <CheckCircle className="mt-0.5 shrink-0 text-cyan" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-cyan">
                      Verdaderos Positivos: 1.048 — clientes captados correctamente
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      De 1.743 clientes reales, el modelo detecta 1.048 (Recall = 60%)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Item>

          {/* Metrics grid */}
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="text-cyan" size={18} />
                <p className="text-sm font-semibold text-fg">Métricas clave</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-xl border p-3 ${
                      m.highlight
                        ? "border-cyan/30 bg-cyan/[0.08]"
                        : "border-line bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-lg font-bold" style={{ color: m.color }}>
                      {m.value}
                    </p>
                    <p className="text-xs font-semibold text-fg">{m.label}</p>
                    <p className="mt-0.5 text-[0.62rem] text-faint">{m.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
