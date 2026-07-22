import os

class Settings:
    PROJECT_NAME: str = "Saas Management Platform"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/saas_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-key")

settings = Settings()
