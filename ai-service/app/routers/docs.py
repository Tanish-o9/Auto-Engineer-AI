from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.engines.auto_doc_engine import AutomatedDocEngine

router = APIRouter(prefix="/api/v1/docs", tags=["docs"])

class GenerateDocsRequest(BaseModel):
    prompt_or_name: str

engine = AutomatedDocEngine()

@router.post("/generate-all")
async def generate_full_docs_suite(payload: GenerateDocsRequest):
    if not payload.prompt_or_name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="prompt_or_name must not be empty")

    result = engine.generate_full_docs(payload.prompt_or_name)
    return {
        "status": "DOCS_GENERATED",
        "result": result
    }
