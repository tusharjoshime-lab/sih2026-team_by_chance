import io

from tests.conftest import register_and_login
import app.routes.quiz as quiz_module


FAKE_QUESTIONS = [
    {
        "question": "What does MS Excel primarily help with?",
        "options": ["Spreadsheets", "Video editing", "3D modeling", "Music production"],
        "correctAnswer": "Spreadsheets",
        "explanation": "Excel is spreadsheet software.",
    },
]


def _mock_generation(monkeypatch, questions=None):
    monkeypatch.setattr(quiz_module, "extract_text", lambda filename, data: "some extracted text")
    monkeypatch.setattr(quiz_module, "generate_json", lambda prompt: questions or FAKE_QUESTIONS)


def test_generate_quiz_returns_questions_without_answers(api, monkeypatch):
    _mock_generation(monkeypatch)
    _, headers = register_and_login(email="quiz1@example.com")

    r = api.post(
        "/quiz/generate",
        headers=headers,
        files={"file": ("notes.pdf", io.BytesIO(b"fake pdf bytes"), "application/pdf")},
    )
    assert r.status_code == 200
    body = r.json()
    assert body["quizId"]
    assert len(body["questions"]) == 1
    assert "correctAnswer" not in body["questions"][0]


def test_generate_quiz_rejects_unsupported_file_type(api, monkeypatch):
    _mock_generation(monkeypatch)
    _, headers = register_and_login(email="quiz2@example.com")

    def raise_unsupported(filename, data):
        raise ValueError("Unsupported file type -- upload a .pdf, .pptx, or .docx file")

    monkeypatch.setattr(quiz_module, "extract_text", raise_unsupported)

    r = api.post(
        "/quiz/generate",
        headers=headers,
        files={"file": ("notes.txt", io.BytesIO(b"hello"), "text/plain")},
    )
    assert r.status_code == 400


def test_submit_quiz_scores_correctly(api, monkeypatch):
    _mock_generation(monkeypatch)
    _, headers = register_and_login(email="quiz3@example.com")

    generated = api.post(
        "/quiz/generate",
        headers=headers,
        files={"file": ("notes.pdf", io.BytesIO(b"fake pdf bytes"), "application/pdf")},
    )
    quiz_id = generated.json()["quizId"]

    r = api.post("/quiz/submit", headers=headers, json={
        "quizId": quiz_id,
        "answers": ["Spreadsheets"],
    })
    assert r.status_code == 200
    body = r.json()
    assert body["score"] == 100.0
    assert body["correctCount"] == 1
    assert body["feedback"][0]["isCorrect"] is True


def test_submit_quiz_rejects_wrong_owner(api, monkeypatch):
    _mock_generation(monkeypatch)
    _, headers_a = register_and_login(email="quizowner@example.com")
    _, headers_b = register_and_login(email="quizintruder@example.com")

    generated = api.post(
        "/quiz/generate",
        headers=headers_a,
        files={"file": ("notes.pdf", io.BytesIO(b"fake pdf bytes"), "application/pdf")},
    )
    quiz_id = generated.json()["quizId"]

    r = api.post("/quiz/submit", headers=headers_b, json={"quizId": quiz_id, "answers": ["Spreadsheets"]})
    assert r.status_code == 403
