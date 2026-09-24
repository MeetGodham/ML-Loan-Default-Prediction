@echo off
echo ========================================================
echo Starting Loan Default Prediction Engine
echo ========================================================
echo Starting FastAPI Backend on http://127.0.0.1:8000
start "FastAPI Backend" cmd /k "cd backend && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo Starting Next.js Frontend on http://localhost:3000
if exist "frontend" (
    start "Next.js Frontend" cmd /k "cd frontend && npm run dev"
) else (
    start "Next.js Frontend" cmd /k "cd ML_Frontend && npm run dev"
)

echo Both services launched in background terminal windows.
pause
