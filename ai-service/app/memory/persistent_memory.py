import os
import json
import time
import math
import re
from typing import Dict, Any, List, Optional

class PersistentMemoryEngine:
    """
    Persistent AI Memory Engine
    Manages Short-Term and Long-Term memories across categories:
    conversations, coding_style, architecture_decisions, preferred_frameworks,
    bugs, todos, project_requirements, previous_prompts.
    
    Persists state to local JSON storage so memory survives application restarts.
    Provides semantic vector retrieval for context synthesis.
    """
    def __init__(self, storage_file: str = r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\ai-service\app\memory\persistent_memory.json"):
        self.storage_file = storage_file
        self.short_term_memory: List[Dict[str, Any]] = []
        self.long_term_memory: List[Dict[str, Any]] = []
        self._load_memory_from_disk()

    def _load_memory_from_disk(self):
        if os.path.exists(self.storage_file):
            try:
                with open(self.storage_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.short_term_memory = data.get("short_term", [])
                    self.long_term_memory = data.get("long_term", [])
            except Exception:
                self._seed_default_memory()
        else:
            self._seed_default_memory()

    def _save_memory_to_disk(self):
        try:
            os.makedirs(os.path.dirname(self.storage_file), exist_ok=True)
            with open(self.storage_file, "w", encoding="utf-8") as f:
                json.dump({
                    "short_term": self.short_term_memory,
                    "long_term": self.long_term_memory,
                    "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
                }, f, indent=2)
        except Exception:
            pass

    def _seed_default_memory(self):
        self.long_term_memory = [
            {
                "id": "MEM-001",
                "category": "coding_style",
                "content": "Strict TypeScript without implicit any, Python type hints on public methods, 0-warning Ruff lint policy.",
                "importance": 0.95,
                "created_at": "2026-07-21 12:00:00"
            },
            {
                "id": "MEM-002",
                "category": "preferred_frameworks",
                "content": "Next.js 14 App Router for Frontend, Django DRF / FastAPI for Backend, PostgreSQL + pgvector for DB, Redis 7 for Cache.",
                "importance": 0.98,
                "created_at": "2026-07-21 12:00:00"
            },
            {
                "id": "MEM-003",
                "category": "architecture_decisions",
                "content": "Feature-first domain module structure instead of layer directories. 10-Agent LangGraph orchestration with Supervisor Router.",
                "importance": 0.99,
                "created_at": "2026-07-21 12:00:00"
            },
            {
                "id": "MEM-004",
                "category": "project_requirements",
                "content": "Autonomous execution with stage checkpoints, production SQL DDL scripts, Schemathesis API tests & Playwright E2E suites.",
                "importance": 0.90,
                "created_at": "2026-07-21 12:00:00"
            }
        ]
        self._save_memory_to_disk()

    def store_memory(self, category: str, content: str, memory_type: str = "long_term", importance: float = 0.8) -> Dict[str, Any]:
        valid_categories = {
            "conversations", "coding_style", "architecture_decisions",
            "preferred_frameworks", "bugs", "todos", "project_requirements", "previous_prompts"
        }
        clean_cat = category.strip().lower() if category.strip().lower() in valid_categories else "conversations"

        item = {
            "id": f"MEM-{len(self.long_term_memory) + len(self.short_term_memory) + 1:03d}",
            "category": clean_cat,
            "content": content,
            "importance": importance,
            "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        if memory_type == "short_term":
            self.short_term_memory.append(item)
            if len(self.short_term_memory) > 50:
                self.short_term_memory.pop(0)
        else:
            self.long_term_memory.append(item)

        self._save_memory_to_disk()
        return item

    def _compute_similarity(self, query: str, text: str) -> float:
        q_words = set(re.findall(r'\w+', query.lower()))
        t_words = set(re.findall(r'\w+', text.lower()))
        if not q_words or not t_words:
            return 0.0
        intersection = q_words.intersection(t_words)
        return len(intersection) / math.sqrt(len(q_words) * len(t_words))

    def semantic_search(self, query: str, category: Optional[str] = None, top_k: int = 5) -> List[Dict[str, Any]]:
        all_items = self.long_term_memory + self.short_term_memory
        results = []

        for item in all_items:
            if category and item["category"] != category:
                continue
            score = self._compute_similarity(query, item["content"])
            if score > 0.0 or not query.strip():
                item_copy = item.copy()
                item_copy["similarity_score"] = round(score if query.strip() else item.get("importance", 0.5), 3)
                results.append(item_copy)

        results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return results[:top_k]

    def get_all_memories(self) -> Dict[str, Any]:
        return {
            "short_term_count": len(self.short_term_memory),
            "long_term_count": len(self.long_term_memory),
            "short_term": self.short_term_memory,
            "long_term": self.long_term_memory
        }
