# Architecture Decision Records

> Every significant decision is documented here using the ADR format.

Format:
- **Context** — the situation and constraints
- **Decision** — what was chosen
- **Consequences** — trade-offs and outcomes

---

## ADR-001: Multi-Cloud Strategy — Azure Primary, GCP Secondary

**Status:** Accepted

### Context
We need a multi-cloud platform for portfolio + AI + automation purposes. We are studying for AZ-104 and AZ-305 (Azure), already hold GCP PCA certification.

### Decision
- **Azure = Primary** — Used for identity (Entra ID), AI services, core hosting, enterprise workloads
- **GCP = Secondary** — Used for always-free compute (e2-micro), Cloud Run, Vertex AI, organization hierarchy demos

### Rationale
Azure aligns with current learning trajectory. GCP provides free/hot-cost capabilities for non-critical workloads and demonstrates multi-cloud competency in the portfolio.

### Consequences
- Two sets of SDKs and CLIs to manage
- Must keep IAM aligned across both clouds
- Portfolio demonstrates real multi-cloud skills
- Cost management requires separate tools per cloud

---

## ADR-002: Frontend — React + TypeScript + Vite + CopilotKit

**Status:** Accepted

### Context
Need a modern, fast portfolio frontend that can host AI-powered interactions (chatbot).

### Decision
- React + TypeScript + Vite as build stack
- Tailwind CSS + shadcn/ui for component library
- CopilotKit for AI chatbot integration (instead of raw OpenAI API calls)
- Azure Static Web Apps for hosting (free tier)

### Consequences
- CopilotKit provides polished chat UI + tool calling abstraction
- Static Web Apps = no server-side rendering needed for portfolio pages
- shadcn/ui = copy-paste components (not a dependency) → full control
- SEO for blog pages requires extra care (Static Web Apps + pre-rendering)

---

## ADR-003: Backend — FastAPI + LangGraph

**Status:** Accepted

### Context
Need a Python backend that can handle AI agent orchestration, API routes, and tool integrations.

### Decision
- **FastAPI** for REST API endpoints
- **LangGraph** for AI agent orchestration (replaces raw LangChain chains)
- Azure Functions (Python) for hosting — consumption plan

### Consequences
- LangGraph allows complex multi-step agents with state management
- FastAPI auto-generates OpenAPI docs (useful for portfolio)
- Python = same language as AI/ML tools (no context switching)
- Consumption plan = near-zero cost at low traffic

---

## ADR-004: Infrastructure — Terraform

**Status:** Accepted

### Context
Infrastructure must be reproducible, version-controlled, and teach proper IaC.

### Decision
- All Azure and GCP infrastructure defined in Terraform
- State stored locally for now (consider Terraform Cloud/Backends in future)
- Modules for reusable components (vnet, app service, etc.)
- Separate Terraform repo or `infra/` directory in main repo

### Consequences
- Full IaC discipline from day one
- Terraform Cloud free tier is sufficient to start
- Must manage both Azure and GCP providers
- State files must never be committed to git

---

## ADR-005: CMS — TBD (Phase 2)

**Status:** Proposed

Will be evaluated in Phase 2.

Options: Payload, Directus, Sanity, Strapi.

Decision criteria:
- Self-hostable (not forced cloud)
- TypeScript-friendly
- Generous free tier
- Good REST/GraphQL API for FastAPI integration

---
