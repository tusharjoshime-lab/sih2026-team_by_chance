"""
Shared pytest fixtures.

Tests run against mongomock (an in-memory fake MongoDB) instead of your real
Atlas cluster -- so running `pytest` never touches or costs anything against
your actual database, and can run offline.
"""
import os

os.environ.setdefault("MONGO_URI", "mongodb://fake")
os.environ.setdefault("JWT_SECRET", "test-secret-not-for-production")

import mongomock
import pymongo
pymongo.MongoClient = mongomock.MongoClient  # must happen before app.database is imported

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.database import (
    users_collection,
    competency_framework_collection,
    courses_collection,
    quizzes_collection,
    quiz_attempts_collection,
    uploaded_materials_collection,
)

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_db():
    """Wipe every collection before each test so tests can't leak into each other."""
    for collection in [
        users_collection, competency_framework_collection, courses_collection,
        quizzes_collection, quiz_attempts_collection, uploaded_materials_collection,
    ]:
        collection.delete_many({})
    yield


@pytest.fixture()
def api():
    return client


def register_and_login(email="user@example.com", password="secret123", job_role=None):
    """Helper: register a user, optionally set jobRole, return (token, headers)."""
    client.post("/auth/register", json={"name": "Test User", "email": email, "password": password})
    login = client.post("/auth/login", json={"email": email, "password": password})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    if job_role:
        client.put("/profile", headers=headers, json={"jobRole": job_role})
    return token, headers
