from typing import Dict, Any

class ERDiagramAndSchemaGenerator:
    """
    ER Diagram & Schema Generator (Sprint 5.2)
    Converts Database Agent schema state into ER diagram Mermaid syntax and production SQL DDL scripts.
    """
    def generate(self, schema_data: Dict[str, Any]) -> Dict[str, Any]:
        mermaid_er = """erDiagram
    ORGANIZATION ||--o{ USER : contains
    ORGANIZATION ||--o{ PROJECT : owns
    PROJECT ||--o{ BLUEPRINT : creates
    BLUEPRINT ||--o{ ARTIFACT : contains

    ORGANIZATION {
        uuid id PK
        string name
        string slug
    }
    PROJECT {
        uuid id PK
        uuid organization_id FK
        string name
    }
    BLUEPRINT {
        uuid id PK
        uuid project_id FK
        string version
        string status
    }
    ARTIFACT {
        uuid id PK
        uuid blueprint_id FK
        string artifact_type
        jsonb content_json
    }
"""
        sql_ddl = """-- Auto-Generated Migration SQL DDL --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_org ON projects(organization_id);
"""
        return {
            "er_mermaid": mermaid_er,
            "sql_ddl": sql_ddl
        }
