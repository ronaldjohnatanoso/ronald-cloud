# Phase 5 — Automation Platform

**Status:** Not started

**Goal:** Enterprise-grade workflows integrating real-world tools.

---

## Trigger

Phase 4 AI Playground is stable and AI tooling is battle-tested.

---

## Workflow: OpsRamp Incident → Resolution

```
OpsRamp Incident triggered
        │
        ▼
AI Summary Agent
  "What happened, scope, initial assessment"
        │
        ▼
AI RCA Agent
  "Likely root cause based on logs/metrics"
        │
        ▼
Ticket Creation
  (ServiceNow / Jira / Linear)
        │
        ▼
Email Notification
  (SendGrid / Mailgun)
        │
        ▼
CRM Lead Check
  (Is this customer-affecting? Who is the contact?)
        │
        ▼
AI Proposal Agent
  "Draft resolution / prevention plan"
        │
        ▼
Follow-up Scheduled
  (Logic Apps / Azure Functions cron)
        │
        ▼
CRM Update
  (Status closed, notes added)
```

---

## Workflow: CRM Lead → Proposal

```
New Lead in CRM (HubSpot / Pipedrive / custom)
        │
        ▼
AI Lead Qualifier
  "Score lead, suggest next steps"
        │
        ▼
Proposal Generator
  "Generate tailored proposal from template + context"
        │
        ▼
Email Draft
  "Professional email with proposal attached"
        │
        ▼
Follow-up Reminder
  (scheduled AI check-in)
```

---

## Tech Stack

| Component | Choice |
|-----------|--------|
| Workflow orchestration | LangGraph (already in backend) |
| CRM | TBD (consider HubSpot free, or build simple) |
| Incident management | OpsRamp (existing work tool) |
| Email | SendGrid / Resend |
| Scheduling | Azure Functions cron |
| API integrations | FastAPI + tool calls |

---

## TODO

- [ ] Define workflow schemas in LangGraph
- [ ] Build OpsRamp API integration
- [ ] Build CRM API integration (or use existing)
- [ ] Build email service integration
- [ ] Implement Incident → RCA → Ticket → Email flow
- [ ] Implement Lead → Proposal → Email flow
- [ ] Add monitoring for workflow failures
