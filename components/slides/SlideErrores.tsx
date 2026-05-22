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
        <SectionTag index="07" label="Errores y Umbral" accent="red" />
      </Item>

      <Item>
        <Heading>
          No todos los errores{" "}
          <span className="gradient-text" style={{ backgroundImage: "linear-gradient(90deg,#ef4444,#fbbf24)" }}>
            cuestan lo mismo
          </span>
        </Heading>
      </Item>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Error types */}
        <div className="flex flex-col gap-3">
          <Item>
            <Card className="flex items-start gap-3.5 p-5">
              <IconBadge icon={XCircle} accent="red" size="sm" />
              <div>
                <p className="text-sm font-semibold text-fg">
                  Falso Negativo (FN) — oportunidad perdida
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  El modelo predice "no convierte" pero el cliente{" "}
                  <span className="font-semibold text-fg">sí lo haría</span>.
                  No se hace la llamada → ingreso directo perdido. En un
                  producto de alto valor como un depósito a plazo, cada FN
                  tiene un costo de negocio real.
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-3.5 p-5">
              <IconBadge icon={CheckCircle2} accent="amber" size="sm" />
              <div>
                <p className="text-sm font-semibold text-fg">
                  Falso Positivo (FP) — llamada innecesaria
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  El modelo predice "convierte" pero el cliente{" "}
                  <span className="font-semibold text-fg">no lo hace</span>.
                  Se realiza una llamada sin resultado → costo operativo del
                  agente, más riesgo de cansar al cliente con contactos
                  repetidos.
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card glow="cyan" className="flex items-start gap-3.5 p-5">
              <IconBadge icon={AlertTriangle} accent="cyan" size="sm" />
              <div>
                <p className="text-sm font-semibold text-fg">
                  ¿Cuál pesa más?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Depende del producto. En depósitos a plazo, un FN implica
                  perder un ingreso de{" "}
                  <span className="font-semibold text-fg">~$2.000</span>,
                  mientras que un FP solo cuesta{" "}
                  <span className="font-semibold text-fg">~$50</span> (una
                  llamada). Por eso conviene{" "}
                  <span className="font-semibold text-cyan">
                    bajar el umbral a 0.3–0.4
                  </span>{" "}
                  para priorizar el Recall sobre la Precision.
                </p>
              </div>
            </Card>
          </Item>
        </div>

        {/* Threshold table */}
        <div className="flex flex-col gap-3">
          <Item>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <SlidersHorizontal className="text-violet" size={18} />
                <span className="text-sm font-semibold text-fg">
                  Impacto del umbral de clasificación
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[52px_1fr_1fr_1fr] bg-white/[0.03] px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-wide text-faint">
                  <span>Umbral</span>
                  <span className="text-center">Recall</span>
                  <span className="text-center">Precision</span>
                  <span>FN / FP</span>
                </div>
                {thresholds.map((r) => (
                  <div
                    key={r.t}
                    className={`grid grid-cols-[52px_1fr_1fr_1fr] items-start border-t border-line px-3.5 py-3 ${
                      r.highlight ? "bg-cyan/[0.06]" : ""
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-bold ${
                        r.highlight ? "text-cyan" : "text-fg"
                      }`}
                    >
                      {r.t}
                    </span>
                    <span className="text-center font-mono text-xs text-emerald-400">
                      {r.recall}
                    </span>
                    <span className="text-center font-mono text-xs text-violet-400">
                      {r.precision}
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-semibold text-fg">
                        FN {r.fn} · FP {r.fp}
                      </p>
                      <p className="mt-0.5 text-[0.68rem] leading-snug text-faint">
                        {r.profile}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[0.7rem] text-faint">
                Valores aproximados sobre el conjunto de test de RF.
                El umbral óptimo se calibra con la curva Precision-Recall
                según el costo real de cada tipo de error en la campaña.
              </p>
            </Card>
          </Item>

          <Item>
            <Card className="p-5">
              <p className="text-sm font-semibold text-fg">
                Cómo ajustar el umbral en producción
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {[
                  "Calcular el costo promedio de FN y FP en la campaña anterior",
                  "Graficar la curva Precision-Recall y localizar el punto que minimiza la pérdida esperada",
                  "Implementar el umbral elegido en predict_proba() y monitorear con cada campaña",
                  "Reentrenar el modelo cada 6 meses para capturar cambios en el comportamiento del cliente",
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
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
