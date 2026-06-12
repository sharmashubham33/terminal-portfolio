import { useCallback, useEffect, useRef, useState } from "react";

/* IntersectionObserver-driven reveal. Attach returned ref to a container;
   children with .reveal get data-rv="1" staggered when they enter view.
   Uses a data attribute (NOT a class) so React re-renders that rewrite
   className can never wipe the revealed state. Re-observes anything not
   yet revealed — safe under StrictMode double effects and when filtered
   lists mount new nodes (pass rescanKey). */
export function useReveal<T extends HTMLElement>(rescanKey?: unknown) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>('.reveal:not([data-rv="1"])'));
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            const idx = Number(t.dataset.ri ?? 0);
            setTimeout(() => {
              t.dataset.rv = "1";
            }, idx * 90);
            io.unobserve(t);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t, i) => {
      t.dataset.ri = String(i % 8);
      io.observe(t);
    });
    return () => io.disconnect();
  }, [rescanKey]);
  return ref;
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&@01";

/* Scramble-decode text effect. Returns display string + restart fn. */
export function useScramble(text: string, autoStart = true, speed = 1) {
  const [out, setOut] = useState(autoStart ? "" : text);
  const frameRef = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = Math.max(14, text.length * 2.2) / speed;
    const tickFn = () => {
      frame++;
      const progress = frame / total;
      const settled = Math.floor(progress * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < settled) s += text[i];
        else if (text[i] === " ") s += " ";
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (progress < 1) frameRef.current = requestAnimationFrame(tickFn);
      else setOut(text);
    };
    frameRef.current = requestAnimationFrame(tickFn);
  }, [text, speed]);

  useEffect(() => {
    if (autoStart) run();
    return () => cancelAnimationFrame(frameRef.current);
  }, [run, autoStart]);

  return { out, run };
}

/* Live duration since careerStart, formatted like an uptime counter. */
export function useUptime(startIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const start = new Date(startIso).getTime();
  let s = Math.max(0, Math.floor((now - start) / 1000));
  const years = Math.floor(s / 31557600);
  s -= years * 31557600;
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hrs = Math.floor(s / 3600);
  s -= hrs * 3600;
  const min = Math.floor(s / 60);
  const sec = s - min * 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${years}y ${String(days).padStart(3, "0")}d ${pad(hrs)}:${pad(min)}:${pad(sec)}`;
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function useKonami(onTrigger: () => void) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          onTrigger();
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onTrigger]);
}
