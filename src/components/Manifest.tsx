import { profile } from "../data/profile";
import { useReveal } from "../hooks";

/* About = a live YAML manifest describing the operator, plus hologram portrait. */

const Y = {
  k: (s: string) => <span className="y-key">{s}</span>,
  s: (s: string) => <span className="y-str">"{s}"</span>,
  n: (s: string) => <span className="y-num">{s}</span>,
  b: (s: string) => <span className="y-bool">{s}</span>,
  c: (s: string) => <span className="y-comment"># {s}</span>,
};

export default function Manifest() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="manifest" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[01]</span>
        <h2 className="section-title">Operator <span className="accent">Manifest</span></h2>
      </div>
      <p className="section-sub reveal">
        $ kubectl describe operator shubham — the human resource behind the infrastructure.
      </p>

      <div className="manifest-grid">
        <div className="manifest-file panel panel-corners reveal">
          <div className="manifest-filebar">
            <span className="boot-dot r" /><span className="boot-dot y" /><span className="boot-dot g" />
            <span className="manifest-filename">operator.shubham.yaml</span>
            <span className="manifest-validated">✓ schema valid</span>
          </div>
          <pre className="manifest-code">
            <code>
{Y.c("apiVersion: careers.shubham.ops/v5")}{"\n"}
{Y.k("kind")}: <span className="y-kind">SeniorOperator</span>{"\n"}
{Y.k("metadata")}:{"\n"}
{"  "}{Y.k("name")}: {Y.s(profile.name)}{"\n"}
{"  "}{Y.k("location")}: {Y.s(profile.location)}{"\n"}
{"  "}{Y.k("labels")}:{"\n"}
{"    "}{Y.k("ai-infrastructure")}: {Y.b("true")}{"\n"}
{"    "}{Y.k("devops")}: {Y.b("true")}{"\n"}
{"    "}{Y.k("cloud-architect")}: {Y.b("true")}{"\n"}
{"    "}{Y.k("sre")}: {Y.b("true")}{"\n"}
{"    "}{Y.k("genai-builder")}: {Y.b("true")}{"\n"}
{Y.k("spec")}:{"\n"}
{"  "}{Y.k("experience")}: {Y.n("5+ years")}{"\n"}
{"  "}{Y.k("clouds")}: [{Y.s("azure")}, {Y.s("aws")}, {Y.s("gcp")}, {Y.s("on-prem-ai")}]{"\n"}
{"  "}{Y.k("philosophy")}:{"\n"}
{"    "}- {Y.s("reliability is a product, not an accident")}{"\n"}
{"    "}- {Y.s("toil is a bug — automate it away")}{"\n"}
{"    "}- {Y.s("boring deploys are beautiful deploys")}{"\n"}
{"    "}- {Y.s("if it isn't in git, it doesn't exist")}{"\n"}
{"  "}{Y.k("currentFocus")}:{"\n"}
{"    "}- {Y.s("AI accelerator clusters @ Tenstorrent (Ansible/AWX)")}{"\n"}
{"    "}- {Y.s("automation at data center scale — on-prem + hybrid")}{"\n"}
{"    "}- {Y.s("GenAI/RAG platforms · SLO-driven observability")}{"\n"}
{"  "}{Y.k("resources")}:{"\n"}
{"    "}{Y.k("requests")}: {"{"} {Y.k("coffee")}: {Y.s("2/day")}, {Y.k("interesting-problems")}: {Y.s("∞")} {"}"}{"\n"}
{"    "}{Y.k("limits")}: {"{"} {Y.k("boredom")}: {Y.s("0")}, {Y.k("manual-toil")}: {Y.s("0")} {"}"}{"\n"}
{Y.k("status")}:{"\n"}
{"  "}{Y.k("phase")}: <span className="y-kind">Running</span> {Y.c("5y, 0 restarts")}{"\n"}
{"  "}{Y.k("conditions")}:{"\n"}
{"    "}- {"{"} {Y.k("type")}: <span className="y-kind">OnCallReady</span>, {Y.k("status")}: {Y.b("True")} {"}"}{"\n"}
{"    "}- {"{"} {Y.k("type")}: <span className="y-kind">HireableNow</span>, {Y.k("status")}: {Y.b("True")} {"}"}{"\n"}
            </code>
          </pre>
        </div>

        <div className="manifest-side">
          <div className="holo-portrait panel-corners reveal">
            <img src="/profile.jpg" alt={profile.name} loading="lazy" />
            <div className="holo-overlay" />
            <div className="holo-id">
              <span>OPERATOR-ID</span>
              <strong>SS-3301-OPS</strong>
            </div>
          </div>
          <div className="manifest-quote panel panel-corners reveal">
            <p>“{profile.summary}”</p>
            <span className="manifest-quote-by">— extracted from /etc/motd</span>
          </div>
        </div>
      </div>
    </section>
  );
}
