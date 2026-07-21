# Phase 1 Frontend — Next.js + CopilotKit

## Goal

Portfolio live at `ronaldatanoso.com` with an AI chatbot ("Ask Ronald") that knows the portfolio content.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| AI | CopilotKit |
| Hosting | Azure Static Web Apps |

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, brief intro, CTA |
| `/about` | Full background, story |
| `/resume` | Work history, education |
| `/certifications` | AZ-104, AZ-305, GCP PCA, etc. |
| `/projects` | Portfolio cards with links |
| `/blog` | Technical articles |
| `/contact` | Form or email link |

## "Ask Ronald" Copilot

- Floating chat button bottom-right
- Reads markdown content from GitHub (separate content repo or `/content` dir)
- Answers questions: "Tell me about Ronald's Azure experience", "Show me his Kubernetes projects"
- Backend: FastAPI + LangGraph + Azure OpenAI (or Ollama for local)

## Setup Steps

- [x] Repo structure created
- [ ] `npm install` dependencies
- [ ] Tailwind + shadcn/ui configured
- [ ] CopilotKit integrated
- [ ] All pages built
- [ ] Azure Static Web Apps deployment
- [ ] Custom domain + Cloudflare DNS
- [ ] "Ask Ronald" end-to-end test

## Local Dev

```bash
cd apps/web
npm install
npm run dev
```
