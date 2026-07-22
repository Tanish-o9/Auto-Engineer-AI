import logging
import sys
import time
from typing import Any, Dict, Optional

class SystemLogger:
    """
    Structured System Logger for AutoEngineer Multi-Agent System
    Provides formatted console and file logging with execution timing telemetry.
    """
    def __init__(self, name: str = "autoengineer"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stdout)
            formatter = logging.Formatter(
                "[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s",
                datefmt="%Y-%m-%d %H:%M:%S"
            )
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)

    def log_agent_start(self, agent_name: str, task: str) -> float:
        self.logger.info(f"[START] [{agent_name}] Started execution: {task}")
        return time.time()

    def log_agent_success(self, agent_name: str, start_time: float, findings_count: int):
        duration = round((time.time() - start_time) * 1000, 2)
        self.logger.info(f"[SUCCESS] [{agent_name}] Completed in {duration}ms | Key findings: {findings_count}")

    def log_agent_error(self, agent_name: str, error_msg: str, retry_count: int):
        self.logger.error(f"[ERROR] [{agent_name}] Failed (Retry #{retry_count}): {error_msg}")

    def log_graph_event(self, event_type: str, detail: str):
        self.logger.info(f"[GRAPH] [LangGraph Engine] {event_type}: {detail}")

def get_logger(name: str = "autoengineer") -> SystemLogger:
    return SystemLogger(name)
