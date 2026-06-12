import { useMemo, useState } from "react";
import { attestations } from "../data/profile";
import { useReveal } from "../hooks";

/* Certifications = compliance attestations. 31 verifiable artifacts. */

const ISSUERS = ["ALL", "Microsoft", "AWS", "Google", "IBM", "Meta", "WES"] as const;

const ISSUER_HUE: Record<string, string> = {
  Microsoft: "#41d9ff",
  AWS: "#ffb454",
  Google: "#b48cff",
  IBM: "#3cffb4",
  Meta: "#41d9ff",
  WES: "#3cffb4",
};

export default function Attestations() {
  const [filter, setFilter] = useState<(typeof ISSUERS)[number]>("ALL");

  const list = useMemo(
    () => (filter === "ALL" ? attestations : attestations.filter((a) => a.issuer === filter)),
    [filter]
  );

  const ref = useReveal<HTMLElement>(list);

  return (
    <section id="attestations" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[05]</span>
        <h2 className="section-title">Compliance <span className="accent">Attestations</span></h2>
      </div>
      <p className="section-sub reveal">
        $ cosign verify shubham — {attestations.length} signed certifications. Every badge links to a public, verifiable credential.
      </p>

      <div className="att-filters reveal">
        {ISSUERS.map((i) => (
          <button
            key={i}
            className={`att-filter ${filter === i ? "on" : ""}`}
            onClick={() => setFilter(i)}
          >
            {i}
            <span className="att-filter-n">
              {i === "ALL" ? attestations.length : attestations.filter((a) => a.issuer === i).length}
            </span>
          </button>
        ))}
      </div>

      <div className="att-grid">
        {list.map((a, i) => (
          <a
            key={a.title}
            className={`att panel reveal tier-${a.tier}`}
            href={a.link}
            target="_blank"
            rel="noreferrer"
            style={{ transitionDelay: `${(i % 10) * 40}ms`, ["--hue" as string]: ISSUER_HUE[a.issuer] }}
            title={`Verify: ${a.title}`}
          >
            <div className="att-badge" style={{ color: ISSUER_HUE[a.issuer] }}>{a.badge}</div>
            <div className="att-title">{a.title}</div>
            <div className="att-meta">
              <span>{a.issuer}</span>
              <span>{a.date}</span>
            </div>
            <div className="att-verify">VERIFY ↗</div>
            {a.tier === "expert" && <div className="att-tier">★ EXPERT</div>}
          </a>
        ))}
      </div>
    </section>
  );
}
