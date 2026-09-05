# SIH Backend

Backend API for the capacity-building platform. Built with FastAPI + MongoDB + Gemini.

## Setup

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in your own values.
4. Seed sample data (safe to re-run, uses upsert):
   ```
   python seed_competency_framework.py
   python seed_courses.py
   ```

## Run

```
uvicorn app.main:app --reload
```

Interactive API docs: `http://127.0.0.1:8000/docs`

## Tests

```
pytest
```

Runs against an in-memory fake database and a mocked AI client -- safe to
run anytime without touching real data or API quota.

## Endpoints

See `API.md` for full request/response shapes.

- `GET /` — health check
- `POST /auth/register`, `POST /auth/login`
- `GET/PUT /profile`
- `GET /competency/gaps`
- `GET /recommendations`
- `POST /quiz/generate`, `POST /quiz/submit`
- `GET /dashboard/employee`, `GET /dashboard/admin`
- `POST /chatbot`
