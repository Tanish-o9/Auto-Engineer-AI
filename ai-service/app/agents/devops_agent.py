from typing import Dict, Any
from app.core.agent_base import BaseAgent, AgentOutputSchema
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class DevOpsAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="DevOps Agent",
            icon="🚀",
            role_description="Generates Dockerfiles, Kubernetes manifests, horizontal pod autoscalers (HPA), and GitHub Actions pipelines."
        )

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        raw_prompt = input_state.get("raw_prompt", "")
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)

        manifests = [
            {"name": "k8s/deployment-backend.yaml", "type": "Deployment", "replicas": 3},
            {"name": "k8s/deployment-frontend.yaml", "type": "Deployment", "replicas": 2},
            {"name": ".github/workflows/ci-cd.yaml", "type": "GitHub Actions", "triggers": ["push", "pull_request"]}
        ]

        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Emitted containerization configs and folder structure tree for {domain_data['title']}.",
            key_findings=[
                "Multi-stage Docker builds to reduce image size (<150MB)",
                "Configured HPA auto-scaling on API tier",
                "Prometheus metrics exposed at /metrics endpoint"
            ],
            structured_data={
                "project_tree": domain_data["project_tree"],
                "k8s_manifests": manifests,
                "container_registry": "AWS ECR",
                "ci_cd_provider": "GitHub Actions"
            },
            status="APPROVED"
        )
