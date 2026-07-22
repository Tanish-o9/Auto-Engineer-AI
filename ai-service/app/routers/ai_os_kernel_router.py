from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.ai_os_kernel import AIOSKernelEngine

router = APIRouter(prefix="/api/v1/kernel", tags=["kernel"])

@router.get("/stats")
async def get_kernel_stats():
    engine = AIOSKernelEngine()
    return engine.get_kernel_stats()

@router.get("/state-machine")
async def get_state_machine():
    engine = AIOSKernelEngine()
    return engine.get_state_machine_history()

@router.get("/memory-snapshots")
async def get_memory_snapshots():
    engine = AIOSKernelEngine()
    return engine.get_memory_snapshots()

@router.post("/recover")
async def trigger_recovery():
    engine = AIOSKernelEngine()
    return engine.trigger_recovery()
