# SIH Backend

## Setup (first time only)

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in real values (MongoDB URI, JWT secret, API keys).

## Run the server

```
uvicorn app.main:app --reload
```

Then open http://127.0.0.1:8000/docs in a browser to see and test every endpoint interactively.

## Endpoints so far

- `GET /` — health check
- `POST /auth/register` — create an account, returns a JWT
- `POST /auth/login` — log in, returns a JWT
