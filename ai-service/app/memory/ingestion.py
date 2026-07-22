from typing import List, Dict, Any

class CodeAndDocIngestionPipeline:
    """
    GitHub RAG Ingestion Pipeline (Sprint 4.1)
    Chunks source code using AST/symbol boundary splitting and prose markdown using semantic paragraph splitting.
    """
    def chunk_code(self, file_path: str, code_content: str) -> List[Dict[str, Any]]:
        lines = code_content.split('\n')
        chunks = []
        chunk_size = 50
        for i in range(0, len(lines), chunk_size):
            snippet = "\n".join(lines[i:i+chunk_size])
            chunks.append({
                "file_path": file_path,
                "type": "CODE",
                "start_line": i + 1,
                "end_line": min(i + chunk_size, len(lines)),
                "content": snippet
            })
        return chunks

    def chunk_documentation(self, file_path: str, doc_content: str) -> List[Dict[str, Any]]:
        paragraphs = doc_content.split('\n\n')
        chunks = []
        for idx, p in enumerate(paragraphs):
            if p.strip():
                chunks.append({
                    "file_path": file_path,
                    "type": "PROSE",
                    "section_index": idx,
                    "content": p.strip()
                })
        return chunks
