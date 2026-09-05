from tests.conftest import register_and_login
import app.routes.chatbot as chatbot_module


def test_chatbot_returns_reply(api, monkeypatch):
    monkeypatch.setattr(chatbot_module, "generate_text", lambda prompt: "Here's some advice.")
    _, headers = register_and_login(email="chat1@example.com")

    r = api.post("/chatbot", headers=headers, json={"message": "What should I learn next?"})
    assert r.status_code == 200
    assert r.json()["reply"] == "Here's some advice."


def test_chatbot_502_when_gemini_fails(api, monkeypatch):
    def broken(prompt):
        raise RuntimeError("GEMINI_API_KEY is not set in .env")

    monkeypatch.setattr(chatbot_module, "generate_text", broken)
    _, headers = register_and_login(email="chat2@example.com")

    r = api.post("/chatbot", headers=headers, json={"message": "Hi"})
    assert r.status_code == 502
