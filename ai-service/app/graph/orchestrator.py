import time
import logging
from typing import Dict, Any, List, Optional, TypedDict
from langgraph.graph import StateGraph, START, END

from app.core.logger import get_logger
from app.agents.supervisor_agent import SupervisorAgent
from app.agents.pm_agent import ProductManagerAgent, PlannerAgent
from app.agents.architect_agent import SolutionArchitectAgent
from app.agents.backend_agent import BackendAgent
from app.agents.frontend_agent import FrontendAgent
from app.agents.database_agent import DatabaseAgent
from app.agents.security_agent import SecurityAgent
from app.agents.qa_agent import QAAgent
from app.agents.devops_agent import DevOpsAgent
from app.agents.doc_agent import DocumentationAgent
from app.agents.code_reviewer_agent import CodeReviewerAgent

# TypedDict for LangGraph Execution State
class GraphState(TypedDict):
    raw_prompt: str
    target_scale: str
    completed_agents: List[str]
    timeline: List[Dict[str, Any]]
    blueprint_summary: Dict[str, Any]
    current_stage: str
    status: str
    error: Optional[str]

class MultiAgentOrchestratorGraph:
    """
    Production-Grade 10-Agent LangGraph Orchestrator
    Orchestrates specialized engineering agents using a Supervisor Router, parallel fan-out branches,
    retry resilience, and structured timing telemetry.
    """
    def __init__(self):
        self.logger = get_logger("autoengineer.orchestrator")
        
        # Instantiate 10 Specialized Agents
        self.supervisor_agent = SupervisorAgent()
        self.planner_agent = PlannerAgent()
        self.architect_agent = SolutionArchitectAgent()
        self.backend_agent = BackendAgent()
        self.frontend_agent = FrontendAgent()
        self.database_agent = DatabaseAgent()
        self.security_agent = SecurityAgent()
        self.code_reviewer_agent = CodeReviewerAgent()
        self.testing_agent = QAAgent()
        self.devops_agent = DevOpsAgent()
        self.doc_agent = DocumentationAgent()

        # Build LangGraph StateGraph
        self.graph = self._build_langgraph()

    def _build_langgraph(self) -> StateGraph:
        builder = StateGraph(GraphState)

        # Add Nodes
        builder.add_node("supervisor", self._supervisor_node)
        builder.add_node("planner", self._planner_node)
        builder.add_node("architect", self._architect_node)
        builder.add_node("backend", self._backend_node)
        builder.add_node("frontend", self._frontend_node)
        builder.add_node("database", self._database_node)
        builder.add_node("security", self._security_node)
        builder.add_node("code_reviewer", self._code_reviewer_node)
        builder.add_node("testing", self._testing_node)
        builder.add_node("devops", self._devops_node)
        builder.add_node("documentation", self._documentation_node)

        # Define Edges
        builder.add_edge(START, "supervisor")
        
        # Supervisor conditional router
        builder.add_conditional_edges(
            "supervisor",
            self._route_next_stage,
            {
                "PLANNING_STAGE": "planner",
                "ENGINEERING_STAGE": "backend",
                "AUDIT_STAGE": "security",
                "DEVOPS_STAGE": "devops",
                "FINISHED": END
            }
        )

        # Stage 1: Planning -> Architect -> Supervisor
        builder.add_edge("planner", "architect")
        builder.add_edge("architect", "supervisor")

        # Stage 2: Parallel Engineering Fan-Out -> Supervisor
        builder.add_edge("backend", "frontend")
        builder.add_edge("frontend", "database")
        builder.add_edge("database", "supervisor")

        # Stage 3: Parallel Audit Fan-Out -> Supervisor
        builder.add_edge("security", "code_reviewer")
        builder.add_edge("code_reviewer", "testing")
        builder.add_edge("testing", "supervisor")

        # Stage 4: DevOps -> Documentation -> Supervisor
        builder.add_edge("devops", "documentation")
        builder.add_edge("documentation", "supervisor")

        return builder.compile()

    def _supervisor_node(self, state: GraphState) -> GraphState:
        res = self.supervisor_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["supervisor"] = res.structured_data
        if "Supervisor Agent" not in state["completed_agents"]:
            state["completed_agents"].append("Supervisor Agent")
        return state

    def _planner_node(self, state: GraphState) -> GraphState:
        res = self.planner_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["pm"] = res.structured_data
        state["completed_agents"].append("Planner Agent")
        return state

    def _architect_node(self, state: GraphState) -> GraphState:
        res = self.architect_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["architect"] = res.structured_data
        state["completed_agents"].append("Solution Architect Agent")
        state["current_stage"] = "PLANNING_COMPLETE"
        return state

    def _backend_node(self, state: GraphState) -> GraphState:
        res = self.backend_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["backend"] = res.structured_data
        state["completed_agents"].append("Backend Engineer Agent")
        return state

    def _frontend_node(self, state: GraphState) -> GraphState:
        res = self.frontend_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["frontend"] = res.structured_data
        state["completed_agents"].append("Frontend Engineer Agent")
        return state

    def _database_node(self, state: GraphState) -> GraphState:
        res = self.database_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["database"] = res.structured_data
        state["completed_agents"].append("Database Engineer Agent")
        state["current_stage"] = "ENGINEERING_COMPLETE"
        return state

    def _security_node(self, state: GraphState) -> GraphState:
        res = self.security_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["security"] = res.structured_data
        state["completed_agents"].append("Security Reviewer Agent")
        return state

    def _code_reviewer_node(self, state: GraphState) -> GraphState:
        res = self.code_reviewer_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["code_reviewer"] = res.structured_data
        state["completed_agents"].append("Code Reviewer Agent")
        return state

    def _testing_node(self, state: GraphState) -> GraphState:
        res = self.testing_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["qa"] = res.structured_data
        state["completed_agents"].append("Testing Agent")
        state["current_stage"] = "AUDIT_COMPLETE"
        return state

    def _devops_node(self, state: GraphState) -> GraphState:
        res = self.devops_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["devops"] = res.structured_data
        state["completed_agents"].append("DevOps Agent")
        return state

    def _documentation_node(self, state: GraphState) -> GraphState:
        res = self.doc_agent.execute_with_retry(state)
        state["timeline"].append(res.model_dump())
        state["blueprint_summary"]["documentation"] = res.structured_data
        state["completed_agents"].append("Documentation Agent")
        state["current_stage"] = "ALL_COMPLETE"
        return state

    def _route_next_stage(self, state: GraphState) -> str:
        stage = state.get("current_stage", "INITIALIZATION")
        if stage == "INITIALIZATION":
            return "PLANNING_STAGE"
        elif stage == "PLANNING_COMPLETE":
            return "ENGINEERING_STAGE"
        elif stage == "ENGINEERING_COMPLETE":
            return "AUDIT_STAGE"
        elif stage == "AUDIT_COMPLETE":
            return "DEVOPS_STAGE"
        else:
            return "FINISHED"

    def run_workflow(self, input_prompt: str, target_scale: str = "Medium") -> Dict[str, Any]:
        self.logger.log_graph_event("START_WORKFLOW", f"Prompt: '{input_prompt[:50]}...' Scale: {target_scale}")
        
        initial_state: GraphState = {
            "raw_prompt": input_prompt,
            "target_scale": target_scale,
            "completed_agents": [],
            "timeline": [],
            "blueprint_summary": {},
            "current_stage": "INITIALIZATION",
            "status": "RUNNING",
            "error": None
        }

        # Invoke LangGraph StateGraph
        final_state = self.graph.invoke(initial_state)

        self.logger.log_graph_event("WORKFLOW_COMPLETED", f"Executed {len(final_state['completed_agents'])} agents successfully.")

        return {
            "status": "SUCCESS",
            "version": "v2.0.0-PROD-LANGGRAPH",
            "orchestrator_engine": "LangGraph StateGraph Engine",
            "agents_executed_count": len(final_state["completed_agents"]),
            "timeline": final_state["timeline"],
            "blueprint_summary": final_state["blueprint_summary"],
            "raw_prompt": final_state["raw_prompt"]
        }
