import { useEffect, useRef, useState } from "react";
import { attestations, cluster, deployments, navSections, profile } from "../data/profile";

/* ============================================================
   A real terminal. Type `help`. Recruiters: try `sudo hire`.
   ============================================================ */

interface TermLine {
  text: string;
  cls?: string;
}

const NEOFETCH = [
  "   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄    shubham@ops-console",
  "  █▀           ▀▀█    ─────────────────────────────",
  "  █  ▄▄▄▄▄▄▄▄▄▄▄▄▀    OS:      ShubhamOS v6.0 LTS (career-hardened)",
  "  █  █                Host:    Tenstorrent · Toronto, ON · Earth",
  "  █  ▀▀▀▀▀▀▀▀▀▀▀▄     Kernel:  AI-Infra · DevOps · SRE 6.0+",
  "  ▀▄▄▄▄▄▄▄▄▄▄▄  █     Uptime:  5+ years, 0 unplanned reboots",
  "             █  █     Infra:   Azure · AWS · GCP · on-prem AI clusters",
  "  ▄▄▄▄▄▄▄▄▄▄▄▀  █     Shell:   bash | python | ansible | terraform",
  "  █▄▄▄▄▄▄▄▄▄▄▄▄▄▀     Certs:   31 verified attestations",
  "                      Memory:  ∞ runbooks indexed",
].join("\n");

export default function Terminal({
  open,
  onClose,
  onChaos,
  onReboot,
}: {
  open: boolean;
  onClose: () => void;
  onChaos: () => void;
  onReboot: () => void;
}) {
  const [lines, setLines] = useState<TermLine[]>([
    { text: "SHUBHAM://OPS secure shell — connected.", cls: "ok" },
    { text: 'type "help" for commands. type "sudo hire shubham" if you\'re convinced already.', cls: "dim" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const print = (out: TermLine[]) => setLines((prev) => [...prev, ...out]);

  const exec = (raw: string) => {
    const cmd = raw.trim();
    print([{ text: `shubham@ops ~ % ${cmd}`, cls: "cmd" }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (head) {
      case "help":
        print([
          { text: "AVAILABLE COMMANDS", cls: "bold" },
          { text: "  whoami            who is this guy" },
          { text: "  neofetch          system info, with style" },
          { text: "  ls                list portfolio sections" },
          { text: "  goto <section>    warp to a section (e.g. goto cluster)" },
          { text: "  kubectl get pods  inspect the skill cluster" },
          { text: "  git log --career  deployment history" },
          { text: "  terraform plan    preview hiring me" },
          { text: "  certs             count attestations by issuer" },
          { text: "  uptime            career uptime" },
          { text: "  ping shubham      check if reachable" },
          { text: "  resume            open the signed artifact (PDF)" },
          { text: "  contact           open uplink channels" },
          { text: "  chaos             ⚠ inject failure into this website" },
          { text: "  reboot            replay the boot sequence" },
          { text: "  sudo hire shubham the only command that matters" },
          { text: "  clear / exit      housekeeping" },
        ]);
        break;

      case "whoami":
        print([
          { text: `${profile.name} — ${profile.roles.join(" · ")}`, cls: "ok" },
          { text: profile.tagline, cls: "dim" },
        ]);
        break;

      case "neofetch":
        print(NEOFETCH.split("\n").map((t) => ({ text: t, cls: "neo" })));
        break;

      case "ls":
        print(navSections.map((s) => ({ text: `drwxr-xr-x  shubham ops  ${s.cmd}/  ${s.label.toLowerCase().replace(/ /g, "-")}` })));
        break;

      case "goto": {
        const target = navSections.find((s) => s.id.includes(arg) || s.label.toLowerCase().includes(arg));
        if (target) {
          print([{ text: `warping to ${target.label}…`, cls: "ok" }]);
          setTimeout(() => {
            document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
            onClose();
          }, 350);
        } else {
          print([{ text: `goto: section "${arg}" not found. try: ${navSections.map((s) => s.id).join(", ")}`, cls: "err" }]);
        }
        break;
      }

      case "git":
        if (arg.startsWith("log")) {
          deployments.forEach((d) =>
            print([
              { text: `* ${d.version}  ${d.title} @ ${d.organization}`, cls: "ok" },
              { text: `         ${d.period} · ${d.status}`, cls: "dim" },
            ])
          );
        } else {
          print([{ text: "try: git log --career", cls: "dim" }]);
        }
        break;

      case "kubectl": {
        if (arg.startsWith("get pods")) {
          print([{ text: "NAMESPACE            NAME                       READY   STATUS    RESTARTS   AGE", cls: "bold" }]);
          cluster.forEach((ns) =>
            ns.pods.slice(0, 3).forEach((p) =>
              print([{ text: `${ns.name.padEnd(21)}${p.toLowerCase().replace(/[^a-z0-9]+/g, "-").padEnd(27)}1/1     Running   0          5y` }])
            )
          );
          print([{ text: `…and ${cluster.reduce((n, ns) => n + ns.pods.length, 0) - cluster.length * 3} more. all Running. scroll to [03] for the full cluster.`, cls: "dim" }]);
        } else {
          print([{ text: 'try: kubectl get pods', cls: "dim" }]);
        }
        break;
      }

      case "terraform":
        if (arg === "plan") {
          print([
            { text: "Terraform will perform the following actions:", cls: "bold" },
            { text: '  + resource "team_member" "shubham" {', cls: "ok" },
            { text: '      + impact        = "immediate"', cls: "ok" },
            { text: '      + cloud_costs   = "-30%"', cls: "ok" },
            { text: '      + uptime        = "99.9%"', cls: "ok" },
            { text: '      + vibes         = "immaculate"', cls: "ok" },
            { text: "    }", cls: "ok" },
            { text: "Plan: 1 to add, 0 to change, 0 to destroy.", cls: "bold" },
            { text: 'run "sudo hire shubham" to apply.', cls: "dim" },
          ]);
        } else {
          print([{ text: "try: terraform plan", cls: "dim" }]);
        }
        break;

      case "certs": {
        const byIssuer = attestations.reduce<Record<string, number>>((acc, a) => {
          acc[a.issuer] = (acc[a.issuer] ?? 0) + 1;
          return acc;
        }, {});
        print(Object.entries(byIssuer).map(([k, v]) => ({ text: `${k.padEnd(12)} ${"█".repeat(v)} ${v}` })));
        print([{ text: `total: ${attestations.length} — every one verifiable at [05]`, cls: "ok" }]);
        break;
      }

      case "uptime": {
        const start = new Date(profile.careerStart).getTime();
        const days = Math.floor((Date.now() - start) / 86400000);
        print([{ text: `career up ${days} days · 3 employers · 0 kernel panics · load average: always high, always handled`, cls: "ok" }]);
        break;
      }

      case "ping":
        print([
          { text: `PING shubham (${profile.email}): 56 data bytes` },
          { text: "64 bytes from shubham: icmp_seq=0 ttl=64 time=0.3ms — he replies fast", cls: "ok" },
          { text: "--- shubham ping statistics ---", cls: "dim" },
          { text: "1 packets transmitted, 1 received, 0.0% packet loss", cls: "dim" },
        ]);
        break;

      case "resume":
      case "cv":
        print([{ text: "pulling signed artifact: Shubham_Sharma_Resume.pdf…", cls: "ok" }]);
        window.open(profile.resumeUrl, "_blank");
        break;

      case "contact":
        print([
          { text: `email:    ${profile.email}` },
          { text: `phone:    ${profile.phone}` },
          { text: `linkedin: ${profile.linkedin}` },
          { text: `github:   ${profile.github}` },
        ]);
        break;

      case "chaos":
        print([{ text: "⚠ injecting chaos in 1s — watch the site break (and heal itself)…", cls: "err" }]);
        setTimeout(() => {
          onClose();
          onChaos();
        }, 1000);
        break;

      case "sudo":
        if (arg.includes("hire")) {
          print([
            { text: "[sudo] password for recruiter: ********", cls: "dim" },
            { text: "ACCESS GRANTED.", cls: "ok" },
            { text: "drafting offer letter… opening uplink…", cls: "ok" },
          ]);
          setTimeout(() => {
            window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("[sudo hire shubham] — let's make it official")}`;
          }, 1100);
        } else {
          print([{ text: "permission granted, but what exactly are we sudo-ing?", cls: "dim" }]);
        }
        break;

      case "coffee":
        print([{ text: "☕ brewing… 100%. engineer performance restored.", cls: "ok" }]);
        break;

      case "rm":
        print([{ text: "rm: nice try. backups exist, and so does my DR runbook.", cls: "err" }]);
        break;

      case "vim":
      case "nano":
      case "emacs":
        print([{ text: `${head}: this portfolio ships read-only. PRs welcome at ${profile.github}`, cls: "dim" }]);
        break;

      case "reboot":
        print([{ text: "rebooting mission control — replaying provisioning sequence…", cls: "ok" }]);
        setTimeout(onReboot, 700);
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
        onClose();
        break;

      default:
        print([{ text: `zsh: command not found: ${head} — try "help"`, cls: "err" }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, history.length - 1);
      if (history[ni]) {
        setHistIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = histIdx - 1;
      if (ni < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="term-backdrop" onClick={onClose}>
      <div className="term panel-corners" onClick={(e) => e.stopPropagation()}>
        <div className="term-titlebar">
          <span className="boot-dot r" onClick={onClose} style={{ cursor: "pointer" }} />
          <span className="boot-dot y" /><span className="boot-dot g" />
          <span className="boot-title">shubham@ops-console — tty1 — ssh session</span>
          <button className="term-close" onClick={onClose}>esc</button>
        </div>
        <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className={`term-line ${l.cls ?? ""}`}>{l.text === "" ? "\u00A0" : l.text}</div>
          ))}
          <div className="term-input-row">
            <span className="boot-prompt">shubham@ops ~ %</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
