import { useEffect, useRef } from "react";

/* Tiny animated sparkline for metric cards. */
export default function Sparkline({
  trend,
  color = "60, 255, 180",
  w = 92,
  h = 26,
}: {
  trend: "up" | "down" | "flat";
  color?: string;
  w?: number;
  h?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 26;
    const pts: number[] = [];
    let base = trend === "up" ? 0.72 : trend === "down" ? 0.3 : 0.5;
    for (let i = 0; i < N; i++) {
      const drift = trend === "up" ? -0.012 : trend === "down" ? 0.012 : 0;
      base += drift + (Math.random() - 0.5) * 0.09;
      base = Math.max(0.12, Math.min(0.88, base));
      pts.push(base);
    }

    let raf = 0;
    let tick = 0;

    function draw() {
      tick++;
      if (tick % 22 === 0) {
        pts.shift();
        const drift = trend === "up" ? -0.012 : trend === "down" ? 0.012 : 0;
        let nv = pts[pts.length - 1] + drift + (Math.random() - 0.5) * 0.09;
        nv = Math.max(0.12, Math.min(0.88, nv));
        pts.push(nv);
      }
      ctx!.clearRect(0, 0, w, h);
      ctx!.beginPath();
      pts.forEach((p, i) => {
        const x = (i / (N - 1)) * w;
        const y = p * h;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      });
      ctx!.strokeStyle = `rgba(${color}, 0.85)`;
      ctx!.lineWidth = 1.4;
      ctx!.stroke();
      // fill under line
      ctx!.lineTo(w, h);
      ctx!.lineTo(0, h);
      ctx!.closePath();
      const g = ctx!.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, `rgba(${color}, 0.22)`);
      g.addColorStop(1, `rgba(${color}, 0)`);
      ctx!.fillStyle = g;
      ctx!.fill();
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [trend, color, w, h]);

  return <canvas ref={ref} aria-hidden="true" />;
}
