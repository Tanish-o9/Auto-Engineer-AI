from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.requirement_analyzer_engine import RequirementAnalyzerEngine

class ProductManagerAgent(BaseAgent):
    """
    Requirement Analyzer / Product Manager Agent
    Transforms business prompts into complete Software Requirement Specification (SRS),
    Agile Backlog with Given-When-Then criteria, and Central Business Rules.
    """
    def __init__(self):
        super().__init__(
            name="Requirement Analyzer Agent",
            icon="🧑‍💼",
            role_description="Transforms ideas into Software Requirement Specifications (SRS), user stories, Given-When-Then criteria, and business rules."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        prompt = input_state.get("raw_prompt", "")
        scale = input_state.get("target_scale", "Medium")
        
        analyzer = RequirementAnalyzerEngine()
        srs_result = analyzer.analyze(prompt)

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Analyzed prompt for '{srs_result['project_name']}'. Extracted {len(srs_result['functional_requirements'])} functional requirements, {len(srs_result['user_stories'])} user stories, and {len(srs_result['business_rules'])} central business rules.",
            key_findings=[
                f"Generated complete SRS for '{srs_result['project_name']}' in '{srs_result['business_domain']}' domain",
                f"Extracted {len(srs_result['functional_requirements'])} Functional Requirements and {len(srs_result['non_functional_requirements'])} NFRs",
                f"Synthesized Agile backlog with Given-When-Then acceptance criteria and central business rules"
            ],
            structured_data=srs_result,
            status="APPROVED"
        )

# Alias for PlannerAgent
PlannerAgent = ProductManagerAgent
