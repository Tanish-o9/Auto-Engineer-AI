import os

class Settings:
    PROJECT_NAME: str = "E-Commerce & Inventory Platform"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/ecommerce_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-key")

settings = Settings()
