"""
Concurrent development server runner.
Starts both the FastAPI backend and the Next.js frontend concurrently,
streaming logs with labeled prefixes and cleanly terminating both on Ctrl+C.
"""

import os
import sys
import subprocess
import threading
import signal

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(PROJECT_DIR, "backend")
FRONTEND_DIR = os.path.join(PROJECT_DIR, "frontend") if os.path.isdir(os.path.join(PROJECT_DIR, "frontend")) else os.path.join(PROJECT_DIR, "ML_Frontend")

processes = []

def stream_logs(pipe, prefix):
    try:
        for line in iter(pipe.readline, ''):
            if not line:
                break
            print(f"[{prefix}] {line.strip()}", flush=True)
    except Exception:
        pass
    finally:
        pipe.close()

def main():
    print("=" * 65)
    print("Starting Loan Default Prediction System (Backend + Frontend)")
    print("=" * 65)
    print(f"Backend directory:  {BACKEND_DIR}")
    print(f"Frontend directory: {FRONTEND_DIR}")
    print("Backend will run on:  http://127.0.0.1:8000 (API docs: /docs)")
    print("Frontend will run on: http://localhost:3000")
    print("Press Ctrl+C to terminate both servers.\n")

    # Determine npm command for Windows
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"

    # Start FastAPI Backend
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--host", "127.0.0.1", "--port", "8000"],
        cwd=BACKEND_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    processes.append(backend_proc)

    # Start Next.js Frontend
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=FRONTEND_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    processes.append(frontend_proc)

    # Stream outputs in separate threads
    t_backend = threading.Thread(target=stream_logs, args=(backend_proc.stdout, "BACKEND"), daemon=True)
    t_frontend = threading.Thread(target=stream_logs, args=(frontend_proc.stdout, "FRONTEND"), daemon=True)

    t_backend.start()
    t_frontend.start()

    def shutdown(sig, frame):
        print("\nShutting down all development servers...")
        for p in processes:
            try:
                p.terminate()
            except Exception:
                pass
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    if hasattr(signal, "SIGTERM"):
        signal.signal(signal.SIGTERM, shutdown)

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        shutdown(None, None)

if __name__ == '__main__':
    main()
