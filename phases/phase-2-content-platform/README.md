# Phase 2 — Content Platform

**Status:** Not started

**Goal:** Replace static markdown with a proper CMS.

---

## Trigger

Phase 1 is live and stable.

---

## Objective

Add a headless CMS to manage blog posts, project descriptions, certifications, and resume content — without editing markdown files directly.

---

## Options

| CMS | Pros | Cons |
|-----|------|------|
| [Payload](https://payloadcms.com) | Self-hosted, TypeScript, powerful | More setup |
| [Directus](https://directus.io) | Instant REST/GraphQL, self-hosted | Less TypeScript-native |
| [Sanity](https://sanity.io) | Free tier generous, great DX | Hosted (sanity.io) |
| [Strapi](https://strapi.io) | Popular, many plugins | Can be heavy |

**Recommendation for this platform:** Payload or Directus — self-hosted, integrates well with FastAPI.

---

## AI Features to Add

- Auto-summarize blog posts on publish
- Recommend related articles
- Semantic search across portfolio content
- AI-generated meta descriptions / SEO

---

## TODO

- [ ] Evaluate CMS options (run quick prototypes)
- [ ] Choose CMS and document ADR
- [ ] Deploy CMS to Azure (Container Apps or Azure App Service)
- [ ] Migrate Phase 1 content
- [ ] Connect CMS to FastAPI backend
- [ ] Add AI features
- [ ] Update CI/CD pipeline

---

## Estimated Cost

| Resource | Tier | Monthly Est. |
|----------|------|-------------|
| Azure App Service (CMS) | B1 | ~$13/mo — consider Consumption or keep minimal |
| Azure Database for PostgreSQL | Flexible | ~$5/mo (Hobby tier) |

_or use Docker + Azure Container Apps Consumption plan_

**Total: ~$0-15/month depending on hosting choice**
