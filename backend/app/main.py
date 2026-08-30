from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth

app = FastAPI(title="SIH Capacity Building Platform API")

# CORS: lets your frontend (running on a different port/domain) call this API.
# allow_origins=["*"] is fine for hackathon dev speed; tighten it before the
# final demo if you have time (Day 6 polish, not urgent now).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)


@app.get("/")
def health_check():
    """Hit this URL in a browser to confirm the server is alive."""
    return {"status": "ok", "message": "Backend is running"}
