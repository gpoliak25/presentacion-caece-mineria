import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/* Accent palette keyed by name */
export type Accent = "violet" | "cyan" | "red" | "amber" | "emerald";

const accentColor: Record<Accent, string> = {
  violet: "#a78bfa",
  cyan: "#22d3ee",
  red: "#ef4444",
  amber: "#fbbf24",
  emerald: "#34d399",
};

const accentSoft: Record<Accent, string> = {
  violet: "rgba(167,139,250,0.14)",
  cyan: "rgba(34,211,238,0.14)",
  red: "rgba(239,68,68,0.14)",
  amber: "rgba(251,191,36,0.14)",
  emerald: "rgba(52,211,153,0.14)",
};

/* ---- Section tag: "01 / EL PROBLEMA" ---- */
export function SectionTag({
  index,
  label,
  accent = "violet",
}: {
  index: string;
  label: string;
  accent?: Accent;
}) {
  return (
    <div
      className="section-label mb-5 flex items-center gap-2"
      style={{ color: accentColor[accent] }}
    >
      <span>{index}</span>
      <span className="opacity-40">/</span>
      <span>{label}</span>
    </div>
  );
}

/* ---- Big slide heading with optional gradient highlight ---- */
export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]">
      {children}
    </h2>
  );
}

/* ---- Colored rounded-square icon holder ---- */
export function IconBadge({
  icon: Icon,
  accent = "violet",
  size = "md",
}: {
  icon: LucideIcon;
  accent?: Accent;
  size?: "sm" | "md" | "lg";
}) {
  const box = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const ic = size === "lg" ? 26 : size === "sm" ? 17 : 21;
  return (
    <div
      className={`flex ${box} shrink-0 items-center justify-center rounded-xl`}
      style={{
        background: accentSoft[accent],
        border: `1px solid ${accentColor[accent]}33`,
      }}
    >
      <Icon size={ic} style={{ color: accentColor[accent] }} strokeWidth={2} />
    </div>
  );
}

/* ---- Glass card wrapper ---- */
export function Card({
  children,
  className = "",
  hover = false,
  glow,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "violet" | "cyan" | "red";
}) {
  return (
    <div
      className={`glass ${hover ? "glass-hover" : ""} ${
        glow ? `glow-${glow}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---- Pill / tag ---- */
export function Pill({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium"
      style={{
        background: accent ? accentSoft[accent] : "rgba(255,255,255,0.05)",
        border: `1px solid ${accent ? `${accentColor[accent]}40` : "var(--color-line)"}`,
        color: accent ? accentColor[accent] : "var(--color-fg)",
      }}
    >
      {children}
    </span>
  );
}

/* ---- Stat card: icon + label + big number + caption ---- */
export function StatCard({
  icon,
  label,
  value,
  caption,
  accent = "violet",
  gradient = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  caption: string;
  accent?: Accent;
  gradient?: boolean;
}) {
  return (
    <Card hover className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <IconBadge icon={icon} accent={accent} size="sm" />
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
      <div
        className={`text-5xl font-bold tracking-tight lg:text-6xl ${
          gradient ? "gradient-text" : "text-fg"
        }`}
        style={!gradient ? { color: accentColor[accent] } : undefined}
      >
        {value}
      </div>
      <p className="text-sm leading-relaxed text-faint">{caption}</p>
    </Card>
  );
}

/* ---- Horizontal bar meter (feature importance / missing values) ---- */
export function BarMeter({
  label,
  pct,
  valueLabel,
  accent = "violet",
}: {
  label: string;
  pct: number;
  valueLabel: string;
  accent?: Accent;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm text-fg">{label}</span>
        <span className="text-sm font-semibold text-muted">{valueLabel}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              accent === "cyan"
                ? "linear-gradient(90deg,#a78bfa,#22d3ee)"
                : `linear-gradient(90deg, ${accentColor[accent]}, ${accentColor[accent]}aa)`,
          }}
        />
      </div>
    </div>
  );
}

export { accentColor };
