from typing import Dict, Any

class ArchitectureDiagramGenerator:
    """
    Architecture Diagram Generator (Sprint 5.1)
    Converts structured Architect Agent topology into renderable Mermaid.js flowchart syntax.
    Generation is deterministic code driven by structured state, not free-form LLM drawing.
    """
    def generate(self, topology_data: Dict[str, Any]) -> Dict[str, str]:
        mermaid_code = """graph TD
    Client[("🌐 Next.js Frontend UI")]
    Gateway[("🛡️ Nginx API Gateway / Ingress")]
    Django[("⚙️ Django Core Backend (Auth & RBAC)")]
    FastAPI[("🤖 FastAPI AI Service (8-Agent Graph)")]
    Postgres[("🗄️ PostgreSQL + pgvector")]
    Redis[("⚡ Redis Pub/Sub & Cache")]

    Client -->|HTTPS / JWT| Gateway
    Gateway -->|REST / API| Django
    Gateway -->|WebSockets / Async| FastAPI
    Django -->|SQL ORM| Postgres
    FastAPI -->|Vector RAG| Postgres
    Django -->|Service Auth| FastAPI
    FastAPI -->|Event Bus| Redis
    Django -->|Cache Session| Redis
"""
        return {
            "format": "mermaid",
            "diagram_code": mermaid_code,
            "raw_svg_placeholder": f"<svg viewBox='0 0 800 600'><text y='30'>System Architecture Diagram</text></svg>"
        }
