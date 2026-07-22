from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import saas_items
from app.routers import members
from app.routers import requests
from app.routers import saas_records
from app.routers import analytics

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(saas_items.router)
app.include_router(members.router)
app.include_router(requests.router)
app.include_router(saas_records.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {"status": "ONLINE", "project": "Saas Management Platform", "domain": "saas"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
