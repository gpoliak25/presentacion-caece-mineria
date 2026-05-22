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
        <div className="section-label mb-5 flex items-center gap-2 text-violet">
          <span>10</span>
          <span className="opacity-40">/</span>
          <span>Bibliografía y Cierre</span>
        </div>
      </Item>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* References */}
        <div className="flex flex-col gap-3">
          <Item>
            <div className="flex items-center gap-2.5">
              <BookOpen className="text-violet" size={18} />
              <span className="font-semibold text-fg">Referencias principales</span>
            </div>
          </Item>

          {refs.map((r) => (
            <Item key={r.authors}>
              <Card className="flex gap-3 p-4">
                <div
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: r.accent }}
                />
                <div>
                  <p className="text-xs font-semibold text-fg">{r.authors}</p>
                  <p className="mt-0.5 text-xs italic text-muted">{r.title}</p>
                  <p className="mt-0.5 text-[0.7rem] text-faint">{r.source}</p>
                </div>
              </Card>
            </Item>
          ))}
        </div>

        {/* Closing */}
        <div className="flex flex-col gap-4">
          <Item>
            <Card glow="cyan" className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <IconBadge icon={GraduationCap} accent="cyan" size="lg" />
              </div>
              <h3 className="text-2xl font-bold text-fg">Gracias</h3>
              <p className="mt-2 text-sm text-muted">
                Maestría en Ciencia de Datos e Innovación Empresarial
              </p>
              <p className="text-sm text-muted">
                Minería de Datos Empresariales · 1er Cuatrimestre 2026
              </p>
              <div className="my-4 h-px w-full bg-line" />
              <div className="flex flex-col gap-1.5 text-sm">
                <p className="font-semibold text-fg">Lic. Lorena López</p>
                <p className="font-semibold text-fg">Lic. Gisela Poliak</p>
              </div>
              <div className="my-4 h-px w-full bg-line" />
              <p className="text-xs text-faint">
                Docentes: Lic. Juan Azcurra · Lic. Pablo Paul
              </p>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-3 p-4">
              <Mail className="mt-0.5 shrink-0 text-violet" size={18} />
              <div>
                <p className="text-sm font-semibold text-fg">Preguntas</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Dataset y notebook disponibles en el repositorio del trabajo.
                  Código en Python (scikit-learn) con todos los pasos reproducibles.
                </p>
              </div>
            </Card>
          </Item>

          <Item>
            <Card className="flex items-start gap-3 p-4">
              <ExternalLink className="mt-0.5 shrink-0 text-cyan" size={18} />
              <div>
                <p className="text-sm font-semibold text-fg">Dataset</p>
                <p className="mt-1 text-xs text-muted">
                  Bank Marketing · UCI Machine Learning Repository
                </p>
                <p className="mt-0.5 font-mono text-[0.68rem] text-faint">
                  Moro et al. (2014) · 49.732 registros · 17 variables originales
                </p>
              </div>
            </Card>
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
