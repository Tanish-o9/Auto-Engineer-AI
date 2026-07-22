from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.ai_debugger import AIDebuggerEngine

router = APIRouter(prefix="/api/v1/debugger", tags=["debugger"])

class DebuggerDiagnoseRequest(BaseModel):
    log_or_stack_trace: str
    target_file_hint: Optional[str] = None

engine = AIDebuggerEngine()

@router.post("/diagnose")
async def diagnose_and_fix_bug(payload: DebuggerDiagnoseRequest):
    if not payload.log_or_stack_trace.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="log_or_stack_trace must not be empty")

    result = engine.diagnose_and_fix(payload.log_or_stack_trace, payload.target_file_hint)
    return {
        "status": "SUCCESS",
        "result": result
    }
