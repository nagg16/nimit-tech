---
title: "Sitecore XP/SXA to XM Cloud / SitecoreAI: Discovery and Estimation Checklist"
date: "2026-11-23"
description: "A practical discovery and estimation checklist for migrating Sitecore XP/SXA solutions to XM Cloud / SitecoreAI — scope, risks, and delivery sequencing."
tags:
  - SitecoreAI
  - XM Cloud
  - Architecture
  - DevOps
testedWith: SitecoreAI / XM Cloud migration discovery (2026)
featured: true
related:
  - sitecore-ai-decoupled-deployment
  - sitecoreai-xm-cloud-content-serialization
  - azure-devops-hosted-vs-self-hosted-agents
---

> **TL;DR**
>
> - Estimate migration as **discovery + rebuild of the delivery model**, not a lift-and-shift of every XP customization.
> - Force early decisions on rendering host, personalization, search, media, and content serialization ownership.
> - Price risk items (custom SPE, legacy WFFM/EXM patterns, monolith Helix debt) separately from happy-path page migration.
> - Sequence: platform foundation → content model → rendering host → integrations → cutover.

Teams asking "how long to move to XM Cloud / SitecoreAI?" usually need a **structured discovery**, not a single number. This checklist is the outline I use to turn an XP/SXA estate into an estimation package stakeholders can challenge.

## 1. Business and experience scope

- [ ] Which sites/brands are in wave 1 vs later waves?
- [ ] Which languages and locales must launch together?
- [ ] What personalization or A/B experiments must survive day one?
- [ ] What is the acceptable content freeze / dual-run window?

## 2. Platform foundation

- [ ] Tenant, project, and environment topology (dev/test/prod, preview)
- [ ] Coupled vs **decoupled** deployment model for authoring vs editing host
- [ ] Identity (SSO), roles, and workflow expectations
- [ ] Compliance constraints (data residency, audit, PII in forms)

## 3. Content and information architecture

- [ ] Inventory templates, renderings, and datasource patterns (SXA vs custom)
- [ ] Dictionary, site settings, and shared content strategy
- [ ] Media: Content Hub / DAM vs Edge media vs legacy media library
- [ ] Serialization module boundaries and ownership ([sample `.module.json`](/assets/feature.navigation.module.json))

## 4. Rendering and front end

- [ ] Next.js (or other) rendering host strategy and hosting target
- [ ] Component inventory: rebuild, map, or drop
- [ ] Caching and revalidation model (Edge + Next.js tags/paths)
- [ ] Preview / editing-host experience acceptance criteria

## 5. Personalization, CDP, and search

- [ ] Replace XP analytics rules with SitecoreAI Personalize / CDP decisioning where needed
- [ ] Guest identity and consent model
- [ ] Search: Sitecore Search vs existing Coveo/Solr customizations
- [ ] Experimentation ownership (marketing vs engineering)

## 6. Integrations and commerce

- [ ] CRM, ERP, IDP, and middleware contracts
- [ ] OrderCloud or other commerce surfaces (if any)
- [ ] Forms and lead capture replacements for legacy modules
- [ ] Webhook and event contracts for publish / Edge completion

## 7. DevOps and quality

- [ ] Azure DevOps / GitHub agent model for Next.js and Sitecore CLI
- [ ] Serialization validation in CI ([sample pipeline](/assets/scs-azure-pipelines.sample.yml))
- [ ] Environment promotion and secrets layout
- [ ] Performance budgets (TTFB, cache hit rate, build time)
- [ ] Cutover runbook and rollback contacts (including Sitecore Support where SaaS-managed)

## 8. Estimation bands (how to present them)

| Band | What it usually covers | Avoid burying inside it |
| --- | --- | --- |
| Foundation | Tenant, envs, CI/CD, baseline Next.js host | Custom network / IdP edge cases |
| Content model | Templates, serialization, IA cleanup | Full content rewrite / IA redesign |
| Components | Mapped SXA/custom renderings | Net-new UX redesign |
| Integrations | Known APIs with contracts | Undocumented legacy DLLs |
| Personalization / search | Like-for-like critical journeys | Full CDP program stand-up |

Call out **unknowns** as spikes with fixed hours, not as padded happy-path velocity.

## Version stamp

Checklist shaped for SitecoreAI / XM Cloud discovery conversations in 2026. Adjust against your tenant's current Deploy App and Content SDK versions.
