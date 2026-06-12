import { useState } from "react";
import { deployments, trainingPipeline } from "../data/profile";
import { useReveal } from "../hooks";

/* Experience = deployment history changelog. Education = training pipeline. */

export default function DeployHistory() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<string>(deployments[0].version);

  return (
    <section id="deployments" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[02]</span>
        <h2 className="section-title">Deploy <span className="accent">History</span></h2>
      </div>
      <p className="section-sub reveal">
        $ git log --career --oneline — every release of me that shipped to production.
      </p>

      <div className="deploy-rail">
        {deployments.map((d) => {
          const isOpen = open === d.version;
          const live = d.status === "STABLE · LIVE";
          return (
            <article key={d.version} className={`deploy panel panel-corners reveal ${isOpen ? "open" : ""}`}>
              <button
                className="deploy-head"
                onClick={() => setOpen(isOpen ? "" : d.version)}
                aria-expanded={isOpen}
              >
                <div className="deploy-ver">
                  <span className={`deploy-node ${live ? "live" : ""}`} />
                  <span className="deploy-version glow-num">{d.version}</span>
                </div>
                <div className="deploy-title-wrap">
                  <h3 className="deploy-title">
                    {d.title} <span className="deploy-org">@ {d.organization}</span>
                  </h3>
                  <div className="deploy-meta">
                    {d.period} · {d.location} · <em>{d.summary}</em>
                  </div>
                </div>
                <div className="deploy-right">
                  <span className={`deploy-status ${live ? "live" : ""}`}>{d.status}</span>
                  <span className={`deploy-chevron ${isOpen ? "rot" : ""}`}>▾</span>
                </div>
              </button>

              <div className="deploy-body" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="deploy-body-inner">
                  <ul className="deploy-log">
                    {d.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="deploy-commit">{commitHash(d.version, i)}</span> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="deploy-tags">
                    {d.technologies.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="training reveal">
        <div className="training-head">
          <span className="section-cmd">--</span>
          <h3 className="training-title">TRAINING_PIPELINE <span className="y-comment"># model fine-tuned on these datasets</span></h3>
        </div>
        <div className="training-grid">
          {trainingPipeline.map((t) => (
            <div className="training-card panel panel-corners" key={t.title}>
              <div className="training-org">{t.organization}</div>
              <div className="training-degree">{t.title}</div>
              <div className="training-meta">{t.period} · {t.location}</div>
              <div className="training-note">{t.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* deterministic pseudo-hash per line so it doesn't change on re-render.
   All math stays in 32-bit via imul/xorshift — plain `*` overflowed JS
   float precision and degenerated to "0000000". */
function commitHash(ver: string, i: number): string {
  let x = 0x9e3779b9 ^ (i + 1);
  for (let c = 0; c < ver.length; c++) {
    x = Math.imul(x ^ ver.charCodeAt(c), 0x01000193) >>> 0;
  }
  x = Math.imul(x ^ Math.imul(i + 1, 0x85ebca6b), 0xc2b2ae35) >>> 0;
  if (x === 0) x = 0x1234567;
  let h = "";
  for (let k = 0; k < 7; k++) {
    x ^= x << 13;
    x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    h += (x & 15).toString(16);
  }
  return h;
}
