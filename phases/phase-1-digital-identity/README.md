# Phase 1 — Digital Identity Platform

**Goal:** Professional portfolio website with AI chatbot ("Ask Ronald"), deployed on Azure.

---

## Objective

Launch a public-facing portfolio at `ronaldatanoso.com` running on Azure Static Web Apps with a CopilotKit-powered chatbot that knows your portfolio.

---

## Success Criteria

- [ ] Portfolio live at `ronaldatanoso.com` (or staging URL)
- [ ] All pages implemented: Home, About, Resume, Certifications, Projects, Blog, Contact
- [ ] "Ask Ronald" chatbot answers questions about your career, projects, skills
- [ ] Azure Static Web Apps CI/CD from GitHub
- [ ] Custom domain configured with Cloudflare SSL
- [ ] Microsoft Entra ID authentication (optional for contact form)

---

## Frontend Stack

```
React + TypeScript + Vite + Tailwind CSS + shadcn/ui + CopilotKit
```

---

## Pages

| Page | Description |
|------|-------------|
| Home | Hero, brief intro, CTA |
| About | Full background, story |
| Resume | Work history, education |
| Certifications | AZ-104, AZ-305, GCP PCA, etc. |
| Projects | Portfolio cards with links |
| Blog | Technical articles |
| Contact | Form or email link |

---

## "Ask Ronald" Copilot

Instead of a generic chatbot, create a portfolio-aware AI assistant.

### Use Cases
- "Tell me about Ronald's Azure experience"
- "Show me Ronald's Kubernetes projects"
- "What certifications does Ronald have?"
- "Explain the architecture of project X"

### Implementation
- CopilotKit with a FastAPI backend
- GitHub-hosted markdown files as knowledge source
- Azure OpenAI for LLM (or Ollama for local dev)
- Tool: file reader that searches markdown content

---

## Backend (FastAPI)

### Endpoints
```
GET  /api/resume        → resume markdown
GET  /api/projects      → projects list
GET  /api/blog          → blog posts list
GET  /api/blog/{slug}   → single post
GET  /api/certifications → certifications
POST /api/chat          → CopilotKit agent proxy
```

### Content Source
- Markdown files in a `content/` directory (GitHub repo or separate repo)
- Simple file reading with frontmatter parsing

---

## Deployment

### Azure Static Web Apps
- Connect to GitHub repo
- Build: `npm run build`
- Output: `dist/`
- API: Azure Functions (sibling Functions app)

### Azure Functions
- Runtime: Python
- Plan: Consumption (free tier eligible)

---

## Local Development

```bash
cd apps/web
npm install
npm run dev
```

```bash
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
func start
```

---

## Steps

### Step 1 — Entra ID & Subscription Foundation
- [ ] Do this FIRST before any resources
- See: [Azure Foundation Guide](./azure-foundation.md)

### Step 2 — Frontend Scaffold
- [ ] Create Vite + React + TS project
- [ ] Install Tailwind, shadcn/ui
- [ ] Add CopilotKit
- [ ] Build all pages
- [ ] Push to GitHub

### Step 3 — Backend Scaffold
- [ ] Create FastAPI project in `services/api/`
- [ ] Add markdown content routes
- [ ] Add CopilotKit proxy endpoint
- [ ] Deploy to Azure Functions

### Step 4 — Integration
- [ ] Connect frontend CopilotKit to backend
- [ ] Test "Ask Ronald" flow end-to-end

### Step 5 — Custom Domain & DNS
- [ ] Configure `ronaldatanoso.com` on Azure Static Web Apps
- [ ] Cloudflare DNS records (CNAME, etc.)
- [ ] Force HTTPS

---

## Estimated Cost (Phase 1)

| Resource | Tier | Monthly Est. |
|----------|------|-------------|
| Azure Static Web Apps | Free | $0 |
| Azure Functions | Consumption | $0 (under free grant) |
| Entra ID | Free | $0 |
| Cloudflare DNS | Free | $0 |
| Domain | ~$10-15/yr | ~$1.25 |

**Total: ~$1-2/month**
