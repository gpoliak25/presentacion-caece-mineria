"use client";

import { TrendingDown, Users, PhoneOff, FolderOpen, Target } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, StatCard, Card } from "../ui";
import { ConversionDonut } from "../charts";

const dataset = [
  { file: "banca_train.csv", desc: "Conjunto de entrenamiento original", used: false },
  { file: "banca_test.csv", desc: "Conjunto de prueba original", used: false },
  {
    file: "bancaV1_actualizado.csv",
    desc: "Dataset unificado y limpio",
    used: true,
  },
];

export function SlideProblema() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="01" label="El Problema" accent="violet" />
      </Item>

      <Item>
        <Heading>
          El banco desperdicia{" "}
          <span className="gradient-text">88 de cada 100</span> llamadas
        </Heading>
      </Item>

      <Item className="mt-7 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Clientes en el dataset"
          value="49.732"
          caption="Historial de 3 archivos de campaña bancaria unificados"
          accent="cyan"
        />
        <StatCard
          icon={TrendingDown}
          label="Tasa de conversión"
          value="~12%"
          caption="Solo 1 de cada 8 llamadas termina en suscripción"
          accent="violet"
          gradient
        />
        <StatCard
          icon={PhoneOff}
          label="Llamadas desperdiciadas"
          value="~88%"
          caption="Tiempo, recursos y dinero perdidos en cada campaña"
          accent="red"
        />
      </Item>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Donut */}
        <Item>
          <Card className="flex h-full flex-col items-center justify-center p-5">
            <p className="mb-3 font-semibold text-fg">
              Distribución de resultados de campaña
            </p>
            <ConversionDonut />
            <div className="mt-3 flex items-center gap-5 text-sm">
              <span className="flex items-center gap-2 text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
                Sí convierten: <span className="font-semibold text-fg">12%</span>
              </span>
              <span className="flex items-center gap-2 text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                No convierten: <span className="font-semibold text-fg">88%</span>
              </span>
            </div>
          </Card>
        </Item>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <Item>
            <Card className="p-5">
              <div className="mb-3.5 flex items-center gap-2.5">
                <FolderOpen className="text-violet" size={19} />
                <span className="font-semibold text-fg">Origen del dataset</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[1.1fr_1.5fr] bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-faint">
                  <span>Archivo</span>
                  <span>Descripción</span>
                </div>
                {dataset.map((row) => (
                  <div
                    key={row.file}
                    className="grid grid-cols-[1.1fr_1.5fr] items-center border-t border-line px-4 py-2.5"
                  >
                    <span className="font-mono text-xs text-fg">{row.file}</span>
                    <span className="flex items-center gap-2 text-sm text-muted">
                      {row.used && (
                        <span className="rounded-md border border-emerald/30 bg-emerald/10 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase text-emerald">
                          Usado
                        </span>
                      )}
                      {row.desc}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Item>

          <Item>
            <Card glow="violet" className="p-5">
              <div className="mb-2.5 flex items-center gap-2.5">
                <Target className="text-cyan" size={19} />
                <span className="font-semibold text-fg">
                  La pregunta que guía este trabajo
                </span>
              </div>
              <p className="text-lg font-semibold leading-snug text-fg">
                ¿Podemos predecir a quién llamar y dejar de desperdiciar{" "}
                <span className="gradient-text-cyan">88 llamadas de cada 100</span>?
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Con datos históricos de 49.732 clientes construimos un modelo que
                ordena los prospectos por probabilidad de conversión. El banco
                llama primero a los que más valen la pena.
              </p>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
