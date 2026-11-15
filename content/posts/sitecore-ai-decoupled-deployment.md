---
title: "Sitecore AI Decoupled Deployment: Converting Coupled Projects"
date: 2026-02-11
description: "How Sitecore AI decoupled deployment separates authoring and editing hosts, and what it means for DevOps."
tags: ["SitecoreAI", "DevOps", "Architecture"]
source: "https://nextgentechbynimit.blogspot.com/"
---

## Thursday, February 12, 2026

### 1. Background

With recent platform updates, Sitecore AI introduces a decoupled deployment model that separates:

- Authoring Environments
- Editing Hosts

into independently deployable units.

Legacy Sitecore AI projects were deployed using a coupled architecture, where authoring and editing capabilities were bundled within a single deployment pipeline and repository structure.

This limits:

- Environment-level configuration flexibility
- Independent scaling
- Deployment isolation
- AI feature enablement aligned with new platform standards

### 2. What is Decoupled Deployment in Sitecore AI?

In the Decoupled Deployment Strategy:

| Component | Deployment |
| --- | --- |
| Authoring Environment | Independently deployed |
| Editing Host | Independently deployed |
| Repository Structure | Separate repositories |
| Deployment Pipeline | Environment-specific |
| Configuration | Granular & isolated |

This allows:

- Editing host updates without redeploying authoring environments
- Authoring environment changes without impacting editing runtime
- Independent environment promotion

### 3. Architectural Changes Post-Conversion

After conversion:

#### 🔹 Deployment Topology

Moves from:

`Single Project Deployment
 └── Authoring + Editing Host (Bundled)
`

`Decoupled Deployment Model

Authoring Environment
 └── Repo A
 └── Deployment Pipeline A

Editing Host
 └── Repo B
 └── Deployment Pipeline B
`

#### 🔹 Repository Structure

Each of the following will now have:

- Separate source control
- Independent CI/CD lifecycle
- Environment-specific configuration

This aligns with:

✔ Latest Sitecore AI runtime model ✔ SaaS-managed editing infrastructure ✔ Scalable deployment standards

### 4. Deployment Behavior

When the Convert Project option is triggered via:

> Deploy App → Project → Options → Convert Project → Confirm

Sitecore will:

- Initiate a fresh deployment
- Redeploy:

- All authoring environments
- All editing hosts

This process:

- Is automated
- Requires no manual code migration
- Updates deployment topology internally

### 5. DevOps Impact

| Area | Impact |
| --- | --- |
| Application Code | ❌ No Change |
| AI SDK Usage | ❌ No Change |
| Editing Runtime | ✅ Re-deployed |
| Authoring Environment | ✅ Re-deployed |
| Repository Mapping | ✅ Separated |
| Deployment Pipelines | ✅ Independent |
| Environment Config | ✅ Granular Control |

### 6. Benefits of Conversion

- Aligns legacy projects with latest Sitecore AI deployment standards
- Enables independent lifecycle management
- Reduces deployment coupling risk
- Supports scalable AI editing workloads
- Improves environment-level governance
- Minimizes downtime during updates

### 7. Risks & Considerations

- Conversion is environment-wide
- Triggers redeployment of all editing hosts
- Rollback is not self-service
- Requires Sitecore Support to undo conversion
- Temporary deployment downtime may occur

### 8. Recommendation

- Perform conversion in lower environments first
- Validate editing host connectivity post-deployment
- Sync CI/CD pipelines with new repository structure
- Engage Sitecore Support for rollback contingency

### 9. Outcome

Post conversion:

✔ Authoring & Editing deployments become independent ✔ Project aligns with latest Sitecore AI architecture ✔ Deployment flexibility improves ✔ AI feature rollout becomes environment-isolated

This conversion is a platform-level architectural shift, enabling projects to adopt Sitecore’s modern decoupled AI deployment model without requiring application-level changes.
