# SIH Backend

Backend API for the capacity-building platform. Built with FastAPI + MongoDB.

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

## Run

```
uvicorn app.main:app --reload
```

Interactive API docs: `http://127.0.0.1:8000/docs`

## Endpoints

- `GET /` — health check
- `POST /auth/register`
- `POST /auth/login`
