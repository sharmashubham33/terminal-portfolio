import { useEffect, useState } from "react";
import { navSections, profile } from "../data/profile";
import { useUptime } from "../hooks";

export default function StatusBar({
  chaosActive,
  healing,
  onChaos,
  onTerminal,
  onPalette,
}: {
  chaosActive: boolean;
  healing: boolean;
  onChaos: () => void;
  onTerminal: () => void;
  onPalette: () => void;
}) {
  const uptime = useUptime(profile.careerStart);
  const [clock, setClock] = useState("");
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-CA", { hour12: false, timeZone: "America/Toronto" }) + " EST"
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    navSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const status = chaosActive
    ? { cls: "red", label: "MAJOR OUTAGE" }
    : healing
      ? { cls: "amber", label: "SELF-HEALING…" }
      : { cls: "", label: "ALL SYSTEMS OPERATIONAL" };

  return (
    <header className="statusbar">
      <a className="sb-brand" href="#hero" onClick={() => setMenuOpen(false)}>
        <span className="sb-brand-glyph">&gt;_</span> {profile.callsign}
      </a>

      <nav className={`sb-nav ${menuOpen ? "open" : ""}`}>
        {navSections.slice(1).map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? "on" : ""}
            onClick={() => setMenuOpen(false)}
          >
            <span className="sb-nav-num">{s.cmd}</span> {s.label}
          </a>
        ))}
      </nav>

      <div className="sb-right">
        <button className="sb-chip sb-palette" onClick={onPalette} title="Command palette">
          ⌘K
        </button>
        <button className="sb-chip sb-term" onClick={onTerminal} title="Open terminal (~)">
          &gt;_ TTY
        </button>
        <button
          className={`sb-chip sb-chaos ${chaosActive || healing ? "busy" : ""}`}
          onClick={onChaos}
          title="Run a chaos experiment on this very website"
        >
          ☣ CHAOS TEST
        </button>
        <div className={`sb-status ${status.cls}`}>
          <span className={`dot ${status.cls}`} /> {status.label}
        </div>
        <div className="sb-meta">
          <span title="Career uptime — time since first production deploy">UPTIME {uptime}</span>
          <span>{clock}</span>
        </div>
        <button
          className={`sb-burger ${menuOpen ? "x" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
