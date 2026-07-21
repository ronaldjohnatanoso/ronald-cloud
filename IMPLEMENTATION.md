# Implementation Log

> Timestamped log of every step taken. Updated after each session.

---

## Azure Foundation

### Entra ID

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Custom domain `ronaldatanoso.com` verified | ✅ Done | TXT record added via Cloudflare |
| 2026-07-21 | Groups created | ⬜ Todo | `az-platform-admins`, `az-platform-devs` |
| 2026-07-21 | Users created | ⬜ Todo | `admin@`, `me@`, `dev@` |
| 2026-07-21 | RBAC assignments | ⬜ Todo | Admins → Owner on mg-sandbox, Devs → Contributor on sub |

### Subscriptions

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Management Groups created | ⬜ Todo | `mg-sandbox`, `mg-production` |
| 2026-07-21 | Subscription moved under mg-sandbox | ⬜ Todo | |
| 2026-07-21 | Budget alerts configured | ⬜ Todo | 50/80/95/100% |
| 2026-07-21 | Tags applied | ⬜ Todo | Environment, CostControl, Owner, Project |

### GCP Foundation

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | Cloud Identity set up | ⬜ Todo | |
| 2026-07-21 | GCP Organization created | ⬜ Todo | |
| 2026-07-21 | Folders created | ⬜ Todo | `ronald-platform`, `ronald-playground` |
| 2026-07-21 | First GCP project created | ⬜ Todo | `gcp-platform-dev` |

---

## Phase 1 — Digital Identity Platform

### Frontend

| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-07-21 | React + Vite + TS scaffolded | ⬜ Todo | |
| 2026-07-21 | Tailwind + shadcn/ui installed | ⬜ Todo | |
| 2026-07-21 | CopilotKit integrated | ⬜ Todo | |
| 2026-07-21 | Pages built | ⬜ Todo | Home, About, Resume, Certs, Projects, Blog, Contact |
| 2026-07-21 | Deployed to Azure Static Web Apps | ⬜ Todo | |
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
