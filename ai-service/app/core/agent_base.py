from typing import Any, Dict, List, Optional
import time
from pydantic import BaseModel, Field
from app.core.logger import get_logger

class AgentOutputSchema(BaseModel):
    agent_name: str = Field(..., description="Name of the agent (e.g. Solution Architect)")
    role_icon: str = Field(..., description="Emoji/icon representing agent")
    reasoning_summary: str = Field(..., description="High-level reasoning explanation")
    key_findings: List[str] = Field(default_factory=list, description="Key architecture decisions or review points")
    structured_data: Dict[str, Any] = Field(default_factory=dict, description="Component-specific schema payload")
    status: str = Field("APPROVED", description="APPROVED, REVISION_REQUIRED, or REJECTED")
    execution_time_ms: Optional[float] = Field(None, description="Execution timing in milliseconds")

class BaseAgent:
    """
    Shared Agent Persona Framework (Production Upgrade)
    Provides system prompt assembly, output schema enforcement, retry resilience,
    structured logging, and telemetry tracking.
    """
    def __init__(self, name: str, icon: str, role_description: str):
        self.name = name
        self.icon = icon
        self.role_description = role_description
        self.logger = get_logger(name)

    def build_system_prompt(self, context_memory: Optional[str] = None) -> str:
        prompt = (
            f"You are the {self.name} {self.icon} in the AutoEngineer AI platform.\n"
            f"Role: {self.role_description}\n\n"
            f"ABSOLUTE RULES:\n"
            f"1. Never generate vague prose. Produce exact, production-grade structured engineering outputs.\n"
            f"2. Adhere strictly to upstream decisions made by Planner and Solution Architect.\n"
            f"3. Focus exclusively on your single responsibility domain.\n"
        )
        if context_memory:
            prompt += f"\nPROJECT ARCHITECTURAL MEMORY:\n{context_memory}\n"
        return prompt

    def execute(self, input_state: Dict[str, Any]) -> AgentOutputSchema:
        """
        Base execution fallback for deterministic state synthesis or LLM integration.
        Subclasses override this with specialized domain logic.
        """
        raise NotImplementedError("Subclasses must implement domain-specific agent execution logic.")

    def execute_with_retry(self, input_state: Dict[str, Any], max_retries: int = 3) -> AgentOutputSchema:
        """
        Executes domain logic with automated retry backoff and structured logging.
        """
        start_time = self.logger.log_agent_start(self.name, input_state.get("raw_prompt", "")[:50])
        last_error = None

        for attempt in range(1, max_retries + 1):
            try:
                output = self.execute(input_state)
                output.execution_time_ms = round((time.time() - start_time) * 1000, 2)
                self.logger.log_agent_success(self.name, start_time, len(output.key_findings))
                return output
            except Exception as e:
                last_error = e
                self.logger.log_agent_error(self.name, str(e), attempt)
                if attempt < max_retries:
                    time.sleep(0.2 * attempt)

        # Fallback error schema
        duration = round((time.time() - start_time) * 1000, 2)
        return AgentOutputSchema(
            agent_name=self.name,
            role_icon=self.icon,
            reasoning_summary=f"Execution failed after {max_retries} attempts: {str(last_error)}",
            key_findings=[f"Failed execution attempt: {str(last_error)}"],
            structured_data={"error": str(last_error)},
            status="REJECTED",
            execution_time_ms=duration
        )

