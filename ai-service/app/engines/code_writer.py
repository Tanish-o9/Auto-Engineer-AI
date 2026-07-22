from typing import Dict, Any
from app.engines.core_implementation_engine import CoreImplementationEngine

class CodeWriterEngine:
    """
    Code Writer Engine
    Delegates to CoreImplementationEngine to execute the 7-Phase production project lifecycle.
    """
    def __init__(self, root_dir: str = r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects"):
        self.engine = CoreImplementationEngine(output_root=root_dir)

    def write_project_to_disk(self, raw_prompt: str) -> Dict[str, Any]:
        return self.engine.execute_7phase_pipeline(raw_prompt)
