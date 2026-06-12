import { useCallback, useEffect, useRef, useState } from "react";
import BootSequence from "./components/BootSequence";
import StatusBar from "./components/StatusBar";
import Hero from "./components/Hero";
import Manifest from "./components/Manifest";
import DeployHistory from "./components/DeployHistory";
import SkillCluster from "./components/SkillCluster";
import LiveServices from "./components/LiveServices";
import Attestations from "./components/Attestations";
import Uplink from "./components/Uplink";
import Terminal from "./components/Terminal";
import CommandPalette from "./components/CommandPalette";
import ChaosOverlay, { type ChaosPhase } from "./components/ChaosOverlay";
import TopologyField from "./fx/TopologyField";
import { LogTicker, Footer } from "./components/Chrome";
import { useKonami } from "./hooks";

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem("ops-booted") === "1");
  const [termOpen, setTermOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chaosPhase, setChaosPhase] = useState<ChaosPhase>("idle");
  const [retro, setRetro] = useState(false);
  const chaosStartRef = useRef(0);
  const [healSeconds, setHealSeconds] = useState(0);
  const chaosTimers = useRef<number[]>([]);

  const runChaos = useCallback(() => {
    if (chaosPhase !== "idle") return;
    chaosStartRef.current = performance.now();
    setChaosPhase("breaking");
    chaosTimers.current.push(
      window.setTimeout(() => {
        setChaosPhase("healing");
      }, 4400),
      window.setTimeout(() => {
        setHealSeconds((performance.now() - chaosStartRef.current) / 1000);
        setChaosPhase("resolved");
      }, 10400),
      window.setTimeout(() => setChaosPhase("idle"), 14600)
    );
  }, [chaosPhase]);

  useEffect(() => () => chaosTimers.current.forEach(clearTimeout), []);

  useKonami(useCallback(() => setRetro((r) => !r), []));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        setTermOpen(false);
      } else if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        setTermOpen((v) => !v);
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const baseTitle = document.title;
    const onVis = () => {
      document.title = document.hidden
        ? "⚠ OPERATOR WENT IDLE — paging shubham…"
        : baseTitle;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!booted) {
    return (
      <BootSequence
        onDone={() => {
          sessionStorage.setItem("ops-booted", "1");
          setBooted(true);
        }}
      />
    );
  }

  const chaosClass =
    chaosPhase === "breaking" ? "chaos-broken" : chaosPhase === "healing" ? "chaos-healing" : "";

  return (
    <div className={`app crt ${chaosClass} ${retro ? "retro" : ""}`}>
      <TopologyField />
      <StatusBar
        chaosActive={chaosPhase === "breaking"}
        healing={chaosPhase === "healing"}
        onChaos={runChaos}
        onTerminal={() => setTermOpen(true)}
        onPalette={() => setPaletteOpen(true)}
      />

      <main>
        <Hero onTerminal={() => setTermOpen(true)} onChaos={runChaos} />
        <Manifest />
        <DeployHistory />
        <SkillCluster />
        <LiveServices />
        <Attestations />
        <Uplink />
      </main>

      <Footer />
      <LogTicker chaosActive={chaosPhase === "breaking"} />

      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        onChaos={runChaos}
        onReboot={() => {
          sessionStorage.removeItem("ops-booted");
          setTermOpen(false);
          setBooted(false);
          window.scrollTo(0, 0);
        }}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onTerminal={() => {
          setPaletteOpen(false);
          setTermOpen(true);
        }}
        onChaos={() => {
          setPaletteOpen(false);
          runChaos();
        }}
      />
      <ChaosOverlay phase={chaosPhase} elapsed={healSeconds} />

      {retro && (
        <div className="retro-badge" role="status">
          ◉ RETRO AMBER MODE — konami accepted. you absolute legend.
        </div>
      )}
    </div>
  );
}
