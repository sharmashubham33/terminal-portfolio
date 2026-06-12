# SHUBHAM://OPS — Mission Control Portfolio

A portfolio that behaves like the thing it advertises: **production infrastructure**.

It provisions itself with a `terraform apply` boot sequence, runs as a phosphor-CRT
mission control room, and — the party trick — **breaks itself on demand and self-heals**,
because that's what an SRE does for a living.

## The experience

- **Terraform boot sequence** — the site literally provisions itself on first visit
- **Rotating cloud globe** — 13 real Azure/AWS/GCP regions, live pings, traffic arcs
- **Career uptime counter** — ticking since the first production deploy in 2021
- **☣ CHAOS TEST** — injects real visual failure (alerts fire, panels glitch, SLOs burn),
  then an auto-remediation runbook rolls everything back. Self-healed, blameless postmortem filed.
- **Working terminal** (press `~`) — `help`, `neofetch`, `kubectl get pods`,
  `terraform plan`, `git log --career`, `chaos`, and `sudo hire shubham`
- **⌘K command palette** — navigate like a power tool
- **Skills as a Kubernetes cluster** — 60+ pods across 10 namespaces, all `Running`, greppable
- **Experience as deploy history** — releases `v1.x → v4.x` with commit hashes
- **31 verifiable certifications** — filterable compliance wall
- **Konami code** — `↑↑↓↓←→←→BA` for retro amber mode

## Stack

React 18 + TypeScript + Vite. **Zero other runtime dependencies.**
Every effect — globe, topology field, sparklines, scramble text, chaos engine — is
hand-rolled canvas/CSS. ~68 KB gzipped.

## Run

```bash
npm install
npm run dev      # local mission control
npm run build    # production artifact in dist/
```

Deploy anywhere static (Vercel/Netlify/Pages).

---

Operated by **Shubham Sharma** — DevOps Engineer · Cloud Architect · SRE
[LinkedIn](https://linkedin.com/in/sharmashubham33) · [GitHub](https://github.com/sharmashubham33)
