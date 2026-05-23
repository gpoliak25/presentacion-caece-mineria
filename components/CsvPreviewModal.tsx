"use client";

import { useEffect, useState } from "react";
import { X, FileText, Loader2, AlertCircle } from "lucide-react";

interface Props {
  filename: string | null;
  onClose: () => void;
}

/** Parsea una línea de CSV respetando campos entre comillas */
function parseLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') {
      inQuotes = !inQuotes;
    } else if (line[i] === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += line[i];
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string, maxRows = 15) {
  const lines = text.trim().split("\n").filter(Boolean);
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1, maxRows + 1).map(parseLine);
  const total = lines.length - 1; // filas sin header
  return { headers, rows, total };
}

export function CsvPreviewModal({ filename, onClose }: Props) {
  const [data, setData] = useState<{
    headers: string[];
    rows: string[][];
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    setData(null);
    setError(null);

    fetch(`/${filename}`)
      .then((r) => {
        if (!r.ok) throw new Error("Archivo no encontrado en public/");
        return r.text();
      })
      .then((text) => {
        setData(parseCSV(text, 15));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filename]);

  if (!filename) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 flex max-h-[82vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText className="text-cyan" size={20} />
            <div>
              <p className="font-mono text-sm font-semibold text-white">
                {filename}
              </p>
              {data && (
                <p className="text-xs text-white/40">
                  Mostrando primeras 15 filas de {data.total.toLocaleString("es-AR")} registros
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-auto p-4">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-cyan" size={26} />
              <span className="ml-3 text-white/50">Cargando {filename}…</span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <AlertCircle className="text-red-400" size={32} />
              <p className="font-semibold text-red-400">{error}</p>
              <p className="text-xs text-white/40">
                Copiá el archivo{" "}
                <span className="font-mono text-white/70">{filename}</span> a la
                carpeta{" "}
                <span className="font-mono text-white/70">
                  presentacion-caece-fresh/public/
                </span>
              </p>
            </div>
          )}

          {data && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    {data.headers.map((h, i) => (
                      <th
                        key={i}
                        className="whitespace-nowrap border-b border-white/10 bg-white/[0.03] px-3 py-2 text-left font-mono text-[0.63rem] font-semibold uppercase tracking-wide text-white/40"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="whitespace-nowrap px-3 py-2 font-mono text-[0.72rem] text-white/60"
                        >
                          {cell || <span className="text-white/20">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
