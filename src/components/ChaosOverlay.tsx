import { useEffect, useState } from "react";

/* ============================================================
   CHAOS MODE — the site genuinely breaks, alerts fire,
   then an auto-remediation console heals it. SRE as theatre.
   ============================================================ */

export type ChaosPhase = "idle" | "breaking" | "healing" | "resolved";

const ALERTS = [
  { sev: "CRIT", text: "portfolio-frontend: CrashLoopBackOff (restarts: 7)" },
  { sev: "CRIT", text: "p99 latency 4,217ms — SLO burn rate 36x" },
  { sev: "WARN", text: "css-engine: stylesheet integrity compromised" },
  { sev: "CRIT", text: "section/hero: 503 Service Unavailable" },
  { sev: "WARN", text: "dns: portfolio.shubham resolving to /dev/null" },
  { sev: "CRIT", text: "error budget: EXHAUSTED — freeze all deploys" },
  { sev: "PAGE", text: "paging on-call: shubham-primary…" },
];

const REMEDIATION = [
  "chaos-monkey contained — isolating blast radius",
  "argocd: detected drift from desired state",
  "initiating automated rollback → revision main@stable",
  "kubectl rollout undo deploy/portfolio-frontend",
  "rescheduling pods… 3/3 Ready",
  "css-engine: integrity restored from git (single source of truth)",
  "running smoke tests… 24/24 passed",
  "SLO check: p99 back to 38ms — burn rate normal",
  "incident resolved — writing blameless postmortem",
];

export default function ChaosOverlay({
  phase,
  elapsed,
}: {
  phase: ChaosPhase;
  elapsed: number;
}) {
  const [alertCount, setAlertCount] = useState(0);
  const [healCount, setHealCount] = useState(0);

  useEffect(() => {
    if (phase === "breaking") {
      setAlertCount(0);
      setHealCount(0);
      const id = setInterval(() => setAlertCount((c) => Math.min(c + 1, ALERTS.length)), 480);
      return () => clearInterval(id);
    }
    if (phase === "healing") {
      const id = setInterval(() => setHealCount((c) => Math.min(c + 1, REMEDIATION.length)), 620);
      return () => clearInterval(id);
    }
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <>
      {phase === "breaking" && (
        <div className="chaos-alerts" role="status" aria-live="polite">
          <div className="chaos-stamp">⚠ INCIDENT DECLARED ⚠</div>
          {ALERTS.slice(0, alertCount).map((a, i) => (
            <div key={i} className={`chaos-alert sev-${a.sev.toLowerCase()}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="chaos-sev">{a.sev}</span> {a.text}
            </div>
          ))}
        </div>
      )}

      {phase === "healing" && (
        <div className="heal-console panel-corners" role="status" aria-live="polite">
          <div className="heal-head">
            <span className="dot amber" /> AUTO-REMEDIATION ENGINE · runbook RB-077 “self-heal”
          </div>
          <div className="heal-body">
            {REMEDIATION.slice(0, healCount).map((r, i) => (
              <div key={i} className="heal-line">
                <span className="heal-check">✓</span> {r}
              </div>
            ))}
            {healCount < REMEDIATION.length && (
              <div className="heal-line running">
                <span className="heal-spinner" /> {REMEDIATION[healCount]}
              </div>
            )}
          </div>
        </div>
      )}

      {phase === "resolved" && (
        <div className="chaos-resolved" role="status">
          <div className="chaos-resolved-inner panel-corners">
            <div className="chaos-resolved-title">✓ SELF-HEALED IN {elapsed.toFixed(1)}s</div>
            <div className="chaos-resolved-sub">
              Zero humans paged. Zero data lost. Blameless postmortem filed.
            </div>
            <div className="chaos-resolved-sig">This is what I do for a living. — Shubham</div>
          </div>
        </div>
      )}
    </>
  );
}
