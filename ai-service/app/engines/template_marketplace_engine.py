import os
from typing import Dict, Any, List

class TemplateMarketplaceEngine:
    """
    Project Template Marketplace Engine
    Provides pre-built, versioned templates for SaaS, CRM, ERP, LMS, Hospital, Gym, E-Commerce, Portfolio, AI Chatbot, Multi-Agent.
    """
    def get_marketplace_templates() -> List[Dict[str, Any]]:
        return [
            {"id": "tmpl_gym", "name": "Gym & Fitness ERP", "category": "Fitness", "version": "2.4.0", "stack": "Django + Next.js + Postgres", "entities": ["members", "trainers", "workout_plans", "payments"]},
            {"id": "tmpl_hospital", "name": "Hospital & Clinic ERP", "category": "Healthcare", "version": "3.1.0", "stack": "FastAPI + React + Postgres", "entities": ["patients", "doctors", "appointments", "prescriptions"]},
            {"id": "tmpl_saas", "name": "AI SaaS Platform", "category": "SaaS", "version": "1.9.0", "stack": "Next.js + Stripe + Celery + Redis", "entities": ["users", "teams", "subscriptions", "usage_logs"]},
            {"id": "tmpl_ecommerce", "name": "E-Commerce Marketplace", "category": "Retail", "version": "4.0.0", "stack": "Django + Next.js + Postgres", "entities": ["products", "orders", "cart", "vendors"]},
            {"id": "tmpl_crm", "name": "Enterprise CRM Engine", "category": "Sales", "version": "2.0.0", "stack": "FastAPI + React + Postgres", "entities": ["leads", "deals", "contacts", "activities"]},
            {"id": "tmpl_lms", "name": "Learning Management System", "category": "Education", "version": "2.2.0", "stack": "Django + React + Postgres", "entities": ["courses", "students", "lessons", "certificates"]},
            {"id": "tmpl_chatbot", "name": "RAG AI Chatbot System", "category": "AI", "version": "1.5.0", "stack": "FastAPI + LangChain + ChromaDB", "entities": ["conversations", "documents", "embeddings"]},
            {"id": "tmpl_multi_agent", "name": "Multi-Agent Workflow Engine", "category": "AI Infrastructure", "version": "2.0.0", "stack": "FastAPI + LangGraph + Redis", "entities": ["agents", "tasks", "memories", "trajectories"]}
        ]
