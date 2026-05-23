"use client";

import { Target, Phone, TrendingDown, BarChart2 } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { SectionTag, Heading, Card, IconBadge, BarMeter, type Accent } from "../ui";

const features: { label: string; pct: number; valueLabel: string; accent: Accent }[] = [
  { label: "poutcome_success", pct: 100, valueLabel: "22%", accent: "cyan" },
  { label: "balance", pct: 73, valueLabel: "16%", accent: "cyan" },
  { label: "month_mar", pct: 50, valueLabel: "11%", accent: "violet" },
  { label: "month_oct", pct: 41, valueLabel: "9%", accent: "violet" },
  { label: "contact_cellular", pct: 36, valueLabel: "8%", accent: "amber" },
  { label: "age", pct: 32, valueLabel: "7%", accent: "amber" },
  { label: "campaign", pct: 27, valueLabel: "6%", accent: "emerald" },
];

const apps: {
  icon: typeof Target;
  accent: Accent;
  title: string;
  body: string;
}[] = [
  {
    icon: Target,
    accent: "cyan",
    title: "Sistema de Scoring",
    body: "Cada prospecto recibe un score de probabilidad (0–1) de conversión antes de la llamada. Score >0.5 → llamada prioritaria.",
  },
  {
    icon: Phone,
    accent: "emerald",
    title: "Priorización de Llamadas",
    body: "El call center ordena su lista diaria por score descendente. Los primeros 20% de contactos concentran ~60% de las conversiones.",
  },
  {
    icon: TrendingDown,
    accent: "amber",
    title: "Reducción de Costos",
    body: "Menos llamadas a clientes refractarios → menor costo operativo con igual o mayor ingreso. ROI medible por campaña.",
  },
];

export function SlideAplicacion() {
  return (
    <SlideShell>
      <Item>
        <SectionTag index="07" label="Aplicación al Negocio" accent="amber" />
      </Item>

      <Item>
        <Heading>
          ¿Qué <span className="gradient-text">dice el modelo</span> sobre el
          negocio?
        </Heading>
      </Item>

      <div className="mt-3 grid flex-1 gap-2 lg:grid-cols-2">
        {/* Feature importance */}
        <Item>
          <Card className="h-full p-3">
            <div className="mb-2 flex items-center gap-2">
              <BarChart2 className="text-cyan" size={16} />
              <span className="text-xs font-semibold text-fg">
                Variables más importantes — RF
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {features.map((f) => (
                <BarMeter
                  key={f.label}
                  label={f.label}
                  pct={f.pct}
                  valueLabel={f.valueLabel}
                  accent={f.accent}
                />
              ))}
            </div>
            <p className="mt-2 text-[0.6rem] leading-relaxed text-faint">
              <span className="font-semibold text-fg">poutcome_success</span> domina:
              haber convertido antes multiplica la probabilidad más que cualquier otra variable.
            </p>
          </Card>
        </Item>

        {/* Business applications */}
        <div className="flex flex-col gap-2">
          {apps.map((a) => (
            <Item key={a.title}>
              <Card className="flex items-start gap-2.5 p-3">
                <IconBadge icon={a.icon} accent={a.accent} size="sm" />
                <div>
                  <p className="text-xs font-semibold text-fg">{a.title}</p>
                  <p className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">{a.body}</p>
                </div>
              </Card>
            </Item>
          ))}

          <Item>
            <Card glow="cyan" className="p-3">
              <p className="text-xs font-semibold text-fg">
                Insight clave de negocio
              </p>
              <ul className="mt-1.5 flex flex-col gap-1">
                {[
                  "Clientes con éxito previo son 4× más probables de convertir",
                  "Saldo positivo indica mayor disposición al ahorro a plazo",
                  "Contacto celular duplica tasa de respuesta vs. fijo",
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-1.5 text-[0.65rem] leading-relaxed text-muted"
                  >
                    <span className="mt-1 h-0.5 w-0.5 shrink-0 rounded-full bg-cyan-400" />
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
