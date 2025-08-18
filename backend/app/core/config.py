from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "CareerWise API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",  # Add this line
        "http://localhost:8080",
        "https://localhost:3000",
        "https://localhost:5173",
        "https://localhost:5174",  # Add this line
        "https://localhost:8080",
    ]

    # Supabase - Fixed naming consistency
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    # For backward compatibility, keep SUPABASE_KEY but use ANON_KEY in practice
    @property
    def SUPABASE_KEY(self) -> str:
        return self.SUPABASE_ANON_KEY

    # Additional environment variables
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_BASE_URL: str = os.getenv("GROQ_BASE_URL", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "")
    ELEVENLABS_API_KEY: str = os.getenv("ELEVENLABS_API_KEY", "")
    SENTRY_DSN: str = os.getenv("SENTRY_DSN", "")
    REVENUECAT_API_KEY: str = os.getenv("REVENUECAT_API_KEY", "")

    # ML Analysis
    ML_MODEL_PATH: str = os.getenv("ML_MODEL_PATH", "./models")
    ENABLE_GPU: bool = os.getenv("ENABLE_GPU", "false").lower() == "true"

    # File upload limits
    MAX_UPLOAD_SIZE: int = 100 * 1024 * 1024  # 100MB

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"


settings = Settings()