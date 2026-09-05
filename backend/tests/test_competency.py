from tests.conftest import register_and_login
from app.database import competency_framework_collection


def test_gaps_without_job_role_returns_400(api):
    _, headers = register_and_login(email="nogaps@example.com")
    r = api.get("/competency/gaps", headers=headers)
    assert r.status_code == 400


def test_gaps_without_framework_returns_404(api):
    _, headers = register_and_login(email="noframework@example.com", job_role="Nonexistent Role")
    r = api.get("/competency/gaps", headers=headers)
    assert r.status_code == 404


def test_gaps_calculation_is_correct(api):
    competency_framework_collection.insert_one({
        "jobRole": "Assistant Section Officer", "domain": "Digital Literacy",
        "requiredSkills": [{"skill": "MS Excel", "requiredLevel": 10}],
    })
    _, headers = register_and_login(email="gapcalc@example.com", job_role="Assistant Section Officer")
    api.put("/profile", headers=headers, json={"competencyScores": {"MS Excel": 4}})

    r = api.get("/competency/gaps", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["skillGaps"][0]["gap"] == 6
    assert body["overallReadinessPercent"] == 40.0
