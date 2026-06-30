"""FastAPI HTTP server wrapping OrchestratorAgent.

Local dev:
    cd D:\\GoviHitha
    uvicorn agents.server:app --reload --port 8000

Cloud Run:
    Listens on $PORT (default 8080). Container built from repo-root Dockerfile.
"""
from __future__ import annotations

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from agents.agents.orchestrator import OrchestratorAgent
from agents.utils.logger import get_logger

logger = get_logger(__name__)

# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------

class RunRequest(BaseModel):
    crop_type: str = Field(..., min_length=1)
    symptoms: str = Field(..., min_length=1)
    image_base64: str = Field(..., min_length=1)
    region: str = Field(..., min_length=1)


# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

_orchestrator: OrchestratorAgent | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _orchestrator
    logger.info("Starting GoviHitha agent server")
    _orchestrator = OrchestratorAgent()
    yield
    logger.info("Shutting down GoviHitha agent server")


app = FastAPI(
    title="GoviHitha Agent API",
    description="AI crop advisory backend for Sri Lankan farmers.",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow requests from the Next.js frontend (any origin in dev; lock down in prod)
_allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "service": "govihitha-agents"}


@app.post("/run")
def run_agent(req: RunRequest):
    """Run the full orchestration pipeline and return an OrchestrationResult."""
    if _orchestrator is None:
        raise HTTPException(status_code=503, detail="Orchestrator not initialised")

    logger.info(
        "POST /run crop=%s region=%s symptoms_len=%d",
        req.crop_type, req.region, len(req.symptoms),
    )

    result = _orchestrator.run(
        crop_type=req.crop_type,
        symptoms=req.symptoms,
        image_source=req.image_base64,
        region=req.region,
    )
    return result.model_dump()


# ---------------------------------------------------------------------------
# Global error handler — never expose raw tracebacks
# ---------------------------------------------------------------------------

@app.exception_handler(Exception)
async def global_error_handler(request: Request, exc: Exception):
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error. Check server logs."},
    )
