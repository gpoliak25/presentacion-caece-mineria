"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const tooltipStyle = {
  background: "#16151f",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  fontSize: 13,
  color: "#f5f5f7",
  padding: "8px 12px",
} as const;

/* ---- Donut: conversion split 12 / 88 ---- */
export function ConversionDonut() {
  const data = [
    { name: "Convierten", value: 12 },
    { name: "No convierten", value: 88 },
  ];
  return (
    <div className="relative h-[200px] w-[200px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={96}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            cornerRadius={8}
            stroke="none"
          >
            <Cell fill="url(#donutGrad)" />
            <Cell fill="rgba(255,255,255,0.07)" />
          </Pie>
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="gradient-text text-4xl font-bold">12%</span>
        <span className="text-xs font-medium uppercase tracking-widest text-faint">
          convierten
        </span>
      </div>
    </div>
  );
}

/* ---- Grouped bars: CART vs Random Forest across metrics ---- */
export function MetricsBarChart() {
  const data = [
    { metric: "Accuracy", CART: 0.73, RF: 0.73 },
    { metric: "AUC-ROC", CART: 0.76, RF: 0.79 },
    { metric: "Recall (sí)", CART: 0.6, RF: 0.62 },
    { metric: "F1 (sí)", CART: 0.43, RF: 0.46 },
  ];
  return (
    <ResponsiveContainer width="100%" height={208}>
      <BarChart data={data} barGap={6} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="metric"
          tick={{ fill: "#9a9aab", fontSize: 12 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 1]}
          tick={{ fill: "#6b6b78", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Legend
          wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
          iconType="circle"
        />
        <defs>
          <linearGradient id="cartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="rfGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        <Bar dataKey="CART" fill="url(#cartGrad)" radius={[5, 5, 0, 0]} maxBarSize={34} />
        <Bar dataKey="RF" fill="url(#rfGrad)" radius={[5, 5, 0, 0]} maxBarSize={34} name="Random Forest" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---- Conversions: random calling vs Random Forest model ---- */
export function ConversionsBarChart() {
  const data = [
    { name: "Al azar", conv: 234 },
    { name: "Con Random Forest", conv: 805 },
  ];
  return (
    <ResponsiveContainer width="100%" height={186}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#9a9aab", fontSize: 12 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6b6b78", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <defs>
          <linearGradient id="rfConvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        <Bar dataKey="conv" name="Conversiones" radius={[6, 6, 0, 0]} maxBarSize={130}>
          <Cell fill="rgba(255,255,255,0.22)" />
          <Cell fill="url(#rfConvGrad)" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---- Gain curve: cumulative conversions captured vs clients contacted ---- */
export function GainCurve() {
  const data = [
    { contacted: 0, modelo: 0, azar: 0 },
    { contacted: 10, modelo: 34, azar: 10 },
    { contacted: 20, modelo: 56, azar: 20 },
    { contacted: 30, modelo: 72, azar: 30 },
    { contacted: 40, modelo: 83, azar: 40 },
    { contacted: 50, modelo: 90, azar: 50 },
    { contacted: 70, modelo: 97, azar: 70 },
    { contacted: 100, modelo: 100, azar: 100 },
  ];
  return (
    <ResponsiveContainer width="100%" height={186}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="contacted"
          tick={{ fill: "#9a9aab", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
          unit="%"
        />
        <YAxis
          tick={{ fill: "#6b6b78", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          unit="%"
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 13, paddingTop: 6 }} iconType="plainline" />
        <Line
          type="monotone"
          dataKey="modelo"
          name="Con modelo RF"
          stroke="#22d3ee"
          strokeWidth={3}
          dot={{ r: 3, fill: "#22d3ee" }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="azar"
          name="Llamando al azar"
          stroke="#6b6b78"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
