from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class DatabaseAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Database Agent",
            icon="🗄️",
            role_description="Optimizes relational schemas, B-Tree & IVFFlat vector indexing, foreign keys, and migration integrity."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Reviewed database requirements for {domain_data['title']}. Generated domain tables and indexes.",
            key_findings=[
                "Added UUID primary keys across all domain models for security",
                "Optimized relational indexes for domain entity lookup",
                "Enforced cascading deletes on foreign key relationships"
            ],
            structured_data={
                "tables": domain_data["tables"],
                "database_engine": "PostgreSQL 16",
                "extensions": ["uuid-ossp", "vector"]
            },
            status="APPROVED"
        )
