from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class FrontendAgent(BaseAgent):
    """
    Frontend Agent (Sprint 3.6)
    Designs UI component hierarchy, state management strategy, layout trees, and API client hooks.
    """
    def __init__(self):
        super().__init__(
            name="Frontend Agent",
            icon="🎨",
            role_description="Proposes UI architecture, component hierarchy, theme tokens, and React Query state management."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)
        entities = domain_data["entities"]
        domain_name = domain_data["domain_name"]

        components = [
            {
                "name": f"{entities[0].capitalize()}Portal",
                "path": f"app/{entities[0]}/page.tsx",
                "purpose": f"Primary {entities[0].replace('_', ' ')} management portal & interactive table"
            },
            {
                "name": f"{entities[1].capitalize()}Dashboard",
                "path": f"app/{entities[1]}/page.tsx",
                "purpose": f"Real-time {entities[1].replace('_', ' ')} status dashboard & metrics"
            },
            {
                "name": f"{entities[2].capitalize()}WorkflowWidget",
                "path": f"components/{entities[2]}/{entities[2].capitalize()}Widget.tsx",
                "purpose": f"Interactive {entities[2].replace('_', ' ')} workflow & form drawer"
            },
            {
                "name": "BlueprintViewer",
                "path": "components/blueprint/BlueprintViewer.tsx",
                "purpose": "Interactive Mermaid, OpenAPI, and ER blueprint viewer"
            }
        ]

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Constructed Next.js App Router layout tree and components for {domain_data['title']}.",
            key_findings=[
                f"Selected React Query for {domain_name} server state caching",
                f"Built dynamic component tree covering {', '.join(entities[:3])}",
                "Configured dark mode CSS variables with slate/cyan tokens"
            ],
            structured_data={
                "component_tree": components,
                "state_management": "React Query (Server State) + Redux Toolkit (Local UI State)",
                "design_system": "Tailwind CSS + shadcn/ui"
            },
            status="APPROVED"
        )

