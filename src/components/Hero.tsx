import { useEffect, useState } from "react";
import CloudGlobe from "../fx/CloudGlobe";
import Sparkline from "../fx/Sparkline";
import { metrics, profile } from "../data/profile";
import { useReveal, useScramble } from "../hooks";

const TREND_COLOR: Record<string, string> = {
  up: "60, 255, 180",
  down: "65, 217, 255", // down is good here (cost ↓)
  flat: "255, 180, 84",
};

export default function Hero({ onTerminal, onChaos }: { onTerminal: () => void; onChaos: () => void }) {
  const ref = useReveal<HTMLElement>();
  const { out: nameOut } = useScramble(profile.name.toUpperCase(), true, 0.55);
  const [roleIdx, setRoleIdx] = useState(0);
  // useScramble re-runs automatically whenever the text (role) changes
  const { out: roleOut } = useScramble(profile.roles[roleIdx], true, 1.4);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-pre reveal">
            <span className="dot" /> INCOMING TRANSMISSION · {profile.coordinates}
          </div>
          <h1 className="hero-name reveal" aria-label={profile.name}>
            {nameOut || "\u00A0"}
          </h1>
          <div className="hero-role reveal">
            <span className="hero-role-prompt">$ whoami --now</span>
            <span className="hero-role-text">{roleOut}<span className="boot-caret" /></span>
          </div>
          <p className="hero-tagline reveal">{profile.tagline}</p>

          <div className="hero-ctas reveal">
            <button className="btn solid" onClick={onTerminal}>&gt;_ open terminal</button>
            <a className="btn" href="#deployments">view deploy history</a>
            <button className="btn danger" onClick={onChaos} title="Yes, it will actually break the site.">
              ☣ break this site
            </button>
          </div>

          <div className="hero-hint reveal">
            <span className="kbd">⌘K</span> command palette · <span className="kbd">~</span> terminal ·{" "}
            <span className="kbd">↑↑↓↓←→←→BA</span> if you know, you know
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="globe-wrap panel-corners">
            <CloudGlobe size={430} />
            <div className="globe-caption">
              <span className="globe-legend"><i style={{ background: "#41d9ff" }} /> azure</span>
              <span className="globe-legend"><i style={{ background: "#ffb454" }} /> aws</span>
              <span className="globe-legend"><i style={{ background: "#b48cff" }} /> gcp</span>
              <span className="globe-legend"><i style={{ background: "#3cffb4" }} /> operator</span>
            </div>
            <div className="globe-readout">13 regions · 3 clouds · 1 engineer on call</div>
          </div>
        </div>
      </div>

      <div className="hero-metrics">
        {metrics.map((m, i) => (
          <div className="metric panel panel-corners reveal" key={m.label} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="metric-top">
              <span className="metric-label">{m.label}</span>
              <span className={`metric-trend t-${m.trend}`}>
                {m.trend === "up" ? "▲" : m.trend === "down" ? "▼" : "■"}
              </span>
            </div>
            <div className="metric-value glow-num">{m.value}</div>
            <div className="metric-bottom">
              <span className="metric-detail">{m.detail}</span>
              <Sparkline trend={m.trend} color={TREND_COLOR[m.trend]} />
            </div>
          </div>
        ))}
      </div>

      <a className="hero-scroll" href="#manifest" aria-label="Scroll to manifest">
        <span>SCROLL TO INSPECT</span>
        <i />
      </a>
    </section>
  );
}
