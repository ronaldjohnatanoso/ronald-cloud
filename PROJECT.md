# Cloud Enterprise Platform — Project Overview

## Vision

Build **one evolving enterprise-grade platform** at `ronaldatanoso.com` that grows from personal portfolio into a multi-cloud AI-powered SaaS foundation.

> **Philosophy:** Do NOT build many unrelated projects. Every new technology becomes another capability layered onto the same platform.

## Quick Links

- [Phases](./phases/) — implementation roadmap
- [Architecture Decisions](./shared/architecture-decisions/) — ADRs
- [Diagrams](./shared/diagrams/) — architecture visuals
- [Terraform](./shared/terraform/) — infrastructure as code

---

## Current Status

| Area | Status |
|------|--------|
| GitHub Repo | ✅ Created |
| README | ✅ Live |
| Entra ID Domain | 🔍 To verify |
| Azure Subscription | 🔍 Trial — needs foundation |
| GCP Organization | 🔍 To set up |
| Domain (Cloudflare) | ✅ `ronaldatanoso.com` |

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Digital Identity Platform](./phases/phase-1-digital-identity/) | 🔄 Next |
| 2 | [Content Platform](./phases/phase-2-content-platform/) | ⬜ |
| 3 | [Intelligent Portfolio](./phases/phase-3-intelligent-portfolio/) | ⬜ |
| 4 | [AI Playground](./phases/phase-4-ai-playground/) | ⬜ |
| 5 | [Automation Platform](./phases/phase-5-automation-platform/) | ⬜ |
| 6 | [SaaS](./phases/phase-6-saas/) | ⬜ |

---

## TODO (Phase 1 — Digital Identity Platform)

### Azure Foundation
- [ ] Verify `ronaldatanoso.com` custom domain in Microsoft Entra ID
- [ ] Create Management Group hierarchy (`mg-sandbox`, `mg-production`)
- [ ] Create first subscription `sub-platform-dev` under `mg-sandbox`
- [ ] Enable budget alerts at 50/80/95/100% on subscription
- [ ] Set up RBAC — Entra ID groups (not individual users)
- [ ] Apply resource tags: `Environment=Lab`, `CostControl=AutoShutdown`, `Owner=Ronald`
- [ ] Review and lock down subscription-level IAM

### Entra ID Setup
- [ ] Create Entra ID groups: `az-platform-devs`, `az-platform-viewers`
- [ ] Create users: `admin@ronaldatanoso.com`, `me@ronaldatanoso.com`, `dev@ronaldatanoso.com`
- [ ] Assign admin to `mg-sandbox` Contributor role via group

### GCP Foundation
- [ ] Set up Cloud Identity for `ronaldatanoso.com`
- [ ] Create GCP Organization node
- [ ] Create folder structure: `folders/ronald-platform`, `folders/ronald-playground`
- [ ] Create first GCP project `gcp-platform-dev` under playground folder

### Domain & DNS
- [ ] Verify Cloudflare DNS for `ronaldatanoso.com`
- [ ] Plan DNS records (eventual Azure/GCP integration)

## Frontend

- [ ] Scaffold Next.js + TypeScript
- [ ] Install Tailwind CSS + shadcn/ui
- [ ] Add CopilotKit
- [ ] Build all pages (Home, About, Resume, Certifications, Projects, Blog, Contact)
- [ ] Deploy to Azure Static Web Apps
- [ ] "Ask Ronald" chatbot working end-to-end
- [ ] Custom domain (ronaldatanoso.com) + Cloudflare DNS

### Backend
- [ ] Scaffold FastAPI project
- [ ] Connect to GitHub markdown files as content source
- [ ] Deploy to Azure Functions
- [ ] Set up LangGraph tool router
- [ ] Integrate Azure OpenAI (or fallback to Ollama)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite, Tailwind, shadcn/ui, CopilotKit |
| Backend | FastAPI, LangGraph |
| AI | Azure OpenAI, Vertex AI, OpenAI, Ollama |
| Database | Cosmos DB (free tier), Cloud Storage |
| IaC | Terraform |
| Azure | Static Web Apps, Functions, Cosmos DB, Entra ID, Monitor |
| GCP | Cloud Run, e2-micro, Cloud Functions, Cloud Storage, Vertex AI |
| DNS/CDN | Cloudflare |
| Docs | Markdown, Mermaid, Excalidraw |

---

## Cost Budget

Target: **near-zero** monthly cost.

| Service | Strategy |
|---------|----------|
| Azure Static Web Apps | Free tier |
| Azure Functions | Free tier (execution count) |
| Cosmos DB | Free tier (1K RU/s, 25 GB) |
| Azure Monitor / Log Analytics | Free tier (limited); watch quotas |
| GCP e2-micro | Free tier (always-free) |
| Cloud Run | Free tier |
| Cloudflare DNS | Free |

Budget alerts: 50% / 80% / 95% / 100% → automation runbook auto-shutdown tagged resources.
