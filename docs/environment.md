# 🔑 Environment & Secrets Configuration Strategy

## Overview

AutoEngineer AI uses a multi-tier environment strategy to isolate secrets between the **Django Backend** (persistence, auth, audit, webhooks) and the **FastAPI AI Service** (agent orchestration, RAG, tool calling), as well as client-accessible variables for the **Next.js Frontend**.

---

## Service Environment Scoping

### 1. Root / Shared Services
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DATABASE_URL`: Shared between Django (relational schema/models) and FastAPI (vector search / RAG via `pgvector`).
- `REDIS_URL`: Shared cache and agent-to-agent pub-sub event bus.

### 2. Django Backend (`backend/.env`)
- `SECRET_KEY`, `JWT_SECRET`: For user authentication and session management.
- `AI_SERVICE_URL`, `AI_SERVICE_SECRET`: For signed service-to-service communication.
- `GITHUB_WEBHOOK_SECRET`: Used to verify inbound HMAC signatures from GitHub Webhooks.

### 3. AI Service (`ai-service/.env`)
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`: API keys consumed strictly by the LangChain / LangGraph 8-agent runtime.
- `BACKEND_URL`, `SERVICE_SECRET`: For verifying requests originating from Django and writing generated blueprints back to persistence.

---

## 🏢 Why Organization-Scoped Integrations?

GitHub App installations, Jira workspace tokens, and Linear API keys are stored in the database **encrypted per Organization** rather than in static `.env` environment variables.

### Rationale:
1. **Multi-Tenancy Security**: Different enterprises using AutoEngineer AI must never share API access to external GitHub repositories or project management boards.
2. **Granular RBAC**: Access to GitHub webhooks and PR reviews is authorized against organization membership (`OrganizationMember.role`).
3. **Key Rotation & Compliance**: Enterprise administrators can rotate GitHub App private keys or PM API tokens via the UI without requiring service restarts or backend redeployment.
