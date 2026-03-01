from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Tournament Manager API")

allowed_origins = [
    "http://localhost:3000",
    "https://tournament-manager-chi.vercel.app",
    "https://tournament-manager-3kxb.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "tournament-manager-api"}
