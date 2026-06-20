"""Load environment variables and expose typed settings."""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from repo root (one level above agents/)
_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(_env_path)


class _Settings:
    GOOGLE_API_KEY: str = os.environ.get("GOOGLE_API_KEY", "")
    GOOGLE_CLOUD_PROJECT: str = os.environ.get("GOOGLE_CLOUD_PROJECT", "researchbrain-497600")
    GOOGLE_CLOUD_REGION: str = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")
    GEMINI_MODEL: str = "gemini-2.0-flash"


settings = _Settings()
