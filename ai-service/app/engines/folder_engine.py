from typing import Dict, Any
from app.engines.domain_synthesizer import DomainSynthesizerEngine

class FolderStructureGenerator:
    """
    Folder Structure Generator (Sprint 5.4)
    Emits project folder-structure tree and coding standards document tailored to chosen stack and domain prompt.
    """
    def generate(self, raw_prompt: str = "AI Agent Platform", stack_choice: str = "Polyglot") -> Dict[str, str]:
        synthesizer = DomainSynthesizerEngine()
        domain_data = synthesizer.synthesize(raw_prompt)
        tree = domain_data["project_tree"]

        standards = f"""# 📏 Engineering & Coding Standards for {domain_data['title']}

1. **Feature-First Architecture**: Group code by business domain (e.g. `apps/{domain_data['entities'][0]}`, `apps/{domain_data['entities'][1]}`) rather than generic layer directories.
2. **Strict Type Safety**: All TypeScript must strictly enforce types without implicit `any`. All Python functions must include type annotations.
3. **Immutability & Audit**: Never hard-delete critical records. Implement soft deletes or versioned blueprints for `{domain_data['domain_name']}` entities.
4. **Environment Isolation**: No hardcoded API keys or secrets in source code. Use environment variables strictly.
"""
        return {
            "folder_tree": tree,
            "coding_standards_markdown": standards
        }

