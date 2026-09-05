from tests.conftest import register_and_login


def test_register_creates_user_and_returns_token(api):
    r = api.post("/auth/register", json={
        "name": "Alice", "email": "alice@example.com", "password": "secret123"
    })
    assert r.status_code == 201
    body = r.json()
    assert body["access_token"]
    assert body["user"]["email"] == "alice@example.com"


def test_register_duplicate_email_rejected(api):
    api.post("/auth/register", json={"name": "A", "email": "dupe@example.com", "password": "secret123"})
    r = api.post("/auth/register", json={"name": "B", "email": "dupe@example.com", "password": "secret123"})
    assert r.status_code == 400


def test_login_correct_password_succeeds(api):
    api.post("/auth/register", json={"name": "A", "email": "login@example.com", "password": "secret123"})
    r = api.post("/auth/login", json={"email": "login@example.com", "password": "secret123"})
    assert r.status_code == 200
    assert r.json()["access_token"]


def test_login_wrong_password_rejected(api):
    api.post("/auth/register", json={"name": "A", "email": "wrongpw@example.com", "password": "secret123"})
    r = api.post("/auth/login", json={"email": "wrongpw@example.com", "password": "nope"})
    assert r.status_code == 401
