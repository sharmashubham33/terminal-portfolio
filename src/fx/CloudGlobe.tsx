import { useEffect, useRef } from "react";
import { regions } from "../data/profile";

/* ============================================================
   Rotating point-cloud Earth with cloud-region pings.
   Pure canvas. Land dots from a coarse procedural continents
   mask; region markers pulse + label on front-facing pass.
   ============================================================ */

const DEG = Math.PI / 180;

/* Coarse continent boxes [latMin, latMax, lngMin, lngMax] —
   enough to silhouette Earth at dot resolution. */
const LAND: [number, number, number, number][] = [
  // North America
  [50, 70, -165, -60], [30, 50, -125, -65], [15, 30, -115, -85], [60, 72, -50, -42],
  // South America
  [-5, 12, -80, -60], [-20, -5, -78, -40], [-40, -20, -72, -50], [-55, -40, -74, -64],
  // Europe
  [36, 60, -10, 30], [60, 71, 5, 30], [45, 55, 30, 60],
  // Africa
  [10, 35, -17, 35], [-10, 10, 8, 45], [-35, -10, 12, 40],
  // Asia
  [45, 70, 60, 140], [25, 45, 60, 120], [10, 25, 70, 90], [10, 25, 95, 110],
  [20, 45, 120, 145], [-10, 10, 95, 140],
  // Australia
  [-38, -12, 113, 153],
];

function isLand(lat: number, lng: number): boolean {
  for (const [a, b, c, d] of LAND) {
    if (lat >= a && lat <= b && lng >= c && lng <= d) return true;
  }
  return false;
}

interface P3 {
  x: number;
  y: number;
  z: number;
}

function toSphere(lat: number, lng: number, r: number): P3 {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

const PROVIDER_COLOR: Record<string, string> = {
  azure: "65, 217, 255",
  aws: "255, 180, 84",
  gcp: "180, 140, 255",
  home: "60, 255, 180",
};

export default function CloudGlobe({ size = 420 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const R = size * 0.38;
    const cx = size / 2;
    const cy = size / 2;

    // generate land dots once
    const dots: P3[] = [];
    for (let lat = -60; lat <= 75; lat += 3) {
      const stride = 3 / Math.max(0.35, Math.cos(lat * DEG));
      for (let lng = -180; lng < 180; lng += stride) {
        if (isLand(lat, lng)) dots.push(toSphere(lat, lng, R));
      }
    }
    const marks = regions.map((rg) => ({ ...rg, p: toSphere(rg.lat, rg.lng, R) }));

    let rot = 0.6; // start tilted toward Americas
    let raf = 0;
    let t = 0;

    function rotateY(p: P3, a: number): P3 {
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
    }

    function frame() {
      t += 1;
      if (!reduced) rot += 0.0028;
      ctx!.clearRect(0, 0, size, size);

      // atmosphere ring
      const grad = ctx!.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.28);
      grad.addColorStop(0, "rgba(60, 255, 180, 0)");
      grad.addColorStop(0.82, "rgba(60, 255, 180, 0.07)");
      grad.addColorStop(1, "rgba(60, 255, 180, 0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, size, size);

      ctx!.strokeStyle = "rgba(60, 255, 180, 0.18)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx!.stroke();

      // land dots
      for (const d of dots) {
        const p = rotateY(d, rot);
        const depth = (p.z + R) / (2 * R); // 0 back, 1 front
        if (p.z < -R * 0.18) continue;
        const a = 0.08 + depth * 0.5;
        ctx!.fillStyle = `rgba(60, 255, 180, ${a})`;
        const s = 0.7 + depth * 0.9;
        ctx!.fillRect(cx + p.x - s / 2, cy - p.y - s / 2, s, s);
      }

      // region markers
      for (const m of marks) {
        const p = rotateY(m.p, rot);
        if (p.z < 0) continue;
        const depth = (p.z + R) / (2 * R);
        const col = PROVIDER_COLOR[m.provider];
        const px = cx + p.x;
        const py = cy - p.y;

        // ping ring
        const phase = ((t * 0.018 + m.lat) % 2) / 2;
        const ringR = 2 + phase * 11;
        ctx!.strokeStyle = `rgba(${col}, ${(1 - phase) * 0.6 * depth})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(px, py, ringR, 0, Math.PI * 2);
        ctx!.stroke();

        ctx!.fillStyle = `rgba(${col}, ${0.95 * depth})`;
        ctx!.shadowColor = `rgba(${col}, 0.9)`;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(px, py, m.provider === "home" ? 3.2 : 2.2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;

        if (m.provider === "home") {
          ctx!.font = "9px JetBrains Mono, monospace";
          ctx!.fillStyle = `rgba(60, 255, 180, ${0.9 * depth})`;
          ctx!.fillText("⌂ TORONTO", px + 8, py + 3);
        }
      }

      // orbit arcs: home → random regions occasionally
      const homeP = rotateY(marks[0].p, rot);
      if (homeP.z > 0) {
        const k = Math.floor(t / 240) % (marks.length - 1) + 1;
        const target = rotateY(marks[k].p, rot);
        if (target.z > 0) {
          const prog = (t % 240) / 240;
          const sub = Math.min(prog * 1.4, 1);
          ctx!.strokeStyle = "rgba(65, 217, 255, 0.35)";
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          const midX = (homeP.x + target.x) / 2;
          const midY = (homeP.y + target.y) / 2 + R * 0.45;
          for (let s = 0; s <= sub; s += 0.02) {
            const ix = (1 - s) * (1 - s) * homeP.x + 2 * (1 - s) * s * midX + s * s * target.x;
            const iy = (1 - s) * (1 - s) * homeP.y + 2 * (1 - s) * s * midY + s * s * target.y;
            if (s === 0) ctx!.moveTo(cx + ix, cy - iy);
            else ctx!.lineTo(cx + ix, cy - iy);
          }
          ctx!.stroke();
        }
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return <canvas ref={ref} className="cloud-globe" aria-label="Rotating globe showing cloud regions Shubham operates across" />;
}
