from tests.conftest import register_and_login


def test_get_profile_requires_token(api):
    r = api.get("/profile")
    assert r.status_code in (401, 403)


def test_get_profile_returns_current_user(api):
    _, headers = register_and_login(email="profile@example.com")
    r = api.get("/profile", headers=headers)
    assert r.status_code == 200
    assert r.json()["email"] == "profile@example.com"


def test_put_profile_updates_fields(api):
    _, headers = register_and_login(email="update@example.com")
    r = api.put("/profile", headers=headers, json={
        "jobRole": "Assistant Section Officer",
        "competencyScores": {"MS Excel": 5},
    })
    assert r.status_code == 200
    body = r.json()
    assert body["jobRole"] == "Assistant Section Officer"
    assert body["competencyScores"]["MS Excel"] == 5


def test_invalid_token_rejected(api):
    r = api.get("/profile", headers={"Authorization": "Bearer not-a-real-token"})
    assert r.status_code == 401
