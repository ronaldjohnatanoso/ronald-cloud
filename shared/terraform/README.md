# Terraform

Infrastructure as Code for the Cloud Enterprise Platform.

## Structure

```
shared/terraform/
├── azure/
│   ├── main.tf              ← provider + backend
│   ├── variables.tf         ← shared variables
│   ├── outputs.tf           ← shared outputs
│   ├── modules/
│   │   ├── resource-group/
│   │   ├── log-analytics/
│   │   ├── static-web-app/
│   │   ├── function-app/
│   │   └── cosmos-db/
│   └── environments/
│       ├── dev/
│       │   ├── main.tf
│       │   └── terraform.tfvars
│       └── prod/
│           ├── main.tf
│           └── terraform.tfvars
└── gcp/
    ├── main.tf              ← provider
    ├── variables.tf
    ├── outputs.tf
    └── environments/
        └── dev/
            ├── main.tf
            └── terraform.tfvars
```

## Getting Started

### Prerequisites
```bash
# Azure
brew install terraform
az login

# GCP
gcloud auth login
gcloud config set project <project-id>
```

### First Run (Dev)
```bash
cd shared/terraform/azure/environments/dev

terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply
```

## Important Rules

1. **Never commit `.tfstate` files** — add `*.tfstate*` to `.gitignore`
2. **Use variables for all env-specific values** — no hardcoded subscription IDs
3. **Tag everything** — `Environment`, `CostControl`, `Owner`, `Project`
4. **Modules first** — avoid repeating resource definitions

## Azure Provider Setup

```hcl
# azure/main.tf
terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.0"
    }
  }
}

provider "azurerm" {
  features {}
}
```

## GCP Provider Setup

```hcl
# gcp/main.tf
terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
```
