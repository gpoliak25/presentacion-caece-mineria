"use client";

import { XCircle, CheckCircle2, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card, IconBadge } from "../ui";

const thresholds: {
  t: string;
  recall: string;
  precision: string;
  fn: string;
  fp: string;
  profile: string;
  highlight?: boolean;
}[] = [
  {
    t: "0.30",
    recall: "~75%",
    precision: "~22%",
    fn: "Bajo",
    fp: "Alto",
    profile: "Captura más, pero llama a muchos no interesados",
  },
  {
    t: "0.50",
    recall: "~62%",
    precision: "~36%",
    fn: "Medio",
    fp: "Medio",
    profile: "Balance razonable · punto de partida recomendado",
    highlight: true,
  },
  {
    t: "0.70",
    recall: "~38%",
    precision: "~52%",
    fn: "Alto",
    fp: "Bajo",
    profile: "Muy selectivo · usado cuando el costo por llamada es alto",
  },
];

export function SlideErrores() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="08" label="Errores y Umbral" accent="red" />
      </Item>

      <Item>
        <Heading>
          No todos los errores{" "}
          <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#ef4444,#fbbf24)" }}>
            cuestan lo mismo
          </span>
        </Heading>
      </Item>

      <div className="mt-3 grid flex-1 gap-2 lg:grid-cols-2">
        {/* Error types */}
        <div className="flex flex-col gap-2">
          <Item>
            <Card className="flex items-start gap-2.5 p-3">
              <IconBadge icon={XCircle} accent="red" size="sm" />
              <div>
                <p className="text-xs font-semibold text-fg">
                  Falso Negativo (FN) — oportunidad perdida
                </p>
                <p className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">
                  Modelo dice "no convierte" pero{" "}
                  <span className="font-semibold text-fg">sí lo haría</span>. No se llama → ingreso perdido.
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-2.5 p-3">
              <IconBadge icon={CheckCircle2} accent="amber" size="sm" />
              <div>
                <p className="text-xs font-semibold text-fg">
                  Falso Positivo (FP) — llamada innecesaria
                </p>
                <p className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">
                  Modelo dice "convierte" pero{" "}
                  <span className="font-semibold text-fg">no lo hace</span>. Llamada sin resultado → costo operativo.
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card glow="cyan" className="flex items-start gap-2.5 p-3">
              <IconBadge icon={AlertTriangle} accent="cyan" size="sm" />
              <div>
                <p className="text-xs font-semibold text-fg">
                  ¿Cuál pesa más?
                </p>
                <p className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">
                  FN = perder <span className="font-semibold text-fg">~$2.000</span>, FP = <span className="font-semibold text-fg">~$50</span>. Conviene{" "}
                  <span className="font-semibold text-cyan">bajar umbral a 0.3–0.4</span> para priorizar Recall.
                </p>
              </div>
            </Card>
          </Item>
        </div>

        {/* Threshold table */}
        <div className="flex flex-col gap-2">
          <Item>
            <Card className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <SlidersHorizontal className="text-violet" size={14} />
                <span className="text-xs font-semibold text-fg">
                  Impacto del umbral
                </span>
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="grid grid-cols-[44px_1fr_1fr_1fr] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Umbral</span>
                  <span className="text-center">Recall</span>
                  <span className="text-center">Precision</span>
                  <span>FN / FP</span>
                </div>
                {thresholds.map((r) => (
                  <div
                    key={r.t}
                    className={`grid grid-cols-[44px_1fr_1fr_1fr] items-start border-t border-line px-2.5 py-2 ${
                      r.highlight ? "bg-cyan/[0.06]" : ""
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${
                        r.highlight ? "text-cyan" : "text-fg"
                      }`}
                    >
                      {r.t}
                    </span>
                    <span className="text-center font-mono text-[0.65rem] text-emerald-400">
                      {r.recall}
                    </span>
                    <span className="text-center font-mono text-[0.65rem] text-violet-400">
                      {r.precision}
                    </span>
                    <div>
                      <p className="text-[0.6rem] font-semibold text-fg">
                        FN {r.fn} · FP {r.fp}
                      </p>
                      <p className="mt-0.5 text-[0.55rem] leading-snug text-faint">
                        {r.profile}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Item>

          <Item>
            <Card className="p-3">
              <p className="text-xs font-semibold text-fg">
                Cómo ajustar el umbral en producción
              </p>
              <ul className="mt-1.5 flex flex-col gap-1">
                {[
                  "Calcular el costo promedio de FN y FP",
                  "Graficar curva Precision-Recall",
                  "Implementar umbral en predict_proba()",
                  "Reentrenar cada 6 meses",
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-muted"
                  >
                    <span className="mt-1 h-0.5 w-0.5 shrink-0 rounded-full bg-violet-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
