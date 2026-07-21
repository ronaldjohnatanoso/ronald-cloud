# Azure Foundation Guide

**Purpose:** Set up the Azure foundation correctly before creating any workloads. Do this once, do it right.

---

## Goal

```
Root Tenant
└── mg-root (root management group)
    ├── mg-sandbox       ← learning / dev / trial
    │   └── sub-platform-dev
    └── mg-production    ← future prod subscriptions
```

---

## Step 1 — Verify Custom Domain in Entra ID

Before anything else, confirm your tenant accepts `ronaldatanoso.com` users.

1. Go to [Entra ID](https://entra.microsoft.com) → Users → Add user
2. Check if `ronaldatanoso.com` shows as a verified domain
3. If not: Entra ID → Custom domain names → Add → verify via Cloudflare DNS (TXT record)

**Domain must be verified before creating users with `@ronaldatanoso.com`**

---

## Step 2 — Create Management Group Hierarchy

Requires Owner or User Access Admin on the root MG (tenant-level).

```bash
# Install Azure CLI if not present
brew install azure-cli  # or use Cloud Shell

az login
az account set --subscription "<your-trial-subscription-id>"

# Check current role
az role assignment list --assignee <your-email> --scope /providers/Microsoft.Management/managementGroups/root
```

### Create MGs via Portal (easier for first time)
1. Azure Portal → Management Groups
2. Create `mg-sandbox` under root
3. Create `mg-production` under root
4. Move your subscription(s) under `mg-sandbox`

### Create via CLI
```bash
az account management-group create --name mg-sandbox --display-name "Sandbox"
az account management-group create --name mg-production --display-name "Production"
az account management-group subscription add --name mg-sandbox --subscription "<sub-id>"
```

---

## Step 3 — Create Subscriptions

If you're on a trial, you likely have one subscription already. Keep it clean.

**Recommendation:** Rename existing subscription to `sub-platform-dev` and put it under `mg-sandbox`.

```bash
az account show  # shows current subscription details

# Rename (update display name)
az account update --subscription "<sub-id>" --display-name "sub-platform-dev"
```

### Future subscription plan
| Subscription | Purpose | MG |
|---|---|---|
| sub-platform-dev | Current trial / learning | mg-sandbox |
| sub-platform-prod | Future production | mg-production |
| sub-ai-playground | AI experiments | mg-sandbox |
| sub-gcp-shared | GCP projects | mg-sandbox |

---

## Step 4 — Set Up Budget Alerts

**Critical — prevents surprise bills on trial.**

```bash
# Create a budget at 50%/80%/95%/100%
az consumption budget create \
  --budget-name "budget-sandbox-50pct" \
  --amount 10 \
  --time-grain Monthly \
  --start-date 2026-08-01 \
  --end-date 2027-08-01 \
  --category Consumption \
  --subscription "<sub-id>" \
  --thresholds 50,80,95,100
```

Or via Portal: Cost Management → Budgets → Create

### Alert Actions (configure email)
- 50%: informational
- 80%: warning
- 95%: action needed
- 100%: trigger automation (shutdown tagged resources)

---

## Step 5 — RBAC — Use Groups, Not Individuals

### Create Entra ID Groups

| Group | Role | MG/Sub Scope |
|-------|------|--------------|
| `az-platform-admins` | Owner | mg-sandbox |
| `az-platform-devs` | Contributor | sub-platform-dev |
| `az-platform-viewers` | Reader | mg-sandbox |

```bash
# Create groups
az ad group create --display-name "az-platform-admins" --mail-nickname "az-platform-admins"
az ad group create --display-name "az-platform-devs" --mail-nickname "az-platform-devs"
az ad group create --display-name "az-platform-viewers" --mail-nickname "az-platform-viewers"

# Add yourself
az ad group member add --group "az-platform-admins" --member-id "<your-object-id>"
```

### Assign Roles
```bash
# Admin group → MG-level Owner
az role assignment create \
  --role "Owner" \
  --scope "/providers/Microsoft.Management/managementGroups/mg-sandbox" \
  --assignee "az-platform-admins"

# Devs group → Sub-level Contributor
az role assignment create \
  --role "Contributor" \
  --scope "/subscriptions/<sub-id>" \
  --assignee "az-platform-devs"
```

---

## Step 6 — Resource Tags

Apply to **all resources** from day one. Use Azure Policy to enforce.

Required tags:
```
Environment = Lab      # Lab / Dev / Stage / Prod
CostControl = AutoShutdown  # AutoShutdown / Manual
Owner = Ronald
Project = cloud-enterprise-platform
```

### Tag existing resources
```bash
# Tag all resources in subscription
az resource list --subscription "<sub-id>" --query "[].{id:id, name:name}" -o tsv | \
  while read id; do
    az tag update --resource-id "$id" --operation merge --tags "Environment=Lab;CostControl=AutoShutdown;Owner=Ronald;Project=cloud-enterprise-platform"
  done
```

### Azure Policy (enforce going forward)
Create a policy that requires these tags on all new resources.

---

## Step 7 — Enable Cost Analysis & Monitoring

1. Cost Management → Cost Alerts — verify budget is active
2. Log Analytics Workspace → Enable for subscription-level monitoring
3. Set up Action Group for budget alerts (email + optional automation)

---

## Step 8 — Review & Lock Down

- [ ] Disable Azure Portal notifications for the subscription if spam
- [ ] Review "Security" section: ensure no public-facing resources by default
- [ ] Check: all resources in `region = East US` or your preferred region
- [ ] Subscription → Properties → confirm tenant ID and directory

---

## Verification Checklist

```bash
# 1. Check MG hierarchy
az account management-group list

# 2. Check subscription is under mg-sandbox
az account list --refresh

# 3. Check your role assignments
az role assignment list --assignee <your-email> --all

# 4. Check budgets
az consumption budget list --subscription "<sub-id>"

# 5. Check Entra ID domains
az ad domain list
```

Expected:
- `ronaldatanoso.com` appears as verified domain
- Subscription under `mg-sandbox`
- Budget alerts at 50/80/95/100%
- Groups created with you as admin

---

## Next

Once this foundation is solid → move to **Frontend Scaffold** in Phase 1 README.
