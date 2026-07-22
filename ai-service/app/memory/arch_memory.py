from typing import List, Dict, Any, Optional

class ArchitecturalMemoryStore:
    """
    Architectural Memory (Sprint 4.3)
    Persists architectural decisions and conventions across a project's lifetime.
    Read access: All 8 agents can read memory.
    Write access: Restricted strictly to Solution Architect Agent.
    """
    def __init__(self):
        self._memory_records: List[Dict[str, Any]] = [
            {
                "id": "ADR-001",
                "author_agent": "Solution Architect Agent",
                "decision": "Use Django DRF for core domain persistence and FastAPI for async agent graph execution.",
                "status": "APPROVED",
                "timestamp": "2026-07-21"
            }
        ]

    def read_all_conventions(self, project_id: str) -> List[Dict[str, Any]]:
        return self._memory_records

    def record_decision(self, writing_agent_name: str, decision_text: str, project_id: str) -> Dict[str, Any]:
        if writing_agent_name != "Solution Architect Agent":
            raise PermissionError("Only the Solution Architect Agent can write to long-term architectural memory.")

        record = {
            "id": f"ADR-00{len(self._memory_records) + 1}",
            "author_agent": writing_agent_name,
            "decision": decision_text,
            "status": "APPROVED",
            "timestamp": "2026-07-21"
        }
        self._memory_records.append(record)
        return record
