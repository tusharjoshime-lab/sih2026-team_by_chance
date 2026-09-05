from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, profile, competency, recommendations, quiz, dashboard, chatbot

app = FastAPI(title="SIH Capacity Building Platform API")

# Restrict allow_origins to the actual frontend domain(s) before production use.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(competency.router)
app.include_router(recommendations.router)
app.include_router(quiz.router)
app.include_router(recommendations.router)
app.include_router(quiz.router)
app.include_router(dashboard.router)
app.include_router(chatbot.router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}
