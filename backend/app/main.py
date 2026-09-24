import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes.prediction import router
from app.services.prediction_service import load_model, resolve_model_path

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup and shutdown lifecycle manager.
    Loads the ML model once at application startup into memory.
    """
    logger.info("Initializing ML serving engine...")
    try:
        model = load_model()
        app.state.model = model
        logger.info("ML model successfully loaded on application startup.")
    except Exception as e:
        logger.error(f"Failed to load ML model artifact during startup: {e}")
        raise e
    yield
    logger.info("Shutting down ML serving engine...")


app = FastAPI(
    title="Loan Default Risk Prediction API",
    description="Production-ready FastAPI serving engine for loan default classification and borrower risk analysis.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration to accept requests from frontend origins (local + live Vercel deployments)
cors_env = os.getenv("CORS_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in cors_env.split(",") if origin.strip()]
is_wildcard = "*" in allowed_origins

if not is_wildcard and "http://localhost:3000" not in allowed_origins:
    allowed_origins.extend(["http://localhost:3000", "http://127.0.0.1:3000"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if is_wildcard else allowed_origins,
    allow_origin_regex=r"^https://.*\.vercel\.app$" if not is_wildcard else None,
    allow_credentials=False if is_wildcard else True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "status": "online",
        "service": "Loan Default Prediction API",
        "endpoints": {
            "predict": "POST /predict",
            "health": "GET /health",
            "documentation": "GET /docs"
        }
    }


@app.get("/health")
def health():
    try:
        model_path = resolve_model_path()
        return {
            "status": "healthy",
            "model_loaded": True,
            "model_path": model_path
        }
    except Exception as e:
        return {
            "status": "degraded",
            "model_loaded": False,
            "error": str(e)
        }