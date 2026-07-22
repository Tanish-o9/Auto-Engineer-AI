from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class QAAgent(BaseAgent):
    """
    QA Agent (Sprint 3.9)
    Generates structured Unit, Integration, API contract, and E2E test suite scenarios.
    """
    def __init__(self):
        super().__init__(
            name="QA Agent",
            icon="🧪",
            role_description="Generates unit, integration, API contract, and performance test suites."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)
        entities = domain_data["entities"]
        domain_name = domain_data["domain_name"]
        primary_entity = entities[0]

        test_scenarios = [
            {"suite": "Unit Tests", "target": f"apps.{primary_entity}.models.{primary_entity[:-1].capitalize() if primary_entity.endswith('s') else primary_entity.capitalize()}", "cases": 8, "framework": "Pytest / Django Test"},
            {"suite": "API Contract Tests", "target": f"OpenAPI /api/v1/{domain_name}/{primary_entity}/", "cases": 12, "framework": "Schemathesis / Postman"},
            {"suite": "LangGraph Integration Tests", "target": "app.graph.orchestrator", "cases": 5, "framework": "Pytest AsyncIO"},
            {"suite": "Frontend E2E Specs", "target": f"{primary_entity.capitalize()}Portal -> BlueprintViewer", "cases": 4, "framework": "Playwright"}
        ]

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Compiled test plan and target coverage matrix for {domain_data['title']}.",
            key_findings=[
                f"Mocked external {domain_name} APIs for CI/CD test stability",
                f"Targeting 90%+ code coverage on {primary_entity} domain logic",
                "Automated Playwright smoke test script for multi-step portal views"
            ],
            structured_data={
                "test_matrix": test_scenarios,
                "target_coverage": "90%"
            },
            status="APPROVED"
        )

