import os

class Settings:
    PROJECT_NAME: str = "School Management ERP"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/school_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-key")

settings = Settings()
