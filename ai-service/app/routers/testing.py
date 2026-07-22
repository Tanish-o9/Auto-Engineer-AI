from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.auto_testing_engine import AutomatedTestingEngine

router = APIRouter(prefix="/api/v1/testing", tags=["testing"])

class TestingRequest(BaseModel):
    prompt_or_name: str
    framework: Optional[str] = "pytest"

engine = AutomatedTestingEngine()

@router.post("/generate-and-run")
async def generate_and_run_test_suite(payload: TestingRequest):
    if not payload.prompt_or_name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="prompt_or_name must not be empty")

    result = engine.generate_and_run_tests(payload.prompt_or_name, payload.framework)
    return {
        "status": "TESTS_COMPLETED",
        "result": result
    }
