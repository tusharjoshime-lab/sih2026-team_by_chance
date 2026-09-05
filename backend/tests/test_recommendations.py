import json

from tests.conftest import register_and_login
from app.database import competency_framework_collection, courses_collection
import app.routes.recommendations as recommendations_module


def _seed_framework_and_courses():
    competency_framework_collection.insert_one({
        "jobRole": "Assistant Section Officer", "domain": "Digital Literacy",
        "requiredSkills": [{"skill": "MS Excel", "requiredLevel": 7}],
    })
    courses_collection.insert_many([
        {"id": "DL01", "title": "MS Excel Essentials", "domain": "Digital Literacy",
         "skillTags": ["MS Excel"], "level": "Beginner", "durationHrs": 6,
         "description": "...", "link": "https://example.com/dl01"},
        {"id": "DL02", "title": "Unrelated Course", "domain": "Other",
         "skillTags": [], "level": "Beginner", "durationHrs": 2,
         "description": "...", "link": "https://example.com/dl02"},
    ])


def test_recommendations_enriches_and_filters_hallucinated_ids(api, monkeypatch):
    _seed_framework_and_courses()
    _, headers = register_and_login(email="rec@example.com", job_role="Assistant Section Officer")

    def fake_generate_json(prompt):
        return [
            {"id": "DL01", "justification": "Closes your MS Excel gap."},
            {"id": "DOES-NOT-EXIST", "justification": "Should be dropped."},
        ]

    monkeypatch.setattr(recommendations_module, "generate_json", fake_generate_json)

    r = api.get("/recommendations", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert len(body["recommendations"]) == 1
    assert body["recommendations"][0]["id"] == "DL01"
    assert body["recommendations"][0]["justification"] == "Closes your MS Excel gap."


def test_recommendations_502_on_bad_json(api, monkeypatch):
    _seed_framework_and_courses()
    _, headers = register_and_login(email="recbad@example.com", job_role="Assistant Section Officer")

    def broken_generate_json(prompt):
        raise RuntimeError("Gemini did not return valid JSON: boom")

    monkeypatch.setattr(recommendations_module, "generate_json", broken_generate_json)

    r = api.get("/recommendations", headers=headers)
    assert r.status_code == 502


def test_recommendations_404_when_no_courses(api, monkeypatch):
    competency_framework_collection.insert_one({
        "jobRole": "Assistant Section Officer", "domain": "Digital Literacy",
        "requiredSkills": [{"skill": "MS Excel", "requiredLevel": 7}],
    })
    _, headers = register_and_login(email="recnocourses@example.com", job_role="Assistant Section Officer")

    r = api.get("/recommendations", headers=headers)
    assert r.status_code == 404
