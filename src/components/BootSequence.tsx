import { useEffect, useRef, useState } from "react";
import "../styles/boot.css";

/* ============================================================
   BOOT: the portfolio provisions itself with terraform.
   Typed command → plan → resources created → outputs → enter.
   ============================================================ */

interface BootLine {
  text: string;
  delay: number; // ms before this line appears
  cls?: string;
}

const CMD = "terraform apply -auto-approve shubham.sharma/portfolio";

const SCRIPT: BootLine[] = [
  { text: "", delay: 150 },
  { text: "Initializing the backend...", delay: 320, cls: "dim" },
  { text: "Initializing provider plugins...", delay: 240, cls: "dim" },
  { text: '- Finding sharmashubham33/career versions matching ">= 5.0"...', delay: 300, cls: "dim" },
  { text: "- Installing sharmashubham33/career v5.2.0... (signed, verified)", delay: 380, cls: "dim" },
  { text: "", delay: 200 },
  { text: "career_engineer.shubham: Refreshing state... [id=devops-cloud-sre]", delay: 350 },
  { text: "", delay: 250 },
  { text: "Terraform will perform the following actions:", delay: 300 },
  { text: "", delay: 120 },
  { text: '  # portfolio_site.mission_control will be created', delay: 180, cls: "dim" },
  { text: '  + resource "portfolio_site" "mission_control" {', delay: 140, cls: "add" },
  { text: '      + uptime          = "99.9%"', delay: 110, cls: "add" },
  { text: '      + clouds          = ["azure", "aws", "gcp"]', delay: 110, cls: "add" },
  { text: '      + ai_clusters     = "tenstorrent · on-prem"', delay: 110, cls: "add" },
  { text: '      + vms_automated   = 120', delay: 110, cls: "add" },
  { text: '      + chaos_resilient = true', delay: 110, cls: "add" },
  { text: '      + boring_template = false', delay: 130, cls: "add" },
  { text: "    }", delay: 110, cls: "add" },
  { text: "", delay: 180 },
  { text: "Plan: 7 to add, 0 to change, 0 to destroy.", delay: 420, cls: "bold" },
  { text: "", delay: 300 },
  { text: "experience.career: Creating... [4 roles, 5+ years]", delay: 240 },
  { text: "experience.career: Creation complete after 0.4s [id=v4-live · tenstorrent]", delay: 360, cls: "ok" },
  { text: "skills.cluster: Creating... [10 namespaces, 60+ pods]", delay: 220 },
  { text: "skills.cluster: Creation complete after 0.3s [pods=Running]", delay: 330, cls: "ok" },
  { text: "certifications.wall: Creating... [31 attestations]", delay: 220 },
  { text: "certifications.wall: Creation complete after 0.6s [verified=true]", delay: 380, cls: "ok" },
  { text: "projects.services: Creating... [AIOPS-CORE, GAUNTLET, PANOPTICON]", delay: 230 },
  { text: "projects.services: Creation complete after 0.5s [status=OPERATIONAL]", delay: 350, cls: "ok" },
  { text: "genai.rag_pipeline: Creating... [azure openai + vector db]", delay: 230 },
  { text: "genai.rag_pipeline: Creation complete after 0.4s [indexed=1,842 chunks]", delay: 330, cls: "ok" },
  { text: "chaos.self_heal: Creating... [break glass when ready]", delay: 240 },
  { text: "chaos.self_heal: Creation complete after 0.2s [armed=true]", delay: 300, cls: "ok" },
  { text: "mission_control.ui: Creating... [phosphor displays warming up]", delay: 260 },
  { text: "mission_control.ui: Creation complete after 0.8s [glow=ON]", delay: 420, cls: "ok" },
  { text: "", delay: 280 },
  { text: "Apply complete! Resources: 7 added, 0 changed, 0 destroyed.", delay: 200, cls: "complete" },
  { text: "", delay: 240 },
  { text: "Outputs:", delay: 200, cls: "bold" },
  { text: "", delay: 120 },
  { text: 'engineer = "Shubham Sharma"', delay: 200, cls: "out" },
  { text: 'status   = "ALL SYSTEMS OPERATIONAL"', delay: 220, cls: "out" },
  { text: 'uptime   = "99.9% — and counting"', delay: 240, cls: "out" },
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState<BootLine[]>([]);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    timersRef.current.forEach(clearTimeout);
    setExiting(true);
    setTimeout(onDone, 650);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // skip straight through for reduced motion
      const t = window.setTimeout(finish, 400);
      return () => clearTimeout(t);
    }

    // 1. type the command
    let i = 0;
    const typeNext = () => {
      i++;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) {
        timersRef.current.push(window.setTimeout(typeNext, 14 + Math.random() * 26));
      } else {
        timersRef.current.push(window.setTimeout(playScript, 380));
      }
    };

    // 2. play the output script
    const playScript = () => {
      let idx = 0;
      const next = () => {
        if (idx >= SCRIPT.length) {
          setReady(true);
          timersRef.current.push(window.setTimeout(finish, 3200));
          return;
        }
        const line = SCRIPT[idx++];
        setLines((prev) => [...prev, line]);
        timersRef.current.push(window.setTimeout(next, line.delay));
      };
      next();
    };

    timersRef.current.push(window.setTimeout(typeNext, 500));

    const onKey = () => finish();
    const t = window.setTimeout(() => {
      window.addEventListener("keydown", onKey);
      window.addEventListener("pointerdown", onKey);
    }, 1200); // ignore stray clicks in the first second

    return () => {
      timersRef.current.forEach(clearTimeout);
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  return (
    <div className={`boot ${exiting ? "boot-exit" : ""}`}>
      <button className="boot-skip" onClick={finish}>
        SKIP BOOT <span className="kbd">esc</span>
      </button>
      <div className="boot-frame">
        <div className="boot-titlebar">
          <span className="boot-dot r" /><span className="boot-dot y" /><span className="boot-dot g" />
          <span className="boot-title">shubham@ops-console — provisioning portfolio</span>
        </div>
        <div className="boot-body" ref={scrollRef}>
          <div className="boot-line">
            <span className="boot-prompt">shubham@ops ~ %</span> {typed}
            {typed.length < CMD.length && <span className="boot-caret" />}
          </div>
          {lines.map((l, i) => (
            <div key={i} className={`boot-line ${l.cls ?? ""}`}>
              {l.text === "" ? "\u00A0" : l.text}
            </div>
          ))}
          {ready && (
            <div className="boot-enter">
              ▸ PRESS ANY KEY TO ENTER MISSION CONTROL <span className="boot-caret" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
