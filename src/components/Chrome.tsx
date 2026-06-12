import { useEffect, useState } from "react";
import { logLines, navSections, profile } from "../data/profile";

/* Ambient scrolling log ticker pinned to the bottom of the viewport. */
export function LogTicker({ chaosActive }: { chaosActive: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % logLines.length), 4200);
    return () => clearInterval(id);
  }, []);

  const line = chaosActive
    ? "CRIT  chaos-monkey: injecting failures — hold on to something"
    : logLines[idx];

  return (
    <div className={`logticker ${chaosActive ? "crit" : ""}`}>
      <span className="lt-label">{chaosActive ? "ALERT" : "LIVE"}</span>
      <span className="lt-line" key={idx + (chaosActive ? "c" : "")}>
        {line}
      </span>
    </div>
  );
}

/* Status-page style footer. */
export function Footer() {
  const [hash] = useState(() =>
    Array.from({ length: 7 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")
  );

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="sb-brand-glyph">&gt;_</span> {profile.callsign}
          </div>
          <p className="footer-tag">
            Designed, provisioned, and operated by {profile.name}.<br />
            No templates were harmed. Handcrafted like good infrastructure: as code.
          </p>
        </div>
        <div className="footer-col">
          <div className="footer-h">SYSTEM CHECKS</div>
          {navSections.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="footer-check">
              <span className="dot static" /> {s.label} <em>operational</em>
            </a>
          ))}
        </div>
        <div className="footer-col">
          <div className="footer-h">UPLINKS</div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="footer-check">
            <span className="dot static" /> GitHub <em>@sharmashubham33</em>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-check">
            <span className="dot static" /> LinkedIn <em>/in/sharmashubham33</em>
          </a>
          <a href={`mailto:${profile.email}`} className="footer-check">
            <span className="dot static" /> Email <em>{profile.email}</em>
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="footer-check">
            <span className="dot static" /> Résumé <em>PDF, signed artifact</em>
          </a>
        </div>
      </div>
      <div className="footer-base">
        <span>build {hash} · main · deployed from a pipeline, obviously</span>
        <span>
          © {new Date().getFullYear()} {profile.name} · 99.9% uptime, 100% human-written ops
        </span>
      </div>
    </footer>
  );
}
