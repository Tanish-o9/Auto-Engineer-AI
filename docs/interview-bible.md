# 🎤 AutoEngineer AI — Technical Interview Bible & Q&A

This document compiles the core technical architectural decisions and interview talking points for AutoEngineer AI.

---

## 🌟 Core Technical Highlights

### Q1: Why use 8 specialized AI agents instead of a single giant system prompt?
**Answer**:
1. **Context Window Contamination**: A single prompt forced to output user stories, OpenAPI specs, ER schemas, OWASP reviews, and Dockerfiles suffers from severe instruction bleed and hallucination across domains.
2. **Domain Isolation & DRY**: Each agent operates with a focused system prompt, isolated Pydantic output schema, and single responsibility domain (e.g., the Security Agent only audits AuthN/AuthZ and OWASP risks; the Database Agent only refines SQL DDL and indexing).
3. **Parallel Execution**: Solution Architect output acts as an immutable contract allowing the **Backend**, **Frontend**, and **Database** agents to run in parallel fan-out nodes in LangGraph.
4. **Deterministic Revision Loops**: If the Security or QA Agent rejects a proposal (`status: REJECTED`), LangGraph loops back to the Architect Agent with exact structured feedback rather than restarting the entire conversation.

### Q2: How do Generation Engines stay deterministic while agents remain generative?
**Answer**:
Generative LLMs excel at reasoning, trade-off evaluation, and conceptual decomposition. However, generating raw syntax (like valid Mermaid diagrams, syntactically perfect OpenAPI 3.0 specs, or valid SQL migrations) directly from LLMs often yields syntax errors.

AutoEngineer AI decouples **Agent Reasoning** from **File Generation**:
- **Agents** produce structured JSON state (e.g., list of components, endpoints, ORM relationships).
- **Generation Engines** (Python modules in `ai-service/app/engines/`) consume this JSON state and deterministically compile renderable Mermaid diagrams, OpenAPI 3.0 JSON specifications, and SQL DDL scripts using template engines and standard serializers.

---

## 🔒 Security & Multi-Tenancy Q&A

### Q3: How is multi-tenant isolation enforced in vector RAG queries (pgvector)?
**Answer**:
Every vector embedding chunk stored in PostgreSQL via `pgvector` includes metadata columns for `organization_id` and `project_id`. When querying the vector store, the search query executes an explicit SQL filter clause:
```sql
SELECT * FROM embeddings 
WHERE organization_id = $1 AND project_id = $2 
ORDER BY embedding <=> query_vector LIMIT 5;
```
This ensures zero cross-tenant data leaks even when sharing a single PostgreSQL cluster.

### Q4: How is the Human-vs-Agent permission boundary structured in Django?
**Answer**:
Django uses a custom DRF permission class `AgentExecutionBoundaryPermission`. Requests originating from the FastAPI AI service pass a signed `X-Agent-Service-Token`. The permission class checks:
- **Agents** can create and update Blueprints, Artifacts, and AgentRun logs.
- **Agents** are strictly blocked from invoking administrative endpoints (such as managing organization memberships, modifying billing tokens, or deleting user accounts).
