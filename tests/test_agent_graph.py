import pytest
from ai_service.app.graph.orchestrator import MultiAgentOrchestratorGraph

def test_full_8_agent_orchestration_graph_run():
    """Integration test: runs a complete prompt through the 8-agent LangGraph workflow."""
    orchestrator = MultiAgentOrchestratorGraph()
    prompt = "Build a real-time collaborative whiteboarding platform with video conferencing."
    result = orchestrator.run_workflow(prompt, target_scale="Medium (10k-100k DAU)")

    assert result["status"] == "SUCCESS"
    assert result["agents_executed_count"] == 8
    assert len(result["timeline"]) == 8
    assert result["version"] == "v1.0.0"
