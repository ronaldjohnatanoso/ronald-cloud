# Phase 4 — AI Playground

**Status:** Not started

**Goal:** Mini AI applications that demonstrate capabilities.

---

## Trigger

Phase 3 portfolio is live with solid AI backend.

---

## AI Apps to Build

| App | Description |
|-----|-------------|
| Resume Assistant | Upload resume, get feedback |
| Kubernetes Assistant | K8s troubleshooting, YAML generator |
| Azure Assistant | Architecture suggestions, service recommendations |
| GCP Assistant | GCP equivalent of Azure Assistant |
| Terraform Generator | Describe infrastructure → Terraform code |
| SQL Generator | Natural language → SQL query |
| Log Analyzer | Paste logs → AI anomaly detection + RCA |
| Architecture Reviewer | Upload diagram or describe → architecture feedback |
| RCA Assistant | Incident description → root cause analysis |

---

## Tech

- Each app is a separate route in the FastAPI backend
- Shared LangGraph agent with tool routing
- Frontend: React app with CopilotKit for each assistant
- Deploy as Azure Functions (consumption)

---

## TODO

- [ ] Define agent tool schema
- [ ] Build LangGraph tool router
- [ ] Implement each assistant as a tool/agent
- [ ] Build frontend UI for each app
- [ ] Deploy to Azure Functions
- [ ] Add usage tracking / cost monitoring per assistant

---

## Cost Consideration

AI app calls can get expensive. Track token usage per user/assistant.
