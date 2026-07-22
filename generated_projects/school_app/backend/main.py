from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import students
from app.routers import teachers
from app.routers import courses
from app.routers import attendance
from app.routers import exams
from app.routers import fees

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(courses.router)
app.include_router(attendance.router)
app.include_router(exams.router)
app.include_router(fees.router)

@app.get("/")
def root():
    return {"status": "ONLINE", "project": "School Management ERP", "domain": "school"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
