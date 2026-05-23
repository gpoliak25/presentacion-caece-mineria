"use client";

import { BookOpen, ExternalLink, GraduationCap, Mail } from "lucide-react";
import { SlideShell, Item } from "../slide-shell";
import { Card, IconBadge } from "../ui";

const refs = [
  {
    authors: "Moro, S., Cortez, P. & Rita, P. (2014)",
    title: "A data-driven approach to predict the success of bank telemarketing.",
    source: "Decision Support Systems, 62, 22-31. UCI Machine Learning Repository.",
    accent: "#22d3ee",
  },
  {
    authors: "Provost, F. & Fawcett, T. (2013)",
    title: "Data Science for Business.",
    source: "O'Reilly Media. Cap. 7: Decision Analytic Thinking.",
    accent: "#a78bfa",
  },
  {
    authors: "James, G., Witten, D., Hastie, T. & Tibshirani, R. (2021)",
    title: "An Introduction to Statistical Learning (2nd ed.).",
    source: "Springer. Cap. 8: Tree-Based Methods.",
    accent: "#a78bfa",
  },
  {
    authors: "Burkov, A. (2019)",
    title: "The Hundred-Page Machine Learning Book.",
    source: "Cap. 3: Fundamental Algorithms — Decision Trees & Ensembles.",
    accent: "#fbbf24",
  },
  {
    authors: "Google Developers (2024)",
    title: "Machine Learning Crash Course — Classification.",
    source: "developers.google.com/machine-learning/crash-course",
    accent: "#34d399",
  },
];

export function SlideBibliografia() {
  return (
    <SlideShell>
      <Item>
        <div className="section-label mb-3 flex items-center gap-2 text-violet">
          <span>10</span>
          <span className="opacity-40">/</span>
          <span>Bibliografía y Cierre</span>
        </div>
      </Item>

      <div className="grid flex-1 gap-2 lg:grid-cols-2">
        {/* References */}
        <div className="flex flex-col gap-1.5">
          <Item>
            <div className="flex items-center gap-2">
              <BookOpen className="text-violet" size={14} />
              <span className="text-xs font-semibold text-fg">Referencias principales</span>
            </div>
          </Item>

          {refs.map((r) => (
            <Item key={r.authors}>
              <Card className="flex gap-2 p-2.5">
                <div
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: r.accent }}
                />
                <div>
                  <p className="text-[0.65rem] font-semibold text-fg">{r.authors}</p>
                  <p className="mt-0.5 text-[0.6rem] italic text-muted">{r.title}</p>
                  <p className="text-[0.55rem] text-faint">{r.source}</p>
                </div>
              </Card>
            </Item>
          ))}
        </div>

        {/* Closing */}
        <div className="flex flex-col gap-2">
          <Item>
            <Card glow="cyan" className="p-4 text-center">
              <div className="mb-2 flex justify-center">
                <IconBadge icon={GraduationCap} accent="cyan" size="md" />
              </div>
              <h3 className="text-xl font-bold text-fg">Gracias</h3>
              <p className="mt-1 text-xs text-muted">
                Maestría en Ciencia de Datos e Innovación Empresarial
              </p>
              <p className="text-xs text-muted">
                Minería de Datos Empresariales · 1er Cuatrimestre 2026
              </p>
              <div className="my-2 h-px w-full bg-line" />
              <div className="flex flex-col gap-0.5 text-xs">
                <p className="font-semibold text-fg">Lic. Lorena López</p>
                <p className="font-semibold text-fg">Lic. Gisela Poliak</p>
              </div>
              <div className="my-2 h-px w-full bg-line" />
              <p className="text-[0.65rem] text-faint">
                Docentes: Lic. Juan Azcurra · Lic. Pablo Paul
              </p>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-2 p-3">
              <Mail className="mt-0.5 shrink-0 text-violet" size={14} />
              <div>
                <p className="text-xs font-semibold text-fg">Preguntas</p>
                <p className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">
                  Dataset y notebook disponibles. Código en Python (scikit-learn).
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-2 p-3">
              <ExternalLink className="mt-0.5 shrink-0 text-cyan" size={14} />
              <div>
                <p className="text-xs font-semibold text-fg">Dataset</p>
                <p className="mt-0.5 text-[0.65rem] text-muted">
                  Bank Marketing · UCI ML Repository
                </p>
                <p className="font-mono text-[0.55rem] text-faint">
                  Moro et al. (2014) · 49.732 registros
                </p>
              </div>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
