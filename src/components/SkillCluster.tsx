import { useMemo, useState } from "react";
import { cluster } from "../data/profile";
import { useReveal } from "../hooks";

/* Skills = a Kubernetes cluster. Namespaces contain pods. All Running. */

export default function SkillCluster() {
  const [query, setQuery] = useState("");

  const totalPods = useMemo(() => cluster.reduce((n, ns) => n + ns.pods.length, 0), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return cluster;
    const q = query.toLowerCase();
    return cluster
      .map((ns) => ({ ...ns, pods: ns.pods.filter((p) => p.toLowerCase().includes(q) || ns.label.toLowerCase().includes(q)) }))
      .filter((ns) => ns.pods.length > 0);
  }, [query]);

  const ref = useReveal<HTMLElement>(filtered);

  const shown = filtered.reduce((n, ns) => n + ns.pods.length, 0);

  return (
    <section id="cluster" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[03]</span>
        <h2 className="section-title">Skill <span className="accent">Cluster</span></h2>
      </div>
      <p className="section-sub reveal">
        $ kubectl get pods -A — {totalPods} skills running across {cluster.length} namespaces. Zero CrashLoopBackOffs.
      </p>

      <div className="cluster-toolbar reveal">
        <span className="cluster-prompt">$ kubectl get pods -A | grep</span>
        <input
          className="cluster-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='"" (try: terraform, ai, aws…)'
          spellCheck={false}
        />
        <span className="cluster-count">{shown}/{totalPods} pods</span>
      </div>

      <div className="cluster-grid">
        {filtered.map((ns) => (
          <div className="namespace panel panel-corners reveal" key={ns.name}>
            <div className="ns-head">
              <span className="ns-name">{ns.name}</span>
              <span className="ns-label">{ns.label}</span>
              <span className="ns-count">{ns.pods.length} Running</span>
            </div>
            <div className="ns-pods">
              {ns.pods.map((p) => (
                <span className="pod" key={p}>
                  <span className="dot static" /> {p}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="cluster-empty panel reveal in">
            No pods matched “{query}” — but I learn fast. <em>kubectl apply -f new-skill.yaml</em>
          </div>
        )}
      </div>
    </section>
  );
}
