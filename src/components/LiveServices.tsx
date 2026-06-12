import { services } from "../data/profile";
import { useReveal } from "../hooks";

/* Projects = live production services, each with a pipeline diagram. */

export default function LiveServices() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[04]</span>
        <h2 className="section-title">Live <span className="accent">Services</span></h2>
      </div>
      <p className="section-sub reveal">
        $ systemctl status — flagship platforms I designed and run. All green, as it should be.
      </p>

      <div className="services-stack">
        {services.map((svc, i) => (
          <article className="service panel panel-corners reveal" key={svc.id} style={{ transitionDelay: `${i * 80}ms` }}>
            <header className="service-head">
              <div className="service-id">
                <span className="service-codename glow-num">{svc.codename}</span>
                <span className="service-status"><span className="dot" /> {svc.status}</span>
              </div>
              <h3 className="service-name">{svc.name}</h3>
              <p className="service-desc">{svc.description}</p>
            </header>

            <div className="service-pipeline" aria-label="Service pipeline stages">
              {svc.pipeline.map((stage, s) => (
                <span className="pipe-stage-wrap" key={stage}>
                  <span className={`pipe-stage ${stage === "HUMAN ✓" ? "human" : ""}`} style={{ animationDelay: `${s * 0.45}s` }}>
                    {stage}
                  </span>
                  {s < svc.pipeline.length - 1 && <span className="pipe-arrow" style={{ animationDelay: `${s * 0.45 + 0.2}s` }}>─▶</span>}
                </span>
              ))}
            </div>

            <ul className="service-points">
              {svc.highlights.map((h, k) => (
                <li key={k}>{h}</li>
              ))}
            </ul>

            <footer className="service-tags">
              {svc.technologies.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
