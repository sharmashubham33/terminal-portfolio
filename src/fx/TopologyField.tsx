import { useEffect, useRef } from "react";

/* ============================================================
   Ambient infrastructure topology field.
   Drifting nodes + connection lines + occasional packet pulses,
   with subtle mouse parallax. Fixed full-viewport canvas.
   ============================================================ */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

export default function TopologyField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const LINK_DIST = 170;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.7,
      }));
      packets = [];
    }

    function spawnPacket() {
      if (nodes.length < 2 || packets.length > 6) return;
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const dx = nodes[i].x - nodes[a].x;
        const dy = nodes[i].y - nodes[a].y;
        const d = dx * dx + dy * dy;
        if (d < bestD && d < LINK_DIST * LINK_DIST * 4) {
          bestD = d;
          best = i;
        }
      }
      if (best >= 0) packets.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.012 });
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // gentle mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          const f = 14 / d2;
          n.x += dx * f;
          n.y += dy * f;
        }
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.13;
            ctx!.strokeStyle = `rgba(60, 255, 180, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = "rgba(60, 255, 180, 0.34)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // packets travelling between nodes
      if (Math.random() < 0.02) spawnPacket();
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const na = nodes[p.a];
        const nb = nodes[p.b];
        if (!na || !nb) continue;
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;
        ctx!.fillStyle = "rgba(65, 217, 255, 0.85)";
        ctx!.shadowColor = "rgba(65, 217, 255, 0.9)";
        ctx!.shadowBlur = 7;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    if (!reduced) raf = requestAnimationFrame(frame);
    else frame(); // draw one static frame

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} className="topology-field" aria-hidden="true" />;
}
