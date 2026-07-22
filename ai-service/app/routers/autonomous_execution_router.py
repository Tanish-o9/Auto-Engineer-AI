from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.autonomous_execution_core import AutonomousExecutionCoreEngine

router = APIRouter(prefix="/api/v1/execution", tags=["execution"])

@router.get("/metrics")
async def get_metrics():
    engine = AutonomousExecutionCoreEngine()
    return engine.get_execution_metrics()

@router.get("/cloud")
async def get_cloud():
    engine = AutonomousExecutionCoreEngine()
    return engine.get_cloud_status()

@router.get("/robotics")
async def get_robotics():
    engine = AutonomousExecutionCoreEngine()
    return engine.get_robotics_telemetry()

@router.get("/incidents")
async def get_incidents():
    engine = AutonomousExecutionCoreEngine()
    return engine.get_incident_response_logs()

@router.get("/safety")
async def get_safety():
    engine = AutonomousExecutionCoreEngine()
    return engine.get_safety_assessments()
