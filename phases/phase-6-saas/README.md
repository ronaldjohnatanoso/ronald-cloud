# Phase 6 — SaaS

**Status:** Not started

**Goal:** Ship monetizable AI products.

---

## Philosophy

Every phase before this was building blocks. By Phase 6, the platform has:

- Proven AI workflows
- Real enterprise integrations
- Cost-efficient infrastructure
- Portfolio credibility

---

## Potential Products

| Product | Description | Target Customer |
|---------|-------------|-----------------|
| CRM Assistant | AI copilot for CRM data entry/query | Small biz using HubSpot/Pipedrive |
| Proposal Generator | AI-generated proposals from brief | Consultants, agencies |
| Incident AI | Automated incident summary + RCA | DevOps teams |
| AI Knowledge Base | RAG-powered internal search | SMBs |
| Enterprise Assistant | Copilot for enterprise tools | Azure/GCP customers |

---

## Launch Considerations

- [ ] Stripe integration for payments
- [ ] Multi-tenant architecture (each customer isolated)
- [ ] Usage-based pricing (token count, API calls)
- [ ] Auth: Microsoft Entra ID SSO for enterprise
- [ ] GDPR / data residency compliance
- [ ] SLA and uptime monitoring

---

## Tech for SaaS

| Component | Choice |
|-----------|--------|
| Hosting | Azure App Service (multi-tenant) or Container Apps |
| Database | Cosmos DB multi-region or Azure SQL |
| Auth | Microsoft Entra ID (B2C or external) |
| Payments | Stripe |
| Monitoring | Application Insights + Grafana |
| CDN | Cloudflare |

---

## TODO

- [ ] Finalize product direction (pick 1, not all)
- [ ] Design multi-tenant architecture
- [ ] Implement Stripe billing
- [ ] Build onboarding flow
- [ ] Add usage metering per tenant
- [ ] Ship and iterate
