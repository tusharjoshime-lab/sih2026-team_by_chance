from tests.conftest import register_and_login
from app.database import users_collection


def test_employee_dashboard_with_no_activity(api):
    _, headers = register_and_login(email="dash1@example.com")
    r = api.get("/dashboard/employee", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["quizzesTaken"] == 0
    assert body["averageScore"] == 0


def test_admin_dashboard_blocked_for_regular_user(api):
    _, headers = register_and_login(email="dash2@example.com")
    r = api.get("/dashboard/admin", headers=headers)
    assert r.status_code == 403


def test_admin_dashboard_allowed_for_admin_user(api):
    _, headers = register_and_login(email="admin@example.com")
    users_collection.update_one({"email": "admin@example.com"}, {"$set": {"isAdmin": True}})

    r = api.get("/dashboard/admin", headers=headers)
    assert r.status_code == 200
    body = r.json()
    assert body["totalUsers"] >= 1
