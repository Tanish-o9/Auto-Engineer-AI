import json
from typing import Dict, Any
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class AutomatedDocEngine:
    """
    Automated Documentation Engine
    Generates complete software documentation suite:
    - README.md
    - SWAGGER_OPENAPI.json (OpenAPI 3.0)
    - API_DOCS.md
    - ARCHITECTURE.md (with Mermaid diagrams)
    - DEPLOYMENT_GUIDE.md
    - INSTALLATION_GUIDE.md
    - CONTRIBUTING_GUIDE.md
    """
    def __init__(self):
        self.synthesizer = DomainSynthesizerEngine()

    def generate_full_docs(self, prompt_or_name: str) -> Dict[str, Any]:
        domain_data = self.synthesizer.synthesize(prompt_or_name)
        title = domain_data["title"]
        domain_name = domain_data["domain_name"]
        entities = domain_data["entities"]
        endpoints = domain_data["endpoints"]

        # 1. README.md
        readme = f"""# 🚀 {title} Platform

> Automated Enterprise Solution synthesized by AutoEngineer AI.

## 📌 Features
- **Modular Microservices**: Feature-first domain modules (`{entities[0]}`, `{entities[1]}`, `{entities[2]}`)
- **Production OpenAPI 3.0**: REST APIs with JWT Bearer OAuth
- **Relational PostgreSQL**: Production DDL migrations with primary/foreign key indexing
- **Multi-Cloud Ready**: Docker multi-stage & Kubernetes deployment configs

## ⚡ Quick Start
```bash
git clone https://github.com/organization/{domain_name}-app.git
cd {domain_name}-app
docker-compose up --build
```
"""

        # 2. SWAGGER_OPENAPI.json
        openapi = {
            "openapi": "3.0.3",
            "info": {"title": f"{title} API", "version": "1.0.0", "description": f"OpenAPI specification for {title}"},
            "servers": [{"url": f"https://api.{domain_name}.example.com/v1"}],
            "paths": {
                e["path"]: {
                    "get" if "GET" in e["method"] else "post": {
                        "summary": e["summary"],
                        "responses": {"200": {"description": "Successful Operation"}}
                    }
                } for e in endpoints
            }
        }

        # 3. API_DOCS.md
        api_docs = f"""# 🔌 API Documentation for {title}

| HTTP Method | Endpoint Path | Summary | Auth Required |
| :--- | :--- | :--- | :--- |
{chr(10).join(f"| `{e['method']}` | `{e['path']}` | {e['summary']} | `{e['auth']}` |" for e in endpoints)}
"""

        # 4. ARCHITECTURE.md (with Mermaid Diagram)
        architecture = f"""# 🏗️ Architecture Specification — {title}

```mermaid
graph TD
    Client[🌐 Client Browser / Mobile] --> Ingress[🛡️ Nginx API Gateway]
    Ingress --> App[⚙️ {domain_name.capitalize()} Core Backend Service]
    App --> DB[(🗄️ PostgreSQL Database)]
    App --> Cache[(⚡ Redis 7 Cache)]
```

### Components
- **Frontend Layer**: Next.js 14 App Router
- **Backend API**: Python FastAPI / Django DRF Core
- **Persistence Layer**: PostgreSQL 16
"""

        # 5. DEPLOYMENT_GUIDE.md
        deployment = f"""# 🚀 Production Deployment Guide

1. **Docker Compose Production Setup**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
2. **Kubernetes Deployment**:
   ```bash
   kubectl apply -f k8s/
   ```
"""

        # 6. INSTALLATION_GUIDE.md
        installation = f"""# 💻 Local Installation Guide

1. Install Python 3.11+ and Node.js 18+.
2. Install dependencies:
   ```bash
   cd backend && pip install -r requirements.txt
   cd ../frontend && npm install
   ```
"""

        # 7. CONTRIBUTING_GUIDE.md
        contributing = f"""# 🤝 Contributing Guidelines

1. Fork the repository & create a feature branch (`git checkout -b feature/amazing-feature`).
2. Ensure 100% type safety and 0 linter warnings (`ruff check .` / `npm run lint`).
3. Commit with semantic convention (`feat: add new endpoint`).
4. Submit a Pull Request for automated CI/CD code review.
"""

        return {
            "title": title,
            "domain_name": domain_name,
            "docs_suite": {
                "README.md": readme,
                "SWAGGER_OPENAPI.json": json.dumps(openapi, indent=2),
                "API_DOCS.md": api_docs,
                "ARCHITECTURE.md": architecture,
                "DEPLOYMENT_GUIDE.md": deployment,
                "INSTALLATION_GUIDE.md": installation,
                "CONTRIBUTING_GUIDE.md": contributing
            }
        }
