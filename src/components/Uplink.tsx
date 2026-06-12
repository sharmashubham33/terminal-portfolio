import { useState } from "react";
import { profile } from "../data/profile";
import { useReveal } from "../hooks";

/* Contact = page the on-call engineer. He always acks. */

export default function Uplink() {
  const ref = useReveal<HTMLElement>();
  const [paged, setPaged] = useState(false);

  const sendPage = () => {
    setPaged(true);
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("[PAGE] Opportunity for Shubham — sev1, please ack")}&body=${encodeURIComponent("Hey Shubham,\n\nI just toured your mission control. Let's talk.\n\n— sent from SHUBHAM://OPS")}`;
    }, 900);
    setTimeout(() => setPaged(false), 4000);
  };

  return (
    <section id="uplink" className="section uplink-section" ref={ref}>
      <div className="section-head reveal">
        <span className="section-cmd">[06]</span>
        <h2 className="section-title">Open <span className="accent">Uplink</span></h2>
      </div>
      <p className="section-sub reveal">
        The on-call engineer is reachable. Mean time to acknowledge: famously low.
      </p>

      <div className="uplink-grid">
        <div className="pager panel panel-corners reveal">
          <div className="pager-head">
            <span className="dot amber" />
            <span>ONCALL-SCHEDULE: shubham-primary · no escalation needed</span>
          </div>
          <div className="pager-body">
            <div className="pager-line"><span>severity:</span> <strong>SEV-1 (career opportunity)</strong></div>
            <div className="pager-line"><span>routing_key:</span> <strong>{profile.email}</strong></div>
            <div className="pager-line"><span>response_sla:</span> <strong>&lt; 24h, usually minutes</strong></div>
            <div className="pager-line"><span>timezone:</span> <strong>America/Toronto (EST)</strong></div>
            <button className={`btn solid pager-btn ${paged ? "paging" : ""}`} onClick={sendPage}>
              {paged ? "◉ PAGING… ENGINEER ACK'D" : "▸ PAGE THE ENGINEER"}
            </button>
            <div className="pager-note">opens your mail client — no data leaves this page</div>
          </div>
        </div>

        <div className="uplink-channels">
          <a className="channel panel panel-corners reveal" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="channel-proto">linkedin://</span>
            <span className="channel-addr">in/sharmashubham33</span>
            <span className="channel-go">CONNECT ↗</span>
          </a>
          <a className="channel panel panel-corners reveal" href={profile.github} target="_blank" rel="noreferrer">
            <span className="channel-proto">git://</span>
            <span className="channel-addr">github.com/sharmashubham33</span>
            <span className="channel-go">CLONE ↗</span>
          </a>
          <a className="channel panel panel-corners reveal" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>
            <span className="channel-proto">tel://</span>
            <span className="channel-addr">{profile.phone}</span>
            <span className="channel-go">DIAL ↗</span>
          </a>
          <a className="channel panel panel-corners reveal" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <span className="channel-proto">artifact://</span>
            <span className="channel-addr">Shubham_Sharma_Resume.pdf</span>
            <span className="channel-go">PULL ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
