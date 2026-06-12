import { useEffect, useMemo, useRef, useState } from "react";
import { navSections, profile } from "../data/profile";

/* ⌘K command palette — because every serious tool has one. */

interface Action {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

export default function CommandPalette({
  open,
  onClose,
  onTerminal,
  onChaos,
}: {
  open: boolean;
  onClose: () => void;
  onTerminal: () => void;
  onChaos: () => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(() => {
    const nav = navSections.map((s) => ({
      id: `nav-${s.id}`,
      label: `Go to: ${s.label}`,
      hint: `section ${s.cmd}`,
      run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }),
    }));
    return [
      ...nav,
      { id: "term", label: "Open terminal", hint: "~", run: onTerminal },
      { id: "chaos", label: "☣ Run chaos experiment", hint: "break + self-heal", run: onChaos },
      { id: "resume", label: "Download résumé", hint: "PDF", run: () => window.open(profile.resumeUrl, "_blank") },
      { id: "github", label: "Open GitHub", hint: "@sharmashubham33", run: () => window.open(profile.github, "_blank") },
      { id: "linkedin", label: "Open LinkedIn", hint: "/in/sharmashubham33", run: () => window.open(profile.linkedin, "_blank") },
      { id: "email", label: "Email Shubham", hint: profile.email, run: () => (window.location.href = `mailto:${profile.email}`) },
    ];
  }, [onTerminal, onChaos]);

  const filtered = useMemo(() => {
    if (!q.trim()) return actions;
    const s = q.toLowerCase();
    return actions.filter((a) => a.label.toLowerCase().includes(s) || a.hint.toLowerCase().includes(s));
  }, [q, actions]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[sel]) {
      filtered[sel].run();
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette panel-corners" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="palette-inputrow">
          <span className="palette-chevron">❯</span>
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Type a command or search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Command palette"
          />
          <span className="kbd">esc</span>
        </div>
        <div className="palette-list">
          {filtered.map((a, i) => (
            <button
              key={a.id}
              className={`palette-item ${i === sel ? "sel" : ""}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => {
                a.run();
                onClose();
              }}
            >
              <span>{a.label}</span>
              <span className="palette-hint">{a.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && <div className="palette-empty">no commands matched — the terminal knows more</div>}
        </div>
      </div>
    </div>
  );
}
