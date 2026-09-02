"""
Thin wrapper around the Gemini API. Centralizing the client here means the
model name, JSON parsing, and error handling only exist in one place --
if Google renames/deprecates a model, only GEMINI_MODEL in config.py
(or the .env file) needs to change.
"""
import json

from google import genai
from google.genai import types

from app.config import GEMINI_API_KEY, GEMINI_MODEL

_client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None


def generate_json(prompt: str):
    """
    Send a prompt to Gemini and parse the response as JSON.
    Raises RuntimeError on a missing key, API failure, or invalid JSON --
    callers should catch this and turn it into an HTTP error.
    """
    if _client is None:
        raise RuntimeError("GEMINI_API_KEY is not set in .env")

    try:
        response = _client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
    except Exception as exc:
        raise RuntimeError(f"Gemini API request failed: {exc}")

    try:
        return json.loads(response.text)
    except (json.JSONDecodeError, TypeError, AttributeError) as exc:
        raise RuntimeError(f"Gemini did not return valid JSON: {exc}")
