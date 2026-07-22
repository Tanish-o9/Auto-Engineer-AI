from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.architect_engine import ArchitectEngine

class SolutionArchitectAgent(BaseAgent):
    """
    AI Software Architect Agent
    Designs High-Level Design (HLD), Low-Level Design (LLD), Database Schema,
    API Specifications, Security Architecture, ADRs, and Architecture Scorecard.
    """
    def __init__(self):
        super().__init__(
            name="Solution Architect Agent",
            icon="🏗️",
            role_description="Designs High-Level Design (HLD), Low-Level Design (LLD), Database Entities, REST APIs, ADRs, and Architecture Validation Scorecard."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        engine = ArchitectEngine()
        arch_data = engine.synthesize_architecture(raw_prompt)

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Synthesized full HLD & LLD software architecture for '{arch_data['project_name']}'. Validated architecture score: {arch_data['architecture_validation_score']}%.",
            key_findings=[
                f"Selected {arch_data['hld']['architecture_style']} topology",
                f"Configured {len(arch_data['database_architecture']['entities'])} database entity relationships and IVFFlat index",
                f"Documented {len(arch_data['adrs'])} Architecture Decision Records (ADRs)"
            ],
            structured_data=arch_data,
            status="APPROVED"
        )
