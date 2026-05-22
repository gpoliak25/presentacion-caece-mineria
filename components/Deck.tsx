"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideCover } from "./slides/SlideCover";
import { SlideProblema } from "./slides/SlideProblema";
import { SlideDatos } from "./slides/SlideDatos";
import { SlideTrampa } from "./slides/SlideTrampa";
import { SlidePipeline } from "./slides/SlidePipeline";
import { SlideModelos } from "./slides/SlideModelos";
import { SlideResultados } from "./slides/SlideResultados";
import { SlideAplicacion } from "./slides/SlideAplicacion";
import { SlideErrores } from "./slides/SlideErrores";
import { SlideConclusiones } from "./slides/SlideConclusiones";

const slides = [
  { id: "portada", node: <SlideCover /> },
  { id: "problema", node: <SlideProblema /> },
  { id: "datos", node: <SlideDatos /> },
  { id: "trampa", node: <SlideTrampa /> },
  { id: "pipeline", node: <SlidePipeline /> },
  { id: "modelos", node: <SlideModelos /> },
  { id: "resultados", node: <SlideResultados /> },
  { id: "aplicacion", node: <SlideAplicacion /> },
  { id: "errores", node: <SlideErrores /> },
  { id: "conclusiones", node: <SlideConclusiones /> },
];

const LAST = slides.length - 1;

const slideV: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 64 : -64 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -64 : 64 }),
};

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const lockRef = useRef(false);
  const touchY = useRef<number | null>(null);

  const next = useCallback(() => {
    setDir(1);
    setIndex((c) => Math.min(LAST, c + 1));
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((c) => Math.max(0, c - 1));
  }, []);

  const jumpTo = useCallback((target: number) => {
    setIndex((c) => {
      const t = Math.max(0, Math.min(LAST, target));
      setDir(t >= c ? 1 : -1);
      return t;
    });
  }, []);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 720);
  }, []);

  /* True when the active slide is scrolled to the relevant edge */
  const atEdge = (goingDown: boolean) => {
    const sc = document.querySelector<HTMLElement>(".deck-scroll");
    if (!sc) return true;
    return goingDown
      ? sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 4
      : sc.scrollTop <= 4;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        jumpTo(0);
      } else if (e.key === "End") {
        jumpTo(LAST);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, jumpTo]);

  // Wheel — only navigates when the slide content is at an edge
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lockRef.current || Math.abs(e.deltaY) < 16) return;
      const down = e.deltaY > 0;
      if (!atEdge(down)) return;
      lock();
      if (down) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, lock]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (touchY.current == null || lockRef.current) return;
      const delta = touchY.current - e.changedTouches[0].clientY;
      touchY.current = null;
      if (Math.abs(delta) < 56) return;
      const down = delta > 0;
      if (!atEdge(down)) return;
      lock();
      if (down) next();
      else prev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev, lock]);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden">
      <div className="deck-bg" />

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={slides[index].id}
          custom={dir}
          variants={slideV}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slides[index].node}
        </motion.div>
      </AnimatePresence>

      {/* Bottom navigation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-50 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-ink-2/85 px-2 py-2 backdrop-blur-md">
          <NavBtn onClick={prev} disabled={index === 0} label="Anterior">
            <ChevronLeft size={18} />
          </NavBtn>

          <div className="flex items-center gap-1.5 px-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jumpTo(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                className="group flex h-6 items-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-gradient-to-r from-violet to-cyan"
                      : "w-1.5 bg-white/20 group-hover:bg-white/45"
                  }`}
                />
              </button>
            ))}
          </div>

          <NavBtn onClick={next} disabled={index === LAST} label="Siguiente">
            <ChevronRight size={18} />
          </NavBtn>
        </div>
      </div>

      {/* Slide counter */}
      <div className="pointer-events-none absolute bottom-7 right-7 z-50 hidden font-mono text-sm text-faint sm:block">
        <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
        <span> / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </main>
  );
}

function NavBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.07] hover:text-fg disabled:cursor-not-allowed disabled:opacity-25"
    >
      {children}
    </button>
  );
}
