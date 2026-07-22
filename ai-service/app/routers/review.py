from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.code_review_engine import AICodeReviewEngine

router = APIRouter(prefix="/api/v1/review", tags=["review"])

class CodeReviewRequest(BaseModel):
    code_snippet: str
    language: Optional[str] = "python"

engine = AICodeReviewEngine()

@router.post("/code")
async def review_code_snippet(payload: CodeReviewRequest):
    if not payload.code_snippet.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="code_snippet must not be empty")

    result = engine.review_code(payload.code_snippet, payload.language)
    return {
        "status": "REVIEWED",
        "result": result
    }
