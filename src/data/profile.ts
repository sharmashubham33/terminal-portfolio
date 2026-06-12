/* ============================================================
   SHUBHAM://OPS — single source of truth.
   Career data modeled as a production system.
   ============================================================ */

export const profile = {
  name: "Shubham Sharma",
  callsign: "SHUBHAM://OPS",
  roles: ["AI Infrastructure Engineer", "DevOps Engineer", "Cloud Architect", "Site Reliability Engineer", "Automation @ Scale", "GenAI Builder"],
  tagline: "I keep production alive. Then I automate myself out of the job — and find a bigger one.",
  summary:
    "Infrastructure engineer with 5+ years automating large-scale environments — now deploying AI accelerator clusters at Tenstorrent as Senior Engineer, Data Center Deployment. Previously ran enterprise multi-cloud (Azure/AWS/GCP) at EllisDon: FinOps cutting spend 25–30%, a government-approved SR&ED automation project, and enterprise GenAI/RAG platforms. I treat reliability as a product and toil as a bug.",
  email: "sharmashubham33@gmail.com",
  phone: "+1 (437) 881-8521",
  location: "Mississauga, ON, Canada",
  coordinates: "43.5890° N, 79.6441° W",
  linkedin: "https://linkedin.com/in/sharmashubham33",
  github: "https://github.com/sharmashubham33",
  website: "https://shubhamresume.vercel.app",
  resumeUrl: `${import.meta.env.BASE_URL}Shubham_Sharma_Resume.pdf`,
  careerStart: "2021-01-04T09:00:00",
};

/* Headline metrics rendered as live gauges */
export interface Metric {
  label: string;
  value: string;
  detail: string;
  trend: "up" | "down" | "flat";
}

export const metrics: Metric[] = [
  { label: "PROD_UPTIME", value: "99.9%", detail: "across 3 clouds", trend: "up" },
  { label: "CLOUD_SPEND", value: "-30%", detail: "FinOps initiative", trend: "down" },
  { label: "VMS_AUTOMATED", value: "120+", detail: "Terraform + Ansible", trend: "up" },
  { label: "CERTS_EARNED", value: "31", detail: "Azure · AWS · Google+", trend: "up" },
  { label: "DATA_LOSS", value: "0 B", detail: "across all migrations", trend: "flat" },
  { label: "INFRA_PLANES", value: "3+1", detail: "Azure · AWS · GCP · on-prem AI", trend: "up" },
];

/* Experience = deployment history. Education = training pipeline. */
export interface Deployment {
  version: string;
  status: "STABLE · LIVE" | "SUPERSEDED" | "ARCHIVED";
  title: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const deployments: Deployment[] = [
  {
    version: "v4.x",
    status: "STABLE · LIVE",
    title: "Senior Engineer, Data Center Deployment — AI Infrastructure",
    organization: "Tenstorrent",
    location: "Toronto, ON",
    period: "Jun 2026 → present",
    summary: "Deploying the infrastructure that AI runs on — accelerator clusters at data center scale.",
    highlights: [
      "Design and maintain automation frameworks with Ansible + AWX for provisioning and configuring large-scale AI infrastructure",
      "Build and manage playbooks, roles, inventories, and job templates for scalable system deployment across accelerator clusters",
      "Automate infrastructure across compute nodes, networking components, and system services",
      "Integrate automation workflows with internal tooling and CI/CD pipelines in distributed environments",
      "Troubleshoot automation pipelines and partner with SRE and infrastructure teams on large-scale data center rollouts",
      "Scale automation across complex on-prem and hybrid environments for high-performance AI workloads",
    ],
    technologies: ["Ansible", "AWX", "Python", "Bash", "Linux", "Networking", "CI/CD", "On-Prem/Hybrid", "AI Accelerators", "Distributed Systems"],
  },
  {
    version: "v3.x",
    status: "SUPERSEDED",
    title: "DevOps Engineer → Intermediate DevOps Engineer",
    organization: "EllisDon Corporation",
    location: "Mississauga, ON",
    period: "May 2023 → Jun 2026",
    summary: "Ran enterprise multi-cloud at one of Canada's largest construction giants. Promoted May 2026.",
    highlights: [
      "Promoted to Intermediate DevOps Engineer (May 2026) for FinOps, SR&ED, and platform impact",
      "Architected enterprise multi-cloud infrastructure across Azure, GCP, and AWS — 99.9% uptime in production",
      "Built end-to-end CI/CD with Jenkins, Azure DevOps, GitHub Actions, and ArgoCD on GitOps workflows",
      "Led FinOps initiative with Grafana cost dashboards — 25–30% reduction in cloud infrastructure spend",
      "Drove cloud migrations (on-prem→cloud, AWS→Azure, Egnyte→Nasuni) with zero data loss, full Terraform IaC",
      "Spearheaded government-approved SR&ED project — Slack bot automating snapshot lifecycle for 120+ Linux VMs",
      "Automated provisioning of 120+ Linux servers with Terraform + Ansible, DR scripts, and runbooks",
      "Engineered SOC2-compliant SFTP pipeline for Scotiabank financial data ingestion into Azure Storage",
      "Hardened AKS with DevSecOps: Wiz remediation, HashiCorp Vault/Boundary/Consul, Azure PIM & GCP PAM",
      "Architected enterprise GenAI/RAG platform on Azure OpenAI for AI-powered knowledge retrieval",
      "Built automation with n8n, Slack bots, Vertex AI; ran POCs for GitHub Copilot, Claude Code, Grafana",
    ],
    technologies: ["Azure", "AWS", "GCP", "Terraform", "Ansible", "Kubernetes", "ArgoCD", "Jenkins", "GitHub Actions", "Grafana", "Prometheus", "Vault", "Python", "Azure OpenAI"],
  },
  {
    version: "v2.x",
    status: "SUPERSEDED",
    title: "Software Support Specialist",
    organization: "CPOS Inc",
    location: "Vaughan, ON",
    period: "Jan 2022 → Apr 2023",
    summary: "On-call for AWS production. Where the pager addiction began.",
    highlights: [
      "Administered AWS production (EC2, RDS, S3, VPC, IAM, ELB, Auto Scaling) with on-call incident response",
      "Implemented CI/CD with Jenkins, CircleCI, and GitLab for containerized microservices",
      "Deployed Docker/Kubernetes/ECS/Fargate workloads with Terraform IaC and serverless architectures",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CircleCI", "Lambda", "API Gateway", "FluentBit"],
  },
  {
    version: "v1.x",
    status: "ARCHIVED",
    title: "Software Development Engineer",
    organization: "Imi Ink Pvt. Ltd.",
    location: "Noida, India",
    period: "Jan 2021 → Aug 2021",
    summary: "First production deploy. Learned that code that ships beats code that's clever.",
    highlights: [
      "Developed CI/CD pipelines, cloud web services, and Python backends in cross-functional Agile teams",
      "Optimized order-fulfillment apps via performance tuning and RCA — repeat orders up 8%",
    ],
    technologies: ["Python", "C++", "CI/CD", "Agile"],
  },
];

export interface Training {
  title: string;
  organization: string;
  location: string;
  period: string;
  note: string;
}

export const trainingPipeline: Training[] = [
  {
    title: "PG Certificate · Cyber Security",
    organization: "Centennial College",
    location: "Scarborough, ON",
    period: "2022 → 2023",
    note: "GPA 4.3/4.5 — network security, cloud security, cryptography, forensics, ethical hacking",
  },
  {
    title: "PG Certificate · Project Management (IT)",
    organization: "Seneca College",
    location: "North York, ON",
    period: "2021 → 2022",
    note: "GPA 3.9/4.0",
  },
  {
    title: "B.Sc. Computer Science",
    organization: "University of Delhi",
    location: "New Delhi, India",
    period: "2018 → 2021",
    note: "GPA 4.0/4.0",
  },
];

/* Projects = production services with live-looking status */
export interface Service {
  id: string;
  name: string;
  codename: string;
  status: "OPERATIONAL";
  description: string;
  pipeline: string[];
  technologies: string[];
  highlights: string[];
}

export const services: Service[] = [
  {
    id: "svc-aiops",
    name: "GenAI Incident Response & Runbook Automation",
    codename: "AIOPS-CORE",
    status: "OPERATIONAL",
    description:
      "AI-enhanced incident management: Azure OpenAI + RAG over a vector database auto-diagnoses production alerts and proposes remediation — with a human holding the merge button.",
    pipeline: ["ALERT", "RAG LOOKUP", "DIAGNOSE", "HUMAN ✓", "REMEDIATE"],
    technologies: ["Azure OpenAI", "RAG", "Vector DB", "Prometheus", "Alertmanager", "Slack Bot", "Python"],
    highlights: [
      "Auto-diagnoses Prometheus/Alertmanager alerts against indexed runbooks",
      "Correlates with past incidents for pattern-based remediation",
      "Human-in-the-loop approvals gated by confidence thresholds",
      "Generates post-incident reviews straight into Slack",
    ],
  },
  {
    id: "svc-devsecops",
    name: "End-to-End DevSecOps Pipeline with Compliance Gates",
    codename: "GAUNTLET",
    status: "OPERATIONAL",
    description:
      "Commit → production with zero unscanned bytes: SAST, container scanning, image signing, policy-as-code, and SOC2 audit trails baked into every release.",
    pipeline: ["COMMIT", "SAST", "SCAN", "SIGN", "POLICY", "DEPLOY"],
    technologies: ["GitHub Actions", "SonarQube", "Trivy", "Cosign", "OPA/Gatekeeper", "Vault", "SBOM"],
    highlights: [
      "Automated SAST (SonarQube) and container scanning (Trivy)",
      "Image signing with Cosign; OPA/Gatekeeper policy enforcement",
      "SBOM generation for supply-chain transparency",
      "SOC2-compliant audit trails for regulated environments",
    ],
  },
  {
    id: "svc-observability",
    name: "SRE Observability Platform with SLO-Driven Alerting",
    codename: "PANOPTICON",
    status: "OPERATIONAL",
    description:
      "The three pillars — metrics, logs, traces — wired into SLI/SLO definitions with error-budget burn-rate dashboards. Alerts that page humans only when users actually hurt.",
    pipeline: ["METRICS", "LOGS", "TRACES", "SLO", "BURN-RATE", "PAGE"],
    technologies: ["Prometheus", "Loki", "OpenTelemetry", "Grafana", "Go", "Python", "Kubernetes"],
    highlights: [
      "Prometheus metrics, Loki logs, OpenTelemetry traces — one pipeline",
      "SLI/SLO definitions with error-budget burn-rate Grafana dashboards",
      "Custom Go/Python exporters for app-specific metrics",
      "Alertmanager-driven automated runbooks on K8s microservices",
    ],
  },
];

/* Skills = pods running in namespaces */
export interface Namespace {
  name: string;
  label: string;
  pods: string[];
}

export const cluster: Namespace[] = [
  { name: "ns-cloud", label: "Cloud Platforms", pods: ["AWS", "Azure", "GCP", "EC2", "S3", "Lambda", "AKS", "EKS", "ECS"] },
  { name: "ns-containers", label: "Containers & Orchestration", pods: ["Docker", "Kubernetes", "Helm", "Fargate", "ECR/ACR"] },
  { name: "ns-iac", label: "IaC & Configuration", pods: ["Terraform", "Ansible", "AWX", "AWS CDK", "CloudFormation", "ARM Templates"] },
  { name: "ns-cicd", label: "CI/CD & GitOps", pods: ["Jenkins", "GitHub Actions", "Azure DevOps", "GitLab CI", "ArgoCD", "Git"] },
  { name: "ns-observability", label: "Monitoring & Observability", pods: ["Datadog", "Grafana", "Prometheus", "CloudWatch", "ELK", "FluentBit", "Splunk"] },
  { name: "ns-security", label: "Security & Compliance", pods: ["Vault", "Boundary", "Consul", "Wiz", "SOC2", "DevSecOps", "PIM/PAM"] },
  { name: "ns-ai", label: "AI & Automation", pods: ["AI Infrastructure", "Azure OpenAI", "GenAI", "RAG", "LLMs", "Vertex AI", "n8n", "Slack Bots", "Prompt Eng"] },
  { name: "ns-lang", label: "Programming & Scripting", pods: ["Python", "Bash", "PowerShell", "Go", "C#", "JavaScript", "SQL"] },
  { name: "ns-data", label: "Databases & Messaging", pods: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "BigQuery", "Kafka", "RabbitMQ"] },
  { name: "ns-net", label: "OS & Networking", pods: ["Linux", "Windows Server", "Data Center Ops", "VPC/VNet", "DNS", "Load Balancing", "Nginx", "REST APIs"] },
];

/* Certifications = compliance attestations */
export interface Attestation {
  title: string;
  issuer: "Microsoft" | "AWS" | "Google" | "IBM" | "Meta" | "WES";
  badge: string;
  date: string;
  link: string;
  tier: "expert" | "associate" | "specialty";
}

export const attestations: Attestation[] = [
  { title: "Azure Solutions Architect Expert", issuer: "Microsoft", badge: "AZ-305", date: "2024", link: "https://learn.microsoft.com/api/credentials/share/en-us/ShubhamSharma-4027/14C1D487EDDD212A?sharingId=EFBF278876C841B9", tier: "expert" },
  { title: "Azure Security Engineer Associate", issuer: "Microsoft", badge: "AZ-500", date: "2024", link: "https://coursera.org/share/8ebf3aaaa02ae861ca2aacc640367ebd", tier: "associate" },
  { title: "Azure Administrator Associate", issuer: "Microsoft", badge: "AZ-104", date: "Jul 2023", link: "https://learn.microsoft.com/api/credentials/share/en-us/ShubhamSharma-4027/F52BD55F43FFFD85?sharingId", tier: "associate" },
  { title: "Azure Developer Associate", issuer: "Microsoft", badge: "AZ-204", date: "Apr 2024", link: "https://coursera.org/share/4f476d178bac84618ba9aca804eaf1e6", tier: "associate" },
  { title: "Azure AI Fundamentals", issuer: "Microsoft", badge: "AI-900", date: "2024", link: "https://learn.microsoft.com/api/credentials/share/en-us/ShubhamSharma-4027/BEC3DB8213EF7192?sharingId=EFBF278876C841B9", tier: "specialty" },
  { title: "AWS Solutions Architect – Associate", issuer: "AWS", badge: "SAA", date: "Aug 2022", link: "https://www.credly.com/badges/0035fbce-fb50-47d3-955c-7255f21615d4/linked_in_profile", tier: "associate" },
  { title: "AWS Cloud Solutions Architect", issuer: "AWS", badge: "CSA", date: "Aug 2023", link: "https://coursera.org/share/4b8eda4bb583aba16764c5799615c5c5", tier: "associate" },
  { title: "Google Project Management", issuer: "Google", badge: "PM", date: "Oct 2022", link: "https://coursera.org/share/427ea65f6ef1bb950e350740958157bb", tier: "specialty" },
  { title: "Generative AI Leader", issuer: "Google", badge: "GENAI", date: "2025", link: "https://coursera.org/share/2670299dca7b942fbd50cdb823b29b89", tier: "expert" },
  { title: "IBM Cybersecurity Analyst Professional", issuer: "IBM", badge: "CYBER", date: "Apr 2023", link: "https://www.credly.com/badges/a7f65c47-3c4c-445b-b665-b26b39cda858/linked_in_profile", tier: "specialty" },
  { title: "Meta Back-End Developer", issuer: "Meta", badge: "BE", date: "Apr 2024", link: "https://www.credly.com/badges/5bb760d6-cb03-4880-ba9e-f4e583c58801/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Amazon EKS", issuer: "AWS", badge: "EKS", date: "Apr 2024", link: "https://www.credly.com/badges/ad647033-2366-46c9-91ef-8f6b344577a1/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Networking Core", issuer: "AWS", badge: "NET", date: "Dec 2024", link: "https://www.credly.com/badges/b9067542-ccda-4616-bafc-2c5e042efba1/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Migration Foundations", issuer: "AWS", badge: "MIG", date: "Dec 2024", link: "https://www.credly.com/badges/1b9f521c-56e4-40e9-b0e2-5d595f5b9dba/public_url", tier: "specialty" },
  { title: "AWS Well-Architected Proficient", issuer: "AWS", badge: "WAP", date: "Dec 2024", link: "https://www.credly.com/badges/863d4380-40d4-4bd4-981b-f89c26cc1da2/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Serverless", issuer: "AWS", badge: "SLS", date: "Jun 2023", link: "https://www.credly.com/badges/aff5af50-9eee-4177-b5b7-681f3c060838/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Data Protection & DR", issuer: "AWS", badge: "DR", date: "Jul 2023", link: "https://www.credly.com/badges/401cd95a-fce7-4bb0-ac4a-b30150640a02/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Storage Technologist", issuer: "AWS", badge: "STG", date: "Jul 2023", link: "https://www.credly.com/badges/9df37adc-81be-4c8a-9075-9b4214d68ccc/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Block Storage", issuer: "AWS", badge: "BLK", date: "Jun 2023", link: "https://www.credly.com/badges/9007d875-f00d-4088-a874-8e6f8d226ca8/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Data Migration", issuer: "AWS", badge: "DMG", date: "Jun 2023", link: "https://www.credly.com/badges/c89a64cb-c55c-4063-b4f7-ed9fb9e29b41/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: File Storage", issuer: "AWS", badge: "FS", date: "Jun 2023", link: "https://www.credly.com/badges/88913f05-f8b1-4ea8-adf9-c01e5f18a3c9/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Object Storage", issuer: "AWS", badge: "OBJ", date: "Jun 2023", link: "https://www.credly.com/badges/af75fe3a-b5de-4637-be2e-7d49fdd2357a/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Storage Core", issuer: "AWS", badge: "SC", date: "Jun 2023", link: "https://www.credly.com/badges/df8b35d5-cae1-4b86-b689-0ff84d079083/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Events & Workflows", issuer: "AWS", badge: "EVT", date: "Apr 2024", link: "https://www.credly.com/badges/2920ffcd-f78a-42a1-a6ae-eb284f68b7c9/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Compute", issuer: "AWS", badge: "CMP", date: "Apr 2024", link: "https://www.credly.com/badges/6110b1f8-c9ab-4354-a380-d8dc0d497660/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Amazon Braket (Quantum)", issuer: "AWS", badge: "BRK", date: "Jun 2024", link: "https://www.credly.com/badges/d2c3dcc6-d910-460c-be3a-bd24a0dc5341/public_url", tier: "specialty" },
  { title: "AWS Knowledge: Cloud Game Dev", issuer: "AWS", badge: "GAM", date: "Jun 2023", link: "https://www.credly.com/badges/f9422418-030e-473c-a9bf-5dd06378a4a9/linked_in_profile", tier: "specialty" },
  { title: "AWS Knowledge: Media & Entertainment", issuer: "AWS", badge: "M&E", date: "Jul 2023", link: "https://www.credly.com/badges/b0569cac-7ae6-4238-8e3e-bd5d777e9233/linked_in_profile", tier: "specialty" },
  { title: "AWS Learning: Cloud Essentials", issuer: "AWS", badge: "CE", date: "May 2023", link: "https://www.credly.com/badges/40f1bf9f-dd69-40af-ac88-4840615edff6/linked_in_profile", tier: "specialty" },
  { title: "AWS Learning: Architecting", issuer: "AWS", badge: "ARC", date: "Mar 2023", link: "https://www.credly.com/badges/3fffb416-ef92-4e83-9859-e7cf54b2ea29/linked_in_profile", tier: "specialty" },
  { title: "Verified International Academic Qualifications", issuer: "WES", badge: "WES", date: "Mar 2023", link: "https://www.credly.com/badges/d42e8e65-0e85-45ad-9f8d-bca447532f76/linked_in_profile", tier: "specialty" },
];

/* Cloud regions for the globe — lat/lng of real datacenter regions he works across */
export interface Region {
  name: string;
  lat: number;
  lng: number;
  provider: "azure" | "aws" | "gcp" | "home";
}

export const regions: Region[] = [
  { name: "HOME · Toronto", lat: 43.65, lng: -79.38, provider: "home" },
  { name: "azure · canadacentral", lat: 43.65, lng: -79.38, provider: "azure" },
  { name: "azure · eastus", lat: 37.37, lng: -79.82, provider: "azure" },
  { name: "azure · westeurope", lat: 52.37, lng: 4.89, provider: "azure" },
  { name: "aws · us-east-1", lat: 38.95, lng: -77.45, provider: "aws" },
  { name: "aws · us-west-2", lat: 45.84, lng: -119.7, provider: "aws" },
  { name: "aws · ca-central-1", lat: 45.5, lng: -73.57, provider: "aws" },
  { name: "aws · eu-west-1", lat: 53.35, lng: -6.26, provider: "aws" },
  { name: "aws · ap-south-1", lat: 19.08, lng: 72.88, provider: "aws" },
  { name: "gcp · northamerica-northeast2", lat: 43.65, lng: -79.38, provider: "gcp" },
  { name: "gcp · us-central1", lat: 41.26, lng: -95.86, provider: "gcp" },
  { name: "gcp · europe-west1", lat: 50.45, lng: 3.82, provider: "gcp" },
  { name: "gcp · asia-south1", lat: 19.08, lng: 72.88, provider: "gcp" },
];

/* Log lines for the ambient ticker */
export const logLines: string[] = [
  "INFO  reconciler: drift=0 resources=247 — infrastructure matches desired state",
  "INFO  awx: inventory sync complete — all accelerator nodes reachable",
  "INFO  ansible: playbook run ok — changed=0 failed=0 across compute fleet",
  "INFO  finops: monthly burn ↓ 30% vs baseline — CFO sent a thumbs-up emoji",
  "INFO  argocd: app=portfolio sync=Healthy revision=main@HEAD",
  "INFO  snapshots: 120/120 linux VMs protected — SR&ED bot ran clean",
  "INFO  vault: 0 secrets in plaintext, 0 in slack, 0 on stickynotes",
  "WARN  coffee-service: levels at 18% — refill scheduled",
  "INFO  aks: all node pools Ready — wiz findings remediated",
  "INFO  slo: error budget 94% remaining — shipping features aggressively",
  "INFO  rag-pipeline: indexed 1,842 runbook chunks into vector db",
  "INFO  pager: 0 pages last night — the best kind of night",
  "INFO  sftp-scotiabank: transfer complete, SOC2 trail written",
  "INFO  k8s: pod=shubham status=Running restarts=0 age=5y",
  "INFO  terraform: plan shows no changes. boring is beautiful.",
  "INFO  migration: egnyte→nasuni 100% — bytes lost: 0",
  "INFO  gitops: humans approve, robots deploy, everyone sleeps",
];

export const navSections = [
  { id: "hero", label: "Mission Control", cmd: "00" },
  { id: "manifest", label: "Operator Manifest", cmd: "01" },
  { id: "deployments", label: "Deploy History", cmd: "02" },
  { id: "cluster", label: "Skill Cluster", cmd: "03" },
  { id: "services", label: "Live Services", cmd: "04" },
  { id: "attestations", label: "Attestations", cmd: "05" },
  { id: "uplink", label: "Open Uplink", cmd: "06" },
];
