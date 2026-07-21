# Implementation Log

> Timestamped log of every step taken. Updated after each session.

---

## Azure Foundation

### Entra ID

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Custom domain `ronaldatanoso.com` verified | ✅ Done | TXT record added via Cloudflare |
| 2026-07-21 | Groups created | ✅ Done | `az-platform-admins`, `az-platform-devs` |
| 2026-07-21 | Users created | ✅ Done | `admin@`, `me@`, `dev@` |
| 2026-07-21 | RBAC assignments | ✅ Done | Users added to respective groups |

### Subscriptions

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Management Groups created | ✅ Done | `mg-sandbox`, `mg-production` |
| 2026-07-21 | Subscription moved under mg-sandbox | ✅ Done | Trial sub moved to sandbox |
| 2026-07-21 | Budget alerts configured | ✅ Done | 50/80/95/100% thresholds set |
| 2026-07-21 | Tags applied | ✅ Done | Environment=Lab, CostControl=AutoShutdown, Owner=Ronald, Project=cloud-enterprise-platform |

### GCP Foundation

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Cloud Identity set up | ✅ Done | Free tier, `admin@ronaldatanoso.com` as super admin |
| 2026-07-21 | GCP Organization created | ✅ Done | `ronaldatanoso.com` org verified |
| 2026-07-21 | Folders created | ✅ Done | `ronald-platform`, `ronald-playground` |
| 2026-07-21 | First GCP project created | ✅ Done | `gcp-platform-dev` under `ronald-playground` |

---

## Phase 1 — Digital Identity Platform

### Frontend

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Next.js scaffolded | ✅ Done | App Router, TypeScript, Tailwind, CopilotKit |
| 2026-07-21 | Pages stubbed | ✅ Done | Home, About, Resume, Certs, Projects, Blog, Contact |
| 2026-07-21 | CopilotKit "Ask Ronald" component | ✅ Done | Floating chat button |
| 2026-07-21 | `npm install` | ⬜ Todo | Run on cloud machine |
| 2026-07-21 | Deploy to Azure Static Web Apps | ⬜ Todo | |
| 2026-07-21 | Custom domain configured | ⬜ Todo | ronaldatanoso.com |

### Backend

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | FastAPI scaffolded | ⬜ Todo | |
| 2026-07-21 | Markdown content routes | ⬜ Todo | |
| 2026-07-21 | CopilotKit proxy endpoint | ⬜ Todo | |
| 2026-07-21 | Deployed to Azure Functions | ⬜ Todo | |
| 2026-07-21 | "Ask Ronald" chatbot working | ⬜ Todo | |

### Integration

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Frontend → Backend connected | ⬜ Todo | |
| 2026-07-21 | End-to-end chat flow tested | ⬜ Todo | |
