---
title: Microsoft-Hosted vs Self-Hosted Agents for Next.js Builds in Azure DevOps
date: '2025-10-30'
description: >-
  Compare Microsoft-hosted agents, Managed DevOps Pools, VM scale sets, and
  self-hosted agents for Next.js builds in Sitecore XM Cloud / SitecoreAI
  delivery.
tags:
  - Azure DevOps
  - Next.js
  - CI/CD
source: 'https://nextgentechbynimit.blogspot.com/'
testedWith: Azure Pipelines hosted agents + Next.js (docs as of 2026)
related:
  - sitecore-ai-decoupled-deployment
  - sitecoreai-xm-cloud-content-serialization
  - xm-cloud-nextjs-cache-invalidation
---
> **TL;DR**
>
> - Microsoft-hosted agents are the default for Next.js XM Cloud builds: zero VM maintenance, fresh environment every job.
> - Self-hosted (or Managed DevOps Pools / VMSS) wins when builds need more than ~2 cores / 7 GB RAM, persistent caches, or private network access.
> - Use Pipeline Cache on hosted agents before jumping to self-hosted hardware.
> - Specs below follow [Microsoft Learn — Microsoft-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted).

When a Sitecore XM Cloud / SitecoreAI team moves from MVC to a Next.js rendering host, Azure Pipelines often becomes the build system for that host. The first infrastructure decision is which agent model to use.

This article compares **Microsoft-hosted agents**, **middle options** (Pipeline Cache, Managed DevOps Pools, VM scale sets), and **self-hosted agents**, with a focus on Next.js build characteristics.

## Microsoft-hosted agents

Microsoft provisions and maintains the VM for each job. You pick an image such as `ubuntu-latest` or `windows-latest`, run the job, and the machine is discarded afterward. See [Microsoft-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted).

### Advantages

- No VM patching, image baking, or agent upgrades to own.
- Clean environment every run — less "works on my machine" drift.
- Fast to adopt for a standard Next.js `npm ci` / `npm run build` pipeline.
- Microsoft scales the shared pool (subject to parallel-job and minute entitlements).

### Limitations for Next.js / XM Cloud builds

- **Fixed hardware.** Windows and Linux Microsoft-hosted agents commonly run on Azure general-purpose VMs with **2 CPU cores, 7 GB RAM, and 14 GB SSD** (with free disk reserved for sources and outputs). Confirm the current figures on Microsoft Learn before sizing decisions — they can change by image family.
- **Ephemeral disk.** `node_modules` and `.next/cache` do not survive unless you restore them with [Pipeline caching](https://learn.microsoft.com/en-us/azure/devops/pipelines/release/caching).
- **Shared pool queues.** Busy periods can add wait time before an agent is assigned.
- **Private network reachability.** Hosted agents are not on your ExpressRoute/VPN by default, so on-prem or locked-down APIs may be unreachable.
- **Parallelism and minutes** are governed by your Azure DevOps billing plan.

## Middle options (before full self-hosting)

Many teams do not need a permanent self-hosted fleet. Insert these layers first:

### 1. Azure Pipelines Cache

Restore npm / yarn / pnpm caches (and optionally Next.js cache directories) on Microsoft-hosted agents:

```yaml
- task: Cache@2
  inputs:
    key: 'npm | "$(Agent.OS)" | package-lock.json'
    restoreKeys: |
      npm | "$(Agent.OS)"
    path: $(Pipeline.Workspace)/.npm
  displayName: Cache npm

- script: npm ci --cache $(Pipeline.Workspace)/.npm
  displayName: Install dependencies
```

This often recovers most of the benefit of a sticky `node_modules` folder without owning a VM.

### 2. Managed DevOps Pools

[Managed DevOps Pools](https://learn.microsoft.com/en-us/azure/devops/managed-devops-pools/overview) give Microsoft-managed agents with more control over scale, images, and networking than the classic Microsoft-hosted pool — useful when hosted agents are too small but you do not want to operate VMs yourself.

### 3. VM scale set agent pools

[VMSS-based agent pools](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents) autoscale custom images in your subscription. You keep image control and can place agents in a VNet, while Azure scales the set. This sits between a single self-hosted VM and a fully handmade agent farm.

## Self-hosted agents

You install the Azure Pipelines agent on VMs, containers, or on-premises machines that you manage. See [Self-hosted Linux agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents) (and the Windows/macOS equivalents).

### Advantages

- Choose CPU, RAM, and disk for heavy Next.js / localization / multi-site builds.
- Persist toolchains and caches across jobs (with discipline around cleanliness).
- Place agents inside the network that can reach SitecoreAI, artifact feeds, or internal APIs.
- Job duration limits are yours to set (within org policy).

### Limitations

- You own OS patching, agent upgrades, monitoring, and capacity planning.
- Parallelism requires more machines or containers.
- Persistent machines can drift unless images are rebuilt regularly.

## Considerations specific to Next.js + SitecoreAI

| Concern | Prefer hosted + cache | Prefer Managed Pools / VMSS / self-hosted |
| --- | --- | --- |
| Small marketing site, few daily builds | Yes | Rarely needed |
| Large SSG site, multi-locale, long `next build` | Try Cache@2 first | Yes, if still CPU/RAM bound |
| Custom Node / Sitecore CLI / private NuGet | Often OK on hosted images | When tools are not on the image or need VPN |
| Talking to private XM Cloud / SitecoreAI endpoints from the build | May need networking workarounds | Agents in your VNet |
| High parallel PR volume | Check parallel-job SKU | Scale out agents you control |

## Recommendation for XM Cloud / SitecoreAI Next.js hosts

1. **Start on Microsoft-hosted `ubuntu-latest`** with `Cache@2` for npm (and Next cache if measured wins justify it).
2. If builds are still slow or OOM on **2 cores / 7 GB**, move to **Managed DevOps Pools** or **VMSS agents** sized for the build — not a long-lived snowflake VM on a developer's laptop.
3. Reserve classic self-hosted VMs for regulated networks or tooling that cannot run on managed images.
4. Keep Sitecore Content Serialization / CLI jobs on a pool that has the .NET SDK and authenticated Sitecore CLI — that may be a different pool than the Next.js frontend build.

## Summary

| Feature | Microsoft-hosted | Managed Pools / VMSS | Self-hosted VM |
| --- | --- | --- | --- |
| Setup | Lowest | Medium | Highest |
| Hardware | Fixed (~2 / 7 GB typical) | Configurable | Configurable |
| Cache persistence | Via Cache tasks | Image + cache design | Disk you control |
| Private network | Limited | Often yes | Yes |
| Ops load | Minimal | Shared with Microsoft/Azure | Yours |

## Version stamp

Agent image labels and hardware SKUs change. Re-check [Microsoft-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted) when you pin `ubuntu-latest` / `windows-latest`. This article reflects Microsoft Learn guidance as of late 2025 / 2026 documentation.
