from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.goal_simulation_engine import GoalSimulationEngine

router = APIRouter(prefix="/api/v1/goal", tags=["goal"])

@router.post("/blueprint")
async def get_goal_blueprint(payload: Optional[Dict[str, Any]] = None):
    engine = GoalSimulationEngine()
    goal = payload.get("goal", "") if payload else ""
    return engine.generate_goal_blueprint(goal)

@router.get("/simulate")
async def get_simulation():
    engine = GoalSimulationEngine()
    return engine.simulate_engineering()

@router.post("/negotiate")
async def run_negotiation():
    engine = GoalSimulationEngine()
    return engine.evaluate_negotiation()

@router.get("/evolution")
async def get_evolution():
    engine = GoalSimulationEngine()
    return engine.get_evolution_proposals()
