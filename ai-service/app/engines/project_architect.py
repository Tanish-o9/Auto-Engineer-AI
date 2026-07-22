import re
from typing import Dict, Any, List, Optional
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class ProjectArchitectEngine:
    """
    AI Project Architect Engine
    Converts natural language prompt & app type into complete software architecture blueprints.
    Outputs structured JSON payload and rendered Markdown documentation.
    Supports: Web Apps, Mobile Apps, AI Systems, SaaS, Enterprise Applications.
    """
    def __init__(self):
        self.domain_engine = DomainSynthesizerEngine()

    def generate(self, raw_prompt: str, app_type: str = "Web App") -> Dict[str, Any]:
        domain_data = self.domain_engine.synthesize(raw_prompt)
        title = domain_data["title"]
        domain_name = domain_data["domain_name"]
        entities = domain_data["entities"]
        endpoints = domain_data["endpoints"]
        tables = domain_data["tables"]

        app_type_clean = app_type.strip().title()
        if not any(k in app_type_clean for k in ["Web", "Mobile", "Ai", "Saas", "Enterprise"]):
            app_type_clean = "Web App"

        # 1. Tech Stack & Suitability Scoring by App Type
        tech_stack = self._build_tech_stack(app_type_clean, domain_name, title)

        # 2. Folder Structure by App Type
        folder_tree = self._build_folder_tree(app_type_clean, domain_name, title, entities)

        # 3. OpenAPI 3.0 API Design
        api_design = {
            "openapi": "3.0.3",
            "info": {
                "title": f"{title} API Specification",
                "version": "1.0.0",
                "description": f"Production OpenAPI 3.0 spec for {title} ({app_type_clean})"
            },
            "servers": [{"url": f"https://api.{domain_name}.example.com/v1", "description": "Production Ingress"}],
            "endpoints": endpoints
        }

        # 4. Database Schema (SQL DDL)
        sql_ddl = self._build_sql_ddl(domain_name, tables)

        # 5. Mermaid ER Diagram
        er_diagram = self._build_er_diagram(domain_name, entities)

        # 6. Mermaid Sequence Diagram
        sequence_diagram = self._build_sequence_diagram(app_type_clean, domain_name, entities)

        # 7. Development Roadmap & Sprint Milestones
        roadmap = self._build_roadmap(domain_name, entities)

        # JSON Blueprint Payload
        json_data = {
            "project_title": title,
            "application_type": app_type_clean,
            "domain_name": domain_name,
            "tech_stack": tech_stack,
            "folder_structure": folder_tree,
            "api_design": api_design,
            "database_schema": {
                "tables": tables,
                "sql_ddl": sql_ddl
            },
            "diagrams": {
                "er_diagram": er_diagram,
                "sequence_diagram": sequence_diagram
            },
            "development_roadmap": roadmap
        }

        # Rendered Markdown Report
        markdown = self._render_markdown_report(json_data)

        return {
            "json_data": json_data,
            "markdown": markdown
        }

    def _build_tech_stack(self, app_type: str, domain_name: str, title: str) -> Dict[str, Any]:
        if "Mobile" in app_type:
            return {
                "application_type": "Mobile App",
                "suitability_score": 98,
                "frontend": "React Native (Expo SDK 51) / Flutter 3",
                "backend": f"Go (Golang Fiber) High-Concurrency {domain_name.capitalize()} API",
                "database": "PostgreSQL 16 + Firebase Firestore (Realtime Sync)",
                "cache_queue": "Redis 7 + Push Notifications Gateway",
                "architecture_pattern": "Mobile-First Offline-Sync Microservices",
                "pros": ["Cross-platform iOS & Android code sharing", "Sub-50ms API response time with Go", "Offline-first local SQLite cache"],
                "cons": ["Requires native push notification credentials setup"]
            }
        elif "Ai" in app_type:
            return {
                "application_type": "AI System",
                "suitability_score": 99,
                "frontend": "React 18 + React Flow Node Canvas UI",
                "backend": f"FastAPI + LangGraph + Celery Async Workers",
                "database": "PostgreSQL 16 + pgvector (Vector Embeddings Store)",
                "cache_queue": "Redis 7 (LangGraph State Cache & Task Broker)",
                "architecture_pattern": "Event-Driven Multi-Agent Graph Architecture",
                "pros": ["Stateful multi-agent execution with LangGraph", "Vector similarity search using pgvector", "Async worker scaling"],
                "cons": ["High GPU/Memory consumption for vector embeddings"]
            }
        elif "Saas" in app_type:
            return {
                "application_type": "SaaS Platform",
                "suitability_score": 97,
                "frontend": "Next.js 14 App Router (Multi-Tenant SSR Portal)",
                "backend": "Django DRF (Multi-Tenant Organization Core API)",
                "database": "PostgreSQL 16 (Row-Level Security & Schema Isolation)",
                "cache_queue": "Redis 7 (Session Cache) + Stripe Webhooks Worker",
                "architecture_pattern": "Multi-Tenant B2B SaaS Architecture",
                "pros": ["Strict tenant isolation with RLS", "Built-in Stripe subscription & billing webhooks", "Fast SEO SSR"],
                "cons": ["Requires careful tenant context middleware setup"]
            }
        elif "Enterprise" in app_type:
            return {
                "application_type": "Enterprise Application",
                "suitability_score": 96,
                "frontend": "Angular 17 / React 18 Enterprise Design System",
                "backend": f"Java 21 Spring Boot 3 ({domain_name.capitalize()} Enterprise API)",
                "database": "PostgreSQL 16 (Liquibase Migration + Audit Vault)",
                "cache_queue": "Apache Kafka (Event Mesh) + Redis 7 Cluster",
                "architecture_pattern": "Enterprise Tiered Microservices with Kafka Event Bus",
                "pros": ["Enterprise-grade RBAC and compliance audit logs", "High throughput event processing via Kafka", "Strict type safety"],
                "cons": ["Higher initial boilerplate setup and deployment memory"]
            }
        else:
            return {
                "application_type": "Web App",
                "suitability_score": 96,
                "frontend": f"Next.js 14 App Router ({title} UI)",
                "backend": f"Django DRF ({title} Core API)",
                "database": f"PostgreSQL 16 ({domain_name.capitalize()} Relational DB)",
                "cache_queue": "Redis 7 (Session Cache & Event Bus)",
                "architecture_pattern": f"Modular Full-Stack {title}",
                "pros": ["Feature-first modular architecture", "Production-grade JWT authentication", "Rich dashboard UI"],
                "cons": ["Requires multi-container deployment orchestration"]
            }

    def _build_folder_tree(self, app_type: str, domain_name: str, title: str, entities: List[str]) -> str:
        if "Mobile" in app_type:
            return f"""{domain_name}-mobile-app/
├── mobile-client/             # React Native (Expo SDK 51) Mobile UI
│   ├── src/screens/{entities[0]}/# {entities[0].capitalize()} Screen & Forms
│   ├── src/screens/{entities[1]}/# {entities[1].capitalize()} Screen & Details
│   ├── src/screens/{entities[2]}/# {entities[2].capitalize()} Screen & Actions
│   ├── src/components/        # Mobile UI Cards & Buttons
│   ├── app.json
│   └── package.json
├── mobile-backend/            # Go (Golang Fiber) Core API
│   ├── cmd/api/main.go        # Go Entrypoint
│   ├── pkg/{entities[0]}/     # {entities[0].capitalize()} Handlers & Models
│   ├── pkg/{entities[1]}/     # {entities[1].capitalize()} Services
│   └── go.mod
├── mobile-db/                 # PostgreSQL DDL & Migration Scripts
├── docker-compose.yml
└── README.md"""
        elif "Ai" in app_type:
            return f"""{domain_name}-ai-system/
├── ai-canvas-ui/              # React 18 + React Flow Canvas UI
│   ├── src/canvas/            # Node Canvas & Flow Graph
│   ├── src/agents/            # Agent Persona Editor UI
│   ├── src/components/        # Node Cards & Execution Feeds
│   └── package.json
├── ai-engine/                 # FastAPI + LangGraph AI Core
│   ├── app/agents/            # Specialized Persona Implementation
│   ├── app/workflows/         # LangGraph Execution State Machines
│   ├── app/tools/             # Tool Sandbox Bindings
│   ├── main.py
│   └── requirements.txt
├── vector-db/                 # pgvector DDL & Embedding Store
├── docker-compose.yml
└── README.md"""
        else:
            return f"""{domain_name}-app/
├── {domain_name}-frontend/        # {app_type} UI
│   ├── app/{entities[0]}/     # {entities[0].capitalize()} Management Portal
│   ├── app/{entities[1]}/     # {entities[1].capitalize()} Dashboard UI
│   ├── app/{entities[2]}/     # {entities[2].capitalize()} Workflow UI
│   ├── components/          # Reusable UI Widgets & Cards
│   └── package.json
├── {domain_name}-backend/         # Core API Service
│   ├── apps/{entities[0]}/    # {entities[0].capitalize()} Models & Endpoints
│   ├── apps/{entities[1]}/    # {entities[1].capitalize()} Logic
│   ├── manage.py
│   └── requirements.txt
├── {domain_name}-db/              # Database Schemas & Migrations
├── docker-compose.yml
└── README.md"""

    def _build_sql_ddl(self, domain_name: str, tables: List[Dict[str, Any]]) -> str:
        sql_lines = ["-- Production SQL DDL Script --", 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', ""]
        for tbl in tables:
            sql_lines.append(f"CREATE TABLE {tbl['name']} (")
            col_defs = []
            for col in tbl["columns"]:
                col_def = f"    {col['name']} {col['type']}"
                if col.get("key") == "PK":
                    col_def += " PRIMARY KEY"
                if col.get("default"):
                    col_def += f" DEFAULT {col['default']}"
                col_defs.append(col_def)
            sql_lines.append(",\n".join(col_defs))
            sql_lines.append(");")
            sql_lines.append("")
        return "\n".join(sql_lines)

    def _build_er_diagram(self, domain_name: str, entities: List[str]) -> str:
        e0 = entities[0]
        e1 = entities[1]
        e2 = entities[2]
        return f"""erDiagram
    {domain_name.upper()}_{e0.upper()} ||--o{{ {domain_name.upper()}_{e1.upper()} : manages
    {domain_name.upper()}_{e0.upper()} ||--o{{ {domain_name.upper()}_{e2.upper()} : owns

    {domain_name.upper()}_{e0.upper()} {{
        uuid id PK
        string title
        string status
        timestamp created_at
    }}
    {domain_name.upper()}_{e1.upper()} {{
        uuid id PK
        uuid {e0}_id FK
        string details
    }}
    {domain_name.upper()}_{e2.upper()} {{
        uuid id PK
        uuid {e0}_id FK
        string status
    }}"""

    def _build_sequence_diagram(self, app_type: str, domain_name: str, entities: List[str]) -> str:
        return f"""sequenceDiagram
    autonumber
    actor Client as 🌐 Client ({app_type})
    participant Gateway as 🛡️ API Gateway
    participant Backend as ⚙️ {domain_name.capitalize()} Core Service
    participant DB as 🗄️ PostgreSQL Database
    participant Cache as ⚡ Redis Cache

    Client->>Gateway: POST /api/v1/{domain_name}/{entities[0]}/ (JWT Bearer)
    Gateway->>Backend: Validate JWT & Route Payload
    Backend->>Cache: Check Session / Rate Limits
    Cache-->>Backend: Lock Granted
    Backend->>DB: Execute Query (INSERT into {domain_name}_{entities[0]})
    DB-->>Backend: Return Record UUID & Timestamps
    Backend-->>Gateway: HTTP 201 Created (JSON Response)
    Gateway-->>Client: 201 Success Response"""

    def _build_roadmap(self, domain_name: str, entities: List[str]) -> Dict[str, Any]:
        return {
            "phase_1_mvp": {
                "sprint": "Sprint 1-2 (MVP Scaffold)",
                "milestone": f"Core {entities[0].capitalize()} & Auth API",
                "deliverables": [
                    f"Setup project repository structure & Docker orchestration",
                    f"Implement JWT authentication middleware & {entities[0]} models",
                    f"Build initial {entities[0]} frontend management view"
                ]
            },
            "phase_2_core": {
                "sprint": "Sprint 3-4 (Core Workflows)",
                "milestone": f"{entities[1].capitalize()} & {entities[2].capitalize()} Features",
                "deliverables": [
                    f"Develop REST endpoints for {entities[1]} and {entities[2]}",
                    f"Implement real-time WebSocket / SSE status tracking",
                    f"Database indexing & query performance optimization"
                ]
            },
            "phase_3_production": {
                "sprint": "Sprint 5-6 (Production Hardening)",
                "milestone": "Security Audit, Testing & Deployment",
                "deliverables": [
                    "Full OWASP Top 10 security audit & secret rotation",
                    "Automated Playwright E2E & Schemathesis API contract test suites",
                    "Kubernetes HPA autoscaling deployment & CI/CD pipeline setup"
                ]
            }
        }

    def _render_markdown_report(self, data: Dict[str, Any]) -> str:
        stack = data["tech_stack"]
        roadmap = data["development_roadmap"]

        return f"""# 🏗️ {data['project_title']} — System Architecture Blueprint

> **Application Type**: `{data['application_type']}`  
> **Generated By**: AI Project Architect Engine  
> **Suitability Score**: `{stack['suitability_score']}/100`

---

## 🛠️ Recommended Technology Stack

| Layer | Recommended Technology |
| :--- | :--- |
| **Frontend UI** | `{stack['frontend']}` |
| **Backend Core** | `{stack['backend']}` |
| **Database** | `{stack['database']}` |
| **Cache & Queue** | `{stack['cache_queue']}` |
| **Architecture Pattern** | `{stack['architecture_pattern']}` |

### ✅ Pros
{chr(10).join(f"- {p}" for p in stack['pros'])}

---

## 📂 Project Directory Tree

```
{data['folder_structure']}
```

---

## 🔀 Sequence Diagram

```mermaid
{data['diagrams']['sequence_diagram']}
```

---

## 📊 Entity Relationship (ER) Diagram

```mermaid
{data['diagrams']['er_diagram']}
```

---

## 🗓️ Development Roadmap & Milestones

### 🚩 Phase 1: {roadmap['phase_1_mvp']['milestone']} (`{roadmap['phase_1_mvp']['sprint']}`)
{chr(10).join(f"- {d}" for d in roadmap['phase_1_mvp']['deliverables'])}

### 🚩 Phase 2: {roadmap['phase_2_core']['milestone']} (`{roadmap['phase_2_core']['sprint']}`)
{chr(10).join(f"- {d}" for d in roadmap['phase_2_core']['deliverables'])}

### 🚩 Phase 3: {roadmap['phase_3_production']['milestone']} (`{roadmap['phase_3_production']['sprint']}`)
{chr(10).join(f"- {d}" for d in roadmap['phase_3_production']['deliverables'])}
"""
