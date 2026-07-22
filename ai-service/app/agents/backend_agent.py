from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class BackendAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Backend Agent",
            icon="⚙️",
            role_description="Produces API specs, auth mechanisms, DB migration steps, and business logic routing."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Designed OpenAPI endpoints and REST resources for {domain_data['title']}.",
            key_findings=[
                "Enforced REST standards with standard OpenAPI 3.0 schemas",
                "Isolated endpoints behind JWT authentication middleware",
                "Configured N+1 safe Django QuerySets with select_related / prefetch_related"
            ],
            structured_data={
                "endpoints": domain_data["endpoints"],
                "auth_middleware": "JWTAuthentication",
                "database_orm": "Django ORM"
            },
            status="APPROVED"
        )
