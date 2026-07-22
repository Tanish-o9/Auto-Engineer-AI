from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import sells
from app.routers import clothes
from app.routers import web_items
from app.routers import members
from app.routers import requests

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sells.router)
app.include_router(clothes.router)
app.include_router(web_items.router)
app.include_router(members.router)
app.include_router(requests.router)

@app.get("/")
def root():
    return {"status": "ONLINE", "project": "Web Management Platform", "domain": "web"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
