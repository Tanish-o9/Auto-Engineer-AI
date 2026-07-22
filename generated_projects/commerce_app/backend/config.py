import os

class Settings:
    PROJECT_NAME: str = "Commerce Management Platform"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/commerce_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-key")

settings = Settings()
