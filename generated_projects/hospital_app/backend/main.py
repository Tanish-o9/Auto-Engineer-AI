from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import patients
from app.routers import doctors
from app.routers import appointments
from app.routers import prescriptions
from app.routers import records
from app.routers import billing

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(prescriptions.router)
app.include_router(records.router)
app.include_router(billing.router)

@app.get("/")
def root():
    return {"status": "ONLINE", "project": "Hospital & Patient Management Portal", "domain": "hospital"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
